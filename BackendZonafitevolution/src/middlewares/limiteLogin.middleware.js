const { rateLimit, ipKeyGenerator } = require('express-rate-limit');

// Máximo de intentos fallidos de login por IP y correo en la ventana de tiempo.
// Los inicios de sesión correctos no cuentan. El frontend ya maneja la respuesta 429.
const VENTANA_MS = 15 * 60 * 1000;
const MAX_INTENTOS = 5;

const limiteLogin = rateLimit({
  windowMs: VENTANA_MS,
  limit: MAX_INTENTOS,
  skipSuccessfulRequests: true,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  keyGenerator: (req) => {
    const correo = String((req.body && req.body.correo) || '').trim().toLowerCase();
    return `${ipKeyGenerator(req.ip)}|${correo}`;
  },
  handler: (req, res) => {
    res.status(429).json({ error: 'Demasiados intentos de inicio de sesión. Inténtalo de nuevo más tarde.' });
  }
});

module.exports = limiteLogin;
