
import CTASection from "../CTASection";
import FounderImage from "../assets/founder-image.PNG"
import "../styles/About.css";
import Hero from "../Component/Hero";
import Header from "../Component/Header";
import { getAboutSocialStatistics } from "../services/sanityService";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";
import Banner from "../assets/gH.png";

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
  const [socialStats, setSocialStats] = useState({
    instagramFollowers: 100000,
    facebookFollowers: 98000,
    youtubeSubscribers: 67000,
  });

  useEffect(() => {
    const fetchSocialStats = async () => {
      try {
        const data = await getAboutSocialStatistics();

        if (data) {
          setSocialStats({
            instagramFollowers: data.instagramFollowers ?? 100000,
            facebookFollowers: data.facebookFollowers ?? 98000,
            youtubeSubscribers: data.youtubeSubscribers ?? 67000,
          });
        }
      } catch (error) {
        console.error("Failed to fetch About social statistics:", error);
      }
    };

    fetchSocialStats();
  }, []);

  return (
    <>
      <Header />
      <div className="about-page">
        <Hero
          eyebrow="OUR STUDIO"
          title="Designing Beyond"
          secondTitle="Expectations."
          description="We create architecture and interiors that balance aesthetics, functionality, and the way you live—turning ideas into spaces that stand the test of time."
          image={Banner}
        />
        <section className="about-story">
          <div className="container">



            <div className="row g-0 align-items-start about-story-top">


              <div className="col-xl-6">
                <div className="founder-image-wrapper">
                  <img
                    src={FounderImage}
                    alt="Founders"
                    className="founder-image"
                  />
                </div>
              </div>


              <div className="col-xl-6">

                <div className="about-story-content">
                  <p className="about-eyebrow">
                    Our story
                  </p>

                  <p>
                    At Gourav Kala Architects, we believe great design is about more than creating beautiful spaces—it’s about improving the way people live. Every project begins by understanding our clients, their lifestyle, and their aspirations, allowing us to create homes that are thoughtful, functional, and timeless.
                  </p>

                  <p>
                    From architectural planning and interior design to space planning, construction, and renovations, we offer complete design solutions under one roof. Every drawing, material, and detail is carefully considered to ensure each project is not only visually refined but also practical for everyday living.
                  </p>

                  <p>
                    The firm is led by Founder,
                    <span className="founder"> Ar. Gourav Choudhary</span>,
                    and Co-Founder,
                    <span className="founder"> Architect & Interior Designer Nandani Choudhary</span>,
                    who share a common vision of creating meaningful architecture that balances aesthetics, functionality, and long-term value. Together, they lead every project with a hands-on approach, ensuring each design reflects the client’s personality while maintaining the highest standards of quality and execution. At Gourav Kala Architects, we don’t just design buildings—we create spaces that inspire, enrich lives, and stand the test of time.
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
                      <CountUp
                        end={Math.floor(socialStats.instagramFollowers / 1000)}
                        suffix="K+"
                      />
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
                      <CountUp
                        end={Math.floor(socialStats.facebookFollowers / 1000)}
                        suffix="K+"
                      />
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
                      <CountUp
                        end={Math.floor(socialStats.youtubeSubscribers / 1000)}
                        suffix="K+"
                      />
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
                  With a growing community of over{" "}
                  {socialStats.instagramFollowers.toLocaleString()} followers on Instagram,
                  {` `}
                  {socialStats.facebookFollowers.toLocaleString()} on Facebook, and{" "}
                  {socialStats.youtubeSubscribers.toLocaleString()} YouTube subscribers,
                  we've built a trusted platform where we share architecture, interior design,
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