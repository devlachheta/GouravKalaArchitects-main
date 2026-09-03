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




class PublicProjectImageSerializer(serializers.ModelSerializer):

    src = serializers.ImageField(
        source="image",
        read_only=True
    )

    class Meta:
        model = ProjectImage
        fields = [
            "src",
            "position",
        ]


class PublicProjectSerializer(serializers.ModelSerializer):

    image = serializers.ImageField(
        source="card_image",
        read_only=True
    )

    imagePosition = serializers.CharField(
        source="card_image_position",
        read_only=True
    )

    plotArea = serializers.CharField(
        source="plot_area",
        read_only=True
    )

    builtUpArea = serializers.CharField(
        source="built_up_area",
        read_only=True
    )

    carpetArea = serializers.CharField(
        source="carpet_area",
        read_only=True
    )

    bannerImage = serializers.ImageField(
        source="banner_image",
        read_only=True
    )

    bannerPosition = serializers.CharField(
        source="banner_position",
        read_only=True
    )

    youtubeUrl = serializers.URLField(
        source="youtube_url",
        read_only=True,
        allow_null=True
    )

    gallery = PublicProjectImageSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Project

        fields = [
            "id",
            "slug",
            "title",
            "type",
            "location",
            "image",
            "imagePosition",
            "plotArea",
            "builtUpArea",
            "carpetArea",
            "year",
            "status",
            "bannerImage",
            "bannerPosition",
            "description",
            "gallery",
            "youtubeUrl",
        ]