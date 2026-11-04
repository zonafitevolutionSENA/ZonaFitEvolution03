const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const limiteLogin = require('../middlewares/limiteLogin.middleware');

router.post('/login', limiteLogin, authController.login);

module.exports = router;
