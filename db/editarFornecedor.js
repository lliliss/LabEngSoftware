const pool = require("./conexao");

async function editarFornecedor(dados) {
  const {
    id_fornecedor,
    nome,
    email,
    cnpj
  } = dados;

  const queryProdutos = `
    UPDATE fornecedores
    SET nome = $1, email = $2, cnpj = $3
    WHERE id_fornecedor = $4
  `;
  await pool.query(queryProdutos, [nome, email, cnpj, id_fornecedor]);
}


module.exports = editarFornecedor;
