const pool = require('../config/database');

// Membresías activas que vencen dentro de los próximos `dias` días y todavía no recibieron este aviso.
// Condiciones: plan de `duracionMinima` días o más (tiqueteras incluidas, cuando ya tienen fecha de fin),
// cliente que aceptó recibir avisos y con correo, y sin una membresía pendiente (ya renovó).
// El rango (y no solo "en exactamente 7 días") permite ponerse al día si un día la tarea no corrió.
async function obtenerPorAvisar({ tipo, dias, duracionMinima, limite }) {
  const [filas] = await pool.query(
    `SELECT m.id AS membresia_id, m.fecha_fin, c.id AS cliente_id, c.nombre, c.correo,
            p.nombre AS nombre_plan, m.ingresos_totales, m.ingresos_usados,
            DATEDIFF(m.fecha_fin, CURDATE()) AS dias_restantes
     FROM membresias m
     JOIN clientes c ON c.id = m.cliente_id
     JOIN planes p ON p.id = m.plan_id
     WHERE m.estado = 'activa'
       AND m.fecha_fin IS NOT NULL
       AND m.fecha_fin BETWEEN CURDATE() + INTERVAL 1 DAY AND CURDATE() + INTERVAL ? DAY
       AND p.duracion_dias >= ?
       AND c.avisos_aceptados_en IS NOT NULL
       AND c.correo IS NOT NULL AND c.correo <> ''
       AND NOT EXISTS (SELECT 1 FROM membresias mp WHERE mp.cliente_id = m.cliente_id AND mp.estado = 'pendiente')
       AND NOT EXISTS (SELECT 1 FROM avisos_membresia a WHERE a.membresia_id = m.id AND a.tipo = ?)
     ORDER BY m.fecha_fin, m.id
     LIMIT ?`,
    [dias, duracionMinima, tipo, limite]
  );
  return filas;
}

// Registra el envío. Si ya estaba registrado (dos ejecuciones a la vez), no lo duplica.
async function registrarEnvio({ membresiaId, tipo }) {
  const [resultado] = await pool.query(
    'INSERT IGNORE INTO avisos_membresia (membresia_id, tipo, enviado_en) VALUES (?, ?, NOW())',
    [membresiaId, tipo]
  );
  return resultado.affectedRows > 0;
}

module.exports = { obtenerPorAvisar, registrarEnvio };
