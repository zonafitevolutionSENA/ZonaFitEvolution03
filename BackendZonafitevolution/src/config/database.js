require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'zonafitevolution',
  waitForConnections: true,
  connectionLimit: 10,
  // Colombia no tiene horario de verano: -05:00 todo el año
  timezone: '-05:00',
  // Las columnas DATE (fecha_inicio, fecha_fin) se entregan como 'AAAA-MM-DD'. Como objeto Date
  // viajarían a medianoche local y el JSON las mostraría desplazadas según la zona horaria.
  dateStrings: ['DATE']
});

// MySQL en la nube trabaja en UTC: cada conexión se pone en hora de Colombia
// para que CURRENT_TIMESTAMP (fecha_hora de los ingresos) quede con la hora local
pool.pool.on('connection', conexion => {
  conexion.query("SET time_zone = '-05:00'");
});

module.exports = pool;
