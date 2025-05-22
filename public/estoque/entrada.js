const entrada = [
    { produto: "Paracetamol 500mg", data:"08/03/2025", hora: "09:00", fornecedor: "MedLife", quantidade: "2", estoque: "150" },
    { produto: "Amoxicilina 500mg", data: "08/03/2025", hora: "09:00", fornecedor: "PharmaCorp", quantidade: "5", estoque: "150" },
    { produto: "Dipirona 1g", data: "08/03/2025", hora: "09:00", fornecedor: "Generics", quantidade: "3", estoque: "130" },
    { produto: "Ibuprofeno 600mg", data: "08/03/2025", hora: "09:00", fornecedor: "PharmaLife", quantidade: "3", estoque: "130" },
    { produto: "Omeprazol 20mg", data: "08/03/2025", hora: "09:00", fornecedor: "SaúdeMax", quantidade: "4", estoque: "130" },
    { produto: "Losartana 50mg", data: "08/03/2025", hora: "09:00", fornecedor: "CardioHealth", quantidade: "2", estoque: "90" },
    { produto: "Metformina 850mg", data: "08/03/2025", hora: "09:00", fornecedor: "EndocrinoPlus", quantidade: "3", estoque: "50" },
    { produto: "Atorvastatina 10mg", data: "08/03/2025", hora: "09:00", fornecedor: "LipidControl", quantidade: "2", estoque: "20" },
    { produto: "Ranitidina 150mg", data: "08/03/2025", hora: "09:00", fornecedor: "SaúdeMax", quantidade: "5", estoque: "10" },
    { produto: "Clonazepam 2mg", data: "08/03/2025", hora: "09:00", fornecedor: "NeuroPharm", quantidade: "5", estoque: "20" }
];

const itensPorPagina = 5;
let paginaAtual = 1;
let listaAtual = [...entrada];

function mostrarEntrada(pagina) {
    const inicio = (pagina - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    const entradaPagina = listaAtual.slice(inicio, fim);
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = "";

    entradaPagina.forEach(entrada => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${entrada.produto}</td>
            <td>${entrada.data}</td>
            <td>${entrada.hora}</td>
            <td>${entrada.fornecedor}</td>
            <td>${entrada.quantidade}</td>
            <td>${entrada.estoque}</td>
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
    const termoPesquisa = document.getElementById("buscarEntrada").value.toLowerCase().trim();

    if (termoPesquisa === "") {
        listaAtual = [...entrada];
    } else {
        listaAtual = entrada.filter(item =>
            item.produto.toLowerCase().includes(termoPesquisa)
        );
    }

    paginaAtual = 1;
    atualizarTabela();
}

function atualizarTabela() {
    mostrarEntrada(paginaAtual);
}

document.addEventListener("DOMContentLoaded", () => {
    atualizarTabela();
});

document.getElementById("buscar").addEventListener("click", buscarProdutos);

document.getElementById("buscarEntrada").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        buscarProdutos();
    }
});

document.getElementById("buscarEntrada").addEventListener("input", function() {
    if (this.value.trim() === "") {
        listaAtual = [...entrada];
        atualizarTabela();
    }
});



document.getElementById("usuarioIcon").addEventListener("click", function() {
    window.open("../usuarioIcon/usuarioIcon.html", "_self");
});