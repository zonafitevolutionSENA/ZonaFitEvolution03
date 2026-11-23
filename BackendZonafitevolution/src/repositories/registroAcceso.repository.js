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

// Primer ingreso permitido del cliente en el día (hora de Colombia, la de la conexión)
// y los minutos transcurridos desde entonces; null si hoy no ha entrado
async function obtenerPrimerIngresoDeHoy(clienteId) {
  const [filas] = await pool.query(
    `SELECT DATE_FORMAT(MIN(fecha_hora), '%H:%i') AS hora,
            TIMESTAMPDIFF(MINUTE, MIN(fecha_hora), NOW()) AS minutos
     FROM registros_acceso
     WHERE cliente_id = ? AND resultado = 'permitido' AND DATE(fecha_hora) = CURDATE()`,
    [clienteId]
  );
  const fila = filas[0];
  return fila && fila.hora ? { hora: fila.hora, minutos: Number(fila.minutos) } : null;
}

// Borra los intentos de acceso más antiguos que la retención definida (DAT-05)
async function eliminarAnterioresA(meses) {
  const [res] = await pool.query(
    'DELETE FROM registros_acceso WHERE fecha_hora < (NOW() - INTERVAL ? MONTH)',
    [meses]
  );
  return res.affectedRows;
}

module.exports = { crear, obtenerRecientes, obtenerPrimerIngresoDeHoy, eliminarAnterioresA };
