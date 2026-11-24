const pool = require('../config/database');
const Cliente = require('../models/cliente.model');

// Al registrar, los términos siempre quedan aceptados (el servicio lo exige) y los avisos solo si los acepta
async function crear({ nombre, cedula, correo, telefono, aceptaAvisos = false }) {
  const [resultado] = await pool.query(
    `INSERT INTO clientes (nombre, cedula, correo, telefono, terminos_aceptados_en, avisos_aceptados_en)
     VALUES (?, ?, ?, ?, NOW(), IF(?, NOW(), NULL))`,
    [nombre, cedula, correo, telefono, Boolean(aceptaAvisos)]
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

// aceptaTerminos: true la registra (si aún no estaba); nunca la borra.
// aceptaAvisos: true la registra (conserva la fecha original), false la retira, undefined no la cambia.
async function actualizar(id, { nombre, correo, telefono, aceptaTerminos, aceptaAvisos }) {
  const avisos = aceptaAvisos === undefined ? null : Boolean(aceptaAvisos);
  const [resultado] = await pool.query(
    `UPDATE clientes SET nombre = ?, correo = ?, telefono = ?,
       terminos_aceptados_en = IF(?, COALESCE(terminos_aceptados_en, NOW()), terminos_aceptados_en),
       avisos_aceptados_en = CASE WHEN ? IS NULL THEN avisos_aceptados_en
                                  WHEN ? THEN COALESCE(avisos_aceptados_en, NOW())
                                  ELSE NULL END
     WHERE id = ?`,
    [nombre, correo, telefono, Boolean(aceptaTerminos), avisos, avisos, id]
  );
  return resultado.affectedRows > 0;
}

async function obtenerPorCedulaConMembresia(cedula) {
  // Se muestra primero la membresía activa; si no, la búsqueda para renovar
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
  obtenerPorCedulaConMembresia
};
