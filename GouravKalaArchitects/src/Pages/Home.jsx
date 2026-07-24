

import { Link } from "react-router-dom";
import Footer from "../Component/Footer";
import Banner from "../assets/gouravhero.PNG";
import { motion } from "framer-motion";
import HomeProjectCard from "../Component/HomeProjectCard";
import "../styles/home.css";
import Residential from "../assets/residential1.jpg";
import Interior from "../assets/interior.png";

import CTASection from "../CTASection";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { FiCheck, FiArrowDownRight } from "react-icons/fi";
function CountUp({ end, duration = 1800, suffix = "", pad = 0 }) {
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
      if (!startTime) startTime = currentTime;

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

    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, end, duration]);

  return (
    <strong ref={ref}>
      {String(count).padStart(pad, "0")}
      {suffix}
    </strong>
  );
}
function Home() {
  const [showFloatingButtons, setShowFloatingButtons] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setShowFloatingButtons(true);
      } else {
        setShowFloatingButtons(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const text = "About Us";
  const servicesText = "Our Services";
  const contactText = "Contact Us";
  const letterDelay = 0.08;
  const letterDuration = 0.5;

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: letterDelay,
      },
    },
  };

  const letter = {
    hidden: {
      opacity: 0,
      y: -40,
      scale: 1.1,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: letterDuration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const aboutLines = [
    "Gourav Kala Architects is an architecture and interior design studio dedicated to creating meaningful spaces through simplicity, innovation, and attention to detail.Every project is carefully crafted to balance aesthetics, functionality, and sustainability, ensuring that each space feels unique to its owner."
  ];

  const projectTitle = "Our Projects";

  const projectContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const projectLetter = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <>

      <section className="hero">

        <div className="hero-left">
          <div className="hero-content">

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

              <span className="hero-second-line">
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
            <motion.div
              variants={itemVariants}
              whileHover={{ x: 6 }}
            >
              <Link to="/projects" className="explore-btn">
                Explore Our Work
                <span>↗</span>
              </Link>
            </motion.div>
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
      <section className="home-about-us">
        <motion.div
          className="heading-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h1
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {text.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={letter}
                style={{
                  display: "inline-block",
                  whiteSpace: char === " " ? "pre" : "normal",
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div
            className="heading-line"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{
              delay:
                (text.replace(/\s/g, "").length - 1) * letterDelay +
                letterDuration,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <i>We design spaces that inspire everyday living.</i>
          </motion.span>

          <div className="about-description">
            {aboutLines.map((line, index) => (
              <motion.p
                key={index}
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? -80 : 80,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {line}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link className="link" to="/about">
              View More →
            </Link>
          </motion.div>
        </motion.div>
      </section >

      <section className="stats-section">
        <div className="container">
          <div className="row stat-row">

            <div className="col-12 col-md-4">
              <div className="stat-item">
                <CountUp end={12} suffix="+" />

                <span>
                  Years of Thoughtful <br />
                  Design
                </span>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="stat-item">
                <CountUp end={68} />

                <span>
                  Projects Shaped <br />
                  With Care
                </span>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="stat-item">
                <CountUp end={6} pad={2} />

                <span>
                  Cities Across <br />
                  India
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>
      <section className="home-projects">
        <motion.div
          className="heading-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h1
            variants={projectContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projectTitle.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={projectLetter}
                style={{
                  display: "inline-block",
                  whiteSpace: char === " " ? "pre" : "normal",
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div
            className="home-project-line"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.8,
              duration: 0.5,
            }}
          />
        </motion.div>

        <div className="home-project-grid">
          <HomeProjectCard
            image={Residential}
            title="Architecture"
            link="/projects"
          />

          <HomeProjectCard
            image={Interior}
            title="Interior"
            link="/projects"
          />


        </div>
      </section>
      <section className="home-services">

        <motion.div
          className="heading-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >

          <motion.h1
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {servicesText.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={letter}
                style={{
                  display: "inline-block",
                  whiteSpace: char === " " ? "pre" : "normal",
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div
            className="heading-line"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{
              delay:
                (servicesText.replace(/\s/g, "").length - 1) *
                letterDelay +
                letterDuration,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          />

        </motion.div>

      </section>
      <section className="principle-section">

        <div className="principle-shell">

          <div className="principle-grid">

            {/* LEFT SIDE - IMAGE PLACEHOLDER */}
            <div className="principle-image">
              <img src={Banner} alt="Gourav Kala Architects service" />


            </div>

            {/* RIGHT SIDE - CONTENT */}
            <div className="principle-content">

              <div className="section-title">
                <p className="eyebrow">
                  03 — Our principle
                </p>

                <h2>
                  Design that feels
                  <br />
                  <em>inevitable.</em>
                </h2>

                <p>
                  Nothing superfluous. Nothing unresolved. We balance human
                  warmth with architectural rigour to create spaces that feel
                  quietly remarkable.
                </p>
              </div>


              {/* TICK LIST */}
              <ul className="tick-list">
                <li>
                  <FiCheck />
                  Context-first thinking
                </li>

                <li>
                  <FiCheck />
                  Materials with integrity
                </li>

                <li>
                  <FiCheck />
                  A clear, collaborative process
                </li>
              </ul>


              {/* BUTTON */}
              <Link className="text-button" to="/services">
                How we work
                <FiArrowDownRight />
              </Link>

            </div>

          </div>

        </div>
      </section>
      <section className="home-contact">

        <motion.div
          className="heading-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >

          <motion.h1
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {contactText.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={letter}
                style={{
                  display: "inline-block",
                  whiteSpace: char === " " ? "pre" : "normal",
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div
            className="heading-line"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{
              delay:
                (contactText.replace(/\s/g, "").length - 1) *
                letterDelay +
                letterDuration,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          />

        </motion.div>

      </section>
      <CTASection />
    </>
  );
}
export default Home;