const httpStatus = require('http-status');
const asyncHandler = require('../middlewares/async');
const uploadImageService = require('../services/upload-image.service');

/**
 * @desc Upload a image to drive
 * @route POST /api/v1/upload-image
 * @access Private
 */
const uploadImage = asyncHandler(async (req, res) => {
  const image = await uploadImageService.uploadFile(req.file);

  res.status(httpStatus.CREATED).json(image);
});

/**
 * @desc Get all images
 * @route GET /api/v1/upload-image
 * @access Public
 */
const getImages = asyncHandler(async (req, res) => {
  const images = await uploadImageService.getAllImages();

  res.status(httpStatus.OK).json({ images: images.files });
});

/**
 * @desc Delete a image from drive
 * @route DELETE /api/v1/upload-image/:id
 * @access Private
 */
const deleteImage = asyncHandler(async (req, res) => {
  await uploadImageService.deleteFile(req.params.id);

  res.status(httpStatus.OK).json({});
});

module.exports = { uploadImage, deleteImage, getImages };
