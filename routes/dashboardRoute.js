const express = require('express');
const router = express.Router();
const { getDashboardData } = require('../db/dashboardQueries');

router.get('/dashboard', async (req, res) => {
  try {
    const data = await getDashboardData();
    res.json(data);
  } catch (error) {
    console.error('Erro no dashboard:', error);
    res.status(500).json({ erro: 'Erro ao buscar dados do dashboard' });
  }
});

module.exports = router;
