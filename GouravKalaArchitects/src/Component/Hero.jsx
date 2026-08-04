import { motion } from "framer-motion";
import "../styles/Hero.css";
function Hero({
  eyebrow,
  title,
  secondTitle,
  description,
  image,
  italicSecondTitle = false,
  children,
}) {
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
    <section className="page-hero">
      <motion.div
        className="page-hero-right"
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
        <img src={image} alt={title} />
      </motion.div>

      <div className="page-hero-left">
        <div className="page-hero-content">

          {eyebrow && (
            <motion.span
              className="page-hero-eyebrow"
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
            >
              {eyebrow}
            </motion.span>
          )}

          <motion.h1
            className="page-hero-title"
            variants={heroContainer}
            initial="hidden"
            animate="visible"
          >
            {title.split("").map((char, index) => (
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

            {italicSecondTitle ? (
              <em>
                {secondTitle.split("").map((char, index) => (
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
              </em>
            ) : (
              <span className="page-hero-second-line">
                {secondTitle.split("").map((char, index) => (
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
            )}
          </motion.h1>

          <motion.p
            className="page-hero-description"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            {description}
          </motion.p>

          {children}

        </div>
      </div>
    </section>
  );
}

export default Hero;