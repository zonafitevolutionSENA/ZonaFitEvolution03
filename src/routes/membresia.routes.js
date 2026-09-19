const express = require('express');
const router = express.Router();
const membresiaController = require('../controllers/membresia.controller');
const validarBodyNoVacio = require('../middlewares/validation.middleware');
const verificarToken = require('../middlewares/auth.middleware');
const permitirRoles = require('../middlewares/rol.middleware');
const ROLES = require('../utils/roles');

router.post('/', verificarToken, permitirRoles(ROLES.ADMIN, ROLES.EMPLEADO), validarBodyNoVacio, membresiaController.crear);
router.get('/', verificarToken, permitirRoles(ROLES.ADMIN, ROLES.EMPLEADO), membresiaController.listar);
router.get('/:id', verificarToken, permitirRoles(ROLES.ADMIN, ROLES.EMPLEADO), membresiaController.obtenerPorId);
router.patch('/:id/estado', verificarToken, permitirRoles(ROLES.ADMIN, ROLES.EMPLEADO), validarBodyNoVacio, membresiaController.actualizarEstado);
router.delete('/:id', verificarToken, permitirRoles(ROLES.ADMIN), membresiaController.eliminar); // solo Admin elimina

module.exports = router;
