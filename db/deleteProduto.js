// db/deleteProduto.js
const pool = require('./conexao');

async function deleteProdutoPorId(id_produto) {
  try {
    const result = await pool.query('DELETE FROM produtos WHERE id_produto = $1', [id_produto]);
    return result.rowCount > 0;
  } catch (error) {
    console.error("Erro ao excluir produto no banco:", error);
    throw error;
  }
}

module.exports = deleteProdutoPorId;
