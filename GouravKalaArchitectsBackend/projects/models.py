from django.db import models
from django.utils.text import slugify


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

    title = models.CharField(max_length=200)

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

    def save(self, *args, **kwargs):

        if not self.slug:
            self.slug = slugify(self.title)

        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class ProjectImage(models.Model):

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="gallery"
    )

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

    class Meta:
        ordering = ["display_order", "id"]

    def __str__(self):
        return f"{self.project.title} - Image {self.display_order}"


# Additional models for consultation and booking

class Consultation(models.Model):
    DURATION_CHOICES = [
        (15, "15 Minutes"),
        (30, "30 Minutes"),
    ]

    title = models.CharField(max_length=200, default="1-on-1 Consultation")
    description = models.TextField(blank=True)

    duration = models.PositiveIntegerField(
        choices=DURATION_CHOICES,
        default=30,
    )

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=999,
    )

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} - {self.duration} min"


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
        unique=True,
    )

    start_time = models.TimeField(default="10:00")
    end_time = models.TimeField(default="18:00")

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return (
            f"{self.get_day_of_week_display()} "
            f"{self.start_time} - {self.end_time}"
        )


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
        related_name="bookings",
    )

    customer_name = models.CharField(max_length=200)
    customer_email = models.EmailField()
    customer_phone = models.CharField(max_length=20)

    booking_date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()

    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )

    payment_status = models.CharField(
        max_length=20,
        choices=PAYMENT_STATUS_CHOICES,
        default="pending",
    )

    booking_status = models.CharField(
        max_length=20,
        choices=BOOKING_STATUS_CHOICES,
        default="pending",
    )

    razorpay_order_id = models.CharField(
        max_length=255,
        blank=True,
        null=True,
    )

    razorpay_payment_id = models.CharField(
        max_length=255,
        blank=True,
        null=True,
    )

    razorpay_signature = models.CharField(
        max_length=500,
        blank=True,
        null=True,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return (
            f"{self.customer_name} - "
            f"{self.booking_date} "
            f"{self.start_time}-{self.end_time}"
        )