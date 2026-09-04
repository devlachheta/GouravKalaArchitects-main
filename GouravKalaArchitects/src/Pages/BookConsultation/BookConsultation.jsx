import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../Component/Header";
import api from "../../services/api";

import Step1Consultation from "./Step1Consultation";
import Step2DateTime from "./Step2DateTime";
import Step3Details from "./Step3Details";
import Step4Review from "./Step4Review";
import Step5Payment from "./Step5Payment";
import Step6Confirmation from "./Step6Confirmation";

import "../../styles/BookConsultation.css";


function BookConsultation() {

    const navigate = useNavigate();

    /* =========================================================
       STEP
    ========================================================= */

    const [step, setStep] = useState(1);


    /* =========================================================
       CONSULTATIONS
    ========================================================= */

    const [consultations, setConsultations] = useState([]);
    const [selectedConsultation, setSelectedConsultation] = useState(null);

    const [loadingConsultations, setLoadingConsultations] = useState(true);
    const [consultationError, setConsultationError] = useState("");


    /* =========================================================
       DATE
    ========================================================= */

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const [selectedDate, setSelectedDate] = useState(null);

    const [currentMonth, setCurrentMonth] = useState(
        new Date(
            today.getFullYear(),
            today.getMonth(),
            1
        )
    );


    /* =========================================================
       TIME
    ========================================================= */

    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);

    const [loadingSlots, setLoadingSlots] = useState(false);
    const [slotError, setSlotError] = useState("");


    /* =========================================================
       CUSTOMER DETAILS
    ========================================================= */

    const [customerDetails, setCustomerDetails] = useState({
        customer_name: "",
        customer_email: "",
        customer_phone: "",
    });

    const [formError, setFormError] = useState("");


    /* =========================================================
       BOOKING
    ========================================================= */

    const [booking, setBooking] = useState(null);


    /* =========================================================
       PAYMENT
    ========================================================= */

    const [paymentError, setPaymentError] = useState("");
    const [processingPayment, setProcessingPayment] = useState(false);


    /* =========================================================
       LOAD CONSULTATIONS
    ========================================================= */

    useEffect(() => {

        const fetchConsultations = async () => {

            try {

                setLoadingConsultations(true);
                setConsultationError("");

                const response = await api.get(
                    "consultations/"
                );

                setConsultations(
                    Array.isArray(response.data)
                        ? response.data
                        : response.data?.results || []
                );

            } catch (error) {

                console.error(
                    "Error loading consultations:",
                    error
                );

                setConsultationError(
                    "Unable to load consultation options. Please try again."
                );

            } finally {

                setLoadingConsultations(false);

            }
        };

        fetchConsultations();

    }, []);


    /* =========================================================
       FORMAT DATE FOR API
    ========================================================= */

    const formatDateForAPI = (date) => {

        if (!date) {
            return "";
        }

        const year = date.getFullYear();

        const month = String(
            date.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            date.getDate()
        ).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };


    /* =========================================================
       DISPLAY DATE
    ========================================================= */

    const formatDisplayDate = (date) => {

        if (!date) {
            return "";
        }

        return date.toLocaleDateString(
            "en-IN",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
            }
        );
    };


    /* =========================================================
       FORMAT PRICE
    ========================================================= */

    const formatPrice = (price) => {

        if (
            price === null ||
            price === undefined ||
            price === ""
        ) {
            return "₹0";
        }

        return `₹${Number(price).toLocaleString("en-IN")}`;
    };


    /* =========================================================
       FORMAT TIME
    ========================================================= */

    const formatTime = (time) => {

        if (!time) {
            return "";
        }

        const [hoursString, minutesString] =
            String(time).split(":");

        let hours = Number(hoursString);

        const minutes = minutesString || "00";

        const period = hours >= 12
            ? "PM"
            : "AM";

        hours = hours % 12;

        if (hours === 0) {
            hours = 12;
        }

        return `${hours}:${minutes} ${period}`;
    };


    /* =========================================================
       LOAD AVAILABLE SLOTS
    ========================================================= */

    const fetchAvailableSlots = async (date) => {

        if (!date || !selectedConsultation) {
            return;
        }

        try {

            setLoadingSlots(true);
            setSlotError("");
            setAvailableSlots([]);
            setSelectedTime(null);

            const response = await api.get(
                "consultations/slots/",
                {
                    params: {
                        date: formatDateForAPI(date),
                        consultation_id:
                            selectedConsultation.id,
                    },
                }
            );

            setAvailableSlots(
                response.data?.slots ||
                response.data ||
                []
            );

        } catch (error) {

            console.error(
                "Error loading available slots:",
                error
            );

            setSlotError(
                error.response?.data?.error ||
                "Unable to load available time slots."
            );

        } finally {

            setLoadingSlots(false);

        }
    };


    /* =========================================================
       SELECT DATE
    ========================================================= */

    const handleSelectDate = (date) => {

        if (!date) {
            return;
        }

        const normalizedDate = new Date(date);

        normalizedDate.setHours(
            0,
            0,
            0,
            0
        );

        if (normalizedDate < today) {
            return;
        }

        if (normalizedDate.getDay() === 0) {
            return;
        }

        setSelectedDate(normalizedDate);
        setSelectedTime(null);
        setAvailableSlots([]);
        setSlotError("");

        fetchAvailableSlots(normalizedDate);
    };


    /* =========================================================
       SELECT TIME
    ========================================================= */

    const handleSelectTime = (time) => {

        setSelectedTime(time);
        setSlotError("");

    };


    /* =========================================================
       SELECT CONSULTATION
    ========================================================= */

    const handleSelectConsultation = (
        consultation
    ) => {

        setSelectedConsultation(
            consultation
        );

        setSelectedDate(null);
        setSelectedTime(null);
        setAvailableSlots([]);
        setSlotError("");

    };


    /* =========================================================
       CUSTOMER INPUT
    ========================================================= */

    const handleCustomerChange = (event) => {

        const {
            id,
            value,
        } = event.target;

        setCustomerDetails(
            (current) => ({
                ...current,
                [id]: value,
            })
        );

        setFormError("");
    };


    /* =========================================================
       STEP 1 → STEP 2
    ========================================================= */

    const handleStep1Next = () => {

        if (!selectedConsultation) {
            return;
        }

        setStep(2);
    };


    /* =========================================================
       STEP 2 → STEP 3
    ========================================================= */

    const handleStep2Next = () => {

        if (!selectedDate || !selectedTime) {

            setSlotError(
                "Please select a date and time to continue."
            );

            return;
        }

        setSlotError("");
        setStep(3);
    };


    /* =========================================================
       STEP 3 → STEP 4
    ========================================================= */

    const handleStep3Next = () => {

        if (
            !customerDetails.customer_name.trim()
        ) {

            setFormError(
                "Please enter your full name."
            );

            return;
        }

        if (
            !customerDetails.customer_email.trim()
        ) {

            setFormError(
                "Please enter your email address."
            );

            return;
        }

        if (
            !customerDetails.customer_phone.trim()
        ) {

            setFormError(
                "Please enter your phone number."
            );

            return;
        }

        setFormError("");
        setStep(4);
    };


    /* =========================================================
       BACK FUNCTIONS
    ========================================================= */

    const handleBackToStep1 = () => {
        setStep(1);
    };

    const handleBackToStep2 = () => {
        setStep(2);
    };

    const handleBackToStep3 = () => {
        setStep(3);
    };


    /* =========================================================
       STEP 4 → STEP 5
    ========================================================= */

    const handleStep4Next = () => {

        setPaymentError("");
        setStep(5);

    };


    /* =========================================================
       CALENDAR HELPERS
    ========================================================= */

    const goToPreviousMonth = () => {

        setCurrentMonth(
            new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth() - 1,
                1
            )
        );

    };


    const goToNextMonth = () => {

        setCurrentMonth(
            new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth() + 1,
                1
            )
        );

    };


    const getDaysInMonth = () => {

        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        const firstDay = new Date(
            year,
            month,
            1
        ).getDay();

        const daysInMonth = new Date(
            year,
            month + 1,
            0
        ).getDate();

        const days = [];

        /*
         * Add empty spaces before the first day.
         * Convert Sunday from 0 to 6 so Monday is the first day.
         */
        const startingDay =
            firstDay === 0
                ? 6
                : firstDay - 1;


        for (
            let i = 0;
            i < startingDay;
            i++
        ) {
            days.push(null);
        }


        /*
         * Add every date of the month.
         */
        for (
            let day = 1;
            day <= daysInMonth;
            day++
        ) {

            days.push(
                new Date(
                    year,
                    month,
                    day
                )
            );

        }


        return days;
    };

    const isPastDate = (date) => {

        if (!date) {
            return false;
        }

        const checkDate = new Date(date);

        checkDate.setHours(
            0,
            0,
            0,
            0
        );

        return checkDate < today;

    };


    const isSunday = (date) => {

        if (!date) {
            return false;
        }

        return date.getDay() === 0;

    };


    const isSameDate = (
        date1,
        date2
    ) => {

        if (!date1 || !date2) {
            return false;
        }

        return (
            date1.getFullYear() ===
            date2.getFullYear() &&
            date1.getMonth() ===
            date2.getMonth() &&
            date1.getDate() ===
            date2.getDate()
        );

    };


    /* =========================================================
       RAZORPAY SCRIPT
    ========================================================= */

    const loadRazorpayScript = () => {

        return new Promise((resolve) => {

            if (window.Razorpay) {

                resolve(true);
                return;

            }

            const existingScript =
                document.querySelector(
                    'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
                );

            if (existingScript) {

                existingScript.addEventListener(
                    "load",
                    () => resolve(true)
                );

                existingScript.addEventListener(
                    "error",
                    () => resolve(false)
                );

                return;

            }

            const script =
                document.createElement("script");

            script.src =
                "https://checkout.razorpay.com/v1/checkout.js";

            script.async = true;

            script.onload = () => {
                resolve(true);
            };

            script.onerror = () => {
                resolve(false);
            };

            document.body.appendChild(script);

        });

    };


    /* =========================================================
       PAYMENT
    ========================================================= */

    const handlePayment = async () => {

        if (
            !selectedConsultation ||
            !selectedDate ||
            !selectedTime
        ) {

            setPaymentError(
                "Your consultation date or time is missing."
            );

            return;
        }


        if (
            !customerDetails.customer_name.trim() ||
            !customerDetails.customer_email.trim() ||
            !customerDetails.customer_phone.trim()
        ) {

            setPaymentError(
                "Please complete your details before payment."
            );

            setStep(3);

            return;
        }


        try {

            setProcessingPayment(true);
            setPaymentError("");


            /* -----------------------------------------
               LOAD RAZORPAY
            ----------------------------------------- */

            const razorpayLoaded =
                await loadRazorpayScript();


            if (!razorpayLoaded) {

                throw new Error(
                    "Unable to load Razorpay. Please check your internet connection."
                );

            }


            /* -----------------------------------------
               CREATE BOOKING
            ----------------------------------------- */

            const response = await api.post(
                "bookings/create/",
                {
                    consultation_id:
                        selectedConsultation.id,

                    customer_name:
                        customerDetails.customer_name.trim(),

                    customer_email:
                        customerDetails.customer_email.trim(),

                    customer_phone:
                        customerDetails.customer_phone.trim(),

                    booking_date:
                        formatDateForAPI(selectedDate),

                    start_time:
                        selectedTime,
                }
            );


            const bookingData =
                response.data?.booking;

            const razorpayData =
                response.data?.razorpay;


            if (!razorpayData?.order_id) {

                throw new Error(
                    "Razorpay order was not created."
                );

            }


            setBooking(
                bookingData || null
            );


            /* -----------------------------------------
               RAZORPAY OPTIONS
            ----------------------------------------- */

            const options = {

                key: razorpayData.key_id,

                amount: razorpayData.amount,

                currency:
                    razorpayData.currency || "INR",

                name:
                    "Gourav Kala Architects",

                description:
                    `${selectedConsultation.duration}-Minute Consultation`,

                order_id:
                    razorpayData.order_id,

                prefill: {

                    name:
                        customerDetails.customer_name,

                    email:
                        customerDetails.customer_email,

                    contact:
                        customerDetails.customer_phone,

                },

                notes: {

                    consultation:
                        `${selectedConsultation.duration}-Minute Consultation`,

                    booking_date:
                        formatDateForAPI(selectedDate),

                    start_time:
                        selectedTime,

                },

                theme: {
                    color: "#171717",
                },


                handler:
                    async function (
                        paymentResponse
                    ) {

                        try {

                            setProcessingPayment(true);
                            setPaymentError("");


                            const verifyResponse =
                                await api.post(
                                    "bookings/verify-payment/",
                                    {
                                        razorpay_order_id:
                                            paymentResponse.razorpay_order_id,

                                        razorpay_payment_id:
                                            paymentResponse.razorpay_payment_id,

                                        razorpay_signature:
                                            paymentResponse.razorpay_signature,
                                    }
                                );


                            setBooking(
                                verifyResponse.data?.booking ||
                                bookingData
                            );


                            setStep(6);

                        } catch (error) {

                            console.error(
                                "Payment verification failed:",
                                error
                            );

                            setPaymentError(
                                error.response?.data?.error ||
                                "Payment verification failed. Please contact us if the amount was deducted."
                            );

                        } finally {

                            setProcessingPayment(false);

                        }

                    },


                modal: {

                    ondismiss: () => {

                        setProcessingPayment(false);

                        setPaymentError(
                            "Payment was cancelled. You can try again."
                        );

                    },

                },

            };


            /* -----------------------------------------
               OPEN RAZORPAY
            ----------------------------------------- */

            const razorpay =
                new window.Razorpay(
                    options
                );


            razorpay.on(
                "payment.failed",
                (response) => {

                    console.error(
                        "Razorpay payment failed:",
                        response
                    );

                    setPaymentError(
                        response.error?.description ||
                        "Payment failed. Please try again."
                    );

                    setProcessingPayment(false);

                }
            );


            razorpay.open();


        } catch (error) {

            console.error(
                "Payment error:",
                error
            );

            setPaymentError(
                error.response?.data?.error ||
                error.message ||
                "Unable to start payment. Please try again."
            );

            setProcessingPayment(false);

        }

    };


    /* =========================================================
       BACK FROM PAYMENT
    ========================================================= */

    const handleBackFromPayment = () => {

        if (processingPayment) {
            return;
        }

        setPaymentError("");
        setStep(4);

    };


    /* =========================================================
       CONFIRMATION
    ========================================================= */

    const handleBackToHome = () => {

        navigate("/");

    };


    const handleContactUs = () => {

        navigate("/contact");

    };


    /* =========================================================
       PROGRESS STEP
    ========================================================= */

    const renderProgressStep = (
        number,
        label,
        stepNumber
    ) => {

        return (

            <React.Fragment key={stepNumber}>

                <div
                    className={`bc-progress-step ${step === stepNumber
                        ? "active"
                        : ""
                        } ${step > stepNumber
                            ? "completed"
                            : ""
                        }`}
                >

                    <span className="bc-progress-number">
                        {number}
                    </span>

                    <span className="bc-progress-label">
                        {label}
                    </span>

                </div>


                {stepNumber < 6 && (
                    <div className="bc-progress-line" />
                )}

            </React.Fragment>

        );

    };


    /* =========================================================
       RENDER
    ========================================================= */

    return (

        <div className="book-consultation-page">

            <Header />


            {/* =================================================
                STEP 1
            ================================================= */}

            {step === 1 && (

                <Step1Consultation

                    consultations={
                        consultations
                    }

                    selectedConsultation={
                        selectedConsultation
                    }
                    setSelectedConsultation={
                        handleSelectConsultation
                    }

                    loadingConsultations={
                        loadingConsultations
                    }

                    consultationError={
                        consultationError
                    }

                    renderProgressStep={
                        renderProgressStep
                    }

                    handleNextStep={
                        handleStep1Next
                    }

                    handlePreviousStep={
                        handleBackToStep1
                    }

                    formatPrice={
                        formatPrice
                    }

                />

            )}


            {/* =================================================
                STEP 2
            ================================================= */}

            {step === 2 && (

                <Step2DateTime

                    renderProgressStep={
                        renderProgressStep
                    }

                    selectedConsultation={
                        selectedConsultation
                    }

                    formatPrice={
                        formatPrice
                    }

                    currentMonth={
                        currentMonth
                    }

                    today={
                        today
                    }

                    goToPreviousMonth={
                        goToPreviousMonth
                    }

                    goToNextMonth={
                        goToNextMonth
                    }

                    getDaysInMonth={
                        getDaysInMonth
                    }

                    isPastDate={
                        isPastDate
                    }

                    isSunday={
                        isSunday
                    }

                    isSameDate={
                        isSameDate
                    }

                    selectedDate={
                        selectedDate
                    }

                    handleSelectDate={
                        handleSelectDate
                    }

                    selectedTime={
                        selectedTime
                    }

                    setSelectedTime={
                        handleSelectTime
                    }

                    availableSlots={
                        availableSlots
                    }

                    loadingSlots={
                        loadingSlots
                    }

                    slotError={
                        slotError
                    }

                    formatDisplayDate={
                        formatDisplayDate
                    }

                    formatTime={
                        formatTime
                    }

                    handleNextStep={
                        handleStep2Next
                    }

                    handlePreviousStep={
                        handleBackToStep1
                    }

                />

            )}


            {/* =================================================
                STEP 3
            ================================================= */}

            {step === 3 && (

                <Step3Details

                    renderProgressStep={
                        renderProgressStep
                    }

                    customerDetails={
                        customerDetails
                    }

                    handleCustomerChange={
                        handleCustomerChange
                    }

                    selectedConsultation={
                        selectedConsultation
                    }

                    selectedDate={
                        selectedDate
                    }

                    selectedTime={
                        selectedTime
                    }

                    formatDisplayDate={
                        formatDisplayDate
                    }

                    setStep={
                        setStep
                    }

                    formError={
                        formError
                    }

                    handlePreviousStep={
                        handleBackToStep2
                    }

                    handleNextStep={
                        handleStep3Next
                    }

                />

            )}


            {/* =================================================
                STEP 4
            ================================================= */}

            {step === 4 && (

                <Step4Review

                    renderProgressStep={
                        renderProgressStep
                    }

                    selectedConsultation={
                        selectedConsultation
                    }

                    selectedDate={
                        selectedDate
                    }

                    selectedTime={
                        selectedTime
                    }

                    customerDetails={
                        customerDetails
                    }

                    formatPrice={
                        formatPrice
                    }

                    formatDisplayDate={
                        formatDisplayDate
                    }

                    formatTime={
                        formatTime
                    }

                    setStep={
                        setStep
                    }

                    handlePreviousStep={
                        handleBackToStep3
                    }

                />

            )}


            {/* =================================================
                STEP 5
            ================================================= */}

            {step === 5 && (

                <Step5Payment

                    renderProgressStep={
                        renderProgressStep
                    }

                    selectedConsultation={
                        selectedConsultation
                    }

                    selectedDate={
                        selectedDate
                    }

                    selectedTime={
                        selectedTime
                    }

                    formatPrice={
                        formatPrice
                    }

                    formatDisplayDate={
                        formatDisplayDate
                    }

                    formatTime={
                        formatTime
                    }

                    processingPayment={
                        processingPayment
                    }

                    handlePayment={
                        handlePayment
                    }

                    paymentError={
                        paymentError
                    }

                    handlePreviousStep={
                        handleBackFromPayment
                    }

                />

            )}


            {/* =================================================
                STEP 6
            ================================================= */}

            {step === 6 && (

                <Step6Confirmation

                    renderProgressStep={
                        renderProgressStep
                    }

                    selectedConsultation={
                        selectedConsultation
                    }

                    selectedDate={
                        selectedDate
                    }

                    selectedTime={
                        selectedTime
                    }

                    formatPrice={
                        formatPrice
                    }

                    formatDisplayDate={
                        formatDisplayDate
                    }

                    formatTime={
                        formatTime
                    }

                />

            )}

        </div>

    );

}


export default BookConsultation;