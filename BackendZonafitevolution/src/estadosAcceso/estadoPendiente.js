const EstadoAcceso = require('./estadoAcceso.interface');
const { fechaATexto } = require('../utils/fechas');

class EstadoPendiente extends EstadoAcceso {
  evaluar(membresia) {
    return { permitido: false, motivo: 'Membresía pendiente: inicia el ' + fechaATexto(membresia.fecha_inicio) };
  }
}

module.exports = EstadoPendiente;
