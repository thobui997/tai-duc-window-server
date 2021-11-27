const multer = require('multer');

const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
    return cb(new Error('Ảnh không đúng định dạng'));
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploader = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1 * 1024 * 1024, // limiting files size to 1 MB
  },
});

module.exports = uploader;
