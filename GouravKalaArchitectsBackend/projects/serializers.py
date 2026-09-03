from rest_framework import serializers
from .models import Project, ProjectImage


class ProjectImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProjectImage
        fields = [
            "id",
            "project",
            "image",
            "position",
            "display_order",
        ]

class ProjectSerializer(serializers.ModelSerializer):

    gallery = ProjectImageSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "slug",
            "type",
            "location",
            "plot_area",
            "built_up_area",
            "carpet_area",
            "year",
            "status",
            "banner_image",
            "banner_position",
            "card_image",
            "card_image_position",
            "description",
            "youtube_url",
            "gallery",
            "created_at",
            "updated_at",
        ]