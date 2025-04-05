const fornecedores = [
    { nome: "MedLife", cnpj: "12.345.678/0001-90", contato: "(82) 99999-1234", produto: "Paracetamol 500mg", quantidade: 150 },
    { nome: "PharmaCorp", cnpj: "98.765.432/0001-87", contato: "(82) 98888-5678", produto: "Amoxicilina 500mg", quantidade: 50 },
    { nome: "Generics", cnpj: "11.222.333/0001-44", contato: "(82) 98765-4321", produto: "Dipirona 1g", quantidade: 200 },
    { nome: "PharmaLife", cnpj: "22.333.444/0001-55", contato: "(82) 91234-5678", produto: "Ibuprofeno 600mg", quantidade: 100 },
    { nome: "SaúdeMax", cnpj: "33.444.555/0001-66", contato: "(82) 92345-6789", produto: "Omeprazol 20mg", quantidade: 75 },
    { nome: "CardioHealth", cnpj: "44.555.666/0001-77", contato: "(82) 93456-7890", produto: "Losartana 50mg", quantidade: 120 },
    { nome: "EndocrinoPlus", cnpj: "55.666.777/0001-88", contato: "(82) 94567-8901", produto: "Metformina 850mg", quantidade: 90 },
    { nome: "LipidControl", cnpj: "66.777.888/0001-99", contato: "(82) 95678-9012", produto: "Atorvastatina 10mg", quantidade: 60 },
    { nome: "NeuroPharm", cnpj: "77.888.999/0001-00", contato: "(82) 96789-0123", produto: "Clonazepam 2mg", quantidade: 40 },
    { nome: "SaúdeMax", cnpj: "33.444.555/0001-66", contato: "(82) 92345-6789", produto: "Ranitidina 150mg", quantidade: 55 }
];

const itensPorPagina = 5;
let paginaAtual = 1;
let listaAtual = [...fornecedores];

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
            <td>${fornecedor.produto}</td>
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
    window.open("../notificaçoes/notificações.html", "_self");
});

document.getElementById("usuarioIcon").addEventListener("click", function () {
    window.open("../usuarios/usuarios.html", "_self");
});
