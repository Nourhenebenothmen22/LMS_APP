import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container container py-5">
        <div className="footer-grid">
          {/* About */}
          <div className="footer-item">
            <h4>About Us</h4>
            <p>
              Learning Platform is your gateway to mastering modern skills
              in Software, DevOps, Data Analytics, and more. Join thousands
              of learners today!
            </p>
          </div>

          {/* Contact */}
          <div className="footer-item">
            <h4>Contact</h4>
            <p><FaMapMarkerAlt className="icon" /> 123 Learning St, Edu City</p>
            <p><FaPhone className="icon" /> +123 456 7890</p>
            <p><FaEnvelope className="icon" /> info@learningplatform.com</p>
          </div>

          {/* Quick Links */}
          <div className="footer-item">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#courses">Courses</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#about">About</a></li>
            </ul>
          </div>

          {/* Social */}
          <div className="footer-item">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaLinkedinIn /></a>
              <a href="#"><FaInstagram /></a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom text-center py-3">
        &copy; {new Date().getFullYear()} Learning Platform. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
