const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');
const validarBodyNoVacio = require('../middlewares/validation.middleware');
const verificarToken = require('../middlewares/auth.middleware');
const permitirRoles = require('../middlewares/rol.middleware');
const ROLES = require('../utils/roles');

// La gestión del personal es exclusiva del Admin
router.post('/', verificarToken, permitirRoles(ROLES.ADMIN), validarBodyNoVacio, usuarioController.registrar);
router.get('/', verificarToken, permitirRoles(ROLES.ADMIN), usuarioController.listar);
router.get('/:id', verificarToken, permitirRoles(ROLES.ADMIN), usuarioController.obtenerPorId);
router.delete('/:id', verificarToken, permitirRoles(ROLES.ADMIN), usuarioController.eliminar);

module.exports = router;
