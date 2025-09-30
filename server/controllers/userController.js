// controllers/userController.js

const User = require("../models/user");
const findUserByEmail = require("../services/Auth");
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken')

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // 1️⃣ Check if the user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // 2️⃣ Create new user
    const user = new User({
      name,
      email,
      password, // will be hashed automatically by pre("save") middleware
      phone,
    });

    await user.save();

    // 3️⃣ Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // 4️⃣ Set token in cookie (httpOnly for security)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // secure cookie in prod
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // 5️⃣ Exclude password from response
    const { password: pw, ...userData } = user.toObject();

    res.status(201).json({
      message: "User registered successfully",
      user: userData,
      token, // 👈 facultatif si tu veux aussi côté client
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Login user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = findUserByEmail(email);
    if (!existingUser) {
      return res.status(400).json({ message: "Email not exist" });
    }
    // 2️⃣ Compare password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const token=jwt.sign({data:{email:existingUser.email,id:existingUser._id}})
    // 3️⃣ Exclude password from response
    const { password: pw, ...userData } = existingUser.toObject();
    console.log(userData)
     res.status(200).json({
      message: 'Login successful',
      user: userData,
      token
    });
  } catch (error) {}
};

/**
 * @desc    Logout user (invalidate token or clear cookie)
 * @route   POST /api/auth/logout
 * @access  Private
 */
const logoutUser = (req, res) => {};

/**
 * @desc    Refresh authentication token
 * @route   GET /api/auth/refresh
 * @access  Private
 */
const refreshToken = (req, res) => {};

/**
 * @desc    Request password reset
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
const forgotPassword = (req, res) => {};

/**
 * @desc    Reset password
 * @route   PUT /api/auth/reset-password/:token
 * @access  Public
 */
const resetPassword = (req, res) => {};

/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Admin
 */
const getUsers = (req, res) => {};

// ✅ Export all controllers
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  forgotPassword,
  resetPassword,
  getUsers,
};
