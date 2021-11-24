const express = require('express');
const userController = require('../controllers/user.controller');
const validate = require('../middlewares/validate');

const router = express.Router();

router.post('/register', validate('register'), userController.createUser);
router.post('/login', validate('login'), userController.loginUser);

module.exports = router;
