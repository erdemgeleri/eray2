import React from "react";
import { Link } from "react-router-dom";

const Libraries = () => {
  return (
    <div className="libraries-container">
      <h1>Kütüphaneler</h1>
      <ul className="libraries-list">
        <li>
          <Link to="/libraries/lib1">Kütüphane 1</Link>
        </li>
        <li>
          <Link to="/libraries/lib2">Kütüphane 2</Link>
        </li>
        <li>
          <Link to="/libraries/lib3">Kütüphane 3</Link>
        </li>
        <li>
          <Link to="/libraries/lib4">Kütüphane 4</Link>
        </li>
        <li>
          <Link to="/libraries/lib5">Kütüphane 5</Link>
        </li>
        <li>
          <Link to="/libraries/lib6">Kütüphane 6</Link>
        </li>
       
      </ul>
    </div>
  );
};

export default Libraries;
