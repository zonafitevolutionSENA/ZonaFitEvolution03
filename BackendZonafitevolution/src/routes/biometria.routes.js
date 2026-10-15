const express = require('express');
const router = express.Router();
const biometriaController = require('../controllers/biometria.controller');
const validarBodyNoVacio = require('../middlewares/validation.middleware');
const verificarToken = require('../middlewares/auth.middleware');
const permitirRoles = require('../middlewares/rol.middleware');
const ROLES = require('../utils/roles');

router.post('/registrar', verificarToken, permitirRoles(ROLES.ADMIN, ROLES.EMPLEADO), validarBodyNoVacio, biometriaController.registrar);
router.post('/identificar', verificarToken, permitirRoles(ROLES.ADMIN, ROLES.EMPLEADO), validarBodyNoVacio, biometriaController.identificar);
router.delete('/:cliente_id', verificarToken, permitirRoles(ROLES.ADMIN), biometriaController.eliminar);

module.exports = router;
