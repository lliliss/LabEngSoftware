const express = require("express");
const router = express.Router();
const editarProduto = require("../db/editarProduto");
const authMiddleware = require('../middlewares/authMiddleware');

// Se só tiver o id_produto na URL, id_lote vem no body:
router.put("/editar/:id_produto", authMiddleware, async (req, res) => {
  try {
    const id_produto = parseInt(req.params.id_produto);
    const {
      nome,
      categoria,
      fornecedores,
      lote: { quantidade, dataValidade, numero_serie, id_lote }
    } = req.body;

    await editarProduto({
      id_produto,
      id_lote,
      nome,
      categoria,
      fornecedor: fornecedores,
      validade: dataValidade,
      quantidade,
      numero_serie: numero_serie
    });

    res.status(200).json({ mensagem: "Produto atualizado com sucesso!" });
  } catch (erro) {
    console.error("Erro ao editar produto:", erro);
    res.status(500).json({ erro: "Erro ao editar produto" });
  }
});



module.exports = router;
