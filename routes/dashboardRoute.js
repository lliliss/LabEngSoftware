const express = require('express');
const router = express.Router();
const getDashboardData = require('../db/dashboardQueries');

router.get('/mostrar', async (req, res) => {
  try {
    console.log('Recebida requisição para /dashboard');
    const data = await getDashboardData();
    console.log('Dados retornados:', data);
    res.json(data);
  } catch (error) {
    console.error('Erro no dashboard:', error);
    res.status(500).json({ erro: 'Erro ao buscar dados do dashboard' });
  }
});

module.exports = router;
