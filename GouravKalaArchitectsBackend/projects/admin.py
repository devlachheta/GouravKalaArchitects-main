from django.contrib import admin
from django import forms
from adminsortable2.admin import SortableAdminMixin

from .models import (
    Project,
    ProjectImage,
    Consultation,
    WorkingHours,
    Booking,
    BlockedSlot,
)


class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1


@admin.register(Project)
class ProjectAdmin(SortableAdminMixin, admin.ModelAdmin):

    list_display = (
        "title",
        "type",
        "display_order",
        "location",
        "year",
        "status",
        "created_at",
    )

    list_filter = (
        "type",
        "status",
        "year",
    )

    search_fields = (
        "title",
        "location",
        "description",
    )

    prepopulated_fields = {
        "slug": ("title",),
    }

    ordering = (
        "type",
        "display_order",
    )

    inlines = [
        ProjectImageInline,
    ]


@admin.register(ProjectImage)
class ProjectImageAdmin(admin.ModelAdmin):

    list_display = (
        "project",
        "display_order",
        "position",
        "created_at",
    )

    list_filter = (
        "project",
    )

    ordering = (
        "project",
        "display_order",
    )



# Admin configurations for consultation and booking models

@admin.register(Consultation)
class ConsultationAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "duration",
        "price",
        "is_active",
        "created_at",
    )

    list_filter = (
        "duration",
        "is_active",
    )


@admin.register(WorkingHours)
class WorkingHoursAdmin(admin.ModelAdmin):
    list_display = (
        "day_of_week",
        "start_time",
        "end_time",
        "is_active",
    )

    list_filter = (
        "day_of_week",
        "is_active",
    )

    ordering = ("day_of_week",)



@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "customer_name",
        "customer_email",
        "customer_phone",
        "consultation",
        "booking_date",
        "start_time",
        "end_time",
        "amount",
        "payment_status",
        "booking_status",
        "created_at",
    )

    list_filter = (
        "payment_status",
        "booking_status",
        "booking_date",
        "consultation",
    )

    search_fields = (
        "customer_name",
        "customer_email",
        "customer_phone",
        "razorpay_order_id",
        "razorpay_payment_id",
    )

    ordering = (
        "-booking_date",
        "-start_time",
    )

    readonly_fields = (
        "razorpay_order_id",
        "razorpay_payment_id",
        "razorpay_signature",
        "created_at",
        "updated_at",
    )

    fieldsets = (
        (
            "Customer Information",
            {
                "fields": (
                    "customer_name",
                    "customer_email",
                    "customer_phone",
                )
            },
        ),
        (
            "Booking Information",
            {
                "fields": (
                    "consultation",
                    "booking_date",
                    "start_time",
                    "end_time",
                    "amount",
                )
            },
        ),
        (
            "Payment",
            {
                "fields": (
                    "payment_status",
                    "razorpay_order_id",
                    "razorpay_payment_id",
                    "razorpay_signature",
                )
            },
        ),
        (
            "Booking Status",
            {
                "fields": (
                    "booking_status",
                )
            },
        ),
        (
            "System Information",
            {
                "fields": (
                    "created_at",
                    "updated_at",
                )
            },
        ),
    )
 
 
from django import forms

class BlockedSlotForm(forms.ModelForm):

    class Meta:
        model = BlockedSlot

        fields = (
            "booking_date",
            "start_time",
            "end_time",
            "reason",
            "is_active",
        )

        widgets = {
            "booking_date": forms.DateInput(
                attrs={
                    "type": "date",
                }
            ),

            "start_time": forms.TimeInput(
                format="%H:%M",
                attrs={
                    "type": "time",
                    "min": "10:00",
                    "max": "18:00",
                    "step": "900",
                },
            ),

            "end_time": forms.TimeInput(
                format="%H:%M",
                attrs={
                    "type": "time",
                    "min": "10:00",
                    "max": "18:00",
                    "step": "900",
                },
            ),
        }   
@admin.register(BlockedSlot)
class BlockedSlotAdmin(admin.ModelAdmin):
    form = BlockedSlotForm
    list_display = (
        "booking_date",
        "start_time",
        "end_time",
        "reason",
        "is_active",
        "created_at",
    )

    list_filter = (
        "booking_date",
        "is_active",
    )

    search_fields = (
        "reason",
    )

    ordering = (
        "-booking_date",
        "start_time",
    )    