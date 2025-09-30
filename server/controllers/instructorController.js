const Instructor = require("../models/instructor");

exports.enrollInstructor = async (req, res) => {
  try {
    console.log('🎯 ENROLL - Body:', req.body);
    console.log('🎯 ENROLL - Files:', req.files);
    
    // Vérifier si les fichiers sont présents
    if (!req.files || !req.files['cv'] || !req.files['diploma']) {
      return res.status(400).json({
        message: "CV and Diploma files are required",
        receivedFiles: req.files ? Object.keys(req.files) : 'none'
      });
    }

    const {
      name,
      email,
      password,
      specialization,
      experienceYears,
      courses,
      level,
    } = req.body;

    const cvPath = `/uploads/cv/${req.files["cv"][0].filename}`;
    const diplomaPath = `/uploads/diploma/${req.files["diploma"][0].filename}`;

    const newInstructor = await Instructor.create({
      name,
      email,
      password,
      specialization: specialization || "General",
      experienceYears: parseInt(experienceYears) || 0,
      courses: courses ? JSON.parse(courses) : [],
      level: level || "Professor",
      cv: cvPath,
      diploma: diplomaPath,
    });

    res.status(201).json({
      message: "Instructor enrolled successfully",
      instructor: {
        id: newInstructor._id,
        name: newInstructor.name,
        email: newInstructor.email,
        specialization: newInstructor.specialization
      }
    });
  } catch (error) {
    console.error('❌ ENROLL ERROR:', error);
    res.status(500).json({ 
      message: "Error enrolling instructor", 
      error: error.message 
    });
  }
};

exports.listInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find().populate(
      "courses",
      "title code"
    ); // Peupler les cours avec titre et code
    res.status(200).json(instructors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching instructors", error });
  }
};

exports.getInstructorProfile = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id).populate(
      "courses",
      "title code description"
    );

    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    res.status(200).json(instructor);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching instructor profile", error });
  }
};

exports.updateInstructorProfile = async (req, res) => {
  try {
    const {
      specialization,
      experienceYears,
      courses,
      level,
      name,
      email,
      password,
    } = req.body;

    const updateData = {
      specialization,
      experienceYears,
      courses,
      level,
      name,
      email,
      password,
    };

    // Gestion des fichiers - seulement mettre à jour si nouveaux fichiers uploadés
    if (req.files) {
      if (req.files["cv"]) {
        updateData.cv = `/uploads/cv/${req.files["cv"][0].filename}`;
      }
      if (req.files["diploma"]) {
        updateData.diploma = `/uploads/diploma/${req.files["diploma"][0].filename}`;
      }
    }

    const updatedInstructor = await Instructor.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }).select("name email specialization experienceYears courses level cv diploma"); // <- Sélectionner uniquement ce que tu veux exposer

    

    if (!updatedInstructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    res.status(200).json({
      message: "Instructor updated successfully",
      instructor: updatedInstructor,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating instructor profile", error });
  }
};

exports.removeInstructor = async (req, res) => {
  try {
    const deletedInstructor = await Instructor.findByIdAndDelete(req.params.id);

    if (!deletedInstructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    res.status(200).json({
      message: "Instructor removed successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Error removing instructor", error });
  }
};
