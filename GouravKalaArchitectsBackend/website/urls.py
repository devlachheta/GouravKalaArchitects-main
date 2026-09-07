from django.urls import path

from .views import (
    HomepageView,
    AboutView,
    ContactFormView,
    ReelView,
)


urlpatterns = [

    # =====================================================
    # HOMEPAGE
    # =====================================================

    path(
        "homepage/",
        HomepageView.as_view(),
        name="homepage",
    ),


    # =====================================================
    # ABOUT
    # =====================================================

    path(
        "about/",
        AboutView.as_view(),
        name="about",
    ),


    # =====================================================
    # REELS
    # =====================================================
path(
    "reels/",
    ReelView.as_view(),
    name="reels",
),

path(
    "reels/<int:pk>/",
    ReelView.as_view(),
    name="reel-detail",
),
    # =====================================================
    # CONTACT
    # =====================================================

    path(
        "contact/",
        ContactFormView.as_view(),
        name="contact",
    ),

]