import CTASection from "../CTASection";
import Header from "../Component/Header";
import { Link } from "react-router-dom";
import Footer from "../Component/Footer";
import Banner from "../assets/gouravhero.PNG";
import { motion } from "framer-motion";
import HomeProjectCard from "../Component/HomeProjectCard";
import "../styles/home.css";
import Residential from "../assets/residential1.jpg";
import Interior from "../assets/interior.png";
import Commerical from "../assets/commercial.jpg";
import Illustration from "../assets/illustration.jpg";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
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
    "Gourav Kala Architects is an architecture and interior",
    "design studio dedicated to creating meaningful spaces",
    "through simplicity, innovation, and attention to detail.",
    "Every project is carefully crafted to balance aesthetics,",
    "functionality, and sustainability, ensuring that each space",
    "feels unique to its owner.",
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
            title="Residential"
            link="/projects"
          />

          <HomeProjectCard
            image={Interior}
            title="Interior"
            link="/projects"
          />

          <HomeProjectCard
            image={Commerical}
            title="Commercial"
            link="/projects"
          />

          <HomeProjectCard
            image={Illustration}
            title="Illustration"
            link="/projects"
          />
        </div>
      </section>
      <section>
        <div>
          <CTASection />
        </div>
      </section>
    </>
  );
}
export default Home;