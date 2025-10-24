// import React from "react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav style={{ padding: "10px", background: "#eee" }}>
//       <Link to="/user" style={{ margin: "10px" }}>User One</Link>
//       <Link to="/usertwo" style={{ margin: "10px" }}>User Two</Link>
//       <Link to="/admin" style={{ margin: "10px" }}>Admin</Link>
//     </nav>
//   );
// };

// export default Navbar;



import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <span>🚀 Dynamic Nav</span>
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