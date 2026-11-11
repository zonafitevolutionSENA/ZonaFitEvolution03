const accesoFisicoService = require('../services/accesoFisico.service');

let lecturaPantallaEnCurso = false;

async function validarPantalla(req, res, next) {
  if (lecturaPantallaEnCurso) return res.status(409).json({ error: 'El lector está ocupado' });
  lecturaPantallaEnCurso = true;
  const controlador = new AbortController();
  const cancelar = () => controlador.abort();
  res.on('close', cancelar);
  try {
    const resultado = await accesoFisicoService.validarAcceso({ signal: controlador.signal });
    res.json({
      cliente: resultado.cliente ? { nombre: resultado.cliente.nombre } : null,
      permitido: resultado.permitido,
      motivo: resultado.motivo,
      ingresos_restantes: resultado.ingresos_restantes,
      vence: resultado.vence
    });
  } catch (error) {
    next(error);
  } finally {
    res.off('close', cancelar);
    lecturaPantallaEnCurso = false;
  }
}

async function validar(req, res, next) {
  try {
    const resultado = await accesoFisicoService.validarAcceso();
    res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
}

async function historial(req, res, next) {
  try {
    const registros = await accesoFisicoService.obtenerHistorialReciente();
    res.status(200).json(registros);
  } catch (error) {
    next(error);
  }
}

module.exports = { validar, historial, validarPantalla };
