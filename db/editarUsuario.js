const pool = require("./conexao");

async function editarUsuario(dados) {
  const {
    id_usuario,
    nome,
    email,
    cargo,
  } = dados;
  // Atualiza usuarios
  const queryUsuarios = `
    UPDATE usuarios
    SET nome = $1, email = $2, tipo_usuario = $3
    WHERE id_produto = $4
  `;
  await pool.query(queryUsuarios, [nome, email, cargo, id_usuario]);

}

module.exports = editarUsuario;
