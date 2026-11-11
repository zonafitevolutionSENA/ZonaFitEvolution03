const crypto = require('crypto');
const { WebSocketServer, WebSocket } = require('ws');
const ErrorDominio = require('../utils/errores');

// El registro pide el dedo dos veces (hasta 15 s cada una), por eso el margen es amplio
const TIEMPO_MAXIMO_MS = 90000;
const INTERVALO_LATIDO_MS = 30000;

// Un solo agente conectado a la vez: el portátil que tiene el AS608
let agente = null;
const pendientes = new Map();

function tokenValido(recibido) {
  const esperado = process.env.AGENTE_TOKEN;
  if (!esperado || typeof recibido !== 'string') return false;
  const a = Buffer.from(recibido);
  const b = Buffer.from(esperado);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function recibirMensaje(datos) {
  let mensaje;
  try {
    mensaje = JSON.parse(datos);
  } catch {
    return;
  }
  const pendiente = pendientes.get(mensaje.id);
  if (!pendiente) return;
  if (mensaje.tipo === 'etapa') return pendiente.alEtapa(mensaje.etapa);
  if (mensaje.tipo === 'resultado') return pendiente.terminar(null, mensaje.resultado);
  if (mensaje.tipo === 'error') {
    return pendiente.terminar(new ErrorDominio(mensaje.mensaje || 'Error en el lector', mensaje.status || 503));
  }
}

function iniciarCanalAgente(servidor) {
  const wss = new WebSocketServer({ server: servidor, path: '/agente', maxPayload: 64 * 1024 });

  wss.on('connection', (socket, req) => {
    if (!tokenValido(req.headers['x-agente-token'])) {
      socket.close(4001, 'Token del agente inválido');
      return;
    }
    if (agente) agente.terminate();
    agente = socket;
    socket.vivo = true;
    console.log('[agente] lector conectado');

    socket.on('pong', () => { socket.vivo = true; });
    socket.on('message', recibirMensaje);
    socket.on('close', () => {
      if (agente !== socket) return;
      agente = null;
      console.log('[agente] lector desconectado');
      for (const pendiente of pendientes.values()) {
        pendiente.terminar(new ErrorDominio('El lector se desconectó durante la operación', 503));
      }
    });
  });

  // Latido: detecta un agente caído (portátil suspendido o sin internet) y libera la conexión
  setInterval(() => {
    if (!agente) return;
    if (!agente.vivo) return agente.terminate();
    agente.vivo = false;
    agente.ping();
  }, INTERVALO_LATIDO_MS).unref();

  return wss;
}

function lectorConectado() {
  return Boolean(agente && agente.readyState === WebSocket.OPEN);
}

function enviarOrden(tipo, datos = {}, { signal, alEtapa = () => {} } = {}) {
  if (!lectorConectado()) {
    return Promise.reject(new ErrorDominio('Lector desconectado: inicia el agente en el portátil del lector', 503));
  }
  if (signal?.aborted) {
    return Promise.reject(new ErrorDominio('Lectura cancelada', 499));
  }

  const id = crypto.randomUUID();
  const socket = agente;

  return new Promise((resolve, reject) => {
    const avisarCancelacion = () => {
      if (socket.readyState === WebSocket.OPEN) socket.send(JSON.stringify({ id, tipo: 'cancelar' }));
    };
    const alAbortar = () => {
      avisarCancelacion();
      terminar(new ErrorDominio('Lectura cancelada', 499));
    };
    const temporizador = setTimeout(() => {
      avisarCancelacion();
      terminar(new ErrorDominio('El lector no respondió a tiempo', 504));
    }, TIEMPO_MAXIMO_MS);

    function terminar(error, resultado) {
      clearTimeout(temporizador);
      signal?.removeEventListener('abort', alAbortar);
      pendientes.delete(id);
      if (error) reject(error);
      else resolve(resultado);
    }

    signal?.addEventListener('abort', alAbortar, { once: true });
    pendientes.set(id, { terminar, alEtapa });
    socket.send(JSON.stringify({ id, tipo, datos }));
  });
}

module.exports = { iniciarCanalAgente, enviarOrden, lectorConectado };
