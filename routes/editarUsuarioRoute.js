const express = require("express");
const router = express.Router();
const editarUsuario = require("../db/editarUsuario");
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

// Se só tiver o id_usuario na URL, id_lote vem no body:
router.put("/editar/:id_usuario", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const id_usuario = parseInt(req.params.id_usuario);
        const {
            nome,
            email,
            tipo_usuario,
            senha
        } = req.body;

        await editarUsuario({
            id_usuario,
            nome,
            email,
            tipo_usuario,
            senha
        });

        res.status(200).json({ mensagem: "Usuário atualizado com sucesso!" });
    } catch (erro) {
        console.error("Erro ao editar usuario:", erro);
        res.status(500).json({ erro: "Erro ao editar usuario" });
    }
});



module.exports = router;
