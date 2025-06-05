const pool = require('./conexao');
const bcrypt = require('bcrypt');

async function inserirUsuario(dados) {
  const { nome, cpf, tipoUsuario, email, senha } = dados;

  if (!nome || !cpf || !tipoUsuario || !email || !senha) {
    throw new Error("Todos os campos são obrigatórios.");
  }

  // Criptografa a senha antes de armazenar
  const senhaHash = await bcrypt.hash(senha, 10);

  const resultado = await pool.query(
    `INSERT INTO usuarios (nome, cpf, tipo_usuario, email, senha)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [nome, cpf, tipoUsuario, email, senhaHash]
  );

  return resultado.rows[0];
}

module.exports = inserirUsuario;