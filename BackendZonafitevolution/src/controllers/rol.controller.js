const rolRepository = require('../repositories/rol.repository');

async function listar(req, res, next) {
  try {
    const roles = await rolRepository.obtenerTodos();
    res.status(200).json(roles);
  } catch (error) {
    next(error);
  }
}

module.exports = { listar };
