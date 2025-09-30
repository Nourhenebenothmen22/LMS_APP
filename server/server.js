// server.js
// Main entry point for the LMS API

// ---------------------------
// 1️⃣ Import Dependencies
// ---------------------------
require('dotenv').config();          
const express = require('express');  
const morgan = require('morgan');    
const rateLimit = require('express-rate-limit'); 
const cookieParser = require('cookie-parser');   
const cors = require('cors');        
const connectDB = require('./config/db'); 
const path = require('path');

// ---------------------------
// 2️⃣ Initialize Express App
// ---------------------------
const app = express();

// ---------------------------
// 3️⃣ Middleware
// ---------------------------
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(morgan('dev'));

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Serve static files
app.use("/uploads/images", express.static(path.join(__dirname, "uploads/images")));
app.use("/uploads/cv", express.static(path.join(__dirname, "uploads/cv")));
app.use("/uploads/diploma", express.static(path.join(__dirname, "uploads/diploma")));

// ---------------------------
// 4️⃣ Database Connection
// ---------------------------
connectDB();

// ---------------------------
// 5️⃣ Routes
// ---------------------------
app.get('/', (req, res) => {
  res.send('LMS API is running 🚀');
});

app.use('/api/users', require('./routes/user'));
app.use('/api/courses', require('./routes/course'));
app.use('/api/instructors', require('./routes/instructor')); 

// ---------------------------
// 6️⃣ Start Server
// ---------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});