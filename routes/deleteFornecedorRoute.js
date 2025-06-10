const express = require("express");
const router = express.Router();
const deleteFornecedorPorId = require("../db/deleteFornecedor"); 
const authMiddleware = require('../middlewares/authMiddleware');

router.delete("/:id", authMiddleware, async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido." });
  }

  try {
    const sucesso = await deleteFornecedorPorId(id);
    if (sucesso) {
      res.status(200).json({ mensagem: "Fornecedor excluído com sucesso." });
    } else {
      res.status(404).json({ erro: "Fornecedor não encontrado." });
    }
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao excluir fornecedor." });
  }
});

module.exports = router;
