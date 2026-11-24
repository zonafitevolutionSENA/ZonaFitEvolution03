const { rateLimit, ipKeyGenerator } = require('express-rate-limit');

// Límites de "olvidé mi contraseña": evitan llenar de correos una bandeja y adivinar códigos
const VENTANA_MS = 15 * 60 * 1000;

function crearLimite(limite, mensaje, claveConCorreo = false) {
  return rateLimit({
    windowMs: VENTANA_MS,
    limit: limite,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    keyGenerator: (req) => {
      const ip = ipKeyGenerator(req.ip);
      if (!claveConCorreo) return ip;
      const correo = String((req.body && req.body.correo) || '').trim().toLowerCase();
      return `${ip}|${correo}`;
    },
    handler: (req, res) => res.status(429).json({ error: mensaje })
  });
}

const MENSAJE_SOLICITUD = 'Ya pediste varios códigos. Espera unos minutos antes de solicitar otro.';
const MENSAJE_INTENTOS = 'Demasiados intentos. Espera unos minutos e inténtalo de nuevo.';

const limiteSolicitud = [
  crearLimite(10, MENSAJE_SOLICITUD),
  crearLimite(3, MENSAJE_SOLICITUD, true)
];
const limiteVerificacion = crearLimite(20, MENSAJE_INTENTOS);
const limiteRestablecer = crearLimite(10, MENSAJE_INTENTOS);

module.exports = { limiteSolicitud, limiteVerificacion, limiteRestablecer };
