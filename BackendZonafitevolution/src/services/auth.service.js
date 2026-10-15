const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuarioRepository = require('../repositories/usuario.repository');
const ErrorDominio = require('../utils/errores');

async function login({ correo, contrasena }) {
  if (!correo || !contrasena) {
    throw new ErrorDominio('Correo y contraseña son obligatorios');
  }

  const usuario = await usuarioRepository.obtenerPorCorreo(correo);
  const valido = usuario && await bcrypt.compare(contrasena, usuario.contrasena);
  if (!valido) {
    throw new ErrorDominio('Credenciales inválidas', 401);
  }

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET no está configurado');
  }

  const token = jwt.sign(
    { id: usuario.id, rol_id: usuario.rol_id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
  );
  return { token, usuario };
}

module.exports = { login };
