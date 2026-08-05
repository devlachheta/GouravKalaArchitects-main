
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);
    setFormStatus("");

    const form = event.target;
    const formData = new FormData(form);

    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const phone = formData.get("phone").trim();
    const projectType = formData.get("projectType");
    const errors = [];


    if (!/^[A-Za-z\s]{3,50}$/.test(name)) {
      errors.push("• Please enter a valid full name.");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push("• Please enter a valid email address.");
    }

    if (!/^(\+91|91)?[6-9]\d{9}$/.test(phone)) {
      errors.push("• Please enter a valid mobile number.");
    }

    if (!projectType) {
      errors.push("• Please select a project type.");
    }

    if (errors.length > 0) {
      setFormStatus(errors.join("\n"));
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await fetch("https://formspree.io/f/mkodvokg", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setFormStatus("Thank you! Your enquiry has been sent successfully.");
        form.reset();
      } else {
        setFormStatus("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormStatus("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
  return (
    <>
      <Header />


      <section className="contact-section">

        <div className="container">

          <div className="contact-card">
            <div className="row ">

              <div className="col-lg-8">

                <div className="contact-heading ">
                  <h2 className="contact-title">
                    Let’s Design
                  </h2>

                  <p className="contact-subtitle">
                    Tell us about your project, and we’ll schedule an initial consultation to understand your requirements.
                  </p>
                </div>

              </div>


              <div className="row ">

                <div className="col-lg-12 col-12">

                  <form
                    className="contact-form"
                    onSubmit={handleSubmit}
                    noValidate
                  >

                    <div className="row">

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
                          />

                        </div>

                      </div>

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
                            <option value="" disabled>
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

                    <div className="contact-button-wrapper">

                      <button
                        type="submit"
                        className="contact-btn"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "SENDING..." : "SEND ENQUIRY"}

                        <FiArrowUpRight />
                      </button>

                    </div>

                    {formStatus && (

                      <p
                        className="form-status"
                        style={{ whiteSpace: "pre-line" }}
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
