from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import PasswordResetTokenGenerator

from django.utils.encoding import (
    force_bytes,
    force_str,
)

from django.utils.http import (
    urlsafe_base64_decode,
    urlsafe_base64_encode,
)

from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

from .serializers import EmailTokenObtainPairSerializer


User = get_user_model()

token_generator = PasswordResetTokenGenerator()


# =========================================================
# EMAIL LOGIN
# =========================================================

class EmailLoginView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        serializer = EmailTokenObtainPairSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        return Response(
            serializer.validated_data
        )


# =========================================================
# LOGOUT
# =========================================================

class LogoutView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        refresh_token = request.data.get(
            "refresh"
        )

        # -----------------------------------------
        # Refresh token required
        # -----------------------------------------

        if not refresh_token:

            return Response(
                {
                    "detail":
                        "Refresh token is required."
                },
                status=400,
            )

        # -----------------------------------------
        # Blacklist refresh token
        # -----------------------------------------

        try:

            token = RefreshToken(
                refresh_token
            )

            token.blacklist()

            return Response(
                {
                    "detail":
                        "Logout successful."
                },
                status=200,
            )

        except TokenError:

            return Response(
                {
                    "detail":
                        "Invalid or expired refresh token."
                },
                status=400,
            )


# =========================================================
# FORGOT PASSWORD
# =========================================================

class ForgotPasswordView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        email = request.data.get(
            "email",
            ""
        ).strip()

        if not email:

            return Response(
                {
                    "detail":
                        "Email address is required."
                },
                status=400,
            )

        user = User.objects.filter(
            email__iexact=email,
            is_active=True,
        ).first()

        # -----------------------------------------
        # Email does not exist
        # -----------------------------------------

        if not user:

            return Response(
                {
                    "detail":
                        "Email address is not registered."
                },
                status=400,
            )

        # -----------------------------------------
        # Generate user ID
        # -----------------------------------------

        uid = urlsafe_base64_encode(
            force_bytes(user.pk)
        )

        # -----------------------------------------
        # Generate secure reset token
        # -----------------------------------------

        token = token_generator.make_token(
            user
        )

        return Response(
            {
                "detail":
                    "Email verified.",

                "uid":
                    uid,

                "token":
                    token,
            }
        )


# =========================================================
# RESET PASSWORD
# =========================================================

class ResetPasswordView(APIView):

    permission_classes = [AllowAny]

    def post(
        self,
        request,
        uidb64,
        token
    ):

        password = request.data.get(
            "password",
            ""
        )

        confirm_password = request.data.get(
            "confirm_password",
            ""
        )

        # -----------------------------------------
        # Check password exists
        # -----------------------------------------

        if not password:

            return Response(
                {
                    "detail":
                        "New password is required."
                },
                status=400,
            )

        # -----------------------------------------
        # Check passwords match
        # -----------------------------------------

        if password != confirm_password:

            return Response(
                {
                    "detail":
                        "Passwords do not match."
                },
                status=400,
            )

        # -----------------------------------------
        # Minimum password length
        # -----------------------------------------

        if len(password) < 8:

            return Response(
                {
                    "detail":
                        "Password must be at least 8 characters long."
                },
                status=400,
            )

        # -----------------------------------------
        # Decode user ID
        # -----------------------------------------

        try:

            user_id = force_str(
                urlsafe_base64_decode(
                    uidb64
                )
            )

            user = User.objects.get(
                pk=user_id,
                is_active=True,
            )

        except (
            TypeError,
            ValueError,
            OverflowError,
            User.DoesNotExist,
        ):

            return Response(
                {
                    "detail":
                        "Invalid or expired reset link."
                },
                status=400,
            )

        # -----------------------------------------
        # Validate reset token
        # -----------------------------------------

        if not token_generator.check_token(
            user,
            token
        ):

            return Response(
                {
                    "detail":
                        "Invalid or expired reset link."
                },
                status=400,
            )

        # -----------------------------------------
        # Change password
        # -----------------------------------------

        user.set_password(
            password
        )

        user.save()

        return Response(
            {
                "detail":
                    "Password has been reset successfully. "
                    "You can now log in."
            }
        )