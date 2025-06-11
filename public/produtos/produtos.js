const itensPorPagina = 5;
let paginaAtual = 1;
let listaAtual = [];

async function carregarProdutos() {
  try {
    const token = localStorage.getItem('token');
    const resposta = await fetch('https://labengsoftware.onrender.com/api/produtosmostrar/mostrar', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      credentials: "include",
    });
    if (!resposta.ok) throw new Error("Erro ao carregar produtos");
    const dados = await resposta.json();
    listaAtual = dados;
    atualizarTabela();
  } catch (erro) {
    console.error("Erro ao buscar produtos:", erro);
  }
}

function mostrarProdutos(pagina) {
  const inicio = (pagina - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const produtosPagina = listaAtual.slice(inicio, fim);
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";

  produtosPagina.forEach(produto => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${produto.nome}</td>
      <td>${produto.categoria}</td>
      <td>${produto.quantidade}</td>
      <td>${produto.validade}</td>
      <td>${produto.fornecedor}</td>
      <td>${produto.numero_serie}</td>
      <td><button class="botao-editar" onclick="editarProduto('${produto.nome}')">✏️</button></td>
    `;
    tbody.appendChild(tr);
  });

  criarPaginacao();
}

function criarPaginacao() {
  const totalPaginas = Math.ceil(listaAtual.length / itensPorPagina);
  const paginacao = document.getElementById("pagination");
  paginacao.innerHTML = "";

  if (totalPaginas > 1) {
    const anterior = document.createElement("li");
    anterior.textContent = "Anterior";
    anterior.classList.add("paginacao-item");
    anterior.onclick = () => {
      if (paginaAtual > 1) {
        paginaAtual--;
        atualizarTabela();
      }
    };
    if (paginaAtual === 1) anterior.classList.add("disabled");
    paginacao.appendChild(anterior);
  }

  for (let i = 1; i <= totalPaginas; i++) {
    const botao = document.createElement("li");
    botao.textContent = i;
    botao.classList.add("paginacao-item");
    if (paginaAtual === i) botao.classList.add("active");
    botao.onclick = () => {
      paginaAtual = i;
      atualizarTabela();
    };
    paginacao.appendChild(botao);
  }

  if (totalPaginas > 1) {
    const proxima = document.createElement("li");
    proxima.textContent = "Próxima";
    proxima.classList.add("paginacao-item");
    proxima.onclick = () => {
      if (paginaAtual < totalPaginas) {
        paginaAtual++;
        atualizarTabela();
      }
    };
    if (paginaAtual === totalPaginas) proxima.classList.add("disabled");
    paginacao.appendChild(proxima);
  }
}

function buscarProdutos() {
  const termo = document.getElementById("buscarProduto").value.toLowerCase().trim();
  if (termo === "") {
    carregarProdutos(); // Recarrega todos os produtos do banco
  } else {
    listaAtual = listaAtual.filter(p =>
      p.nome.toLowerCase().includes(termo) ||
      p.categoria.toLowerCase().includes(termo) ||
      p.fornecedor.toLowerCase().includes(termo)
    );
    paginaAtual = 1;
    atualizarTabela();
  }
}

function atualizarTabela() {
  mostrarProdutos(paginaAtual);
}

function editarProduto(nome) {
  // Busca o produto pelo nome na listaAtual
  const produto = listaAtual.find(p => p.nome === nome);
  if (!produto) {
    alert("Produto não encontrado para edição.");
    return;
  }

  // Salva o produto completo no localStorage
  localStorage.setItem("produtoParaEdicao", JSON.stringify(produto));

  // Redireciona para a página de edição (sem query string)
  window.location.href = "edicaodeproduto.html";
}

document.addEventListener("DOMContentLoaded", carregarProdutos);
document.getElementById("buscar").addEventListener("click", buscarProdutos);
document.getElementById("buscarProduto").addEventListener("keypress", e => {
  if (e.key === "Enter") buscarProdutos();
});
document.getElementById("buscarProduto").addEventListener("input", function () {
  if (this.value.trim() === "") carregarProdutos();
});
document.getElementById("novoProduto").addEventListener("click", () => {
  window.open("novoproduto.html", "_self");
});
