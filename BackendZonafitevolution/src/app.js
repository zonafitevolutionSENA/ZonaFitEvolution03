require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const manejarErrores = require('./middlewares/error.middleware');

const app = express();

// Orígenes del frontend autorizados (en la nube, la URL de Vercel). Varios se separan con comas
const origenesPermitidos = (process.env.ORIGEN_FRONTEND || 'http://localhost:5173,http://127.0.0.1:5173')
  .split(',')
  .map(origen => origen.trim())
  .filter(Boolean);

// Railway pone un proxy delante: sin esto, el límite de intentos vería a todos con la misma IP
app.set('trust proxy', 1);
app.disable('x-powered-by');
app.use(cors({ origin: origenesPermitidos }));
app.use(express.json({ limit: '100kb' }));
app.use('/api', routes);
app.use((req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));
app.use(manejarErrores);

module.exports = app;
