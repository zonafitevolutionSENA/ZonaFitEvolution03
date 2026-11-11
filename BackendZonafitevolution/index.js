const app = require('./src/app');
const { programarActivacionDiaria } = require('./src/jobs/membresias.job');
const { iniciarCanalAgente } = require('./src/hardware/canalAgente');

const PUERTO = process.env.PORT || 3000;

const servidor = app.listen(PUERTO, () => {
  console.log('Servidor escuchando en el puerto ' + PUERTO);
  // Al arrancar se ejecuta la activación/vencimiento de membresías y se programa cada día
  programarActivacionDiaria();
});

// Canal WebSocket para el agente del lector (solo se usa con TIPO_LECTOR=remoto)
if (process.env.TIPO_LECTOR === 'remoto') {
  iniciarCanalAgente(servidor);
}
