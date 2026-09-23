from django.contrib.auth import get_user_model

from rest_framework import serializers

from rest_framework_simplejwt.tokens import RefreshToken


User = get_user_model()


class EmailTokenObtainPairSerializer(serializers.Serializer):

    username_or_email = serializers.CharField(
        trim_whitespace=True
    )

    password = serializers.CharField(
        write_only=True,
        trim_whitespace=False,
    )

    def validate(self, attrs):

        username_or_email = attrs.get(
            "username_or_email"
        )

        password = attrs.get("password")

        # =====================================================
        # FIND USER BY EMAIL OR USERNAME
        # =====================================================

        user = User.objects.filter(
            email__iexact=username_or_email,
            is_active=True,
        ).first()

        if not user:

            user = User.objects.filter(
                username__iexact=username_or_email,
                is_active=True,
            ).first()

        # =====================================================
        # CHECK PASSWORD
        # =====================================================

        if not user or not user.check_password(password):

            raise serializers.ValidationError(
                "Invalid username/email or password."
            )

        # =====================================================
        # GENERATE JWT TOKENS
        # =====================================================

        refresh = RefreshToken.for_user(user)

        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }