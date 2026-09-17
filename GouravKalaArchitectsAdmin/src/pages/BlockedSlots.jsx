import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  CalendarOff,
  X,
} from "lucide-react";

import api from "../services/api";

function BlockedSlots() {

  // ==========================================
  // STATE
  // ==========================================

  const [blockedSlots, setBlockedSlots] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [saving, setSaving] = useState(false);

  const [deletingId, setDeletingId] = useState(null);


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


  // ==========================================
  // FETCH BLOCKED SLOTS
  // ==========================================

  const fetchBlockedSlots = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await api.get(
        "blocked-slots/"
      );

      const data = response.data;

      setBlockedSlots(
        Array.isArray(data)
          ? data
          : data.results || []
      );

    } catch (err) {

      console.error(
        "Failed to fetch blocked slots:",
        err
      );

      setError(
        err.response?.data?.detail ||
        "Failed to load blocked slots."
      );

    } finally {

      setLoading(false);

    }
  };


  // ==========================================
  // LOAD ON PAGE OPEN
  // ==========================================

  useEffect(() => {

    fetchBlockedSlots();

  }, []);


  // ==========================================
  // FORM INPUT CHANGE
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

  };


  // ==========================================
  // OPEN FORM
  // ==========================================

  const handleOpenForm = () => {

    setError("");
    setSuccess("");

    setFormData({
      booking_date: "",
      full_day: false,
      start_time: "",
      end_time: "",
      reason: "",
      is_active: true,
    });

    setShowForm(true);

  };


  // ==========================================
  // CLOSE FORM
  // ==========================================

  const handleCloseForm = () => {

    if (saving) {
      return;
    }

    setShowForm(false);

    setError("");

  };


  // ==========================================
  // SAVE BLOCK
  // ==========================================

  const handleSaveBlock = async () => {

    setError("");
    setSuccess("");


    // ------------------------------------------
    // Date validation
    // ------------------------------------------

    if (!formData.booking_date) {

      setError(
        "Please select a date."
      );

      return;
    }


    // ------------------------------------------
    // Time validation
    // ------------------------------------------

    if (!formData.full_day) {

      if (
        !formData.start_time ||
        !formData.end_time
      ) {

        setError(
          "Please select both start and end time."
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


      const response = await api.post(
        "blocked-slots/",
        payload
      );


      // Add newly created block
      setBlockedSlots((previous) => [
        response.data,
        ...previous,
      ]);


      setSuccess(
        "Blocked slot created successfully."
      );


      setShowForm(false);


      // Reset form
      setFormData({
        booking_date: "",
        full_day: false,
        start_time: "",
        end_time: "",
        reason: "",
        is_active: true,
      });


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
  // DELETE BLOCK
  // ==========================================

  const handleDelete = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this blocked slot?"
    );


    if (!confirmed) {
      return;
    }


    try {

      setError("");
      setSuccess("");

      setDeletingId(id);


      await api.delete(
        `blocked-slots/${id}/`
      );


      setBlockedSlots((previous) =>
        previous.filter(
          (slot) => slot.id !== id
        )
      );


      setSuccess(
        "Blocked slot deleted successfully."
      );


    } catch (err) {

      console.error(
        "Failed to delete blocked slot:",
        err
      );


      setError(
        err.response?.data?.detail ||
        "Failed to delete blocked slot."
      );

    } finally {

      setDeletingId(null);

    }

  };


  // ==========================================
  // FORMAT TIME
  // ==========================================

  const formatTime = (time) => {

    if (!time) {
      return "";
    }

    const [hours, minutes] =
      time.split(":");

    const hour =
      Number(hours);

    const suffix =
      hour >= 12
        ? "PM"
        : "AM";

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

    const hours =
      Math.floor(minutes / 60);

    const mins =
      minutes % 60;

    const value =
      `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;

    timeOptions.push({
      value,
      label: formatTime(value),
    });

  }


  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="blocked-slots-page">


      {/* =====================================
                PAGE HEADER
            ====================================== */}

      <div className="blocked-slots-header">

        <div>

          <h1>
            Blocked Slots
          </h1>

          <p>
            Manage unavailable consultation
            dates and times.
          </p>

        </div>


        <button
          type="button"
          className="blocked-slots-add-btn"
          onClick={handleOpenForm}
        >

          <Plus size={18} />

          Add Block

        </button>

      </div>


      {/* =====================================
                ERROR
            ====================================== */}

      {error && (

        <div className="blocked-slots-error">

          {error}

        </div>

      )}


      {/* =====================================
                SUCCESS
            ====================================== */}

      {success && (

        <div className="blocked-slots-success">

          {success}

        </div>

      )}


      {/* =====================================
                ADD BLOCK FORM
            ====================================== */}

      {showForm && (

        <div className="blocked-slots-form-card">

          <div className="blocked-slots-form-header">

            <div>

              <h2>
                Add Block
              </h2>

              <p>
                Block a consultation date
                or a specific time range.
              </p>

            </div>


            <button
              type="button"
              className="blocked-slots-close-btn"
              onClick={handleCloseForm}
              disabled={saving}
            >

              <X size={19} />

            </button>

          </div>


          <div className="blocked-slots-form">


            {/* DATE */}

            <div className="blocked-slots-field">

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


            {/* FULL DAY */}

            <div className="blocked-slots-full-day">

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

            </div>


            {/* TIME */}

            {!formData.full_day && (

              <div className="blocked-slots-time-row">


                {/* START TIME */}

                <div className="blocked-slots-field">

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

                <div className="blocked-slots-field">

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


            {/* REASON */}

            <div className="blocked-slots-field">

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


            {/* ACTIONS */}

            <div className="blocked-slots-form-actions">

              <button
                type="button"
                className="blocked-slots-cancel-btn"
                onClick={
                  handleCloseForm
                }
                disabled={saving}
              >
                Cancel
              </button>


              <button
                type="button"
                className="blocked-slots-save-btn"
                onClick={
                  handleSaveBlock
                }
                disabled={saving}
              >

                {saving
                  ? "Saving..."
                  : "Save Block"}

              </button>

            </div>

          </div>

        </div>

      )}


      {/* =====================================
                BLOCKED SLOTS TABLE
            ====================================== */}

      <div className="blocked-slots-card">

        {loading ? (

          <div className="blocked-slots-empty">

            Loading blocked slots...

          </div>

        ) : blockedSlots.length === 0 ? (

          <div className="blocked-slots-empty">

            <CalendarOff size={40} />

            <h3>
              No blocked slots
            </h3>

            <p>
              There are currently no
              blocked consultation dates
              or times.
            </p>

          </div>

        ) : (

          <div className="blocked-slots-table-wrapper">

            <table className="blocked-slots-table">

              <thead>

                <tr>

                  <th>
                    Date
                  </th>

                  <th>
                    Time
                  </th>

                  <th>
                    Reason
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {blockedSlots.map(
                  (slot) => (

                    <tr
                      key={
                        slot.id
                      }
                    >

                      <td>
                        {
                          slot.booking_date
                        }
                      </td>


                      <td>

                        {slot.start_time &&
                          slot.end_time
                          ? `${formatTime(
                            slot.start_time
                          )} - ${formatTime(
                            slot.end_time
                          )}`
                          : "Full Day"}

                      </td>


                      <td>

                        {
                          slot.reason ||
                          "-"
                        }

                      </td>


                      <td>

                        <span
                          className={
                            slot.is_active
                              ? "blocked-status-active"
                              : "blocked-status-inactive"
                          }
                        >

                          {slot.is_active
                            ? "Active"
                            : "Inactive"}

                        </span>

                      </td>


                      <td>

                        <button
                          type="button"
                          title="Delete"
                          className="blocked-slots-delete-btn"
                          onClick={() =>
                            handleDelete(
                              slot.id
                            )
                          }
                          disabled={
                            deletingId ===
                            slot.id
                          }
                        >

                          <Trash2
                            size={17}
                          />

                        </button>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default BlockedSlots;