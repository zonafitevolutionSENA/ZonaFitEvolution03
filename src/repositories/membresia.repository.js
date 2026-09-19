const pool = require('../config/database');
const Membresia = require('../models/membresia.model');

async function crear({ plan_id, fecha_inicio, fecha_fin, cliente_id }) {
  const [resultado] = await pool.query(
    'INSERT INTO membresias (plan_id, fecha_inicio, fecha_fin, cliente_id) VALUES (?, ?, ?, ?)',
    [plan_id, fecha_inicio, fecha_fin, cliente_id]
  );
  return resultado.insertId;
}

async function obtenerTodas() {
  const [filas] = await pool.query('SELECT * FROM membresias');
  return filas.map(fila => new Membresia(fila));
}

async function obtenerPorId(id) {
  const [filas] = await pool.query('SELECT * FROM membresias WHERE id = ?', [id]);
  if (filas.length === 0) return null;
  return new Membresia(filas[0]);
}

async function obtenerActivaPorCliente(cliente_id) {
  const [filas] = await pool.query(
    "SELECT * FROM membresias WHERE cliente_id = ? AND estado = 'activa'",
    [cliente_id]
  );
  if (filas.length === 0) return null;
  return new Membresia(filas[0]);
}

async function obtenerConCliente(id) {
  const [filas] = await pool.query(
    `SELECT m.*, c.nombre AS nombre_cliente, c.cedula, c.correo AS correo_cliente,
            p.nombre AS nombre_plan, p.precio AS precio_plan
     FROM membresias m
     JOIN clientes c ON m.cliente_id = c.id
     JOIN planes p ON m.plan_id = p.id
     WHERE m.id = ?`,
    [id]
  );
  if (filas.length === 0) return null;
  return filas[0];
}

async function actualizarEstado(id, estado) {
  const [resultado] = await pool.query(
    'UPDATE membresias SET estado = ? WHERE id = ?',
    [estado, id]
  );
  return resultado.affectedRows > 0;
}

async function eliminar(id) {
  const [resultado] = await pool.query('DELETE FROM membresias WHERE id = ?', [id]);
  return resultado.affectedRows > 0;
}

module.exports = {
  crear,
  obtenerTodas,
  obtenerPorId,
  obtenerActivaPorCliente,
  obtenerConCliente,
  actualizarEstado,
  eliminar
};
