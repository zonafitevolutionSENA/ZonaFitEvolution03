const biometriaService = require('./biometria.service');
const membresiaRepository = require('../repositories/membresia.repository');
const registroAccesoRepository = require('../repositories/registroAcceso.repository');
const obtenerEstado = require('../estadosAcceso/estadoAcceso.factory');
const ErrorDominio = require('../utils/errores');

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
  const evaluacion = estado.evaluar(membresia);

  await registroAccesoRepository.crear({
    cliente_id: cliente.id,
    resultado: evaluacion.permitido ? 'permitido' : 'denegado',
    motivo: evaluacion.motivo
  });

  return {
    cliente: { id: cliente.id, nombre: cliente.nombre, cedula: cliente.cedula },
    permitido: evaluacion.permitido,
    motivo: evaluacion.motivo
  };
}

async function obtenerHistorialReciente() {
  return registroAccesoRepository.obtenerRecientes();
}

module.exports = {
  validarAcceso,
  obtenerHistorialReciente
};
