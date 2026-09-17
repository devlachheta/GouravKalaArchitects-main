import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
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


  // ==========================================
  // TIME OPTIONS
  // 10:00 AM - 6:00 PM
  // 15 MINUTE INTERVAL
  // ==========================================

  const formatTime = (time) => {

    const [hours, minutes] = time.split(":");

    const hour = Number(hours);

    const suffix = hour >= 12 ? "PM" : "AM";

    const displayHour = hour % 12 || 12;

    return `${displayHour}:${minutes} ${suffix}`;
  };


  const timeOptions = [];

  for (
    let minutes = 10 * 60;
    minutes <= 18 * 60;
    minutes += 15
  ) {

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    const value =
      `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;

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

      setError("Please select a date.");

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
      // GO BACK TO BLOCKED SLOTS
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
        typeof responseData === "object"
      ) {

        const firstError =
          Object.values(responseData)[0];


        if (Array.isArray(firstError)) {

          setError(
            firstError[0]
          );

        } else if (
          typeof firstError === "string"
        ) {

          setError(firstError);

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
              navigate("/blocked-slots")
            }
          >
            <ArrowLeft size={18} />
          </button>


          <div>

            <h1>
              Add Block
            </h1>

            <p>
              Block a consultation date
              or specific time range.
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
                FORM CARD
            ====================================== */}

      <div className="add-block-card">

        <form onSubmit={handleSubmit}>


          {/* =================================
                        DATE
                    ================================== */}

          <div className="add-block-field">

            <label>
              Date
            </label>

            <input
              type="date"
              name="booking_date"
              value={
                formData.booking_date
              }
              onChange={
                handleChange
              }
            />

          </div>


          {/* =================================
                        FULL DAY
                    ================================== */}

          <div className="add-block-full-day">

            <label>

              <input
                type="checkbox"
                name="full_day"
                checked={
                  formData.full_day
                }
                onChange={
                  handleChange
                }
              />

              <span>
                Block Full Day
              </span>

            </label>

            <p>
              This will block all consultation
              times for the selected date.
            </p>

          </div>


          {/* =================================
                        TIME RANGE
                    ================================== */}

          {!formData.full_day && (

            <div className="add-block-time-row">


              {/* START TIME */}

              <div className="add-block-field">

                <label>
                  Start Time
                </label>

                <select
                  name="start_time"
                  value={
                    formData.start_time
                  }
                  onChange={
                    handleChange
                  }
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

                <label>
                  End Time
                </label>

                <select
                  name="end_time"
                  value={
                    formData.end_time
                  }
                  onChange={
                    handleChange
                  }
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

            <label>
              Reason
            </label>

            <input
              type="text"
              name="reason"
              value={
                formData.reason
              }
              onChange={
                handleChange
              }
              placeholder="Enter reason for blocking"
            />

          </div>


          {/* =================================
                        ACTIVE STATUS
                    ================================== */}

          <div className="add-block-full-day">

            <label>

              <input
                type="checkbox"
                name="is_active"
                checked={
                  formData.is_active
                }
                onChange={
                  handleChange
                }
              />

              <span>
                Active
              </span>

            </label>

            <p>
              Active blocks will prevent customers
              from selecting the blocked time.
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
                navigate("/blocked-slots")
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