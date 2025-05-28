const pool = require('./conexao');

async function inserirProduto(produto) {
  const { nome, categoria, quantidade, validade, fornecedores, numeroDeSerie } = produto;

  try {
    const resultado = await pool.query(
      `INSERT INTO produtos (nome, categoria, quantidade, validade, fornecedor, numero_serie)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id_produto`,
      [nome, categoria, quantidade, validade, fornecedores, numeroDeSerie]
    );

    return resultado.rows[0];
  } catch (err) {
    console.error("Erro ao inserir produto:", err);
    throw err;
  }
}

module.exports = inserirProduto;