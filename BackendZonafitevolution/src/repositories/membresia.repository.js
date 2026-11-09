const pool = require('../config/database');
const Membresia = require('../models/membresia.model');

// Crea una membresía y, en la misma transacción, cambia el estado de la anterior (si la hay).
// Si algo falla, no se cambia nada. Devuelve null si la anterior ya no estaba activa
// (otra renovación se adelantó), para que el servicio pueda avisar sin dejar datos a medias.
// ANTERIOR: async function crearReemplazando({ plan_id, fecha_inicio, fecha_fin = null, cliente_id, ingresos_totales = null, anterior })
// NUEVO: recibe el estado con el que nace la membresía ('activa' o 'pendiente') para que una compra
// hecha con otra membresía activa no genere dos activas al mismo tiempo.
async function crearReemplazando({ plan_id, fecha_inicio, fecha_fin = null, cliente_id, ingresos_totales = null, anterior, estado = 'activa' }) {
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
    }

    // ANTERIOR: solo cuando no había "anterior" se contaban las activas del cliente y,
    // si había alguna, se cancelaba la operación.
    // NUEVO: las validaciones se hacen siempre bajo el bloqueo del cliente: no puede existir otra
    // pendiente, una nueva activa exige que no haya otra activa, y una pendiente debe empezar
    // después del fin de la activa (una tiquetera sin usar no tiene fin, así que también bloquea).
    const [pendientes] = await conexion.query(
      "SELECT COUNT(*) AS total FROM membresias WHERE cliente_id = ? AND estado = 'pendiente'",
      [cliente_id]
    );
    const [activas] = await conexion.query(
      "SELECT COUNT(*) AS total FROM membresias WHERE cliente_id = ? AND estado = 'activa' AND (? = 'activa' OR fecha_fin IS NULL OR fecha_fin >= ?)",
      [cliente_id, estado, fecha_inicio]
    );
    if (pendientes[0].total > 0 || activas[0].total > 0) {
      await conexion.rollback();
      return null;
    }

    // ANTERIOR: INSERT sin la columna estado (quedaba con el DEFAULT 'activa')
    // NUEVO: el estado se inserta de forma explícita.
    const [resultado] = await conexion.query(
      'INSERT INTO membresias (plan_id, fecha_inicio, fecha_fin, cliente_id, ingresos_totales, estado) VALUES (?, ?, ?, ?, ?, ?)',
      [plan_id, fecha_inicio, fecha_fin, cliente_id, ingresos_totales, estado]
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
  // ANTERIOR: ORDER BY m.id DESC
  // NUEVO: la activa va primero y luego la pendiente. Con solo m.id DESC se elegía la pendiente
  // (se crea después) y el control de acceso le negaba la entrada a un cliente con membresía vigente.
  const [filas] = await pool.query(
    `SELECT m.*, p.nombre AS nombre_plan, p.duracion_dias
     FROM membresias m
     JOIN planes p ON m.plan_id = p.id
     WHERE m.cliente_id = ?
     ORDER BY (m.estado = 'activa') DESC, (m.estado = 'pendiente') DESC, m.id DESC
     LIMIT 1`,
    [cliente_id]
  );
  if (filas.length === 0) return null;
  return filas[0];
}

async function obtenerPendientePorCliente(cliente_id) {
  const [filas] = await pool.query(
    "SELECT * FROM membresias WHERE cliente_id = ? AND estado = 'pendiente' ORDER BY fecha_inicio LIMIT 1",
    [cliente_id]
  );
  if (filas.length === 0) return null;
  return new Membresia(filas[0]);
}

async function vencerActivasExpiradas(hoy) {
  const [resultado] = await pool.query(
    "UPDATE membresias SET estado = 'vencida' WHERE estado = 'activa' AND fecha_fin < ?",
    [hoy]
  );
  return resultado.affectedRows;
}

