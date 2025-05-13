const bcrypt = require('bcrypt')

router.post('/resetar-senha/:token', async (req, res) => {
  const { token } = req.params
  const { novaSenha } = req.body

  try {
    const result = await pool.query(`
      SELECT * FROM tokens_recuperacao
      WHERE token = $1 AND expira_em > NOW()
    `, [token])

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Token inválido ou expirado.' })
    }

    const usuarioId = result.rows[0].usuario_id
    const hash = await bcrypt.hash(novaSenha, 10)

    await pool.query(`UPDATE usuarios SET senha = $1 WHERE id = $2`, [hash, usuarioId])
    await pool.query(`DELETE FROM tokens_recuperacao WHERE token = $1`, [token])

    res.json({ msg: 'Senha redefinida com sucesso.' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao redefinir senha.' })
  }
})