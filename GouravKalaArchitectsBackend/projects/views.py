from datetime import datetime, timedelta

from django.conf import settings
from django.db import transaction

import razorpay

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


from .models import (
    Project,
    ProjectImage,
    Consultation,
    WorkingHours,
    Booking,
)

from .serializers import (
    ProjectSerializer,
    ProjectImageSerializer,
    PublicProjectSerializer,
)


# =========================================================
# PROJECT API
# =========================================================

class ProjectViewSet(viewsets.ModelViewSet):

    queryset = Project.objects.all().order_by(
        "type",
        "display_order",
        "id",
    )

    serializer_class = ProjectSerializer

    @action(
        detail=False,
        methods=["patch"],
        url_path="reorder",
    )
    def reorder(self, request):

        project_ids = request.data.get("project_ids")
        project_type = request.data.get("type")

        if not isinstance(project_ids, list):
            return Response(
                {"error": "project_ids must be a list."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if project_type not in [
            "architecture",
            "interior",
        ]:
            return Response(
                {"error": "Invalid project type."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Make sure all IDs belong to the selected category
        projects = Project.objects.filter(
            id__in=project_ids,
            type=project_type,
        )

        if projects.count() != len(project_ids):
            return Response(
                {
                    "error": (
                        "Some projects do not exist or do not belong "
                        "to the selected category."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Save the new order
        with transaction.atomic():

            projects_by_id = {
                project.id: project
                for project in projects
            }

            for position, project_id in enumerate(
                project_ids,
                start=1,
            ):
                project = projects_by_id[project_id]

                project.display_order = position

                project.save(
                    update_fields=["display_order"]
                )

        return Response(
            {
                "message": "Project order updated successfully.",
                "type": project_type,
                "project_ids": project_ids,
            },
            status=status.HTTP_200_OK,
        )

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

        # Delete database record
        instance.delete()


# =========================================================
# PROJECT IMAGE API
# =========================================================

class ProjectImageViewSet(viewsets.ModelViewSet):

    queryset = ProjectImage.objects.all()

    serializer_class = ProjectImageSerializer


# =========================================================
# PUBLIC PROJECT API
# =========================================================

class PublicProjectViewSet(
    viewsets.ReadOnlyModelViewSet
):

    queryset = Project.objects.all().order_by(
        "type",
        "display_order",
        "id",
    )

    serializer_class = PublicProjectSerializer


# =========================================================
# CONSULTATION API
# =========================================================

class ConsultationViewSet(
    viewsets.ReadOnlyModelViewSet
):

    # Public API
    permission_classes = [AllowAny]

    queryset = Consultation.objects.filter(
        is_active=True
    ).order_by(
        "duration",
        "id",
    )

    def get_serializer_class(self):

        from .serializers import ConsultationSerializer

        return ConsultationSerializer

    # -----------------------------------------------------
    # AVAILABLE SLOTS
    # -----------------------------------------------------

    @action(
        detail=False,
        methods=["get"],
        url_path="slots",
    )
    def available_slots(self, request):

        date_string = request.query_params.get(
            "date"
        )

        consultation_id = request.query_params.get(
            "consultation_id"
        )

        # -------------------------------------------------
        # Validate date
        # -------------------------------------------------

        if not date_string:
            return Response(
                {
                    "error": "date is required."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:

            booking_date = datetime.strptime(
                date_string,
                "%Y-%m-%d",
            ).date()

        except ValueError:

            return Response(
                {
                    "error": (
                        "Invalid date format. "
                        "Use YYYY-MM-DD."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # -------------------------------------------------
        # Validate consultation
        # -------------------------------------------------

        if not consultation_id:

            return Response(
                {
                    "error": (
                        "consultation_id is required."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:

            consultation = Consultation.objects.get(
                id=consultation_id,
                is_active=True,
            )

        except Consultation.DoesNotExist:

            return Response(
                {
                    "error": "Consultation not found."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        # -------------------------------------------------
        # Check working hours
        # -------------------------------------------------

        working_hours = WorkingHours.objects.filter(
            day_of_week=booking_date.weekday(),
            is_active=True,
        ).first()

        if not working_hours:

            return Response(
                {
                    "date": date_string,
                    "consultation_id": consultation.id,
                    "duration": consultation.duration,
                    "price": consultation.price,
                    "slots": [],
                }
            )

        # -------------------------------------------------
        # Generate slots
        # -------------------------------------------------

        start_datetime = datetime.combine(
            booking_date,
            working_hours.start_time,
        )

        end_datetime = datetime.combine(
            booking_date,
            working_hours.end_time,
        )

        slot_duration = timedelta(
            minutes=consultation.duration
        )

        slots = []

        current_datetime = start_datetime

        while (
            current_datetime + slot_duration
            <= end_datetime
        ):

            slot_start = current_datetime

            slot_end = (
                current_datetime
                + slot_duration
            )

            start_time = slot_start.time()

            end_time = slot_end.time()

            # -------------------------------------------------
            # Check booking conflicts
            # -------------------------------------------------

            has_conflict = Booking.objects.filter(
                booking_date=booking_date,
                start_time__lt=end_time,
                end_time__gt=start_time,
            ).exclude(
                booking_status="cancelled"
            ).exclude(
                payment_status__in=[
                    "failed",
                    "refunded",
                ]
            ).exists()

            if not has_conflict:

                slots.append(
                    {
                        "start_time": (
                            start_time.strftime(
                                "%H:%M"
                            )
                        ),
                        "end_time": (
                            end_time.strftime(
                                "%H:%M"
                            )
                        ),
                    }
                )

            current_datetime += slot_duration

        # -------------------------------------------------
        # Return available slots
        # -------------------------------------------------

        return Response(
            {
                "date": date_string,
                "consultation_id": consultation.id,
                "duration": consultation.duration,
                "price": consultation.price,
                "slots": slots,
            }
        )

    
# =========================================================
# BOOKING API
# =========================================================

class BookingViewSet(
    viewsets.ModelViewSet
):

    permission_classes = [AllowAny]

    queryset = Booking.objects.all().order_by(
        "-booking_date",
        "-start_time",
    )

    def get_serializer_class(self):
        from .serializers import BookingSerializer
        return BookingSerializer



    @action(
        detail=False,
        methods=["post"],
        url_path="verify-payment",
    )

        
    def verify_payment(self, request):

        razorpay_order_id = request.data.get(
            "razorpay_order_id"
        )

        razorpay_payment_id = request.data.get(
            "razorpay_payment_id"
        )

        razorpay_signature = request.data.get(
            "razorpay_signature"
        )

        # -------------------------------------------------
        # VALIDATE REQUIRED FIELDS
        # -------------------------------------------------

        required_fields = {
            "razorpay_order_id": razorpay_order_id,
            "razorpay_payment_id": razorpay_payment_id,
            "razorpay_signature": razorpay_signature,
        }

        missing_fields = [
            field
            for field, value in required_fields.items()
            if not value
        ]

        if missing_fields:
            return Response(
                {
                    "error": "Missing required fields.",
                    "fields": missing_fields,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # -------------------------------------------------
        # FIND BOOKING
        # -------------------------------------------------

        try:
            booking = Booking.objects.get(
                razorpay_order_id=razorpay_order_id
            )

        except Booking.DoesNotExist:
            return Response(
                {
                    "error": (
                        "Booking not found for this "
                        "Razorpay order."
                    )
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        # -------------------------------------------------
        # VERIFY RAZORPAY SIGNATURE
        # -------------------------------------------------

        client = razorpay.Client(
            auth=(
                settings.RAZORPAY_KEY_ID,
                settings.RAZORPAY_KEY_SECRET,
            )
        )

        try:

            client.utility.verify_payment_signature(
                {
                    "razorpay_order_id": (
                        booking.razorpay_order_id
                    ),
                    "razorpay_payment_id": (
                        razorpay_payment_id
                    ),
                    "razorpay_signature": (
                        razorpay_signature
                    ),
                }
            )

        except razorpay.errors.SignatureVerificationError:

            return Response(
                {
                    "error": (
                        "Payment signature "
                        "verification failed."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # -------------------------------------------------
        # PREVENT DUPLICATE PROCESSING
        # -------------------------------------------------

        if booking.payment_status == "paid":

            return Response(
                {
                    "message": "Payment already verified.",
                    "booking": self.get_serializer(
                        booking
                    ).data,
                },
                status=status.HTTP_200_OK,
            )

        # -------------------------------------------------
        # UPDATE BOOKING
        # -------------------------------------------------

        booking.razorpay_payment_id = (
            razorpay_payment_id
        )

        booking.razorpay_signature = (
            razorpay_signature
        )

        booking.payment_status = "paid"

        booking.booking_status = "confirmed"

        booking.save(
            update_fields=[
                "razorpay_payment_id",
                "razorpay_signature",
                "payment_status",
                "booking_status",
                "updated_at",
            ]
        )

        # -------------------------------------------------
        # RESPONSE
        # -------------------------------------------------

        return Response(
            {
                "message": (
                    "Payment verified successfully. "
                    "Booking confirmed."
                ),
                "booking": self.get_serializer(
                    booking
                ).data,
            },
            status=status.HTTP_200_OK,
        )

    @action(
        detail=False,
        methods=["post"],
        url_path="create",
    )
    def create_booking(self, request):

        consultation_id = request.data.get("consultation_id")
        customer_name = request.data.get("customer_name")
        customer_email = request.data.get("customer_email")
        customer_phone = request.data.get("customer_phone")
        booking_date_string = request.data.get("booking_date")
        start_time_string = request.data.get("start_time")

        required_fields = {
            "consultation_id": consultation_id,
            "customer_name": customer_name,
            "customer_email": customer_email,
            "customer_phone": customer_phone,
            "booking_date": booking_date_string,
            "start_time": start_time_string,
        }

        missing_fields = [
            field
            for field, value in required_fields.items()
            if not value
        ]

        if missing_fields:
            return Response(
                {
                    "error": "Missing required fields.",
                    "fields": missing_fields,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # -------------------------------------------------
        # GET CONSULTATION
        # -------------------------------------------------

        try:
            consultation = Consultation.objects.get(
                id=consultation_id,
                is_active=True,
            )
        except Consultation.DoesNotExist:
            return Response(
                {"error": "Consultation not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        # -------------------------------------------------
        # VALIDATE DATE
        # -------------------------------------------------

        try:
            booking_date = datetime.strptime(
                booking_date_string,
                "%Y-%m-%d",
            ).date()

        except ValueError:
            return Response(
                {
                    "error": (
                        "Invalid booking date. "
                        "Use YYYY-MM-DD."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # -------------------------------------------------
        # VALIDATE TIME
        # -------------------------------------------------

        try:
            start_time = datetime.strptime(
                start_time_string,
                "%H:%M",
            ).time()

        except ValueError:
            return Response(
                {
                    "error": (
                        "Invalid start time. "
                        "Use HH:MM."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # -------------------------------------------------
        # CHECK WORKING HOURS
        # -------------------------------------------------

        working_hours = WorkingHours.objects.filter(
            day_of_week=booking_date.weekday(),
            is_active=True,
        ).first()

        if not working_hours:
            return Response(
                {
                    "error": (
                        "Bookings are not available "
                        "on this day."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # -------------------------------------------------
        # CALCULATE END TIME
        # -------------------------------------------------

        start_datetime = datetime.combine(
            booking_date,
            start_time,
        )

        end_datetime = (
            start_datetime
            + timedelta(
                minutes=consultation.duration
            )
        )

        end_time = end_datetime.time()

        # -------------------------------------------------
        # CHECK WORKING HOURS BOUNDARY
        # -------------------------------------------------

        working_start = datetime.combine(
            booking_date,
            working_hours.start_time,
        )

        working_end = datetime.combine(
            booking_date,
            working_hours.end_time,
        )

        if (
            start_datetime < working_start
            or end_datetime > working_end
        ):
            return Response(
                {
                    "error": (
                        "Selected time is outside "
                        "working hours."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # -------------------------------------------------
        # CHECK SLOT ALIGNMENT
        # -------------------------------------------------

        slot_minutes = consultation.duration

        minutes_from_start = (
            start_datetime - working_start
        ).total_seconds() / 60

        if minutes_from_start % slot_minutes != 0:
            return Response(
                {
                    "error": (
                        "Invalid time slot for "
                        "this consultation."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # -------------------------------------------------
        # CREATE BOOKING
        # -------------------------------------------------

        with transaction.atomic():

            conflicting_booking = (
                Booking.objects
                .select_for_update()
                .filter(
                    booking_date=booking_date,
                    start_time__lt=end_time,
                    end_time__gt=start_time,
                )
                .exclude(
                    booking_status="cancelled"
                )
                .exclude(
                    payment_status__in=[
                        "failed",
                        "refunded",
                    ]
                )
                .first()
            )

            if conflicting_booking:
                return Response(
                    {
                        "error": (
                            "This time slot is "
                            "no longer available."
                        )
                    },
                    status=status.HTTP_409_CONFLICT,
                )

            booking = Booking.objects.create(
                consultation=consultation,
                customer_name=customer_name,
                customer_email=customer_email,
                customer_phone=customer_phone,
                booking_date=booking_date,
                start_time=start_time,
                end_time=end_time,

                # IMPORTANT:
                # Price comes from Django database.
                amount=consultation.price,

                payment_status="pending",
                booking_status="pending",
            )

            # -------------------------------------------------
            # CREATE RAZORPAY ORDER
            # -------------------------------------------------

            client = razorpay.Client(
                auth=(
                    settings.RAZORPAY_KEY_ID,
                    settings.RAZORPAY_KEY_SECRET,
                )
            )

            razorpay_order = client.order.create(
                {
                    "amount": int(
                        booking.amount * 100
                    ),
                    "currency": "INR",
                    "receipt": f"booking_{booking.id}",
                }
            )

            # -------------------------------------------------
            # SAVE RAZORPAY ORDER ID
            # -------------------------------------------------

            booking.razorpay_order_id = (
                razorpay_order["id"]
            )

            booking.save(
                update_fields=[
                    "razorpay_order_id",
                    "updated_at",
                ]
            )

        # -------------------------------------------------
        # RESPONSE
        # -------------------------------------------------

        serializer = self.get_serializer(
            booking
        )

        return Response(
            {
                "message": (
                    "Booking created and "
                    "Razorpay order created."
                ),
                "booking": serializer.data,
                "razorpay": {
                    "key_id": settings.RAZORPAY_KEY_ID,
                    "order_id": razorpay_order["id"],
                    "amount": razorpay_order["amount"],
                    "currency": razorpay_order["currency"],
                },
            },
            status=status.HTTP_201_CREATED,
        )