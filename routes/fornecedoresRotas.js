const express = require("express")
const router = express.Router()
const pool = require("../db")

router.get("/", async (req, res) => {
  try {
    const resultado = await pool.query("SELECT * FROM fornecedores")
    res.json(resultado.rows)
  } catch (err) {
    console.error("Erro ao buscar fornecedores:", err)
    res.status(500).json({ message: "Erro no servidor" })
  }
})

router.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const resultado = await pool.query(
      "SELECT * FROM fornecedores WHERE id_fornecedor = $1",
      [id]
    )

    if (resultado.rows.length === 0) {
      return res.status(404).json({ message: "Fornecedor não encontrado." })
    }

    res.json(resultado.rows[0])
  } catch (err) {
    console.error("Erro ao buscar fornecedor:", err)
    res.status(500).json({ message: "Erro no servidor" })
  }
})

router.post("/", async (req, res) => {
  const { nome, cnpj, telefone, email } = req.body;

  if (!nome || !cnpj || !telefone || !email) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios!" })
  }

  try {
    const resultado = await pool.query(
      "INSERT INTO fornecedores (nome, cnpj, telefone, email) VALUES ($1, $2, $3, $4) RETURNING *",
      [nome, cnpj, telefone, email]
    )

    res.status(201).json(resultado.rows[0])
  } catch (err) {
    console.error("Erro ao adicionar fornecedor:", err)
    res.status(500).json({ message: "Erro no servidor" })
  }
})

router.put("/:id", async (req, res) => {
  const id = req.params.id
  const { nome, cnpj, telefone, email } = req.body

  try {
    const resultado = await pool.query(
      `UPDATE fornecedores 
       SET nome = COALESCE($1, nome),
           cnpj = COALESCE($2, cnpj),
           telefone = COALESCE($3, telefone),
           email = COALESCE($4, email)
       WHERE id_fornecedor = $5
       RETURNING *`,
      [nome, cnpj, telefone, email, id]
    )

    if (resultado.rows.length === 0) {
      return res.status(404).json({ message: "Fornecedor não encontrado." })
    }

    res.json({ message: "Fornecedor atualizado com sucesso.", fornecedor: resultado.rows[0] })
  } catch (err) {
    console.error("Erro ao atualizar fornecedor:", err)
    res.status(500).json({ message: "Erro no servidor" })
  }
})

router.delete("/:id", async (req, res) => {
  const id = req.params.id

  try {
    const resultado = await pool.query(
      "DELETE FROM fornecedores WHERE id_fornecedor = $1 RETURNING *",
      [id]
    )

    if (resultado.rows.length === 0) {
      return res.status(404).json({ message: "Fornecedor não encontrado." })
    }

    res.json({ message: "Fornecedor removido com sucesso." })
  } catch (err) {
    console.error("Erro ao remover fornecedor:", err)
    res.status(500).json({ message: "Erro no servidor" })
  }
})

module.exports = router