const express = require('express');
const router = express.Router();
const buscarUsuarios = require('../db/mostrarUsuarios');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.get('/mostrar', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const usuarios = await buscarUsuarios();
    res.json(usuarios);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar usuarios');
  }
});

module.exports = router;
