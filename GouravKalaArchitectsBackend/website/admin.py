from django.contrib import admin
from .models import Homepage, About, Reel


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
        "youtube_followers",
        "updated_at",
    )


@admin.register(Reel)
class ReelAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "is_active",
        "order",
        "created_at",
    )

    list_editable = (
        "is_active",
        "order",
    )

    ordering = (
        "order",
        "created_at",
    )

    def save_model(self, request, obj, form, change):
        if change:
            old_obj = Reel.objects.get(pk=obj.pk)

            old_video = old_obj.video
            new_video = form.cleaned_data.get("video")

            if (
                old_video
                and new_video
                and old_video.name != new_video.name
            ):
                old_video.delete(save=False)

        super().save_model(
            request,
            obj,
            form,
            change,
        )