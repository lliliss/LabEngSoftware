const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL || 'sua_string_de_conexão'
});

async function testDB() {
  const res = await client.query('SELECT NOW()');
  console.log('Hora atual no banco:', res.rows[0]);
}

const usuariosjson = [
  {
    nome: "João Silva",
    cpf: "111.111.111-11",
    cargo: "Administrador",
    email: "joao@unima.com"
  },
  {
    nome: "Ana Souza",
    cpf: "222.222.222-22",
    cargo: "Funcionário",
    email: "ana@unima.com"
  },
  {
    nome: "Carlos Pereira",
    cpf: "333.333.333-33",
    cargo: "Funcionário",
    email: "carlos@unima.com"
  }
];

async function inserirUsuarios() {
  try {
    await client.connect();
    console.log("Conectado ao banco de dados.");

    for (const usuario of usuariosjson) {
      const { nome, cpf, cargo, email } = usuario;

      const res = await client.query(
        `INSERT INTO usuarios (nome, cpf, cargo, email)
         VALUES ($1, $2, $3, $4)
         RETURNING id_usuario`,
        [nome, cpf, cargo, email]
      );

      console.log(`Usuário inserido: ${nome} (ID: ${res.rows[0].id_usuario})`);
    }
  } catch (err) {
    console.error("Erro ao inserir usuários:", err);
  } finally {
    await client.end();
    console.log("Conexão encerrada.");
  }
}

inserirUsuarios();