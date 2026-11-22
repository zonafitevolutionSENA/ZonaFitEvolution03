// Logs con fecha, nivel, módulo y contexto en una sola línea (Railway los muestra tal cual).
// Ejemplo: 2026-11-22T23:10:00.000Z INFO [servidor] Servidor escuchando en el puerto 3000 {"puerto":3000}
const NIVELES = { debug: 10, info: 20, warn: 30, error: 40 };
const minimo = NIVELES[(process.env.NIVEL_LOG || 'info').toLowerCase()] ?? NIVELES.info;

function escribir(nivel, modulo, mensaje, contexto) {
  if (NIVELES[nivel] < minimo) return;
  let linea = `${new Date().toISOString()} ${nivel.toUpperCase()} [${modulo}] ${mensaje}`;
  if (contexto && Object.keys(contexto).length > 0) {
    linea += ' ' + JSON.stringify(contexto);
  }
  (nivel === 'error' || nivel === 'warn' ? console.error : console.log)(linea);
}

function crearLogger(modulo) {
  return {
    debug: (mensaje, contexto) => escribir('debug', modulo, mensaje, contexto),
    info: (mensaje, contexto) => escribir('info', modulo, mensaje, contexto),
    warn: (mensaje, contexto) => escribir('warn', modulo, mensaje, contexto),
    error: (mensaje, contexto) => escribir('error', modulo, mensaje, contexto)
  };
}

module.exports = crearLogger;
