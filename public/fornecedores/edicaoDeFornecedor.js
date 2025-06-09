document.addEventListener("DOMContentLoaded", function () {
  const fornecedor = JSON.parse(localStorage.getItem("fornecedorParaEdicao"));


  if (!fornecedor || !fornecedor.id_fornecedor) {
    alert("Nenhum fornecedor válido selecionado.");
    window.location.href = "fornecedores.html";
    return;
  }

  document.getElementById("nome").value = fornecedor.nome || "";
  document.getElementById("cnpj").value = fornecedor.cnpj || "";
  document.getElementById("email").value = fornecedor.email || "";

    function formatCNPJ(value) {
    return value
      .replace(/\D/g, '') // Remove tudo que não é número
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .slice(0, 18); // Limita a 18 caracteres
  }

  const input = document.getElementById('cnpj');
  input.addEventListener('input', function () {
    this.value = formatCNPJ(this.value);
  });


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
      const token = localStorage.getItem('token');
      const resposta = await fetch(`http://localhost:5000/api/fornecedores/editar/${fornecedorOriginal.id_fornecedor}`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${token}`,
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
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/deletefornecedores/${idFornecedor}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          alert("Fornecedor excluído com sucesso.");
          localStorage.removeItem("fornecedorParaEdicao");
          window.location.href = "fornecedores.html"; // Redireciona para a tela principal
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
