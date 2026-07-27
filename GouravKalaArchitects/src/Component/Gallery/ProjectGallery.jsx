import ArchitectureGallery from "./ArchitectureGallery";
// import InteriorGallery from "./InteriorGallery";

function ProjectGallery({ category, gallery, title }) {

    const projectCategory = category?.toLowerCase();

    if (projectCategory === "architecture") {
        return (
            <ArchitectureGallery
                images={gallery}
                title={title}
            />
        );
    }

    if (projectCategory === "interior") {
        return (
            <InteriorGallery
                images={gallery}
                title={title}
            />
        );
    }

    return (
        <p style={{ textAlign: "center" }}>
            Gallery not available.
        </p>
    );
}

export default ProjectGallery;