// middlewares/upload.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Créer les dossiers s'ils n'existent pas
const createFolders = () => {
  const folders = ['uploads/cv', 'uploads/diploma', 'uploads/images'];
  folders.forEach(folder => {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
  });
};
createFolders();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = 'uploads/';
    if (file.fieldname === 'cv') folder = 'uploads/cv/';
    else if (file.fieldname === 'diploma') folder = 'uploads/diploma/';
    else if (file.fieldname === 'image') folder = 'uploads/images/';
    
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

// Pas de filtre pour debug
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

module.exports = upload;