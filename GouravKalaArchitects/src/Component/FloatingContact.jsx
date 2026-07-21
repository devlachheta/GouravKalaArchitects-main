import { AnimatePresence, motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import "../styles/floatingcontact.css";
import useScrollThreshold from "../hooks/useScrollThreshold";

function FloatingContact() {
    const showAfterScroll = useScrollThreshold(300);

    return (
        <AnimatePresence>
            {showAfterScroll && (
                <motion.div
                    className="floatingContact"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <a
                        className="whatsappButton"
                        href="https://wa.me/919589063943"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Chat on WhatsApp"
                    >
                        <FaWhatsapp />
                    </a>

                    <a
                        className="callButton"
                        href="tel:+919589063943"
                        aria-label="Call us"
                    >
                        <FiPhone />
                    </a>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default FloatingContact;