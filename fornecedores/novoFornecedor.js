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

