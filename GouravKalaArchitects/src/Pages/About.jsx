import { FiArrowDownRight } from "react-icons/fi";
import CTASection from "../CTASection";
import "../styles/About.css";


function About() {

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
        <div className="container-fluid p-0">
          <div className="row g-0 about-hero-row">



            <div className="col-lg-6 about-hero-left">
              <div className="about-hero-content">

                <p className="about-hero-eyebrow">
                  OUR STUDIO
                </p>

                <h1 className="about-hero-title">
                  Made for the long
                  <br />
                  <em>way around.</em>
                </h1>

                <p className="about-hero-description">
                  We are an independent architecture and interiors practice
                  <br className="d-none d-xl-block" />
                  based in India.
                </p>

              </div>
            </div>


            <div className="col-lg-6 about-hero-right">

              <div className="about-portrait">

                <span className="portrait-number">
                  02
                </span>

                <div className="portrait-circle portrait-circle-top"></div>

                <div className="portrait-diagonal"></div>

                <div className="portrait-shape"></div>

                <div className="portrait-circle portrait-circle-bottom"></div>

                <p className="portrait-label">
                  REPLACE WITH STUDIO
                  <br />
                  PORTRAIT
                </p>

              </div>

            </div>

          </div>
        </div>
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


            <div className="col-md-4">

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

    </>
  );
}

export default About;