const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },          // Course name
    description: { type: String, trim: true },                    // Course description
    code: { type: String, required: true, unique: true },         // Unique course code
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' }, // Reference to the instructor
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],  // Enrolled students
    startDate: { type: Date },                                     // Course start date
    endDate: { type: Date },                                       // Course end date
    credits: { type: Number, default: 3 },                         // Course credits
    image: { type: String, trim: true }                            // URL or path to course image
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
