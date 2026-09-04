import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/Header.css";

function Header() {
    const [scrolled, setScrolled] = useState("top");
    const [socialOpen, setSocialOpen] = useState(false);

    const navRef = useRef(null);
    const togglerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            const menu = document.getElementById("mainNavbar");

            if (
                menu &&
                menu.classList.contains("show") &&
                navRef.current &&
                !navRef.current.contains(e.target)
            ) {
                togglerRef.current.click();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const halfScreen = window.innerHeight / 2;

            if (scrollY <= 50) {
                setScrolled("top");
            } else if (scrollY > 50 && scrollY < halfScreen) {
                setScrolled("hidden");
            } else {
                setScrolled("visible");
            }
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <header className="header">
            <nav
                ref={navRef}
                className={`navbar navbar-expand-lg ${scrolled === "visible"
                    ? "navbar-visible"
                    : scrolled === "hidden"
                        ? "navbar-hidden"
                        : "navbar-transparent"
                    }`}
            >
                <div className="container-fluid">

                    <Link className="navbar-brand" to="/">
                        GOURAV KALA ARCHITECTS
                    </Link>

                    <button
                        ref={togglerRef}
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
                                    end
                                    to="/"
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
                                        `nav-link ${isActive ? "active" : ""}`
                                    }
                                >
                                    CONTACT
                                </NavLink>
                            </li>

                            <li
                                className="nav-item dropdown"
                                onMouseEnter={() => window.innerWidth > 991 && setSocialOpen(true)}
                                onMouseLeave={() => window.innerWidth > 991 && setSocialOpen(false)}
                            >
                                <a
                                    href="#"
                                    className="nav-link socials-toggle"
                                    onClick={(e) => {
                                        e.preventDefault();

                                        if (window.innerWidth <= 991) {
                                            setSocialOpen(!socialOpen);
                                        }
                                    }}
                                >
                                    SOCIALS
                                </a>

                                <ul className={`dropdown-menu  ${socialOpen ? "show" : ""}`}>
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

                                    <li>
                                        <a
                                            className="dropdown-item"
                                            href="https://www.facebook.com/profile.php?id=100064194397652"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Facebook
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            className="dropdown-item"
                                            href="https://www.youtube.com/@gouravkalaarchitects"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            YouTube
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            className="dropdown-item"
                                            href="https://in.pinterest.com/gourav_kala_architects/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Pinterest
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item consultation-nav-item">
                                <NavLink
                                    to="/book-consultation"
                                    className="consultation-nav-button"
                                >
                                    <span>BOOK A CONSULTATION</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>
        </header>
    );
}

export default Header;