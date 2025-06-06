const express = require('express')
const router = express.Router()
const pool = require('../db/conexao');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewares/authMiddleware'); 

router.post('/login', async (req, res) => {
  const { email, senha } = req.body

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Email e senha são obrigatórios.' })
  }

  try {
    const resultado = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email])

    if (resultado.rows.length === 0) {
      return res.status(401).json({ erro: 'Credenciais inválidas.' }) // Mensagem genérica por segurança
    }

    const usuario = resultado.rows[0]
    
    // Verifica se a senha está correta
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha)

    if (!senhaCorreta) {
      return res.status(401).json({ erro: 'Credenciais inválidas.' }) // Mensagem genérica por segurança
    }

    // Cria o token JWT
    const token = jwt.sign(
      { 
        id: usuario.id_usuario, 
        email: usuario.email,
        tipo: usuario.tipo_usuario 
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    )

    // Retorna o token e informações básicas do usuário
    res.json({
      mensagem: 'Login realizado com sucesso.',
      token,
      user: {
        id: usuario.id_usuario,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo_usuario
      }
    })
  } catch (erro) {
    console.error(erro)
    res.status(500).json({ erro: 'Erro no servidor ao autenticar.' })
  }
})


// Adicione esta nova rota para verificar o token
router.get('/verificar', authMiddleware, (req, res) => {
  res.json({ 
    valido: true, 
    user: {
      id: req.usuario.id,
      email: req.usuario.email,
      tipo: req.usuario.tipo
    }
  })
})

module.exports = router