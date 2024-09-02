import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import siteBackground from "./assets/site arkaplanson.png";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import AboutContent from "./components/AboutContent";
import LibraryContent from "./components/LibraryContent";
import Footer from "./components/Footer";

const App = () => (
  <Router>
    <div
      className="anasayfa"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${siteBackground})`,
      }}
    >
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/about" element={<AboutContent />} />
          <Route path="/libraries/*" element={<LibraryContent />} />
        </Routes>
      </div>
      <Footer />
    </div>
  </Router>
);

export default App;
