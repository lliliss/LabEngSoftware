const express = require("express");
const router = express.Router();
const deleteProdutoPorId = require("../db/deleteProduto"); 

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido." });
  }

  try {
    const sucesso = await deleteProdutoPorId(id);
    if (sucesso) {
      res.status(200).json({ mensagem: "Produto excluído com sucesso." });
    } else {
      res.status(404).json({ erro: "Produto não encontrado." });
    }
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao excluir produto." });
  }
});

module.exports = router;