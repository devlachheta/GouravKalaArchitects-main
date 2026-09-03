import { useEffect, useState } from "react";

import {
    Plus,
    Search,
    Eye,
    Pencil,
    Trash2,
    FolderKanban,
} from "lucide-react";

import api from "../services/api";


function Projects() {

    const [projects, setProjects] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [filterType, setFilterType] = useState("all");


    // ================= FETCH PROJECTS =================

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


    useEffect(() => {

        fetchProjects();

    }, []);


    // ================= FILTER PROJECTS =================

    const filteredProjects = projects.filter((project) => {

        const matchesSearch =
            project.title
                ?.toLowerCase()
                .includes(search.toLowerCase()) ||

            project.location
                ?.toLowerCase()
                .includes(search.toLowerCase());


        const matchesType =
            filterType === "all" ||
            project.type === filterType;


        return matchesSearch && matchesType;

    });


    // ================= DELETE PROJECT =================

    const handleDelete = async (project) => {

        const confirmed = window.confirm(
            `Are you sure you want to delete "${project.title}"?`
        );

        if (!confirmed) {
            return;
        }


        try {

            await api.delete(`projects/${project.id}/`);

            setProjects((currentProjects) =>
                currentProjects.filter(
                    (item) => item.id !== project.id
                )
            );

        } catch (error) {

            console.error("Failed to delete project:", error);

            alert(
                "Unable to delete project. Please make sure you are logged in."
            );

        }

    };


    // ================= LOADING =================

    if (loading) {

        return (

            <div className="projects-page">

                <div className="page-heading">

                    <div>

                        <h1>Projects</h1>

                        <p>
                            Manage all your architecture and interior projects.
                        </p>

                    </div>

                </div>

                <div className="projects-loading">

                    Loading projects...

                </div>

            </div>

        );

    }


    // ================= ERROR =================

    if (error) {

        return (

            <div className="projects-page">

                <div className="page-heading">

                    <div>

                        <h1>Projects</h1>

                        <p>{error}</p>

                    </div>

                </div>

            </div>

        );

    }


    return (

        <div className="projects-page">


            {/* ================= PAGE HEADER ================= */}

            <div className="page-heading">

                <div>

                    <h1>Projects</h1>

                    <p>
                        Manage all your architecture and interior projects.
                    </p>

                </div>


                <button
                    className="add-project-button"
                    onClick={() => {
                        window.location.href = "/projects/add";
                    }}
                >

                    <Plus size={18} />

                    Add Project

                </button>

            </div>


            {/* ================= TOOLBAR ================= */}

            <div className="projects-toolbar">


                {/* SEARCH */}

                <div className="project-search">

                    <Search size={18} />

                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={search}
                        onChange={(event) => {
                            setSearch(event.target.value);
                        }}
                    />

                </div>


                {/* FILTER */}

                <div className="project-filter">

                    <button
                        className={
                            filterType === "all"
                                ? "active"
                                : ""
                        }
                        onClick={() => {
                            setFilterType("all");
                        }}
                    >
                        All
                    </button>


                    <button
                        className={
                            filterType === "architecture"
                                ? "active"
                                : ""
                        }
                        onClick={() => {
                            setFilterType("architecture");
                        }}
                    >
                        Architecture
                    </button>


                    <button
                        className={
                            filterType === "interior"
                                ? "active"
                                : ""
                        }
                        onClick={() => {
                            setFilterType("interior");
                        }}
                    >
                        Interior
                    </button>

                </div>


            </div>


            {/* ================= PROJECT TABLE ================= */}

            <div className="projects-card">


                <div className="projects-table">


                    {/* TABLE HEADER */}

                    <div className="project-table-header">

                        <span>PROJECT</span>

                        <span>TYPE</span>

                        <span>LOCATION</span>

                        <span>YEAR</span>

                        <span>STATUS</span>

                        <span>ACTIONS</span>

                    </div>


                    {/* TABLE ROWS */}

                    {filteredProjects.length === 0 ? (

                        <div className="projects-empty">

                            <FolderKanban size={32} />

                            <h3>
                                No projects found
                            </h3>

                            <p>
                                Try changing your search or filter.
                            </p>

                        </div>

                    ) : (

                        filteredProjects.map((project) => (

                            <div
                                className="project-table-row"
                                key={project.id}
                            >


                                {/* PROJECT */}

                                <div className="project-table-name">

                                    <div className="project-table-icon">

                                        <FolderKanban size={18} />

                                    </div>

                                    <div>

                                        <strong>
                                            {project.title}
                                        </strong>

                                        <small>
                                            {project.slug}
                                        </small>

                                    </div>

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
                                        className={`status status-${project.status}`}
                                    >

                                        {project.status === "completed"
                                            ? "Completed"
                                            : project.status === "ongoing"
                                                ? "Ongoing"
                                                : "Upcoming"}

                                    </span>

                                </span>


                                {/* ACTIONS */}

                                <div className="project-table-actions">


                                    {/* VIEW */}

                                    <button
                                        title="View project"
                                        onClick={() => {
                                            window.location.href =
                                                `/projects/${project.id}`;
                                        }}
                                    >

                                        <Eye size={17} />

                                    </button>


                                    {/* EDIT */}

                                    <button
                                        title="Edit project"
                                        onClick={() => {
                                            window.location.href =
                                                `/projects/edit/${project.id}`;
                                        }}
                                    >

                                        <Pencil size={17} />

                                    </button>


                                    {/* DELETE */}

                                    <button
                                        className="delete-action"
                                        title="Delete project"
                                        onClick={() => {
                                            handleDelete(project);
                                        }}
                                    >

                                        <Trash2 size={17} />

                                    </button>


                                </div>


                            </div>

                        ))

                    )}


                </div>


                {/* ================= FOOTER ================= */}

                <div className="projects-footer">

                    Showing{" "}

                    <strong>
                        {filteredProjects.length}
                    </strong>

                    {" "}of{" "}

                    <strong>
                        {projects.length}
                    </strong>

                    {" "}projects

                </div>


            </div>


        </div>

    );

}


export default Projects;