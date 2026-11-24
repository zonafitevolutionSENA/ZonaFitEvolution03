const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const limiteLogin = require('../middlewares/limiteLogin.middleware');
const { limiteSolicitud, limiteVerificacion, limiteRestablecer } = require('../middlewares/limiteRecuperacion.middleware');

router.post('/login', limiteLogin, authController.login);

// Olvidé mi contraseña: 1) pedir código al correo, 2) verificar el código, 3) nueva contraseña
router.post('/recuperar', limiteSolicitud, authController.solicitarCodigo);
router.post('/recuperar/verificar', limiteVerificacion, authController.verificarCodigo);
router.post('/recuperar/restablecer', limiteRestablecer, authController.restablecerContrasena);

module.exports = router;
