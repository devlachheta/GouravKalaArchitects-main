
import "../styles/project.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Residentail from "../assets/residential1.jpg";
import DinningSpace from "../assets/interior1.png";
import BedRoom from "../assets/bedroominterior.jpeg";
import LIVING from "../assets/livingroom1.png";
import Residentail1 from "../assets/architecture1.jpg"
import CTASection from "../CTASection";
import ProjectCover1 from "../assets/projectcover1.png";
import ProjectCover2 from "../assets/projectcover2.png";
import ProjectCover3 from "../assets/projectcover3.png";
import ProjectCover4 from "../assets/projectcover4.png";
import ProjectCover5 from "../assets/projectcover5.png";

import ProjectCover6 from "../assets/projectcover6.jpeg";

function Projects() {
  const [active, setActive] = useState("All");

  const navigate = useNavigate();

  const filters = [
    "All",
    "Architecture",
    "Interior"
  ];

  const projects = [


    // =========================
    // ARCHITECTURE - 6 PROJECTS
    // =========================

    {
      id: 1,
      slug: "luxury-villa",
      title: "Luxury Villa",
      category: "Architecture",
      image: Residentail1,
    },
    {
      id: 2,
      slug: "urban-residence",
      title: "Urban Residence",
      category: "Architecture",
      image: Residentail,
    },
    {
      id: 3,
      slug: "courtyard-house",
      title: "Courtyard House",
      category: "Architecture",
      image: Residentail,
    },
    {
      id: 7,
      slug: "modern-villa",
      title: "Modern Villa",
      category: "Architecture",
      image: Residentail1,
    },
    {
      id: 8,
      slug: "contemporary-house",
      title: "Contemporary House",
      category: "Architecture",
      image: Residentail,
    },
    {
      id: 9,
      slug: "weekend-residence",
      title: "Weekend Residence",
      category: "Architecture",
      image: Residentail1,
    },

    // ======================
    // INTERIOR - 6 PROJECTS
    // ======================

    {
      id: 4,
      slug: "elegant-dining-space",
      title: "Elegant Dining Space",
      category: "Interior",
      image: DinningSpace,
    },
    {
      id: 5,
      slug: "modern-living-room",
      title: "Modern Living Room",
      category: "Interior",
      image: LIVING,
    },
    {
      id: 6,
      slug: "luxury-bedroom",
      title: "Luxury Bedroom",
      category: "Interior",
      image: BedRoom,
    },
    {
      id: 10,
      slug: "contemporary-dining-interior",
      title: "Contemporary Dining Interior",
      category: "Interior",
      image: DinningSpace,
    },
    {
      id: 11,
      slug: "refined-living-space",
      title: "Refined Living Space",
      category: "Interior",
      image: LIVING,
    },
    {
      id: 12,
      slug: "serene-bedroom-interior",
      title: "Serene Bedroom Interior",
      category: "Interior",
      image: BedRoom,
    },
  ];
  const displayedProjects =
    active === "All"
      ? [
        ...projects
          .filter((project) => project.category === "Architecture")
          .slice(0, 3),

        ...projects
          .filter((project) => project.category === "Interior")
          .slice(0, 3),
      ]
      : projects.filter(
        (project) => project.category === active
      );
  return (
    <>


      <section className="project-hero">

        <div
          id="projectCarousel"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          data-bs-interval="1800"
        >

          {/* INDICATORS */}
          <div className="carousel-indicators">

            <button
              type="button"
              data-bs-target="#projectCarousel"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>

            <button
              type="button"
              data-bs-target="#projectCarousel"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>

            <button
              type="button"
              data-bs-target="#projectCarousel"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>

            <button
              type="button"
              data-bs-target="#projectCarousel"
              data-bs-slide-to="3"
              aria-label="Slide 4"
            ></button>

            <button
              type="button"
              data-bs-target="#projectCarousel"
              data-bs-slide-to="4"
              aria-label="Slide 5"
            ></button>

            <button
              type="button"
              data-bs-target="#projectCarousel"
              data-bs-slide-to="5"
              aria-label="Slide 6"
            ></button>

          </div>


          <div className="carousel-inner">

            <div className="carousel-item active">
              <img
                src={ProjectCover1}
                className="d-block w-100"
                alt="Project 1"
              />
            </div>

            <div className="carousel-item">
              <img
                src={ProjectCover2}
                className="d-block w-100"
                alt="Project 2"
              />
            </div>

            <div className="carousel-item">
              <img
                src={ProjectCover3}
                className="d-block w-100"
                alt="Project 3"
              />
            </div>

            <div className="carousel-item">
              <img
                src={ProjectCover4}
                className="d-block w-100"
                alt="Project 4"
              />
            </div>

            <div className="carousel-item">
              <img
                src={ProjectCover5}
                className="d-block w-100"
                alt="Project 5"
              />
            </div>

            <div className="carousel-item">
              <img
                src={ProjectCover6}
                className="d-block w-100"
                alt="Project 6"
              />
            </div>

          </div>



          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#projectCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>

            <span className="visually-hidden">
              Previous
            </span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#projectCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>

            <span className="visually-hidden">
              Next
            </span>
          </button>

        </div>

      </section>
      <section className="portfolio-section">
        <div className="container">


          <div className="portfolio-filter">

            {filters.map((item) => (

              <button
                key={item}
                className={active === item ? "active-filter" : ""}
                onClick={() => setActive(item)}
              >
                {item}
              </button>

            ))}

          </div>
          <div className="project-grid">

            {displayedProjects.map((project) => (

              <div
                className="project-card"
                key={project.id}
                onClick={() => navigate(`/projects/${project.slug}`)}
              >

                <div className="project-image">

                  <img
                    src={project.image}
                    alt={project.title}
                  />

                  {active === "All" && (
                    <span className="project-category">
                      {project.category}
                    </span>
                  )}

                  <button className="project-view-more">
                    VIEW MORE
                  </button>

                </div>

                <div className="project-content">

                  <h3>
                    {project.title}
                  </h3>

                  <span>
                    {String(project.id).padStart(2, "0")}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>
      </section>
      <CTASection />
    </>
  );

}
export default Projects;