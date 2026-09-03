import { useEffect, useState } from "react";
import api from "../services/api";

function Home() {
  const [formData, setFormData] = useState({
    years: "",
    projects: "",
    cities: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ================= FETCH HOME DATA =================

  useEffect(() => {
    const fetchHomepage = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("homepage/");

        setFormData({
          years: response.data.years ?? "",
          projects: response.data.projects ?? "",
          cities: response.data.cities ?? "",
        });

      } catch (error) {
        console.error(
          "Failed to fetch Homepage:",
          error
        );

        setError(
          "Unable to load Homepage content."
        );

      } finally {
        setLoading(false);
      }
    };

    fetchHomepage();
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

  // ================= SAVE HOME =================

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setMessage("");
      setError("");

      const response = await api.patch(
        "homepage/",
        {
          years: formData.years,
          projects: formData.projects,
          cities: formData.cities,
        }
      );

      setFormData({
        years: response.data.years ?? "",
        projects: response.data.projects ?? "",
        cities: response.data.cities ?? "",
      });

      setMessage(
        "Homepage statistics updated successfully."
      );

    } catch (error) {
      console.error(
        "Failed to update Homepage:",
        error
      );

      setError(
        "Unable to save Homepage statistics."
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

            <h1>Home</h1>

            <p>
              Manage the statistics displayed
              on the homepage.
            </p>

          </div>

        </div>

        <div className="projects-loading">
          Loading Homepage content...
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

          <h1>Home</h1>

          <p>
            Manage the statistics displayed
            on the homepage.
          </p>

        </div>

      </div>


      {/* ================= HOME CARD ================= */}

      <div className="projects-homecard">

        <form onSubmit={handleSubmit}>

          {/* ================= CARD HEADER ================= */}

          <div className="page-heading">

            <div>

              <h2>
                Homepage Statistics
              </h2>

              <p>
                These values are displayed
                in the homepage statistics section.
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

            {/* YEARS */}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >

              <label
                htmlFor="years"
                style={{
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                Years of Thoughtful Design
              </label>

              <input
                id="years"
                name="years"
                type="text"
                value={formData.years}
                onChange={handleChange}
                placeholder="07+"
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


            {/* PROJECTS */}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                padding: "15px",
              }}
            >

              <label
                htmlFor="projects"
                style={{
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                Projects Shaped With Care
              </label>

              <input
                id="projects"
                name="projects"
                type="text"
                value={formData.projects}
                onChange={handleChange}
                placeholder="48+"
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


            {/* CITIES */}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >

              <label
                htmlFor="cities"
                style={{
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                Cities Across India
              </label>

              <input
                id="cities"
                name="cities"
                type="text"
                value={formData.cities}
                onChange={handleChange}
                placeholder="06+"
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

export default Home;