const ErrorDominio = require('../utils/errores');

function validarBodyNoVacio(req, res, next) {
  if (!req.body || typeof req.body !== 'object' || Object.keys(req.body).length === 0) {
    return next(new ErrorDominio('El cuerpo de la petición no puede estar vacío'));
  }
  next();
}

module.exports = validarBodyNoVacio;
