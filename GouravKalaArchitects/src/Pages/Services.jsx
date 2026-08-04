import React from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import CTASection from "../CTASection";
import Hero from "../Component/Hero";
import "../styles/Services.css";
import { motion } from "framer-motion";
import Banner from "../assets/gH.png";
import architectureImg from "../assets/Services-architects-image1.webp";
import interiorImg from "../assets/Services-interior.png";
import landscapImg from "../assets/Services-landscap.png";
import constructionImg from "../assets/Services-Construction.png";
import planingImg from "../assets/Services-planing.png";
import renovationImg from "../assets/Services-renovation.png";
import Header from "../Component/Header";

const services = [
  {
    icon: "🏛️",
    title: "Architecture",
    description:
      "Custom residential architecture, planning, elevations, and construction drawings.",
    image: architectureImg,
  },
  {
    icon: "🛋️",
    title: "Interior Design",
    description:
      "Thoughtful interiors with space planning, furniture design, lighting, and material selection.",
    image: interiorImg,
  },
  {
    icon: "📐",
    title: "Landscape Design",
    description:
      "Functional outdoor spaces, gardens, courtyards, terraces, and site planning.",
    image: landscapImg,
  },
  {
    icon: "🔨",
    title: "Construction",
    description:
      "End-to-end execution, site supervision, project coordination, and turnkey solutions.",
    image: constructionImg,
  },
  {
    icon: "📐",
    title: "Space Planning",
    description:
      "Optimized layouts that enhance functionality, comfort, and everyday living.",
    image: planingImg,
  },
  {
    icon: "🏗️",
    title: "Renovation & Remodeling",
    description:
      "Transforming existing homes with thoughtful redesigns and modern upgrades.",
    image: renovationImg,
  },
];

function Services() {
  return (
    <>
      <Header />
      <Hero
        eyebrow="OUR SERVICES"
        title="Designing Every Detail."
        secondTitle="Building Every Experience."
        description="Whether you're planning a new home or transforming an existing one, we provide complete architecture and interior design solutions—from concept to execution."
        image={Banner}
        italicSecondTitle={true}
      />
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
                          {service.icon}
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