const httpStatus = require('http-status');
const asyncHandler = require('../middlewares/async');
const productService = require('../services/product.service');

/**
 * @desc Create a product
 * @route POST /api/v1/product
 * @access Private
 */
const createProduct = asyncHandler(async (req, res) => {
  await productService.createNewProduct(req.body);

  res.status(httpStatus.CREATED).json({});
});

/**
 * @desc Get all products
 * @route GET /api/v1/product
 * @access Public
 */
const getProducts = asyncHandler(async (req, res) => {
  const products = await productService.getProducts(req);

  res.status(httpStatus.OK).json(products);
});

/**
 * @desc Get a product
 * @route GET /api/v1/product/:id
 * @access Public
 */
const getProductById = asyncHandler(async (req, res) => {
  const product = await productService.getProductById(req.params.id);

  res.status(httpStatus.OK).json({ product });
});

/**
 * @desc Update a product
 * @route PUT /api/v1/product/:id
 * @access Private
 */
const updateProductById = asyncHandler(async (req, res) => {
  await productService.updateProductById(req.body, req.params.id);

  res.status(httpStatus.OK).json({});
});

/**
 * @desc Delete a product
 * @route DELETE /api/v1/product/:id
 * @access Private
 */
const deleteProductById = asyncHandler(async (req, res) => {
  await productService.deleteProductById(req.params.id);

  res.status(httpStatus.OK).json({});
});

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
