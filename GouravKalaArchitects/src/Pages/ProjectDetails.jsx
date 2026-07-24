import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import "../styles/ProjectDetails.css";
import projectsData from "../data/projectsData";


function ProjectDetails() {

  const { slug } = useParams();


  // =========================================
  // FIND PROJECT USING URL SLUG
  // =========================================

  const project = projectsData.find(
    (item) => item.slug === slug
  );


  // =========================================
  // PROJECT NOT FOUND
  // =========================================

  if (!project) {

    return (

      <div className="project-not-found">

        <h1>
          Project not found
        </h1>

      </div>

    );

  }


  return (

    <main className="project-details-page">


      {/* =========================================
          1. PROJECT HERO BANNER
      ========================================== */}

      <section className="project-detail-hero">


        {/* BANNER IMAGE */}

        <motion.img

          src={project.bannerImage}

          alt={project.title}

          className="project-detail-hero-image"

          initial={{
            opacity: 0,
            scale: 1.08,
          }}

          animate={{
            opacity: 1,
            scale: 1,
          }}

          transition={{
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
          }}

        />


        {/* DARK OVERLAY */}

        <div className="project-detail-overlay"></div>


        {/* HERO CONTENT */}

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

            {project.category}

          </span>


          <h1>

            {project.title}

          </h1>


          <div className="project-detail-location">

            <span>
              {project.location}
            </span>

            <span>
              —
            </span>

            <span>
              {project.year}
            </span>

          </div>

        </motion.div>


      </section>



      {/* =========================================
          2. ABOUT THE PROJECT
      ========================================== */}

      <section className="project-detail-info">

        <div className="container">


          <motion.div

            className="project-info-grid"

            initial={{
              opacity: 0,
              y: 60,
            }}

            whileInView={{
              opacity: 1,
              y: 0,
            }}

            viewport={{
              once: true,
              amount: 0.25,
            }}

            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}

          >


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


              {/* PROJECT META */}

              <div className="project-meta">


                <div className="project-meta-item">

                  <span>
                    TYPE
                  </span>

                  <p>
                    {project.category}
                  </p>

                </div>


                <div className="project-meta-item">

                  <span>
                    LOCATION
                  </span>

                  <p>
                    {project.location}
                  </p>

                </div>


                <div className="project-meta-item">

                  <span>
                    YEAR
                  </span>

                  <p>
                    {project.year}
                  </p>

                </div>


                <div className="project-meta-item">

                  <span>
                    STATUS
                  </span>

                  <p>
                    {project.status}
                  </p>

                </div>


              </div>

            </div>


          </motion.div>

        </div>

      </section>



      {/* =========================================
          3. PROJECT GALLERY
      ========================================== */}

      <section className="project-gallery">

        <div className="container">


          {/* GALLERY HEADING */}

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



          {/* =========================================
              6 PROJECT IMAGES
          ========================================== */}

          <div className="project-gallery-grid">


            {project.gallery.map((image, index) => (


              <motion.div

                className="project-gallery-item"

                key={index}


                /* START STATE */

                initial={{
                  opacity: 0,
                  y: 55,
                  scale: 0.97,
                }}


                /* ANIMATE WHEN IMAGE ENTERS SCREEN */

                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}


                /* RUN ONCE */

                viewport={{
                  once: true,
                  amount: 0.2,
                }}


                /* SMOOTH TRANSITION */

                transition={{
                  duration: 0.85,

                  // Creates slight stagger between
                  // left and right image in each row
                  delay: (index % 2) * 0.12,

                  ease: [0.22, 1, 0.36, 1],
                }}

              >


                <img

                  src={image}

                  alt={`${project.title} - ${index + 1}`}

                />


              </motion.div>


            ))}


          </div>

        </div>

      </section>



      {/* =========================================
          4. PROJECT FILM
          ONLY SHOW IF YOUTUBE URL EXISTS
      ========================================== */}

      {project.youtubeUrl && (


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

                src={project.youtubeUrl}

                title={`${project.title} Project Film`}

                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"

                allowFullScreen

              ></iframe>


            </motion.div>


          </div>

        </section>


      )}


    </main>

  );

}


export default ProjectDetails;