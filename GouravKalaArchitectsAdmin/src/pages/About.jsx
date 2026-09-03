import { useEffect, useState } from "react";
import api from "../services/api";

function About() {
  const [formData, setFormData] = useState({
    instagram_followers: "",
    facebook_followers: "",
    youtube_subscribers: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ================= FETCH ABOUT DATA =================

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("about/");

        setFormData({
          instagram_followers:
            response.data.instagram_followers ?? "",
          facebook_followers:
            response.data.facebook_followers ?? "",
          youtube_subscribers:
            response.data.youtube_subscribers ?? "",
        });

      } catch (error) {
        console.error("Failed to fetch About:", error);

        setError(
          "Unable to load About content."
        );

      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  // ================= HANDLE CHANGE =================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setMessage("");
    setError("");
  };

  // ================= SAVE ABOUT =================

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setMessage("");
      setError("");

      const response = await api.patch(
        "about/",
        {
          instagram_followers:
            Number(formData.instagram_followers),

          facebook_followers:
            Number(formData.facebook_followers),

          youtube_subscribers:
            Number(formData.youtube_subscribers),
        }
      );

      setFormData({
        instagram_followers:
          response.data.instagram_followers ?? "",

        facebook_followers:
          response.data.facebook_followers ?? "",

        youtube_subscribers:
          response.data.youtube_subscribers ?? "",
      });

      setMessage(
        "About statistics updated successfully."
      );

    } catch (error) {
      console.error(
        "Failed to update About:",
        error
      );

      setError(
        "Unable to save About statistics."
      );

    } finally {
      setSaving(false);
    }
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="projects-page">

        <div className="page-heading">
          <div>
            <h1>About</h1>

            <p>
              Manage the social statistics displayed
              on the About page.
            </p>
          </div>
        </div>

        <div className="projects-loading">
          Loading About content...
        </div>

      </div>
    );
  }

  // ================= PAGE =================

  return (
    <div className="projects-page">

      {/* ================= PAGE HEADER ================= */}

      <div className="page-heading">

        <div>

          <h1>About</h1>

          <p>
            Manage the social statistics displayed
            on the About page.
          </p>

        </div>

      </div>


      {/* ================= ABOUT CARD ================= */}

      <div className="projects-aboutcard">

        <form onSubmit={handleSubmit}>

          {/* ================= CARD HEADER ================= */}

          <div className="page-heading">

            <div>

              <h2>
                Social Statistics
              </h2>

              <p>
                These values are used in both the
                statistics cards and the About page
                paragraph.
              </p>

            </div>

          </div>


          {/* ================= THREE FIELDS ================= */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(3, minmax(0, 1fr))",
              gap: "28px",
              width: "100%",
              marginTop: "30px",
            }}
          >

            {/* INSTAGRAM */}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >

              <label
                htmlFor="instagram_followers"
                style={{
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                Instagram Followers
              </label>

              <input
                id="instagram_followers"
                name="instagram_followers"
                type="number"
                min="0"
                value={
                  formData.instagram_followers
                }
                onChange={handleChange}
                placeholder="100000"
                style={{
                  width: "100%",
                  height: "52px",
                  padding: "0 16px",
                  border: "1px solid #d9d9d9",
                  borderRadius: "8px",
                  fontSize: "16px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />

            </div>


            {/* FACEBOOK */}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >

              <label
                htmlFor="facebook_followers"
                style={{
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                Facebook Followers
              </label>

              <input
                id="facebook_followers"
                name="facebook_followers"
                type="number"
                min="0"
                value={
                  formData.facebook_followers
                }
                onChange={handleChange}
                placeholder="98000"
                style={{
                  width: "100%",
                  height: "52px",
                  padding: "0 16px",
                  border: "1px solid #d9d9d9",
                  borderRadius: "8px",
                  fontSize: "16px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />

            </div>


            {/* YOUTUBE */}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >

              <label
                htmlFor="youtube_subscribers"
                style={{
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                YouTube Subscribers
              </label>

              <input
                id="youtube_subscribers"
                name="youtube_subscribers"
                type="number"
                min="0"
                value={
                  formData.youtube_subscribers
                }
                onChange={handleChange}
                placeholder="67000"
                style={{
                  width: "100%",
                  height: "52px",
                  padding: "0 16px",
                  border: "1px solid #d9d9d9",
                  borderRadius: "8px",
                  fontSize: "16px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />

            </div>

          </div>


          {/* ================= DIVIDER ================= */}

          <div
            style={{
              borderTop:
                "1px solid #e5e5e5",
              marginTop: "32px",
              paddingTop: "24px",
            }}
          >

            {/* SUCCESS */}

            {message && (
              <p
                style={{
                  marginBottom: "16px",
                  color: "#198754",
                  fontSize: "14px",
                }}
              >
                {message}
              </p>
            )}


            {/* ERROR */}

            {error && (
              <p
                style={{
                  marginBottom: "16px",
                  color: "#dc3545",
                  fontSize: "14px",
                }}
              >
                {error}
              </p>
            )}


            {/* SAVE BUTTON */}

            <button
              type="submit"
              className="add-project-button"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default About;