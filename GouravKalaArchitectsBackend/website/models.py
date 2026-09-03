from django.db import models


class Homepage(models.Model):

    years = models.CharField(
        max_length=20,
        default="07+"
    )

    projects = models.CharField(
        max_length=20,
        default="48+"
    )

    cities = models.CharField(
        max_length=20,
        default="06+"
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return "Homepage Statistics"


class About(models.Model):

    instagram_followers = models.PositiveIntegerField(
        default=100000
    )

    facebook_followers = models.PositiveIntegerField(
        default=98000
    )

    youtube_subscribers = models.PositiveIntegerField(
        default=67000
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return "About Social Statistics"