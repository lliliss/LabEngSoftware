// routes/notificacoes.js
const express = require('express');
const router = express.Router();
const notificacoesController = require('../db/notificacoesQuery');
const authMiddleware = require('../middlewares/authMiddleware');

console.log("Carregando rota de notificações...");


router.get('/estoque-baixo',authMiddleware, async (req, res) => {
  try {
    const produtos = await notificacoesController.getProdutosEstoqueBaixo();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos com estoque baixo' });
  }
});

router.get('/vencimento-proximo', authMiddleware, async (req, res) => {
  try {
    const produtos = await notificacoesController.getProdutosVencimentoProximo();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos com vencimento próximo' });
  }
});

module.exports = router;