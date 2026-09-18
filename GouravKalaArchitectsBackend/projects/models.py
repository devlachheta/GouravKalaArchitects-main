import os
from io import BytesIO

from django.conf import settings
from django.core.files.base import ContentFile
from django.core.files.storage import FileSystemStorage
from django.db import models
from django.utils.text import slugify

from PIL import Image, ImageOps


# ============================================================
# ORIGINAL IMAGE STORAGE
# ============================================================
#
# Your default storage is Cloudinary.
#
# But original uploaded images can be larger than Cloudinary's
# upload limit. Therefore, originals are stored locally.
#
# Optimized WebP images will continue to use Cloudinary because
# Cloudinary is configured as Django's default storage.
#
# Files will be stored inside:
#
# media/project-originals/
#
# ============================================================

original_storage = FileSystemStorage(
    location=os.path.join(
        settings.MEDIA_ROOT,
        "project-originals"
    )
)


# ============================================================
# IMAGE OPTIMIZATION
# ============================================================

def optimize_image(
    image_field,
    folder,
    max_size=2560,
    quality=92
):
    """
    Create a high-quality WebP version of an uploaded image.

    The original uploaded image is kept separately.

    Features:
    - Maximum longest side: 2560px
    - WebP quality: 92
    - Aspect ratio preserved
    - High-quality LANCZOS resizing
    - EXIF orientation corrected
    - Transparency preserved where possible
    """

    if not image_field:
        return None

    try:
        # ----------------------------------------------------
        # Open uploaded image
        # ----------------------------------------------------

        image_field.open()

        image = Image.open(image_field)

        # Force Pillow to fully load the image before the
        # uploaded file is reused/saved elsewhere.
        image.load()

        # ----------------------------------------------------
        # Correct EXIF orientation
        # ----------------------------------------------------

        try:
            image = ImageOps.exif_transpose(image)
        except Exception:
            pass

        # ----------------------------------------------------
        # Handle image modes
        # ----------------------------------------------------

        if image.mode in ("RGBA", "LA"):
            # Preserve transparency
            image = image.convert("RGBA")

        elif image.mode == "P":

            if "transparency" in image.info:
                image = image.convert("RGBA")
            else:
                image = image.convert("RGB")

        else:
            image = image.convert("RGB")

        # ----------------------------------------------------
        # Resize only if image is larger than max_size
        # ----------------------------------------------------

        width, height = image.size

        if max(width, height) > max_size:

            scale = max_size / max(width, height)

            new_width = round(width * scale)
            new_height = round(height * scale)

            image = image.resize(
                (new_width, new_height),
                Image.Resampling.LANCZOS
            )

        # ----------------------------------------------------
        # Generate WebP
        # ----------------------------------------------------

        output = BytesIO()

        image.save(
            output,
            format="WEBP",
            quality=quality,
            method=6
        )

        output.seek(0)

        # ----------------------------------------------------
        # Generate WebP filename
        # ----------------------------------------------------

        original_name = os.path.splitext(
            os.path.basename(image_field.name)
        )[0]

        webp_name = f"{original_name}.webp"

        # ----------------------------------------------------
        # Return optimized file
        # ----------------------------------------------------

        return ContentFile(
            output.read(),
            name=f"{folder}/{webp_name}"
        )

    except Exception as exc:

        print(
            f"Image optimization failed: {exc}"
        )

        return None


# ============================================================
# PROJECT
# ============================================================

