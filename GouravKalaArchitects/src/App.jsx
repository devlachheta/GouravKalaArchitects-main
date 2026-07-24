import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./Pages/Home";
import Projects from "./Pages/Projects";
import ContactUs from "./Pages/ContactUs";
import About from "./Pages/About";
import Services from "./Pages/Services";
import FloatingContact from "./Component/FloatingContact";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import ScrollToTop from "./Component/ScrollToTop";

function App() {

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/about"
          element={<About />}
        />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
      <FloatingContact />

      <Footer />

    </BrowserRouter>
  );
}

export default App;