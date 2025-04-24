import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => (
  <div className="header">
    <Link to="/">
      <h6>Realworld Blog</h6>
    </Link>
  </div>
);

export default Header;
