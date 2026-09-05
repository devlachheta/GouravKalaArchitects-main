from django.conf import settings
from django.core.mail import EmailMessage

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from .models import Homepage, About, Reel
from .serializers import (
    HomepageSerializer,
    AboutSerializer,
    ReelSerializer,
)


# =========================================================
# HOMEPAGE
# =========================================================

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


# =========================================================
# ABOUT
# =========================================================

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


class ReelView(APIView):

    permission_classes = [AllowAny]

    def get(self, request, pk=None):

        if pk:
            try:
                reel = Reel.objects.get(pk=pk)
            except Reel.DoesNotExist:
                return Response(
                    {
                        "detail": "Reel not found."
                    },
                    status=404
                )

            serializer = ReelSerializer(
                reel,
                context={
                    "request": request
                }
            )

            return Response(
                serializer.data
            )

        if request.query_params.get("admin") == "true":
            reels = Reel.objects.all().order_by(
                "order",
                "created_at"
            )
        else:
            reels = Reel.objects.filter(
                is_active=True
            ).order_by(
                "order",
                "created_at"
            )

        serializer = ReelSerializer(
            reels,
            many=True,
            context={
                "request": request
            }
        )

        return Response(
            serializer.data
        )

    def post(self, request):

        serializer = ReelSerializer(
            data=request.data,
            context={
                "request": request
            }
        )

        if serializer.is_valid():

            reel = serializer.save()

            return Response(
                ReelSerializer(
                    reel,
                    context={
                        "request": request
                    }
                ).data,
                status=201
            )

        return Response(
            serializer.errors,
            status=400
        )

    def patch(self, request, pk=None):

        if not pk:
            return Response(
                {
                    "detail": "Reel ID is required."
                },
                status=400
            )

        try:
            reel = Reel.objects.get(pk=pk)
        except Reel.DoesNotExist:
            return Response(
                {
                    "detail": "Reel not found."
                },
                status=404
            )

        old_video = reel.video

        serializer = ReelSerializer(
            reel,
            data=request.data,
            partial=True,
            context={
                "request": request
            }
        )

        if serializer.is_valid():

            updated_reel = serializer.save()

            new_video = updated_reel.video

            if (
                old_video
                and new_video
                and old_video.name != new_video.name
            ):
                old_video.delete(
                    save=False
                )

            return Response(
                ReelSerializer(
                    updated_reel,
                    context={
                        "request": request
                    }
                ).data
            )

        return Response(
            serializer.errors,
            status=400
        )

    def delete(self, request, pk=None):

        if not pk:
            return Response(
                {
                    "detail": "Reel ID is required."
                },
                status=400
            )

        try:
            reel = Reel.objects.get(pk=pk)
        except Reel.DoesNotExist:
            return Response(
                {
                    "detail": "Reel not found."
                },
                status=404
            )

        reel.delete()

        return Response(
            status=204
        )

# =========================================================
# CONTACT FORM
# =========================================================

class ContactFormView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        name = request.data.get(
            "name",
            ""
        ).strip()

        email = request.data.get(
            "email",
            ""
        ).strip()

        phone = request.data.get(
            "phone",
            ""
        ).strip()

        project_type = request.data.get(
            "projectType",
            ""
        ).strip()

        message = request.data.get(
            "message",
            ""
        ).strip()

        # -----------------------------------------
        # Required fields
        # -----------------------------------------

        if not name:

            return Response(
                {
                    "detail":
                        "Name is required."
                },
                status=400
            )

        if not email:

            return Response(
                {
                    "detail":
                        "Email is required."
                },
                status=400
            )

        if not phone:

            return Response(
                {
                    "detail":
                        "Phone number is required."
                },
                status=400
            )

        if not project_type:

            return Response(
                {
                    "detail":
                        "Project type is required."
                },
                status=400
            )

        # -----------------------------------------
        # Email content
        # -----------------------------------------

        subject = f"New Website Enquiry - {project_type}"

        email_body = f"""
You have received a new enquiry from the GKA website.

----------------------------------------
CONTACT DETAILS
----------------------------------------

Name:
{name}

Email:
{email}

Phone:
{phone}

Project Type:
{project_type}

----------------------------------------
PROJECT DETAILS
----------------------------------------

{message}

----------------------------------------
This email was sent from the GKA website contact form.
----------------------------------------
"""

        try:

            contact_email = EmailMessage(
                subject=subject,
                body=email_body,
                from_email=settings.EMAIL_HOST_USER,
                to=[
                    settings.CONTACT_RECEIVER_EMAIL
                ],
                reply_to=[
                    email
                ],
            )

            contact_email.send(
                fail_silently=False
            )

            return Response(
                {
                    "detail":
                        "Your enquiry has been sent successfully."
                },
                status=200
            )

        except Exception as error:

            print(
                "Contact email error:",
                error
            )

            return Response(
                {
                    "detail":
                        "Unable to send your enquiry right now."
                },
                status=500
            )