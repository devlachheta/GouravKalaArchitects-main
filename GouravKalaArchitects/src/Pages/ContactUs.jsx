import "../styles/ContactUs.css";
import { useState } from "react";

import {
  FiArrowUpRight,
  FiInstagram,
  FiFacebook,
  FiMapPin,
  FiPhone,
  FiYoutube,
} from "react-icons/fi";

import { motion } from "framer-motion";
import { FaPinterestP } from "react-icons/fa";

import Header from "../Component/Header";


function ContactUs() {

  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);


  // =========================================================
  // CONTACT FORM SUBMISSION
  // =========================================================

  const handleSubmit = async (event) => {

    event.preventDefault();

    setIsSubmitting(true);
    setFormStatus("");

    const form = event.target;
    const formData = new FormData(form);


    // =========================================================
    // GET FORM VALUES
    // =========================================================

    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const phone = formData.get("phone").trim();
    const projectType = formData.get("projectType");
    const message = formData.get("message").trim();

    const errors = [];


    // =========================================================
    // VALIDATION
    // =========================================================

    if (!/^[A-Za-z\s]{3,50}$/.test(name)) {

      errors.push(
        "• Please enter a valid full name."
      );

    }


    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

      errors.push(
        "• Please enter a valid email address."
      );

    }


    if (!/^(\+91|91)?[6-9]\d{9}$/.test(phone)) {

      errors.push(
        "• Please enter a valid mobile number."
      );

    }


    if (!projectType) {

      errors.push(
        "• Please select a project type."
      );

    }


    // =========================================================
    // SHOW VALIDATION ERRORS
    // =========================================================

    if (errors.length > 0) {

      setFormStatus(
        errors.join("\n")
      );

      setIsSubmitting(false);

      return;
    }


    // =========================================================
    // SEND FORM DATA TO DJANGO
    // =========================================================

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/api/contact/",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({

            name: name,

            email: email,

            phone: phone,

            projectType: projectType,

            message: message,

          }),
        }
      );


      // =======================================================
      // READ DJANGO RESPONSE
      // =======================================================

      const data = await response.json();


      // =======================================================
      // SUCCESS
      // =======================================================

      if (response.ok) {

        setFormStatus(
          "Thank you! Your enquiry has been sent successfully."
        );

        form.reset();

      }


      // =======================================================
      // BACKEND ERROR
      // =======================================================

      else {

        setFormStatus(
          data.detail ||
          "Something went wrong. Please try again."
        );

      }

    }


    // =========================================================
    // NETWORK / SERVER ERROR
    // =========================================================

    catch (error) {

      console.error(
        "Contact form error:",
        error
      );

      setFormStatus(
        "Unable to send your enquiry right now. Please try again."
      );

    }


    // =========================================================
    // FINISH SUBMISSION
    // =========================================================

    finally {

      setIsSubmitting(false);

    }

  };


  // =========================================================
  // HERO ANIMATION
  // =========================================================

  const heroTitle = "Lets make room";
  const heroTitle2 = "for possibility.";


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


  // =========================================================
  // JSX
  // =========================================================

  return (

    <>

      <Header />


      <section className="contact-section">

        <div className="container">

          <div className="contact-card">

            <div className="row">


              {/* =================================================
                  CONTACT HEADING
              ================================================= */}

              <div className="col-lg-8">

                <div className="contact-heading">

                  <h2 className="contact-title">

                    Let’s Design

                  </h2>


                  <p className="contact-subtitle">

                    Tell us about your project, and we’ll schedule
                    an initial consultation to understand your
                    requirements.

                  </p>

                </div>

              </div>


              {/* =================================================
                  CONTACT FORM
              ================================================= */}

              <div className="row">

                <div className="col-lg-12 col-12">

                  <form
                    className="contact-form"
                    onSubmit={handleSubmit}
                    noValidate
                  >

                    <div className="row">


                      {/* =========================================
                          FULL NAME
                      ========================================= */}

                      <div className="col-md-6">

                        <div className="form-field">

                          <label className="contact-label">

                            FULL NAME

                          </label>


                          <input
                            type="text"
                            name="name"
                            className="contact-input"
                            placeholder="Your name"
                            required
                          />

                        </div>

                      </div>


                      {/* =========================================
                          EMAIL
                      ========================================= */}

                      <div className="col-md-6">

                        <div className="form-field">

                          <label className="contact-label">

                            EMAIL ADDRESS

                          </label>


                          <input
                            type="email"
                            name="email"
                            className="contact-input"
                            placeholder="you@email.com"
                            required
                          />

                        </div>

                      </div>


                      {/* =========================================
                          PHONE
                      ========================================= */}

                      <div className="col-md-6">

                        <div className="form-field">

                          <label className="contact-label">

                            PHONE

                          </label>


                          <input
                            type="tel"
                            name="phone"
                            className="contact-input"
                            placeholder="+91"
                            required
                          />

                        </div>

                      </div>


                      {/* =========================================
                          PROJECT TYPE
                      ========================================= */}

                      <div className="col-md-6">

                        <div className="form-field">

                          <label className="contact-label">

                            PROJECT TYPE

                          </label>


                          <select
                            name="projectType"
                            className="contact-input contact-select"
                            defaultValue=""
                            required
                          >

                            <option
                              value=""
                              disabled
                            >
                              Select one
                            </option>


                            <option value="Architecture">

                              Architecture

                            </option>


                            <option value="Interior Design">

                              Interior Design

                            </option>


                            <option value="Renovation">

                              Renovation

                            </option>


                            <option value="Landscape">

                              Landscape

                            </option>

                          </select>

                        </div>

                      </div>


                      {/* =========================================
                          MESSAGE
                      ========================================= */}

                      <div className="col-12">

                        <div className="form-field">

                          <label className="contact-label">

                            TELL US ABOUT YOUR PROJECT

                          </label>


                          <textarea
                            name="message"
                            className="contact-textarea"
                            placeholder="A few details about your project..."
                            rows="6"
                          />

                        </div>

                      </div>


                    </div>


                    {/* =========================================
                        SUBMIT BUTTON
                    ========================================= */}

                    <div className="contact-button-wrapper">

                      <button
                        type="submit"
                        className="contact-btn"
                        disabled={isSubmitting}
                      >

                        {isSubmitting
                          ? "SENDING..."
                          : "SEND ENQUIRY"
                        }


                        <FiArrowUpRight />

                      </button>

                    </div>


                    {/* =========================================
                        FORM STATUS
                    ========================================= */}

                    {formStatus && (

                      <p
                        className="form-status"
                        style={{
                          whiteSpace: "pre-line"
                        }}
                      >

                        {formStatus}

                      </p>

                    )}


                  </form>

                </div>

              </div>


            </div>

          </div>

        </div>

      </section>

    </>

  );

}


export default ContactUs;