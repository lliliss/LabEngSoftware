
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