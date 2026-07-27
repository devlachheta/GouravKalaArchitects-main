import { motion } from "framer-motion";

function GalleryImage({
    src,
    alt,
<<<<<<< HEAD
    objectPosition = "center center",
    objectFit = "cover",
=======
    position = "center center",
>>>>>>> c8dfdf6fc6fcc6a45f8033588959b1dbac21bdb1
    onClick,
}) {
    return (
        <motion.div
            className="gallery-image"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
            }}
            onClick={onClick}
            style={{ cursor: "pointer" }}
        >
            <img
                src={src}
                alt={alt}
                loading="lazy"
                onClick={onClick}
                style={{
                    objectFit: "cover",
                    objectPosition: position,
                }}
            />
        </motion.div>
    );
}

export default GalleryImage;