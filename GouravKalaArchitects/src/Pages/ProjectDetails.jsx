import { useParams } from "react-router-dom";
import "../styles/ProjectDetails.css";
import projectsData from "../data/projectsData";

function ProjectDetails() {
  const { slug } = useParams();

  // Find project using the slug from URL
  const project = projectsData.find(
    (item) => item.slug === slug
  );

  // If project is not found
  if (!project) {
    return (
      <div className="project-not-found">
        <h1>Project not found</h1>
      </div>
    );
  }

  return (
    <main className="project-details-page">

      {/* =========================
          PROJECT HERO BANNER
      ========================== */}
      <section className="project-detail-hero">

        <img
          src={project.bannerImage}
          alt={project.title}
          className="project-detail-hero-image"
        />

        <div className="project-detail-overlay"></div>

        <div className="project-detail-hero-content">

          <span className="project-detail-category">
            {project.category}
          </span>

          <h1>{project.title}</h1>

          <div className="project-detail-location">
            <span>{project.location}</span>

            <span>—</span>

            <span>{project.year}</span>
          </div>

        </div>

      </section>


      {/* =========================
          PROJECT INFORMATION
      ========================== */}
      <section className="project-detail-info">

        <div className="container">

          <div className="project-info-grid">

            {/* LEFT SIDE */}
            <div className="project-info-left">

              <span className="project-info-label">
                ABOUT THE PROJECT
              </span>

              <h2>
                Designed around life,
                <br />
                light and place.
              </h2>

            </div>


            {/* RIGHT SIDE */}
            <div className="project-info-right">

              <p className="project-description">
                {project.description}
              </p>


              <div className="project-meta">

                <div className="project-meta-item">
                  <span>TYPE</span>

                  <p>
                    {project.category}
                  </p>
                </div>


                <div className="project-meta-item">
                  <span>LOCATION</span>

                  <p>
                    {project.location}
                  </p>
                </div>


                <div className="project-meta-item">
                  <span>YEAR</span>

                  <p>
                    {project.year}
                  </p>
                </div>


                <div className="project-meta-item">
                  <span>STATUS</span>

                  <p>
                    {project.status}
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>
      {/* =========================
    PROJECT GALLERY
========================== */}

      <section className="project-gallery">

        <div className="container">

          <div className="project-gallery-heading">

            <span>PROJECT GALLERY</span>

            <h2>
              A closer look.
            </h2>

          </div>


          <div className="project-gallery-grid">

            {project.gallery.map((image, index) => (

              <div
                className="project-gallery-item"
                key={index}
              >

                <img
                  src={image}
                  alt={`${project.title} - ${index + 1}`}
                />

              </div>

            ))}

          </div>

        </div>

      </section>
      {/* =========================
    PROJECT FILM
========================== */}

      {project.youtubeUrl && (

        <section className="project-film">

          <div className="container">

            <div className="project-film-heading">

              <span>PROJECT FILM</span>

              <h2>
                Experience the space.
              </h2>

            </div>

            <div className="project-video-wrapper">

              <iframe
                src={project.youtubeUrl}
                title={`${project.title} Project Film`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

            </div>

          </div>

        </section>

      )}

    </main>
  );
}

export default ProjectDetails;