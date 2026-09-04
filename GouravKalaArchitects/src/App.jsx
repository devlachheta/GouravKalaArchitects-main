import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import "./App.css";
import Home from "./Pages/Home";
import Projects from "./Pages/Projects";
import ProjectDetails from "./Pages/ProjectDetails";
import ContactUs from "./Pages/ContactUs";
import About from "./Pages/About";
import Services from "./Pages/Services";
import FloatingContact from "./Component/FloatingContact";
import BookConsultation from "./Pages/BookConsultation";
import Footer from "./Component/Footer";
import ScrollToTop from "./Component/ScrollToTop";
import SplashScreen from "./Component/SplashScreen";


function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetails />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/book-consultation" element={<BookConsultation />} />
      </Routes>

      <FloatingContact />
      <Footer />
    </BrowserRouter>
  );
}

export default App;