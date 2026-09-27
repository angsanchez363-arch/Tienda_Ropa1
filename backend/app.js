const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas de ropa
const clientesRouter = require('./routes/clientes');
const prendasRouter = require('./routes/prendas');
const ventasRouter = require('./routes/ventas');

app.use('/clientes', clientesRouter);
app.use('/prendas', prendasRouter);
app.use('/ventas', ventasRouter);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'API ATELIER 27 — Tienda de Ropa funcionando correctamente' });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor backend ATELIER 27 corriendo en http://localhost:${PORT}`);
});
