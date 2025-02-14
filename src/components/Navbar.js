import React from "react";
import { Link, useLocation,useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Navbar = () => {
  let location = useLocation();
  let navigate = useNavigate()
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    // console.log(localStorage.getItem('token')+"after logout")
    navigate("/login");
  }
  useEffect(() => {}, [location]);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  about
                </Link>
              </li>
            </ul>
            {!localStorage.getItem('token')?<div>
            <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
            <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
             </div>:<button className="btn btn-primary mx-2" onClick={handleLogout}> logout</button> } 
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
