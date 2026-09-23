import { useState } from "react";
import {
  ArrowLeft,
  Save,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

function AddBlock() {
  const navigate = useNavigate();

  // ==========================================
  // FORM STATE
  // ==========================================

  const [formData, setFormData] = useState({
    booking_date: "",
    full_day: false,
    start_time: "",
    end_time: "",
    reason: "",
    is_active: true,
  });

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);

  const [loadingBookedSlots, setLoadingBookedSlots] =
    useState(false);

  // ==========================================
  // FORMAT TIME
  // ==========================================

  const formatTime = (time) => {
    if (!time) {
      return "";
    }

    const [hours, minutes] = time.split(":");

    const hour = Number(hours);

    const suffix =
      hour >= 12 ? "PM" : "AM";

    const displayHour =
      hour % 12 || 12;

    return `${displayHour}:${minutes} ${suffix}`;
  };

  // ==========================================
  // TIME OPTIONS
  // 10:00 AM - 6:00 PM
  // 15 MINUTE INTERVAL
  // ==========================================

  const timeOptions = [];

  for (
    let minutes = 10 * 60;
    minutes <= 18 * 60;
    minutes += 15
  ) {
    const hours = Math.floor(
      minutes / 60
    );

    const mins = minutes % 60;

    const value =
      `${String(hours).padStart(
        2,
        "0"
      )}:${String(mins).padStart(
        2,
        "0"
      )}`;

    timeOptions.push({
      value,
      label: formatTime(value),
    });
  }

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (event) => {

    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setFormData((previous) => ({
      ...previous,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    setError("");

    // ------------------------------------------
    // DATE CHANGED
    // ------------------------------------------

    if (name === "booking_date") {

      fetchBookedSlots(value);

    }
  };

  // ==========================================
  // LOAD EXISTING BOOKINGS FOR SELECTED DATE
  // ==========================================

  const fetchBookedSlots = async (date) => {

    if (!date) {
      setBookedSlots([]);
      return;
    }

    try {

      setLoadingBookedSlots(true);

      const month = date.substring(0, 7);

      const response = await api.get(
        "bookings/admin-list/",
        {
          params: {
            month,
          },
        }
      );

      const bookings =
        response.data?.bookings || [];

      const activeBookings = bookings.filter(
        (booking) =>
          booking.booking_date === date &&
          booking.booking_status !== "cancelled" &&
          booking.payment_status !== "failed" &&
          booking.payment_status !== "refunded"
      );

      setBookedSlots(activeBookings);

    } catch (err) {

      console.error(
        "Failed to load booked slots:",
        err
      );

      setBookedSlots([]);

    } finally {

      setLoadingBookedSlots(false);

    }
  };
  // ==========================================
  // SAVE BLOCK
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    // ------------------------------------------
    // DATE VALIDATION
    // ------------------------------------------

    if (!formData.booking_date) {
      setError(
        "Please select a date."
      );

      return;
    }

    // ------------------------------------------
    // TIME VALIDATION
    // ------------------------------------------

    if (!formData.full_day) {

      if (
        !formData.start_time ||
        !formData.end_time
      ) {
        setError(
          "Please select both start time and end time."
        );

        return;
      }

      if (
        formData.start_time >=
        formData.end_time
      ) {
        setError(
          "End time must be after start time."
        );

        return;
      }
    }

    try {
      setSaving(true);

      // --------------------------------------
      // API PAYLOAD
      // --------------------------------------

      const payload = {
        booking_date:
          formData.booking_date,

        start_time:
          formData.full_day
            ? null
            : formData.start_time,

        end_time:
          formData.full_day
            ? null
            : formData.end_time,

        reason:
          formData.reason.trim(),

        is_active:
          formData.is_active,
      };

      // --------------------------------------
      // CREATE BLOCK
      // --------------------------------------

      await api.post(
        "blocked-slots/",
        payload
      );

      // --------------------------------------
      // RETURN TO BLOCKED SLOTS
      // --------------------------------------

      navigate("/blocked-slots");

    } catch (err) {

      console.error(
        "Failed to create blocked slot:",
        err
      );

      const responseData =
        err.response?.data;

      if (
        responseData &&
        typeof responseData ===
        "object"
      ) {

        const firstError =
          Object.values(
            responseData
          )[0];

        if (
          Array.isArray(
            firstError
          )
        ) {
          setError(
            firstError[0]
          );

        } else if (
          typeof firstError ===
          "string"
        ) {
          setError(
            firstError
          );

        } else {
          setError(
            "Failed to create blocked slot."
          );
        }

      } else {

        setError(
          "Failed to create blocked slot."
        );
      }

    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="add-block-page">

      {/* =====================================
          HEADER
      ====================================== */}

      <div className="add-block-header">

        <div className="add-block-header-left">

          <button
            type="button"
            className="add-block-back-btn"
            onClick={() =>
              navigate(
                "/blocked-slots"
              )
            }
            disabled={saving}
          >
            <ArrowLeft size={18} />

            <span>
              Back
            </span>
          </button>


          <div>

            <h1>
              Add Block
            </h1>

            <p>
              Block a consultation date
              or a specific time range.
            </p>

          </div>

        </div>

      </div>


      {/* =====================================
          ERROR
      ====================================== */}

      {error && (
        <div className="add-block-error">
          {error}
        </div>
      )}
      {/* =====================================
    EXISTING BOOKINGS
====================================== */}

      {formData.booking_date && (
        <div className="add-block-bookings">

          <div className="add-block-bookings-header">

            <div>
              <h3>
                Existing Bookings
              </h3>

              <p>
                Booked consultation times for this date.
              </p>
            </div>

          </div>


          {loadingBookedSlots ? (

            <div className="add-block-bookings-loading">
              Loading booked slots...
            </div>

          ) : bookedSlots.length === 0 ? (

            <div className="add-block-no-bookings">
              No existing client bookings for this date.
            </div>

          ) : (

            <div className="add-block-bookings-list">

              {bookedSlots.map((booking) => (

                <div
                  key={booking.id}
                  className="add-block-booking-item"
                >

                  <div className="add-block-booking-time">

                    <span>
                      {formatTime(
                        booking.start_time
                      )}
                    </span>

                    <span className="add-block-booking-dash">
                      -
                    </span>

                    <span>
                      {formatTime(
                        booking.end_time
                      )}
                    </span>

                  </div>


                  <div className="add-block-booking-info">

                    <strong>
                      {booking.customer_name ||
                        "Client"}
                    </strong>

                    <span>
                      {booking.customer_email || ""}
                    </span>

                  </div>


                  <span className="add-block-booking-status">
                    Booked
                  </span>

                </div>

              ))}

            </div>

          )}

        </div>
      )}

      {/* =====================================
          FORM CARD
      ====================================== */}

      <div className="add-block-card">

        <form onSubmit={handleSubmit}>

          {/* =================================
              DATE
          ================================== */}

          <div className="add-block-field">

            <label htmlFor="booking_date">
              Date
            </label>

            <input
              id="booking_date"
              type="date"
              name="booking_date"
              value={
                formData.booking_date
              }
              onChange={
                handleChange
              }
              disabled={saving}
            />

          </div>


          {/* =================================
              FULL DAY
          ================================== */}

          <div className="add-block-option">

            <label className="add-block-checkbox-label">

              <input
                type="checkbox"
                name="full_day"
                checked={
                  formData.full_day
                }
                onChange={
                  handleChange
                }
                disabled={saving}
              />

              <span>
                Block Full Day
              </span>

            </label>

            <p>
              This will block all
              consultation times for
              the selected date.
            </p>

          </div>


          {/* =================================
              TIME RANGE
          ================================== */}

          {!formData.full_day && (

            <div className="add-block-time-row">

              {/* START TIME */}

              <div className="add-block-field">

                <label htmlFor="start_time">
                  Start Time
                </label>

                <select
                  id="start_time"
                  name="start_time"
                  value={
                    formData.start_time
                  }
                  onChange={
                    handleChange
                  }
                  disabled={saving}
                >

                  <option value="">
                    Select start time
                  </option>

                  {timeOptions.map(
                    (time) => (

                      <option
                        key={
                          time.value
                        }
                        value={
                          time.value
                        }
                      >
                        {time.label}
                      </option>

                    )
                  )}

                </select>

              </div>


              {/* END TIME */}

              <div className="add-block-field">

                <label htmlFor="end_time">
                  End Time
                </label>

                <select
                  id="end_time"
                  name="end_time"
                  value={
                    formData.end_time
                  }
                  onChange={
                    handleChange
                  }
                  disabled={saving}
                >

                  <option value="">
                    Select end time
                  </option>

                  {timeOptions.map(
                    (time) => (

                      <option
                        key={
                          time.value
                        }
                        value={
                          time.value
                        }
                      >
                        {time.label}
                      </option>

                    )
                  )}

                </select>

              </div>

            </div>

          )}


          {/* =================================
              REASON
          ================================== */}

          <div className="add-block-field">

            <label htmlFor="reason">
              Reason
            </label>

            <input
              id="reason"
              type="text"
              name="reason"
              value={
                formData.reason
              }
              onChange={
                handleChange
              }
              placeholder="Enter reason for blocking"
              disabled={saving}
            />

          </div>


          {/* =================================
              ACTIVE STATUS
          ================================== */}

          <div className="add-block-option">

            <label className="add-block-checkbox-label">

              <input
                type="checkbox"
                name="is_active"
                checked={
                  formData.is_active
                }
                onChange={
                  handleChange
                }
                disabled={saving}
              />

              <span>
                Active
              </span>

            </label>

            <p>
              Active blocks will prevent
              customers from selecting
              the blocked time.
            </p>

          </div>


          {/* =================================
              ACTIONS
          ================================== */}

          <div className="add-block-actions">

            <button
              type="button"
              className="add-block-cancel-btn"
              onClick={() =>
                navigate(
                  "/blocked-slots"
                )
              }
              disabled={saving}
            >
              Cancel
            </button>


            <button
              type="submit"
              className="add-block-save-btn"
              disabled={saving}
            >

              <Save size={17} />

              {saving
                ? "Saving..."
                : "Save Block"}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddBlock;