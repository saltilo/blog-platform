import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      <Link to="/" className="logo">
        Realworld Blog
      </Link>

      <nav className="nav">
        {!user ? (
          <>
            <Link to="/sign-in">Sign In</Link>
            <Link to="/sign-up" className="btn-green">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link to="/new-article" className="btn-green">
              Create article
            </Link>
            <div className="user-info" onClick={() => navigate("/profile")}>
              <span>{user.username}</span>
              {user.image && (
                <img src={user.image} alt="avatar" className="avatar" />
              )}
            </div>
            <button onClick={handleLogout} className="btn-dark">
              Log Out
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
