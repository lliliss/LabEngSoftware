const pool = require('./conexao');

async function inserirUsuario(dados) {
  const { nome, cpf, cargo, email } = dados;

  if (!nome || !cpf || !cargo || !email) {
    throw new Error("Campos obrigatórios faltando.");
  }

  const resultado = await pool.query(
    `INSERT INTO usuarios (nome, cpf, cargo, email)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [nome, cpf, cargo, email]
  );

  return resultado.rows[0];
}

module.exports = inserirUsuario;
