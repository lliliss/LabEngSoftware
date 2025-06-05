/*const express = require('express')
const router = express.Router()
const pool = require('../conexao');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/login', async (req, res) => {
  const {email, senha} = req.body

  if (!email || !senha) {
    return res.status(400).json({erro: 'Email e senha são obrigatórios.'})
  }

  try {
    const resultado = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email])

    if (resultado.rows.length === 0) {
      return res.status(401).json({erro: 'Usuário não encontrado.'})
    }

    const usuario = resultado.rows[0]
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha)

    if (!senhaCorreta) {
      return res.status(401).json({erro: 'Senha incorreta.'})
    }

    const token = jwt.sign({id: usuario.id, email: usuario.email }, process.env.JWT_SECRET, {expiresIn: '2h'})

    res.json({mensagem: 'Login realizado com sucesso.', token})
  } catch (erro) {
    console.error(erro)
    res.status(500).json({erro: 'Erro no servidor ao autenticar.'})
  }
})

module.exports = router*/