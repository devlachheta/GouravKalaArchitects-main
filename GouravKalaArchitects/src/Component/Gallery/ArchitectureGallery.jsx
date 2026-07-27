import GalleryImage from "./GalleryImage";
import "../../styles/gallery.css";

function ArchitectureGallery({ images, title }) {

    if (!images || images.length === 0) {
        return null;
    }

    return (
        <div className="architecture-gallery">

            {/* Hero */}
            <div className="gallery-hero">
                <GalleryImage
                    src={images[0]}
                    alt={`${title} Hero`}
                />
            </div>

            {/* Row 1 */}
            <div className="gallery-row two-column">

                {images[1] && (
                    <GalleryImage
                        src={images[1]}
                        alt={`${title} 2`}
                    />
                )}

                {images[2] && (
                    <GalleryImage
                        src={images[2]}
                        alt={`${title} 3`}
                    />
                )}

            </div>

            {/* Wide */}
            {images[3] && (
                <div className="gallery-wide">
                    <GalleryImage
                        src={images[3]}
                        alt={`${title} 4`}
                    />
                </div>
            )}

            {/* Last Row */}
            <div className="gallery-row two-column">

                {images[4] && (
                    <GalleryImage
                        src={images[4]}
                        alt={`${title} 5`}
                    />
                )}

                {images[5] && (
                    <GalleryImage
                        src={images[5]}
                        alt={`${title} 6`}
                    />
                )}

            </div>

        </div>
    );
}

export default ArchitectureGallery;