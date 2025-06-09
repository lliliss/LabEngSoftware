const express = require('express');
const router = express.Router();
const pool = require('../db/conexao'); // Importa o pool diretamente
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/atualizar-quantidade', authMiddleware, async (req, res) => {
  const { produtoId, loteId, quantidadeAnterior, quantidadeNova, tipo, dataValidade, numeroSerie } = req.body;

  // Validação dos dados
  if (!produtoId || isNaN(quantidadeAnterior) || isNaN(quantidadeNova) || !tipo) {
    return res.status(400).json({ message: 'Dados inválidos' });
  }

  // Para aumento, validar dados do novo lote
  if (tipo === 'aumento' && (!dataValidade || !numeroSerie)) {
    return res.status(400).json({ message: 'Para aumento, data de validade e número de série são obrigatórios' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    if (tipo === 'aumento') {
      // 1. Criar novo lote
      const novoLoteQuery = `
        INSERT INTO lotes (produto_id, data_validade, quantidade, numero_serie)
        VALUES ($1, $2, $3, $4)
        RETURNING id_lote`;
      
      const novoLoteResult = await client.query(novoLoteQuery, 
        [produtoId, dataValidade, quantidadeNova - quantidadeAnterior, numeroSerie]);
      
      const novoLoteId = novoLoteResult.rows[0].id_lote;

      // 2. Criar registro no estoque
      const estoqueQuery = `
        INSERT INTO estoque (produto_id, lote_id, quantidade)
        VALUES ($1, $2, $3)`;
      
      await client.query(estoqueQuery, 
        [produtoId, novoLoteId, quantidadeNova - quantidadeAnterior]);

    } else {
    // Diminuição - verificar e atualizar lote existente
    if (!loteId) {
        throw new Error('Lote ID é obrigatório para diminuição');
    }

    // 1. Verificar quantidade atual no lote
    const verificarLoteQuery = `
        SELECT quantidade FROM lotes WHERE id_lote = $1 FOR UPDATE`;
    
    const loteResult = await client.query(verificarLoteQuery, [loteId]);
    
    if (loteResult.rowCount === 0) {
        throw new Error('Lote não encontrado');
    }

    const quantidadeAtualLote = loteResult.rows[0].quantidade;
    const diferenca = quantidadeAnterior - quantidadeNova;

    if (diferenca > quantidadeAtualLote) {
        throw new Error(`Quantidade insuficiente no lote. Disponível: ${quantidadeAtualLote}`);
    }

    // 2. Atualizar lote
    const updateLoteQuery = `
        UPDATE lotes
        SET quantidade = quantidade - $1
        WHERE id_lote = $2
        RETURNING *`;
    
    await client.query(updateLoteQuery, [diferenca, loteId]);

    // 3. Atualizar estoque
    const updateEstoqueQuery = `
        UPDATE estoque
        SET quantidade = $1
        WHERE produto_id = $2 AND lote_id = $3`;
    
    await client.query(updateEstoqueQuery, 
        [quantidadeNova, produtoId, loteId]);
    }

    // Registrar no histórico
    const historicoQuery = `
      INSERT INTO ${tipo === 'aumento' ? 'aumento_estoque' : 'diminuir_estoque'} 
      (produto_id, lote_id, quantidade_anterior, quantidade_nova)
      VALUES ($1, $2, $3, $4)`;
    
    await client.query(historicoQuery, 
      [produtoId, loteId, quantidadeAnterior, quantidadeNova]);

    await client.query('COMMIT');
    
    res.json({ 
      success: true,
      message: 'Quantidade atualizada com sucesso!'
    });

  } catch (error) {
    await client.query('ROLLBACK');
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