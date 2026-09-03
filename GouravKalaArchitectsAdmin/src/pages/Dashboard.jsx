import { useEffect, useState } from "react";

import {
    FolderKanban,
    Building2,
    Sofa,
    CheckCircle2,
    Plus,
    Image,
    ArrowRight,
    Eye,
    Pencil,
} from "lucide-react";

import api from "../services/api";


function Dashboard() {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ================= GET PROJECTS =================

    useEffect(() => {

        const fetchProjects = async () => {

            try {

                setLoading(true);
                setError("");

                const response = await api.get("projects/");

                setProjects(response.data);

            } catch (error) {

                console.error("Failed to fetch projects:", error);

                setError(
                    "Unable to load projects. Please check the backend server."
                );

            } finally {

                setLoading(false);

            }
        };


        fetchProjects();

    }, []);


    // ================= STATISTICS =================

    const totalProjects = projects.length;

    const architectureProjects = projects.filter(
        (project) => project.type === "architecture"
    ).length;

    const interiorProjects = projects.filter(
        (project) => project.type === "interior"
    ).length;

    const completedProjects = projects.filter(
        (project) => project.status === "completed"
    ).length;


    // ================= RECENT PROJECTS =================

    const recentProjects = [...projects]
        .sort(
            (a, b) =>
                new Date(b.created_at) - new Date(a.created_at)
        )
        .slice(0, 5);


    // ================= TYPE PERCENTAGE =================

    const architecturePercentage =
        totalProjects > 0
            ? ((architectureProjects / totalProjects) * 100).toFixed(1)
            : "0.0";

    const interiorPercentage =
        totalProjects > 0
            ? ((interiorProjects / totalProjects) * 100).toFixed(1)
            : "0.0";


    // ================= STATUS LABEL =================

    const getStatusLabel = (status) => {

        const statusLabels = {
            completed: "Completed",
            ongoing: "Ongoing",
            upcoming: "Upcoming",
        };

        return statusLabels[status] || status;

    };


    // ================= STATUS CLASS =================

    const getStatusClass = (status) => {

        const statusClasses = {
            completed: "status-completed",
            ongoing: "status-ongoing",
            upcoming: "status-upcoming",
        };

        return statusClasses[status] || "";

    };


    // ================= LOADING =================

    if (loading) {

        return (
            <div className="dashboard">

                <div className="dashboard-heading">

                    <div>

                        <h1>Dashboard</h1>

                        <p>
                            Loading your projects...
                        </p>

                    </div>

                </div>

            </div>
        );

    }


    // ================= ERROR =================

    if (error) {

        return (
            <div className="dashboard">

                <div className="dashboard-heading">

                    <div>

                        <h1>Dashboard</h1>

                        <p>{error}</p>

                    </div>

                </div>

            </div>
        );

    }


    return (

        <div className="dashboard">


            {/* ================= TITLE ================= */}

            <div className="dashboard-heading">

                <div>

                    <h1>Dashboard</h1>

                    <p>
                        Welcome back! Here's what's happening with your projects.
                    </p>

                </div>

            </div>


            {/* ================= STATISTICS ================= */}

            <div className="stats-grid">


                {/* TOTAL PROJECTS */}

                <div className="stat-card">

                    <div className="stat-content">

                        <span className="stat-label">
                            TOTAL PROJECTS
                        </span>

                        <strong>
                            {totalProjects}
                        </strong>

                        <small>
                            All time
                        </small>

                    </div>

                    <div className="stat-icon stat-icon-gold">

                        <FolderKanban size={25} />

                    </div>

                </div>


                {/* ARCHITECTURE */}

                <div className="stat-card">

                    <div className="stat-content">

                        <span className="stat-label">
                            ARCHITECTURE
                        </span>

                        <strong>
                            {architectureProjects}
                        </strong>

                        <small>
                            Projects
                        </small>

                    </div>

                    <div className="stat-icon stat-icon-blue">

                        <Building2 size={25} />

                    </div>

                </div>


                {/* INTERIOR */}

                <div className="stat-card">

                    <div className="stat-content">

                        <span className="stat-label">
                            INTERIOR
                        </span>

                        <strong>
                            {interiorProjects}
                        </strong>

                        <small>
                            Projects
                        </small>

                    </div>

                    <div className="stat-icon stat-icon-green">

                        <Sofa size={25} />

                    </div>

                </div>


                {/* COMPLETED */}

                <div className="stat-card">

                    <div className="stat-content">

                        <span className="stat-label">
                            COMPLETED
                        </span>

                        <strong>
                            {completedProjects}
                        </strong>

                        <small>
                            Projects
                        </small>

                    </div>

                    <div className="stat-icon stat-icon-purple">

                        <CheckCircle2 size={25} />

                    </div>

                </div>


            </div>


            {/* ================= DASHBOARD GRID ================= */}

            <div className="dashboard-grid">


                {/* ================= RECENT PROJECTS ================= */}

                <section className="dashboard-card recent-projects">


                    <div className="card-header">

                        <h2>
                            Recent Projects
                        </h2>

                        <button
                            className="view-all-button"
                            onClick={() => {
                                window.location.href = "/projects";
                            }}
                        >

                            View all

                            <ArrowRight size={17} />

                        </button>

                    </div>


                    <div className="projects-table">


                        <div className="table-header">

                            <span>PROJECT</span>
                            <span>TYPE</span>
                            <span>LOCATION</span>
                            <span>YEAR</span>
                            <span>STATUS</span>
                            <span>ACTIONS</span>

                        </div>


                        {recentProjects.length === 0 ? (

                            <div className="project-row">

                                <span>
                                    No projects found.
                                </span>

                            </div>

                        ) : (

                            recentProjects.map((project) => (

                                <div
                                    className="project-row"
                                    key={project.id}
                                >


                                    {/* PROJECT */}

                                    <div className="project-name">

                                        <div className="project-placeholder">

                                            <FolderKanban size={18} />

                                        </div>

                                        <span>
                                            {project.title}
                                        </span>

                                    </div>


                                    {/* TYPE */}

                                    <span>
                                        {project.type === "architecture"
                                            ? "Architecture"
                                            : "Interior"}
                                    </span>


                                    {/* LOCATION */}

                                    <span>
                                        {project.location || "—"}
                                    </span>


                                    {/* YEAR */}

                                    <span>
                                        {project.year || "—"}
                                    </span>


                                    {/* STATUS */}

                                    <span>

                                        <span
                                            className={`status ${getStatusClass(
                                                project.status
                                            )}`}
                                        >

                                            {getStatusLabel(
                                                project.status
                                            )}

                                        </span>

                                    </span>


                                    {/* ACTIONS */}

                                    <div className="project-actions">

                                        <button
                                            title="View project"
                                            onClick={() => {
                                                window.location.href =
                                                    `/projects/${project.id}`;
                                            }}
                                        >

                                            <Eye size={17} />

                                        </button>


                                        <button
                                            title="Edit project"
                                            onClick={() => {
                                                window.location.href =
                                                    `/projects/edit/${project.id}`;
                                            }}
                                        >

                                            <Pencil size={17} />

                                        </button>

                                    </div>


                                </div>

                            ))

                        )}


                    </div>

                </section>


                {/* ================= RIGHT COLUMN ================= */}

                <div className="dashboard-right">


                    {/* ================= PROJECT TYPE ================= */}

                    <section className="dashboard-card project-type-card">


                        <div className="card-header">

                            <h2>
                                Projects by Type
                            </h2>

                        </div>


                        <div className="chart-area">


                            <div
                                className="donut-chart"
                                style={{
                                    background: `conic-gradient(
                                        #3b82f6 0% ${architecturePercentage}%,
                                        #65b96b ${architecturePercentage}% 100%
                                    )`,
                                }}
                            >

                                <div className="donut-inner">

                                    <strong>
                                        {totalProjects}
                                    </strong>

                                    <span>
                                        Projects
                                    </span>

                                </div>

                            </div>


                            <div className="chart-legend">


                                <div className="legend-item">

                                    <span className="legend-dot architecture-dot" />

                                    <span>
                                        Architecture
                                    </span>

                                    <strong>
                                        {architecturePercentage}%
                                    </strong>

                                </div>


                                <div className="legend-item">

                                    <span className="legend-dot interior-dot" />

                                    <span>
                                        Interior
                                    </span>

                                    <strong>
                                        {interiorPercentage}%
                                    </strong>

                                </div>


                            </div>


                        </div>


                    </section>


                    {/* ================= QUICK ACTIONS ================= */}

                    <section className="dashboard-card quick-actions">


                        <div className="card-header">

                            <h2>
                                Quick Actions
                            </h2>

                        </div>


                        {/* ADD PROJECT */}

                        <button
                            className="quick-action"
                            onClick={() => {
                                window.location.href = "/projects/add";
                            }}
                        >

                            <div className="quick-icon quick-icon-gold">

                                <Plus size={21} />

                            </div>

                            <div>

                                <strong>
                                    Add New Project
                                </strong>

                                <span>
                                    Create a new project
                                </span>

                            </div>

                            <ArrowRight size={18} />

                        </button>


                        {/* MANAGE GALLERY */}

                        <button
                            className="quick-action"
                            onClick={() => {
                                window.location.href = "/projects";
                            }}
                        >

                            <div className="quick-icon quick-icon-blue">

                                <Image size={21} />

                            </div>

                            <div>

                                <strong>
                                    Manage Gallery
                                </strong>

                                <span>
                                    Upload and manage images
                                </span>

                            </div>

                            <ArrowRight size={18} />

                        </button>


                        {/* VIEW ALL */}

                        <button
                            className="quick-action"
                            onClick={() => {
                                window.location.href = "/projects";
                            }}
                        >

                            <div className="quick-icon quick-icon-green">

                                <FolderKanban size={21} />

                            </div>

                            <div>

                                <strong>
                                    View All Projects
                                </strong>

                                <span>
                                    See all your projects
                                </span>

                            </div>

                            <ArrowRight size={18} />

                        </button>


                    </section>


                </div>


            </div>


        </div>

    );

}


export default Dashboard;