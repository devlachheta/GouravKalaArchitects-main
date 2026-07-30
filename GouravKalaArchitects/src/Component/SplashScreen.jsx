import { motion } from "framer-motion";
import "../styles/SplashScreen.css";
import "../styles/About.css";

export default function SplashScreen() {
  return (
    <div className="splash-screen">


      <motion.p
        className="gka-subtitle"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.8,
          duration: 0.6,
        }}
      >
        Gourav Kala Architects
      </motion.p>
    </div>
  );
}