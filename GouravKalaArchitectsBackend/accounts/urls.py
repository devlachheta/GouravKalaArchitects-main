from django.urls import path

from .views import (
    EmailLoginView,
    ForgotPasswordView,
    ResetPasswordView,
)


urlpatterns = [
    path(
        "login/",
        EmailLoginView.as_view(),
        name="email-login",
    ),

    path(
        "forgot-password/",
        ForgotPasswordView.as_view(),
        name="forgot-password",
    ),

    path(
        "reset-password/<uidb64>/<token>/",
        ResetPasswordView.as_view(),
        name="reset-password",
    ),
]