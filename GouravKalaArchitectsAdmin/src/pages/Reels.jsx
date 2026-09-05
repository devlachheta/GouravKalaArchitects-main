import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Video,
  Check,
  X,
  Pencil,
} from "lucide-react";
import {
  useNavigate,
} from "react-router-dom";
import api from "../services/api";

function Reels() {
  const navigate = useNavigate();

  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const fetchReels = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        "reels/?admin=true"
      );

      const data = Array.isArray(
        response.data
      )
        ? response.data
        : response.data.results || [];

      setReels(data);
    } catch (error) {
      console.error(
        "Failed to fetch reels:",
        error
      );

      setError(
        "Unable to load reels."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReels();
  }, []);

  const handleDelete = async (reel) => {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete ${reel.title ||
        `Reel ${reel.id}`
        }?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(reel.id);
      setError("");
      setSuccess("");

      await api.delete(
        `reels/${reel.id}/`
      );

      setReels((current) =>
        current.filter(
          (item) =>
            item.id !== reel.id
        )
      );

      setSuccess(
        "Reel deleted successfully."
      );
    } catch (error) {
      console.error(
        "Failed to delete reel:",
        error
      );

      setError(
        "Unable to delete reel."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const getVideoUrl = (video) => {
    if (!video) {
      return "";
    }

    if (
      video.startsWith("http://") ||
      video.startsWith("https://")
    ) {
      return video;
    }

    return `http://127.0.0.1:8000${video.startsWith("/")
      ? ""
      : "/"
      }${video}`;
  };

  if (loading) {
    return (
      <div className="reels-admin-page">

        <div className="reels-page-header">

          <div>
            <h1>Reels</h1>

            <p>
              Manage the reels
              displayed on the
              website.
            </p>
          </div>

        </div>

        <div className="reels-loading">
          Loading reels...
        </div>

      </div>
    );
  }

  return (
    <div className="reels-admin-page">

      <div className="reels-page-header">

        <div>
          <h1>Reels</h1>

          <p>
            Manage the reels
            displayed on the
            website.
          </p>
        </div>

        <button
          type="button"
          className="reels-add-button"
          onClick={() =>
            navigate(
              "/reels/add"
            )
          }
        >
          <Plus size={18} />

          Add Reel
        </button>

      </div>

      {error && (
        <div className="reels-alert reels-alert-error">

          <X size={18} />

          <span>
            {error}
          </span>

        </div>
      )}

      {success && (
        <div className="reels-alert reels-alert-success">

          <Check size={18} />

          <span>
            {success}
          </span>

        </div>
      )}

      <div className="reels-list-card">

        <div className="reels-list-header">

          <div>

            <h2>
              All Reels
            </h2>

            <p>
              {reels.length}{" "}
              {reels.length === 1
                ? "reel"
                : "reels"}
            </p>

          </div>

        </div>

        {reels.length === 0 ? (

          <div className="reels-empty">

            <Video size={45} />

            <h3>
              No reels available
            </h3>

            <p>
              Add your first reel
              to display it on
              the website.
            </p>

            <button
              type="button"
              className="reels-add-button"
              onClick={() =>
                navigate(
                  "/reels/add"
                )
              }
            >
              <Plus size={18} />

              Add Reel
            </button>

          </div>

        ) : (

          <div className="reels-admin-grid">

            {reels.map(
              (reel) => (

                <div
                  className="admin-reel-card"
                  key={reel.id}
                >

                  <div className="admin-reel-video-wrapper">

                    {reel.video ? (

                      <video
                        src={getVideoUrl(
                          reel.video
                        )}
                        muted
                        loop
                        playsInline
                        controls
                        preload="metadata"
                      />

                    ) : (

                      <div className="admin-reel-no-video">

                        <Video
                          size={40}
                        />

                      </div>

                    )}

                  </div>

                  <div className="admin-reel-card-content">

                    <div className="admin-reel-top">

                      <div>

                        <h3>
                          {reel.title ||
                            `Reel ${reel.id}`}
                        </h3>

                        <span>
                          Order{" "}
                          {reel.order ?? 0}
                        </span>

                      </div>

                      <span
                        className={
                          reel.is_active
                            ? "admin-reel-status active"
                            : "admin-reel-status inactive"
                        }
                      >
                        {reel.is_active
                          ? "Active"
                          : "Inactive"}
                      </span>

                    </div>

                    <div className="admin-reel-card-footer">

                      <span className="admin-reel-id">
                        Reel #{reel.id}
                      </span>

                      <div className="admin-reel-actions">

                        <button
                          type="button"
                          className="admin-reel-edit"
                          onClick={() =>
                            navigate(
                              `/reels/edit/${reel.id}`
                            )
                          }
                        >
                          <Pencil size={17} />

                          Edit
                        </button>

                        <button
                          type="button"
                          className="admin-reel-delete"
                          onClick={() =>
                            handleDelete(
                              reel
                            )
                          }
                          disabled={
                            deletingId ===
                            reel.id
                          }
                        >
                          <Trash2 size={17} />

                          {deletingId ===
                            reel.id
                            ? "Deleting..."
                            : "Delete"}
                        </button>

                      </div>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </div>
  );
}

export default Reels;