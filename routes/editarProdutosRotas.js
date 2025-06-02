const express = require("express");
const router = express.Router();
const editarProduto = require("../db/editarProduto");

router.put("/editar/:id_produto", async (req, res) => {
  try {
    const id_produto = parseInt(req.params.id_produto);
    const {
      nome,
      categoria,
      fornecedores,
      lote: { quantidade, dataValidade, numeroSerie, id_lote }
    } = req.body;

    await editarProduto({
      id_produto,
      id_lote,
      nome,
      categoria,
      fornecedor: fornecedores,
      validade: dataValidade,
      quantidade,
      serie: numeroSerie
    });

    res.status(200).json({ mensagem: "Produto atualizado com sucesso!" });
  } catch (erro) {
    console.error("Erro ao editar produto:", erro);
    res.status(500).json({ erro: "Erro ao editar produto" });
  }
});

module.exports = router;