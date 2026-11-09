const app = require('./src/app');
const { programarActivacionDiaria } = require('./src/jobs/membresias.job');

const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
  console.log('Servidor escuchando en http://localhost:' + PUERTO);
  // NUEVO: al arrancar se ejecuta la activación/vencimiento de membresías y se programa cada día.
  programarActivacionDiaria();
});
