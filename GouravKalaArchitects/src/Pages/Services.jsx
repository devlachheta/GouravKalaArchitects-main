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
import "./Services.css";

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
      "Buildings that belong to their site, serve their people and age beautifully.",
    image: architectureImg,
  },
  {
    icon: FiHome,
    title: "Interior design",
    description:
      "Atmospheres built from material, proportion, light and personal ritual.",
    image: interiorImg,
  },
  {
    icon: FiFeather,
    title: "Landscape",
    description:
      "Quiet outdoor spaces that connect built form with the natural world.",
    image: landscapImg,
  },
  {
    icon: FiTool,
    title: "Construction",
    description:
      "A close, practical presence through every stage of making.",
    image: constructionImg,
  },
  {
    icon: FiGrid,
    title: "Planning",
    description:
      "Clear thinking at the beginning, when a project’s greatest choices are made.",
    image: planingImg,
  },
  {
    icon: FiBox,
    title: "Renovation",
    description:
      "Thoughtful renewal that keeps the character worth preserving.",
    image: renovationImg,
  },
];

function Services() {

  const heroTitle = "Many disciplines.";
  const heroTitle2 = "One vision.";

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
              We work across architecture, interiors and landscapes to
              <br />
              make every part of a project feel considered.
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
            <div className="col-12 col-lg-8">
              <p className="services-section-eyebrow">
                Our expertise
              </p>

              <h2 className="services-section-title">
                From first line to
                <br />
                <em>final layer.</em>
              </h2>

              <p className="services-section-description">
                Each service can be engaged independently or as part
                of a complete, integrated design journey.
              </p>
            </div>
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

      <section className="service-statement">
        <div className="container">
          <p className="service-eyebrow">
            A considered collaboration
          </p>

          <h2>
            One team. One clear thread
            <br />
            from <em>concept to completion.</em>
          </h2>
        </div>
      </section>

      <CTASection />
    </>
  );
}

export default Services;