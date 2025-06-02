const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const pool = require('../db') 

router.post('/login', async (req, res) => {
  const {email, senha} = req.body

  if (!email || !senha) {
    return res.status(400).json({error: 'Email e senha são obrigatórios.'})
  }

  try {
    const result = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1',
      [email]
    )

    if (result.rows.length === 0) {
      return res.status(401).json({error: 'Usuário não encontrado.'})
    }

    const usuario = result.rows[0]

    const senhaValida = await bcrypt.compare(senha, usuario.senha)

    if (!senhaValida) {
      return res.status(401).json({error: 'Senha incorreta.'})
    }

    const token = jwt.sign({id: usuario.id, email: usuario.email}, 'segredo_super_secreto', {
      expiresIn: '2h',
    })

    res.json({message: 'Login bem-sucedido!', token})
  } catch (err) {
    console.error('Erro ao fazer login:', err)
    res.status(500).json({error: 'Erro interno do servidor.'})
  }
})

module.exports = router