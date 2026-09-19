const EstadoAcceso = require('./estadoAcceso.interface');

class EstadoSinMembresia extends EstadoAcceso {
  evaluar() {
    return { permitido: false, motivo: 'El cliente no tiene ninguna membresía registrada' };
  }
}

module.exports = EstadoSinMembresia;
