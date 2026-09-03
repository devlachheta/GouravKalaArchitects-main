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

    def has_add_permission(self, request):
        if Homepage.objects.exists():
            return False
        return super().has_add_permission(request)


@admin.register(About)
class AboutAdmin(admin.ModelAdmin):

    list_display = (
        "instagram_followers",
        "facebook_followers",
        "youtube_subscribers",
        "updated_at",
    )

    def has_add_permission(self, request):
        if About.objects.exists():
            return False
        return super().has_add_permission(request)