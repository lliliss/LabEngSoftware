require('dotenv').config();

const client = require('./conexao');

const fornecedoresFake = [
  {
    nome: "Farmacêutica Vida",
    cnpj: "12.345.678/0001-90",
    email: "contato@farmaceuticavida.com"
  },
  {
    nome: "BioLab",
    cnpj: "98.765.432/0001-12",
    email: "suporte@biolab.com.br"
  },
  {
    nome: "SaúdePlus",
    cnpj: "11.222.333/0001-44",
    email: "saudeplus@contato.com"
  }
];

async function inserirFornecedoresFake() {
  try {
    await client.connect();
    console.log("Conectado ao banco de dados.");

    for (const fornecedor of fornecedoresFake) {
      const { nome, cnpj, email } = fornecedor;

      const res = await client.query(
        `INSERT INTO fornecedores (nome, cnpj, email)
         VALUES ($1, $2, $3)
         RETURNING id_fornecedor`,
        [nome, cnpj, email]
      );

      console.log(`Fornecedor inserido: ${nome} (ID: ${res.rows[0].id_fornecedor})`);
    }
  } catch (err) {
    console.error("Erro ao inserir fornecedores:", err);
  } finally {
    await client.end();
    console.log("Conexão encerrada.");
  }
}

// Executar ao rodar o script
inserirFornecedoresFake();