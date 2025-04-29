const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM usuarios ORDER BY nome')
  res.json(result.rows)
})

router.get('/buscar', async (req, res) => {
  const nome = req.query.nome || ''
  const result = await db.query(
    'SELECT * FROM usuarios WHERE nome ILIKE $1',
    [`%${nome}%`]
  )
  res.json(result.rows)
})

router.post('/', async (req, res) => {
  const { nome, email, senha, tipo_usuario } = req.body
  const result = await db.query(
    `INSERT INTO usuarios (nome, email, senha, tipo_usuario)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [nome, email, senha, tipo_usuario]
  )
  res.status(201).json(result.rows[0])
})


module.exports = router