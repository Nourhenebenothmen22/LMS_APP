// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
} = require('../controllers/userController');
const verifyToken = require('../middlewares/auth');

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', registerUser);

/**
 * @route   POST /api/auth/login
 * @desc    Login user and return token
 * @access  Public
 */
router.post('/login', loginUser);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user (invalidate token or clear cookie)
 * @access  Private
 */
router.post('/logout',verifyToken, logoutUser);

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Request a password reset link
 * @access  Public
 */
router.post('/forgot-password', forgotPassword);

/**
 * @route   PUT /api/auth/reset-password/:token
 * @desc    Reset user password using token
 * @access  Public
 */
router.put('/reset-password/:token', resetPassword);

module.exports = router;
