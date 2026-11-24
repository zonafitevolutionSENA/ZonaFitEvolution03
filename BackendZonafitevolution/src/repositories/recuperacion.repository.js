const pool = require('../config/database');

// Guarda un código nuevo e invalida los anteriores del usuario: solo hay un código vivo a la vez
async function crear({ usuario_id, codigo_hash, minutos }) {
  const conexion = await pool.getConnection();
  try {
    await conexion.beginTransaction();
    await conexion.query(
      'UPDATE recuperaciones_contrasena SET usado_en = NOW() WHERE usuario_id = ? AND usado_en IS NULL',
      [usuario_id]
    );
    await conexion.query(
      'INSERT INTO recuperaciones_contrasena (usuario_id, codigo_hash, expira_en) VALUES (?, ?, NOW() + INTERVAL ? MINUTE)',
      [usuario_id, codigo_hash, minutos]
    );
    await conexion.commit();
  } catch (error) {
    await conexion.rollback();
    throw error;
  } finally {
    conexion.release();
  }
}

async function obtenerVigente(usuario_id) {
  const [filas] = await pool.query(
    `SELECT id, codigo_hash, intentos FROM recuperaciones_contrasena
     WHERE usuario_id = ? AND usado_en IS NULL AND expira_en > NOW()
     ORDER BY id DESC LIMIT 1`,
    [usuario_id]
  );
  return filas[0] || null;
}

// Cuenta el intento antes de comparar el código, en una sola sentencia: así varias peticiones
// simultáneas no pueden superar el máximo de intentos
async function reservarIntento(id, maxIntentos) {
  const [resultado] = await pool.query(
    `UPDATE recuperaciones_contrasena SET intentos = intentos + 1
     WHERE id = ? AND usado_en IS NULL AND expira_en > NOW() AND intentos < ?`,
    [id, maxIntentos]
  );
  return resultado.affectedRows > 0;
}

// Cambia la contraseña y gasta el código en la misma transacción. Devuelve false si el código
// ya se había usado (por ejemplo, dos pestañas restableciendo a la vez)
async function restablecer({ id, usuario_id, contrasena }) {
  const conexion = await pool.getConnection();
  try {
    await conexion.beginTransaction();
    const [gastado] = await conexion.query(
      'UPDATE recuperaciones_contrasena SET usado_en = NOW() WHERE id = ? AND usuario_id = ? AND usado_en IS NULL',
      [id, usuario_id]
    );
    if (gastado.affectedRows === 0) {
      await conexion.rollback();
      return false;
    }
    await conexion.query(
      'UPDATE usuarios SET contrasena = ?, contrasena_cambiada_en = NOW() WHERE id = ?',
      [contrasena, usuario_id]
    );
    await conexion.commit();
    return true;
  } catch (error) {
    await conexion.rollback();
    throw error;
  } finally {
    conexion.release();
  }
}

module.exports = { crear, obtenerVigente, reservarIntento, restablecer };
