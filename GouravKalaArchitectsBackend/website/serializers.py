from rest_framework import serializers
from .models import Homepage, About


class HomepageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Homepage
        fields = [
            "years",
            "projects",
            "cities",
            "updated_at",
        ]


class AboutSerializer(serializers.ModelSerializer):

    class Meta:
        model = About
        fields = [
            "instagram_followers",
            "facebook_followers",
            "youtube_subscribers",
            "updated_at",
        ]