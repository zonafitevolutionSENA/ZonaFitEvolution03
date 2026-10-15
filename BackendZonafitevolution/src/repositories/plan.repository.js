const pool = require('../config/database');
const Plan = require('../models/plan.model');

async function crear({ nombre, duracion_dias, precio }) {
  const [resultado] = await pool.query(
    'INSERT INTO planes (nombre, duracion_dias, precio) VALUES (?, ?, ?)',
    [nombre, duracion_dias, precio]
  );
  return resultado.insertId;
}

async function obtenerTodos() {
  const [filas] = await pool.query('SELECT * FROM planes');
  return filas.map(fila => new Plan(fila));
}

async function obtenerActivos() {
  const [filas] = await pool.query('SELECT * FROM planes WHERE activo = TRUE');
  return filas.map(fila => new Plan(fila));
}

async function obtenerPorId(id) {
  const [filas] = await pool.query('SELECT * FROM planes WHERE id = ?', [id]);
  if (filas.length === 0) return null;
  return new Plan(filas[0]);
}

async function obtenerPorNombre(nombre) {
  const [filas] = await pool.query('SELECT * FROM planes WHERE nombre = ?', [nombre]);
  if (filas.length === 0) return null;
  return new Plan(filas[0]);
}

async function actualizar(id, { nombre, duracion_dias, precio, activo }) {
  const [resultado] = await pool.query(
    'UPDATE planes SET nombre = ?, duracion_dias = ?, precio = ?, activo = ? WHERE id = ?',
    [nombre, duracion_dias, precio, activo, id]
  );
  return resultado.affectedRows > 0;
}

async function contarMembresiasActivasPorPlan(plan_id) {
  const [filas] = await pool.query(
    "SELECT COUNT(*) AS total FROM membresias WHERE plan_id = ? AND estado = 'activa'",
    [plan_id]
  );
  return filas[0].total;
}

async function eliminar(id) {
  const [resultado] = await pool.query('DELETE FROM planes WHERE id = ?', [id]);
  return resultado.affectedRows > 0;
}

module.exports = {
  crear,
  obtenerTodos,
  obtenerActivos,
  obtenerPorId,
  obtenerPorNombre,
  actualizar,
  contarMembresiasActivasPorPlan,
  eliminar
};
