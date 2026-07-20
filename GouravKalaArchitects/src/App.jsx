import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Header from "./Header";
import Footer from "./Footer";
import Home from "./Pages/Home";
import Projects from "./Projects";
import ContactUs from "./Pages/ContactUs";
import About from "./Pages/About";
import Services from "./Pages/Services";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />


        <Route
          path="/about"
          element={<About />}
        />

        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<ContactUs />} />

      </Routes>
      <Footer />

    </BrowserRouter>
  );
}

export default App;