document.addEventListener("DOMContentLoaded", function () {
  const fornecedor = JSON.parse(localStorage.getItem("fornecedorParaEdicao"));

  if (!fornecedor || !fornecedor.id_fornecedor) {
    alert("Nenhum fornecedor válido selecionado.");
    window.location.href = "fornecedores.html";
    return;
  }

  // Preenche os campos do formulário
  document.getElementById("nome").value = fornecedor.nome || "";
  document.getElementById("cnpj").value = fornecedor.cnpj || "";
  document.getElementById("email").value = fornecedor.email || "";

  // Botão voltar
  const botaoVoltar = document.getElementById("Voltar");
  if (botaoVoltar) {
    botaoVoltar.addEventListener("click", function () {
      localStorage.removeItem("fornecedorParaEdicao");
      window.location.href = "fornecedores.html";
    });
  }

document.getElementById("salvar").addEventListener("click", async function () {
  const fornecedorOriginal = JSON.parse(localStorage.getItem("fornecedorParaEdicao"));
  if (!fornecedorOriginal) {
    alert("Nenhum fornecedor carregado para edição.");
    return;
  }

  const fornecedorAtualizado = {
  nome: document.getElementById("nome").value.trim(),
  email: document.getElementById("email").value.trim(),
  cnpj: document.getElementById("cnpj").value.trim()
};

  try {
    const resposta = await fetch(`http://localhost:5000/api/fornecedores/editar/${fornecedorOriginal.id_fornecedor}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(fornecedorAtualizado)
    });

    if (resposta.ok) {
      alert("Fornecedor atualizado com sucesso!");
      localStorage.removeItem("fornecedorParaEdicao");
      window.location.href = "fornecedores.html"; // volta para listagem
    } else {
      const erro = await resposta.json();
      alert("Erro ao atualizar: " + (erro.mensagem || resposta.statusText));
    }
  } catch (erro) {
    console.error("Erro ao enviar atualização:", erro);
    alert("Erro ao enviar atualização.");
  }
});

  // Botão excluir
  document.getElementById("excluir").addEventListener("click", async function () {
    const fornecedorAtual = JSON.parse(localStorage.getItem("fornecedorParaEdicao"));
    console.log("Fornecedor carregado para exclusão:", fornecedorAtual);

    if (!fornecedorAtual || !fornecedorAtual.id_fornecedor) {
      alert("Nenhum fornecedor selecionado para exclusão.");
      return;
    }

    const idFornecedor = fornecedorAtual.id_fornecedor;

    if (confirm("Tem certeza que deseja excluir este fornecedor?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/deletefornecedor/${idFornecedor}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          alert("Fornecedor excluído com sucesso.");
          localStorage.removeItem("fornecedorParaEdicao");
          window.location.href = "fornecedor.html"; // Redireciona para a tela principal
        } else {
          const errorData = await response.json();
          alert("Erro ao excluir fornecedor: " + (errorData.message || response.statusText));
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro ao tentar excluir o fornecedor.");
      }
    }
  });
});
