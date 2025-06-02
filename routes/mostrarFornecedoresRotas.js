const express = require('express');
const router = express.Router();
const buscarFornecedores = require('../db/mostrarFornecedores');

router.get('/mostrar', async (req, res) => {
  try {
    const fornecedores = await buscarFornecedores();
    res.json(fornecedores);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar fornecedores');
  }
});

module.exports = router;