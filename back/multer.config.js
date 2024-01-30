const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Définir le répertoire de destination
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        // Générer un nom de fichier unique en ajoutant un timestamp au nom d'origine
        const uniqueFilename = Date.now() + '-' + file.originalname;
        cb(null, uniqueFilename);
    }
});
const fileFilter = (req, file, cb) => {
    // Vérifier le type de fichier, par exemple, autoriser uniquement les images, les fichiers audio et les fichiers vidéo
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('audio/') || file.mimetype.startsWith('video/')) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only images, audio and video files are allowed.'));
    }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });
module.exports = upload;
