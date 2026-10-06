const EstadoActivo = require('./estadoActivo');
const EstadoVencido = require('./estadoVencido');
const EstadoCancelado = require('./estadoCancelado');
const EstadoSinMembresia = require('./estadoSinMembresia');

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
    default:
      return new EstadoSinMembresia();
  }
}

module.exports = obtenerEstado;
