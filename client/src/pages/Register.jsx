import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import useAuthStore from "../store/authStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    itemtype: "Student",
  });

  const register = useAuthStore((state) => state.register);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
        itemtype: form.itemtype,
      });
      toast.success("Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-container d-flex align-items-center justify-content-center min-vh-100">
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />

      {/* Background bubbles */}
      <div className="background-bubbles">
        <span className="bubble bubble1"></span>
        <span className="bubble bubble2"></span>
        <span className="bubble bubble3"></span>
        <span className="bubble bubble4"></span>
      </div>

      {/* Form Card */}
      <div className="register-card shadow-lg rounded-4 p-5">
        <h2 className="mb-4 text-center fw-bold">Create Account</h2>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3 position-relative">
            <FaUser className="form-icon" />
            <input
              type="text"
              name="name"
              className="form-control ps-5"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3 position-relative">
            <FaEnvelope className="form-icon" />
            <input
              type="email"
              name="email"
              className="form-control ps-5"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3 position-relative">
            <FaLock className="form-icon" />
            <input
              type="password"
              name="password"
              className="form-control ps-5"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-3 position-relative">
            <FaLock className="form-icon" />
            <input
              type="password"
              name="confirmPassword"
              className="form-control ps-5"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* Role selector */}
          <div className="mb-3 position-relative">
            <FaUser className="form-icon" style={{ top: "40%" }} />
            <select
              name="itemtype"
              className="form-control ps-5 role-select"
              value={form.itemtype}
              onChange={handleChange}
            >
              <option value="Student">Student</option>
              <option value="Instructor">Instructor</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn w-100 fw-bold register-btn"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
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
          background: linear-gradient(
            90deg,
            #a044ff 0%,
            #ff6a88 50%,
            #ff9966 100%
          );
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
