import "../styles/project.css";

<<<<<<< HEAD
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// PROJECT BANNER IMAGES
import ProjectCover1 from "../assets/projectcover1.png";
import ProjectCover2 from "../assets/projectcover2.png";
import ProjectCover4 from "../assets/projectcover4.png";
import ProjectCover5 from "../assets/projectcover5.png";
import ProjectCover6 from "../assets/projectcover6.jpeg";

import CTASection from "../CTASection";
import projectsData from "../data/projectsData";
import Header from "../Component/Header";

function Projects() {
=======
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import Carousel from "bootstrap/js/dist/carousel";
import ProjectCover1 from "../assets/projectcover1.png";
import ProjectCover2 from "../assets/projectcover2.webp";
import ProjectCover3 from "../assets/projectcover3.webp";
import ProjectCover4 from "../assets/projectcover4.webp";
import ProjectCover5 from "../assets/projectcover5.webp";
import ProjectCover6 from "../assets/projectcover6.webp";
import CTASection from "../CTASection";
import { useEffect, useState } from "react";
import {
  getArchitectureProjects,
  getInteriorProjects,
} from "../utils/projectUtils";


function Projects() {

  useEffect(() => {
    const carouselElement = document.getElementById("projectCarousel");

    if (carouselElement) {
      new Carousel(carouselElement, {
        interval: 1800,
        ride: "carousel",
        pause: false,
        wrap: true,
      });
    }
  }, []);

>>>>>>> feature/CMS
  const [searchParams, setSearchParams] = useSearchParams();

  const active = searchParams.get("filter") || "All";

  const navigate = useNavigate();

  const filters = [
    "All",
    "Architecture",
    "Interior",
  ];


<<<<<<< HEAD
=======
  const [architectureProjects, setArchitectureProjects] = useState([]);
  const [interiorProjects, setInteriorProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const architecture = await getArchitectureProjects();
        const interior = await getInteriorProjects();

        console.log("Architecture:", architecture);
        console.log("Interior:", interior);


        setArchitectureProjects(architecture);
        setInteriorProjects(interior);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }

    fetchProjects();
  }, []);

  const projects = [
    ...architectureProjects,
    ...interiorProjects,
  ];

>>>>>>> feature/CMS
  const displayedProjects =
    active === "All"
      ? [
        ...projects
<<<<<<< HEAD
          .filter((project) => project.type === "architecture")
          .slice(0, 3),

        ...projects
          .filter((project) => project.type === "interior")
          .slice(0, 3),
      ]
      : projects.filter(
        (project) => project.type === active.toLowerCase()
=======
          .filter(project => project.type === "architecture")
          .slice(0, 3),

        ...projects
          .filter(project => project.type === "interior")
          .slice(0, 3),
      ]
      : projects.filter(
        project => project.type === active.toLowerCase()
>>>>>>> feature/CMS
      );
  return (
    <>
      {/* ===============================
          HERO SECTION
      =============================== */}
      <Header />
      <section className="project-hero">
        <div
          id="projectCarousel"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          data-bs-interval="1500"
        >
          {/* Indicators */}

          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#projectCarousel"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
            ></button>

            <button
              type="button"
              data-bs-target="#projectCarousel"
              data-bs-slide-to="1"
            ></button>

            <button
              type="button"
              data-bs-target="#projectCarousel"
              data-bs-slide-to="2"
            ></button>

            <button
              type="button"
              data-bs-target="#projectCarousel"
              data-bs-slide-to="3"
            ></button>

            <button
              type="button"
              data-bs-target="#projectCarousel"
              data-bs-slide-to="4"
            ></button>

            <button
              type="button"
              data-bs-target="#projectCarousel"
              data-bs-slide-to="5"
            ></button>
          </div>

          {/* Images */}

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
                className="project-cover3 d-block w-100"
                alt="Project 3"
                style={{
                  objectFit: "cover",
                  objectPosition: "center 100%",
                }}
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

          {/* Previous */}

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

          {/* Next */}

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

<<<<<<< HEAD

        <div className="project-hero-overlay"></div>
=======
        <div
          className="hero-explore"
          onClick={() =>
            document.querySelector(".portfolio-section").scrollIntoView({
              behavior: "smooth",
            })
          }
        >
          <span>EXPLORE MORE</span>

          <div className="scroll-arrow">
            ↓
          </div>
        </div>

>>>>>>> feature/CMS
      </section>

      {/* ===============================
          PORTFOLIO
      =============================== */}

      <section className="portfolio-section">
        <div className="container-fluid p-0">
          <div className="portfolio-filter">
            {filters.map((item) => (
              <button
                key={item}
                className={
                  active === item ? "active-filter" : ""
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

          <div className="project-grid">
            <AnimatePresence mode="popLayout">
              {displayedProjects.map(
                (project, index) => (
                  <motion.div
                    key={`${active}-${project.id}`}
                    className="project-card"
                    initial={{
                      opacity: 0,
                      x:
                        index % 3 === 0
                          ? -120
                          : index % 3 === 2
                            ? 120
                            : 0,
                      y: index % 3 === 1 ? 80 : 0,
                      scale: 0.96,
                    }}
<<<<<<< HEAD
                    animate={{
=======

                    whileInView={{
>>>>>>> feature/CMS
                      opacity: 1,
                      x: 0,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      x:
                        index % 3 === 0
                          ? -120
                          : index % 3 === 2
                            ? 120
                            : 0,
                      y: index % 3 === 1 ? 80 : 0,
                      scale: 0.96,
                    }}

                    viewport={{
                      once: true,
                      amount: 0.2,
                    }}

                    whileHover={{
                      y: -10,
                      transition: {
                        duration: 0.3,
                      },
                    }}
                    transition={{
                      duration: 1,
                      delay: index * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={() =>
<<<<<<< HEAD
                      navigate(
                        `/projects/${project.slug}?filter=${active}`
                      )
=======
                      navigate(`/projects/${project.slug}?filter=${active}`)
>>>>>>> feature/CMS
                    }
                  >
                    <div className="project-image">
                      <img
                        src={project.image}
                        alt={project.title}
                        style={{
                          objectPosition:
                            project.imagePosition ||
                            "center",
                        }}
                      />

                      {active === "All" && (
                        <span className="project-category">
                          {project.type.charAt(0).toUpperCase() +
                            project.type.slice(1)}
                        </span>
                      )}

                      <div className="project-overlay">
                        <h3 className="project-title">
                          Project: {project.title}
                        </h3>

                        <p className="project-info">
                          <span>
                            {project.location}
                          </span>

                          <span className="divider">
                            |
                          </span>

                          {project.type === "architecture" ? (
                            <>
                              <span>Plot: {project.plotArea}</span>

<<<<<<< HEAD
                          <span className="divider">
                            |
                          </span>

                          <span>
                            Built-Up:{" "}
                            {project.builtUpArea}
                          </span>
=======
                              <span className="divider">|</span>

                              <span>Built-Up: {project.builtUpArea}</span>
                            </>
                          ) : (
                            <span>Carpet-Area: {project.carpetArea}</span>
                          )}
>>>>>>> feature/CMS
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
      </section>

      <CTASection />
    </>
  );
}

export default Projects;