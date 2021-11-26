const httpStatus = require('http-status');
const asyncHandler = require('../middlewares/async');
const categoryService = require('../services/category.service');

/**
 * @desc Create a category
 * @route POST /api/v1/category
 * @access Private
 */
const createCategory = asyncHandler(async (req, res) => {
  await categoryService.createCategory(req.body);

  res.status(httpStatus.CREATED).json({});
});

/**
 * @desc Get all categories
 * @route GET /api/v1/category
 * @access Public
 */
const getCategories = asyncHandler(async (req, res) => {
  const categories = await categoryService.getCategories();

  res.status(httpStatus.OK).json({ categories });
});

/**
 * @desc Get a category
 * @route GET /api/v1/category/:id
 * @access Public
 */
const getCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.id);

  res.status(httpStatus.OK).json({ category });
});

/**
 * @desc Update a category
 * @route UPDATE /api/v1/category/:id
 * @access Private
 */
const updateCategory = asyncHandler(async (req, res) => {
  await categoryService.updateCategoryById(req.params.id, req.body);

  res.status(httpStatus.OK).json({});
});

/**
 * @desc Delte a category
 * @route DELETE /api/v1/category/:id
 * @access Private
 */
const deleteCategory = asyncHandler(async (req, res) => {
  await categoryService.deleteCategoryById(req.params.id);

  res.status(httpStatus.OK).json({});
});

/**
 * @desc Get all products by category
 * @route GET /api/v1/category/product/:categoryId
 * @access Public
 */
const getProductsByCategory = asyncHandler(async (req, res) => {
  const categories = await categoryService.getProductsByCategory(
    req.params.categoryId
  );

  res.status(httpStatus.OK).json({ categories });
});

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  getProductsByCategory,
};
