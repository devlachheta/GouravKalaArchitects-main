import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiInstagram } from "react-icons/fi";

import "../styles/Header.css";

function Header() {

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {

        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        handleScroll();

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

    }, []);

    return (
        <header className="header ">
            <nav
                className={`navbar navbar-expand-lg ${scrolled ? "navbar-scrolled" : ""
                    }`}
            >
                <div className="container-fluid">
                    <Link className="navbar-brand ps-5" to="/">
                        Gourav Kala Architects
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#mainNavbar"
                        aria-controls="mainNavbar"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                        className="collapse navbar-collapse"
                        id="mainNavbar"
                    >
                        <ul className="navbar-nav ms-auto align-items-lg-center">

                            <li className="nav-item">
                                <NavLink
                                    to="/"
                                    end
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? "active" : ""}`
                                    }
                                >
                                    HOME
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    to="/about"
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? "active" : ""}`
                                    }
                                >
                                    ABOUT
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    to="/projects"
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? "active" : ""}`
                                    }
                                >
                                    PROJECTS
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    to="/services"
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? "active" : ""}`
                                    }
                                >
                                    SERVICES
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    to="/contact"
                                    className={({ isActive }) =>
                                        `nav-link contact-link ${isActive ? "active" : ""}`
                                    }
                                >
                                    CONTACT
                                </NavLink>
                            </li>
                            
                            <li className="nav-item dropdown pe-5">
                                <a
                                    className="nav-link socials-toggle"
                                    href="#"
                                    id="socialDropdown"
                                >
                                    SOCIALS
                                </a>

                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                            <a
                                                className="dropdown-item"
                                                href="https://www.instagram.com/gourav_kala_architects?igsh=MWdicHBxNm1hZ251eA=="
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Instagram
                                            </a>
                                        </li>

                                        <li><a className="dropdown-item" href="https://www.facebook.com/profile.php?id=100064194397652" target="_blank" rel="noopener noreferrer">Facebook</a></li>

                                        <li><a className="dropdown-item" href="https://in.pinterest.com/gourav_kala_architects/?invite_code=5ae9f6f0aa7d454fb8f6ce6f5be61fea&sender=815855426154368256/" target="_blank" rel="noopener noreferrer">Pinterest</a></li>

                                        <li><a className="dropdown-item" href="https://www.youtube.com/@gouravkalaarchitects" target="_blank" rel="noopener noreferrer">Youtube</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;