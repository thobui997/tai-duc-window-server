const express = require('express');
const productController = require('../controllers/product.controller');
const validate = require('../middlewares/validate');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router
  .route('/product')
  .post(authenticate, validate('product'), productController.createProduct)
  .get(productController.getProducts);

router
  .route('/product/:id')
  .get(productController.getProductById)
  .put(authenticate, validate('product'), productController.updateProductById)
  .delete(authenticate, productController.deleteProductById);

module.exports = router;
