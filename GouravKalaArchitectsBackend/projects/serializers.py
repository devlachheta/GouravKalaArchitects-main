from rest_framework import serializers
from .models import (
    Project,
    ProjectImage,
    Consultation,
    Booking,
)


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
            "display_order",   # ADD THIS
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
            "display_order", 
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



class ConsultationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Consultation
        fields = [
            "id",
            "title",
            "description",
            "duration",
            "price",
            "is_active",
        ]




class BookingSerializer(serializers.ModelSerializer):

    consultation_title = serializers.CharField(
        source="consultation.title",
        read_only=True,
    )

    consultation_duration = serializers.IntegerField(
        source="consultation.duration",
        read_only=True,
    )

    class Meta:
        model = Booking
        fields = [
            "id",
            "consultation",
            "consultation_title",
            "consultation_duration",
            "customer_name",
            "customer_email",
            "customer_phone",
            "booking_date",
            "start_time",
            "end_time",
            "amount",
            "payment_status",
            "booking_status",
            "razorpay_order_id",
            "razorpay_payment_id",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "amount",
            "payment_status",
            "booking_status",
            "razorpay_order_id",
            "razorpay_payment_id",
            "created_at",
            "updated_at",
        ]