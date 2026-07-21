import React from "react";

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

import architectureImg from "../assets/Services-architects-image1.jpg";
import interiorImg from "../assets/Services-interior.png";
import landscapImg from "../assets/Services-landscap.png";
import constructionImg from "../assets/Services-Construction.png";
import planingImg from "../assets/Services-planing.png";
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
    image: null,
  },
];

function Services() {
  return (
    <>
      <section className="services-hero">
        <div className="services-hero-left">
          <div className="services-hero-content">
            <p className="services-hero-eyebrow">What we do</p>

            <h1 className="services-hero-title">
              Many disciplines.
              <br />
              <em>One vision.</em>
            </h1>

            <p className="services-hero-description">
              We work across architecture, interiors and landscapes to
              <br />
              make every part of a project feel considered.
            </p>
          </div>
        </div>

        <div className="services-hero-right">
          <div className="services-hero-art">
            <span className="services-art-number">02</span>

            <div className="services-art-circle-top"></div>

            <div className="services-art-bottom"></div>

            <div className="services-art-circle-bottom"></div>

            <span className="services-art-label">
              REPLACE WITH
              <br />
              MATERIAL DETAIL
            </span>
          </div>
        </div>
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

          <div className="row g-0 services-grid">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <div
                  className="col-12 col-md-6 col-lg-4"
                  key={service.title}
                >
                  <div
                    className={`service-card ${service.image ? "has-image" : ""
                      }`}
                    style={
                      service.image
                        ? {
                          backgroundImage: `url(${service.image})`,
                        }
                        : {}
                    }
                  >
                    {service.image && (
                      <div className="service-card-overlay"></div>
                    )}

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