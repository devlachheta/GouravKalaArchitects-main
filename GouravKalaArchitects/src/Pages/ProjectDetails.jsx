import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/ProjectDetails.css";
import { useEffect, useState } from "react";
import ProjectGallery from "../Component/Gallery/ProjectGallery";
import {
  getArchitectureProjects,
  getInteriorProjects,
} from "../utils/projectUtils";
import projectsData from "../data/projectsData";

function ProjectDetails() {

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 45,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const imageAnimation = {
    hidden: {
      opacity: 0,
      y: 55,
      scale: 0.97,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };

  const transition = {
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1],
  };

  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const filter = searchParams.get("filter") || "All";

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadProject() {
      try {
        setLoading(true);

        window.scrollTo(0, 0);

        // 1. Search in static projects
        let foundProject = projectsData.find(
          (item) => item.slug === slug
        );

        // 2. If not found, search in Sanity
        if (!foundProject) {
          const architecture = await getArchitectureProjects();
          const interior = await getInteriorProjects();

          const allProjects = [
            ...architecture,
            ...interior,
          ];

          foundProject = allProjects.find(
            (item) => item.slug === slug
          );
        }

        setProject(foundProject);

        if (foundProject) {
          document.title = `${foundProject.title} | Madan Portfolio`;
        } else {
          document.title = "Project Not Found";
        }
      } catch (error) {
        console.error("Error loading project:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px",
        }}
      >
        Loading...
      </div>
    );
  }

  // Project not found
  if (!project) {
    return (
      <div className="project-not-found">
        <h1>Project Not Found</h1>

        <p>
          The project you're looking for doesn't exist.
        </p>

        <button
          onClick={() => navigate(`/projects?filter=${filter}`)}
        >
          Back to Projects
        </button>
      </div>
    );
  }

  const heroStyle = {
    backgroundImage: `url(${project.bannerImage})`,
    backgroundPosition: project.bannerPosition || "center",
  };

  console.log("Project Details:", project);
  return (

    <main className="project-details-page">

      {/* Hero */}

      <section
        className="project-detail-hero"
        style={heroStyle}
      >
        <div className="project-detail-overlay"></div>


        <motion.div

          className="project-detail-hero-content"

          initial={{
            opacity: 0,
            y: 45,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.9,
            delay: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}

        >

          <span className="project-detail-category">
            {project.type}
          </span>
          <h1>
            {project.title}
          </h1>
          <p>
            Plot Area:{project.plotArea} <br />
            Built up Area: {project.builtUpArea}
          </p>

          <div className="project-detail-location">
            <span>
              Location: {project.location}
            </span>

          </div>

        </motion.div>


      </section>

      {/* Gallery */}

      <section className="project-gallery">

        <div className="container">

          <motion.div

            className="project-gallery-heading"

            initial={{
              opacity: 0,
              y: 45,
            }}

            whileInView={{
              opacity: 1,
              y: 0,
            }}

            viewport={{
              once: true,
              amount: 0.4,
            }}

            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}

          >
            <span>
              PROJECT GALLERY
            </span>
            <h2>
              A closer look.
            </h2>
          </motion.div>

          <ProjectGallery
            category={project.type}
            gallery={project.gallery}
            title={project.title}
          />
        </div>

      </section>

      {/* PROJECT FILM */}

      {
        project.youtubeUrl && (


          <section className="project-film">

            <div className="container">


              {/* FILM HEADING */}

              <motion.div

                className="project-film-heading"

                initial={{
                  opacity: 0,
                  y: 45,
                }}

                whileInView={{
                  opacity: 1,
                  y: 0,
                }}

                viewport={{
                  once: true,
                  amount: 0.4,
                }}

                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}

              >

                <span>

                  PROJECT FILM

                </span>


                <h2>

                  Experience the space.

                </h2>

              </motion.div>



              {/* VIDEO */}

              <motion.div

                className="project-video-wrapper"

                initial={{
                  opacity: 0,
                  y: 50,
                  scale: 0.98,
                }}

                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}

                viewport={{
                  once: true,
                  amount: 0.2,
                }}

                transition={{
                  duration: 1,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}

              >


                <iframe
                  loading="lazy"

                  src={project.youtubeUrl}

                  title={`${project.title} Project Film`}

                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"

                  allowFullScreen

                ></iframe>


              </motion.div>


            </div>

          </section>

        )
      }

    </main >

  );

}


export default ProjectDetails;