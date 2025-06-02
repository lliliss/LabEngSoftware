const express = require('express');
const router = express.Router();
const inserirProduto = require('../db/inserirProduto');

router.post('/enviar', async (req, res) => {
  try {
    const novoProduto = await inserirProduto(req.body);
    res.status(201).json({ message: 'Produto inserido com sucesso!', id: novoProduto.id_produto });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao inserir produto' });
  }
});

module.exports = router;