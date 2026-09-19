const pool = require('../config/database');
const Membresia = require('../models/membresia.model');

async function crear({ plan_id, fecha_inicio, fecha_fin, cliente_id }) {
  const [resultado] = await pool.query(
    'INSERT INTO membresias (plan_id, fecha_inicio, fecha_fin, cliente_id) VALUES (?, ?, ?, ?)',
    [plan_id, fecha_inicio, fecha_fin, cliente_id]
  );
  return resultado.insertId;
}

// Crea una membresía y, en la misma transacción, cambia el estado de la anterior (si la hay).
// Si algo falla, no se cambia nada. Devuelve null si la anterior ya no estaba activa
// (otra renovación se adelantó), para que el servicio pueda avisar sin dejar datos a medias.
async function crearReemplazando({ plan_id, fecha_inicio, fecha_fin, cliente_id, anterior }) {
  const conexion = await pool.getConnection();
  try {
    await conexion.beginTransaction();

    // Bloquea al cliente: dos renovaciones simultáneas del mismo cliente se procesan una tras otra
    await conexion.query('SELECT id FROM clientes WHERE id = ? FOR UPDATE', [cliente_id]);

    if (anterior) {
      const [resultadoAnterior] = await conexion.query(
        "UPDATE membresias SET estado = ? WHERE id = ? AND estado = 'activa'",
        [anterior.estado, anterior.id]
      );
      if (resultadoAnterior.affectedRows === 0) {
        await conexion.rollback();
        return null;
      }
    } else {
      const [activas] = await conexion.query(
        "SELECT COUNT(*) AS total FROM membresias WHERE cliente_id = ? AND estado = 'activa'",
        [cliente_id]
      );
      if (activas[0].total > 0) {
        await conexion.rollback();
        return null;
      }
    }

    const [resultado] = await conexion.query(
      'INSERT INTO membresias (plan_id, fecha_inicio, fecha_fin, cliente_id) VALUES (?, ?, ?, ?)',
      [plan_id, fecha_inicio, fecha_fin, cliente_id]
    );

    await conexion.commit();
    return resultado.insertId;
  } catch (error) {
    await conexion.rollback();
    throw error;
  } finally {
    conexion.release();
  }
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

async function obtenerUltimaPorCliente(cliente_id) {
  const [filas] = await pool.query(
    `SELECT m.*, p.nombre AS nombre_plan, p.duracion_dias
     FROM membresias m
     JOIN planes p ON m.plan_id = p.id
     WHERE m.cliente_id = ?
     ORDER BY m.fecha_fin DESC
     LIMIT 1`,
    [cliente_id]
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
  crearReemplazando,
  obtenerTodas,
  obtenerPorId,
  obtenerActivaPorCliente,
  obtenerConCliente,
  obtenerUltimaPorCliente,
  actualizarEstado,
  eliminar
};
