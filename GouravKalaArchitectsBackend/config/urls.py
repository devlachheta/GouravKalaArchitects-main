"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views.
"""

import mimetypes

from django.contrib import admin

from django.urls import (
    path,
    include,
)

from django.conf import settings

from django.conf.urls.static import static

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


mimetypes.add_type(
    "image/webp",
    ".webp"
)


urlpatterns = [

    # -----------------------------------------
    # Django Admin
    # -----------------------------------------

    path(
        "admin/",
        admin.site.urls,
    ),

    # -----------------------------------------
    # Projects API
    # -----------------------------------------

    path(
        "api/",
        include("projects.urls"),
    ),

    # -----------------------------------------
    # JWT Refresh
    # -----------------------------------------

    path(
        "api/auth/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh",
    ),

    # -----------------------------------------
    # Accounts
    # -----------------------------------------

    path(
        "api/auth/",
        include("accounts.urls"),
    ),

    # -----------------------------------------
    # Website
    # -----------------------------------------

    path(
        "api/",
        include("website.urls"),
    ),
]


# -----------------------------------------
# Media files during development
# -----------------------------------------

if settings.DEBUG:

    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT,
    )