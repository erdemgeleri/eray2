import React from "react";
import { Link } from "react-router-dom";

const Libraries = () => {
  return (
    <div>
      <Link to="/libraries/lib1">Kütüphane 1</Link>
      <Link to="/libraries/lib2">Kütüphane 2</Link>
      <Link to="/libraries/lib3">Kütüphane 3</Link>
      <Link to="/libraries/lib4">Kütüphane 4</Link>
      <Link to="/libraries/lib5">Kütüphane 5</Link>
      <Link to="/libraries/lib6">Kütüphane 6</Link>
      <Link to="/libraries/lib7">Kütüphane 7</Link>
    </div>
  );
};

export default Libraries;
