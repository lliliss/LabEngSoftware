

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
});
