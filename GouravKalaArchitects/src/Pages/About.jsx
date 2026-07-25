
import CTASection from "../CTASection";

import "../styles/About.css";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";
import Banner from "../assets/gouravhero.PNG";

import { useEffect, useRef, useState } from "react";

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


  const heroTitle = "Designing Beyond";
  const heroTitle2 = "Expectations.";

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
      <div className="about-page">
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
                We create architecture and interiors that balance aesthetics, functionality, and the way you live—turning ideas into spaces that stand the test of time..
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

                  Designed with purpose.

                  <br />

                  <em>
                    Built on trust.
                  </em>

                </h2>

              </div>



              <div className="col-lg-6">

                <div className="about-story-content">

                  <p>
                    At Gourav Kala Architects, we believe great design is about more than creating beautiful spaces—it’s about improving the way people live. Every project begins by understanding our clients, their lifestyle, and their aspirations, allowing us to create homes that are thoughtful, functional, and timeless.
                  </p>

                  <p>
                    From architectural planning and interior design to space planning, construction, and renovations, we offer complete design solutions under one roof. Every drawing, material, and detail is carefully considered to ensure each project is not only visually refined but also practical for everyday living.
                  </p>




                </div>

              </div>

            </div>

          </div>

        </section>

        <section className="about-social">
          <div className="container">

            <div className="about-social-wrapper">


              <div className="about-social-left">

                <a
                  href="https://www.instagram.com/gourav_kala_architects?igsh=MWdicHBxNm1hZ251eA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-card"
                >
                  <FaInstagram className="social-icon" />

                  <div className="social-info">
                    <strong>
                      <CountUp end={100} suffix="K+" />
                    </strong>

                    <span>Instagram Followers</span>
                  </div>
                </a>

                <a
                  href="https://www.facebook.com/gourav_kala_architects-102242344806883/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-card"
                >
                  <FaFacebookF className="social-icon" />

                  <div className="social-info">
                    <strong>
                      <CountUp end={98} suffix="K+" />
                    </strong>

                    <span>Facebook Followers</span>
                  </div>
                </a>

                <a
                  href="https://youtube.com/channel/UCYu1r48kaBtVizLBsBV7IBA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-card"
                >
                  <FaYoutube className="social-icon" />

                  <div className="social-info">
                    <strong>
                      <CountUp end={67} suffix="K+" />
                    </strong>

                    <span>YouTube Subscribers</span>
                  </div>
                </a>

              </div>

              <div className="about-social-right">



                <h2>
                  A Community Beyond Design.
                </h2>

                <p>
                  With a growing community of over 100,000 followers on Instagram,
                  98,000 on Facebook, and 67,000 YouTube subscribers, we've built a
                  trusted platform where we share architecture, interior design,
                  construction insights, and practical guidance.
                </p>

                <p>
                  Every post, video, and project is created to help homeowners make
                  confident decisions before they design, build, or renovate their
                  dream spaces.
                </p>

              </div>

            </div>

          </div>
        </section>
      </div>

      <CTASection />
    </>
  );
}

export default About;