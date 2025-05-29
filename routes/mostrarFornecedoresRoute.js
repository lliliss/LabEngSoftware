// produtosRoute.js
const express = require('express');
const router = express.Router();
const buscarFornecedores = require('../db/mostrarFornecedores');

router.get('/mostrar', async (req, res) => {
  try {
    const produtos = await buscarFornecedores();
    res.json(produtos);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar fornecedores');
  }
});

module.exports = router;
