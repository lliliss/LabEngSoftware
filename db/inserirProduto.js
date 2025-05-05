require('dotenv').config();

const client = require('./conexao');
const produtosFake = [
    {
      nome: "Paracetamol 500mg",
      categoria: "Analgésico",
      fornecedor: "Farmacêutica Vida",
      numero_serie: "ABC123456",
      validade: "2025-10-01"
    },
    {
      nome: "Amoxicilina 875mg",
      categoria: "Antibiótico",
      fornecedor: "BioLab",
      numero_serie: "XYZ789321",
      validade: "2026-03-15"
    },
    {
      nome: "Dipirona Sódica 1g",
      categoria: "Analgésico",
      fornecedor: "SaúdePlus",
      numero_serie: "DFG456789",
      validade: "2024-12-30"
    }
  ];
  
  async function inserirProdutosFake() {
    try {
      await client.connect();
      console.log("Conectado ao banco de dados.");
  
      for (const produto of produtosFake) {
        const { nome, categoria, fornecedor, numero_serie, validade } = produto;
  
        const res = await client.query(
          `INSERT INTO produtos (nome, categoria, fornecedor, numero_serie, validade)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING id_produto`,
          [nome, categoria, fornecedor, numero_serie, validade]
        );
  
        console.log(`Produto inserido: ${nome} (ID: ${res.rows[0].id_produto})`);
      }
    } catch (err) {
      console.error("Erro ao inserir produtos:", err);
    } finally {
      await client.end();
      console.log("Conexão encerrada.");
    }
  }
  
  // Executar ao rodar o script
  inserirProdutosFake();