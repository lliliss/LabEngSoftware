const pool = require("./conexao");

async function editarProduto(dados) {
  const {
    id_produto,
    id_lote,
    nome,
    categoria,
    fornecedor,
    validade,
    quantidade,
    serie
  } = dados;
  // Atualiza produtos
  const queryProdutos = `
    UPDATE produtos
    SET nome = $1, categoria = $2, fornecedor = $3
    WHERE id_produto = $4
  `;
  await pool.query(queryProdutos, [nome, categoria, fornecedor, id_produto]);

 // Atualiza a tabela lotes - verifica se id_lote foi passado
  if (id_lote) {
    const queryLotes = `
      UPDATE lotes
      SET data_validade = $1, quantidade = $2, numero_serie = $3
      WHERE id_lote = $4
    `;
    await pool.query(queryLotes, [validade, quantidade, serie, id_lote]);
  } else {
    console.warn("ID do lote não foi informado. Não foi possível atualizar a tabela lotes.");
  }

  // Atualiza estoque (opcional, se necessário)
  const queryEstoque = `
    UPDATE estoque
    SET quantidade = $1
    WHERE produto_id = $2 AND lote_id = $3
  `;
  await pool.query(queryEstoque, [quantidade, id_produto, id_lote]);
}


module.exports = editarProduto;
