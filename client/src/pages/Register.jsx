import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

function Register() {
  return (
    <div className="register-container d-flex align-items-center justify-content-center min-vh-100">
      {/* Animated Background Bubbles */}
      <div className="background-bubbles">
        <span className="bubble bubble1"></span>
        <span className="bubble bubble2"></span>
        <span className="bubble bubble3"></span>
        <span className="bubble bubble4"></span>
      </div>

      {/* Form Card */}
      <div className="register-card shadow-lg rounded-4 p-5">
        <h2 className="mb-4 text-center fw-bold">Create Account</h2>
        <form>
          <div className="mb-3 position-relative">
            <FaUser className="form-icon" />
            <input
              type="text"
              className="form-control ps-5"
              placeholder="Full Name"
            />
          </div>
          <div className="mb-3 position-relative">
            <FaEnvelope className="form-icon" />
            <input
              type="email"
              className="form-control ps-5"
              placeholder="Email"
            />
          </div>
          <div className="mb-3 position-relative">
            <FaLock className="form-icon" />
            <input
              type="password"
              className="form-control ps-5"
              placeholder="Password"
            />
          </div>
          <div className="mb-3 position-relative">
            <FaLock className="form-icon" />
            <input
              type="password"
              className="form-control ps-5"
              placeholder="Confirm Password"
            />
          </div>
          <button type="submit" className="btn w-100 fw-bold register-btn">
            Register
          </button>
          <p className="text-center mt-3">
            Already have an account?{" "}
            <Link to="/login" className="login-link">
              Login
            </Link>
          </p>
        </form>
      </div>

      {/* Styles */}
      <style jsx>{`
        .register-container {
          position: relative;
        }

        .background-bubbles {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          top: 0;
          left: 0;
          z-index: 0;
        }

        .bubble {
          position: absolute;
          border-radius: 50%;
          opacity: 0.3;
          animation: float 12s infinite;
        }

        .bubble1 {
          width: 150px;
          height: 150px;
          background: #ff6a88;
          top: 10%;
          left: 5%;
          animation-duration: 12s;
        }

        .bubble2 {
          width: 200px;
          height: 200px;
          background: #6a11cb;
          bottom: 15%;
          right: 10%;
          animation-duration: 15s;
        }

        .bubble3 {
          width: 100px;
          height: 100px;
          background: #ff9966;
          top: 40%;
          right: 30%;
          animation-duration: 18s;
        }

        .bubble4 {
          width: 180px;
          height: 180px;
          background: #ff6a88;
          bottom: 20%;
          left: 25%;
          animation-duration: 20s;
        }

        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(45deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
          }
        }

        .register-card {
          position: relative;
          z-index: 1;
          max-width: 450px;
          background: #fff;
        }

        .form-icon {
          position: absolute;
          top: 50%;
          left: 15px;
          transform: translateY(-50%);
          color: #6a11cb;
        }

        .register-btn {
          background: linear-gradient(90deg, #a044ff 0%, #ff6a88 50%, #ff9966 100%);
          color: #fff;
          padding: 10px;
          font-size: 16px;
          transition: all 0.3s ease-in-out;
        }

        .register-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }

        .login-link {
          color: #ff6a88;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}

export default Register;
