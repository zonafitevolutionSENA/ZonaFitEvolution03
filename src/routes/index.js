const express = require('express');
const router = express.Router();
const usuarioRoutes = require('./usuario.routes');
const clienteRoutes = require('./cliente.routes');
const rolRoutes = require('./rol.routes');
const membresiaRoutes = require('./membresia.routes');
const authRoutes = require('./auth.routes');

router.use('/usuarios', usuarioRoutes);
router.use('/clientes', clienteRoutes);
router.use('/roles', rolRoutes);
router.use('/membresias', membresiaRoutes);
router.use('/auth', authRoutes);

module.exports = router;
