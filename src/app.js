require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const manejarErrores = require('./middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.use((req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));
app.use(manejarErrores);

module.exports = app;
