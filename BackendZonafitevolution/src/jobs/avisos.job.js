const avisoMembresiaService = require('../services/avisoMembresia.service');
const log = require('../utils/logger')('avisos');

// Los avisos salen a las 8:00 (hora del servidor, TZ=America/Bogota), después de la activación de las 00:05
const HORA_EJECUCION = 8;
const MINUTO_EJECUCION = 0;
// Al arrancar (por ejemplo, tras un despliegue) solo se envía si es una hora razonable
const HORA_INICIO_ENVIO = 8;
const HORA_FIN_ENVIO = 20;

function milisegundosHastaProximaEjecucion(ahora = new Date()) {
  const proxima = new Date(ahora);
  proxima.setHours(HORA_EJECUCION, MINUTO_EJECUCION, 0, 0);
  if (proxima <= ahora) proxima.setDate(proxima.getDate() + 1);
  return proxima - ahora;
}

function esHoraDeEnvio(ahora = new Date()) {
  const hora = ahora.getHours();
  return hora >= HORA_INICIO_ENVIO && hora < HORA_FIN_ENVIO;
}

async function ejecutarAvisos() {
  try {
    const resultado = await avisoMembresiaService.enviarAvisosDeVencimiento();
    if (!resultado.omitido) log.info('avisos de vencimiento', resultado);
  } catch (error) {
    log.error('error en los avisos de vencimiento', { error: error.message });
  }
}

function programarAvisos() {
  if (esHoraDeEnvio()) ejecutarAvisos();
  const programarSiguiente = () => {
    setTimeout(async () => {
      await ejecutarAvisos();
      programarSiguiente();
    }, milisegundosHastaProximaEjecucion());
  };
  programarSiguiente();
}

module.exports = { programarAvisos, ejecutarAvisos, milisegundosHastaProximaEjecucion, esHoraDeEnvio };
