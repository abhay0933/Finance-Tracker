const express = require('express');
const users = require('../controllers/userController');
const router = express.Router();

router.post('/register-user', users.userRegister);
router.post('/login', users.userLogin);
router.post('/forgot-password', users.forgotPassword);
router.post('/reset-password', users.resetPassword);

module.exports = router;
