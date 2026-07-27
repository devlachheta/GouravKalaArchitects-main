import { motion } from "framer-motion";

function GalleryImage({ src, alt, onClick }) {
    return (
        <motion.div
            className="gallery-image"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
        >
            <img
                src={src}
                alt={alt}
                onClick={onClick}
            />
        </motion.div>
    );
}

export default GalleryImage;