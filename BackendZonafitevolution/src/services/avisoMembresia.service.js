const avisoMembresiaRepository = require('../repositories/avisoMembresia.repository');
const correoService = require('./correo.service');
const log = require('../utils/logger')('avisos');

// Un solo aviso por membresía, 7 días antes de que venza, en planes de 15 días o más (CR-010)
const TIPO_AVISO = 'vencimiento_7d';
const DIAS_ANTICIPACION = 7;
const DURACION_MINIMA_DIAS = 15;
// Brevo gratis permite 300 correos al día; se deja margen para los de recuperación de contraseña
const MAXIMO_POR_EJECUCION = 250;

function fechaLegible(fecha) {
  const texto = fecha instanceof Date ? fecha.toISOString().slice(0, 10) : String(fecha).slice(0, 10);
  const [anio, mes, dia] = texto.split('-');
  return `${dia}/${mes}/${anio}`;
}

// Envía los avisos pendientes. Solo marca como enviado lo que Brevo (o Gmail) aceptó:
// si un envío falla, se reintenta en la siguiente ejecución.
async function enviarAvisosDeVencimiento() {
  if (!correoService.estaConfigurado()) {
    log.warn('avisos de vencimiento omitidos: el envío de correos no está configurado');
    return { pendientes: 0, enviados: 0, fallidos: 0, omitido: true };
  }

  const pendientes = await avisoMembresiaRepository.obtenerPorAvisar({
    tipo: TIPO_AVISO,
    dias: DIAS_ANTICIPACION,
    duracionMinima: DURACION_MINIMA_DIAS,
    limite: MAXIMO_POR_EJECUCION
  });

  let enviados = 0;
  let fallidos = 0;
  // Uno a la vez: son pocos y así no se superan los límites de envío del proveedor
  for (const aviso of pendientes) {
    try {
      const esTiquetera = aviso.ingresos_totales !== null && aviso.ingresos_totales !== undefined;
      await correoService.enviarAvisoVencimiento({
        para: aviso.correo,
        nombre: aviso.nombre,
        plan: aviso.nombre_plan,
        fechaFin: fechaLegible(aviso.fecha_fin),
        diasRestantes: Number(aviso.dias_restantes),
        ingresosRestantes: esTiquetera ? aviso.ingresos_totales - aviso.ingresos_usados : null
      });
      await avisoMembresiaRepository.registrarEnvio({ membresiaId: aviso.membresia_id, tipo: TIPO_AVISO });
      enviados += 1;
    } catch (error) {
      fallidos += 1;
      log.error('no se pudo enviar el aviso de vencimiento', { membresia_id: aviso.membresia_id, motivo: error.message });
    }
  }

  return { pendientes: pendientes.length, enviados, fallidos, omitido: false };
}

module.exports = { enviarAvisosDeVencimiento, TIPO_AVISO, DIAS_ANTICIPACION, DURACION_MINIMA_DIAS, MAXIMO_POR_EJECUCION };
