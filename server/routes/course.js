const express=require('express')
const router=express.Router()
const courseController=require('../controllers/courseController')
const upload=require('../middlewares/upload')
// Create a new course (avec image)
router.post('/', upload.single('image'), courseController.createCourse);

// Get all courses
router.get('/', courseController.getAllCourses);

// Get a single course by ID
router.get('/:id', courseController.getCourseById);

// Update a course (avec possibilité de changer l'image)
router.put('/:id', upload.single('image'), courseController.updateCourse);

// Delete a course
router.delete('/:id', courseController.deleteCourse);
module.exports=router