const pool = require('../config/database');

async function crear({ cliente_id, resultado, motivo }) {
  const [res] = await pool.query(
    'INSERT INTO registros_acceso (cliente_id, resultado, motivo) VALUES (?, ?, ?)',
    [cliente_id, resultado, motivo]
  );
  return res.insertId;
}

async function obtenerRecientes(limite = 50) {
  const cantidad = Math.min(Math.max(parseInt(limite, 10) || 50, 1), 500);
  const [filas] = await pool.query(
    `SELECT ra.*, c.nombre AS nombre_cliente
     FROM registros_acceso ra
     LEFT JOIN clientes c ON ra.cliente_id = c.id
     ORDER BY ra.fecha_hora DESC, ra.id DESC
     LIMIT ?`,
    [cantidad]
  );
  return filas;
}

module.exports = { crear, obtenerRecientes };
