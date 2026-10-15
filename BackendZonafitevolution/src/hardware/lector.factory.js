require('dotenv').config();
const SimuladorLector = require('./simuladorLector.adapter');

function obtenerLector() {
  const tipoLector = process.env.TIPO_LECTOR || 'simulador';

  switch (tipoLector) {
    case 'simulador':
      return new SimuladorLector();
    default:
      throw new Error(`Tipo de lector no soportado: ${tipoLector}`);
  }
}

module.exports = obtenerLector;
