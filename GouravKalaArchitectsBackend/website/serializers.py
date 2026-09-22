from rest_framework import serializers

from .models import Homepage, About, Reel


# =========================================================
# HOMEPAGE SERIALIZER
# =========================================================

class HomepageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Homepage
        fields = [
            "years",
            "projects",
            "cities",
            "updated_at",
        ]


# =========================================================
# ABOUT SERIALIZER
# =========================================================

class AboutSerializer(serializers.ModelSerializer):

    youtube_subscribers = serializers.IntegerField(
        source="youtube_followers"
    )

    class Meta:
        model = About
        fields = [
            "instagram_followers",
            "facebook_followers",
            "youtube_subscribers",
            "updated_at",
        ]

# =========================================================
# REEL SERIALIZER
# =========================================================

class ReelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reel
        fields = [
            "id",
            "video",
            "title",
            "is_active",
            "order",
            "created_at",
        ]
        
        