from rest_framework.routers import DefaultRouter

from .views import (
    ProjectViewSet,
    ProjectImageViewSet,
    PublicProjectViewSet,
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


urlpatterns = router.urls