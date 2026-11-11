const EstadoActivo = require('./estadoActivo');
const EstadoVencido = require('./estadoVencido');
const EstadoCancelado = require('./estadoCancelado');
const EstadoSinMembresia = require('./estadoSinMembresia');
const EstadoPendiente = require('./estadoPendiente');

function obtenerEstado(membresia) {
  if (!membresia) {
    return new EstadoSinMembresia();
  }

  switch (membresia.estado) {
    case 'activa':
      return new EstadoActivo();
    case 'vencida':
      return new EstadoVencido();
    case 'cancelada':
      return new EstadoCancelado();
    // NUEVO: antes una membresía 'pendiente' caía en default y se informaba "sin membresía".
    case 'pendiente':
      return new EstadoPendiente();
    default:
      return new EstadoSinMembresia();
  }
}

module.exports = obtenerEstado;
