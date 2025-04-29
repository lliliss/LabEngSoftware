const produtos = [
    { nome: "Paracetamol 500mg", categoria: "Analgésico", quantidade: 150, validade: "12/03/25", fornecedor: "MedLife", serie: "RX-3847-25" },
    { nome: "Amoxicilina 500mg", categoria: "Antibiótico", quantidade: 50, validade: "15/03/25", fornecedor: "PharmaCorp", serie: "RX-6291-25" },
    { nome: "Dipirona 1g", categoria: "Analgésico", quantidade: 200, validade: "20/06/25", fornecedor: "Generics", serie: "RX-7845-25" },
    { nome: "Ibuprofeno 600mg", categoria: "Anti-inflamatório", quantidade: 100, validade: "05/07/25", fornecedor: "PharmaLife", serie: "RX-2345-25" },
    { nome: "Omeprazol 20mg", categoria: "Gastrintestinal", quantidade: 75, validade: "10/08/25", fornecedor: "SaúdeMax", serie: "RX-5432-25" },
    { nome: "Losartana 50mg", categoria: "Hipertensão", quantidade: 120, validade: "18/09/25", fornecedor: "CardioHealth", serie: "RX-8523-25" },
    { nome: "Metformina 850mg", categoria: "Diabetes", quantidade: 90, validade: "22/10/25", fornecedor: "EndocrinoPlus", serie: "RX-7854-25" },
    { nome: "Atorvastatina 10mg", categoria: "Colesterol", quantidade: 60, validade: "30/11/25", fornecedor: "LipidControl", serie: "RX-9647-25" },
    { nome: "Ranitidina 150mg", categoria: "Gastrintestinal", quantidade: 55, validade: "02/01/26", fornecedor: "SaúdeMax", serie: "RX-4532-26" },
    { nome: "Clonazepam 2mg", categoria: "Ansiolítico", quantidade: 40, validade: "14/05/26", fornecedor: "NeuroPharm", serie: "RX-7851-26" }
]
const itensPorPagina = 5;
let paginaAtual = 1;
let listaAtual = [...produtos];

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
            <td>${produto.serie}</td>
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
    window.open("../notificaçoes/notificaçoes.html", "_self");
});

document.getElementById("usuarioIcon").addEventListener("click", function() {
    window.open("../usuarioIcon/usuarioIcon.html", "_self");
});

