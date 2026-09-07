import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Upload,
  Video,
  X,
} from "lucide-react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import api from "../services/api";

function EditReel() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [order, setOrder] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [existingVideo, setExistingVideo] = useState("");
  const [video, setVideo] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);

  const getVideoUrl = (videoUrl) => {
    if (!videoUrl) {
      return "";
    }

    if (
      videoUrl.startsWith("http://") ||
      videoUrl.startsWith("https://")
    ) {
      return videoUrl;
    }

    return `http://127.0.0.1:8000${videoUrl.startsWith("/") ? "" : "/"
      }${videoUrl}`;
  };

  useEffect(() => {
    const fetchReel = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          `reels/${id}/`
        );

        const reel = response.data;

        setTitle(reel.title || "");
        setOrder(
          reel.order !== undefined && reel.order !== null
            ? String(reel.order)
            : ""
        );
        setIsActive(
          reel.is_active ?? true
        );
        setExistingVideo(
          reel.video || ""
        );
      } catch (error) {
        console.error(
          "Failed to fetch reel:",
          error
        );

        setError(
          "Unable to load reel."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReel();
  }, [id]);

  const handleVideoChange = (event) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    if (
      !file.type.startsWith("video/")
    ) {
      setError(
        "Please select a valid video file."
      );
      return;
    }

    setError("");
    setVideo(file);

    const url =
      URL.createObjectURL(file);

    setPreviewUrl(url);
  };

  const handleRemoveNewVideo = () => {
    setVideo(null);
    setPreviewUrl("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    try {
      setSaving(true);

      const formData =
        new FormData();

      if (video) {
        formData.append(
          "video",
          video
        );
      }

      formData.append(
        "title",
        title.trim()
      );

      formData.append(
        "order",
        order || "0"
      );

      formData.append(
        "is_active",
        isActive
      );

      await api.patch(
        `reels/${id}/`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      navigate("/reels");
    } catch (error) {
      console.error(
        "Failed to update reel:",
        error
      );

      console.error(
        "Backend response:",
        error.response?.data
      );

      setError(
        error.response?.data?.detail ||
        "Unable to update reel. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="add-reel-page">
        <div className="reels-loading">
          Loading reel...
        </div>
      </div>
    );
  }

  return (
    <div className="add-reel-page">

      <div className="add-reel-header">

        <button
          type="button"
          className="add-reel-back-button"
          onClick={() =>
            navigate("/reels")
          }
        >
          <ArrowLeft size={19} />
          Back to Reels
        </button>

        <div>
          <h1>
            Edit Reel
          </h1>

          <p>
            Update the reel
            information and
            display settings.
          </p>
        </div>

      </div>

      {error && (
        <div className="add-reel-error">
          <X size={18} />
          <span>
            {error}
          </span>
        </div>
      )}

      <form
        className="add-reel-form-card"
        onSubmit={handleSubmit}
      >

        <div className="add-reel-form-section">

          <h2>
            Reel Details
          </h2>

          <p>
            Update the video and
            basic information
            for this reel.
          </p>

        </div>

        <div className="add-reel-form-group">

          <label>
            Reel Video
          </label>

          {video ? (
            <div className="reel-upload-preview">

              <video
                src={previewUrl}
                controls
                muted
                playsInline
              />

              <button
                type="button"
                className="remove-reel-video"
                onClick={
                  handleRemoveNewVideo
                }
              >
                <X size={18} />
                Remove new video
              </button>

            </div>
          ) : existingVideo ? (
            <div className="reel-upload-preview">

              <video
                src={getVideoUrl(
                  existingVideo
                )}
                controls
                muted
                playsInline
              />

              <button
                type="button"
                className="remove-reel-video"
                onClick={() =>
                  fileInputRef.current?.click()
                }
              >
                <Upload size={18} />
                Replace video
              </button>

            </div>
          ) : (
            <button
              type="button"
              className="reel-upload-area"
              onClick={() =>
                fileInputRef.current?.click()
              }
            >
              <Upload size={32} />

              <strong>
                Choose a video
              </strong>

              <span>
                Upload a new reel
                video
              </span>
            </button>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={
              handleVideoChange
            }
            hidden
          />

        </div>

        <div className="add-reel-form-grid">

          <div className="add-reel-form-group">

            <label>
              Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(event) =>
                setTitle(
                  event.target.value
                )
              }
              placeholder="Enter reel title"
            />

          </div>

          <div className="add-reel-form-group">

            <label>
              Display Order
            </label>

            <input
              type="number"
              min="0"
              value={order}
              onChange={(event) =>
                setOrder(
                  event.target.value
                )
              }
              placeholder="Enter order"
            />

          </div>

        </div>

        <div className="add-reel-active">

          <label>

            <input
              type="checkbox"
              checked={isActive}
              onChange={(event) =>
                setIsActive(
                  event.target.checked
                )
              }
            />

            <span>
              Active
            </span>

          </label>

          <p>
            Active reels will
            appear on the
            website.
          </p>

        </div>

        <div className="add-reel-actions">

          <button
            type="button"
            className="add-reel-cancel"
            onClick={() =>
              navigate("/reels")
            }
            disabled={saving}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="add-reel-save"
            disabled={saving}
          >
            <Video size={18} />

            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>

        </div>

      </form>

    </div>
  );
}

export default EditReel;