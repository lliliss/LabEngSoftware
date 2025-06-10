const pool = require('./conexao');

async function inserirFornecedor(dados) {
  const { nome, cnpj, email } = dados;

  if (!nome || !cnpj || !email) {
    throw new Error("Campos obrigatórios faltando.");
  }

  const resultado = await pool.query(
    "INSERT INTO fornecedores (nome, cnpj, email, created_at) VALUES ($1, $2, $3, now()) RETURNING *",
    [nome, cnpj, email]
  );

  return resultado.rows[0];
}

module.exports = inserirFornecedor;