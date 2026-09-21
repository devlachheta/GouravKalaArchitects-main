import { useEffect, useState } from "react";
import {
  Eye,
  CalendarDays,
  RefreshCw,
  XCircle,
  X,
} from "lucide-react";

import api from "../services/api";


function Bookings() {
  // =====================================================
  // STATE
  // =====================================================

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const [showReschedule, setShowReschedule] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");
  const [rescheduleLoading, setRescheduleLoading] = useState(false);

  // =====================================================
  // CURRENT MONTH
  // =====================================================

  const getCurrentMonth = () => {
    const today = new Date();

    const year = today.getFullYear();

    const month = String(
      today.getMonth() + 1
    ).padStart(2, "0");

    return `${year}-${month}`;
  };

  const [selectedMonth, setSelectedMonth] =
    useState(getCurrentMonth());

  // =====================================================
  // FETCH BOOKINGS
  // =====================================================

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        "bookings/admin-list/",
        {
          params: {
            month: selectedMonth,
          },
        }
      );

      const data = response.data;

      setBookings(
        Array.isArray(data)
          ? data
          : data.bookings || []
      );

    } catch (err) {
      console.error(
        "Failed to load bookings:",
        err
      );

      setError(
        err.response?.data?.detail ||
        err.response?.data?.error ||
        "Failed to load bookings."
      );

    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD BOOKINGS
  // =====================================================

  useEffect(() => {
    fetchBookings();
  }, [selectedMonth]);

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    const parsedDate =
      new Date(`${date}T00:00:00`);

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =====================================================
  // FORMAT TIME
  // =====================================================

  const formatTime = (time) => {
    if (!time) {
      return "-";
    }

    const [
      hoursString,
      minutesString,
    ] = String(time).split(":");

    let hours = Number(hoursString);

    const minutes =
      minutesString || "00";

    const period =
      hours >= 12
        ? "PM"
        : "AM";

    hours = hours % 12;

    if (hours === 0) {
      hours = 12;
    }

    return `${hours}:${minutes} ${period}`;
  };

  // =====================================================
  // VIEW BOOKING
  // =====================================================
  const handleViewBooking = async (id) => {
    try {
      setLoadingDetails(true);
      setError("");

      const response = await api.get(
        `bookings/${id}/admin-detail/`
      );

      setSelectedBooking(
        response.data?.booking ||
        response.data
      );

    } catch (err) {
      console.error(
        "Failed to load booking details:",
        err
      );

      setError(
        err.response?.data?.detail ||
        err.response?.data?.error ||
        "Failed to load booking details."
      );

    } finally {
      setLoadingDetails(false);
    }
  };
  // =====================================================
  // CLOSE DETAILS
  // =====================================================

  const handleCloseDetails = () => {
    setSelectedBooking(null);
    setError("");
  };

  const handleOpenReschedule = () => {
    if (!selectedBooking) return;

    setRescheduleDate(
      selectedBooking.booking_date || ""
    );

    setRescheduleTime(
      selectedBooking.start_time
        ? String(selectedBooking.start_time).slice(0, 5)
        : ""
    );

    setShowReschedule(true);
  };

  const handleReschedule = async () => {
    if (!selectedBooking) return;

    if (!rescheduleDate || !rescheduleTime) {
      setError("Please select both date and time.");
      return;
    }

    try {
      setRescheduleLoading(true);
      setError("");

      const response = await api.patch(
        `bookings/${selectedBooking.id}/reschedule/`,
        {
          booking_date: rescheduleDate,
          start_time: rescheduleTime,
        }
      );

      const updatedBooking =
        response.data?.booking ||
        response.data;

      // Update details modal
      setSelectedBooking(updatedBooking);

      // Update booking in table without refreshing
      setBookings((previousBookings) =>
        previousBookings.map((booking) =>
          booking.id === updatedBooking.id
            ? updatedBooking
            : booking
        )
      );

      setShowReschedule(false);

    } catch (err) {
      console.error(
        "Failed to reschedule booking:",
        err
      );

      setError(
        err.response?.data?.detail ||
        err.response?.data?.error ||
        "Failed to reschedule booking."
      );
    } finally {
      setRescheduleLoading(false);
    }
  };

  // =====================================================
  // STATUS CLASS
  // =====================================================

  const getStatusClass = (status) => {
    if (!status) {
      return "";
    }

    return status
      .toLowerCase()
      .replace(/\s+/g, "-");
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="bookings-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="bookings-header">

        <div className="bookings-title-section">
          <h1>Bookings</h1>

          <p>
            Manage consultation bookings.
          </p>
        </div>

        {/* REFRESH */}

        <button
          type="button"
          className="bookings-refresh-btn"
          onClick={fetchBookings}
          disabled={loading}
        >
          <RefreshCw
            size={16}
            className={
              loading
                ? "spinning"
                : ""
            }
          />

          <span>Refresh</span>
        </button>

      </div>


      {/* =================================================
          MONTH FILTER
      ================================================= */}

      <div className="bookings-filter-bar">

        <div className="bookings-month-selector">

          <CalendarDays size={17} />

          <input
            type="month"
            value={selectedMonth}
            onChange={(event) =>
              setSelectedMonth(
                event.target.value
              )
            }
          />

        </div>

      </div>


      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="bookings-error">
          {error}
        </div>
      )}


      {/* =================================================
          TABLE
      ================================================= */}

      <div className="bookings-table-wrapper">

        {loading ? (

          <div className="bookings-loading">
            <RefreshCw
              size={20}
              className="spinning"
            />

            <span>
              Loading bookings...
            </span>
          </div>

        ) : bookings.length === 0 ? (

          <div className="bookings-empty">

            <CalendarDays size={38} />

            <h3>
              No bookings found
            </h3>

            <p>
              There are no bookings
              for this month.
            </p>

          </div>

        ) : (

          <table className="bookings-table">

            <thead>

              <tr>

                <th>
                  CUSTOMER
                </th>

                <th>
                  CONSULTATION
                </th>

                <th>
                  DATE
                </th>

                <th>
                  TIME
                </th>

                <th>
                  PAYMENT
                </th>

                <th>
                  STATUS
                </th>

                <th className="booking-action-column">
                  ACTION
                </th>

              </tr>

            </thead>


            <tbody>

              {bookings.map(
                (booking) => (

                  <tr
                    key={booking.id}
                  >

                    {/* CUSTOMER */}

                    <td>

                      <div className="booking-customer">

                        <strong>
                          {
                            booking.customer_name
                          }
                        </strong>

                        <span>
                          {
                            booking.customer_email
                          }
                        </span>

                      </div>

                    </td>


                    {/* CONSULTATION */}

                    <td>

                      <div className="booking-consultation">

                        <strong>
                          {
                            booking.consultation_title ||
                            "Consultation"
                          }
                        </strong>

                        {booking.consultation_duration && (

                          <span>
                            {
                              booking.consultation_duration
                            }{" "}
                            min
                          </span>

                        )}

                      </div>

                    </td>


                    {/* DATE */}

                    <td>

                      <span className="booking-date">
                        {
                          formatDate(
                            booking.booking_date
                          )
                        }
                      </span>

                    </td>


                    {/* TIME */}

                    <td>

                      <span className="booking-time">
                        {
                          formatTime(
                            booking.start_time
                          )
                        }

                        {" - "}

                        {
                          formatTime(
                            booking.end_time
                          )
                        }
                      </span>

                    </td>


                    {/* PAYMENT */}

                    <td>

                      <span
                        className={`booking-payment ${getStatusClass(
                          booking.payment_status
                        )}`}
                      >
                        {
                          booking.payment_status ||
                          "-"
                        }
                      </span>

                    </td>


                    {/* STATUS */}

                    <td>

                      <span
                        className={`booking-status ${getStatusClass(
                          booking.booking_status
                        )}`}
                      >
                        {
                          booking.booking_status ||
                          "-"
                        }
                      </span>

                    </td>


                    {/* VIEW */}

                    <td className="booking-action-column">

                      <button
                        type="button"
                        className="booking-view-btn"
                        onClick={() =>
                          handleViewBooking(
                            booking.id
                          )
                        }
                        title="View booking"
                        aria-label="View booking"
                      >

                        <Eye size={17} />

                      </button>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        )}

      </div>


      {/* =================================================
          DETAILS MODAL
      ================================================= */}

      {selectedBooking && (

        <div
          className="booking-modal-overlay"
          onClick={
            handleCloseDetails
          }
        >

          <div
            className="booking-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="booking-modal-header">

              <div>

                <span className="booking-modal-number">
                  Booking #
                  {selectedBooking.id}
                </span>

                <h2>
                  Booking Details
                </h2>

              </div>


              <button
                type="button"
                className="booking-modal-close"
                onClick={
                  handleCloseDetails
                }
                aria-label="Close"
              >

                <X size={21} />

              </button>

            </div>


            {/* DETAILS */}

            <div className="booking-details-grid">


              {/* CUSTOMER */}

              <div className="booking-detail-card">

                <h3>
                  Customer
                </h3>

                <div className="booking-detail-content">

                  <strong>
                    {
                      selectedBooking.customer_name ||
                      "-"
                    }
                  </strong>

                  <span>
                    {
                      selectedBooking.customer_email ||
                      "-"
                    }
                  </span>

                  <span>
                    {
                      selectedBooking.customer_phone ||
                      "-"
                    }
                  </span>

                </div>

              </div>


              {/* CONSULTATION */}

              <div className="booking-detail-card">

                <h3>
                  Consultation
                </h3>

                <div className="booking-detail-content">

                  <strong>
                    {
                      selectedBooking.consultation_title ||
                      "Consultation"
                    }
                  </strong>

                  <span>
                    Duration:{" "}
                    {
                      selectedBooking.consultation_duration ||
                      "-"
                    }{" "}
                    minutes
                  </span>

                  <span>
                    Amount: ₹
                    {
                      Number(
                        selectedBooking.amount ||
                        0
                      ).toLocaleString(
                        "en-IN"
                      )
                    }
                  </span>

                </div>

              </div>


              {/* SCHEDULE */}

              <div className="booking-detail-card">

                <h3>
                  Schedule
                </h3>

                <div className="booking-detail-content">

                  <strong>
                    {
                      formatDate(
                        selectedBooking.booking_date
                      )
                    }
                  </strong>

                  <span>
                    {
                      formatTime(
                        selectedBooking.start_time
                      )
                    }

                    {" - "}

                    {
                      formatTime(
                        selectedBooking.end_time
                      )
                    }
                  </span>

                </div>

              </div>


              {/* PAYMENT */}

              <div className="booking-detail-card">

                <h3>
                  Payment & Status
                </h3>

                <div className="booking-detail-content">

                  <span>
                    Payment:
                    {" "}
                    <strong>
                      {
                        selectedBooking.payment_status ||
                        "-"
                      }
                    </strong>
                  </span>

                  <span>
                    Booking:
                    {" "}
                    <strong>
                      {
                        selectedBooking.booking_status ||
                        "-"
                      }
                    </strong>
                  </span>

                </div>

              </div>

            </div>


            {/* ACTIONS */}

            <div className="booking-modal-actions">

              <button
                type="button"
                className="booking-reschedule-btn"
                onClick={handleOpenReschedule}
              >
                <RefreshCw size={16} />
                Reschedule
              </button>


              <button
                type="button"
                className="booking-cancel-btn"
              >

                <XCircle size={16} />

                Cancel Booking

              </button>

            </div>

          </div>

        </div>

      )}


      {/* =================================================
          DETAILS LOADING
      ================================================= */}

      {/* =================================================
    RESCHEDULE MODAL
================================================= */}

      {showReschedule && selectedBooking && (
        <div
          className="booking-modal-overlay"
          onClick={() => {
            if (!rescheduleLoading) {
              setShowReschedule(false);
            }
          }}
        >
          <div
            className="booking-reschedule-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="booking-modal-header">
              <div>
                <span className="booking-modal-number">
                  Booking #{selectedBooking.id}
                </span>

                <h2>Reschedule Booking</h2>
              </div>

              <button
                type="button"
                className="booking-modal-close"
                onClick={() => setShowReschedule(false)}
                disabled={rescheduleLoading}
                aria-label="Close"
              >
                <X size={21} />
              </button>
            </div>

            <div className="booking-reschedule-content">

              <div className="booking-reschedule-info">
                <strong>
                  {selectedBooking.customer_name}
                </strong>

                <span>
                  {selectedBooking.consultation_title ||
                    "Consultation"}
                </span>

                <small>
                  Current schedule:{" "}
                  {formatDate(selectedBooking.booking_date)}
                  {" · "}
                  {formatTime(selectedBooking.start_time)}
                </small>
              </div>

              <div className="booking-reschedule-fields">

                <div className="booking-reschedule-field">
                  <label htmlFor="reschedule-date">
                    Select Date
                  </label>

                  <input
                    id="reschedule-date"
                    type="date"
                    value={rescheduleDate}
                    onChange={(event) =>
                      setRescheduleDate(event.target.value)
                    }
                    disabled={rescheduleLoading}
                  />
                </div>

                <div className="booking-reschedule-field">
                  <label htmlFor="reschedule-time">
                    Select Time
                  </label>

                  <input
                    id="reschedule-time"
                    type="time"
                    value={rescheduleTime}
                    onChange={(event) =>
                      setRescheduleTime(event.target.value)
                    }
                    disabled={rescheduleLoading}
                  />
                </div>

              </div>

              <div className="booking-reschedule-note">
                The booking will be moved to the selected
                date and time.
              </div>

            </div>

            <div className="booking-modal-actions">

              <button
                type="button"
                className="booking-reschedule-cancel-btn"
                onClick={() => setShowReschedule(false)}
                disabled={rescheduleLoading}
              >
                Cancel
              </button>

              <button
                type="button"
                className="booking-reschedule-confirm-btn"
                onClick={handleReschedule}
                disabled={rescheduleLoading}
              >
                {rescheduleLoading ? (
                  <>
                    <RefreshCw
                      size={16}
                      className="spinning"
                    />
                    Rescheduling...
                  </>
                ) : (
                  <>
                    <RefreshCw size={16} />
                    Confirm Reschedule
                  </>
                )}
              </button>

            </div>
          </div>
        </div>
      )}


      {/* =================================================
    DETAILS LOADING
================================================= */}
      {loadingDetails && (
        <div className="booking-loading-overlay">
          <div className="booking-loading-box">
            <RefreshCw
              size={20}
              className="spinning"
            />

            <span>
              Loading booking details...
            </span>
          </div>
        </div>
      )}



    </div>
  );
}


export default Bookings;