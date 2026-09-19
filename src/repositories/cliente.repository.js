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
  const [filas] = await pool.query('SELECT * FROM clientes');
  return filas.map(fila => new Cliente(fila));
}

async function obtenerPorId(id) {
  const [filas] = await pool.query('SELECT * FROM clientes WHERE id = ?', [id]);
  if (filas.length === 0) return null;
  return new Cliente(filas[0]);
}

async function obtenerPorCedula(cedula) {
  const [filas] = await pool.query('SELECT * FROM clientes WHERE cedula = ?', [cedula]);
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

module.exports = {
  crear,
  obtenerTodos,
  obtenerPorId,
  obtenerPorCedula,
  actualizar,
  eliminar
};
