const membresiaService = require('../services/membresia.service');

const HORA_EJECUCION = 0;
const MINUTO_EJECUCION = 5;

function milisegundosHastaProximaEjecucion(ahora = new Date()) {
  const proxima = new Date(ahora);
  proxima.setHours(HORA_EJECUCION, MINUTO_EJECUCION, 0, 0);
  if (proxima <= ahora) proxima.setDate(proxima.getDate() + 1);
  return proxima - ahora;
}

async function ejecutarActivacionDiaria() {
  try {
    const { vencidas, activadas, omitidas } = await membresiaService.activarMembresiasPendientes();
    console.log(`[membresias] vencidas: ${vencidas}, activadas: ${activadas}, pendientes en espera: ${omitidas}`);
  } catch (error) {
    console.error('[membresias] error en la activación diaria:', error.message);
  }
}

function programarActivacionDiaria() {
  ejecutarActivacionDiaria();
  const programarSiguiente = () => {
    setTimeout(async () => {
      await ejecutarActivacionDiaria();
      programarSiguiente();
    }, milisegundosHastaProximaEjecucion());
  };
  programarSiguiente();
}

module.exports = { programarActivacionDiaria, ejecutarActivacionDiaria, milisegundosHastaProximaEjecucion };
