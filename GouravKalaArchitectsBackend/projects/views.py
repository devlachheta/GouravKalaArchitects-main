from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from .models import Project, ProjectImage
from .serializers import ProjectSerializer, ProjectImageSerializer


class ProjectViewSet(viewsets.ModelViewSet):

    queryset = Project.objects.all().order_by("-created_at")
    serializer_class = ProjectSerializer

    permission_classes = [
        IsAuthenticatedOrReadOnly
    ]

    parser_classes = [
        MultiPartParser,
        FormParser
    ]

    @action(
        detail=True,
        methods=["post"],
        url_path="gallery"
    )
    def add_gallery_image(self, request, pk=None):

        project = self.get_object()

        serializer = ProjectImageSerializer(
            data=request.data
        )

        if serializer.is_valid():
            serializer.save(project=project)

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    @action(
        detail=True,
        methods=["delete"],
        url_path=r"gallery/(?P<image_id>[^/.]+)"
    )
    def delete_gallery_image(self, request, pk=None, image_id=None):

        project = self.get_object()

        try:
            image = project.gallery.get(
                id=image_id
            )
        except ProjectImage.DoesNotExist:
            return Response(
                {
                    "detail": "Gallery image not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        image.delete()

        return Response(
            status=status.HTTP_204_NO_CONTENT
        )