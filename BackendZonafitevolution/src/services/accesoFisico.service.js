const biometriaService = require('./biometria.service');
const membresiaRepository = require('../repositories/membresia.repository');
const registroAccesoRepository = require('../repositories/registroAcceso.repository');
const obtenerEstado = require('../estadosAcceso/estadoAcceso.factory');
const ErrorDominio = require('../utils/errores');
const { hoyISO, sumarDias } = require('../utils/fechas');
const { esTiquetera } = require('../estadosAcceso/estadoActivo');

async function validarAcceso({ identificadorSimulado } = {}) {
  let cliente;

  try {
    cliente = await biometriaService.identificarPorHuella({ identificadorSimulado });
  } catch (error) {
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

  const membresia = await membresiaRepository.obtenerUltimaPorCliente(cliente.id);
  const estado = obtenerEstado(membresia);
  let evaluacion = estado.evaluar(membresia);
  let detalle = {};

  // Tiquetera: un ingreso permitido gasta uno de los ingresos y, en el primero, fija la fecha de vencimiento
  if (evaluacion.permitido && esTiquetera(membresia)) {
    const hoy = hoyISO();
    const fechaFinNueva = sumarDias(hoy, membresia.duracion_dias);
    const consumido = await membresiaRepository.consumirIngreso(membresia.id, { hoy, fechaFinNueva });
    if (consumido) {
      const restantes = membresia.ingresos_totales - membresia.ingresos_usados - 1;
      const vence = membresia.fecha_fin ? String(membresia.fecha_fin).slice(0, 10) : fechaFinNueva;
      detalle = { ingresos_restantes: restantes, vence };
      const motivo = restantes === 0
        ? `Tiquetera: último ingreso utilizado (vence ${vence})`
        : `Tiquetera: quedan ${restantes} ingresos (vence ${vence})`;
      evaluacion = { permitido: true, motivo: membresia.fecha_fin ? motivo : `Primer ingreso de la tiquetera. ${motivo}` };
    } else {
      evaluacion = { permitido: false, motivo: 'Tiquetera sin ingresos disponibles o vencida' };
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
