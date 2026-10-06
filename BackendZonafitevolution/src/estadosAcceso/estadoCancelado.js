const EstadoAcceso = require('./estadoAcceso.interface');

class EstadoCancelado extends EstadoAcceso {
  evaluar(membresia) {
    return { permitido: false, motivo: 'Membresía cancelada' };
  }
}

module.exports = EstadoCancelado;
