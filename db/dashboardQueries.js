const pool = require('./conexao');


// dashboardQueries.js - Atualizado para garantir todos os campos
async function getDashboardData() {
  console.log('Iniciando getDashboardData');
  try {
    const now = new Date();
    const weekAgo = new Date(now);
    weekAgo.setDate(now.getDate() - 7);

    const results = await Promise.all([
      pool.query('SELECT COUNT(*) FROM usuarios'),
      pool.query('SELECT COUNT(*) FROM produtos'),
      pool.query('SELECT COUNT(*) FROM fornecedores'),
      pool.query('SELECT COUNT(*) FROM estoque WHERE created_at >= $1', [weekAgo]),
      pool.query(`
        SELECT COUNT(DISTINCT p.fornecedor)
        FROM estoque e
        JOIN produtos p ON e.produto_id = p.id_produto
        WHERE e.created_at >= $1
      `, [weekAgo]),
      pool.query('SELECT COALESCE(SUM(quantidade), 0) AS total FROM estoque')
    ]);

    console.log('Resultados das queries:', results);

    // Mapear resultados com fallback para 0
    const [
      usuarios,
      produtos,
      fornecedores,
      entradasRecentes,
      fornecedoresRecentes,
      totalEstoque
    ] = results.map(r => parseInt(r.rows[0].count || r.rows[0].total || 0));

    return {
      totalUsuarios: usuarios,
      totalProdutos: produtos,
      totalFornecedores: fornecedores,
      entradasRecentes: entradasRecentes,
      fornecedoresRecentes: fornecedoresRecentes,
      totalEstoque: totalEstoque
    };
  } catch (error) {
    console.error('Erro detalhado:', error.stack);
    // Retornar objeto com valores padrão em caso de erro
    return {
      totalUsuarios: 0,
      totalProdutos: 0,
      totalFornecedores: 0,
      entradasRecentes: 0,
      fornecedoresRecentes: 0,
      totalEstoque: 0
    };
  }
}

module.exports = getDashboardData;