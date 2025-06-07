const express = require('express')
const router = express.Router()
const pool = require('../db')

router.get('/', async (req, res) => {
  try {
    const diasLimite = 7

    const resultado = await pool.query(`
      SELECT id, nome, validade, quantidade
      FROM produtos
    `)

    const hoje = new Date()
    const notificacoes = []

    resultado.rows.forEach(produto => {
      const validade = new Date(produto.validade)
      const diasParaVencer = Math.ceil((validade - hoje) / (1000 * 60 * 60 * 24))

      if (diasParaVencer <= diasLimite && diasParaVencer >= 0) {
        notificacoes.push({
          tipo: 'vencimento',
          mensagem: `Produto "${produto.nome}" vence em ${diasParaVencer} dia(s).`
        })
      }

      if (produto.quantidade <= 0) {
        notificacoes.push({
          tipo: 'estoque',
          mensagem: `Produto "${produto.nome}" está com estoque zerado.`
        })
      }
    })
    res.json({notificacoes})

  } catch (erro) {
    console.error('Erro ao buscar notificações:', erro)
    res.status(500).json({erro: 'Erro interno do servidor'})
  }
})

module.exports = router