const pool = require("./conexao");
const bcrypt = require("bcrypt");

async function editarUsuario(dados) {
    const {
        id_usuario,
        nome,
        email,
        tipo_usuario,
        senha
    } = dados;
    
    // Atualiza informações básicas
    const queryUsuarios = `
        UPDATE usuarios
        SET nome = $1, email = $2, tipo_usuario = $3
        WHERE id_usuario = $4
    `;
    await pool.query(queryUsuarios, [nome, email, tipo_usuario, id_usuario]);

    // Se houver nova senha, atualiza
    if (senha) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(senha, saltRounds);
        
        const querySenha = `
            UPDATE usuarios
            SET senha = $1
            WHERE id_usuario = $2
        `;
        await pool.query(querySenha, [hashedPassword, id_usuario]);
    }
}

module.exports = editarUsuario;