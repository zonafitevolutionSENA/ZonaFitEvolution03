const ErrorDominio = require('../utils/errores');

function permitirRoles(...rolesPermitidos) {
  return (req, res, next) => {
    if (!req.usuario || !rolesPermitidos.includes(req.usuario.rol_id)) {
      return next(new ErrorDominio('No tienes permisos para realizar esta acción', 403));
    }
    next();
  };
}

module.exports = permitirRoles;
