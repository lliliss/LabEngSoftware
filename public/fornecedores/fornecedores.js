const itensPorPagina = 5;
let paginaAtual = 1;
let listaAtual = [];

async function carregarFornecedor() {
  try {
    const token = localStorage.getItem('token');
    const resposta = await fetch("https://labengsoftware.onrender.com/api/fornecedoresmostrar/mostrar", {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      credentials: "include",
    });
    if (!resposta.ok) throw new Error("Erro ao carregar fornecedores");
    const dados = await resposta.json();
    listaAtual = dados;
    atualizarTabela();
  } catch (erro) {
    console.error("Erro ao buscar fornecedores:", erro);
  }
}

function mostrarFornecedor(pagina) {
  const inicio = (pagina - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const FornecedorPagina = listaAtual.slice(inicio, fim);
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";

  FornecedorPagina.forEach(fornecedor => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${fornecedor.nome}</td>
      <td>${fornecedor.email}</td>
      <td>${fornecedor.cnpj}</td>
      <td><button class="botao-editar" onclick="editarFornecedor('${fornecedor.nome}')">✏️</button></td>
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

function buscarFornecedor() {
  const termo = document.getElementById("buscarFornecedor").value.toLowerCase().trim();
  if (termo === "") {
    carregarFornecedor(); // Recarrega todos os fornecedores do banco
  } else {
    listaAtual = listaAtual.filter(p =>
      p.nome.toLowerCase().includes(termo) ||
      p.email.toLowerCase().includes(termo) ||
      p.cnpj.toLowerCase().includes(termo)
    );
    paginaAtual = 1;
    atualizarTabela();
  }
}

function atualizarTabela() {
  mostrarFornecedor(paginaAtual);
}

function editarFornecedor(nome) {
  // Busca o fornecedor pelo nome na listaAtual
  const fornecedor = listaAtual.find(p => p.nome === nome);
  if (!fornecedor) {
    alert("Fornecedor não encontrado para edição.");
    return;
  }

  // Salva o fornecedor completo no localStorage
  localStorage.setItem("fornecedorParaEdicao", JSON.stringify(fornecedor));

  // Redireciona para a página de edição (sem query string)
  window.location.href = "edicaodefornecedor.html";
}

document.addEventListener("DOMContentLoaded", carregarFornecedor);
document.getElementById("buscar").addEventListener("click", buscarFornecedor);
document.getElementById("buscarFornecedor").addEventListener("keypress", e => {
  if (e.key === "Enter") buscarFornecedor();
});
document.getElementById("buscarFornecedor").addEventListener("input", function () {
  if (this.value.trim() === "") carregarFornecedor();
});
document.getElementById("novoFornecedor").addEventListener("click", () => {
  window.open("novofornecedor.html", "_self");
});
document.getElementById("usuarioIcon").addEventListener("click", () => {
  window.open("../usuarioIcon/usuarioIcon.html", "_self");
});