async function obtenerPendientesParaActivar(hoy) {
  const [filas] = await pool.query(
    "SELECT * FROM membresias WHERE estado = 'pendiente' AND fecha_inicio <= ? ORDER BY fecha_inicio, id",
    [hoy]
  );
  return filas.map(fila => new Membresia(fila));
}

async function activarPendiente(id, cliente_id) {
  const conexion = await pool.getConnection();
  try {
    await conexion.beginTransaction();
    await conexion.query('SELECT id FROM clientes WHERE id = ? FOR UPDATE', [cliente_id]);

    const [activas] = await conexion.query(
      "SELECT COUNT(*) AS total FROM membresias WHERE cliente_id = ? AND estado = 'activa'",
      [cliente_id]
    );
    if (activas[0].total > 0) {
      await conexion.rollback();
      return false;
    }

    const [resultado] = await conexion.query(
      "UPDATE membresias SET estado = 'activa' WHERE id = ? AND estado = 'pendiente'",
      [id]
    );
    await conexion.commit();
    return resultado.affectedRows > 0;
  } catch (error) {
    await conexion.rollback();
    throw error;
  } finally {
    conexion.release();
  }
}

async function actualizarFechaFinReprogramando({ id, cliente_id, fecha_fin, pendiente }) {
  const conexion = await pool.getConnection();
  try {
    await conexion.beginTransaction();
    await conexion.query('SELECT id FROM clientes WHERE id = ? FOR UPDATE', [cliente_id]);

    await conexion.query('UPDATE membresias SET fecha_fin = ? WHERE id = ?', [fecha_fin, id]);

    if (pendiente) {
      const [resultado] = await conexion.query(
        "UPDATE membresias SET fecha_inicio = ?, fecha_fin = ? WHERE id = ? AND estado = 'pendiente'",
        [pendiente.fecha_inicio, pendiente.fecha_fin, pendiente.id]
      );
      if (resultado.affectedRows === 0) {
        await conexion.rollback();
        return false;
      }
    }

    await conexion.commit();
    return true;
  } catch (error) {
    await conexion.rollback();
    throw error;
  } finally {
    conexion.release();
  }
}

// Registra un ingreso de tiquetera en una sola sentencia, para que dos lecturas a la vez no gasten el mismo ingreso.
// En el primer ingreso fija la fecha de fin (la duración cuenta desde el primer día de uso).
// Solo se descuenta un ingreso por día: si ya se descontó hoy, no hace nada.
// Al gastar el último ingreso la membresía pasa a "vencida". Devuelve false si no se descontó.
async function consumirIngreso(id, { hoy, fechaFinNueva }) {
  const [resultado] = await pool.query(
    `UPDATE membresias
     SET estado = IF(ingresos_usados + 1 >= ingresos_totales, 'vencida', estado),
         ingresos_usados = ingresos_usados + 1,
         fecha_primer_uso = COALESCE(fecha_primer_uso, ?),
         fecha_fin = COALESCE(fecha_fin, ?),
         fecha_ultimo_ingreso = ?
     WHERE id = ? AND estado = 'activa' AND ingresos_totales IS NOT NULL
       AND ingresos_usados < ingresos_totales
       AND (fecha_fin IS NULL OR fecha_fin >= ?)
       AND (fecha_ultimo_ingreso IS NULL OR fecha_ultimo_ingreso < ?)`,
    [hoy, fechaFinNueva, hoy, id, hoy, hoy]
  );
  return resultado.affectedRows > 0;
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
  crearReemplazando,
  obtenerTodas,
  obtenerPorId,
  obtenerActivaPorCliente,
  obtenerConCliente,
  obtenerUltimaPorCliente,
  obtenerPendientePorCliente,
  vencerActivasExpiradas,
  obtenerPendientesParaActivar,
  activarPendiente,
  actualizarFechaFinReprogramando,
  consumirIngreso,
  actualizarEstado,
  eliminar
};
