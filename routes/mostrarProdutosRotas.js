const express = require('express');
const router = express.Router();
const buscarProdutos = require('../db/mostrarProdutos');

router.get('/mostrar', async (req, res) => {
  try {
    const produtos = await buscarProdutos();
    res.json(produtos);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar produtos');
  }
});

module.exports = router;