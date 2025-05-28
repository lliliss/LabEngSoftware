const express = require('express');
const router = express.Router();
const inserirUsuario = require('../db/inserirUsuario');

router.post('/enviar', async (req, res) => {
  try {
    const novoUsuario = await inserirUsuario(req.body);
    res.status(201).json({ message: 'Usuário inserido com sucesso!', id: novoUsuario.id_usuario });
  } catch (err) {
    console.error("Erro ao inserir usuário:", err.message);
    res.status(500).json({ error: 'Erro ao inserir usuário.' });
  }
});

module.exports = router;
