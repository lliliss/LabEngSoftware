const client = require('./db/conexao');
const inserirProdutos = require('./db/inserirProduto');
const inserirFornecedores = require('./db/inserirFornecedore');
const inserirFUsuario = require('./db/inserirUsuario');

async function main() {
  await client.connect();
  await inserirFornecedores();
  await inserirProdutos();
  await inserirUsuario();
  await client.end();
}

main();
