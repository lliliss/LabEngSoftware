document.addEventListener("DOMContentLoaded", function() {
    const botaoVoltar = document.getElementById("voltar");

    if (botaoVoltar) {
        botaoVoltar.addEventListener("click", function() {
            window.location.href = "fornecedores.html"; 
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
});

(function() {
  var btn = document.getElementById('notificacoesIcon');
  var modal = document.getElementById('modalNotificacoes');
  if(btn && modal) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      if(modal.style.display === 'none' || modal.style.display === '') {
        modal.style.display = 'block';
      } else {
        modal.style.display = 'none';
      }
    });
    document.addEventListener('click', function(event) {
      if (!modal.contains(event.target) && event.target !== btn) {
        modal.style.display = 'none';
      }
    });
  }
})();