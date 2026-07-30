import React from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

import "./CTASection.css";
import CtaBg from "./assets/CTA-background.PNG";

function CTASection() {
  return (
    <section className="cta-section">

      <img
        src={CtaBg}
        alt="CTA Background"
        className="cta-bg"
      />

      <div className="cta-overlay">
        <div className="container">
          <div className="cta-inner">

            <h2 className="cta-title">
              A thoughtful space starts
              <br />
              with a simple <span className="cta-hello">hello.</span>
            </h2>

            <Link to="/contact" className="cta-button">
              BOOK A CONSULTATION
              <FiArrowUpRight />
            </Link>

          </div>
        </div>
      </div>

    </section>
  );
}

export default CTASection;