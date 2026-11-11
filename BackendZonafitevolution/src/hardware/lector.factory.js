require('dotenv').config();
const As608Lector = require('./as608Lector.adapter');
const RemotoLector = require('./remotoLector.adapter');

// El lector físico mantiene abierto el puerto serial, por eso se reutiliza una sola instancia
let lectorFisico = null;

function obtenerLector() {
  const tipoLector = process.env.TIPO_LECTOR || 'as608';

  switch (tipoLector) {
    case 'as608':
      if (!lectorFisico) {
        lectorFisico = new As608Lector({
          puerto: process.env.PUERTO_LECTOR,
          baudios: Number(process.env.LECTOR_BAUDIOS) || 57600
        });
      }
      return lectorFisico;
    case 'remoto':
      if (!lectorFisico) {
        lectorFisico = new RemotoLector();
      }
      return lectorFisico;
    default:
      throw new Error(`Tipo de lector no soportado: ${tipoLector}`);
  }
}

module.exports = obtenerLector;
