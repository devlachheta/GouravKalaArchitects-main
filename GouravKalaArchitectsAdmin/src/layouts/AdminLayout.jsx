import { useState } from "react";

import {
    NavLink,
    Outlet,
    useNavigate,
    useLocation,
} from "react-router-dom";

import {
    LayoutDashboard,
    FolderKanban,
    Building2,
    Sofa,
    House,
    Info,
    Clapperboard,
    CalendarOff,
    CalendarPlus,
    User,
    LogOut,
    Menu,
    Bell,
    ChevronDown,
} from "lucide-react";

import api from "../services/api";


function AdminLayout() {

    const navigate = useNavigate();
    const location = useLocation();

    const [sidebarOpen, setSidebarOpen] = useState(true);


    // =====================================================
    // LOGOUT
    // =====================================================

    const handleLogout = async () => {

        const refreshToken = localStorage.getItem(
            "refresh_token"
        );

        try {

            if (refreshToken) {

                await api.post(
                    "auth/logout/",
                    {
                        refresh: refreshToken,
                    }
                );

            }

        } catch (error) {

            console.error(
                "Logout failed on server:",
                error
            );

        } finally {

            // -----------------------------------------
            // Clear frontend authentication
            // -----------------------------------------

            localStorage.removeItem(
                "access_token"
            );

            localStorage.removeItem(
                "refresh_token"
            );


            // -----------------------------------------
            // Go to login
            // -----------------------------------------

            navigate("/login");

        }
    };

    return (

        <div
            className={`admin-layout ${sidebarOpen ? "sidebar-open" : "sidebar-closed"
                }`}
        >


            {/* ================= SIDEBAR ================= */}

            <aside className="admin-sidebar">


                {/* Logo */}

                <div className="sidebar-brand">

                    <h1>GKA</h1>

                    <span>
                        ADMIN CMS
                    </span>

                </div>


                {/* Navigation */}

                <nav className="sidebar-nav">


                    {/* Dashboard */}

                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active" : ""}`
                        }
                    >

                        <LayoutDashboard size={20} />

                        <span>
                            Dashboard
                        </span>

                    </NavLink>


                    {/* ================= CONTENT ================= */}

                    <div className="sidebar-section">

                        <div className="sidebar-section-title">
                            CONTENT
                        </div>


                        {/* Home */}

                        <NavLink
                            to="/home"
                            className={({ isActive }) =>
                                `sidebar-link ${isActive ? "active" : ""}`
                            }
                        >

                            <House size={20} />

                            <span>
                                Home
                            </span>

                        </NavLink>


                        {/* About */}

                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                `sidebar-link ${isActive ? "active" : ""}`
                            }
                        >

                            <Info size={20} />

                            <span>
                                About
                            </span>

                        </NavLink>

                    </div>


                    {/* ================= PROJECTS ================= */}

                    <div className="sidebar-section">

                        <div className="sidebar-section-title">
                            PROJECTS
                        </div>


                        {/* All Projects */}

                        <NavLink
                            to="/projects"
                            end
                            className={({ isActive }) =>
                                `sidebar-link ${isActive && !location.search
                                    ? "active"
                                    : ""
                                }`
                            }
                        >

                            <FolderKanban size={20} />

                            <span>
                                All Projects
                            </span>

                        </NavLink>


                        {/* Architecture */}

                        <NavLink
                            to="/projects?type=architecture"
                            className={() =>
                                `sidebar-link ${location.pathname === "/projects" &&
                                    new URLSearchParams(
                                        location.search
                                    ).get("type") === "architecture"
                                    ? "active"
                                    : ""
                                }`
                            }
                        >

                            <Building2 size={20} />

                            <span>
                                Architecture
                            </span>

                        </NavLink>


                        {/* Interior */}

                        <NavLink
                            to="/projects?type=interior"
                            className={() =>
                                `sidebar-link ${location.pathname === "/projects" &&
                                    new URLSearchParams(
                                        location.search
                                    ).get("type") === "interior"
                                    ? "active"
                                    : ""
                                }`
                            }
                        >

                            <Sofa size={20} />

                            <span>
                                Interior
                            </span>

                        </NavLink>

                    </div>




                    {/* ================= CONSULTATIONS ================= */}

                    <div className="sidebar-section">

                        <div className="sidebar-section-title">
                            CONSULTATIONS
                        </div>

                        <NavLink
                            to="/blocked-slots"
                            className={({ isActive }) =>
                                `sidebar-link ${isActive ? "active" : ""}`
                            }
                        >
                            <CalendarOff size={20} />

                            <span>
                                Blocked Slots
                            </span>
                        </NavLink>
                        <NavLink
                            to="/book-consultation"
                            className={({ isActive }) =>
                                `sidebar-link ${isActive ? "active" : ""}`
                            }
                        >
                            <CalendarPlus size={20} />

                            <span>
                                Book Consultation
                            </span>
                        </NavLink>




                    </div>

                    {/* ================= OTHER ================= */}

                    <div className="sidebar-section sidebar-secondary">


                        <NavLink
                            to="/reels"
                            className={({ isActive }) =>
                                `sidebar-link ${isActive ? "active" : ""}`
                            }
                        >
                            <Clapperboard size={20} />

                            <span>
                                Reels
                            </span>
                        </NavLink>


                        {/* Profile */}

                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                `sidebar-link ${isActive ? "active" : ""}`
                            }
                        >

                            <User size={20} />

                            <span>
                                Profile
                            </span>

                        </NavLink>

                    </div>

                </nav>


                {/* ================= LOGOUT ================= */}

                <div className="sidebar-bottom">

                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >

                        <LogOut size={20} />

                        <span>
                            Logout
                        </span>

                    </button>

                </div>

            </aside>


            {/* ================= MAIN ================= */}

            <main className="admin-main">


                {/* ================= HEADER ================= */}

                <header className="admin-header">


                    {/* HEADER LEFT */}

                    <div className="header-left">


                        {/* MENU BUTTON */}

                        <button
                            className="menu-button"
                            onClick={() =>
                                setSidebarOpen(!sidebarOpen)
                            }
                            aria-label={
                                sidebarOpen
                                    ? "Close sidebar"
                                    : "Open sidebar"
                            }
                        >

                            <Menu size={21} />

                        </button>


                        <span className="header-title">
                            Gourav Kala Architects
                        </span>

                    </div>


                    {/* ================= HEADER RIGHT ================= */}

                    <div className="header-right">


                        {/* Notifications */}

                        <button className="notification-button">

                            <Bell size={21} />

                            <span className="notification-badge">
                                3
                            </span>

                        </button>


                        {/* Admin Profile */}

                        <div className="admin-profile">


                            <div className="profile-avatar">
                                A
                            </div>


                            <div className="profile-details">

                                <strong>
                                    Administrator
                                </strong>

                                <span>
                                    Admin
                                </span>

                            </div>


                            <ChevronDown size={17} />

                        </div>

                    </div>

                </header>


                {/* ================= PAGE CONTENT ================= */}

                <div className="admin-content">

                    <Outlet />

                </div>


                {/* ================= FOOTER ================= */}

                <footer className="admin-footer">

                    <span>
                        © 2026 Gourav Kala Architects. All rights reserved.
                    </span>

                    <span>
                        developed by dev and sagar
                    </span>

                </footer>

            </main>

        </div>

    );

}


export default AdminLayout;





