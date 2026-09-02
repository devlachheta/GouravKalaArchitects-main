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