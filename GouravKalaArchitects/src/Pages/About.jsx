import { FiArrowDownRight } from "react-icons/fi";
import CTASection from "../CTASection";

import "../styles/About.css";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";
import Banner from "../assets/gouravhero.PNG";
import "../styles/ContactUs.css";
import { useEffect, useRef, useState } from "react";
import VisionImg from "../assets/About-vision.jpeg";
function CountUp({ end, duration = 1800, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      {
        threshold: 0.4,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime = null;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) {
        startTime = currentTime;
      }

      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      const currentCount = Math.floor(progress * end);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [hasStarted, end, duration]);

  return (
    <strong ref={ref}>
      {count}
      {suffix}
    </strong>
  );
}
function About() {


  const heroTitle = "Made for the long";
  const heroTitle2 = "way around.";

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

  const timeline = [
    {
      year: "2014",
      heading: "The practice begins",
      text: "A small studio and a belief in considered design.",
    },
    {
      year: "2017",
      heading: "First hospitality project",
      text: "Our work begins to move beyond residential interiors.",
    },
    {
      year: "2021",
      heading: "A growing collective",
      text: "Architecture, interiors and landscape become one conversation.",
    },
    {
      year: "Today",
      heading: "Still listening closely",
      text: "Working throughout India on spaces with enduring meaning.",
    },
  ];

  const team = [
    {
      name: "Gourav Kala",
      role: "Principal architect",
    },
    {
      name: "Aanya Mehra",
      role: "Design lead",
    },
    {
      name: "Kunal Shah",
      role: "Studio architect",
    },
  ];


  return (
    <>

      <section className="about-hero">

        <div className="about-hero-left">
          <div className="about-hero-content">

            <motion.span
              className="about-hero-sub-title"
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
            >
              OUR STUDIO
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

              <span className="about-hero-second-line">
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
              We are an independent architecture and interiors practice <br />
              based in India.
            </motion.p>


          </div>
        </div>

        <motion.div
          className="about-hero-right"
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
      <section className="about-story">

        <div className="container">

          <div className="row g-5 align-items-start">

            <div className="col-lg-6">

              <p className="about-eyebrow">
                Our story
              </p>

              <h2 className="about-heading">

                Curious by nature.

                <br />

                <em>
                  Exact by practice.
                </em>

              </h2>

            </div>



            <div className="col-lg-6">

              <div className="about-story-content">

                <p>
                  Gourav Kala Architects was founded with a simple
                  conviction: the spaces we choose shape the quality
                  of our days. Our work is a study in restraint,
                  light and human connection.
                </p>

                <p>
                  From homes and hospitality spaces to workplaces
                  and landscapes, we design with a commitment to
                  clarity and a quiet respect for place.
                </p>


                <a
                  href="#timeline"
                  className="about-link"
                >
                  Our journey

                  <FiArrowDownRight />
                </a>

              </div>

            </div>

          </div>

        </div>

      </section>
      {/* SOCIAL STATS SECTION */}
      <section className="about-social-stats">
        <div className="container">

          <div className="row about-social-stats-row">

            {/* INSTAGRAM */}
            <div className="col-12 col-md-4">
              <div className="about-social-stat-item">

                <a
                  href="https://www.instagram.com/gourav_kala_architects?igsh=MWdicHBxNm1hZ251eA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-social-icon-link"
                  aria-label="Visit our Instagram"
                >
                  <FaInstagram className="about-social-icon" />
                </a>

                <CountUp
                  end={100}
                  suffix="K+"
                  duration={1800}
                />

                <div className="about-social-label">
                  <span className="about-social-type">
                    Instagram <br />
                    Community
                  </span>
                </div>

              </div>
            </div>


            {/* FACEBOOK */}
            <div className="col-12 col-md-4">
              <div className="about-social-stat-item">

                <a
                  href="https://www.facebook.com/gourav_kala_architects-102242344806883/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-social-icon-link"
                  aria-label="Visit our Facebook"
                >
                  <FaFacebookF className="about-social-icon" />
                </a>

                <CountUp
                  end={95}
                  suffix="K+"
                  duration={1800}
                />

                <div className="about-social-label">
                  <span className="about-social-type">
                    Facebook <br />
                    Community
                  </span>
                </div>

              </div>
            </div>


            {/* YOUTUBE */}
            <div className="col-12 col-md-4">
              <div className="about-social-stat-item">

                <a
                  href="https://youtube.com/channel/UCYu1r48kaBtVizLBsBV7IBA"

                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-social-icon-link"
                  aria-label="Visit our YouTube"
                >
                  <FaYoutube className="about-social-icon" />
                </a>

                <CountUp
                  end={65}
                  suffix="K+"
                  duration={1800}
                />

                <div className="about-social-label">
                  <span className="about-social-type">
                    YouTube <br />
                    Subscribers
                  </span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      <section className="about-values">

        <div className="container">

          <div className="row g-0">

            <div className="col-md-4">

              <article className="value-card">

                <span>
                  01
                </span>

                <h3>
                  Our mission
                </h3>

                <p>
                  To make places that improve how people feel,
                  work and belong.
                </p>

              </article>

            </div>


            {/* <div className="col-md-4">

              <article className="value-card">

                <span>
                  02
                </span>

                <h3>
                  Our vision
                </h3>

                <p>
                  To leave behind an architecture of calm,
                  character and lasting relevance.
                </p>

              </article>

            </div> */}
            <div className="col-md-4">
              <motion.article
                className="value-card vision-card"
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                <motion.span
                  variants={{
                    rest: { y: 0 },
                    hover: { y: -3 },
                  }}
                >
                  02
                </motion.span>

                <h3>Our vision</h3>

                <div className="vision-content-area">

                  {/* NORMAL DESCRIPTION */}
                  <motion.p
                    className="vision-description"
                    variants={{
                      rest: {
                        opacity: 1,
                        y: 0,
                      },
                      hover: {
                        opacity: 0,
                        y: 10,
                      },
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    To leave behind an architecture of calm,
                    character and lasting relevance.
                  </motion.p>

                  {/* HOVER IMAGE */}
                  <motion.div
                    className="vision-hover-image"
                    variants={{
                      rest: {
                        opacity: 0,
                        y: 20,
                        scale: 1.04,
                      },
                      hover: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      },
                    }}
                    transition={{
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <img
                      src={VisionImg}
                      alt="Our architectural vision"
                    />
                  </motion.div>

                </div>
              </motion.article>
            </div>
            <div className="col-md-4">

              <article className="value-card">

                <span>
                  03
                </span>

                <h3>
                  Our values
                </h3>

                <p>
                  Curiosity, care, honesty and a deep respect
                  for craft guide each decision.
                </p>

              </article>

            </div>

          </div>

        </div>

      </section>

      <section
        id="timeline"
        className="about-timeline"
      >

        <div className="container">



          <div className="row">

            <div className="col-lg-7">

              <p className="about-eyebrow">
                A timeline
              </p>

              <h2 className="about-heading">

                Growing one project

                <br />

                <em>
                  at a time.
                </em>

              </h2>

            </div>

          </div>


          <div className="timeline-list">

            {timeline.map((item) => (

              <div
                className="timeline-item row"
                key={item.year}
              >

                <div className="col-md-3">

                  <span className="timeline-year">
                    {item.year}
                  </span>

                </div>


                <div className="col-md-9">

                  <h3>
                    {item.heading}
                  </h3>

                  <p>
                    {item.text}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      <section className="about-team">

        <div className="container">


          <div className="row mb-5">

            <div className="col-lg-8">

              <p className="about-eyebrow">
                The people
              </p>

              <h2 className="about-heading">

                A small team with a

                <br />

                <em>
                  wide field of view.
                </em>

              </h2>

            </div>

          </div>

          <div className="row g-4">

            {team.map((member, index) => (

              <div
                className="col-md-4"
                key={member.name}
              >

                <article className="team-card">

                  <div className="team-image">

                    <span>
                      0{index + 1}
                    </span>

                    <p>
                      Team portrait
                    </p>

                  </div>


                  <h3>
                    {member.name}
                  </h3>

                  <p className="team-role">
                    {member.role}
                  </p>

                </article>

              </div>

            ))}

          </div>

        </div>

      </section>
      <CTASection />
    </>
  );
}

export default About;