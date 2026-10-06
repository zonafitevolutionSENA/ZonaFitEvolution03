const pool = require('../config/database');

async function obtenerTodos() {
  const [filas] = await pool.query('SELECT * FROM roles');
  return filas;
}

module.exports = { obtenerTodos };
