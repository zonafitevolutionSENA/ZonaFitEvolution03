const express = require('express');
const router = express.Router();
const usuarioRoutes = require('./usuario.routes');
const clienteRoutes = require('./cliente.routes');
const rolRoutes = require('./rol.routes');
const membresiaRoutes = require('./membresia.routes');
const authRoutes = require('./auth.routes');
const planRoutes = require('./plan.routes');
const biometriaRoutes = require('./biometria.routes');

router.use('/usuarios', usuarioRoutes);
router.use('/clientes', clienteRoutes);
router.use('/roles', rolRoutes);
router.use('/membresias', membresiaRoutes);
router.use('/auth', authRoutes);
router.use('/planes', planRoutes);
router.use('/biometria', biometriaRoutes);

module.exports = router;
