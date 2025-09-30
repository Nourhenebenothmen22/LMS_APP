const mongoose = require('mongoose');
const User = require('../models/user');

const studentSchema = new mongoose.Schema({
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // Reference to courses
    level: { type: String},

});

const Student = User.discriminator('Student', studentSchema);

module.exports = Student;
