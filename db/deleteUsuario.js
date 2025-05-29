// db/deleteUsuario.js
const pool = require('./conexao');

async function deleteUsuarioPorId(id_usuario) {
  try {
    const result = await pool.query('DELETE FROM usuarios WHERE id_usuario = $1', [id_usuario]);
    return result.rowCount > 0;
  } catch (error) {
    console.error("Erro ao excluir usuário no banco:", error);
    throw error;
  }
}

module.exports = deleteUsuarioPorId;
