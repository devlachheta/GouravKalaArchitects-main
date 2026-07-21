import CTASection from "../CTASection";
import "../styles/ContactUs.css";

import {
  FiArrowUpRight,
  FiInstagram,
  FiFacebook,
  FiMapPin,
  FiPhone,
  FiYoutube,
} from "react-icons/fi";
import { motion } from "framer-motion";
import Banner from "../assets/gouravhero.PNG";

function ContactUs() {

  const heroTitle = "Spaces that";
  const heroTitle2 = "stay with you.";

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
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };
  return (
    <>
      <section className="hero">

        <div className="hero-left">
          <div className="hero-content">

            <motion.span
              className="sub-title"
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
            >
              GOURAV KALA ARCHITECTS
            </motion.span>
            <motion.h1
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

              <span>
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
              </span>
            </motion.h1>

            <motion.p variants={itemVariants}>
              An architecture and interiors studio creating
              considered places for the way life is lived now.
            </motion.p>

            <motion.a
              href="#"
              className="explore-btn"
              variants={itemVariants}
              whileHover={{
                x: 6,
              }}
            >
              Explore Our Work
              <span>↗</span>
            </motion.a>

          </div>
        </div>

        <motion.div
          className="hero-right"
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
          <img src={Banner} alt="Hero" />
        </motion.div>
      </section>
      <section className="contact-section">
        <div className="container">

          {/* Heading */}
          <div className="row">
            <div className="col-lg-8 col-md-10 col-12">
              <div className="contact-heading">
                <h2 className="contact-title">
                  A first conversation.
                </h2>

                <p className="contact-subtitle">
                  Whether you have a site, a sketch or only a feeling, we would
                  love to hear where you are beginning.
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="row align-items-end g-lg-5">

            {/* LEFT - FORM */}
            <div className="col-lg-8 col-12">

              <form
                className="contact-form"
                onSubmit={(event) => event.preventDefault()}
              >

                {/* Name + Email */}
                <div className="row g-md-4">

                  <div className="col-md-6 col-12 form-field">
                    <label className="contact-label">
                      FULL NAME
                    </label>

                    <input
                      type="text"
                      className="contact-input"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="col-md-6 col-12 form-field">
                    <label className="contact-label">
                      EMAIL ADDRESS
                    </label>

                    <input
                      type="email"
                      className="contact-input"
                      placeholder="you@email.com"
                    />
                  </div>

                </div>

                {/* Phone + Project */}
                <div className="row g-md-4">

                  <div className="col-md-6 col-12 form-field">
                    <label className="contact-label">
                      PHONE
                    </label>

                    <input
                      type="tel"
                      className="contact-input"
                      placeholder="+91"
                    />
                  </div>

                  <div className="col-md-6 col-12 form-field">
                    <label className="contact-label">
                      PROJECT TYPE
                    </label>

                    <select
                      className="contact-input contact-select"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select one
                      </option>

                      <option>Architecture</option>
                      <option>Interior Design</option>
                      <option>Renovation</option>
                      <option>Landscape</option>
                    </select>
                  </div>

                </div>

                {/* Message */}
                <div className="row">
                  <div className="col-12 form-field">

                    <label className="contact-label">
                      TELL US ABOUT YOUR PROJECT
                    </label>

                    <textarea
                      className="contact-textarea"
                      placeholder="A few details about your project..."
                    />

                  </div>
                </div>

                {/* Button */}
                <button
                  type="submit"
                  className="contact-btn"
                >
                  SEND ENQUIRY
                  <FiArrowUpRight />
                </button>

              </form>

            </div>

            {/* RIGHT - CONTACT INFO */}
            <div className="col-lg-4 col-12">

              <aside className="contact-info-box">

                <h3 className="contact-info-title">
                  VISIT/ WRITE / CALL
                </h3>

                {/* Address */}
                <div className="contact-info-item">

                  <FiMapPin className="contact-info-icon" />

                  <div>
                    <strong>Studio address</strong>

                    <p>
                      Indore, India
                      <br />
                      By appointment only
                    </p>
                  </div>

                </div>

                {/* Phone */}
                <div className="contact-info-item">

                  <FiPhone className="contact-info-icon" />

                  <div>
                    <strong>Call us</strong>

                    <p>
                      <a href="tel:+91 8959220111">
                        +91 8959220111
                      </a>

                      <br />

                      Mon–Sat, 10am–6pm
                    </p>
                  </div>

                </div>

                {/* Email */}
                <div className="contact-info-item">

                  <FiArrowUpRight className="contact-info-icon" />

                  <div>
                    <strong>Write to us</strong>

                    <p>
                      <a href="mailto:gouravkalaarchitects@gmail.com">
                        gouravkalaarchitects@gmail.com
                      </a>
                    </p>
                  </div>

                </div>

                {/* Social */}
                <div className="contact-socials">

                  <a
                    href="https://www.instagram.com/gourav_kala_architects?igsh=MWdicHBxNm1hZ251eA=="
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <FiInstagram />
                    INSTAGRAM
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/gourav_kala_architects-102242344806883/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <FiFacebook />
                    FACEBOOK
                  </a>

                  {/* YouTube */}
                  <a
                    href="https://youtube.com/channel/UCYu1r48kaBtVizLBsBV7IBA"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                  >
                    <FiYoutube />
                    YOUTUBE
                  </a>

                </div>

              </aside>

            </div>

          </div>

        </div>

      </section>
    </>
  );
}

export default ContactUs;