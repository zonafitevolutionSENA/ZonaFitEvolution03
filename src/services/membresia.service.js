const membresiaRepository = require('../repositories/membresia.repository');
const clienteRepository = require('../repositories/cliente.repository');
const ErrorDominio = require('../utils/errores');

const ESTADOS = ['activa', 'vencida', 'cancelada'];

function fechaValida(valor) {
  return /^\d{4}-\d{2}-\d{2}$/.test(valor) && !Number.isNaN(Date.parse(valor));
}

async function crearMembresia({ tipo, precio, fecha_inicio, fecha_fin, cliente_id }) {
  if (!tipo || precio === undefined || !fecha_inicio || !fecha_fin || !cliente_id) {
    throw new ErrorDominio('Tipo, precio, fechas y cliente son obligatorios');
  }

  if (!(Number(precio) > 0)) {
    throw new ErrorDominio('El precio debe ser mayor que cero');
  }

  if (!fechaValida(fecha_inicio) || !fechaValida(fecha_fin)) {
    throw new ErrorDominio('Las fechas deben tener el formato AAAA-MM-DD');
  }

  if (fecha_fin <= fecha_inicio) {
    throw new ErrorDominio('La fecha de fin debe ser posterior a la fecha de inicio');
  }

  const cliente = await clienteRepository.obtenerPorId(cliente_id);
  if (!cliente) {
    throw new ErrorDominio('Cliente no encontrado', 404);
  }

  const activa = await membresiaRepository.obtenerActivaPorCliente(cliente_id);
  if (activa) {
    throw new ErrorDominio('El cliente ya tiene una membresía activa', 409);
  }

  const nuevoId = await membresiaRepository.crear({ tipo, precio, fecha_inicio, fecha_fin, cliente_id });
  return membresiaRepository.obtenerConCliente(nuevoId);
}

async function listarMembresias() {
  return membresiaRepository.obtenerTodas();
}

async function obtenerMembresia(id) {
  const membresia = await membresiaRepository.obtenerConCliente(id);
  if (!membresia) {
    throw new ErrorDominio('Membresía no encontrada', 404);
  }
  return membresia;
}

async function cambiarEstado(id, estado) {
  if (!ESTADOS.includes(estado)) {
    throw new ErrorDominio('El estado debe ser uno de: ' + ESTADOS.join(', '));
  }
  await obtenerMembresia(id);
  await membresiaRepository.actualizarEstado(id, estado);
  return obtenerMembresia(id);
}

async function eliminarMembresia(id) {
  await obtenerMembresia(id);
  await membresiaRepository.eliminar(id);
  return { mensaje: 'Membresía eliminada correctamente' };
}

module.exports = {
  crearMembresia,
  listarMembresias,
  obtenerMembresia,
  cambiarEstado,
  eliminarMembresia
};
