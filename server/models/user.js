// models/user.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Used for password hashing

// Base options for discriminator usage
const baseOptions = {
  discriminatorKey: 'itemtype', // Field used to distinguish between different user types (Student, Instructor, Admin, etc.)
  collection: 'items',          // Name of the MongoDB collection where all users and discriminators will be stored
};

// Main User schema
const UserSchema = new mongoose.Schema(
  {
    /**
     * @field name
     * @type String
     * @required true
     * @desc Full name of the user
     */
    name: { type: String, required: true, trim: true },

    /**
     * @field email
     * @type String
     * @required true
     * @unique true
     * @desc Email address, unique for authentication
     */
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },

    /**
     * @field password
     * @type String
     * @required true
     * @desc User password (hashed before saving)
     */
    password: { type: String, required: true },

    /**
     * @field phone
     * @type String
     * @desc Optional phone number for contact or 2FA
     */
    phone: { type: String },

    /**
     * @field otp
     * @type String
     * @desc One-Time Password (used for verification), max 6 characters
     */
    otp: { type: String, default:''},

    /**
     * @field verifyOtpExpireAt
     * @type Number
     * @desc Expiration timestamp for OTP verification
     */
    verifyOtpExpireAt: { type: Number, default: 0 },

    /**
     * @field resetOtp
     * @type String
     * @desc OTP used for password reset
     */
    resetOtp: { type: String,default:'' },

    /**
     * @field resetOtpExpireAt
     * @type Number
     * @desc Expiration timestamp for password reset OTP
     */
    resetOtpExpireAt: { type: Number, default: 0 },

    /**
     * @field refreshToken
     * @type String
     * @desc Token used to refresh JWT authentication
     */
    refreshToken: { type: String },

    /**
     * @field email_verified
     * @type Boolean
     * @default false
     * @desc Whether the user's email has been verified
     */
    email_verified: { type: Boolean, default: false }
  },
  baseOptions
);

/**
 * @middleware pre('save')
 * @desc Automatically hashes the password before saving a new user or updating the password
 */
UserSchema.pre("save", async function () {
  // Only hash if the password is new or modified
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

module.exports = mongoose.model('User', UserSchema);
