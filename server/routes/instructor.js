// routes/instructor.js
const express = require('express');
const router = express.Router();
const instructorController = require('../controllers/instructorController');
const upload = require('../middlewares/upload');
const verifyToken=require('../middlewares/auth')

router.post(
  '/',
  upload.fields([
    { name: "cv", maxCount: 1 },
    { name: "diploma", maxCount: 1 }
  ]),
  instructorController.enrollInstructor
);


// Lister tous les instructeurs
router.get('/', instructorController.listInstructors);

// Obtenir le profil d'un instructeur spécifique
router.get('/:id',verifyToken, instructorController.getInstructorProfile);

// Mettre à jour le profil d'un instructeur
router.put('/:id', upload.fields([
  { name: 'cv', maxCount: 1 },
  { name: 'diploma', maxCount: 1 }
]), instructorController.updateInstructorProfile);

// Supprimer un instructeur
router.delete('/:id', instructorController.removeInstructor);

// 🚨 AJOUTEZ CETTE ROUTE DE TEST
router.post('/test', upload.any(), (req, res) => {
  console.log('=== TEST ROUTE ===');
  console.log('Body:', req.body);
  console.log('Files:', req.files);
  
  res.json({
    success: true,
    message: 'Test route working!',
    body: req.body,
    files: req.files
  });
});

module.exports = router; // UNE SEULE FOIS À LA FIN