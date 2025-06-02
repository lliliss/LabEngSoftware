const express = require("express");
const router = express.Router();
const editarFornecedor = require("../db/editarFornecedor");

router.put("/editar/:id_fornecedor", async (req, res) => {
  try {
    const id_fornecedor = parseInt(req.params.id_fornecedor);
    const {
      nome,
      email,
      cnpj
    } = req.body;

    await editarFornecedor({
      id_fornecedor,
      nome,
      email,
      cnpj
    });

    res.status(200).json({ mensagem: "Fornecedor atualizado com sucesso!" });
  } catch (erro) {
    console.error("Erro ao editar fornecedor:", erro);
    res.status(500).json({ erro: "Erro ao editar fornecedor" });
  }
});

module.exports = router;