from django.contrib import admin
from .models import Homepage, About


@admin.register(Homepage)
class HomepageAdmin(admin.ModelAdmin):
    list_display = (
        "years",
        "projects",
        "cities",
        "updated_at",
    )


@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    list_display = (
        "instagram_followers",
        "facebook_followers",
        "youtube_subscribers",
        "updated_at",
    )