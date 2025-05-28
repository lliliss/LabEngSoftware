document.addEventListener("DOMContentLoaded", function () {
  const produto = JSON.parse(localStorage.getItem("produtoParaEdicao"));

  if (!produto || !produto.id_produto) {
    alert("Nenhum produto válido selecionado.");
    window.location.href = "produtos.html";
    return;
  }

  // Preenche os campos do formulário
  document.getElementById("nome").value = produto.nome || "";
  document.getElementById("categoria").value = produto.categoria || "";
  document.getElementById("quantidade").value = produto.quantidade || "";

  // Converter "31/05/2025" para "2025-05-31"
  if (produto.validade) {
    const partes = produto.validade.split("/");
    if (partes.length === 3) {
      const validadeFormatada = `${partes[2]}-${partes[1]}-${partes[0]}`;
      document.getElementById("validade").value = validadeFormatada;
    }
  }

  document.getElementById("fornecedores").value = produto.fornecedor || "";
  document.getElementById("numeroDeSerie").value = produto.serie || "";

  // Botão voltar
  const botaoVoltar = document.getElementById("Voltar");
  if (botaoVoltar) {
    botaoVoltar.addEventListener("click", function () {
      localStorage.removeItem("produtoParaEdicao");
      window.location.href = "produtos.html";
    });
  }

  // Botão salvar
  document.getElementById("salvar").addEventListener("click", function () {
    mensagemSalvo("Produto salvo com sucesso!", "#4CAF50");
    // Aqui você pode atualizar o localStorage ou enviar pro backend
  });

  // Botão excluir
  document.getElementById("excluir").addEventListener("click", async function () {
    const produtoAtual = JSON.parse(localStorage.getItem("produtoParaEdicao"));
    console.log("Produto carregado para exclusão:", produtoAtual);

    if (!produtoAtual || !produtoAtual.id_produto) {
      alert("Nenhum produto selecionado para exclusão.");
      return;
    }

    const idProduto = produtoAtual.id_produto;

    if (confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/deleteprodutos/${idProduto}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          alert("Produto excluído com sucesso.");
          localStorage.removeItem("produtoParaEdicao");
          window.location.href = "produtos.html"; // Redireciona para a tela principal
        } else {
          const errorData = await response.json();
          alert("Erro ao excluir produto: " + (errorData.message || response.statusText));
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro ao tentar excluir o produto.");
      }
    }
  });
});
