const crypto = require('crypto');
const express = require('express');
const router = express.Router();
const accesoFisicoController = require('../controllers/accesoFisico.controller');
const verificarToken = require('../middlewares/auth.middleware');
const permitirRoles = require('../middlewares/rol.middleware');
const ROLES = require('../utils/roles');
const { rateLimit } = require('express-rate-limit');

const limiteIngreso = rateLimit({ windowMs: 60 * 1000, limit: 30, standardHeaders: 'draft-7', legacyHeaders: false });

function soloPantallaLocal(req, res, next) {
	const direccion = req.socket.remoteAddress;
	const origenes = [
		'http://localhost:5173',
		'http://127.0.0.1:5173',
		process.env.ORIGEN_PANTALLA_ACCESO
	].filter(Boolean);
	if (!['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(direccion) || !origenes.includes(req.get('origin'))) {
		return res.status(403).json({ error: 'Pantalla de ingreso no autorizada' });
	}
	next();
}

function tokenPantallaValido(recibido) {
	const esperado = process.env.PANTALLA_TOKEN;
	if (typeof recibido !== 'string') return false;
	const a = Buffer.from(recibido);
	const b = Buffer.from(esperado);
	return a.length === b.length && crypto.timingSafeEqual(a, b);
}

// En la nube (PANTALLA_TOKEN configurado) la pantalla se autoriza con su token;
// en local, sin token, solo se acepta el mismo equipo, como hasta ahora
function soloPantallaAutorizada(req, res, next) {
	if (!process.env.PANTALLA_TOKEN) return soloPantallaLocal(req, res, next);
	if (!tokenPantallaValido(req.get('x-pantalla-token'))) {
		return res.status(403).json({ error: 'Pantalla de ingreso no autorizada' });
	}
	next();
}

router.post('/pantalla/validar', soloPantallaAutorizada, limiteIngreso, accesoFisicoController.validarPantalla);
router.post('/validar', verificarToken, permitirRoles(ROLES.ADMIN, ROLES.EMPLEADO), accesoFisicoController.validar);
router.get('/historial', verificarToken, permitirRoles(ROLES.ADMIN, ROLES.EMPLEADO), accesoFisicoController.historial);

module.exports = router;
