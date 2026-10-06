const accesoFisicoService = require('../services/accesoFisico.service');

async function validar(req, res, next) {
  try {
    const resultado = await accesoFisicoService.validarAcceso(req.body);
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

module.exports = { validar, historial };
