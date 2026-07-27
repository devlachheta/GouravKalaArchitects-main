import GalleryImage from "./GalleryImage";
import "../../styles/interiorgallery.css";

function InteriorGallery({ images, title }) {
  if (!images || images.length === 0) return null;

  const galleryImages = images;


  const sections = [];

  // Every block uses 3 images:
  // 1 Tall + 2 Small
  for (let i = 0; i < galleryImages.length; i += 3) {
    const block = galleryImages.slice(i, i + 3);

    const reverse = Math.floor(i / 3) % 2 !== 0;

    sections.push(
      <section
        className={`interior-block ${reverse ? "reverse" : ""
          }`}
        key={i}
      >
        {!reverse ? (
          <>
            {/* Left Tall */}
            <div className="tall-image">
              {block[0] && (
                <GalleryImage
                  src={block[0]}
                  alt={title}
                />
              )}
            </div>

            {/* Right Stack */}
            <div className="stack-images">
              {block[1] && (
                <div className="stack-item">
                  <GalleryImage
                    src={block[1]}
                    alt={title}
                  />
                </div>
              )}

              {block[2] && (
                <div className="stack-item">
                  <GalleryImage
                    src={block[2]}
                    alt={title}
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
                    src={block[0]}
                    alt={title}
                  />
                </div>
              )}

              {block[1] && (
                <div className="stack-item">
                  <GalleryImage
                    src={block[1]}
                    alt={title}
                  />
                </div>
              )}
            </div>

            {/* Right Tall */}
            <div className="tall-image">
              {block[2] && (
                <GalleryImage
                  src={block[2]}
                  alt={title}
                />
              )}
            </div>
          </>
        )}
      </section>
    );
  }

  return (
    <div className="interior-gallery">



      {sections}

    </div>
  );
}

export default InteriorGallery;