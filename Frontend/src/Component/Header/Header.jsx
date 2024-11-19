import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../Images/logo.png";
import "./header.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Header() {

  const [data, setData] = useState([])

  const getApidata = async () => {
    try {
      const res = await axios.get("https://api.cupagreen.com/api/get-category")
      setData(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getApidata()
  }, [])

  console.log(data)
  // Function to close the navbar when a link is clicked
  const handleNavLinkClick = () => {
    const navbarCollapse = document.getElementById("navbarNav");
    if (navbarCollapse.classList.contains("show")) {
      navbarCollapse.classList.remove("show");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        {/* Logo Section */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="CupaGreen Logo"
            className="navbarLogo"
          />
        </Link>

        {/* Responsive Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-success fw-bold" to="/" onClick={handleNavLinkClick}>
                Home
              </Link>
            </li>

            {/* Paper Cups Dropdown */}
            {
              data.map((item, index) =>
                <li className="nav-item">
                  <Link className="nav-link" to={`/${item.name}`} onClick={handleNavLinkClick}>
                    {item.name}
                  </Link>
                </li>
              )
            }

            {/* <li className="nav-item">
              <Link className="nav-link" to="/containers" onClick={handleNavLinkClick}>
                Containers
              </Link>
            </li>

            {/* Cutlery */}
            {/* <li className="nav-item">
              <Link className="nav-link" to="/cutlery" onClick={handleNavLinkClick}>
                Cutlery
              </Link>
            </li>  */}

            {/* Other Links */}
            <li className="nav-item">
              <Link className="nav-link" to="/all-products" onClick={handleNavLinkClick}>
                All Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/gallery" onClick={handleNavLinkClick}>
                Photos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact-us" onClick={handleNavLinkClick}>
                Contact
              </Link>
            </li>

            {/* Search and Menu Icons */}
            {/* <li className="nav-item">
              <Link className="nav-link" to="#" onClick={handleNavLinkClick}>
                <i className="bi bi-search"></i>
              </Link>
            </li> */}
            {/* <li className="nav-item">
              <Link className="nav-link" to="#" onClick={handleNavLinkClick}>
                <i className="bi bi-list"></i>
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
