const biometriaService = require('../services/biometria.service');

async function registrar(req, res, next) {
  try {
    const resultado = await biometriaService.registrarHuella(req.body);
    res.status(201).json(resultado);
  } catch (error) {
    next(error);
  }
}

async function identificar(req, res, next) {
  try {
    const cliente = await biometriaService.identificarPorHuella(req.body);
    res.status(200).json(cliente);
  } catch (error) {
    next(error);
  }
}

async function eliminar(req, res, next) {
  try {
    const resultado = await biometriaService.eliminarHuella(req.params.cliente_id);
    res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
}

module.exports = { registrar, identificar, eliminar };