class Project(models.Model):

    PROJECT_TYPES = [
        ("architecture", "Architecture"),
        ("interior", "Interior"),
    ]

    STATUS_CHOICES = [
        ("completed", "Completed"),
        ("ongoing", "Ongoing"),
        ("upcoming", "Upcoming"),
    ]

    # ========================================================
    # BASIC INFORMATION
    # ========================================================

    title = models.CharField(
        max_length=200
    )

    slug = models.SlugField(
        max_length=220,
        unique=True,
        blank=True
    )

    type = models.CharField(
        max_length=20,
        choices=PROJECT_TYPES
    )

    display_order = models.PositiveIntegerField(
        default=0
    )

    location = models.CharField(
        max_length=200,
        blank=True
    )

    plot_area = models.CharField(
        max_length=100,
        blank=True
    )

    built_up_area = models.CharField(
        max_length=100,
        blank=True
    )

    carpet_area = models.CharField(
        max_length=100,
        blank=True
    )

    year = models.PositiveIntegerField(
        blank=True,
        null=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="completed"
    )

    # ========================================================
    # BANNER IMAGE
    # ========================================================

    # --------------------------------------------------------
    # Original banner image
    #
    # Stored LOCALLY.
    #
    # Example:
    # media/project-originals/banners/image.jpg
    # --------------------------------------------------------

    banner_image_original = models.ImageField(
        upload_to="banners/",
        storage=original_storage,
        blank=True,
        null=True
    )

    # --------------------------------------------------------
    # Optimized banner image
    #
    # Uses DEFAULT STORAGE = Cloudinary
    #
    # Example:
    # Cloudinary -> projects/banners/image.webp
    # --------------------------------------------------------

    banner_image = models.ImageField(
        upload_to="projects/banners/",
        blank=True,
        null=True
    )

    banner_position = models.CharField(
        max_length=100,
        default="center",
        blank=True
    )

    # ========================================================
    # CARD IMAGE
    # ========================================================

    # --------------------------------------------------------
    # Original card image
    #
    # Stored LOCALLY.
    # --------------------------------------------------------

    card_image_original = models.ImageField(
        upload_to="cards/",
        storage=original_storage,
        blank=True,
        null=True
    )

    # --------------------------------------------------------
    # Optimized card image
    #
    # Stored in Cloudinary.
    # --------------------------------------------------------

    card_image = models.ImageField(
        upload_to="projects/cards/",
        blank=True,
        null=True
    )

    card_image_position = models.CharField(
        max_length=100,
        default="center",
        blank=True
    )

    # ========================================================
    # OTHER PROJECT INFORMATION
    # ========================================================

    description = models.TextField(
        blank=True
    )

    youtube_url = models.URLField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    # ========================================================
    # SAVE
    # ========================================================

    def save(self, *args, **kwargs):

        # ----------------------------------------------------
        # Generate slug automatically
        # ----------------------------------------------------

        if not self.slug:
            self.slug = slugify(self.title)

        # ----------------------------------------------------
        # Get old instance
        # ----------------------------------------------------

        old_instance = None

        if self.pk:

            try:
                old_instance = Project.objects.get(
                    pk=self.pk
                )

            except Project.DoesNotExist:
                pass

        # ====================================================
        # BANNER IMAGE
        # ====================================================

        new_banner_uploaded = (
            self.banner_image
            and (
                not old_instance
                or not old_instance.banner_image
                or old_instance.banner_image.name
                != self.banner_image.name
            )
        )

        if new_banner_uploaded:

            original_file = self.banner_image

            # ------------------------------------------------
            # Save original image locally
            # ------------------------------------------------

            self.banner_image_original.save(
                os.path.basename(
                    original_file.name
                ),
                original_file.file,
                save=False
            )

            # ------------------------------------------------
            # Generate optimized WebP
            # ------------------------------------------------

            optimized = optimize_image(
                original_file,
                "projects/banners",
                max_size=2560,
                quality=92
            )

            if optimized:

                # ------------------------------------------------
                # Save optimized WebP to Cloudinary
                # ------------------------------------------------

                self.banner_image.save(
                    os.path.basename(
                        optimized.name
                    ),
                    optimized,
                    save=False
                )

        # ====================================================
        # CARD IMAGE
        # ====================================================

        new_card_uploaded = (
            self.card_image
            and (
                not old_instance
                or not old_instance.card_image
                or old_instance.card_image.name
                != self.card_image.name
            )
        )

        if new_card_uploaded:

            original_file = self.card_image

            # ------------------------------------------------
            # Save original image locally
            # ------------------------------------------------

            self.card_image_original.save(
                os.path.basename(
                    original_file.name
                ),
                original_file.file,
                save=False
            )

            # ------------------------------------------------
            # Generate optimized WebP
            # ------------------------------------------------

            optimized = optimize_image(
                original_file,
                "projects/cards",
                max_size=2560,
                quality=92
            )

            if optimized:

                # ------------------------------------------------
                # Save optimized WebP to Cloudinary
                # ------------------------------------------------

                self.card_image.save(
                    os.path.basename(
                        optimized.name
                    ),
                    optimized,
                    save=False
                )

        # ====================================================
        # SAVE PROJECT
        # ====================================================

        super().save(*args, **kwargs)

    # ========================================================
    # STRING
    # ========================================================

    def __str__(self):
        return self.title


# ============================================================
# PROJECT GALLERY IMAGE
# ============================================================

