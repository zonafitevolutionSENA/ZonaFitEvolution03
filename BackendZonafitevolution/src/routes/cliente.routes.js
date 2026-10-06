const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/cliente.controller');
const validarBodyNoVacio = require('../middlewares/validation.middleware');
const verificarToken = require('../middlewares/auth.middleware');
const permitirRoles = require('../middlewares/rol.middleware');
const ROLES = require('../utils/roles');

router.post('/', verificarToken, permitirRoles(ROLES.ADMIN, ROLES.EMPLEADO), validarBodyNoVacio, clienteController.registrar);
router.get('/', verificarToken, permitirRoles(ROLES.ADMIN, ROLES.EMPLEADO), clienteController.listar);
router.get('/:id', verificarToken, permitirRoles(ROLES.ADMIN, ROLES.EMPLEADO), clienteController.obtenerPorId);
router.put('/:id', verificarToken, permitirRoles(ROLES.ADMIN, ROLES.EMPLEADO), validarBodyNoVacio, clienteController.actualizar);
router.delete('/:id', verificarToken, permitirRoles(ROLES.ADMIN), clienteController.eliminar); // solo Admin elimina

module.exports = router;
