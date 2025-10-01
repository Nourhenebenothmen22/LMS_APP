import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../assets/login.png";
import { FaUser, FaLock } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthStore from "../store/authStore";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const data = await login({ email: form.email, password: form.password });
    
    console.log("Full response:", data);
    console.log("User object:", data.user);
    console.log("ItemType:", data.user?.itemtype);

    // Solution robuste : essayer plusieurs sources pour le rôle
    let role = data.user?.itemtype?.toLowerCase();
    
    // Si itemtype n'est pas dans user, essayer de décoder le token
    if (!role && data.token) {
      try {
        const tokenPayload = JSON.parse(atob(data.token.split('.')[1]));
        role = tokenPayload.itemtype?.toLowerCase();
        console.log("Role from token:", role);
      } catch (tokenError) {
        console.error("Error decoding token:", tokenError);
      }
    }

    if (!role) {
      toast.error("User role is not defined. Please contact support.");
      return;
    }

    toast.success("Login successful!", { autoClose: 2000 });

    // Navigation selon le rôle
    switch (role) {
      case "instructor":
        navigate("/instructor-dashboard");
        break;
      case "admin":
        navigate("/admin-dashboard");
        break;
      case "student":
        navigate("/student-dashboard");
        break;
      default:
        console.warn("Unknown user role:", role);
        toast.error(`Unknown user role: ${role}. Redirecting to home.`);
        navigate("/");
    }
  } catch (err) {
    toast.error(err.response?.data?.message || "Login failed!", { autoClose: 3000 });
    console.error(err);
  }
};
  return (
    <div className="login-container d-flex align-items-center justify-content-center min-vh-100">
      {/* ToastContainer une seule fois */}
      <ToastContainer position="top-right" />

      {/* Background bubbles */}
      <div className="background-bubbles">
        <span className="bubble bubble1"></span>
        <span className="bubble bubble2"></span>
        <span className="bubble bubble3"></span>
        <span className="bubble bubble4"></span>
      </div>

      <div className="login-card shadow-lg rounded-4 overflow-hidden row">
        <div className="col-md-6 d-none d-md-block p-0">
          <img src={loginImage} alt="Login" className="img-fluid h-100 w-100 object-cover" />
        </div>

        <div className="col-md-6 p-5 d-flex flex-column justify-content-center">
          <h2 className="mb-4 text-center fw-bold" style={{ color: "#6a11cb" }}>Welcome Back!</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 position-relative">
              <FaUser className="form-icon" />
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
            <button type="submit" className="btn w-100 fw-bold login-btn">Login</button>
            <p className="text-center mt-3">
              Don't have an account? <Link to="/register" className="signup-link">Sign up</Link>
            </p>
          </form>
        </div>
      </div>

      <style jsx>{`
        .login-container { position: relative; background: #f8f9fa; }
        .login-card { max-width: 900px; position: relative; z-index: 1; }
        .form-icon { position: absolute; top: 50%; left: 15px; transform: translateY(-50%); color: #6a11cb; }
        .login-btn { background: linear-gradient(90deg, #a044ff 0%, #ff6a88 50%, #ff9966 100%); color: #fff; padding: 10px; font-size: 16px; transition: all 0.3s ease-in-out; }
        .login-btn:hover { transform: scale(1.05); box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3); }
        .signup-link { color: #ff6a88; font-weight: bold; }
        .background-bubbles { position: absolute; width: 100%; height: 100%; overflow: hidden; top: 0; left: 0; z-index: 0; }
        .bubble { position: absolute; border-radius: 50%; opacity: 0.3; animation: float 12s infinite; }
        .bubble1 { width: 150px; height: 150px; background: #ff6a88; top: 10%; left: 5%; animation-duration: 12s; }
        .bubble2 { width: 200px; height: 200px; background: #6a11cb; bottom: 15%; right: 10%; animation-duration: 15s; }
        .bubble3 { width: 100px; height: 100px; background: #ff9966; top: 40%; right: 30%; animation-duration: 18s; }
        .bubble4 { width: 180px; height: 180px; background: #ff6a88; bottom: 20%; left: 25%; animation-duration: 20s; }
        @keyframes float { 0% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(45deg); } 100% { transform: translateY(0) rotate(0deg); } }
      `}</style>
    </div>
  );
}

export default Login;
