const pool = require('./conexao');

async function getDashboardData() {
  const now = new Date();
  const weekAgo = new Date(now);
  weekAgo.setDate(now.getDate() - 7);

  const [
    usuarios,
    produtos,
    fornecedores,
    entradasRecentes,
    fornecedoresRecentes,
    totalEstoque
  ] = await Promise.all([
    pool.query('SELECT COUNT(*) FROM usuarios'),
    pool.query('SELECT COUNT(*) FROM produtos'),
    pool.query('SELECT COUNT(*) FROM fornecedores'),
    pool.query(`
      SELECT COUNT(*) FROM estoque 
      WHERE created_at >= $1
    `, [weekAgo]),
    pool.query(`
      SELECT COUNT(DISTINCT p.fornecedor)
      FROM estoque e
      JOIN produtos p ON e.produto_id = p.id_produto
      WHERE e.created_at >= $1
    `, [weekAgo]),
    pool.query(`SELECT COALESCE(SUM(quantidade), 0) AS total FROM estoque`)
  ]);

  return {
    totalUsuarios: parseInt(usuarios.rows[0].count),
    totalProdutos: parseInt(produtos.rows[0].count),
    totalFornecedores: parseInt(fornecedores.rows[0].count),
    entradasRecentes: parseInt(entradasRecentes.rows[0].count),
    fornecedoresRecentes: parseInt(fornecedoresRecentes.rows[0].count),
    totalEstoque: parseInt(totalEstoque.rows[0].total)
  };
}

module.exports = { getDashboardData };
