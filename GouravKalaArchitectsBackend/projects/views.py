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


class ProjectImageViewSet(viewsets.ModelViewSet):
    queryset = ProjectImage.objects.all()
    serializer_class = ProjectImageSerializer


class PublicProjectViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = Project.objects.all().order_by("-created_at")

    serializer_class = PublicProjectSerializer