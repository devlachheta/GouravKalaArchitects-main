import "../styles/project.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// PROJECT CARD IMAGES
import Residentail1 from "../assets/madanpaditarcover.jpg";
import Residentail from "../assets/architecture1.jpg";
import NRKCover from "../assets/nrkprojectdetail1.jpeg";
import DinningSpace from "../assets/interior1.png";
import BedRoom from "../assets/bedroominterior.jpeg";
import LIVING from "../assets/livingroom1.png";

// PROJECT BANNER IMAGES
import ProjectCover1 from "../assets/projectcover1.png";
import ProjectCover2 from "../assets/projectcover2.png";
import ProjectCover3 from "../assets/projectcover3.png";
import ProjectCover4 from "../assets/projectcover4.png";
import ProjectCover5 from "../assets/projectcover5.png";
import ProjectCover6 from "../assets/projectcover6.jpeg";

// CTA
import CTASection from "../CTASection";


function Projects() {

  const [active, setActive] = useState("All");

  const navigate = useNavigate();


  // =========================================
  // FILTERS
  // =========================================

  const filters = [
    "All",
    "Architecture",
    "Interior",
  ];



  const projects = [


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
      image: NRKCover,
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
          .filter(
            (project) =>
              project.category === "Architecture"
          )
          .slice(0, 3),

        ...projects
          .filter(
            (project) =>
              project.category === "Interior"
          )
          .slice(0, 3),
      ]
      : projects.filter(
        (project) =>
          project.category === active
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

          {/* CAROUSEL INDICATORS */}

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


          {/* CAROUSEL IMAGES */}

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


          {/* PREVIOUS BUTTON */}

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


          {/* NEXT BUTTON */}

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


      {/* =====================================
          PROJECT PORTFOLIO
      ====================================== */}

      <section className="portfolio-section">

        <div className="container">

          <div className="portfolio-filter">

            {filters.map((item) => (

              <button
                key={item}
                className={
                  active === item
                    ? "active-filter"
                    : ""
                }
                onClick={() => setActive(item)}
              >

                {item}

              </button>

            ))}

          </div>


          {/* =====================================
              PROJECT GRID
          ====================================== */}

          <div className="project-grid">

            <AnimatePresence mode="popLayout">

              {displayedProjects.map(
                (project, index) => (

                  <motion.div
                    className="project-card"
                    key={`${active}-${project.id}`}

                    initial={{
                      opacity: 0,
                      scale: 1.06,
                    }}

                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}

                    exit={{
                      opacity: 0,
                      scale: 1.02,
                    }}

                    transition={{
                      duration: 1,
                      delay: index * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}

                    onClick={() =>
                      navigate(`/projects/${project.slug}`)
                    }
                  >


                    {/* PROJECT IMAGE */}

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

                      <div className="project-overlay">

                        <h3 className="project-title">
                          {project.title}
                        </h3>

                        <button
                          className="project-btn"
                          type="button"
                        >
                          VIEW PROJECT
                        </button>

                      </div>

                    </div>

                  </motion.div>

                )
              )}

            </AnimatePresence>

          </div>

        </div>

      </section>

      <CTASection />

    </>

  );

}

export default Projects;