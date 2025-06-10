const pool = require('./conexao');

async function inserirProduto(produto) {
  const { nome, categoria, fornecedores, lote } = produto;

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 1. Inserir produto (sem numero_serie)
    const produtoRes = await client.query(
      `INSERT INTO produtos (nome, categoria, fornecedor)
       VALUES ($1, $2, $3)
       RETURNING id_produto`,
      [nome, categoria, fornecedores]
    );
    const id_produto = produtoRes.rows[0].id_produto;

    // 2. Inserir lote (com numero_serie)
    const loteRes = await client.query(
      `INSERT INTO lotes (produto_id, data_validade, quantidade, numero_serie)
       VALUES ($1, $2, $3, $4)
       RETURNING id_lote`,
      [
        id_produto,
        lote.dataValidade,
        lote.quantidade,
        lote.numeroSerie || null
      ]
    );
    const id_lote = loteRes.rows[0].id_lote;

    // 3. Inserir estoque
    await client.query(
      `INSERT INTO estoque (produto_id, lote_id, quantidade)
       VALUES ($1, $2, $3)`,
      [id_produto, id_lote, lote.quantidade]
    );

    await client.query('COMMIT');
    return { id_produto, id_lote };

  } catch (err) {
    await client.query('ROLLBACK');
    console.error("Erro ao inserir produto/lote/estoque:", err);
    throw err;
  } finally {
    client.release();
  }
}

module.exports = inserirProduto;