class ProjectImage(models.Model):

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="gallery"
    )

    # ========================================================
    # ORIGINAL GALLERY IMAGE
    # ========================================================
    #
    # Stored locally.
    #
    # Example:
    #
    # media/project-originals/gallery/image.jpg
    #
    # ========================================================

    original_image = models.ImageField(
        upload_to="gallery/",
        storage=original_storage,
        blank=True,
        null=True
    )

    # ========================================================
    # OPTIMIZED GALLERY IMAGE
    # ========================================================
    #
    # Stored in Cloudinary.
    #
    # ========================================================

    image = models.ImageField(
        upload_to="projects/gallery/"
    )

    position = models.CharField(
        max_length=100,
        default="center center",
        blank=True
    )

    display_order = models.PositiveIntegerField(
        default=0
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    # ========================================================
    # SAVE GALLERY IMAGE
    # ========================================================

    def save(self, *args, **kwargs):

        # ----------------------------------------------------
        # Get old instance
        # ----------------------------------------------------

        old_instance = None

        if self.pk:

            try:
                old_instance = ProjectImage.objects.get(
                    pk=self.pk
                )

            except ProjectImage.DoesNotExist:
                pass

        # ====================================================
        # Detect newly uploaded gallery image
        # ====================================================

        new_image_uploaded = (
            self.image
            and (
                not old_instance
                or not old_instance.image
                or old_instance.image.name
                != self.image.name
            )
        )

        if new_image_uploaded:

            original_file = self.image

            # ------------------------------------------------
            # Save original locally
            # ------------------------------------------------

            self.original_image.save(
                os.path.basename(
                    original_file.name
                ),
                original_file.file,
                save=False
            )

            # ------------------------------------------------
            # Generate optimized WebP
            # ------------------------------------------------

            optimized = optimize_image(
                original_file,
                "projects/gallery",
                max_size=2560,
                quality=92
            )

            if optimized:

                # ------------------------------------------------
                # Save optimized WebP to Cloudinary
                # ------------------------------------------------

                self.image.save(
                    os.path.basename(
                        optimized.name
                    ),
                    optimized,
                    save=False
                )

        # ----------------------------------------------------
        # Save gallery record
        # ----------------------------------------------------

        super().save(*args, **kwargs)

    # ========================================================
    # META
    # ========================================================

    class Meta:

        ordering = [
            "display_order",
            "id"
        ]

    # ========================================================
    # STRING
    # ========================================================

    def __str__(self):

        return (
            f"{self.project.title} - "
            f"Image {self.display_order}"
        )


# ============================================================
# CONSULTATION
# ============================================================

class Consultation(models.Model):

    DURATION_CHOICES = [
        (15, "15 Minutes"),
        (30, "30 Minutes"),
    ]

    title = models.CharField(
        max_length=200,
        default="1-on-1 Consultation"
    )

    description = models.TextField(
        blank=True
    )

    duration = models.PositiveIntegerField(
        choices=DURATION_CHOICES,
        default=30
    )

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=999
    )

    is_active = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):

        return (
            f"{self.title} - "
            f"{self.duration} min"
        )


# ============================================================
# WORKING HOURS
# ============================================================

class WorkingHours(models.Model):

    DAYS_OF_WEEK = [
        (0, "Monday"),
        (1, "Tuesday"),
        (2, "Wednesday"),
        (3, "Thursday"),
        (4, "Friday"),
        (5, "Saturday"),
        (6, "Sunday"),
    ]

    day_of_week = models.PositiveSmallIntegerField(
        choices=DAYS_OF_WEEK,
        unique=True
    )

    start_time = models.TimeField(
        default="10:00"
    )

    end_time = models.TimeField(
        default="18:00"
    )

    is_active = models.BooleanField(
        default=True
    )

    def __str__(self):

        return (
            f"{self.get_day_of_week_display()} "
            f"{self.start_time} - "
            f"{self.end_time}"
        )


# ============================================================
# BOOKING
# ============================================================

class Booking(models.Model):

    PAYMENT_STATUS_CHOICES = [
        ("pending", "Pending"),
        ("paid", "Paid"),
        ("failed", "Failed"),
        ("refunded", "Refunded"),
    ]

    BOOKING_STATUS_CHOICES = [
        ("pending", "Pending"),
        ("confirmed", "Confirmed"),
        ("cancelled", "Cancelled"),
        ("completed", "Completed"),
    ]

    consultation = models.ForeignKey(
        Consultation,
        on_delete=models.PROTECT,
        related_name="bookings"
    )

    customer_name = models.CharField(
        max_length=200
    )

    customer_email = models.EmailField()

    customer_phone = models.CharField(
        max_length=20
    )

    booking_date = models.DateField()

    start_time = models.TimeField()

    end_time = models.TimeField()

    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    payment_status = models.CharField(
        max_length=20,
        choices=PAYMENT_STATUS_CHOICES,
        default="pending"
    )

    booking_status = models.CharField(
        max_length=20,
        choices=BOOKING_STATUS_CHOICES,
        default="pending"
    )

    razorpay_order_id = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    razorpay_payment_id = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    razorpay_signature = models.CharField(
        max_length=500,
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):

        return (
            f"{self.customer_name} - "
            f"{self.booking_date} "
            f"{self.start_time}-{self.end_time}"
        )
        
        
class BlockedSlot(models.Model):

    booking_date = models.DateField()

    # Leave these empty when blocking the entire day
    start_time = models.TimeField(
        blank=True,
        null=True,
    )

    end_time = models.TimeField(
        blank=True,
        null=True,
    )

    reason = models.CharField(
        max_length=255,
        blank=True,
    )

    is_active = models.BooleanField(
        default=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def __str__(self):

        if self.start_time and self.end_time:
            return (
                f"Blocked - "
                f"{self.booking_date} "
                f"{self.start_time}-{self.end_time}"
            )

        return f"Blocked - {self.booking_date} (Full Day)"        
