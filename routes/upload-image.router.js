const express = require('express');
const uploadImageController = require('../controllers/upload-image.controller');
const authenticate = require('../middlewares/authenticate');
const uploader = require('../middlewares/upload-image');

const router = express.Router();

router
  .route('/upload-image')
  .post(
    authenticate,
    uploader.single('image'),
    uploadImageController.uploadImage
  )
  .get(uploadImageController.getImages);
router.delete(
  '/upload-image/:id',
  authenticate,
  uploadImageController.deleteImage
);

module.exports = router;
