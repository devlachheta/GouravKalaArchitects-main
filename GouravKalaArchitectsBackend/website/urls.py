from django.urls import path

from .views import HomepageView, AboutView, ContactFormView


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

    path(
        "contact/",
        ContactFormView.as_view(),
        name="contact",
    ),

]