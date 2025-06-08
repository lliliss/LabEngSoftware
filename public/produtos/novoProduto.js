

// script.js

/*document.getElementById('salvar').addEventListener('click', function (e) {
  e.preventDefault(); // Evita o comportamento padrão do botão

  const dados = {
    nome: document.getElementById('nome').value,
    categoria: document.getElementById('categoria').value,
    quantidade: parseInt(document.getElementById('quantidade').value),
    validade: document.getElementById('validade').value,
    fornecedores: document.getElementById('fornecedores').value,
    numeroDeSerie: document.getElementById('numeroDeSerie').value,
  };

  if (!dados.nome || isNaN(dados.quantidade) || !dados.validade) {
    document.getElementById('mensagem').innerText = 'Preencha os campos obrigatórios!';
    return;
  }

  fetch("http://localhost:5000/api/produtos/enviar", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dados)
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('mensagem').innerText = 'Salvo com sucesso!';
    console.log('Resposta do servidor:', data);
  })
  .catch(error => {
    document.getElementById('mensagem').innerText = 'Erro ao salvar!';
    console.error('Erro:', error);
  });
});*/

document.getElementById('salvar').addEventListener('click', function (e) {
  e.preventDefault(); // Evita o comportamento padrão do botão

  const nome = document.getElementById('nome').value;
  const categoria = document.getElementById('categoria').value;
  const fornecedores = document.getElementById('fornecedores').value;
  const numeroDeSerie = document.getElementById('numeroDeSerie').value;

  const quantidade = parseInt(document.getElementById('quantidade').value);
  const validade = document.getElementById('validade').value;

  if (!nome || isNaN(quantidade) || !validade) {
    document.getElementById('mensagem').innerText = 'Preencha os campos obrigatórios!';
    return;
  }

  const dados = {
    nome,
    categoria,
    fornecedores,
    lote: {
      quantidade,
      dataValidade: validade,
      numeroSerie: numeroDeSerie
    }
  };

  const token = localStorage.getItem('token');
  fetch("http://localhost:5000/api/produtos/enviar", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(dados)
  })
        
  .then(response => response.json())
  .then(data => {
    document.getElementById('mensagem').innerText = 'Salvo com sucesso!';
    console.log('Resposta do servidor:', data);
  })
  .catch(error => {
    document.getElementById('mensagem').innerText = 'Erro ao salvar!';
    console.error('Erro:', error);
  });
});


const botaoVoltar = document.getElementById("Voltar");
if (botaoVoltar) {
  botaoVoltar.addEventListener("click", function () {
    localStorage.removeItem("produtoParaEdicao");
    window.location.href = "produtos.html";
  });
}


// Carregar fornecedores no select
document.addEventListener('DOMContentLoaded', async () => {
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
      option.value = fornecedor.id_fornecedor; // ou 'id' se for esse o nome
      option.textContent = fornecedor.nome;
      selectFornecedores.appendChild(option);
    });
  } catch (erro) {
    console.error('Erro ao carregar fornecedores:', erro);
    selectFornecedores.innerHTML = '<option value="">Erro ao carregar fornecedores</option>';
  }
});
