import { useState } from "react";
import GalleryImage from "./GalleryImage";
import ImageLightbox from "./ImageLightbox";
import "../../styles/gallery.css";

function ArchitectureGallery({ images, title }) {
    if (!images || images.length === 0) {
        return null;
    }

    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openLightbox = (index) => {
        setCurrentIndex(index);
        setIsLightboxOpen(true);
    };

    // Split images into groups of 6
    const sections = [];
    for (let i = 0; i < images.length; i += 6) {
        sections.push(images.slice(i, i + 6));
    }

    return (
        <>
            <div className="architecture-gallery">
                {sections.map((section, sectionIndex) => (
                    <div className="gallery-group" key={sectionIndex}>

                        {/* Section 1 */}
                        <div className="gallery-section">

                            <div className="gallery-large">
                                {section[0] && (
                                    <GalleryImage
                                        src={section[0].src}
                                        alt={`${title} 1`}
                                        position={section[0].position}
                                        onClick={() => openLightbox(sectionIndex * 6)}
                                    />
                                )}
                            </div>

                            <div className="gallery-stack">
                                {section[1] && (
                                    <GalleryImage
                                        src={section[1].src}
                                        alt={`${title} 2`}
                                        position={section[1].position}
                                        onClick={() => openLightbox(sectionIndex * 6 + 1)}
                                    />
                                )}

                                {section[2] && (
                                    <GalleryImage
                                        src={section[2].src}
                                        alt={`${title} 3`}
                                        position={section[2].position}
                                        onClick={() => openLightbox(sectionIndex * 6 + 2)}
                                    />
                                )}
                            </div>

                        </div>

                        {/* Section 2 */}
                        {(section[3] || section[4] || section[5]) && (
                            <div className="gallery-section reverse">

                                <div className="gallery-stack">

                                    {section[3] && (
                                        <GalleryImage
                                            src={section[3].src}
                                            alt={`${title} 4`}
                                            position={section[3].position}
                                            onClick={() => openLightbox(sectionIndex * 6 + 3)}
                                        />
                                    )}

                                    {section[4] && (
                                        <GalleryImage
                                            src={section[4].src}
                                            alt={`${title} 5`}
                                            position={section[4].position}
                                            onClick={() => openLightbox(sectionIndex * 6 + 4)}
                                        />
                                    )}

                                </div>

                                <div className="gallery-large">

                                    {section[5] && (
                                        <GalleryImage
                                            src={section[5].src}
                                            alt={`${title} 6`}
                                            position={section[5].position}
                                            onClick={() => openLightbox(sectionIndex * 6 + 5)}
                                        />
                                    )}

                                </div>

                            </div>
                        )}

                    </div>
                ))}
            </div>

            {isLightboxOpen && (
                <ImageLightbox
                    images={images}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                    onClose={() => setIsLightboxOpen(false)}
                />
            )}
        </>
    );
}

export default ArchitectureGallery;