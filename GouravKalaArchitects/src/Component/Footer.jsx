import React from "react";
import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiInstagram,
  FiFacebook,
  FiYoutube,


} from "react-icons/fi";
import { FaPinterestP } from "react-icons/fa";
import "../styles/Footer.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">

        {/* Footer Top */}
        <div className="row footerTop">

          {/* Logo Section */}
          <div className="col-lg-5 col-md-6 col-12 footerBrand">
            <Link to="/" className="footerLogo">
              Gourav Kala Architects
            </Link>

            <p>
              Spaces with a lasting
              <br />
              point of view.
            </p>
          </div>

          {/* Explore */}
          <div className="col-lg-2 col-md-6 col-6 footerColumn">
            <p className="footerLabel">Explore</p>

            <Link to="/about">Our studio</Link>
            <Link to="/services">What we do</Link>
            <Link to="/projects">Selected work</Link>
          </div>

          {/* Contact */}
          <div className="col-lg-3 col-md-6 col-6 footerColumn">
            <p className="footerLabel">Contact</p>
            <a href="mailto:gouravkalaarchitects@gmail.com">
              gouravkalaarchitects@gmail.com
            </a>

            <a href="tel:+918959220111">
              +91 8959220111
            </a>

            <p>Indore, India</p>
          </div>

          {/* Follow */}
          <div className="col-lg-2 col-md-6 col-12 footerColumn">
            <p className="footerLabel">Connect</p>

            <div className="socials">

              {/* Instagram */}
              <a
                href="https://www.instagram.com/gourav_kala_architects?igsh=MWdicHBxNm1hZ251eA=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FiInstagram />
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/gourav_kala_architects-102242344806883/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FiFacebook />
              </a>
              {/* Pinterest */}
              <a
                href="https://pin.it/YTYrPpZw"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
              >
                <FaPinterestP />
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com/channel/UCYu1r48kaBtVizLBsBV7IBA"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <FiYoutube />
              </a>


            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="footerBottom">
          <span>
            Gourav Kala Architects
          </span>

          <span>
            Designed with intention <FiArrowUpRight />
          </span>
        </div>

      </div>
    </footer>
  );
}

export default Footer;