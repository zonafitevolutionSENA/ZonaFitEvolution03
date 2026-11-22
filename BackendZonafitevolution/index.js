const app = require('./src/app');
const { programarActivacionDiaria } = require('./src/jobs/membresias.job');
const { iniciarCanalAgente } = require('./src/hardware/canalAgente');
const log = require('./src/utils/logger')('servidor');

// Sin estos secretos el sistema no es seguro en internet: mejor no arrancar
if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  log.error('JWT_SECRET debe tener al menos 32 caracteres');
  process.exit(1);
}
if (process.env.TIPO_LECTOR === 'remoto' && !process.env.AGENTE_TOKEN) {
  log.error('AGENTE_TOKEN es obligatorio con TIPO_LECTOR=remoto');
  process.exit(1);
}

const PUERTO = process.env.PORT || 3000;

const servidor = app.listen(PUERTO, () => {
  log.info('Servidor escuchando en el puerto ' + PUERTO, { puerto: Number(PUERTO), lector: process.env.TIPO_LECTOR || 'as608' });
  // Al arrancar se ejecuta la activación/vencimiento de membresías y se programa cada día
  programarActivacionDiaria();
});

// Canal WebSocket para el agente del lector (solo se usa con TIPO_LECTOR=remoto)
if (process.env.TIPO_LECTOR === 'remoto') {
  iniciarCanalAgente(servidor);
}
