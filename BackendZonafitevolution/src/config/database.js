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
  // Las columnas DATE (fecha_inicio, fecha_fin) se entregan como 'AAAA-MM-DD'. Como objeto Date
  // viajarían a medianoche local y el JSON las mostraría desplazadas según la zona horaria.
  dateStrings: ['DATE']
});

module.exports = pool;
