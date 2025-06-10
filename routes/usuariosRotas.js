const pool = require('../db/conexao');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');
const inserirUsuario = require('../db/inserirUsuario');
const adminMiddleware = require('../middlewares/adminMiddleware');


// Rota de cadastro inicial (sem autenticação)
router.post('/cadastro-inicial', async (req, res) => {
  try {
    // Verifica se já existe algum usuário
    const { rows } = await pool.query('SELECT COUNT(*) FROM usuarios');
    const quantidadeUsuarios = parseInt(rows[0].count);
    
    if (quantidadeUsuarios > 0) {
      return res.status(403).json({ 
        erro: 'Cadastro inicial já foi realizado. Use a rota normal de cadastro.' 
      });
    }

    // Força o tipo admin para o primeiro usuário
    req.body.tipoUsuario = 'admin';
    
    const usuario = await inserirUsuario(req.body);
    res.status(201).json({ 
      message: 'Usuário admin cadastrado com sucesso!',
      usuario: {
        id: usuario.id_usuario,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo_usuario
      }
    });
  } catch (error) {
    console.error('Erro no cadastro inicial:', error);
    res.status(400).json({ error: error.message });
  }
});
// Proteja a rota com o middleware de autenticação
router.post('/enviar', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const usuario = await inserirUsuario(req.body);
    res.status(201).json({ 
      message: 'Usuário cadastrado com sucesso!',
      usuario: {
        id: usuario.id_usuario,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo_usuario
      }
    });
} catch (error) {
  console.error('Erro ao cadastrar usuário:', error);
  res.status(400).json({ 
    error: error.message,
    details: error.details || null 
  });
}
});

module.exports = router;