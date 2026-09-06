from django.db import models
from cloudinary_storage.storage import VideoMediaCloudinaryStorage


class Homepage(models.Model):
    years = models.PositiveIntegerField(default=0)
    projects = models.PositiveIntegerField(default=0)
    cities = models.PositiveIntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "Homepage"


class About(models.Model):
    instagram_followers = models.PositiveIntegerField(default=0)
    facebook_followers = models.PositiveIntegerField(default=0)
    youtube_followers = models.PositiveIntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "About"


class Reel(models.Model):
    video = models.FileField(
        upload_to="reels/",
        storage=VideoMediaCloudinaryStorage()
    )
    title = models.CharField(
        max_length=200,
        blank=True
    )
    is_active = models.BooleanField(
        default=True
    )
    order = models.PositiveIntegerField(
        default=0
    )
    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.title or f"Reel {self.id}"

    def delete(self, *args, **kwargs):
        if self.video:
            self.video.delete(save=False)

        super().delete(*args, **kwargs)