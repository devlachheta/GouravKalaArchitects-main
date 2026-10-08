# pyrefly: ignore [missing-import]
from django.contrib.auth import get_user_model
# pyrefly: ignore [missing-import]
from django.contrib.auth.tokens import PasswordResetTokenGenerator
# pyrefly: ignore [missing-import]
from django.core.mail import send_mail
# pyrefly: ignore [missing-import]
from django.conf import settings

# pyrefly: ignore [missing-import]
from django.utils.encoding import (
    force_bytes,
    force_str,
)

# pyrefly: ignore [missing-import]
from django.utils.http import (
    urlsafe_base64_decode,
    urlsafe_base64_encode,
)

# pyrefly: ignore [missing-import]
from rest_framework.permissions import AllowAny
# pyrefly: ignore [missing-import]
from rest_framework.response import Response
# pyrefly: ignore [missing-import]
from rest_framework.views import APIView

# pyrefly: ignore [missing-import]
from rest_framework_simplejwt.tokens import RefreshToken
# pyrefly: ignore [missing-import]
from rest_framework_simplejwt.exceptions import TokenError

from .serializers import EmailTokenObtainPairSerializer


User = get_user_model()

token_generator = PasswordResetTokenGenerator()


# =========================================================
# EMAIL LOGIN
# =========================================================

class EmailLoginView(APIView):

    authentication_classes = []
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

            # Return success even if email doesn't exist to prevent email enumeration attacks
            return Response(
                {
                    "detail":
                        "If an account exists, a password reset link has been sent."
                }
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

        # -----------------------------------------
        # Send Email
        # -----------------------------------------

        # Dynamically use FRONTEND_URL from settings/env so it works in production
        frontend_url = getattr(settings, 'FRONTEND_URL', 'http://localhost:5173').rstrip('/')
        reset_url = f"{frontend_url}/cms/reset-password/{uid}/{token}"

        try:
            send_mail(
                subject="Password Reset Request",
                message=f"You requested a password reset. Click the link below to reset your password:\n\n{reset_url}\n\nIf you did not request this, please ignore this email.",
                from_email=getattr(settings, 'DEFAULT_FROM_EMAIL', 'noreply@yourdomain.com'),
                recipient_list=[user.email],
                fail_silently=False,
            )
        except Exception as e:
            print("Failed to send email:", e)
            return Response(
                {
                    "detail": "Failed to send reset email. Please contact support."
                },
                status=500
            )

        return Response(
            {
                "detail":
                    "If an account exists, a password reset link has been sent."
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
