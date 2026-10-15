const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rol.controller');
const verificarToken = require('../middlewares/auth.middleware');
const permitirRoles = require('../middlewares/rol.middleware');
const ROLES = require('../utils/roles');

router.get('/', verificarToken, permitirRoles(ROLES.ADMIN), rolController.listar);

module.exports = router;
