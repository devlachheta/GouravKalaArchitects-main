import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/Header.css";

function Header() {
    const [scrolled, setScrolled] = useState("top");
    const [socialOpen, setSocialOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const navRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                menuOpen &&
                navRef.current &&
                !navRef.current.contains(e.target)
            ) {
                setMenuOpen(false);
                setSocialOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

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
                        className={`navbar-toggler ${menuOpen ? "menu-open" : ""}`}
                        type="button"
                        onClick={() => {
                            setMenuOpen((prev) => !prev);
                            setSocialOpen(false);
                        }}
                        aria-controls="mainNavbar"
                        aria-expanded={menuOpen}
                        aria-label="Toggle navigation"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <div
                        className={`navbar-collapse ${menuOpen ? "show" : ""}`}
                        id="mainNavbar"
                    >
                        <ul className="navbar-nav ms-auto align-items-lg-center">

                            <li className="nav-item">
                                <NavLink
                                    end
                                    to="/"
                                    onClick={() => {
                                        setMenuOpen(false);
                                        setSocialOpen(false);
                                    }}
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? "active" : ""}`
                                    }
                                >
                                    HOME
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    end
                                    to="/about"
                                    onClick={() => {
                                        setMenuOpen(false);
                                        setSocialOpen(false);
                                    }}
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? "active" : ""}`
                                    }
                                >
                                    ABOUT
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    end
                                    to="/projects"
                                    onClick={() => {
                                        setMenuOpen(false);
                                        setSocialOpen(false);
                                    }}
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? "active" : ""}`
                                    }
                                >
                                    PROJECTS
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    end
                                    to="/services"
                                    onClick={() => {
                                        setMenuOpen(false);
                                        setSocialOpen(false);
                                    }}
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? "active" : ""}`
                                    }
                                >
                                    SERVICES
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    end
                                    to="/contact"
                                    onClick={() => {
                                        setMenuOpen(false);
                                        setSocialOpen(false);
                                    }}
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
                                    className={`nav-link socials-toggle ${socialOpen ? "socials-open" : ""
                                        }`}
                                    onClick={(e) => {
                                        e.preventDefault();

                                        if (window.innerWidth <= 991) {
                                            setSocialOpen((prev) => !prev);
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
                                            onClick={() => {
                                                setSocialOpen(false);
                                                setMenuOpen(false);
                                            }}
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
                                            onClick={() => {
                                                setSocialOpen(false);
                                                setMenuOpen(false);
                                            }}
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
                                            onClick={() => {
                                                setSocialOpen(false);
                                                setMenuOpen(false);
                                            }}
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
                                            onClick={() => {
                                                setSocialOpen(false);
                                                setMenuOpen(false);
                                            }}
                                        >
                                            Pinterest
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item consultation-nav-item">
                                <NavLink
                                    to="/book-consultation"
                                    onClick={() => {
                                        setMenuOpen(false);
                                        setSocialOpen(false);
                                    }}
                                    className="consultation-nav-button"
                                >
                                    <span>PLAN A CALL</span>
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