document.addEventListener("DOMContentLoaded", function () {
  const produto = JSON.parse(localStorage.getItem("produtoParaEdicao"));

  if (!produto || !produto.id_produto) {
    alert("Nenhum produto válido selecionado.");
    window.location.href = "produtos.html";
    return;
  }

  // Preenche os campos do formulário
  console.log("Produto recebido:", produto);

  document.getElementById("nome").value = produto.nome || "";
  document.getElementById("categoria").value = produto.categoria || "";
  document.getElementById("serie").value = produto.serie || "";


  // Converter "31/05/2025" para "2025-05-31"
  if (produto.validade) {
    const partes = produto.validade.split("/");
    if (partes.length === 3) {
      const validadeFormatada = `${partes[2]}-${partes[1]}-${partes[0]}`;
      document.getElementById("validade").value = validadeFormatada;
    }
  }


  

  // Botão voltar
  const botaoVoltar = document.getElementById("Voltar");
  if (botaoVoltar) {
    botaoVoltar.addEventListener("click", function () {
      localStorage.removeItem("produtoParaEdicao");
      window.location.href = "produtos.html";
    });
  }

document.getElementById("salvar").addEventListener("click", async function () {
  const produtoOriginal = JSON.parse(localStorage.getItem("produtoParaEdicao"));
  if (!produtoOriginal) {
    alert("Nenhum produto carregado para edição.");
    return;
  }

  function formatarData(dataISO) {
  const partes = dataISO.split("-");
  return `${partes[2]}/${partes[1]}/${partes[0]}`; // de yyyy-mm-dd para dd/mm/yyyy
}


  const produtoAtualizado = {
  nome: document.getElementById("nome").value.trim(),
  categoria: document.getElementById("categoria").value.trim(),
  fornecedores: document.getElementById("fornecedores").value.trim(),
  lote: {
    id_lote: produto.id_lote,
    quantidade: parseInt(produto.quantidade),
    dataValidade: document.getElementById("validade").value.trim(),  // formato ISO yyyy-mm-dd
    serie: document.getElementById("serie").value.trim()
  }
};

  try {

    console.log('URL que será chamada:', `https://labengsoftware.onrender.com/api/produtos/editar/${produtoOriginal.id_produto}`);
    console.log('Produto original:', produtoOriginal);

    const token = localStorage.getItem('token');
    const resposta = await fetch(`https://labengsoftware.onrender.com/api/produtos/editar/${produtoOriginal.id_produto}`, {
      method: "PUT",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(produtoAtualizado)
    }); 


    if (resposta.ok) {
      alert("Produto atualizado com sucesso!");
      localStorage.removeItem("produtoParaEdicao");
      window.location.href = "produtos.html"; // volta para listagem
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
    const produtoAtual = JSON.parse(localStorage.getItem("produtoParaEdicao"));
    console.log("Produto carregado para exclusão:", produtoAtual);

    if (!produtoAtual || !produtoAtual.id_produto) {
      alert("Nenhum produto selecionado para exclusão.");
      return;
    }

    const idProduto = produtoAtual.id_produto;

    if (confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/deleteprodutos/${idProduto}`, {
        method: 'DELETE',
        headers: {
        'Authorization': `Bearer ${token}`
      }
          //method: 'DELETE'
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


// Carregar fornecedores no select
document.addEventListener('DOMContentLoaded', async () => {


      // Configuração inicial da data mínima
    const campoValidade = document.getElementById('validade');
    const mensagemErro = document.getElementById('erroData');
    
    // Obter data atual no formato YYYY-MM-DD
    const hoje = new Date();
    const dd = String(hoje.getDate()).padStart(2, '0');
    const mm = String(hoje.getMonth() + 1).padStart(2, '0');
    const yyyy = hoje.getFullYear();
    const dataMinima = `${yyyy}-${mm}-${dd}`;
    
    // Definir data mínima no campo
    campoValidade.setAttribute('min', dataMinima);
    
    // Validação em tempo real
    campoValidade.addEventListener('change', () => {
        const dataSelecionada = new Date(campoValidade.value);
        if (dataSelecionada < hoje) {
            mensagemErro.style.display = 'block';
            campoValidade.setCustomValidity('Data inválida');
        } else {
            mensagemErro.style.display = 'none';
            campoValidade.setCustomValidity('');
        }
    });

  const selectFornecedores = document.getElementById('fornecedores');
  if (!selectFornecedores) return;

  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/fornecedores', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    

    const fornecedores = await response.json();

    if (fornecedores.length === 0) {
      selectFornecedores.innerHTML = '<option value="">Nenhum fornecedor encontrado</option>';
      return;
    }

    selectFornecedores.innerHTML = '<option value="">Selecione...</option>';
    fornecedores.forEach(fornecedor => {
      const option = document.createElement('option');
      option.value = fornecedor.id_fornecedor; 
      option.textContent = fornecedor.nome;
      selectFornecedores.appendChild(option);
    });

    const produto = JSON.parse(localStorage.getItem("produtoParaEdicao"));

    for (const option of selectFornecedores.options) {
      if (option.textContent.trim() === produto.fornecedor.trim()) {
        selectFornecedores.value = option.value;
        break;
      }
    }

    console.log("Valor do fornecedor no produto:", produto.fornecedor);

  } catch (erro) {
    console.error('Erro ao carregar fornecedores:', erro);
    selectFornecedores.innerHTML = '<option value="">Erro ao carregar fornecedores</option>';
  }

});
