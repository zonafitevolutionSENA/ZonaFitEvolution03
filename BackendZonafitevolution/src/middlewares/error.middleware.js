const log = require('../utils/logger')('errores');

function manejarErrores(err, req, res, next) {
  // Los errores de dominio llevan un mensaje pensado para el usuario, aunque sean 5xx
  // (por ejemplo, 503 "Lector desconectado" cuando el agente del lector no está conectado)
  if (err.name === 'ErrorDominio' || (err.status && err.status < 500)) {
    return res.status(err.status).json({ error: err.message });
  }

  // La traza solo va al log del servidor; al cliente nunca se le muestra
  log.error(err.message || 'Error inesperado', { metodo: req.method, ruta: req.originalUrl, traza: err.stack });
  res.status(500).json({ error: 'Error interno del servidor' });
}

module.exports = manejarErrores;
