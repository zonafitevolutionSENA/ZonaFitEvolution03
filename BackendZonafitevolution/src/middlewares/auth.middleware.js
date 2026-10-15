const jwt = require('jsonwebtoken');
const ErrorDominio = require('../utils/errores');

function verificarToken(req, res, next) {
  const [esquema, token] = (req.headers.authorization || '').split(' ');
  if (esquema !== 'Bearer' || !token) {
    return next(new ErrorDominio('Token de autenticación requerido', 401));
  }

  if (!process.env.JWT_SECRET) {
    return next(new Error('JWT_SECRET no está configurado'));
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = { id: payload.id, rol_id: payload.rol_id };
    next();
  } catch (error) {
    next(new ErrorDominio('Token inválido o expirado', 401));
  }
}

module.exports = verificarToken;
