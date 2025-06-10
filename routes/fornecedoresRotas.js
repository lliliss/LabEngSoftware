const express = require("express");
const router = express.Router();
const inserirFornecedor = require("../db/inserirFornecedores");
const pool = require('../db/conexao');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/enviar', authMiddleware, async (req, res) => {
  try {
    const novoFornecedor = await inserirFornecedor(req.body);
    res.status(201).json({ message: 'Fornecedor inserido com sucesso!', id: novoFornecedor.id_fornecedor });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao inserir fornecedor' });
  }
});


// GET /api/fornecedores
router.get('/', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT id_fornecedor, nome FROM fornecedores');
    res.json(resultado.rows);
  } catch (erro) {
    console.error('Erro ao buscar fornecedores:', erro);
    res.status(500).json({ erro: 'Erro interno no servidor' });
  }
});



module.exports = router;
