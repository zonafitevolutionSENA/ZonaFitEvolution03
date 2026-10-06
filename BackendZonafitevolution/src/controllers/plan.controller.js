const planService = require('../services/plan.service');

async function crear(req, res, next) {
  try {
    const plan = await planService.crearPlan(req.body);
    res.status(201).json(plan);
  } catch (error) {
    next(error);
  }
}

async function listar(req, res, next) {
  try {
    const soloActivos = req.query.activos === 'true';
    const planes = await planService.listarPlanes({ soloActivos });
    res.status(200).json(planes);
  } catch (error) {
    next(error);
  }
}

async function obtenerPorId(req, res, next) {
  try {
    const plan = await planService.obtenerPlan(req.params.id);
    res.status(200).json(plan);
  } catch (error) {
    next(error);
  }
}

async function actualizar(req, res, next) {
  try {
    const plan = await planService.actualizarPlan(req.params.id, req.body);
    res.status(200).json(plan);
  } catch (error) {
    next(error);
  }
}

async function desactivar(req, res, next) {
  try {
    const resultado = await planService.desactivarPlan(req.params.id);
    res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
}

async function eliminar(req, res, next) {
  try {
    const resultado = await planService.eliminarPlan(req.params.id);
    res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
}

module.exports = { crear, listar, obtenerPorId, actualizar, desactivar, eliminar };
