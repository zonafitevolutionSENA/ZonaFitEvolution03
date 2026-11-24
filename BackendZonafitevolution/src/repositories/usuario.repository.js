const pool = require('../config/database');
const Usuario = require('../models/usuario.model');

async function crear({ nombre, correo, contrasena, rol_id }) {
  const [resultado] = await pool.query(
    'INSERT INTO usuarios (nombre, correo, contrasena, rol_id) VALUES (?, ?, ?, ?)',
    [nombre, correo, contrasena, rol_id]
  );
  return resultado.insertId;
}

async function obtenerTodos() {
  const [filas] = await pool.query('SELECT * FROM usuarios');
  return filas.map(fila => new Usuario(fila));
}

async function obtenerPorId(id) {
  const [filas] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
  if (filas.length === 0) return null;
  return new Usuario(filas[0]);
}

async function obtenerPorCorreo(correo) {
  const [filas] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
  if (filas.length === 0) return null;
  return new Usuario(filas[0]);
}

// Datos mínimos para validar un token en cada petición
async function obtenerSesion(id) {
  const [filas] = await pool.query('SELECT id, contrasena_cambiada_en FROM usuarios WHERE id = ?', [id]);
  return filas[0] || null;
}

async function eliminar(id) {
  const [resultado] = await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
  return resultado.affectedRows > 0;
}

async function contarPorRol(rolId) {
  const [filas] = await pool.query('SELECT COUNT(*) AS total FROM usuarios WHERE rol_id = ?', [rolId]);
  return Number(filas[0].total);
}

module.exports = {
  crear,
  obtenerTodos,
  obtenerPorId,
  obtenerPorCorreo,
  obtenerSesion,
  eliminar,
  contarPorRol
};
