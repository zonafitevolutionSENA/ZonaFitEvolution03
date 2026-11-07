const express = require('express');
const router = express.Router();
const accesoFisicoController = require('../controllers/accesoFisico.controller');
const verificarToken = require('../middlewares/auth.middleware');
const permitirRoles = require('../middlewares/rol.middleware');
const ROLES = require('../utils/roles');

router.post('/validar', verificarToken, permitirRoles(ROLES.ADMIN, ROLES.EMPLEADO), accesoFisicoController.validar);
router.get('/historial', verificarToken, permitirRoles(ROLES.ADMIN, ROLES.EMPLEADO), accesoFisicoController.historial);

module.exports = router;
