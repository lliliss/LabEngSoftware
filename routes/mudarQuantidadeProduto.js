const express = require('express');
const router = express.Router();
const pool = require('../db/conexao'); // Importa o pool diretamente

router.post('/atualizar-quantidade', async (req, res) => {
  console.log('Corpo da requisição:', req.body);
  
  const { produtoId, loteId, quantidadeAnterior, quantidadeNova, tipo } = req.body;

  // Validação dos dados
  if (!produtoId || !loteId || isNaN(quantidadeAnterior) || isNaN(quantidadeNova) || !tipo) {
    console.error('Dados inválidos recebidos:', req.body);
    return res.status(400).json({ message: 'Dados inválidos' });
  }

  const client = await pool.connect(); // Conecta usando o pool diretamente
  try {
    await client.query('BEGIN');

    // 1. Atualiza o estoque
    const updateQuery = `
      UPDATE estoque
      SET quantidade = $1, updated_at = now()
      WHERE produto_id = $2 AND lote_id = $3
      RETURNING *`;
    
    const updateResult = await client.query(updateQuery, 
      [quantidadeNova, produtoId, loteId]);

    if (updateResult.rowCount === 0) {
      throw new Error('Produto não encontrado no estoque');
    }

    // 2. Insere no histórico
    const historicoQuery = `
      INSERT INTO ${tipo === 'aumento' ? 'aumento_estoque' : 'diminuir_estoque'} 
      (produto_id, lote_id, quantidade_anterior, quantidade_nova)
      VALUES ($1, $2, $3, $4)
      RETURNING *`;
    
    await client.query(historicoQuery, 
      [produtoId, loteId, quantidadeAnterior, quantidadeNova]);

    await client.query('COMMIT');
    
    console.log('Quantidade atualizada com sucesso');
    res.json({ 
      success: true,
      message: 'Quantidade atualizada com sucesso!',
      newQuantity: quantidadeNova
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Erro na transação:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erro interno ao atualizar quantidade',
      error: error.message
    });
  } finally {
    client.release();
  }
});

module.exports = router;