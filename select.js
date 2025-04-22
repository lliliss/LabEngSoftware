const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL || 'sua_string_de_conexão'
});


async function run() {
    try {
        await client.connect();
        console.log("Conectado com sucesso!");

        const resultado = await client.query(`
        SELECT u.nome, u.email, f.cargo, f.salario
        FROM usuarios u
        JOIN funcionarios f ON u.id_usuario = f.usuario_id
        `);

        console.log("Funcionários cadastrados:");
        resultado.rows.forEach((row, index) => {
        console.log(`${index + 1}. Nome: ${row.nome}, Email: ${row.email}, Cargo: ${row.cargo}, Salário: R$ ${row.salario}`);
        });

    } catch (err) {
        console.error('Erro ao buscar dados:', err);
    } finally {
        await client.end();
    }
}

run();