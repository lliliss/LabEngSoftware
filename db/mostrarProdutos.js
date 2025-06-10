// consultarProdutos.js
const pool = require('./conexao');

async function buscarProdutos() {
  try {
    const query = `
      SELECT 
        p.id_produto, 
        p.nome, 
        p.categoria, 
        e.quantidade, 
        l.data_validade AS validade, 
        f.nome AS fornecedor,
        l.numero_serie AS serie,
        l.id_lote
      FROM produtos p
      JOIN lotes l ON p.id_produto = l.produto_id
      JOIN estoque e ON e.lote_id = l.id_lote AND e.produto_id = p.id_produto
      JOIN fornecedores f ON CAST(p.fornecedor AS integer) = f.id_fornecedor


    `;
    const result = await pool.query(query);

    // Formatar a data para cada produto
    const produtosFormatados = result.rows.map(produto => {
      const data = new Date(produto.validade);
      const dia = data.getDate().toString().padStart(2, '0');
      const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // mês começa do zero
      const ano = data.getFullYear();
      return {
        ...produto,
        validade: `${dia}/${mes}/${ano}`
      };
    });

    return produtosFormatados;
  } catch (err) {
    console.error("Erro no banco:", err);
    throw err;
  }
}


module.exports = buscarProdutos;
