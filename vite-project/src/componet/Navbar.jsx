import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          🚀 Dynamic Nav
        </div>

        <div className="nav-links">
          <Link 
            to="/user" 
            className={`nav-link ${location.pathname === '/user' ? 'active' : ''}`}
          >
            👤 User One
          </Link>

          <Link 
            to="/usertwo" 
            className={`nav-link ${location.pathname === '/usertwo' ? 'active' : ''}`}
          >
            👥 User Two
          </Link>

          <Link 
            to="/admin" 
            className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}
          >
            ⚡ Admin
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
