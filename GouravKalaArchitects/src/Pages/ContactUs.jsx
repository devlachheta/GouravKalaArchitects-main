
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
import Banner from "../assets/gouravhero.PNG";
import { FaPinterestP } from "react-icons/fa";



function ContactUs() {
  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);
    setFormStatus("");

    const form = event.target;
    const formData = new FormData(form);

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

      <section className="contact-section">
        <div className="container studio">
          <div className="row">
            <div className="col-12 box-studio">

              <aside className="contact-info-box">

                <h3 className="contact-info-title">
                  VISIT / CALL / WRITE / CONNECT
                </h3>

                <div className="contact-info-grid">

                  {/* 1 - Address */}
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


                  {/* 2 - Phone */}
                  <div className="contact-info-item">
                    <FiPhone className="contact-info-icon" />

                    <div>
                      <strong>Call us</strong>
                      <p>
                        <a href="tel:+918959220111">
                          +91 8959220111
                        </a>
                        <br />
                        Mon–Sat, 10am–6pm
                      </p>
                    </div>
                  </div>


                  {/* 3 - Email */}
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


                  {/* 4 - Social */}
                  <div className="contact-info-item">
                    <FiArrowUpRight className="contact-info-icon" />

                    <div>
                      <strong>Connect us</strong>

                      <div className="contact-socials">

                        <a
                          href="YOUR_INSTAGRAM_LINK"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FiInstagram />
                          Instagram

                        </a>

                        <a
                          href="YOUR_FACEBOOK_LINK"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FiFacebook />
                          facebook

                        </a>

                        <a
                          href="YOUR_YOUTUBE_LINK"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FiYoutube />
                          Youtube

                        </a>

                        <a
                          href="YOUR_PINTEREST_LINK"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaPinterestP />
                          Pinterest

                        </a>

                      </div>
                    </div>
                  </div>

                </div>

              </aside>
            </div>
          </div>

        </div>


        <div className="container-fluid contact-box">
          <div className="contact-content">
            <div className="row justify-content">
              <div className="col-lg-10 col-12
              ">
                <div className="contact-heading">
                  <h2 className="contact-title">
                    Begin the conversation.
                  </h2>

                  <p className="contact-subtitle">
                    Whether you have a site, a sketch or only a feeling, we would
                    love to hear where you are beginning.
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="row justify-content-center">

              {/* LEFT - FORM */}
              <div className="col-lg-10 col-12">
                <form
                  className="contact-form"
                  onSubmit={handleSubmit}
                >

                  {/* Name + Email */}
                  <div className="row g-md-4">

                    <div className="col-md-6 col-12 form-field">
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

                    <div className="col-md-6 col-12 form-field">
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

                  {/* Phone + Project */}
                  <div className="row g-md-4">

                    <div className="col-md-6 col-12 form-field">
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

                    <div className="col-md-6 col-12 form-field">
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

                        <option value="Architecture">Architecture</option>
                        <option value="Interior Design">Interior Design</option>
                        <option value="Renovation">Renovation</option>
                        <option value="Landscape">Landscape</option>
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
                        name="message"
                        className="contact-textarea"
                        placeholder="A few details about your project..."
                        required
                      />
                    </div>
                  </div>

                  {/* Button */}
                  <button
                    type="submit"
                    className="contact-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "SENDING..." : "SEND ENQUIRY"}
                    <FiArrowUpRight />
                  </button>

                  {formStatus && (
                    <p className="form-status">
                      {formStatus}
                    </p>
                  )}
                </form>

              </div>

            </div>
          </div>
        </div>

      </section>

    </>
  );
}

export default ContactUs;