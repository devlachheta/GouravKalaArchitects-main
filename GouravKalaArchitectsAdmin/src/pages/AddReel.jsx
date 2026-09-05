
import { useRef, useState } from "react";
import {
  ArrowLeft,
  Upload,
  Video,
  X,
} from "lucide-react";
import {
  useNavigate,
} from "react-router-dom";
import api from "../services/api";

function AddReel() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [order, setOrder] = useState("");
  const [isActive, setIsActive] =
    useState(true);

  const [video, setVideo] =
    useState(null);

  const [previewUrl, setPreviewUrl] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const fileInputRef =
    useRef(null);

  const handleVideoChange = (
    event
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    if (
      !file.type.startsWith(
        "video/"
      )
    ) {
      setError(
        "Please select a valid video file."
      );

      return;
    }

    setError("");
    setVideo(file);

    const url =
      URL.createObjectURL(
        file
      );

    setPreviewUrl(url);
  };

  const handleRemoveVideo = () => {
    setVideo(null);
    setPreviewUrl("");

    if (fileInputRef.current) {
      fileInputRef.current.value =
        "";
    }
  };

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    setError("");

    if (!video) {
      setError(
        "Please select a video."
      );

      return;
    }

    try {
      setSaving(true);

      const formData =
        new FormData();

      formData.append(
        "video",
        video
      );

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

      await api.post(
        "reels/",
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
        "Failed to create reel:",
        error
      );

      console.error(
        "Backend response:",
        error.response?.data
      );

      setError(
        error.response?.data?.detail ||
        "Unable to add reel. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="add-reel-page">

      <div className="add-reel-header">

        <button
          type="button"
          className="add-reel-back-button"
          onClick={() =>
            navigate(
              "/reels"
            )
          }
        >
          <ArrowLeft
            size={19}
          />

          Back to Reels
        </button>

        <div>
          <h1>
            Add New Reel
          </h1>

          <p>
            Upload a new reel
            for the website.
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
        onSubmit={
          handleSubmit
        }
      >

        <div className="add-reel-form-section">

          <h2>
            Reel Details
          </h2>

          <p>
            Add the video and
            basic information
            for this reel.
          </p>

        </div>

        <div className="add-reel-form-group">

          <label>
            Reel Video
            <span>*</span>
          </label>

          {!video ? (
            <button
              type="button"
              className="reel-upload-area"
              onClick={() =>
                fileInputRef.current?.click()
              }
            >
              <Upload
                size={32}
              />

              <strong>
                Choose a video
              </strong>

              <span>
                Upload your
                reel video
              </span>
            </button>
          ) : (
            <div className="reel-upload-preview">

              <video
                src={
                  previewUrl
                }
                controls
                muted
                playsInline
              />

              <button
                type="button"
                className="remove-reel-video"
                onClick={
                  handleRemoveVideo
                }
              >
                <X
                  size={18}
                />

                Remove video
              </button>

            </div>
          )}

          <input
            ref={
              fileInputRef
            }
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
              value={
                title
              }
              onChange={(
                event
              ) =>
                setTitle(
                  event
                    .target
                    .value
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
              value={
                order
              }
              onChange={(
                event
              ) =>
                setOrder(
                  event
                    .target
                    .value
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
              checked={
                isActive
              }
              onChange={(
                event
              ) =>
                setIsActive(
                  event
                    .target
                    .checked
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
              navigate(
                "/reels"
              )
            }
            disabled={
              saving
            }
          >
            Cancel
          </button>

          <button
            type="submit"
            className="add-reel-save"
            disabled={
              saving
            }
          >
            <Video
              size={18}
            />

            {saving
              ? "Uploading..."
              : "Save Reel"}
          </button>

        </div>

      </form>

    </div>
  );
}

export default AddReel;