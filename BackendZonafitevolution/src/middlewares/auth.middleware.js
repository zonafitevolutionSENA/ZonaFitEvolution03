const jwt = require('jsonwebtoken');
const ErrorDominio = require('../utils/errores');
const usuarioRepository = require('../repositories/usuario.repository');

async function verificarToken(req, res, next) {
  const [esquema, token] = (req.headers.authorization || '').split(' ');
  if (esquema !== 'Bearer' || !token) {
    return next(new ErrorDominio('Token de autenticación requerido', 401));
  }

  if (!process.env.JWT_SECRET) {
    return next(new Error('JWT_SECRET no está configurado'));
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return next(new ErrorDominio('Token inválido o expirado', 401));
  }

  // El token temporal de "olvidé mi contraseña" no sirve para entrar al sistema
  if (payload.proposito) {
    return next(new ErrorDominio('Token inválido o expirado', 401));
  }

  // La sesión deja de valer si el usuario ya no existe o cambió su contraseña después de iniciarla
  try {
    const sesion = await usuarioRepository.obtenerSesion(payload.id);
    const cambiada = sesion && sesion.contrasena_cambiada_en ? new Date(sesion.contrasena_cambiada_en).getTime() : 0;
    if (!sesion || payload.iat * 1000 < cambiada) {
      return next(new ErrorDominio('Token inválido o expirado', 401));
    }
  } catch (error) {
    return next(error);
  }

  req.usuario = { id: payload.id, rol_id: payload.rol_id };
  next();
}

module.exports = verificarToken;
