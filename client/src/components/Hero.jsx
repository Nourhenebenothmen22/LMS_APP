import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaUserGraduate,
  FaClock,
  FaBook,
  FaCode,
  FaLaptopCode,
  FaCloud,
  FaChartLine,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import axios from "axios";
import "./Hero.css";

function Hero() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/courses", {
          withCredentials: true,
        });

        const rawCourses = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];

        const formattedCourses = rawCourses.map((course) => {
          let instructorName = course.instructor;
          if (course.instructor && typeof course.instructor === "object") {
            instructorName =
              course.instructor.name ||
              course.instructor.specialization ||
              course.instructor.level ||
              "Instructor";
          }

          const imageUrl = course.image
            ? `http://localhost:5000${
                course.image.startsWith("/uploads/image-")
                  ? course.image.replace(
                      "/uploads/image-",
                      "/uploads/images/image-"
                    )
                  : course.image
              }`
            : "";

          return {
            ...course,
            instructorName,
            imageUrl,
          };
        });

        setCourses(formattedCourses);
      } catch (error) {
        console.error("Error fetching courses, using mock data", error);

        setCourses([
          {
            _id: 1,
            title: "React for Beginners",
            description: "Learn the basics of React",
            code: "REACT101",
            instructorName: "John Doe",
            startDate: "2025-10-01",
            endDate: "2025-11-01",
            credits: 3,
            imageUrl: "https://picsum.photos/400/200?random=101",
          },
          {
            _id: 2,
            title: "Advanced Node.js",
            description: "Deep dive into Node.js",
            code: "NODE201",
            instructorName: "Jane Smith",
            startDate: "2025-10-15",
            endDate: "2025-12-15",
            credits: 4,
            imageUrl: "https://picsum.photos/400/200?random=102",
          },
          {
            _id: 3,
            title: "Python Data Science",
            description: "Analyze data with Python",
            code: "PYDS301",
            instructorName: "Alice Johnson",
            startDate: "2025-11-01",
            endDate: "2025-12-31",
            credits: 3,
            imageUrl: "https://picsum.photos/400/200?random=103",
          },
        ]);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <section
  className="hero-section d-flex flex-column justify-content-center align-items-center text-center text-white"
  style={{
    minHeight: "80vh",
    position: "relative",
    overflow: "hidden",
    padding: "0 20px",
    background: "linear-gradient(120deg, #6a11cb 0%, #ff6a88 50%, #ff9966 100%)",
  }}
>
  {/* Animated Shapes */}
  <div className="hero-shapes">
    <span className="shape shape1"></span>
    <span className="shape shape2"></span>
    <span className="shape shape3"></span>
  </div>

  <h1 className="fw-bold display-4 mb-3 hero-title">Learn Without Limits</h1>
  <p className="lead mb-4 hero-subtitle">
    Unlock the skills of tomorrow with our interactive online courses
  </p>

  <div className="search-container d-flex shadow rounded-pill overflow-hidden" style={{ maxWidth: "600px", width: "100%", transition: "all 0.3s" }}>
    <input
      type="text"
      className="form-control border-0 ps-3"
      placeholder="What do you want to master today?"
      style={{ transition: "all 0.3s", minHeight: "50px" }}
    />
    <button
      className="btn text-white d-flex align-items-center px-4 hero-btn"
      style={{
        background: "linear-gradient(90deg, #a044ff 0%, #ff6a88 50%, #ff9966 100%)",
        borderRadius: "0",
        fontWeight: "bold",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <FaSearch className="me-2" /> Explore
    </button>
  </div>

  <style jsx>{`
    .hero-title {
      animation: fadeUp 1s ease forwards;
    }
    .hero-subtitle {
      animation: fadeUp 1.2s ease forwards;
    }
    .hero-btn:hover {
      transform: scale(1.05);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    }
    @keyframes fadeUp {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .hero-shapes {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      overflow: hidden;
      z-index: 0;
    }
    .shape {
      position: absolute;
      border-radius: 50%;
      opacity: 0.3;
      animation: float 10s infinite;
    }
    .shape1 {
      width: 200px;
      height: 200px;
      background: #ff6a88;
      top: 10%;
      left: 5%;
      animation-duration: 12s;
    }
    .shape2 {
      width: 300px;
      height: 300px;
      background: #6a11cb;
      bottom: 5%;
      right: 10%;
      animation-duration: 15s;
    }
    .shape3 {
      width: 150px;
      height: 150px;
      background: #ff9966;
      top: 40%;
      right: 30%;
      animation-duration: 18s;
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
  `}</style>
</section>


      {/* Features Section */}
      <section
        id="features"
        className="py-5 text-center"
        style={{ background: "#fff5f8" }}
      >
        <div className="container">
          <h2
            className="mb-5 fw-bold"
            style={{
              background: "linear-gradient(90deg, #a044ff, #ff6a88, #ff9966)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "gradientSlide 3s ease infinite",
            }}
          >
            ✨ Why Choose Us
          </h2>
          <div className="row">
            <div className="col-md-3 mb-4">
              <div className="feature-card p-4 shadow-sm rounded">
                <FaLaptopCode size={40} className="mb-3 text-primary" />
                <h5 className="mb-2">Expert Instructors</h5>
                <p>Learn from industry professionals and university experts.</p>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="feature-card p-4 shadow-sm rounded">
                <FaCloud size={40} className="mb-3 text-success" />
                <h5 className="mb-2">Cloud & DevOps</h5>
                <p>Hands-on training in cloud technologies and DevOps pipelines.</p>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="feature-card p-4 shadow-sm rounded">
                <FaChartLine size={40} className="mb-3 text-warning" />
                <h5 className="mb-2">Data Analytics</h5>
                <p>Power BI, Tableau, and advanced analytics skills for real projects.</p>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="feature-card p-4 shadow-sm rounded">
                <FaCode size={40} className="mb-3 text-danger" />
                <h5 className="mb-2">Software Engineering</h5>
                <p>Master software design, patterns, and modern development workflows.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-5" style={{ background: "#f8f9fa" }}>
        <div className="container">
          <h2
            className="text-center mb-5 fw-bold course-title"
            style={{
              background: "linear-gradient(90deg, #a044ff, #ff6a88, #ff9966)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "gradientSlide 3s ease infinite",
            }}
          >
            🚀 Explore Our Amazing Courses
          </h2>
          <div className="row">
            {courses.map((course) => (
              <div key={course._id} className="col-md-4 mb-4">
                <div
                  className="card h-100 shadow-sm course-card"
                  style={{ transition: "transform 0.3s" }}
                >
                  {course.imageUrl && (
                    <img
                      src={course.imageUrl}
                      alt={course.title}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  )}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{course.title}</h5>
                    <p className="card-text flex-grow-1">{course.description}</p>
                    <ul className="list-unstyled mb-3">
                      <li>
                        <FaCode className="me-2 text-primary" />
                        <strong>Code:</strong> {course.code || "N/A"}
                      </li>
                      <li>
                        <FaUserGraduate className="me-2 text-success" />
                        <strong>Instructor:</strong> {course.instructorName || "Unknown"}
                      </li>
                      <li>
                        <FaClock className="me-2 text-warning" />
                        <strong>Duration:</strong>{" "}
                        {new Date(course.startDate).toLocaleDateString()} -{" "}
                        {new Date(course.endDate).toLocaleDateString()}
                      </li>
                      <li>
                        <FaBook className="me-2 text-danger" />
                        <strong>Credits:</strong> {course.credits}
                      </li>
                    </ul>
                    <button
                      className="btn btn-primary mt-auto"
                      style={{
                        background:
                          "linear-gradient(90deg, #a044ff 0%, #ff6a88 50%, #ff9966 100%)",
                        border: "none",
                        transition: "all 0.3s",
                      }}
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-5" style={{ background: "#fff5f8" }}>
        <div className="container">
          <h2
            className="text-center mb-5 fw-bold"
            style={{
              background: "linear-gradient(90deg, #a044ff, #ff6a88, #ff9966)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "gradientSlide 3s ease infinite",
            }}
          >
            📬 Contact Us
          </h2>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form className="shadow-sm p-4 rounded bg-white">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input type="text" className="form-control" id="name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input type="email" className="form-control" id="email" />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea className="form-control" id="message" rows="4"></textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  style={{
                    background:
                      "linear-gradient(90deg, #a044ff 0%, #ff6a88 50%, #ff9966 100%)",
                    border: "none",
                  }}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}

export default Hero;
