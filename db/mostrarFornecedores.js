// consultarFornecedores.js
const pool = require('./conexao');

async function buscarFornecedores() {
  try {
    const query = `
      SELECT 
        f.id_fornecedor, 
        f.nome, 
        f.email, 
        f.cnpj
      FROM fornecedores f;
    `;
    
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    console.error("Erro ao buscar fornecedores:", err);
    throw err;
  }
}

module.exports = buscarFornecedores;
