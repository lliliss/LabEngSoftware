/*document.addEventListener("DOMContentLoaded", function() {
    const botaoVoltar = document.getElementById("voltar");

    if (botaoVoltar) {
        botaoVoltar.addEventListener("click", function() {
            window.location.href = "produtos.html"; 
        });
    }
});
function exibirMensagem(texto, cor) {
    const mensagem = document.getElementById("mensagem");
    mensagem.textContent = texto;
    mensagem.style.backgroundColor = cor;
    mensagem.style.display = "block";

    setTimeout(() => {
        mensagem.style.display = "none";
    }, 3000);
}

document.getElementById("salvar").addEventListener("click", function() {
    exibirMensagem("Produto salvo com sucesso!", "#4CAF50"); 
});*/

// script.js

document.getElementById('salvar').addEventListener('click', function (e) {
  e.preventDefault(); // Evita o comportamento padrão do botão

  const dados = {
    nome: document.getElementById('nome').value,
    categoria: document.getElementById('categoria').value,
    quantidade: document.getElementById('quantidade').value,
    validade: document.getElementById('validade').value,
    fornecedores: document.getElementById('fornecedores').value,
    numeroDeSerie: document.getElementById('numeroDeSerie').value,
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



