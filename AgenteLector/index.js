require('dotenv').config();
const WebSocket = require('ws');
// Se reutiliza el adaptador del backend: mismo protocolo serial, mismos templates
const As608Lector = require('../BackendZonafitevolution/src/hardware/as608Lector.adapter');

const ESPERA_INICIAL_MS = 1000;
const ESPERA_MAXIMA_MS = 30000;

for (const variable of ['API_WS_URL', 'AGENTE_TOKEN', 'PUERTO_LECTOR', 'BIOMETRIA_SALT']) {
  if (!process.env[variable]) {
    console.error(`[agente] falta la variable ${variable} en AgenteLector/.env`);
    process.exit(1);
  }
}

const lector = new As608Lector({
  puerto: process.env.PUERTO_LECTOR,
  baudios: Number(process.env.LECTOR_BAUDIOS) || 57600
});

// Órdenes en curso, para poder cancelarlas (por ejemplo, si se cierra la pantalla de ingreso)
const enCurso = new Map();
let espera = ESPERA_INICIAL_MS;

async function ejecutar(orden, avisarEtapa, signal) {
  switch (orden.tipo) {
    case 'capturar':
      return lector.capturar(signal);
    case 'registrar':
      return lector.registrar(avisarEtapa);
    case 'eliminar':
      return lector.eliminar(orden.datos?.template);
    default:
      throw new Error(`Orden desconocida: ${orden.tipo}`);
  }
}

async function atender(socket, datos) {
  let orden;
  try {
    orden = JSON.parse(datos);
  } catch {
    return;
  }
  if (typeof orden.id !== 'string') return;

  if (orden.tipo === 'cancelar') {
    enCurso.get(orden.id)?.abort();
    return;
  }

  const responder = mensaje => {
    if (socket.readyState === WebSocket.OPEN) socket.send(JSON.stringify({ id: orden.id, ...mensaje }));
  };
  const controlador = new AbortController();
  enCurso.set(orden.id, controlador);
  console.log(`[agente] orden: ${orden.tipo}`);

  try {
    const resultado = await ejecutar(orden, etapa => responder({ tipo: 'etapa', etapa }), controlador.signal);
    responder({ tipo: 'resultado', resultado });
  } catch (error) {
    console.error(`[agente] ${orden.tipo}: ${error.message}`);
    responder({ tipo: 'error', mensaje: error.message, status: error.status || 503 });
  } finally {
    enCurso.delete(orden.id);
  }
}

function conectar() {
  const socket = new WebSocket(process.env.API_WS_URL, {
    headers: { 'x-agente-token': process.env.AGENTE_TOKEN }
  });

  socket.on('open', () => {
    espera = ESPERA_INICIAL_MS;
    console.log('[agente] conectado al servidor, lector listo');
  });
  socket.on('message', datos => atender(socket, datos));
  socket.on('error', error => console.error(`[agente] error de conexión: ${error.message}`));
  socket.on('close', codigo => {
    for (const controlador of enCurso.values()) controlador.abort();
    enCurso.clear();
    if (codigo === 4001) {
      console.error('[agente] el servidor rechazó el AGENTE_TOKEN; revísalo en AgenteLector/.env');
    }
    console.log(`[agente] desconectado; reintento en ${espera / 1000} s`);
    setTimeout(conectar, espera);
    espera = Math.min(espera * 2, ESPERA_MAXIMA_MS);
  });
}

conectar();
