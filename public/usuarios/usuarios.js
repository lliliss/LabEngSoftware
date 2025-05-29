
const itensPorPagina = 5;
let paginaAtual = 1;
let listaAtual = [];

async function carregarUsuarios() {
  try {
    const resposta = await fetch("http://localhost:5000/api/usuariosmostrar/mostrar");
    if (!resposta.ok) throw new Error("Erro ao carregar usuários");
    const dados = await resposta.json();
    listaAtual = dados;
    atualizarTabela();
  } catch (erro) {
    console.error("Erro ao buscar usuários:", erro);
  }
}

function mostrarUsuarios(pagina) {
    const inicio = (pagina - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    const produtosPagina = listaAtual.slice(inicio, fim);
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = "";

    produtosPagina.forEach(produto => {
        const tr = document.createElement("tr");
    
        tr.innerHTML = `
            <td>${produto.nome}</td>
            <td>${produto.email}</td>
            <td>${produto.tipo_usuario}</td>
            <td><button class="editar-btn" onclick="editarUsuario('${produto.nome}')">✏️</button></td>

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
        const botaoAnterior = document.createElement("li");
        botaoAnterior.textContent = "Anterior";
        botaoAnterior.classList.add("paginacao-item");
        botaoAnterior.onclick = () => {
            if (paginaAtual > 1) {
                paginaAtual--;
                atualizarTabela();
            }
        };
        if (paginaAtual === 1) botaoAnterior.classList.add("disabled");
        paginacao.appendChild(botaoAnterior);
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
        const botaoProxima = document.createElement("li");
        botaoProxima.textContent = "Próxima";
        botaoProxima.classList.add("paginacao-item");
        botaoProxima.onclick = () => {
            if (paginaAtual < totalPaginas) {
                paginaAtual++;
                atualizarTabela();
            }
        };
        if (paginaAtual === totalPaginas) botaoProxima.classList.add("disabled");
        paginacao.appendChild(botaoProxima);
    }
}

function buscarUsuarios() {
    const termoPesquisa = document.getElementById("buscarUsuario").value.toLowerCase().trim();
    
    if (termoPesquisa === "") {
        carregarUsuarios(); 
    } else {
        listaAtual = listaAtual.filter(usuario =>
            usuario.nome.toLowerCase().includes(termoPesquisa) ||
            usuario.tipo_usuario.toLowerCase().includes(termoPesquisa)
        );
        paginaAtual = 1;
        atualizarTabela();
    }
}
    
function atualizarTabela() {
    mostrarUsuarios(paginaAtual);
}


function editarUsuario(nome) {
  // Busca o usuario pelo nome na listaAtual
  const usuario = listaAtual.find(p => p.nome === nome);
  if (!usuario) {
    alert("Usuário não encontrado para edição.");
    return;
  }


  // Salva o produto completo no localStorage
  localStorage.setItem("usuarioParaEdicao", JSON.stringify(usuario));

  // Redireciona para a página de edição (sem query string)
  window.location.href = "edicaodeusuario.html";
}

document.addEventListener("DOMContentLoaded", carregarUsuarios);
document.getElementById("buscar").addEventListener("click", buscarUsuarios);
document.getElementById("buscarUsuario").addEventListener("keypress", e => {
  if (e.key === "Enter") buscarUsuarios();
});
document.getElementById("buscarUsuario").addEventListener("input", function () {
  if (this.value.trim() === "") carregarUsuarios();
});
document.getElementById("novoUsuario").addEventListener("click", () => {
  window.open("novoUsuario.html", "_self");
});
document.getElementById("usuarioIcon").addEventListener("click", () => {
  window.open("../usuarioIcon/usuarioIcon.html", "_self");
});
