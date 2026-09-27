const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET todos los clientes
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM clientes ORDER BY id_cliente');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
});

// GET un cliente
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM clientes WHERE id_cliente = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener cliente' });
  }
});

// POST - Añadir cliente
router.post('/', async (req, res) => {
  try {
    const { nombre, contacto, departamento, ciudad } = req.body;
    const [result] = await pool.query(
      'INSERT INTO clientes (nombre, contacto, departamento, ciudad) VALUES (?, ?, ?, ?)',
      [nombre, contacto, departamento, ciudad]
    );
    res.json({ id_cliente: result.insertId, nombre, contacto, departamento, ciudad });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear cliente' });
  }
});

// PUT - Modificar cliente
router.put('/:id', async (req, res) => {
  try {
    const { nombre, contacto, departamento, ciudad } = req.body;
    await pool.query(
      'UPDATE clientes SET nombre=?, contacto=?, departamento=?, ciudad=? WHERE id_cliente=?',
      [nombre, contacto, departamento, ciudad, req.params.id]
    );
    res.json({ mensaje: 'Cliente actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar cliente' });
  }
});

// DELETE - Eliminar cliente
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM clientes WHERE id_cliente = ?', [req.params.id]);
    res.json({ mensaje: 'Cliente eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar cliente' });
  }
});

module.exports = router;
