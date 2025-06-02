const express = require("express");
const router = express.Router();
const editarUsuario = require("../db/editarUsuario");

router.put("/editar/:id_usuario", async (req, res) => {
  try {
    const id_usuario = parseInt(req.params.id_usuario);
    const {
      nome,
      email,
      tipo_usuario,
    } = req.body;

    await editarUsuario({
      id_usuario,
      nome,
      email,
      tipo_usuario,
    });

    res.status(200).json({ mensagem: "Usuário atualizado com sucesso!" });
  } catch (erro) {
    console.error("Erro ao editar usuario:", erro);
    res.status(500).json({ erro: "Erro ao editar usuario" });
  }
})

module.exports = router;