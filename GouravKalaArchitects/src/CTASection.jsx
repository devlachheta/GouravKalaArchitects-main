import React from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

import "./CTASection.css";

function CTASection() {
  return (
    <section className="cta-section">
      <div className="container">

        <div className="cta-inner text-center">

          {/* Small Heading */}
          <p className="cta-eyebrow">
            BEGIN A CONVERSATION
          </p>

          {/* Main Heading */}
          <h2 className="cta-title">
            A thoughtful space starts
            <br className="d-none d-md-block" />
            with a simple hello.
          </h2>

          {/* Contact Button */}
          <Link
            to="/contact"
            className="cta-button"
          >
            BOOK A CONSULTATION

            <FiArrowUpRight />
          </Link>

        </div>

      </div>
    </section>
  );
}

export default CTASection;