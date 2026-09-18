import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  ArrowLeft,
  CalendarDays,
  Clock,
  User,
  Mail,
  Phone,
  CheckCircle2,
} from "lucide-react";

import api from "../services/api";


function BookConsultation() {

  const navigate = useNavigate();


  // =====================================================
  // CONSULTATIONS
  // =====================================================

  const [
    consultations,
    setConsultations,
  ] = useState([]);

  const [
    selectedConsultation,
    setSelectedConsultation,
  ] = useState("");


  const [
    loadingConsultations,
    setLoadingConsultations,
  ] = useState(true);


  // =====================================================
  // CUSTOMER DETAILS
  // =====================================================

  const [
    customerName,
    setCustomerName,
  ] = useState("");

  const [
    customerEmail,
    setCustomerEmail,
  ] = useState("");

  const [
    customerPhone,
    setCustomerPhone,
  ] = useState("");


  // =====================================================
  // DATE
  // =====================================================

  const [
    selectedDate,
    setSelectedDate,
  ] = useState("");


  // =====================================================
  // TIME SLOTS
  // =====================================================

  const [
    availableSlots,
    setAvailableSlots,
  ] = useState([]);

  const [
    selectedTime,
    setSelectedTime,
  ] = useState("");


  const [
    loadingSlots,
    setLoadingSlots,
  ] = useState(false);


  // =====================================================
  // SUBMIT
  // =====================================================

  const [
    saving,
    setSaving,
  ] = useState(false);


  // =====================================================
  // MESSAGES
  // =====================================================

  const [
    error,
    setError,
  ] = useState("");

  const [
    success,
    setSuccess,
  ] = useState("");


  // =====================================================
  // LOAD CONSULTATIONS
  // =====================================================

  useEffect(() => {

    const fetchConsultations = async () => {

      try {

        setLoadingConsultations(true);

        const response = await api.get(
          "consultations/"
        );

        const data =
          Array.isArray(response.data)
            ? response.data
            : response.data?.results || [];

        setConsultations(data);

      } catch (err) {

        console.error(
          "Failed to load consultations:",
          err
        );

        setError(
          "Unable to load consultation options."
        );

      } finally {

        setLoadingConsultations(false);

      }
    };


    fetchConsultations();

  }, []);


  // =====================================================
  // FORMAT TIME
  // =====================================================

  const formatTime = (time) => {

    if (!time) {
      return "";
    }

    const [
      hours,
      minutes,
    ] = time.split(":");

    const hour = Number(hours);

    const suffix =
      hour >= 12
        ? "PM"
        : "AM";

    const displayHour =
      hour % 12 || 12;

    return `${displayHour}:${minutes} ${suffix}`;
  };


  // =====================================================
  // LOAD TIME SLOTS
  // =====================================================

  useEffect(() => {

    if (
      !selectedConsultation ||
      !selectedDate
    ) {
      setAvailableSlots([]);
      setSelectedTime("");
      return;
    }


    const fetchSlots = async () => {

      try {

        setLoadingSlots(true);
        setError("");
        setSelectedTime("");

        const response = await api.get(
          "consultations/slots/",
          {
            params: {
              date: selectedDate,
              consultation_id:
                selectedConsultation,
            },
          }
        );


        setAvailableSlots(
          response.data?.slots || []
        );

      } catch (err) {

        console.error(
          "Failed to load slots:",
          err
        );

        setAvailableSlots([]);

        setError(
          err.response?.data?.error ||
          "Unable to load available time slots."
        );

      } finally {

        setLoadingSlots(false);

      }
    };


    fetchSlots();

  }, [
    selectedConsultation,
    selectedDate,
  ]);


  // =====================================================
  // CONSULTATION CHANGE
  // =====================================================

  const handleConsultationChange = (
    event
  ) => {

    setSelectedConsultation(
      event.target.value
    );

    setSelectedTime("");

    setError("");
    setSuccess("");
  };


  // =====================================================
  // DATE CHANGE
  // =====================================================

  const handleDateChange = (
    event
  ) => {

    setSelectedDate(
      event.target.value
    );

    setSelectedTime("");

    setError("");
    setSuccess("");
  };


  // =====================================================
  // BOOK CONSULTATION
  // =====================================================

  const handleSubmit = async (
    event
  ) => {

    event.preventDefault();

    setError("");
    setSuccess("");


    // -----------------------------------------------
    // VALIDATION
    // -----------------------------------------------

    if (!selectedConsultation) {

      setError(
        "Please select a consultation."
      );

      return;
    }


    if (!customerName.trim()) {

      setError(
        "Please enter customer name."
      );

      return;
    }


    if (!customerEmail.trim()) {

      setError(
        "Please enter customer email."
      );

      return;
    }


    if (!customerPhone.trim()) {

      setError(
        "Please enter customer phone."
      );

      return;
    }


    if (!selectedDate) {

      setError(
        "Please select a booking date."
      );

      return;
    }


    if (!selectedTime) {

      setError(
        "Please select a time slot."
      );

      return;
    }


    // -----------------------------------------------
    // SAVE BOOKING
    // -----------------------------------------------

    try {

      setSaving(true);


      const payload = {

        consultation_id:
          Number(
            selectedConsultation
          ),

        customer_name:
          customerName.trim(),

        customer_email:
          customerEmail.trim(),

        customer_phone:
          customerPhone.trim(),

        booking_date:
          selectedDate,

        start_time:
          selectedTime,

      };


      const response = await api.post(
        "bookings/admin-create/",
        payload
      );


      console.log(
        "Admin booking created:",
        response.data
      );


      setSuccess(
        "Consultation booked successfully."
      );


      // -------------------------------------------
      // RESET FORM
      // -------------------------------------------

      setCustomerName("");
      setCustomerEmail("");
      setCustomerPhone("");
      setSelectedDate("");
      setSelectedTime("");
      setAvailableSlots([]);


    } catch (err) {

      console.error(
        "Failed to create admin booking:",
        err
      );


      const responseData =
        err.response?.data;


      if (
        responseData?.error
      ) {

        setError(
          responseData.error
        );

      } else {

        setError(
          "Failed to create consultation booking."
        );

      }

    } finally {

      setSaving(false);

    }

  };


  // =====================================================
  // SELECTED CONSULTATION DATA
  // =====================================================

  const selectedConsultationData =
    consultations.find(
      (consultation) =>
        String(consultation.id) ===
        String(selectedConsultation)
    );


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <div className="admin-book-consultation">


      {/* =================================================
                HEADER
            ================================================= */}

      <div className="admin-book-header">

        <div className="admin-book-header-left">

          <button
            type="button"
            className="admin-book-back"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            <ArrowLeft size={18} />

            Back
          </button>


          <div>

            <h1>
              Book Consultation
            </h1>

            <p>
              Create a consultation booking
              without payment.
            </p>

          </div>

        </div>

      </div>


      {/* =================================================
                SUCCESS
            ================================================= */}

      {success && (

        <div className="admin-book-success">

          <CheckCircle2 size={19} />

          <span>
            {success}
          </span>

        </div>

      )}


      {/* =================================================
                ERROR
            ================================================= */}

      {error && (

        <div className="admin-book-error">

          {error}

        </div>

      )}


      {/* =================================================
                MAIN CARD
            ================================================= */}

      <form
        className="admin-book-card"
        onSubmit={handleSubmit}
      >


        {/* =================================================
                    CONSULTATION
                ================================================= */}

        <div className="admin-book-section">

          <div className="admin-book-section-title">

            <CalendarDays size={19} />

            <div>

              <h2>
                Consultation
              </h2>

              <p>
                Select the consultation type.
              </p>

            </div>

          </div>


          <div className="admin-book-field">

            <label>
              Consultation
            </label>


            <select
              value={
                selectedConsultation
              }
              onChange={
                handleConsultationChange
              }
              disabled={
                loadingConsultations
              }
            >

              <option value="">
                {loadingConsultations
                  ? "Loading consultations..."
                  : "Select consultation"}
              </option>


              {consultations.map(
                (consultation) => (

                  <option
                    key={
                      consultation.id
                    }
                    value={
                      consultation.id
                    }
                  >
                    {consultation.title}
                    {" - "}
                    {consultation.duration}
                    {" min"}
                  </option>

                )
              )}

            </select>

          </div>


          {/* CONSULTATION INFO */}

          {selectedConsultationData && (

            <div className="admin-book-consultation-info">

              <div>

                <span>
                  Consultation
                </span>

                <strong>
                  {
                    selectedConsultationData.title
                  }
                </strong>

              </div>


              <div>

                <span>
                  Duration
                </span>

                <strong>
                  {
                    selectedConsultationData.duration
                  }{" "}
                  min
                </strong>

              </div>


              <div>

                <span>
                  Price
                </span>

                <strong>
                  ₹
                  {
                    selectedConsultationData.price
                  }
                </strong>

              </div>

            </div>

          )}

        </div>


        {/* =================================================
                    CUSTOMER DETAILS
                ================================================= */}

        <div className="admin-book-section">

          <div className="admin-book-section-title">

            <User size={19} />

            <div>

              <h2>
                Customer Details
              </h2>

              <p>
                Enter the customer's information.
              </p>

            </div>

          </div>


          <div className="admin-book-grid">


            {/* NAME */}

            <div className="admin-book-field">

              <label>
                Customer Name
              </label>

              <div className="admin-book-input-icon">

                <User size={17} />

                <input
                  type="text"
                  value={customerName}
                  onChange={(event) =>
                    setCustomerName(
                      event.target.value
                    )
                  }
                  placeholder="Enter customer name"
                />

              </div>

            </div>


            {/* EMAIL */}

            <div className="admin-book-field">

              <label>
                Customer Email
              </label>

              <div className="admin-book-input-icon">

                <Mail size={17} />

                <input
                  type="email"
                  value={customerEmail}
                  onChange={(event) =>
                    setCustomerEmail(
                      event.target.value
                    )
                  }
                  placeholder="Enter customer email"
                />

              </div>

            </div>


            {/* PHONE */}

            <div className="admin-book-field">

              <label>
                Customer Phone
              </label>

              <div className="admin-book-input-icon">

                <Phone size={17} />

                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(event) =>
                    setCustomerPhone(
                      event.target.value
                    )
                  }
                  placeholder="Enter customer phone"
                />

              </div>

            </div>

          </div>

        </div>


        {/* =================================================
                    DATE & TIME
                ================================================= */}

        <div className="admin-book-section">

          <div className="admin-book-section-title">

            <Clock size={19} />

            <div>

              <h2>
                Date & Time
              </h2>

              <p>
                Select the consultation date
                and time.
              </p>

            </div>

          </div>


          <div className="admin-book-grid">


            {/* DATE */}

            <div className="admin-book-field">

              <label>
                Booking Date
              </label>

              <input
                type="date"
                value={selectedDate}
                onChange={
                  handleDateChange
                }
              />

            </div>


            {/* TIME */}

            <div className="admin-book-field">

              <label>
                Start Time
              </label>


              {!selectedDate ||
                !selectedConsultation ? (

                <div className="admin-book-disabled-message">

                  Select consultation and date
                  first.

                </div>

              ) : loadingSlots ? (

                <div className="admin-book-disabled-message">

                  Loading available times...

                </div>

              ) : availableSlots.length ===
                0 ? (

                <div className="admin-book-disabled-message">

                  No time slots available
                  for this date.

                </div>

              ) : (

                <div className="admin-book-time-grid">

                  {availableSlots.map(
                    (
                      slot,
                      index
                    ) => {

                      /*
                       * IMPORTANT:
                       * Admin is allowed to book
                       * blocked slots.
                       *
                       * Therefore only "booked"
                       * is disabled here.
                       */

                      const isBooked =
                        slot.status ===
                        "booked";


                      const isSelected =
                        selectedTime ===
                        slot.start_time;


                      return (

                        <button
                          type="button"
                          key={
                            `${slot.start_time}-${index}`
                          }
                          disabled={
                            isBooked
                          }
                          className={`
                                                        admin-book-time-button
                                                        ${isSelected
                              ? "selected"
                              : ""
                            }
                                                        ${isBooked
                              ? "booked"
                              : ""
                            }
                                                    `}
                          onClick={() => {

                            if (
                              !isBooked
                            ) {

                              setSelectedTime(
                                slot.start_time
                              );

                              setError(
                                ""
                              );

                            }

                          }}
                        >

                          <span>
                            {
                              formatTime(
                                slot.start_time
                              )
                            }
                          </span>


                          {isBooked && (

                            <small>
                              Booked
                            </small>

                          )}


                          {!isBooked &&
                            slot.status ===
                            "blocked" && (

                              <small>
                                Blocked
                              </small>

                            )}

                        </button>

                      );

                    }
                  )}

                </div>

              )}

            </div>

          </div>

        </div>


        {/* =================================================
                    BOOKING SUMMARY
                ================================================= */}

        {selectedConsultationData &&
          selectedDate &&
          selectedTime && (

            <div className="admin-book-summary">

              <div>

                <span>
                  Consultation
                </span>

                <strong>
                  {
                    selectedConsultationData.title
                  }
                </strong>

              </div>


              <div>

                <span>
                  Date
                </span>

                <strong>
                  {selectedDate}
                </strong>

              </div>


              <div>

                <span>
                  Time
                </span>

                <strong>
                  {
                    formatTime(
                      selectedTime
                    )
                  }
                </strong>

              </div>


              <div>

                <span>
                  Payment
                </span>

                <strong>
                  Not Required
                </strong>

              </div>

            </div>

          )}


        {/* =================================================
                    ACTIONS
                ================================================= */}

        <div className="admin-book-actions">

          <button
            type="button"
            className="admin-book-cancel"
            onClick={() =>
              navigate("/dashboard")
            }
            disabled={saving}
          >
            Cancel
          </button>


          <button
            type="submit"
            className="admin-book-submit"
            disabled={saving}
          >

            {saving
              ? "Booking..."
              : "Book Consultation"}

          </button>

        </div>

      </form>

    </div>
  );
}


export default BookConsultation;