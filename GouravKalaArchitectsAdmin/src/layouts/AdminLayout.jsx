import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    FolderKanban,
    Building2,
    Sofa,
    House,
    Info,
    Settings,
    User,
    LogOut,
    Menu,
    Bell,
    ChevronDown,
} from "lucide-react";

function AdminLayout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        navigate("/login");
    };

    return (
        <div className="admin-layout">

            {/* ================= SIDEBAR ================= */}

            <aside className="admin-sidebar">

                {/* Logo */}

                <div className="sidebar-brand">
                    <h1>GKA</h1>
                    <span>ADMIN CMS</span>
                </div>


                {/* Navigation */}

                <nav className="sidebar-nav">

                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active" : ""}`
                        }
                    >
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </NavLink>
                    {/* ================= CONTENT ================= */}

                    <div className="sidebar-section">

                        <div className="sidebar-section-title">
                            CONTENT
                        </div>

                        <NavLink
                            to="/home"
                            className={({ isActive }) =>
                                `sidebar-link ${isActive ? "active" : ""}`
                            }
                        >
                            <House size={20} />
                            <span>Home</span>
                        </NavLink>

                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                `sidebar-link ${isActive ? "active" : ""}`
                            }
                        >
                            <Info size={20} />
                            <span>About</span>
                        </NavLink>

                    </div>

                    {/* Projects */}

                    <div className="sidebar-section">

                        <div className="sidebar-section-title">
                            PROJECTS
                        </div>


                        <NavLink
                            to="/projects"
                            end
                            className={({ isActive }) =>
                                `sidebar-link ${isActive ? "active" : ""}`
                            }
                        >
                            <FolderKanban size={20} />
                            <span>All Projects</span>
                        </NavLink>


                        <NavLink
                            to="/projects/architecture"
                            className={({ isActive }) =>
                                `sidebar-link ${isActive ? "active" : ""}`
                            }
                        >
                            <Building2 size={20} />
                            <span>Architecture</span>
                        </NavLink>


                        <NavLink
                            to="/projects/interior"
                            className={({ isActive }) =>
                                `sidebar-link ${isActive ? "active" : ""}`
                            }
                        >
                            <Sofa size={20} />
                            <span>Interior</span>
                        </NavLink>

                    </div>


                    {/* Other */}

                    <div className="sidebar-section sidebar-secondary">

                        <NavLink
                            to="/settings"
                            className={({ isActive }) =>
                                `sidebar-link ${isActive ? "active" : ""}`
                            }
                        >
                            <Settings size={20} />
                            <span>Settings</span>
                        </NavLink>


                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                `sidebar-link ${isActive ? "active" : ""}`
                            }
                        >
                            <User size={20} />
                            <span>Profile</span>
                        </NavLink>

                    </div>

                </nav>


                {/* Logout */}

                <div className="sidebar-bottom">

                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>

                </div>

            </aside>


            {/* ================= MAIN ================= */}

            <main className="admin-main">

                {/* Header */}

                <header className="admin-header">

                    <div className="header-left">

                        <button className="menu-button">
                            <Menu size={21} />
                        </button>

                        <span className="header-title">
                            Gourav Kala Architects
                        </span>

                    </div>


                    <div className="header-right">

                        <button className="notification-button">

                            <Bell size={21} />

                            <span className="notification-badge">
                                3
                            </span>

                        </button>


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


                {/* Page */}

                <div className="admin-content">
                    <Outlet />
                </div>


                {/* Footer */}

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