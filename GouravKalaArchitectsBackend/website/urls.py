from django.urls import path

from .views import HomepageView, AboutView


urlpatterns = [

    path(
        "homepage/",
        HomepageView.as_view(),
        name="homepage",
    ),

    path(
        "about/",
        AboutView.as_view(),
        name="about",
    ),

]