const biometriaService = require('./biometria.service');
const membresiaRepository = require('../repositories/membresia.repository');
const registroAccesoRepository = require('../repositories/registroAcceso.repository');
const obtenerEstado = require('../estadosAcceso/estadoAcceso.factory');
const ErrorDominio = require('../utils/errores');
const { hoyISO, sumarDias } = require('../utils/fechas');
const { esTiquetera } = require('../estadosAcceso/estadoActivo');

async function validarAcceso({ signal } = {}) {
  let cliente;

  try {
    cliente = await biometriaService.identificarPorHuella({ signal });
  } catch (error) {
    if (signal?.aborted) throw new ErrorDominio('Lectura cancelada', 499);
    if (error instanceof ErrorDominio && error.status === 404) {
      await registroAccesoRepository.crear({
        cliente_id: null,
        resultado: 'denegado',
        motivo: 'Huella no reconocida'
      });
      throw new ErrorDominio('Huella no reconocida', 404);
    }
    throw error;
  }

  if (signal?.aborted) throw new ErrorDominio('Lectura cancelada', 499);

  const membresia = await membresiaRepository.obtenerUltimaPorCliente(cliente.id);
  if (signal?.aborted) throw new ErrorDominio('Lectura cancelada', 499);
  const estado = obtenerEstado(membresia);
  let evaluacion = estado.evaluar(membresia);
  let detalle = {};

  // Tiquetera: un ingreso permitido descuenta UN ingreso por día (en el primero fija además el vencimiento).
  // Si el cliente vuelve a entrar el mismo día, se permite sin descontar otro ingreso.
  if (evaluacion.permitido && esTiquetera(membresia)) {
    const hoy = hoyISO();
    const ultimo = membresia.fecha_ultimo_ingreso ? String(membresia.fecha_ultimo_ingreso).slice(0, 10) : null;
    const vence = membresia.fecha_fin ? String(membresia.fecha_fin).slice(0, 10) : null;
    let restantes = membresia.ingresos_totales - membresia.ingresos_usados;
    let yaIngresoHoy = ultimo === hoy;

    if (!yaIngresoHoy) {
      const fechaFinNueva = sumarDias(hoy, membresia.duracion_dias);
      const consumido = await membresiaRepository.consumirIngreso(membresia.id, { hoy, fechaFinNueva });
      if (consumido) {
        restantes -= 1;
        detalle = { ingresos_restantes: restantes, vence: vence || fechaFinNueva };
        const aviso = restantes === 0
          ? `Tiquetera: último ingreso utilizado (vence ${vence || fechaFinNueva})`
          : `Tiquetera: quedan ${restantes} ingresos (vence ${vence || fechaFinNueva})`;
        evaluacion = { permitido: true, motivo: vence ? aviso : `Primer ingreso de la tiquetera. ${aviso}` };
      } else {
        // Otra lectura simultánea se adelantó: si ya descontó el ingreso de hoy, este también entra
        const actual = await membresiaRepository.obtenerUltimaPorCliente(cliente.id);
        const ultimoActual = actual && actual.fecha_ultimo_ingreso ? String(actual.fecha_ultimo_ingreso).slice(0, 10) : null;
        if (ultimoActual === hoy) {
          yaIngresoHoy = true;
          restantes = actual.ingresos_totales - actual.ingresos_usados;
          membresia.fecha_fin = actual.fecha_fin;
        } else {
          evaluacion = { permitido: false, motivo: 'Tiquetera sin ingresos disponibles o vencida' };
        }
      }
    }

    if (yaIngresoHoy) {
      const fin = membresia.fecha_fin ? String(membresia.fecha_fin).slice(0, 10) : null;
      detalle = { ingresos_restantes: restantes, vence: fin };
      evaluacion = { permitido: true, motivo: `Tiquetera: ya ingresó hoy, no se descuenta otro ingreso (quedan ${restantes})` };
    }
  }

  await registroAccesoRepository.crear({
    cliente_id: cliente.id,
    resultado: evaluacion.permitido ? 'permitido' : 'denegado',
    motivo: evaluacion.motivo
  });

  return {
    cliente: { id: cliente.id, nombre: cliente.nombre, cedula: cliente.cedula },
    permitido: evaluacion.permitido,
    motivo: evaluacion.motivo,
    ...detalle
  };
}

async function obtenerHistorialReciente() {
  return registroAccesoRepository.obtenerRecientes();
}

module.exports = {
  validarAcceso,
  obtenerHistorialReciente
};
