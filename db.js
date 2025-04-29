const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL || 'sua_string_de_conexão'
});

async function testDB() {
  const res = await client.query('SELECT NOW()');
  console.log('Hora atual no banco:', res.rows[0]);
}

testDB().catch(err => console.error('Erro:', err));


async function run() {
  try {
    await client.connect();
    console.log("Conectado com sucesso!");

    const resUsuario = await client.query(
      `INSERT INTO usuarios (nome, email, senha, tipo_usuario) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id_usuario`,
      ['João da Silva', 'joao.teste@example.com', 'senha123', 'Funcionario']
    );

    const usuarioId = resUsuario.rows[0].id_usuario;
    console.log('Usuário inserido com ID:', usuarioId);

    const resFuncionario = await client.query(
      `INSERT INTO funcionarios (usuario_id, cargo, salario) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [usuarioId, 'Atendente', 2500.00]
    );

    console.log('Funcionário inserido com sucesso:', resFuncionario.rows[0]);

  } catch (err) {
    console.error('Erro ao inserir:', err);
  } finally {
    await client.end();
  }
}

run();