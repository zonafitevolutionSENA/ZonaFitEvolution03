require('dotenv').config();
const SimuladorLector = require('./simuladorLector.adapter');
const As608Lector = require('./as608Lector.adapter');

// El lector físico mantiene abierto el puerto serial, por eso se reutiliza una sola instancia
let lectorFisico = null;

function obtenerLector() {
  const tipoLector = process.env.TIPO_LECTOR || 'simulador';

  switch (tipoLector) {
    case 'simulador':
      return new SimuladorLector();
    case 'as608':
      if (!lectorFisico) {
        lectorFisico = new As608Lector({
          puerto: process.env.PUERTO_LECTOR,
          baudios: Number(process.env.LECTOR_BAUDIOS) || 57600
        });
      }
      return lectorFisico;
    default:
      throw new Error(`Tipo de lector no soportado: ${tipoLector}`);
  }
}

module.exports = obtenerLector;
