const express = require('express');
const router = express.Router();
const planController = require('../controllers/plan.controller');
const validarBodyNoVacio = require('../middlewares/validation.middleware');
const verificarToken = require('../middlewares/auth.middleware');
const permitirRoles = require('../middlewares/rol.middleware');
const ROLES = require('../utils/roles');

router.post('/', verificarToken, permitirRoles(ROLES.ADMIN), validarBodyNoVacio, planController.crear);
router.get('/', verificarToken, permitirRoles(ROLES.ADMIN, ROLES.EMPLEADO), planController.listar);
router.get('/:id', verificarToken, permitirRoles(ROLES.ADMIN, ROLES.EMPLEADO), planController.obtenerPorId);
router.put('/:id', verificarToken, permitirRoles(ROLES.ADMIN), validarBodyNoVacio, planController.actualizar);
router.patch('/:id/desactivar', verificarToken, permitirRoles(ROLES.ADMIN), planController.desactivar);
router.delete('/:id', verificarToken, permitirRoles(ROLES.ADMIN), planController.eliminar);

module.exports = router;
