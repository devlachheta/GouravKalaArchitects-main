import "../styles/project.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";

// PROJECT BANNER IMAGES
import ProjectCover1 from "../assets/projectcover1.png";
import ProjectCover2 from "../assets/projectcover2.png";
import ProjectCover4 from "../assets/projectcover4.png";
import ProjectCover5 from "../assets/projectcover5.png";
import ProjectCover6 from "../assets/projectcover6.jpeg";
import CTASection from "../CTASection";
import projectsData from "../data/projectsData";


function Projects() {

  const [searchParams, setSearchParams] = useSearchParams();

  const active = searchParams.get("filter") || "All";

  const navigate = useNavigate();

  const filters = [
    "All",
    "Architecture",
    "Interior",
  ];

  const projects = projectsData;


  const displayedProjects =
    active === "All"
      ? [
        ...projects
          .filter(
            (project) =>
              project.type === "architecture"
          )
          .slice(0, 3),

        ...projects
          .filter(
            (project) =>
              project.type === "interior"
          )
          .slice(0, 3),
      ]
      : projects.filter(
        (project) =>
          project.type === active.toLowerCase()
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
                src={ProjectCover4}
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

        <div className="container-fluid p-0">

          <div className="portfolio-filter">

            {filters.map((item) => (

              <button
                key={item}
                className={
                  active === item
                    ? "active-filter"
                    : ""
                }
                onClick={() =>
                  setSearchParams({
                    filter: item,
                  })
                }
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
                      navigate(
                        `/projects/${project.slug}?filter=${active}`
                      )}
                  >


                    {/* PROJECT IMAGE */}

                    < div className="project-image">

                      <img
                        src={project.image}
                        alt={project.title}
                        style={{
                          objectPosition: project.imagePosition || "center"
                        }}
                      />

                      {active === "All" && (
                        <span className="project-category">
                          {project.type.charAt(0).toUpperCase() + project.type.slice(1)}
                        </span>
                      )}

                      <div className="project-overlay">

                        <h3 className="project-title">
                          {project.title}
                        </h3>

                        <p className="project-info">
                          <span>{project.location}</span>

                          <span className="divider">|</span>

                          <span>
                            Plot: {project.plotArea}
                          </span>

                          <span className="divider">|</span>

                          <span>
                            Built-Up: {project.builtUpArea}
                          </span>
                        </p>

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

      </section >

      <CTASection />

    </>

  );

}

export default Projects;