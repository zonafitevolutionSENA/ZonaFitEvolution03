const pool = require('../config/database');
const PlantillaBiometrica = require('../models/plantillaBiometrica.model');

async function crear({ cliente_id, template_hash }) {
  const [resultado] = await pool.query(
    'INSERT INTO plantillas_biometricas (cliente_id, template_hash) VALUES (?, ?)',
    [cliente_id, template_hash]
  );
  return resultado.insertId;
}

async function obtenerPorClienteId(cliente_id) {
  const [filas] = await pool.query(
    'SELECT * FROM plantillas_biometricas WHERE cliente_id = ?',
    [cliente_id]
  );
  if (filas.length === 0) return null;
  return new PlantillaBiometrica(filas[0]);
}

async function obtenerTodas() {
  const [filas] = await pool.query('SELECT * FROM plantillas_biometricas');
  return filas.map(fila => new PlantillaBiometrica(fila));
}

async function eliminarPorClienteId(cliente_id) {
  const [resultado] = await pool.query(
    'DELETE FROM plantillas_biometricas WHERE cliente_id = ?',
    [cliente_id]
  );
  return resultado.affectedRows > 0;
}

module.exports = {
  crear,
  obtenerPorClienteId,
  obtenerTodas,
  eliminarPorClienteId
};
