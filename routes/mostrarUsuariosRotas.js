const express = require('express');
const router = express.Router();
const buscarUsuarios = require('../db/mostrarUsuarios');

router.get('/mostrar', async (req, res) => {
  try {
    const usuarios = await buscarUsuarios();
    res.json(usuarios);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar usuarios');
  }
});

module.exports = router;