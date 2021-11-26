const httpStatus = require('http-status');
const db = require('../models/index');
const ApiError = require('../utils/ApiError');

/**
 * Create a product
 * @param {object} productBody
 */
const createNewProduct = async (productBody) => {
  const category = await db.Category.findOne({
    where: { name: productBody.categoryName },
  });
  if (!category) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category is not existed');
  }
  const product = await category.createProduct({
    title: productBody.title,
    description: productBody.description,
    image: productBody.image,
    body: productBody.body,
  });

  return product;
};

/**
 * Get all products
 */
const getProducts = async () => {
  const products = await db.Product.findAll({
    order: [['createdAt', 'DESC']],
  });
  return products;
};

/**
 * Get a product by id
 * @param {string} id
 * @returns
 */
const getProductById = async (id) => {
  const product = await db.Product.findByPk(id);
  if (!product) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product is not existed');
  }

  return product;
};

/**
 * Update a product
 * @param {string} id
 * @param {Object} productBody
 */
const updateProductById = async (productBody, id) => {
  const product = await db.Product.findByPk(id);
  if (!product) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product is not existed');
  }
  const category = await db.Category.findOne({
    where: { name: productBody.categoryName },
  });

  if (!category) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category is not existed');
  }

  await product.update({
    categoryId: category.id,
    title: productBody.title,
    description: productBody.description,
    image: productBody.image,
    body: productBody.body,
  });
};

/**
 * Delete a product by id
 * @param {string} id
 */
const deleteProductById = async (id) => {
  const product = await db.Product.findByPk(id);
  if (!product) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product is not existed');
  }

  await db.Product.destroy({ where: { id } });
};

module.exports = {
  createNewProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
