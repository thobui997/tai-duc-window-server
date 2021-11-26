const httpStatus = require('http-status');
const db = require('../models/index');
const ApiError = require('../utils/ApiError');

/**
 * Create a category
 * @param {object} categoryBody
 * @returns {Promis<Category>}
 */
const createCategory = async (categoryBody) => {
  const category = await db.Category.findOne({
    where: { name: categoryBody.name },
  });
  if (category) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category already taken');
  }

  return await db.Category.create(categoryBody);
};

/**
 * Get all categories
 * @returns {Promis<Categories>}
 */
const getCategories = async () => {
  return await db.Category.findAll({ order: [['name', 'ASC']] });
};

/**
 * Get a category by id
 * @param {string} id
 * @returns category
 */
const getCategoryById = async (id) => {
  const category = await db.Category.findByPk(id);
  if (!category) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category is not existed');
  }

  return category;
};

/**
 * Update a category
 * @param {string} id
 */
const updateCategoryById = async (id, categoryBody) => {
  const category = await db.Category.findByPk(id);
  if (!category) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category is not existed');
  }

  return await db.Category.update(
    { name: categoryBody.name },
    { where: { id } }
  );
};

/**
 * Delete a category
 * @param {string} id
 */
const deleteCategoryById = async (id) => {
  const category = await db.Category.findByPk(id);
  if (!category) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category is not existed');
  }

  await db.Category.destroy({ where: { id } });
};

/**
 * Get products by category
 * @param {string} categoryId
 * @returns
 */
const getProductsByCategory = async (categoryId) => {
  const category = await db.Category.findByPk(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category is not existed');
  }
  return await db.Category.findAll({
    include: [{ model: db.Product, as: 'products', nested: true }],
    raw: true,
  });
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
  getProductsByCategory,
};
