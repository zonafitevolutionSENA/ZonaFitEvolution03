const bcrypt = require('bcrypt');
const usuarioRepository = require('../repositories/usuario.repository');
const ErrorDominio = require('../utils/errores');
const ROLES = require('../utils/roles');

function validarCorreo(correo) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
}

async function crearUsuario({ nombre, correo, contrasena, rol_id }) {
  if (!nombre || !correo || !contrasena || !rol_id) {
    throw new ErrorDominio('Nombre, correo, contraseña y rol son obligatorios');
  }

  if (!validarCorreo(correo)) {
    throw new ErrorDominio('El correo no tiene un formato válido');
  }

  if (contrasena.length < 8) {
    throw new ErrorDominio('La contraseña debe tener al menos 8 caracteres');
  }

  if (!Object.values(ROLES).includes(Number(rol_id))) {
    throw new ErrorDominio('El rol debe ser admin (1) o empleado (2)');
  }

  const existente = await usuarioRepository.obtenerPorCorreo(correo);
  if (existente) {
    throw new ErrorDominio('Ya existe un usuario registrado con ese correo', 409);
  }

  const hash = await bcrypt.hash(contrasena, 10);
  const nuevoId = await usuarioRepository.crear({
    nombre,
    correo,
    contrasena: hash,
    rol_id: Number(rol_id)
  });
  return usuarioRepository.obtenerPorId(nuevoId);
}

async function listarUsuarios() {
  return usuarioRepository.obtenerTodos();
}

async function obtenerUsuario(id) {
  const usuario = await usuarioRepository.obtenerPorId(id);
  if (!usuario) {
    throw new ErrorDominio('Usuario no encontrado', 404);
  }
  return usuario;
}

async function eliminarUsuario(id) {
  await obtenerUsuario(id);
  await usuarioRepository.eliminar(id);
  return { mensaje: 'Usuario eliminado correctamente' };
}

module.exports = {
  crearUsuario,
  listarUsuarios,
  obtenerUsuario,
  eliminarUsuario
};
