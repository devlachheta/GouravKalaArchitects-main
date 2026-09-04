import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";


function EditProject() {

    const { id } = useParams();
    const navigate = useNavigate();


    // ==========================================
    // STATES
    // ==========================================

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const [project, setProject] = useState(null);

    const [deletingImageId, setDeletingImageId] = useState(null);


    // ==========================================
    // MAIN IMAGE STATES
    // ==========================================

    const [bannerFile, setBannerFile] = useState(null);
    const [cardFile, setCardFile] = useState(null);

    const [bannerRemoved, setBannerRemoved] = useState(false);
    const [cardRemoved, setCardRemoved] = useState(false);


    // ==========================================
    // NEW GALLERY IMAGES
    // ==========================================

    const [newGalleryImages, setNewGalleryImages] = useState([]);


    // ==========================================
    // FORM DATA
    // ==========================================

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


    // ==========================================
    // FETCH PROJECT
    // ==========================================

    useEffect(() => {

        fetchProject();

    }, [id]);


    const fetchProject = async () => {

        try {

            setLoading(true);
            setError("");


            const response = await api.get(
                `projects/${id}/`
            );


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

                banner_position:
                    data.banner_position || "center",

                card_image_position:
                    data.card_image_position || "center",

            });


        } catch (error) {

            console.error(error);

            setError(
                "Unable to load project."
            );

        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // FORM CHANGE
    // ==========================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setFormData((prev) => ({

            ...prev,

            [name]: value,

        }));

    };

    // ==========================================
    // BANNER POSITION
    // ==========================================

    const handleBannerPositionChange = (e) => {
        const value = e.target.value;

        setFormData((prev) => ({
            ...prev,
            banner_position: value,
        }));
    };


    // ==========================================
    // CARD IMAGE POSITION
    // ==========================================

    const handleCardImagePositionChange = (e) => {
        const value = e.target.value;

        setFormData((prev) => ({
            ...prev,
            card_image_position: value,
        }));
    };


    // ==========================================
    // BANNER IMAGE
    // ==========================================

    const handleBannerChange = (e) => {

        const file = e.target.files[0];


        if (!file) {
            return;
        }


        setBannerFile(file);

        setBannerRemoved(false);


        // Allow selecting the same file again
        e.target.value = "";

    };


    const handleRemoveBanner = () => {

        const confirmed = window.confirm(
            "Are you sure you want to remove the banner image?"
        );


        if (!confirmed) {
            return;
        }


        setBannerFile(null);

        setBannerRemoved(true);

    };


    // ==========================================
    // CARD IMAGE
    // ==========================================

    const handleCardChange = (e) => {

        const file = e.target.files[0];


        if (!file) {
            return;
        }


        setCardFile(file);

        setCardRemoved(false);


        // Allow selecting the same file again
        e.target.value = "";

    };


    const handleRemoveCard = () => {

        const confirmed = window.confirm(
            "Are you sure you want to remove the card image?"
        );


        if (!confirmed) {
            return;
        }


        setCardFile(null);

        setCardRemoved(true);

    };


    // ==========================================
    // NEW GALLERY IMAGES
    // ==========================================

    const handleGalleryImagesChange = (e) => {

        const files = Array.from(
            e.target.files
        );


        if (!files.length) {
            return;
        }


        // Find the highest display order from
        // existing and newly selected images.
        const highestOrder = Math.max(

            ...(project?.gallery || []).map(
                (image) =>
                    Number(image.display_order) || 0
            ),

            ...newGalleryImages.map(
                (image) =>
                    Number(image.display_order) || 0
            ),

            0

        );


        const newImages = files.map(
            (file, index) => ({

                file,

                preview:
                    URL.createObjectURL(file),

                position:
                    "center center",

                display_order:
                    highestOrder + index + 1,

            })
        );


        setNewGalleryImages(
            (prev) => [
                ...prev,
                ...newImages,
            ]
        );


        // Allow selecting same file again
        e.target.value = "";

    };


    // ==========================================
    // CHANGE NEW GALLERY IMAGE POSITION
    // ==========================================

    const handleNewGalleryPositionChange = (
        index,
        value
    ) => {

        setNewGalleryImages(
            (prev) => {

                const updated = [...prev];


                updated[index] = {

                    ...updated[index],

                    position: value,

                };


                return updated;

            }
        );

    };


    // ==========================================
    // CHANGE NEW GALLERY IMAGE DISPLAY ORDER
    // ==========================================

    const handleNewGalleryOrderChange = (
        index,
        value
    ) => {

        setNewGalleryImages(
            (prev) => {

                const updated = [...prev];


                updated[index] = {

                    ...updated[index],

                    display_order:
                        value === ""
                            ? ""
                            : Number(value),

                };


                return updated;

            }
        );

    };


    // ==========================================
    // CHANGE EXISTING GALLERY IMAGE
    // ==========================================

    const handleExistingGalleryChange = (
        imageId,
        field,
        value
    ) => {

        setProject((prev) => {

            if (!prev) {
                return prev;
            }


            return {

                ...prev,

                gallery: prev.gallery.map(
                    (image) =>

                        image.id === imageId

                            ? {

                                ...image,

                                [field]:
                                    field === "display_order"

                                        ? (
                                            value === ""
                                                ? ""
                                                : Number(value)
                                        )

                                        : value,

                            }

                            : image

                ),

            };

        });

    };


    // ==========================================
    // REMOVE NEW GALLERY IMAGE
    // ==========================================

    const handleRemoveNewGalleryImage = (
        index
    ) => {

        setNewGalleryImages(
            (prev) => {

                const updated = [...prev];


                if (updated[index]?.preview) {

                    URL.revokeObjectURL(
                        updated[index].preview
                    );

                }


                updated.splice(index, 1);


                return updated;

            }
        );

    };


    // ==========================================
    // REMOVE EXISTING GALLERY IMAGE
    // ==========================================

    const handleRemoveGalleryImage = async (
        imageId
    ) => {

        const confirmed = window.confirm(
            "Are you sure you want to remove this gallery image?"
        );


        if (!confirmed) {
            return;
        }


        try {

            setDeletingImageId(imageId);


            // Delete from backend
            await api.delete(
                `project-images/${imageId}/`
            );


            // Remove from UI
            setProject((prev) => {

                if (!prev) {
                    return prev;
                }


                const remainingImages =
                    prev.gallery.filter(
                        (image) =>
                            image.id !== imageId
                    );


                // Automatically reorder
                const reorderedImages =
                    remainingImages.map(
                        (image, index) => ({

                            ...image,

                            display_order:
                                index + 1,

                        })
                    );


                return {

                    ...prev,

                    gallery:
                        reorderedImages,

                };

            });


            // ==================================
            // UPDATE DISPLAY ORDER IN DATABASE
            // ==================================

            const currentGallery =
                project?.gallery?.filter(
                    (image) =>
                        image.id !== imageId
                ) || [];


            for (
                let index = 0;
                index < currentGallery.length;
                index++
            ) {

                const image =
                    currentGallery[index];


                if (
                    image.display_order !==
                    index + 1
                ) {

                    await api.patch(
                        `project-images/${image.id}/`,
                        {

                            display_order:
                                index + 1,

                        }
                    );

                }

            }


        } catch (error) {

            console.error(error);


            alert(
                "Unable to remove the gallery image."
            );

        } finally {

            setDeletingImageId(null);

        }

    };


    // ==========================================
    // SAVE PROJECT
    // ==========================================

    const handleSave = async () => {

        try {

            setSaving(true);

            setError("");


            // ==================================
            // 1. UPDATE PROJECT INFORMATION
            // ==================================

            await api.patch(
                `projects/${id}/`,
                {

                    ...formData,

                    year:
                        formData.year || null,

                    youtube_url:
                        formData.youtube_url || null,

                }
            );


            // ==================================
            // 2. REMOVE BANNER IMAGE
            // ==================================

            if (
                bannerRemoved &&
                !bannerFile
            ) {

                await api.patch(
                    `projects/${id}/`,
                    {

                        banner_image: null,

                    }
                );

            }


            // ==================================
            // 3. REMOVE CARD IMAGE
            // ==================================

            if (
                cardRemoved &&
                !cardFile
            ) {

                await api.patch(
                    `projects/${id}/`,
                    {

                        card_image: null,

                    }
                );

            }


            // ==================================
            // 4. UPDATE EXISTING GALLERY IMAGES
            // ==================================

            const existingGallery =
                project?.gallery || [];


            for (const image of existingGallery) {

                await api.patch(
                    `project-images/${image.id}/`,
                    {

                        position:
                            image.position ||
                            "center center",

                        display_order:
                            Number(
                                image.display_order
                            ) || 1,

                    }
                );

            }


            // ==================================
            // 5. UPLOAD NEW BANNER / CARD
            // ==================================

            if (
                bannerFile ||
                cardFile
            ) {

                const imageData =
                    new FormData();


                if (bannerFile) {

                    imageData.append(
                        "banner_image",
                        bannerFile
                    );

                }


                if (cardFile) {

                    imageData.append(
                        "card_image",
                        cardFile
                    );

                }


                await api.patch(
                    `projects/${id}/`,
                    imageData,
                    {

                        headers: {

                            "Content-Type":
                                "multipart/form-data",

                        },

                    }
                );

            }


            // ==================================
            // 6. ADD NEW GALLERY IMAGES
            // ==================================

            if (
                newGalleryImages.length > 0
            ) {

                // Find highest existing order
                const existingGallery =
                    project?.gallery || [];


                const highestOrder =
                    existingGallery.length > 0

                        ? Math.max(
                            ...existingGallery.map(
                                (image) =>
                                    Number(
                                        image.display_order
                                    ) || 0
                            )
                        )

                        : 0;


                for (
                    let index = 0;
                    index <
                    newGalleryImages.length;
                    index++
                ) {

                    const item =
                        newGalleryImages[index];


                    const imageData =
                        new FormData();


                    imageData.append(
                        "project",
                        id
                    );


                    imageData.append(
                        "image",
                        item.file
                    );


                    imageData.append(
                        "position",
                        item.position ||
                        "center center"
                    );


                    imageData.append(
                        "display_order",
                        Number(
                            item.display_order
                        ) ||
                        highestOrder +
                        index +
                        1
                    );


                    await api.post(
                        "project-images/",
                        imageData,
                        {

                            headers: {

                                "Content-Type":
                                    "multipart/form-data",

                            },

                        }
                    );

                }

            }


            // ==================================
            // 7. REFRESH PROJECT
            // ==================================

            await fetchProject();


            // ==================================
            // 8. RESET IMAGE STATES
            // ==================================

            setBannerFile(null);

            setCardFile(null);

            setBannerRemoved(false);

            setCardRemoved(false);


            // Remove preview URLs
            newGalleryImages.forEach(
                (item) => {

                    if (item.preview) {

                        URL.revokeObjectURL(
                            item.preview
                        );

                    }

                }
            );


            setNewGalleryImages([]);


            alert(
                "Project updated successfully."
            );


        } catch (error) {

            console.error(
                "Update project error:",
                error
            );


            console.error(
                "Response:",
                error.response?.data
            );


            setError(
                error.response?.data ||
                "Unable to update project."
            );


        } finally {

            setSaving(false);

        }

    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="admin-page">

                <div className="page-header">

                    <div>

                        <h1>
                            Edit Project
                        </h1>

                        <p>
                            Loading project...
                        </p>

                    </div>

                </div>

            </div>

        );

    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error) {

        return (

            <div className="admin-page">

                <div className="page-header">

                    <div>

                        <h1>
                            Edit Project
                        </h1>

                        <p>
                            {typeof error === "string"
                                ? error
                                : "Something went wrong."}
                        </p>

                    </div>

                </div>

            </div>

        );

    }


    // ==========================================
    // SORT EXISTING GALLERY
    // ==========================================

    const sortedGallery =
        [...(project?.gallery || [])].sort(
            (a, b) =>
                (
                    Number(a.display_order) || 0
                ) -
                (
                    Number(b.display_order) || 0
                )
        );


    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="admin-page">


            {/* =================================
                PAGE HEADER
            ================================= */}

            <div className="page-header">

                <div>

                    <h1>
                        Edit Project
                    </h1>

                    <p>

                        Update details for{" "}

                        <strong>
                            {project?.title}
                        </strong>

                    </p>

                </div>


                <button
                    type="button"
                    className="secondary-btn"
                    onClick={() =>
                        navigate("/projects")
                    }
                >

                    ← Back to Projects

                </button>

            </div>


            {/* =================================
                BASIC INFORMATION
            ================================= */}

            <div className="form-section">

                <div className="section-header">

                    <h2>
                        Basic Information
                    </h2>

                    <p>
                        Update the main project
                        information.
                    </p>

                </div>


                <div className="form-grid">


                    <div className="form-group">

                        <label>
                            Project Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter project title"
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Project Type
                        </label>

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

                        <label>
                            Location
                        </label>

                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Enter project location"
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Year
                        </label>

                        <input
                            type="number"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            placeholder="2026"
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Status
                        </label>

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


            {/* =================================
                AREA INFORMATION
            ================================= */}

            <div className="form-section">

                <div className="section-header">

                    <h2>
                        Area Information
                    </h2>

                    <p>
                        Update the project area
                        details.
                    </p>

                </div>


                <div className="form-grid">


                    <div className="form-group">

                        <label>
                            Plot Area
                        </label>

                        <input
                            type="text"
                            name="plot_area"
                            value={formData.plot_area}
                            onChange={handleChange}
                            placeholder="e.g. 2400 sq.ft"
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Built-up Area
                        </label>

                        <input
                            type="text"
                            name="built_up_area"
                            value={formData.built_up_area}
                            onChange={handleChange}
                            placeholder="e.g. 1800 sq.ft"
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Carpet Area
                        </label>

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


            {/* =================================
                DESCRIPTION
            ================================= */}

            <div className="form-section">

                <div className="section-header">

                    <h2>
                        Description
                    </h2>

                    <p>
                        Update the project
                        description.
                    </p>

                </div>


                <div className="form-group">

                    <label>
                        Project Description
                    </label>

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="8"
                        placeholder="Write project description..."
                    />

                </div>

            </div>


            {/* =================================
                VIDEO
            ================================= */}

            <div className="form-section">

                <div className="section-header">

                    <h2>
                        Video
                    </h2>

                    <p>
                        Add or update the
                        YouTube video.
                    </p>

                </div>


                <div className="form-group">

                    <label>
                        YouTube URL
                    </label>

                    <input
                        type="url"
                        name="youtube_url"
                        value={formData.youtube_url}
                        onChange={handleChange}
                        placeholder="https://www.youtube.com/watch?v=..."
                    />

                </div>

            </div>


            {/* =================================
                PROJECT IMAGES
            ================================= */}

            <div className="form-section">

                <div className="section-header">

                    <h2>
                        Project Images
                    </h2>

                    <p>
                        Manage the main project
                        images.
                    </p>

                </div>


                <div className="edit-main-images">


                    {/* =================================
                        BANNER IMAGE
                    ================================= */}

                    <div className="edit-image-card">

                        <div className="edit-image-header">

                            <h3>
                                Banner Image
                            </h3>

                            <p>
                                Main image displayed
                                on the project page.
                            </p>

                        </div>


                        {/* PREVIEW */}

                        {!bannerRemoved ? (

                            <div className="edit-image-preview-wrapper">

                                <img
                                    src={
                                        bannerFile
                                            ? URL.createObjectURL(
                                                bannerFile
                                            )
                                            : project?.banner_image
                                    }
                                    alt="Project banner"
                                    style={{
                                        objectFit: "cover",
                                        objectPosition:
                                            formData.banner_position ||
                                            "center center",
                                    }}
                                />


                                <button
                                    type="button"
                                    className="image-remove-btn"
                                    onClick={
                                        handleRemoveBanner
                                    }
                                >

                                    Remove

                                </button>

                            </div>

                        ) : (

                            <div className="image-removed-box">

                                Banner image removed

                            </div>

                        )}


                        {/* FILE INPUT */}

                        <div className="image-upload-area">

                            <label className="image-upload-label">

                                {bannerFile
                                    ? "Change Banner Image"
                                    : "Select Banner Image"}


                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={
                                        handleBannerChange
                                    }
                                />

                            </label>


                            {bannerFile && (

                                <span className="selected-file-name">

                                    {bannerFile.name}

                                </span>

                            )}

                        </div>


                        {/* POSITION */}

                        <div className="form-group">

                            <label>
                                Banner Position
                            </label>

                            <input
                                type="text"
                                value={formData.banner_position || ""}
                                onChange={handleBannerPositionChange}
                                placeholder="center center"
                                autoComplete="off"
                            />

                        </div>

                    </div>


                    {/* =================================
                        CARD IMAGE
                    ================================= */}

                    <div className="edit-image-card">

                        <div className="edit-image-header">

                            <h3>
                                Card Image
                            </h3>

                            <p>
                                Image displayed in
                                project cards.
                            </p>

                        </div>


                        {/* PREVIEW */}

                        {!cardRemoved ? (

                            <div className="edit-image-preview-wrapper">

                                <img
                                    src={
                                        cardFile
                                            ? URL.createObjectURL(
                                                cardFile
                                            )
                                            : project?.card_image
                                    }
                                    alt="Project card"
                                    style={{
                                        objectFit: "cover",
                                        objectPosition:
                                            formData.card_image_position ||
                                            "center center",
                                    }}
                                />


                                <button
                                    type="button"
                                    className="image-remove-btn"
                                    onClick={
                                        handleRemoveCard
                                    }
                                >

                                    Remove

                                </button>

                            </div>

                        ) : (

                            <div className="image-removed-box">

                                Card image removed

                            </div>

                        )}


                        {/* FILE INPUT */}

                        <div className="image-upload-area">

                            <label className="image-upload-label">

                                {cardFile
                                    ? "Change Card Image"
                                    : "Select Card Image"}


                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={
                                        handleCardChange
                                    }
                                />

                            </label>


                            {cardFile && (

                                <span className="selected-file-name">

                                    {cardFile.name}

                                </span>

                            )}

                        </div>


                        {/* POSITION */}

                        <div className="form-group">

                            <label>
                                Card Image Position
                            </label>

                            <input
                                type="text"
                                value={formData.card_image_position || ""}
                                onChange={handleCardImagePositionChange}
                                placeholder="center center"
                                autoComplete="off"
                            />

                        </div>

                    </div>


                </div>

            </div>


            {/* =================================
                PROJECT GALLERY
            ================================= */}

            <div className="form-section">

                <div className="section-header">

                    <h2>
                        Project Gallery
                    </h2>

                    <p>
                        Manage the images displayed
                        in the project gallery.
                    </p>

                </div>


                {/* =================================
                    SELECT NEW GALLERY IMAGES
                ================================= */}

                <div className="gallery-upload-area">

                    <label className="gallery-upload-btn">

                        + Select Gallery Images


                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={
                                handleGalleryImagesChange
                            }
                        />

                    </label>


                    <span className="gallery-upload-hint">

                        You can select multiple
                        images at once.

                    </span>

                </div>


                {/* =================================
                    EXISTING GALLERY
                ================================= */}

                {sortedGallery.length > 0 ? (

                    <div className="gallery-grid">

                        {sortedGallery.map(
                            (image, index) => (

                                <div
                                    className="gallery-preview-card"
                                    key={image.id}
                                >


                                    {/* IMAGE */}

                                    <div className="gallery-image-wrapper">

                                        <img
                                            src={image.image}
                                            alt={`Gallery image ${index + 1}`}
                                            style={{
                                                objectFit: "cover",
                                                objectPosition:
                                                    image.position ||
                                                    "center center",
                                            }}
                                        />


                                        {/* REMOVE */}

                                        <button
                                            type="button"
                                            className="remove-gallery-btn"
                                            onClick={() =>
                                                handleRemoveGalleryImage(
                                                    image.id
                                                )
                                            }
                                            disabled={
                                                deletingImageId ===
                                                image.id
                                            }
                                        >

                                            {deletingImageId ===
                                                image.id
                                                ? "Removing..."
                                                : "Remove"}

                                        </button>

                                    </div>


                                    {/* INFORMATION */}

                                    <div className="gallery-info">

                                        <div className="gallery-title">

                                            Image {index + 1}

                                        </div>


                                        <div className="gallery-edit-row">

                                            <div className="gallery-field gallery-order-field">

                                                <label>
                                                    Display Order
                                                </label>

                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={
                                                        image.display_order ?? ""
                                                    }
                                                    onChange={(e) =>
                                                        handleExistingGalleryChange(
                                                            image.id,
                                                            "display_order",
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                            </div>


                                            <div className="gallery-field">

                                                <label>
                                                    Position
                                                </label>

                                                <input
                                                    type="text"
                                                    value={
                                                        image.position ||
                                                        "center center"
                                                    }
                                                    onChange={(e) =>
                                                        handleExistingGalleryChange(
                                                            image.id,
                                                            "position",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="center center"
                                                />

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                ) : (

                    <div className="no-gallery">

                        No gallery images found.

                    </div>

                )}


                {/* =================================
                    NEW GALLERY IMAGES
                ================================= */}

                {newGalleryImages.length > 0 && (

                    <div className="new-gallery-section">

                        <div className="new-gallery-header">

                            <h3>
                                New Gallery Images
                            </h3>

                            <p>
                                These images will be
                                added when you save
                                the project.
                            </p>

                        </div>


                        <div className="gallery-grid">

                            {newGalleryImages.map(
                                (item, index) => (

                                    <div
                                        className="gallery-preview-card"
                                        key={`${item.file.name}-${index}`}
                                    >


                                        {/* IMAGE */}

                                        <div className="gallery-image-wrapper">

                                            <img
                                                src={
                                                    item.preview
                                                }
                                                alt={`New gallery ${index + 1}`}
                                                style={{
                                                    objectFit: "cover",
                                                    objectPosition:
                                                        item.position ||
                                                        "center center",
                                                }}
                                            />


                                            {/* REMOVE */}

                                            <button
                                                type="button"
                                                className="remove-gallery-btn"
                                                onClick={() =>
                                                    handleRemoveNewGalleryImage(
                                                        index
                                                    )
                                                }
                                            >

                                                Remove

                                            </button>

                                        </div>


                                        {/* INFORMATION */}

                                        <div className="gallery-info">

                                            <div className="gallery-title">

                                                New Image{" "}
                                                {index + 1}

                                            </div>


                                            <div className="gallery-edit-row">

                                                <div className="gallery-field gallery-order-field">

                                                    <label>
                                                        Display Order
                                                    </label>

                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={
                                                            item.display_order ?? ""
                                                        }
                                                        onChange={(e) =>
                                                            handleNewGalleryOrderChange(
                                                                index,
                                                                e.target.value
                                                            )
                                                        }
                                                    />

                                                </div>


                                                <div className="gallery-field">

                                                    <label>
                                                        Position
                                                    </label>

                                                    <input
                                                        type="text"
                                                        value={
                                                            item.position ||
                                                            "center center"
                                                        }
                                                        onChange={(e) =>
                                                            handleNewGalleryPositionChange(
                                                                index,
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="center center"
                                                    />

                                                </div>

                                            </div>

                                        </div>


                                    </div>

                                )
                            )}

                        </div>

                    </div>

                )}

            </div>


            {/* =================================
                ACTIONS
            ================================= */}

            <div className="form-actions">

                <button
                    type="button"
                    className="secondary-btn"
                    onClick={() =>
                        navigate("/projects")
                    }
                    disabled={saving}
                >

                    Cancel

                </button>


                <button
                    type="button"
                    className="primary-btn"
                    disabled={saving}
                    onClick={handleSave}
                >

                    {saving
                        ? "Saving..."
                        : "Save Changes"}

                </button>

            </div>


        </div>

    );

}


export default EditProject;