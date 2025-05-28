const express = require("express");
const router = express.Router();
const inserirFornecedor = require("../db/inserirFornecedores");

router.post('/enviar', async (req, res) => {
  try {
    const novoFornecedor = await inserirFornecedor(req.body);
    res.status(201).json({ message: 'Fornecedor inserido com sucesso!', id: novoFornecedor.id_fornecedor });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao inserir produto' });
  }
});


module.exports = router;
