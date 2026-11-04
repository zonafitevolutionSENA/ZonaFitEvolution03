const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuarioRepository = require('../repositories/usuario.repository');
const ErrorDominio = require('../utils/errores');

// Hash de relleno: si el correo no existe se compara igual, para que la respuesta tarde lo mismo
const HASH_FALSO = bcrypt.hashSync('contrasena-de-relleno', 10);

async function login({ correo, contrasena }) {
  if (!correo || !contrasena) {
    throw new ErrorDominio('Correo y contraseña son obligatorios');
  }

  const usuario = await usuarioRepository.obtenerPorCorreo(correo);
  const hashComparado = usuario ? usuario.contrasena : HASH_FALSO;
  const coincide = await bcrypt.compare(String(contrasena), hashComparado);
  const valido = Boolean(usuario) && coincide;
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
