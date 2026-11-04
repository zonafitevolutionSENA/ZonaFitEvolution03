const membresiaRepository = require('../repositories/membresia.repository');
const clienteRepository = require('../repositories/cliente.repository');
const planRepository = require('../repositories/plan.repository');
const ErrorDominio = require('../utils/errores');
const { fechaATexto, hoyISO } = require('../utils/fechas');
const ROLES = require('../utils/roles');

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

  // Tiquetera: la fecha de fin queda vacía hasta el primer ingreso (la duración cuenta desde el primer día de uso)
  const ingresos_totales = plan.max_ingresos ?? null;
  const fecha_fin = ingresos_totales === null ? calcularFechaFin(fecha_inicio, plan.duracion_dias) : null;

  const nuevoId = await membresiaRepository.crear({
    plan_id,
    fecha_inicio,
    fecha_fin,
    cliente_id,
    ingresos_totales
  });

  return membresiaRepository.obtenerConCliente(nuevoId);
}

async function buscarClienteParaRenovar(cedula) {
  const info = await clienteRepository.obtenerPorCedulaConMembresia(cedula);
  if (!info) {
    throw new ErrorDominio('No existe ningún cliente registrado con esa cédula', 404);
  }
  return info;
}

async function renovarMembresia({ cedula, plan_id }) {
  if (!cedula || !plan_id) {
    throw new ErrorDominio('La cédula del cliente y el plan son obligatorios');
  }

  const cliente = await clienteRepository.obtenerPorCedula(String(cedula).trim());
  if (!cliente) {
    throw new ErrorDominio('No existe ningún cliente registrado con esa cédula', 404);
  }

  const plan = await planRepository.obtenerPorId(plan_id);
  if (!plan || !plan.activo) {
    throw new ErrorDominio('El plan indicado no existe o no está disponible', 404);
  }

  const hoy = hoyISO();
  const membresiaActiva = await membresiaRepository.obtenerActivaPorCliente(cliente.id);

  let fechaInicio = hoy;
  let anterior = null;
  if (membresiaActiva) {
    const esTiquetera = membresiaActiva.ingresos_totales !== null;
    const sinIngresos = esTiquetera && membresiaActiva.ingresos_usados >= membresiaActiva.ingresos_totales;
    // Tiquetera sin usar: no tiene fecha de fin y sigue vigente
    const finActual = membresiaActiva.fecha_fin ? fechaATexto(membresiaActiva.fecha_fin) : null;
    const vigente = !sinIngresos && (finActual === null || finActual >= hoy);
    if (vigente) {
      // Aún está vigente: la renovación se encadena al día siguiente del vencimiento (o empieza hoy si no hay fecha de fin).
      // La anterior se marca como cancelada para no dejar dos "activas" a la vez.
      fechaInicio = finActual ? calcularFechaFin(finActual, 1) : hoy;
      anterior = { id: membresiaActiva.id, estado: 'cancelada' };
    } else {
      // Figura "activa" pero ya venció por fecha o se le acabaron los ingresos
      anterior = { id: membresiaActiva.id, estado: 'vencida' };
    }
  }
  // Sin membresía activa (vencida, cancelada o primera vez) → empieza hoy

  const ingresos_totales = plan.max_ingresos ?? null;
  const fecha_fin = ingresos_totales === null ? calcularFechaFin(fechaInicio, plan.duracion_dias) : null;

  const nuevoId = await membresiaRepository.crearReemplazando({
    plan_id,
    fecha_inicio: fechaInicio,
    fecha_fin,
    cliente_id: cliente.id,
    ingresos_totales,
    anterior
  });

  if (nuevoId === null) {
    throw new ErrorDominio('La membresía del cliente cambió mientras se procesaba la renovación. Intenta de nuevo.', 409);
  }

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

async function cambiarEstado(id, estado, rolId) {
  if (!ESTADOS.includes(estado)) {
    throw new ErrorDominio('El estado debe ser uno de: ' + ESTADOS.join(', '));
  }
  // Reactivar una membresía es exclusivo del Administrador: el Empleado solo puede cancelar o marcar como vencida
  if (estado === 'activa' && rolId !== ROLES.ADMIN) {
    throw new ErrorDominio('Solo el Administrador puede reactivar una membresía', 403);
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
  buscarClienteParaRenovar,
  renovarMembresia,
  listarMembresias,
  obtenerMembresia,
  cambiarEstado,
  eliminarMembresia
};
