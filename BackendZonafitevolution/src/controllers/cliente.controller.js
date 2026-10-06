const clienteService = require('../services/cliente.service');

async function registrar(req, res, next) {
  try {
    const cliente = await clienteService.registrarCliente(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    next(error);
  }
}

async function listar(req, res, next) {
  try {
    const clientes = await clienteService.listarClientes();
    res.status(200).json(clientes);
  } catch (error) {
    next(error);
  }
}

async function obtenerPorId(req, res, next) {
  try {
    const cliente = await clienteService.obtenerCliente(req.params.id);
    res.status(200).json(cliente);
  } catch (error) {
    next(error);
  }
}

async function actualizar(req, res, next) {
  try {
    const cliente = await clienteService.actualizarCliente(req.params.id, req.body);
    res.status(200).json(cliente);
  } catch (error) {
    next(error);
  }
}

async function eliminar(req, res, next) {
  try {
    const resultado = await clienteService.eliminarCliente(req.params.id);
    res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
}

module.exports = { registrar, listar, obtenerPorId, actualizar, eliminar };
