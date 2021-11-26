const express = require('express');
const categoryController = require('../controllers/category.controller');
const validate = require('../middlewares/validate');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router
  .route('/category')
  .post(authenticate, validate('category'), categoryController.createCategory)
  .get(categoryController.getCategories);

router
  .route('/category/:id')
  .get(categoryController.getCategory)
  .put(authenticate, validate('category'), categoryController.updateCategory)
  .delete(authenticate, categoryController.deleteCategory);

router.get(
  '/category/product/:categoryId',
  categoryController.getProductsByCategory
);

module.exports = router;
