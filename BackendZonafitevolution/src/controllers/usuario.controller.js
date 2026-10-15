const usuarioService = require('../services/usuario.service');

async function registrar(req, res, next) {
  try {
    const usuario = await usuarioService.crearUsuario(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    next(error);
  }
}

async function listar(req, res, next) {
  try {
    const usuarios = await usuarioService.listarUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    next(error);
  }
}

async function obtenerPorId(req, res, next) {
  try {
    const usuario = await usuarioService.obtenerUsuario(req.params.id);
    res.status(200).json(usuario);
  } catch (error) {
    next(error);
  }
}

async function eliminar(req, res, next) {
  try {
    const resultado = await usuarioService.eliminarUsuario(req.params.id);
    res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
}

module.exports = { registrar, listar, obtenerPorId, eliminar };
