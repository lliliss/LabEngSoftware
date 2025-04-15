let fornecedores = []
const itensPorPagina = 5;
let paginaAtual = 1;
let listaAtual = [];

document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:5000/api/fornecedores")
      .then(response => response.json())
      .then(data => {
        fornecedores = data;
        listaAtual = [...fornecedores];
        atualizarTabela(); 
      })
      .catch(error => {
        console.error("Erro ao buscar fornecedores:", error);
      });
});

function mostrarFornecedores(pagina) {
    const inicio = (pagina - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    const fornecedoresPagina = listaAtual.slice(inicio, fim);
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = "";

    fornecedoresPagina.forEach(fornecedor => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${fornecedor.nome}</td>
            <td>${fornecedor.cnpj}</td>
            <td>${fornecedor.contato}</td>
            <td>${fornecedor.medicamento}</td>
            <td>${fornecedor.quantidade}</td>
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

function buscarFornecedores() {
    const termoPesquisa = document.getElementById("buscarFornecedor").value.toLowerCase().trim();

    if (termoPesquisa === "") {
        listaAtual = [...fornecedores];
    } else {
        listaAtual = fornecedores.filter(fornecedor =>
            fornecedor.nome.toLowerCase().includes(termoPesquisa) ||
            fornecedor.produto.toLowerCase().includes(termoPesquisa) ||
            fornecedor.cnpj.toLowerCase().includes(termoPesquisa)
        );
    }

    paginaAtual = 1;
    atualizarTabela();
}

document.getElementById("buscar").addEventListener("click", buscarFornecedores);

document.getElementById("buscarFornecedor").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        buscarFornecedores();
    }
});

document.getElementById("buscarFornecedor").addEventListener("input", function() {
    if (this.value.trim() === "") {
        listaAtual = [...fornecedores];
        atualizarTabela();
    }
});

function atualizarTabela() {
    mostrarFornecedores(paginaAtual);
}

document.addEventListener("DOMContentLoaded", () => {
    atualizarTabela();
});

document.getElementById("novoFornecedor").addEventListener("click", function() {
    window.open("novoFornecedor.html", "_self");
});


document.getElementById("notificacoesIcon").addEventListener("click", function () {
    window.open("../notificacoes/notificacoes.html", "_self");
});

document.getElementById("usuarioIcon").addEventListener("click", function () {
    window.open("../usuarios/usuarios.html", "_self");
});
