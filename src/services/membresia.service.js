const membresiaRepository = require('../repositories/membresia.repository');
const clienteRepository = require('../repositories/cliente.repository');
const planRepository = require('../repositories/plan.repository');
const ErrorDominio = require('../utils/errores');

const ESTADOS = ['activa', 'vencida', 'cancelada'];

function fechaValida(valor) {
  if (typeof valor !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(valor)) return false;
  const fecha = new Date(valor);
  // Se compara de ida y vuelta para rechazar fechas inexistentes como 2026-02-30
  return !Number.isNaN(fecha.getTime()) && fecha.toISOString().startsWith(valor);
}

// Se opera en UTC para que el resultado no dependa de la zona horaria del servidor
function calcularFechaFin(fechaInicio, duracionDias) {
  const fecha = new Date(fechaInicio);
  fecha.setUTCDate(fecha.getUTCDate() + duracionDias);
  return fecha.toISOString().split('T')[0];
}

async function crearMembresia({ plan_id, fecha_inicio, cliente_id }) {
  if (!plan_id || !fecha_inicio || !cliente_id) {
    throw new ErrorDominio('El plan, la fecha de inicio y el cliente son obligatorios');
  }

  if (!fechaValida(fecha_inicio)) {
    throw new ErrorDominio('La fecha de inicio debe tener el formato AAAA-MM-DD');
  }

  const cliente = await clienteRepository.obtenerPorId(cliente_id);
  if (!cliente) {
    throw new ErrorDominio('El cliente indicado no existe', 404);
  }

  const plan = await planRepository.obtenerPorId(plan_id);
  if (!plan || !plan.activo) {
    throw new ErrorDominio('El plan indicado no existe o no está disponible', 404);
  }

  const membresiaActiva = await membresiaRepository.obtenerActivaPorCliente(cliente_id);
  if (membresiaActiva) {
    throw new ErrorDominio('El cliente ya tiene una membresía activa. No se puede duplicar.', 409);
  }

  const fecha_fin = calcularFechaFin(fecha_inicio, plan.duracion_dias);

  const nuevoId = await membresiaRepository.crear({
    plan_id,
    fecha_inicio,
    fecha_fin,
    cliente_id
  });

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
