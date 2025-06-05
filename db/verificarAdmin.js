const pool = require('./conexao');

async function verificarAdmin() {
    const { rows } = await pool.query('SELECT COUNT(*) FROM usuarios');
    const quantidade = parseInt(rows[0].count);
    
    if (quantidade === 0) {
        console.log('Nenhum usuário encontrado. O sistema requer cadastro inicial.');
        return false;
    }
    return true;
}

module.exports = verificarAdmin;