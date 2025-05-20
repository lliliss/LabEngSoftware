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
    ];

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
      listaAtual = termo === "" ? [...produtos] : produtos.filter(p =>
        p.nome.toLowerCase().includes(termo) ||
        p.categoria.toLowerCase().includes(termo) ||
        p.fornecedor.toLowerCase().includes(termo)
      );
      paginaAtual = 1;
      atualizarTabela();
    }

    function atualizarTabela() {
      mostrarProdutos(paginaAtual);
    }

    function editarProduto(nome) {
      const nomeEncoded = encodeURIComponent(nome);
      window.location.href = `edicaodeproduto.html?produto=${nomeEncoded}`;
    }

    document.addEventListener("DOMContentLoaded", atualizarTabela);
    document.getElementById("buscar").addEventListener("click", buscarProdutos);
    document.getElementById("buscarProduto").addEventListener("keypress", e => {
      if (e.key === "Enter") buscarProdutos();
    });
    document.getElementById("buscarProduto").addEventListener("input", function () {
      if (this.value.trim() === "") {
        listaAtual = [...produtos];
        atualizarTabela();
      }
    });
    document.getElementById("novoProduto").addEventListener("click", () => {
      window.open("novoProduto.html", "_self");
    });
    document.getElementById("usuarioIcon").addEventListener("click", () => {
      window.open("../usuarioIcon/usuarioIcon.html", "_self");
    });