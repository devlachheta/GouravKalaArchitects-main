import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function ViewProject() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ==========================================
    // FETCH PROJECT
    // ==========================================

    useEffect(() => {

        const fetchProject = async () => {

            try {

                const response = await api.get(
                    `projects/${id}/`
                );

                setProject(response.data);

            } catch (err) {

                console.error(err);

                setError(
                    "Unable to load project details."
                );

            } finally {

                setLoading(false);

            }
        };

        fetchProject();

    }, [id]);


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (
            <div className="view-project-page">

                <div className="view-project-loading">
                    Loading project...
                </div>

            </div>
        );

    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error || !project) {

        return (
            <div className="view-project-page">

                <div className="view-project-error">
                    {error || "Project not found."}
                </div>

                <button
                    className="view-back-btn"
                    onClick={() => navigate("/projects")}
                >
                    ← Back to Projects
                </button>

            </div>
        );

    }


    // ==========================================
    // VIEW PROJECT
    // ==========================================

    return (

        <div className="view-project-page">

            {/* =================================
                TOP HEADER
            ================================= */}

            <div className="view-project-header">

                <button
                    type="button"
                    className="view-back-btn"
                    onClick={() => navigate("/projects")}
                >
                    <span className="back-arrow">←</span>
                    <span>Back to Projects</span>
                </button>


                <button
                    type="button"
                    className="view-edit-btn"
                    onClick={() =>
                        navigate(`/projects/edit/${project.id}`)
                    }
                >
                    <span className="edit-icon">✎</span>
                    <span>Edit Project</span>
                </button>

            </div>


            {/* =================================
                PROJECT TITLE
            ================================= */}

            <div className="view-project-title-section">

                <div>

                    <h1>
                        {project.title}
                    </h1>

                    <div className="view-project-meta">

                        <span>
                            {project.type}
                        </span>

                        <span>
                            •
                        </span>

                        <span>
                            {project.status}
                        </span>

                    </div>

                </div>

            </div>


            {/* =================================
                BANNER IMAGE
            ================================= */}

            {project.banner_image && (

                <div className="view-banner-section">

                    <img
                        src={project.banner_image}
                        alt={project.title}
                        style={{
                            objectPosition:
                                project.banner_position || "center"
                        }}
                    />

                </div>

            )}


            {/* =================================
                PROJECT INFORMATION
            ================================= */}

            <div className="view-section">

                <div className="view-section-header">

                    <h2>
                        Project Information
                    </h2>

                    <p>
                        Basic information about this project.
                    </p>

                </div>


                <div className="project-info-grid">


                    <div className="project-info-item">

                        <span>
                            Location
                        </span>

                        <strong>
                            {project.location || "—"}
                        </strong>

                    </div>


                    <div className="project-info-item">

                        <span>
                            Year
                        </span>

                        <strong>
                            {project.year || "—"}
                        </strong>

                    </div>


                    <div className="project-info-item">

                        <span>
                            Type
                        </span>

                        <strong>
                            {project.type || "—"}
                        </strong>

                    </div>


                    <div className="project-info-item">

                        <span>
                            Status
                        </span>

                        <strong>
                            {project.status || "—"}
                        </strong>

                    </div>


                    <div className="project-info-item">

                        <span>
                            Plot Area
                        </span>

                        <strong>
                            {project.plot_area || "—"}
                        </strong>

                    </div>


                    <div className="project-info-item">

                        <span>
                            Built-up Area
                        </span>

                        <strong>
                            {project.built_up_area || "—"}
                        </strong>

                    </div>


                    <div className="project-info-item">

                        <span>
                            Carpet Area
                        </span>

                        <strong>
                            {project.carpet_area || "—"}
                        </strong>

                    </div>


                    <div className="project-info-item">

                        <span>
                            Slug
                        </span>

                        <strong>
                            {project.slug || "—"}
                        </strong>

                    </div>

                </div>

            </div>


            {/* =================================
                DESCRIPTION
            ================================= */}

            {project.description && (

                <div className="view-section">

                    <div className="view-section-header">

                        <h2>
                            Description
                        </h2>

                    </div>

                    <div className="project-description">

                        {project.description}

                    </div>

                </div>

            )}


            {/* =================================
                CARD IMAGE
            ================================= */}

            {project.card_image && (

                <div className="view-section">

                    <div className="view-section-header">

                        <h2>
                            Card Image
                        </h2>

                        <p>
                            Image used for project cards.
                        </p>

                    </div>

                    <div className="view-card-image">

                        <img
                            src={project.card_image}
                            alt={`${project.title} card`}
                            style={{
                                objectPosition:
                                    project.card_image_position ||
                                    "center"
                            }}
                        />

                    </div>

                </div>

            )}


            {/* =================================
                PROJECT GALLERY
            ================================= */}

            <div className="view-section">

                <div className="view-section-header">

                    <h2>
                        Project Gallery
                    </h2>

                    <p>
                        {project.gallery?.length || 0} images
                    </p>

                </div>


                {project.gallery?.length > 0 ? (

                    <div className="view-gallery-grid">

                        {project.gallery.map((image, index) => (

                            <div
                                className="view-gallery-card"
                                key={image.id}
                            >

                                <div className="view-gallery-image">

                                    <img
                                        src={image.image}
                                        alt={`${project.title} ${index + 1}`}
                                        style={{
                                            objectPosition:
                                                image.position ||
                                                "center center"
                                        }}
                                    />

                                </div>


                                <div className="view-gallery-info">

                                    <strong>
                                        Image {index + 1}
                                    </strong>

                                    <span>
                                        Display Order:{" "}
                                        {image.display_order}
                                    </span>

                                    <span>
                                        Position:{" "}
                                        {image.position || "center center"}
                                    </span>

                                </div>

                            </div>

                        ))}

                    </div>

                ) : (

                    <div className="view-no-gallery">

                        No gallery images available.

                    </div>

                )}

            </div>


            {/* =================================
                YOUTUBE
            ================================= */}

            {project.youtube_url && (

                <div className="view-section">

                    <div className="view-section-header">

                        <h2>
                            Project Video
                        </h2>

                    </div>


                    <a
                        href={project.youtube_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="youtube-project-link"
                    >
                        ▶ Watch Project Video
                    </a>

                </div>

            )}

        </div>
    );
}

export default ViewProject;