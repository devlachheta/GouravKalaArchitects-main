from django.contrib import admin
from .models import Project, ProjectImage


class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):

    list_display = (
        "title",
        "type",
        "location",
        "year",
        "status",
        "created_at",
    )

    list_filter = (
        "type",
        "status",
        "year",
    )

    search_fields = (
        "title",
        "location",
        "description",
    )

    prepopulated_fields = {
        "slug": ("title",),
    }

    inlines = [
        ProjectImageInline,
    ]


@admin.register(ProjectImage)
class ProjectImageAdmin(admin.ModelAdmin):

    list_display = (
        "project",
        "display_order",
        "position",
        "created_at",
    )

    list_filter = (
        "project",
    )

    ordering = (
        "project",
        "display_order",
    )