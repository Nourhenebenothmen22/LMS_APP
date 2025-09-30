import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll smooth vers une section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 70, // Ajuste si navbar fixe
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top shadow-sm navbar-animation`}
      style={{
        background: scrolled
          ? "#fff"
          : "linear-gradient(120deg, #6a11cb 0%, #ff6a88 50%, #ff9966 100%)",
        boxShadow: scrolled
          ? "0 4px 10px rgba(0,0,0,0.15)"
          : "0 4px 15px rgba(0,0,0,0.2)",
        transition: "all 0.4s ease-in-out",
      }}
    >
      <div className="container-fluid px-4">
        {/* Icon + Name */}
        <Link
          className={`navbar-brand d-flex align-items-center ${
            scrolled ? "text-dark" : "text-white"
          }`}
          to="/"
        >
          <FaGraduationCap
            size={30}
            className="me-2"
            style={{ color: scrolled ? "#000" : "#fff" }}
          />
          <span className="fw-bold fs-4">IQBoost</span>
        </Link>

        {/* Burger menu */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item mx-2">
              <button
                className={`nav-link fw-semibold fs-5 btn btn-link ${
                  scrolled ? "text-dark" : "text-white"
                }`}
                onClick={() => scrollToSection("courses")}
              >
                Courses
              </button>
            </li>
            <li className="nav-item mx-2">
              <button
                className={`nav-link fw-semibold fs-5 btn btn-link ${
                  scrolled ? "text-dark" : "text-white"
                }`}
                onClick={() => scrollToSection("features")}
              >
                Features
              </button>
            </li>
            <li className="nav-item mx-2">
              <button
                className={`nav-link fw-semibold fs-5 btn btn-link ${
                  scrolled ? "text-dark" : "text-white"
                }`}
                onClick={() => scrollToSection("contact")}
              >
                Contact
              </button>
            </li>
          </ul>

          {/* Login button */}
          <div className="d-flex ms-3">
            <Link
              className={`btn fw-bold ${
                scrolled ? "btn-dark text-white" : "text-white"
              }`}
              style={{
                background: scrolled
                  ? "#000"
                  : "linear-gradient(90deg, #a044ff 0%, #ff6a88 50%, #ff9966 100%)",
                border: "none",
                borderRadius: "30px",
                padding: "8px 20px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                transition: "all 0.4s ease-in-out",
              }}
              to="/login"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
