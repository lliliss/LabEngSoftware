/*const express = require('express');
const router = express.Router();
const inserirProduto = require('../db/inserirProduto');

router.post('/enviar', async (req, res) => {
  const novoProduto = req.body;

  try {
    const resultado = await inserirProduto(novoProduto);
    res.status(201).json({ mensagem: 'Produto inserido com sucesso!', id: resultado.id_produto });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao inserir produto.' });
  }
});

module.exports = router;*/
const express = require('express');
const router = express.Router();
const pool = require('../db/conexao');
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