require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const path = require('path');
const WebSocket = require('ws');
// Se reutiliza el adaptador del backend: mismo protocolo serial, mismos templates
const As608Lector = require('../BackendZonafitevolution/src/hardware/as608Lector.adapter');

const ESPERA_INICIAL_MS = 1000;
const ESPERA_MAXIMA_MS = 30000;
// Respuestas normales del ciclo de lectura que no se imprimen: 408 = nadie puso el dedo en 15 s
// (la pantalla de ingreso vuelve a pedir otra lectura) y 499 = lectura cancelada
const ESTADOS_SILENCIOSOS = new Set([408, 499]);

// Silicon Labs: fabricante del conversor CP2102 al que va conectado el AS608
const VENDEDOR_CP210X = '10c4';

for (const variable of ['API_WS_URL', 'AGENTE_TOKEN', 'BIOMETRIA_SALT']) {
  if (!process.env[variable]) {
    console.error(`[agente] falta la variable ${variable} en AgenteLector/.env`);
    process.exit(1);
  }
}

// serialport está instalado en el backend (de ahí sale también el adaptador)
const { SerialPort } = require(require.resolve('serialport', {
  paths: [path.join(__dirname, '..', 'BackendZonafitevolution')]
}));

let lector = null;
let puertoLector = null;

// Con PUERTO_LECTOR vacío o en "auto", el agente busca el CP2102 entre los puertos COM.
// Así no importa en qué puerto USB se conecte el lector.
async function puertoConfigurado() {
  const configurado = (process.env.PUERTO_LECTOR || '').trim();
  if (configurado && configurado.toLowerCase() !== 'auto') return configurado;

  const puertos = await SerialPort.list();
  const lectorUsb = puertos.find(p => (p.vendorId || '').toLowerCase() === VENDEDOR_CP210X)
    || puertos.find(p => /silicon labs|cp210/i.test(`${p.manufacturer || ''} ${p.friendlyName || ''}`));
  if (!lectorUsb) {
    const error = new Error('No se encontró el lector de huellas: revisa que esté conectado por USB y que el controlador CP210x esté instalado');
    error.status = 503;
    throw error;
  }
  return lectorUsb.path;
}

async function obtenerLector() {
  const puerto = await puertoConfigurado();
  if (!lector || puerto !== puertoLector) {
    if (lector && puertoLector) console.log(`[agente] el lector cambió de ${puertoLector} a ${puerto}`);
    else console.log(`[agente] lector en ${puerto}`);
    lector = new As608Lector({ puerto, baudios: Number(process.env.LECTOR_BAUDIOS) || 57600 });
    puertoLector = puerto;
  }
  return lector;
}

// Órdenes en curso, para poder cancelarlas (por ejemplo, si se cierra la pantalla de ingreso)
const enCurso = new Map();
let espera = ESPERA_INICIAL_MS;

async function ejecutar(orden, avisarEtapa, signal) {
  const lector = await obtenerLector();
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
  // La captura de la pantalla de ingreso se repite cada 15 s: solo se imprime cuando hay lectura
  if (orden.tipo !== 'capturar') console.log(`[agente] orden: ${orden.tipo}`);

  try {
    const resultado = await ejecutar(orden, etapa => responder({ tipo: 'etapa', etapa }), controlador.signal);
    if (orden.tipo === 'capturar') {
      console.log(`[agente] huella leída: ${resultado ? 'reconocida' : 'no registrada en el lector'}`);
    } else {
      console.log(`[agente] ${orden.tipo}: completado`);
    }
    responder({ tipo: 'resultado', resultado });
  } catch (error) {
    if (!ESTADOS_SILENCIOSOS.has(error.status)) {
      console.error(`[agente] ${orden.tipo}: ${error.message}`);
    }
    // Si el puerto ya no abre (lector desconectado o movido a otro USB), se vuelve a buscar en la siguiente orden
    if (/No se pudo abrir el lector/.test(error.message)) lector = null;
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
