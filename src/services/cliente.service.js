const clienteRepository = require('../repositories/cliente.repository');
const ErrorDominio = require('../utils/errores');

function validarCedula(cedula) {
  return /^\d{6,15}$/.test(cedula);
}

async function registrarCliente({ nombre, cedula, correo, telefono }) {
  if (!nombre || !cedula) {
    throw new ErrorDominio('Nombre y cédula son obligatorios');
  }

  if (!validarCedula(cedula)) {
    throw new ErrorDominio('La cédula debe contener solo números (6 a 15 dígitos)');
  }

  const existente = await clienteRepository.obtenerPorCedula(cedula);
  if (existente) {
    throw new ErrorDominio('Ya existe un cliente registrado con esa cédula', 409);
  }

  const nuevoId = await clienteRepository.crear({ nombre, cedula, correo, telefono });
  return clienteRepository.obtenerPorId(nuevoId);
}

async function listarClientes() {
  return clienteRepository.obtenerTodos();
}

async function obtenerCliente(id) {
  const cliente = await clienteRepository.obtenerPorId(id);
  if (!cliente) {
    throw new ErrorDominio('Cliente no encontrado', 404);
  }
  return cliente;
}

async function actualizarCliente(id, datos) {
  const cliente = await clienteRepository.obtenerPorId(id);
  if (!cliente) {
    throw new ErrorDominio('Cliente no encontrado', 404);
  }
  await clienteRepository.actualizar(id, datos);
  return obtenerCliente(id);
}

async function eliminarCliente(id) {
  const cliente = await clienteRepository.obtenerPorId(id);
  if (!cliente) {
    throw new ErrorDominio('Cliente no encontrado', 404);
  }
  await clienteRepository.eliminar(id);
  return { mensaje: 'Cliente eliminado correctamente' };
}

module.exports = {
  registrarCliente,
  listarClientes,
  obtenerCliente,
  actualizarCliente,
  eliminarCliente
};
