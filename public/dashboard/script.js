const estoque = document.getElementById('estoque');
const submenuEstoque = document.getElementById('submenuEstoque');
const abrirOpcoes = document.getElementById('abrirOpcoes');

estoque.addEventListener('click', function (e) {
  e.preventDefault();
  submenuEstoque.classList.toggle('ativo');

  if (submenuEstoque.classList.contains('ativo')) {
    abrirOpcoes.classList.remove('fi-rr-angle-down');
    abrirOpcoes.classList.add('fi-rr-angle-up');
  } else {
    abrirOpcoes.classList.remove('fi-rr-angle-up');
    abrirOpcoes.classList.add('fi-rr-angle-down');
  }
});


async function carregarDashboard() {
  try {
    const response = await fetch('/api/dashboard');
    const data = await response.json();

    
    document.querySelector('.CardInfo:nth-child(1) h3').textContent = data.totalUsuarios;
    document.getElementById('totalEstoque').textContent = data.totalEstoque;
    document.getElementById('totalFornecedores').textContent = data.totalFornecedores;

  const entradaBox = document.querySelector('.SecaoDados .DadoBox:nth-child(1)');
  entradaBox.querySelector('.header span').textContent = 'Últimos 7 dias';
  entradaBox.querySelector('.ladoDireito p:nth-child(1) strong').textContent = data.entradasRecentes;
  entradaBox.querySelector('.ladoDireito p:nth-child(2) strong').textContent = data.fornecedoresRecentes;

  const fornecedorBox = document.querySelector('.SecaoDados .DadoBox:nth-child(2)');
  fornecedorBox.querySelector('.header span').textContent = 'Últimos 7 dias';
  fornecedorBox.querySelector('.ladoDireito p:nth-child(1)').innerHTML = `<strong>${data.totalFornecedores}</strong> Total de fornecedores`;
  const p2Fornecedor = fornecedorBox.querySelector('.ladoDireito p:nth-child(2)');
  if (p2Fornecedor) p2Fornecedor.remove();

  const produtosBox = document.querySelector('.SecaoDados .DadoBox:nth-child(3)');

  const spanProdutos = produtosBox.querySelector('.header span');
  if (spanProdutos) spanProdutos.remove();

  produtosBox.querySelector('.ladoDireito p:nth-child(1) strong').textContent = data.totalProdutos;

  const p2Produtos = produtosBox.querySelector('.ladoDireito p:nth-child(2)');
  if (p2Produtos) p2Produtos.remove();

  } catch (err) {
    console.error('Erro ao carregar dashboard:', err);
  }
}

window.addEventListener('DOMContentLoaded', carregarDashboard);