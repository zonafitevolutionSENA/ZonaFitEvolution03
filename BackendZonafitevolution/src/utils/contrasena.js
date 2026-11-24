const ErrorDominio = require('./errores');

// Reglas de contraseña del personal: las mismas al crear un usuario y al restablecerla.
// bcrypt solo usa los primeros 72 bytes, por eso ese es el máximo.
function validarContrasena(contrasena) {
  if (typeof contrasena !== 'string') {
    throw new ErrorDominio('La contraseña no es válida');
  }
  if (contrasena.length < 8) {
    throw new ErrorDominio('La contraseña debe tener al menos 8 caracteres');
  }
  if (Buffer.byteLength(contrasena, 'utf8') > 72) {
    throw new ErrorDominio('La contraseña no puede superar 72 bytes');
  }
  if (/\s/.test(contrasena)) {
    throw new ErrorDominio('La contraseña no puede tener espacios');
  }
  if (!/\p{L}/u.test(contrasena) || !/\d/.test(contrasena)) {
    throw new ErrorDominio('La contraseña debe combinar letras y números');
  }
}

module.exports = { validarContrasena };
