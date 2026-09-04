from rest_framework.routers import DefaultRouter

from .views import (
    ProjectViewSet,
    ProjectImageViewSet,
    PublicProjectViewSet,
    ConsultationViewSet,
    BookingViewSet,
)


router = DefaultRouter()


# ================= ADMIN API =================

router.register(
    r"projects",
    ProjectViewSet,
    basename="project"
)

router.register(
    r"project-images",
    ProjectImageViewSet,
    basename="project-image"
)


# ================= PUBLIC API =================

router.register(
    r"public/projects",
    PublicProjectViewSet,
    basename="public-project"
)

router.register(
    r"consultations",
    ConsultationViewSet,
    basename="consultation"
)

router.register(
    r"bookings",
    BookingViewSet,
    basename="booking"
)


urlpatterns = router.urls