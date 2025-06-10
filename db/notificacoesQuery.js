const pool = require('./conexao');

console.log("Carregando módulo de notificações do DB...");



// Buscar produtos com estoque baixo (definindo limite como 20)
async function getProdutosEstoqueBaixo() {
  try {
    const res = await pool.query(`
      SELECT p.nome, l.data_validade, l.quantidade
      FROM produtos p
      JOIN lotes l ON p.id_produto = l.produto_id
      WHERE l.quantidade < 20
      ORDER BY l.quantidade ASC
    `);
    return res.rows.map(row => ({
      ...row,
      data_validade: new Date(row.data_validade).toLocaleDateString('pt-BR')
    }));
  } catch (err) {
    console.error('Erro ao buscar produtos com estoque baixo por lote:', err);
    return [];
  }
}



// Buscar produtos com vencimento próximo (30 dias)
async function getProdutosVencimentoProximo() {
  try {
    const res = await pool.query(`
      SELECT p.nome, l.data_validade, l.quantidade
      FROM produtos p
      JOIN lotes l ON p.id_produto = l.produto_id
      WHERE l.data_validade BETWEEN CURRENT_DATE AND (CURRENT_DATE + INTERVAL '30 days')
      ORDER BY l.data_validade ASC
    `);
    return res.rows.map(row => ({
      ...row,
      data_validade: new Date(row.data_validade).toLocaleDateString('pt-BR')
    }));
  } catch (err) {
    console.error('Erro ao buscar produtos com vencimento próximo:', err);
    return [];
  }
}



module.exports = {
  getProdutosEstoqueBaixo,
  getProdutosVencimentoProximo
};