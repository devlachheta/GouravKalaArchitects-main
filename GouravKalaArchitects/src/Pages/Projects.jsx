
import ProjectCover from "../assets/projectcover.jpeg";
import "../styles/project.css";
import { useState } from "react";
import Residentail from "../assets/residential1.jpg";
import DinningSpace from "../assets/interior1.png";
import BedRoom from "../assets/bedroominterior.jpeg";
import LIVING from "../assets/livingroom1.png";
import Residentail1 from "../assets/architecture1.jpg"

function Projects() {
  const [active, setActive] = useState("All");

  const filters = [
    "All",
    "Architecture",
    "Interior"
  ];

  const projects = [
    {
      id: 1,
      title: "Luxury Villa",
      category: "Architecture",
      image: Residentail1,
    },
    {
      id: 2,
      title: "Urban Residence",
      category: "Architecture",
      image: Residentail,
    },
    {
      id: 3,
      title: "Courtyard House",
      category: "Architecture",
      image: Residentail,
    },
    {
      id: 4,
      title: "Elegant Dining Space",
      category: "Interior",
      image: DinningSpace,
    },
    {
      id: 5,
      title: "Modern Living Room",
      category: "Interior",
      image: LIVING,
    },
    {
      id: 6,
      title: "Luxury Bedroom",
      category: "Interior",
      image: BedRoom,
    },
  ];

  return (
    <>

      <section className="project-hero">
        <div className="container-fluid p-0">
          <div className="row g-0 project-hero-row">
            <img src={ProjectCover} alt="" />
          </div>
        </div>
      </section>
      <section className="portfolio-section">
        <div className="container">

          <div className="portfolio-top">

            <div className="portfolio-left">

              <span className="portfolio-eyebrow">
                THE PORTFOLIO
              </span>

              <h2>
                Work across places
                <br />
                and scales.
              </h2>

            </div>

            <div className="portfolio-right">

              <button className="start-btn">
                Start a Project
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <line x1="7" y1="17" x2="17" y2="7">
                  </line>
                  <polyline points="7 7 17 7 17 17">
                  </polyline>
                </svg>
              </button>

            </div>

          </div>

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

            {projects
              .filter(project =>
                active === "All"
                  ? true
                  : project.category === active
              )
              .map((project) => (

                <div className="project-card" key={project.id}>

                  <div className="project-image">

                    <img
                      src={project.image}
                      alt={project.title}
                    />

                    <span className="project-category">
                      {project.category}
                    </span>

                    <button className="project-arrow">
                      ↗
                    </button>

                  </div>

                  <div className="project-content">

                    <h3>{project.title}</h3>

                    <span>
                      {String(project.id).padStart(2, "0")}
                    </span>

                  </div>

                </div>

              ))}

          </div>

        </div>
      </section>
    </>
  );

}
export default Projects;