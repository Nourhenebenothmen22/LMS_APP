// controllers/courseController.js
const Course = require('../models/course');
const Instructor = require('../models/instructor');

/**
 * CourseMaster Controller
 * CRUD pour gérer les cours
 */

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const { title, description, code, instructor, startDate, endDate, credits } = req.body;
    
    // ✅ CORRECTION : Inclure le sous-dossier 'images' dans le chemin
const image = req.file ? `/uploads/images/${req.file.filename}` : undefined;

    const newCourse = await Course.create({
      title,
      description,
      code,
      instructor,
      startDate,
      endDate,
      credits,
      image
    });

    // Ajouter le cours à l'instructeur
    if (instructor) {
      await Instructor.findByIdAndUpdate(instructor, {
        $push: { courses: newCourse._id }
      });
    }

    res.status(201).json({ message: "Course created successfully", course: newCourse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating course", error });
  }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('instructor', 'name level diploma specialization') // ✅ Ajouter 'name' pour avoir le nom de l'instructeur
      .exec();
    
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error });
  }
};

// Get a single course by ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'name level diploma specialization') // ✅ Ajouter 'name'

    if (!course) return res.status(404).json({ message: "Course not found" });

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Error fetching course", error });
  }
};

// Update a course
// Update a course
exports.updateCourse = async (req, res) => {
  try {
    const { title, description, code, instructor, startDate, endDate, credits } = req.body;

    // Récupérer le cours avant update
    const oldCourse = await Course.findById(req.params.id);
    if (!oldCourse) return res.status(404).json({ message: "Course not found" });

    // Préparer les données de mise à jour
    const updateData = {
      title,
      description,
      code,
      instructor,
      startDate,
      endDate,
      credits
    };

    // Ajouter l'image si un nouveau fichier est uploadé
    if (req.file) {
      updateData.image = `/uploads/images/${req.file.filename}`;
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true } // ✅ Validation activée
    );

    // Mettre à jour la référence chez l'instructeur si nécessaire
    if (instructor && oldCourse.instructor?.toString() !== instructor) {
      // Retirer l'ancien cours de l'ancien instructeur
      if (oldCourse.instructor) {
        await Instructor.findByIdAndUpdate(oldCourse.instructor, {
          $pull: { courses: oldCourse._id }
        });
      }
      // Ajouter le cours au nouvel instructeur
      await Instructor.findByIdAndUpdate(instructor, {
        $push: { courses: updatedCourse._id }
      });
    }

    res.status(200).json({ message: "Course updated", course: updatedCourse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating course", error });
  }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);

    if (!deletedCourse) return res.status(404).json({ message: "Course not found" });

    // Retirer le cours des instructeurs
    if (deletedCourse.instructor) {
      await Instructor.findByIdAndUpdate(deletedCourse.instructor, {
        $pull: { courses: deletedCourse._id }
      });
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting course", error });
  }
};