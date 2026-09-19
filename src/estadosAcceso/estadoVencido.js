const EstadoAcceso = require('./estadoAcceso.interface');

class EstadoVencido extends EstadoAcceso {
  evaluar(membresia) {
    return { permitido: false, motivo: 'Membresía vencida' };
  }
}

module.exports = EstadoVencido;
