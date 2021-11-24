const express = require('express');
const userController = require('../controllers/user.controller');
const validate = require('../middlewares/validate');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.post('/register', validate('register'), userController.createUser);
router.post('/login', validate('login'), userController.loginUser);
router.get('/me', authenticate, userController.getCurrentUserLogged);

module.exports = router;
