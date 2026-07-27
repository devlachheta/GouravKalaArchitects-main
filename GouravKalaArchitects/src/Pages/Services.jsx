import React from "react";
import { Link } from "react-router-dom";
import {
  FiBox,
  FiCompass,
  FiFeather,
  FiGrid,
  FiHome,
  FiTool,
  FiArrowUpRight,
} from "react-icons/fi";
import CTASection from "../CTASection";
import "../styles/Services.css";
import { motion } from "framer-motion";

import Banner from "../assets/gouravhero.PNG";
import architectureImg from "../assets/Services-architects-image1.jpg";
import interiorImg from "../assets/Services-interior.png";
import landscapImg from "../assets/Services-landscap.png";
import constructionImg from "../assets/Services-Construction.png";
import planingImg from "../assets/Services-planing.png";
import renovationImg from "../assets/Services-renovation.png"
const services = [
  {
    icon: FiCompass,
    title: "Architecture",
    description:
      "Custom residentail architecture,planning, elevations, and construction drawings.",
    image: architectureImg,
  },
  {
    icon: FiHome,
    title: "Interior design",
    description:
      "Thoughtful interiors with space planning, furniture design, lighting, and material selection.",
    image: interiorImg,
  },
  {
    icon: FiFeather,
    title: "Landscape Design",
    description:
      "Functional outdoor spaces, gardens, courtyards, terraces, and site planning.",
    image: landscapImg,
  },
  {
    icon: FiTool,
    title: "Construction",
    description:
      "End-to-end execution, site supervision, project coordination, and turnkey solutions.",
    image: constructionImg,
  },
  {
    icon: FiGrid,
    title: "Space Planning",
    description:
      "Optimized layouts that enhance functionality, comfort, and everyday living.",
    image: planingImg,
  },
  {
    icon: FiBox,
    title: "Renovation & Remodeling",
    description:
      "Transforming existing homes with thoughtful redesigns and modern upgrades.",
    image: renovationImg,
  },
];

function Services() {

  const heroTitle = "Designing Every Detail.";
  const heroTitle2 = "Building Every Experience";

  const heroContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const heroLetter = {
    hidden: {
      opacity: 0,
      x: 50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <>

      <section className="services-hero">

        {/* LEFT SIDE */}
        <div className="services-hero-left">

          <div className="services-hero-content">


            <motion.h1
              className="services-hero-title"
              variants={heroContainer}
              initial="hidden"
              animate="visible"
            >

              {heroTitle.split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={heroLetter}
                  style={{
                    display: "inline-block",
                    whiteSpace: char === " " ? "pre" : "normal",
                  }}
                >
                  {char}
                </motion.span>
              ))}

              <br />

              <em>
                {heroTitle2.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    variants={heroLetter}
                    style={{
                      display: "inline-block",
                      whiteSpace: char === " " ? "pre" : "normal",
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </em>

            </motion.h1>

            <motion.p
              className="services-hero-description"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: "easeOut",
              }}
            >
              Whether you’re planning a new home or transforming an existing one, we provide complete architecture and interior design solutions—from concept to execution.
            </motion.p>

          </div>

        </div>



        <motion.div
          className="services-hero-right"
          initial={{
            opacity: 0,
            x: 120,
            scale: 1.08,
          }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          transition={{
            duration: 1.3,
            ease: "easeOut",
          }}
        >
          <img
            src={Banner}
            alt="Gourav Kala Architects Services"
          />
        </motion.div>

      </section>
      <section className="services-section">
        <div className="container">
          <div className="row">
            <motion.span
              className="services-hero-eyebrow"
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
            >
              WHAT WE DO
            </motion.span>

          </div>

          <div className="row g-4 services-grid">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <div
                  className="col-12 col-md-6 col-lg-4"
                  key={service.title}
                >
                  <Link to="/projects" className="service-card-link">

                    <div className="service-card">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="service-card-image"
                      />

                      <div className="service-card-overlay"></div>

                      <div className="service-card-content">
                        <span className="service-number">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <div className="service-icon">
                          <Icon />
                        </div>

                        <h3>{service.title}</h3>

                        <p>{service.description}</p>

                        <FiArrowUpRight className="card-arrow" />
                      </div>
                    </div>

                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}

export default Services;