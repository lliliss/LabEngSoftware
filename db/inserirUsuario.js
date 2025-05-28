const pool = require('./conexao');

async function inserirUsuario(dados) {
  const { nome, cpf, tipoUsuario, email } = dados;

  if (!nome || !cpf || !tipoUsuario || !email) {
    throw new Error("Campos obrigatórios faltando.");
  }

  const resultado = await pool.query(
    `INSERT INTO usuarios (nome, cpf, tipo_usuario, email)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [nome, cpf, tipoUsuario, email]
  );

  return resultado.rows[0];
}

module.exports = inserirUsuario;
