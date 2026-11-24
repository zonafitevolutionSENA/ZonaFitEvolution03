const authService = require('../services/auth.service');
const recuperacionService = require('../services/recuperacion.service');

async function login(req, res, next) {
  try {
    const resultado = await authService.login(req.body || {});
    res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
}

async function solicitarCodigo(req, res, next) {
  try {
    res.status(200).json(await recuperacionService.solicitarCodigo(req.body || {}));
  } catch (error) {
    next(error);
  }
}

async function verificarCodigo(req, res, next) {
  try {
    res.status(200).json(await recuperacionService.verificarCodigo(req.body || {}));
  } catch (error) {
    next(error);
  }
}

async function restablecerContrasena(req, res, next) {
  try {
    res.status(200).json(await recuperacionService.restablecerContrasena(req.body || {}));
  } catch (error) {
    next(error);
  }
}

module.exports = { login, solicitarCodigo, verificarCodigo, restablecerContrasena };
