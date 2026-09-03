import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddProject() {
    const navigate = useNavigate();

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

    const [bannerImage, setBannerImage] = useState(null);
    const [cardImage, setCardImage] = useState(null);

    // Gallery images
    const [galleryImages, setGalleryImages] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleBannerImage = (e) => {
        setBannerImage(e.target.files[0] || null);
    };

    const handleCardImage = (e) => {
        setCardImage(e.target.files[0] || null);
    };

    // --------------------------------
    // GALLERY IMAGE HANDLING
    // --------------------------------

    const handleGalleryImages = (e) => {
        const files = Array.from(e.target.files || []);

        const newImages = files.map((file, index) => ({
            file,
            position: "center center",
            display_order: galleryImages.length + index + 1,
        }));

        setGalleryImages((previous) => [
            ...previous,
            ...newImages,
        ]);

        // Allow selecting the same file again later
        e.target.value = "";
    };

    const handleGalleryChange = (index, field, value) => {
        setGalleryImages((previous) =>
            previous.map((image, imageIndex) =>
                imageIndex === index
                    ? {
                        ...image,
                        [field]: value,
                    }
                    : image
            )
        );
    };

    const removeGalleryImage = (index) => {
        setGalleryImages((previous) =>
            previous
                .filter((_, imageIndex) => imageIndex !== index)
                .map((image, imageIndex) => ({
                    ...image,
                    display_order: imageIndex + 1,
                }))
        );
    };

    // --------------------------------
    // SUBMIT
    // --------------------------------

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const token = localStorage.getItem("access_token");

            if (!token) {
                navigate("/login");
                return;
            }

            // --------------------------------
            // CREATE PROJECT
            // --------------------------------

            const data = new FormData();

            data.append("title", formData.title);
            data.append("type", formData.type);
            data.append("location", formData.location);
            data.append("plot_area", formData.plot_area);
            data.append("built_up_area", formData.built_up_area);
            data.append("carpet_area", formData.carpet_area);
            data.append("status", formData.status);
            data.append("description", formData.description);

            data.append(
                "banner_position",
                formData.banner_position
            );

            data.append(
                "card_image_position",
                formData.card_image_position
            );

            if (formData.year) {
                data.append("year", formData.year);
            }

            if (formData.youtube_url) {
                data.append(
                    "youtube_url",
                    formData.youtube_url
                );
            }

            if (bannerImage) {
                data.append(
                    "banner_image",
                    bannerImage
                );
            }

            if (cardImage) {
                data.append(
                    "card_image",
                    cardImage
                );
            }

            const projectResponse = await api.post(
                "projects/",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Get newly created project ID
            const projectId = projectResponse.data.id;

            // --------------------------------
            // UPLOAD GALLERY IMAGES
            // --------------------------------

            for (const galleryImage of galleryImages) {
                const imageData = new FormData();

                imageData.append(
                    "project",
                    projectId
                );

                imageData.append(
                    "image",
                    galleryImage.file
                );

                imageData.append(
                    "position",
                    galleryImage.position
                );

                imageData.append(
                    "display_order",
                    galleryImage.display_order
                );

                await api.post(
                    "project-images/",
                    imageData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            }

            // --------------------------------
            // SUCCESS
            // --------------------------------

            navigate("/projects");

        } catch (err) {
            console.error(err);

            if (err.response?.data) {
                console.error(
                    "Backend error:",
                    err.response.data
                );

                setError(
                    "Unable to create project. Please check the form fields and images."
                );
            } else {
                setError(
                    "Unable to connect to the server. Please try again."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-project-page">

            {/* HEADER */}

            <div className="add-project-header">
                <div>
                    <h1>Add New Project</h1>

                    <p>
                        Create a new architecture or interior project.
                    </p>
                </div>

                <button
                    type="button"
                    className="back-button"
                    onClick={() => navigate("/projects")}
                >
                    ← Back to Projects
                </button>
            </div>

            {/* ERROR */}

            {error && (
                <div className="form-error">
                    {error}
                </div>
            )}

            <form
                className="project-form"
                onSubmit={handleSubmit}
            >

                {/* ============================================
                    BASIC INFORMATION
                ============================================ */}

                <div className="form-section">

                    <div className="form-section-header">

                        <h2>Basic Information</h2>

                        <p>
                            Enter the main information about this project.
                        </p>

                    </div>

                    <div className="form-grid">

                        {/* TITLE */}

                        <div className="form-group full-width">

                            <label>
                                Project Title
                                <span>*</span>
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter project title"
                                required
                            />

                        </div>

                        {/* TYPE */}

                        <div className="form-group">

                            <label>
                                Project Type
                                <span>*</span>
                            </label>

                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                required
                            >
                                <option value="architecture">
                                    Architecture
                                </option>

                                <option value="interior">
                                    Interior
                                </option>
                            </select>

                        </div>

                        {/* LOCATION */}

                        <div className="form-group">

                            <label>Location</label>

                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="e.g. Indore"
                            />

                        </div>

                        {/* YEAR */}

                        <div className="form-group">

                            <label>Year</label>

                            <input
                                type="number"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                placeholder="e.g. 2026"
                            />

                        </div>

                        {/* STATUS */}

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

                {/* ============================================
                    AREA INFORMATION
                ============================================ */}

                <div className="form-section">

                    <div className="form-section-header">

                        <h2>Area Information</h2>

                        <p>
                            Add the relevant area measurements.
                        </p>

                    </div>

                    <div className="form-grid">

                        <div className="form-group">

                            <label>Plot Area</label>

                            <input
                                type="text"
                                name="plot_area"
                                value={formData.plot_area}
                                onChange={handleChange}
                                placeholder="e.g. 2000 sq ft"
                            />

                        </div>

                        <div className="form-group">

                            <label>Built-Up Area</label>

                            <input
                                type="text"
                                name="built_up_area"
                                value={formData.built_up_area}
                                onChange={handleChange}
                                placeholder="e.g. 3000 sq ft"
                            />

                        </div>

                        <div className="form-group">

                            <label>Carpet Area</label>

                            <input
                                type="text"
                                name="carpet_area"
                                value={formData.carpet_area}
                                onChange={handleChange}
                                placeholder="e.g. 2500 sq ft"
                            />

                        </div>

                    </div>

                </div>

                {/* ============================================
                    DESCRIPTION
                ============================================ */}

                <div className="form-section">

                    <div className="form-section-header">

                        <h2>Project Description</h2>

                        <p>
                            Describe the project and its important details.
                        </p>

                    </div>

                    <div className="form-group">

                        <label>Description</label>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="6"
                            placeholder="Write project description..."
                        />

                    </div>

                </div>

                {/* ============================================
                    PROJECT IMAGES
                ============================================ */}

                <div className="form-section">

                    <div className="form-section-header">

                        <h2>Project Images</h2>

                        <p>
                            Upload the banner, card and gallery images.
                        </p>

                    </div>

                    <div className="form-grid">

                        {/* BANNER */}

                        <div className="form-group">

                            <label>Banner Image</label>

                            <div className="file-upload">

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleBannerImage}
                                />

                                {bannerImage && (
                                    <p className="selected-file">
                                        ✓ {bannerImage.name}
                                    </p>
                                )}

                            </div>

                        </div>

                        {/* CARD */}

                        <div className="form-group">

                            <label>Card Image</label>

                            <div className="file-upload">

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleCardImage}
                                />

                                {cardImage && (
                                    <p className="selected-file">
                                        ✓ {cardImage.name}
                                    </p>
                                )}

                            </div>

                        </div>

                        {/* BANNER POSITION */}

                        <div className="form-group">

                            <label>Banner Image Position</label>

                            <input
                                type="text"
                                name="banner_position"
                                value={formData.banner_position}
                                onChange={handleChange}
                                placeholder="center"
                            />

                        </div>

                        {/* CARD POSITION */}

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

                {/* ============================================
                    GALLERY
                ============================================ */}

                <div className="form-section">

                    <div className="form-section-header">

                        <h2>Project Gallery</h2>

                        <p>
                            Upload multiple images for this project.
                        </p>

                    </div>

                    {/* MULTIPLE FILE SELECT */}

                    <div className="form-group">

                        <label>Gallery Images</label>

                        <div className="file-upload">

                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleGalleryImages}
                            />

                            <p className="file-help">
                                You can select multiple images at once.
                            </p>

                        </div>

                    </div>

                    {/* SELECTED GALLERY IMAGES */}

                    {galleryImages.length > 0 && (

                        <div className="gallery-upload-list">

                            {galleryImages.map(
                                (galleryImage, index) => (

                                    <div
                                        className="gallery-upload-item"
                                        key={`${galleryImage.file.name}-${index}`}
                                    >

                                        <div className="gallery-file-info">

                                            <strong>
                                                {index + 1}.
                                            </strong>

                                            <span>
                                                {galleryImage.file.name}
                                            </span>

                                        </div>

                                        <div className="gallery-fields">

                                            {/* POSITION */}

                                            <div className="form-group">

                                                <label>
                                                    Image Position
                                                </label>

                                                <input
                                                    type="text"
                                                    value={
                                                        galleryImage.position
                                                    }
                                                    onChange={(e) =>
                                                        handleGalleryChange(
                                                            index,
                                                            "position",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="center center"
                                                />

                                            </div>

                                            {/* ORDER */}

                                            <div className="form-group">

                                                <label>
                                                    Display Order
                                                </label>

                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={
                                                        galleryImage.display_order
                                                    }
                                                    onChange={(e) =>
                                                        handleGalleryChange(
                                                            index,
                                                            "display_order",
                                                            Number(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                />

                                            </div>

                                            {/* REMOVE */}

                                            <button
                                                type="button"
                                                className="remove-gallery-button"
                                                onClick={() =>
                                                    removeGalleryImage(index)
                                                }
                                            >
                                                Remove
                                            </button>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </div>

                {/* ============================================
                    YOUTUBE
                ============================================ */}

                <div className="form-section">

                    <div className="form-section-header">

                        <h2>Video</h2>

                        <p>
                            Add a YouTube video if the project has one.
                        </p>

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

                {/* ============================================
                    FORM ACTIONS
                ============================================ */}

                <div className="form-actions">

                    <button
                        type="button"
                        className="cancel-button"
                        onClick={() => navigate("/projects")}
                        disabled={loading}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="create-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating..."
                            : "Create Project"}
                    </button>

                </div>

            </form>

        </div>
    );
}

export default AddProject;