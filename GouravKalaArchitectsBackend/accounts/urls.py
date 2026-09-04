from django.urls import path

from .views import (
    EmailLoginView,
    LogoutView,
    ForgotPasswordView,
    ResetPasswordView,
)


urlpatterns = [

    # =====================================================
    # LOGIN
    # =====================================================

    path(
        "login/",
        EmailLoginView.as_view(),
        name="email-login",
    ),


    # =====================================================
    # LOGOUT
    # =====================================================

    path(
        "logout/",
        LogoutView.as_view(),
        name="logout",
    ),


    # =====================================================
    # FORGOT PASSWORD
    # =====================================================

    path(
        "forgot-password/",
        ForgotPasswordView.as_view(),
        name="forgot-password",
    ),


    # =====================================================
    # RESET PASSWORD
    # =====================================================

    path(
        "reset-password/<uidb64>/<token>/",
        ResetPasswordView.as_view(),
        name="reset-password",
    ),
]