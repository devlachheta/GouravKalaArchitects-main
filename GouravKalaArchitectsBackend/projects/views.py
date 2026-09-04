from rest_framework import viewsets

from .models import Project, ProjectImage
from .serializers import (
    ProjectSerializer,
    ProjectImageSerializer,
    PublicProjectSerializer,
)


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().order_by("-created_at")
    serializer_class = ProjectSerializer

    def perform_destroy(self, instance):
        # Delete banner image from Cloudinary
        if instance.banner_image:
            instance.banner_image.delete(save=False)

        # Delete card image from Cloudinary
        if instance.card_image:
            instance.card_image.delete(save=False)

        # Delete all gallery images from Cloudinary
        for gallery_image in instance.gallery.all():
            if gallery_image.image:
                gallery_image.image.delete(save=False)

        # Delete the database record
        instance.delete()


class ProjectImageViewSet(viewsets.ModelViewSet):
    queryset = ProjectImage.objects.all()
    serializer_class = ProjectImageSerializer


class PublicProjectViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = Project.objects.all().order_by("-created_at")

    serializer_class = PublicProjectSerializer