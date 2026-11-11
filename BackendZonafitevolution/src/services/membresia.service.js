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

function diasEntre(fechaInicio, fechaFin) {
  return Math.round((new Date(fechaFin) - new Date(fechaInicio)) / 86400000);
}

function vigenciaDeActiva(membresiaActiva, hoy) {
  if (!membresiaActiva) return { vigente: false, finActual: null };
  const esTiquetera = membresiaActiva.ingresos_totales !== null;
  const sinIngresos = esTiquetera && membresiaActiva.ingresos_usados >= membresiaActiva.ingresos_totales;
  const finActual = membresiaActiva.fecha_fin ? fechaATexto(membresiaActiva.fecha_fin) : null;
  return { vigente: !sinIngresos && (finActual === null || finActual >= hoy), finActual };
}

function estadoInicial({ fechaInicio, hoy, tieneActivaVigente }) {
  if (tieneActivaVigente) return 'pendiente';
  return fechaInicio <= hoy ? 'activa' : 'pendiente';
}

async function exigirSinPendiente(cliente_id) {
  const pendiente = await membresiaRepository.obtenerPendientePorCliente(cliente_id);
  if (pendiente) {
    throw new ErrorDominio(
      'El cliente ya tiene una membresía pendiente que inicia el ' + fechaATexto(pendiente.fecha_inicio) + '. Solo se permite una membresía pendiente.',
      409
    );
  }
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

  // ANTERIOR: si el cliente tenía una membresía activa se lanzaba un error 409
  // ('El cliente ya tiene una membresía activa. No se puede duplicar.') y no se creaba nada.
  // NUEVO: la activa conserva su estado y la nueva se registra como 'pendiente', siempre que
  // empiece después del fin de la activa y no exista otra pendiente. Una activa que ya no se
  // puede usar se marca como vencida en la misma transacción. Una tiquetera sin usar no tiene
  // fecha de fin, así que todavía no se puede programar otra membresía a continuación.
  const hoy = hoyISO();
  const membresiaActiva = await membresiaRepository.obtenerActivaPorCliente(cliente_id);
  const { vigente, finActual } = vigenciaDeActiva(membresiaActiva, hoy);

  if (vigente && finActual === null) {
    throw new ErrorDominio(
      'El cliente tiene una tiquetera activa sin usar: su fecha de fin se fija en el primer ingreso, por eso aún no se puede programar otra membresía.',
      409
    );
  }

  await exigirSinPendiente(cliente_id);

  if (vigente && fecha_inicio <= finActual) {
    throw new ErrorDominio(
      'El cliente tiene una membresía activa hasta el ' + finActual + '. La nueva debe iniciar desde el ' + calcularFechaFin(finActual, 1) + '.',
      409
    );
  }

  const anterior = membresiaActiva && !vigente ? { id: membresiaActiva.id, estado: 'vencida' } : null;
  const estado = estadoInicial({ fechaInicio: fecha_inicio, hoy, tieneActivaVigente: vigente });

  // Tiquetera: la fecha de fin queda vacía hasta el primer ingreso (la duración cuenta desde el primer día de uso)
  const ingresos_totales = plan.max_ingresos ?? null;
  const fecha_fin = ingresos_totales === null ? calcularFechaFin(fecha_inicio, plan.duracion_dias) : null;

  // ANTERIOR: membresiaRepository.crear({ plan_id, fecha_inicio, fecha_fin, cliente_id, ingresos_totales })
  // NUEVO: se usa la versión transaccional para validar activas y pendientes con el cliente bloqueado.
  const nuevoId = await membresiaRepository.crearReemplazando({
    plan_id,
    fecha_inicio,
    fecha_fin,
    cliente_id,
    ingresos_totales,
    anterior,
    estado
  });

  if (nuevoId === null) {
    throw new ErrorDominio('Las membresías del cliente cambiaron mientras se procesaba la solicitud. Intenta de nuevo.', 409);
  }

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

  await exigirSinPendiente(cliente.id);

  let fechaInicio = hoy;
  let anterior = null;
  let estado = 'activa';
  if (membresiaActiva) {
    const esTiquetera = membresiaActiva.ingresos_totales !== null;
    const sinIngresos = esTiquetera && membresiaActiva.ingresos_usados >= membresiaActiva.ingresos_totales;
    // Tiquetera sin usar: no tiene fecha de fin y sigue vigente
    const finActual = membresiaActiva.fecha_fin ? fechaATexto(membresiaActiva.fecha_fin) : null;
    const vigente = !sinIngresos && (finActual === null || finActual >= hoy);
    // ANTERIOR: if (vigente) { fechaInicio = finActual ? calcularFechaFin(finActual, 1) : hoy;
    //   anterior = { id: membresiaActiva.id, estado: 'cancelada' }; }
    // NUEVO: si la vigente tiene fecha de fin, conserva su estado 'activa' y la renovación queda
    // 'pendiente' desde el día siguiente; antes se cancelaba la vigente y la nueva figuraba activa
    // sin haber iniciado. Una tiquetera sin usar (sin fecha de fin) mantiene el comportamiento anterior.
    if (vigente && finActual) {
      fechaInicio = calcularFechaFin(finActual, 1);
      estado = 'pendiente';
    } else if (vigente) {
      fechaInicio = hoy;
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
    // ANTERIOR: anterior
    // NUEVO: se envía también el estado calculado ('activa' o 'pendiente').
    anterior,
    estado
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
  // ANTERIOR: await obtenerMembresia(id);
  // NUEVO: se usa la membresía actual para impedir cambios que dejen dos activas o periodos
  // solapados: una pendiente solo se cancela (se activa sola en su fecha) y una reactivación
  // no puede convivir con otra activa ni con una pendiente que empiece antes de su fin.
  const actual = await obtenerMembresia(id);

  if (actual.estado === 'pendiente' && estado !== 'cancelada') {
    throw new ErrorDominio('Una membresía pendiente solo se puede cancelar; se activa automáticamente en su fecha de inicio.', 409);
  }

  if (estado === 'activa' && actual.estado !== 'activa') {
    const otraActiva = await membresiaRepository.obtenerActivaPorCliente(actual.cliente_id);
    if (otraActiva) {
      throw new ErrorDominio('El cliente ya tiene otra membresía activa.', 409);
    }
    const pendiente = await membresiaRepository.obtenerPendientePorCliente(actual.cliente_id);
    const finActual = actual.fecha_fin ? fechaATexto(actual.fecha_fin) : null;
    if (pendiente && (finActual === null || fechaATexto(pendiente.fecha_inicio) <= finActual)) {
      throw new ErrorDominio('No se puede reactivar: el cliente tiene una membresía pendiente que inicia el ' + fechaATexto(pendiente.fecha_inicio) + '.', 409);
    }
  }

  await membresiaRepository.actualizarEstado(id, estado);
  return obtenerMembresia(id);
}

async function actualizarFechaFin(id, fecha_fin) {
  if (!fechaValida(fecha_fin)) {
    throw new ErrorDominio('La fecha de fin debe tener el formato AAAA-MM-DD');
  }

  const membresia = await obtenerMembresia(id);
  if (membresia.estado !== 'activa' && membresia.estado !== 'pendiente') {
    throw new ErrorDominio('Solo se puede modificar la fecha de fin de una membresía activa o pendiente.', 409);
  }
  if (!membresia.fecha_fin) {
    throw new ErrorDominio('Esta tiquetera aún no tiene fecha de fin: se fija en el primer ingreso.', 409);
  }
  if (fecha_fin < fechaATexto(membresia.fecha_inicio)) {
    throw new ErrorDominio('La fecha de fin no puede ser anterior a la fecha de inicio.');
  }
  if (membresia.estado === 'activa' && fecha_fin < hoyISO()) {
    throw new ErrorDominio('La fecha de fin de una membresía activa no puede ser anterior a hoy.');
  }

  let pendiente = null;
  if (membresia.estado === 'activa') {
    const actual = await membresiaRepository.obtenerPendientePorCliente(membresia.cliente_id);
    if (actual) {
      const nuevoInicio = calcularFechaFin(fecha_fin, 1);
      const nuevoFin = actual.fecha_fin
        ? calcularFechaFin(nuevoInicio, diasEntre(fechaATexto(actual.fecha_inicio), fechaATexto(actual.fecha_fin)))
        : null;
      pendiente = { id: actual.id, fecha_inicio: nuevoInicio, fecha_fin: nuevoFin };
    }
  }

  const actualizado = await membresiaRepository.actualizarFechaFinReprogramando({
    id,
    cliente_id: membresia.cliente_id,
    fecha_fin,
    pendiente
  });
  if (!actualizado) {
    throw new ErrorDominio('Las membresías del cliente cambiaron mientras se procesaba la solicitud. Intenta de nuevo.', 409);
  }

  return obtenerMembresia(id);
}

async function activarMembresiasPendientes(hoy = hoyISO()) {
  const vencidas = await membresiaRepository.vencerActivasExpiradas(hoy);
  const candidatas = await membresiaRepository.obtenerPendientesParaActivar(hoy);

  let activadas = 0;
  for (const membresia of candidatas) {
    if (await membresiaRepository.activarPendiente(membresia.id, membresia.cliente_id)) {
      activadas++;
    }
  }

  return { vencidas, activadas, omitidas: candidatas.length - activadas };
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
  actualizarFechaFin,
  activarMembresiasPendientes,
  eliminarMembresia
};
