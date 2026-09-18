import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  CalendarOff,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

function BlockedSlots() {
  const navigate = useNavigate();

  // ==========================================
  // STATE
  // ==========================================

  const [blockedSlots, setBlockedSlots] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [deletingId, setDeletingId] = useState(null);

  // ==========================================
  // FETCH BLOCKED SLOTS
  // ==========================================

  const fetchBlockedSlots = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("blocked-slots/");

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

      await api.delete(`blocked-slots/${id}/`);

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

    const [hours, minutes] = time.split(":");

    const hour = Number(hours);

    const suffix =
      hour >= 12 ? "PM" : "AM";

    const displayHour =
      hour % 12 || 12;

    return `${displayHour}:${minutes} ${suffix}`;
  };

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
          onClick={() =>
            navigate("/blocked-slots/add")
          }
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
              There are currently no blocked
              consultation dates or times.
            </p>

          </div>

        ) : (

          <div className="blocked-slots-table-wrapper">

            <table className="blocked-slots-table">

              <thead>
                <tr>

                  <th>
                    DATE
                  </th>

                  <th>
                    TIME
                  </th>

                  <th>
                    REASON
                  </th>

                  <th>
                    STATUS
                  </th>

                  <th>
                    ACTION
                  </th>

                </tr>
              </thead>


              <tbody>

                {blockedSlots.map((slot) => (

                  <tr key={slot.id}>

                    {/* DATE */}

                    <td>
                      {slot.booking_date}
                    </td>


                    {/* TIME */}

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


                    {/* REASON */}

                    <td>
                      {slot.reason || "-"}
                    </td>


                    {/* STATUS */}

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


                    {/* ACTION */}

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

                        <Trash2 size={17} />

                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default BlockedSlots;