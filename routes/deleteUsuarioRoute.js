
const express = require("express");
const router = express.Router();
const deleteUsuarioPorId = require("../db/deleteUsuario"); 
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido." });
  }

  try {
    const sucesso = await deleteUsuarioPorId(id);
    if (sucesso) {
      res.status(200).json({ mensagem: "Usuário excluído com sucesso." });
    } else {
      res.status(404).json({ erro: "Usuário não encontrado." });
    }
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao excluir Usuário." });
  }
});

module.exports = router;
