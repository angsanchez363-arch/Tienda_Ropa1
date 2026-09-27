const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET todos los prendas
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM prendas ORDER BY id_prenda');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener prendas' });
  }
});

// GET un prenda
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM prendas WHERE id_prenda = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Prenda no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener prenda' });
  }
});

// POST - Añadir prenda
router.post('/', async (req, res) => {
  try {
    const { nombre, cantidad, precio } = req.body;
    const [result] = await pool.query(
      'INSERT INTO prendas (nombre, cantidad, precio) VALUES (?, ?, ?)',
      [nombre, cantidad, precio]
    );
    res.json({ id_prenda: result.insertId, nombre, cantidad, precio });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear prenda' });
  }
});

// PUT - Modificar prenda
router.put('/:id', async (req, res) => {
  try {
    const { nombre, cantidad, precio } = req.body;
    await pool.query(
      'UPDATE prendas SET nombre=?, cantidad=?, precio=? WHERE id_prenda=?',
      [nombre, cantidad, precio, req.params.id]
    );
    res.json({ mensaje: 'Prenda actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar prenda' });
  }
});

// DELETE - Eliminar prenda
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM prendas WHERE id_prenda = ?', [req.params.id]);
    res.json({ mensaje: 'Prenda eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar prenda' });
  }
});

module.exports = router;
