import React from "react";
import { Route, Routes } from "react-router-dom";
import Library1 from "./Library1";
import Library2 from "./Library2";
import Library3 from "./Library3";
import Library4 from "./Library4";
import Library5 from "./Library5";
import Library6 from "./Library6";
import "./LibraryContent.css";

const LibraryContent = () => {
  return (
    <div className="library-content">
      <Routes>
        <Route path="lib1" element={<Library1 />} />
        <Route path="lib2" element={<Library2 />} />
        <Route path="lib3" element={<Library3 />} />
        <Route path="lib4" element={<Library4 />} />
        <Route path="lib5" element={<Library5 />} />
        <Route path="lib6" element={<Library6 />} />
      </Routes>
    </div>
  );
};

export default LibraryContent;
