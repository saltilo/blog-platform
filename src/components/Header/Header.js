import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => (
  <div className="header">
    <Link to="/">Realworld Blog</Link>
  </div>
);

export default Header;
