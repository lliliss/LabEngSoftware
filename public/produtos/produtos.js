let produtos = [];
let listaAtual = []
const itensPorPagina = 5;
let paginaAtual = 1;

document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:5000/api/produtos")
        .then(res => res.json())
        .then(data => {
            produtos = data;
            listaAtual = [...produtos];
            atualizarTabela();
        })
        .catch(error => {
            console.error("Erro ao buscar produtos:", error);
        });
});

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
            <td>${produto.descricao}</td>
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

function buscarProdutos() {
    const termoPesquisa = document.getElementById("buscarProduto").value.toLowerCase().trim();
    
    if (termoPesquisa === "") {
        listaAtual = [...produtos]; 
    } else {
        listaAtual = produtos.filter(produto =>
            produto.nome.toLowerCase().includes(termoPesquisa) ||
            produto.categoria.toLowerCase().includes(termoPesquisa) ||
            produto.fornecedor.toLowerCase().includes(termoPesquisa)
        );
    }
    
    paginaAtual = 1;
    atualizarTabela();
}


document.getElementById("buscar").addEventListener("click", buscarProdutos);

document.getElementById("buscarProduto").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        buscarProdutos();
    }
});


document.getElementById("buscarProduto").addEventListener("input", function() {
    if (this.value.trim() === "") {
        listaAtual = [...produtos];
        atualizarTabela();
    }
});

function atualizarTabela() {
    mostrarProdutos(paginaAtual);
}

document.addEventListener("DOMContentLoaded", () => {
    atualizarTabela();
});

document.getElementById("novoProduto").addEventListener("click", function() {
    window.open("novoProduto.html", "_self");
});

document.getElementById("notificacoesIcon").addEventListener("click", function() {
    window.open("../notificacoes/notificacoes.html", "_self");
});

document.getElementById("usuarioIcon").addEventListener("click", function() {
    window.open("../usuarios/usuarios.html", "_self");
});

