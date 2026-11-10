const pool = require('../config/database');
const Cliente = require('../models/cliente.model');

async function crear({ nombre, cedula, correo, telefono }) {
  const [resultado] = await pool.query(
    'INSERT INTO clientes (nombre, cedula, correo, telefono) VALUES (?, ?, ?, ?)',
    [nombre, cedula, correo, telefono]
  );
  return resultado.insertId;
}

async function obtenerTodos() {
  const [filas] = await pool.query(
    'SELECT c.*, EXISTS(SELECT 1 FROM plantillas_biometricas pb WHERE pb.cliente_id = c.id) AS tiene_huella FROM clientes c'
  );
  return filas.map(fila => new Cliente(fila));
}

async function obtenerPorId(id) {
  const [filas] = await pool.query(
    'SELECT c.*, EXISTS(SELECT 1 FROM plantillas_biometricas pb WHERE pb.cliente_id = c.id) AS tiene_huella FROM clientes c WHERE c.id = ?',
    [id]
  );
  if (filas.length === 0) return null;
  return new Cliente(filas[0]);
}

async function obtenerPorCedula(cedula) {
  const [filas] = await pool.query(
    'SELECT c.*, EXISTS(SELECT 1 FROM plantillas_biometricas pb WHERE pb.cliente_id = c.id) AS tiene_huella FROM clientes c WHERE c.cedula = ?',
    [cedula]
  );
  if (filas.length === 0) return null;
  return new Cliente(filas[0]);
}

async function actualizar(id, { nombre, correo, telefono }) {
  const [resultado] = await pool.query(
    'UPDATE clientes SET nombre = ?, correo = ?, telefono = ? WHERE id = ?',
    [nombre, correo, telefono, id]
  );
  return resultado.affectedRows > 0;
}

async function eliminar(id) {
  const [resultado] = await pool.query('DELETE FROM clientes WHERE id = ?', [id]);
  return resultado.affectedRows > 0;
}

async function obtenerPorCedulaConMembresia(cedula) {
  // ANTERIOR: ORDER BY m.id DESC
  // NUEVO: se muestra primero la membresía activa; si no, la búsqueda para renovar
  // mostraría la pendiente (creada después) como si fuera la membresía actual del cliente.
  const [filas] = await pool.query(
    `SELECT c.*, m.id AS membresia_id, m.estado, m.fecha_fin, m.ingresos_totales, m.ingresos_usados, p.nombre AS nombre_plan
     FROM clientes c
     LEFT JOIN membresias m ON m.cliente_id = c.id
     LEFT JOIN planes p ON m.plan_id = p.id
     WHERE c.cedula = ?
     ORDER BY (m.estado = 'activa') DESC, m.id DESC
     LIMIT 1`,
    [cedula]
  );
  if (filas.length === 0) return null;
  return filas[0];
}

module.exports = {
  crear,
  obtenerTodos,
  obtenerPorId,
  obtenerPorCedula,
  actualizar,
  eliminar,
  obtenerPorCedulaConMembresia
};
