from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Homepage, About
from .serializers import HomepageSerializer, AboutSerializer


class HomepageView(APIView):

    def get(self, request):

        homepage = Homepage.objects.first()

        if not homepage:
            return Response({
                "years": "07+",
                "projects": "48+",
                "cities": "06+",
            })

        serializer = HomepageSerializer(homepage)

        return Response(serializer.data)

    def patch(self, request):

        homepage = Homepage.objects.first()

        if not homepage:
            homepage = Homepage.objects.create()

        serializer = HomepageSerializer(
            homepage,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=400
        )


class AboutView(APIView):

    def get(self, request):

        about = About.objects.first()

        if not about:
            return Response({
                "instagram_followers": 100000,
                "facebook_followers": 98000,
                "youtube_subscribers": 67000,
            })

        serializer = AboutSerializer(about)

        return Response(serializer.data)

    def patch(self, request):

        about = About.objects.first()

        if not about:
            about = About.objects.create()

        serializer = AboutSerializer(
            about,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=400
        )