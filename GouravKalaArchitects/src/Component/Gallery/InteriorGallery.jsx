import { useState } from "react";
import GalleryImage from "./GalleryImage";
import ImageLightbox from "./ImageLightbox";
import "../../styles/interiorgallery.css";

function InteriorGallery({ images, title }) {
  if (!images || images.length === 0) return null;

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsLightboxOpen(true);
  };

  // Convert images for ImageLightbox
  const lightboxImages = images;
  return (
    <>
      <div className="interior-gallery">
        {images.map((_, index) => {
          const reverse = Math.floor(index / 3) % 2 !== 0;

          // Start a new block every 3 images
          if (index % 3 !== 0) return null;

          const block = images.slice(index, index + 3);

          return (
            <section
              className={`interior-block ${reverse ? "reverse" : ""}`}
              key={index}
            >
              {!reverse ? (
                <>
                  {/* Left Tall */}
                  <div className="tall-image">
                    {block[0] && (
                      <GalleryImage
                        src={block[0].src}
                        position={block[0].position}
                        alt={`${title} ${index + 1}`}
                        onClick={() => openLightbox(index)}
                      />
                    )}
                  </div>

                  {/* Right Stack */}
                  <div className="stack-images">
                    {block[1] && (
                      <div className="stack-item">
                        <GalleryImage
                          src={block[1].src}
                          position={block[1].position}
                          alt={`${title} ${index + 2}`}
                          onClick={() => openLightbox(index + 1)}
                        />
                      </div>
                    )}

                    {block[2] && (
                      <div className="stack-item">
                        <GalleryImage
                          src={block[2].src}
                          position={block[2].position}
                          alt={`${title} ${index + 3}`}
                          onClick={() => openLightbox(index + 2)}
                        />
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Left Stack */}
                  <div className="stack-images">
                    {block[0] && (
                      <div className="stack-item">
                        <GalleryImage
                          src={block[0].src}
                          position={block[0].position}
                          alt={`${title} ${index + 1}`}
                          onClick={() => openLightbox(index)}
                        />
                      </div>
                    )}

                    {block[1] && (
                      <div className="stack-item">
                        <GalleryImage
                          src={block[1].src}
                          position={block[1].position}
                          alt={`${title} ${index + 2}`}
                          onClick={() => openLightbox(index + 1)}
                        />
                      </div>
                    )}
                  </div>

                  {/* Right Tall */}
                  <div className="tall-image">
                    {block[2] && (
                      <GalleryImage
                        src={block[2].src}
                        position={block[2].position}
                        alt={`${title} ${index + 3}`}
                        onClick={() => openLightbox(index + 2)}
                      />
                    )}
                  </div>
                </>
              )}
            </section>
          );
        })}
      </div>

      {isLightboxOpen && (
        <ImageLightbox
          images={lightboxImages}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          onClose={() => setIsLightboxOpen(false)}
        />
      )}
    </>
  );
}

export default InteriorGallery;