// consultarProdutos.js
const pool = require('./conexao');

async function buscarUsuarios() {
  try {
    const query = `
        SELECT 
            u.id_usuario,
            u.nome,
            u.email,
            u.tipo_usuario
        FROM usuarios u;
    `;

    const result = await pool.query(query);

    const tipoMap = {
        funcionario: 'Funcionário',
        admin: 'Administrador'
    };

    const usuariosFormatados = result.rows.map(usuario => ({
        ...usuario,
        tipo_usuario: tipoMap[usuario.tipo_usuario] || usuario.tipo_usuario
    }));

    return usuariosFormatados;
    } catch (err) {
        console.error("Erro no banco:", err);
        throw err;
    }

}


module.exports = buscarUsuarios;
