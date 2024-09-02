import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/rossoErayCreative logo beyaz.png";
import Libraries from "./Libraries";

const Header = () => (
  <div className="header">
    <div className="logo">
      <Link to="/">
        <img src={logo} alt="rossoEray" />
      </Link>
    </div>
    <nav className="nav">
      <div className="navigation">
        <div>
          <Link to="/">ANASAYFA</Link>
        </div>
        <div>
          <Link to="/about">HAKKIMDA</Link>
        </div>
        <div className="dropdown">
          <a href="#">Kütüphaneler</a>
          <div className="dropdown-content">
            <Libraries />
          </div>
        </div>
      </div>
    </nav>
  </div>
);

export default Header;
