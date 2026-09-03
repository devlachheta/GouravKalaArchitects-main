import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditProject() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        type: "architecture",
        location: "",
        plot_area: "",
        built_up_area: "",
        carpet_area: "",
        year: "",
        status: "completed",
        description: "",
        youtube_url: "",
        banner_position: "center",
        card_image_position: "center",
    });

    const [project, setProject] = useState(null);

    useEffect(() => {
        fetchProject();
    }, [id]);

    const fetchProject = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(`projects/${id}/`);

            const data = response.data;

            setProject(data);

            setFormData({
                title: data.title || "",
                type: data.type || "architecture",
                location: data.location || "",
                plot_area: data.plot_area || "",
                built_up_area: data.built_up_area || "",
                carpet_area: data.carpet_area || "",
                year: data.year || "",
                status: data.status || "completed",
                description: data.description || "",
                youtube_url: data.youtube_url || "",
                banner_position: data.banner_position || "center",
                card_image_position:
                    data.card_image_position || "center",
            });
        } catch (error) {
            console.error(error);
            setError("Unable to load project.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    if (loading) {
        return (
            <div className="admin-page">
                <div className="page-header">
                    <div>
                        <h1>Edit Project</h1>
                        <p>Loading project...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="admin-page">
                <div className="page-header">
                    <div>
                        <h1>Edit Project</h1>
                        <p>{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page">

            {/* PAGE HEADER */}
            <div className="page-header">
                <div>
                    <h1>Edit Project</h1>
                    <p>
                        Update details for{" "}
                        <strong>{project?.title}</strong>
                    </p>
                </div>

                <button
                    type="button"
                    className="secondary-btn"
                    onClick={() => navigate("/projects")}
                >
                    ← Back to Projects
                </button>
            </div>


            {/* BASIC INFORMATION */}
            <div className="form-section">

                <div className="section-header">
                    <h2>Basic Information</h2>
                    <p>Update the main project information.</p>
                </div>

                <div className="form-grid">

                    <div className="form-group">
                        <label>Project Title</label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter project title"
                        />
                    </div>


                    <div className="form-group">
                        <label>Project Type</label>

                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                        >
                            <option value="architecture">
                                Architecture
                            </option>

                            <option value="interior">
                                Interior
                            </option>
                        </select>
                    </div>


                    <div className="form-group">
                        <label>Location</label>

                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Enter project location"
                        />
                    </div>


                    <div className="form-group">
                        <label>Year</label>

                        <input
                            type="number"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            placeholder="2026"
                        />
                    </div>


                    <div className="form-group">
                        <label>Status</label>

                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="completed">
                                Completed
                            </option>

                            <option value="ongoing">
                                Ongoing
                            </option>

                            <option value="upcoming">
                                Upcoming
                            </option>
                        </select>
                    </div>

                </div>
            </div>


            {/* AREA INFORMATION */}
            <div className="form-section">

                <div className="section-header">
                    <h2>Area Information</h2>
                    <p>Update the project area details.</p>
                </div>

                <div className="form-grid">

                    <div className="form-group">
                        <label>Plot Area</label>

                        <input
                            type="text"
                            name="plot_area"
                            value={formData.plot_area}
                            onChange={handleChange}
                            placeholder="e.g. 2400 sq.ft"
                        />
                    </div>


                    <div className="form-group">
                        <label>Built-up Area</label>

                        <input
                            type="text"
                            name="built_up_area"
                            value={formData.built_up_area}
                            onChange={handleChange}
                            placeholder="e.g. 1800 sq.ft"
                        />
                    </div>


                    <div className="form-group">
                        <label>Carpet Area</label>

                        <input
                            type="text"
                            name="carpet_area"
                            value={formData.carpet_area}
                            onChange={handleChange}
                            placeholder="e.g. 1500 sq.ft"
                        />
                    </div>

                </div>
            </div>


            {/* DESCRIPTION */}
            <div className="form-section">

                <div className="section-header">
                    <h2>Description</h2>
                    <p>Update the project description.</p>
                </div>

                <div className="form-group">

                    <label>Project Description</label>

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="8"
                        placeholder="Write project description..."
                    />

                </div>

            </div>


            {/* VIDEO */}
            <div className="form-section">

                <div className="section-header">
                    <h2>Video</h2>
                    <p>Add or update the YouTube video.</p>
                </div>

                <div className="form-group">

                    <label>YouTube URL</label>

                    <input
                        type="url"
                        name="youtube_url"
                        value={formData.youtube_url}
                        onChange={handleChange}
                        placeholder="https://www.youtube.com/watch?v=..."
                    />

                </div>

            </div>


            {/* PROJECT IMAGES */}
            <div className="form-section">

                <div className="section-header">
                    <h2>Project Images</h2>
                    <p>Current project images.</p>
                </div>


                <div className="image-preview-grid">

                    {/* BANNER */}
                    <div className="image-preview-card">

                        <h3>Banner Image</h3>

                        {project?.banner_image ? (
                            <img
                                src={project.banner_image}
                                alt="Project banner"
                            />
                        ) : (
                            <div className="no-image">
                                No banner image
                            </div>
                        )}

                        <div className="form-group">
                            <label>Banner Position</label>

                            <input
                                type="text"
                                name="banner_position"
                                value={formData.banner_position}
                                onChange={handleChange}
                                placeholder="center"
                            />
                        </div>

                    </div>


                    {/* CARD */}
                    <div className="image-preview-card">

                        <h3>Card Image</h3>

                        {project?.card_image ? (
                            <img
                                src={project.card_image}
                                alt="Project card"
                            />
                        ) : (
                            <div className="no-image">
                                No card image
                            </div>
                        )}

                        <div className="form-group">
                            <label>Card Image Position</label>

                            <input
                                type="text"
                                name="card_image_position"
                                value={formData.card_image_position}
                                onChange={handleChange}
                                placeholder="center"
                            />
                        </div>

                    </div>

                </div>

            </div>


            {/* GALLERY */}
            <div className="form-section">

                <div className="section-header">
                    <h2>Project Gallery</h2>
                    <p>Existing gallery images.</p>
                </div>


                {project?.gallery?.length > 0 ? (

                    <div className="gallery-grid">

                        {project.gallery.map((image) => (

                            <div
                                className="gallery-preview-card"
                                key={image.id}
                            >

                                <img
                                    src={image.image}
                                    alt={`Gallery ${image.display_order}`}
                                />

                                <div className="gallery-info">

                                    <strong>
                                        Image {image.display_order}
                                    </strong>

                                    <span>
                                        Position: {image.position}
                                    </span>

                                </div>

                            </div>

                        ))}

                    </div>

                ) : (

                    <div className="no-gallery">
                        No gallery images found.
                    </div>

                )}

            </div>


            {/* ACTIONS */}
            <div className="form-actions">

                <button
                    type="button"
                    className="secondary-btn"
                    onClick={() => navigate("/projects")}
                >
                    Cancel
                </button>

                <button
                    type="button"
                    className="primary-btn"
                    disabled={saving}
                >
                    {saving ? "Saving..." : "Save Changes"}
                </button>

            </div>

        </div>
    );
}

export default EditProject;