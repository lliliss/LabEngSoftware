const express = require('express')
const router = express.Router()
const pool = require('../db')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
require('dotenv').config()

router.post('/recuperar-senha', async (req, res) => {
  const { email } = req.body

  try {
    const result = await pool.query('SELECT id FROM usuarios WHERE email = $1', [email])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'E-mail não encontrado.' })
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiracao = new Date(Date.now() + 3600000); 

    await pool.query(`
      INSERT INTO tokens_recuperacao (usuario_id, token, expira_em)
      VALUES ($1, $2, $3)
    `, [result.rows[0].id, token, expiracao])

    const link = `${process.env.FRONTEND_URL}/resetar-senha/${token}`

    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    await transporter.sendMail({
      from: `"PharmaSafe" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Recuperação de senha",
      html: `<p>Para redefinir sua senha, clique no link abaixo:</p>
             <a href="${link}">${link}</a>`
    })

    res.json({ msg: 'Link enviado por e-mail.' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao enviar e-mail.' })
  }
})
