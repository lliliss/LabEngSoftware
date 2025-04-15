const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => { // Lista todos os produtos
  try {
    const resultado = await pool.query("SELECT * FROM produtos");
    res.json(resultado.rows);
  } catch (err) {
    console.error("Erro ao buscar produtos:", err);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

router.get("/:id", async (req, res) => { // Busca o produto por ID
  const id = req.params.id;
  try {
    const resultado = await pool.query(
      "SELECT * FROM produtos WHERE id_produto = $1",
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    res.json(resultado.rows[0]);
  } catch (err) {
    console.error("Erro ao buscar produto:", err);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

router.post("/", async (req, res) => { // Adiciona um novo produto
  const { nome, descricao, categoria } = req.body;

  if (!nome || !descricao || !categoria) {
    return res.status(400).json({ message: "Preencha todos os campos!" });
  }

  try {
    const resultado = await pool.query(
      "INSERT INTO produtos (nome, descricao, categoria) VALUES ($1, $2, $3) RETURNING *",
      [nome, descricao, categoria]
    );

    res.status(201).json(resultado.rows[0]);
  } catch (err) {
    console.error("Erro ao adicionar produto:", err);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

router.put("/:id", async (req, res) => { // Atualiza o produto
  const id = req.params.id;
  const { nome, descricao, categoria } = req.body;

  try {
    const resultado = await pool.query(
      `UPDATE produtos 
       SET nome = COALESCE($1, nome),
           descricao = COALESCE($2, descricao),
           categoria = COALESCE($3, categoria)
       WHERE id_produto = $4
       RETURNING *`,
      [nome, descricao, categoria, id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    res.json({ message: "Produto atualizado com sucesso.", produto: resultado.rows[0] });
  } catch (err) {
    console.error("Erro ao atualizar produto:", err);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

router.delete("/:id", async (req, res) => { // Remove o produto
  const id = req.params.id;

  try {
    const resultado = await pool.query(
      "DELETE FROM produtos WHERE id_produto = $1 RETURNING *",
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    res.json({ message: "Produto removido com sucesso." });
  } catch (err) {
    console.error("Erro ao remover produto:", err);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

module.exports = router;