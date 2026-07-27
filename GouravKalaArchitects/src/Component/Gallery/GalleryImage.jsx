import { motion } from "framer-motion";

function GalleryImage({ src, alt }) {
    return (
        <motion.div
            className="gallery-image"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            <img
                src={src}
                alt={alt}
                loading="lazy"
            />
        </motion.div>
    );
}

export default GalleryImage;