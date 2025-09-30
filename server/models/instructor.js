const mongoose = require('mongoose');
const User = require('./user');

const instructorSchema = new mongoose.Schema({
    specialization: { type: String},               
    experienceYears: { type: Number },  
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }] ,// Reference to courses
    
    level: { 
        type: String
    },
    
    cv: { type: String},

   
    diploma: { type: String}
});


const Instructor = User.discriminator('Instructor', instructorSchema);

module.exports = Instructor;
