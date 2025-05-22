document.addEventListener("DOMContentLoaded", function() {
    const botaoVoltar = document.getElementById("Voltar");

    if (botaoVoltar) {
        botaoVoltar.addEventListener("click", function() {
            window.location.href = "usuarios.html"; 
        });
    }
});
document.addEventListener("DOMContentLoaded", function() {
    const botaoVoltar = document.getElementById("voltar");  

    if (botaoVoltar) {
        botaoVoltar.addEventListener("click", function() {
            window.location.href = "usuarios.html"; 
        });
    }
});


function mensagemSalvo(texto, cor) {
    const mensagem = document.getElementById("mensagem");
    mensagem.textContent = texto;  
    mensagem.style.backgroundColor = cor;  
    mensagem.style.display = "block";  

    
    setTimeout(() => {
        mensagem.style.display = "none";  
    }, 3000);
}


document.getElementById("salvar").addEventListener("click", function() {
    mensagemSalvo("Produto salvo com sucesso!", "#4CAF50"); 
});


function mensagemExcluir(texto, cor) {
    const mensagem = document.getElementById("mensagem");
    mensagem.textContent = texto;  
    mensagem.style.backgroundColor = cor;  
    mensagem.style.display = "block";  

    setTimeout(() => {
        mensagem.style.display = "none";  
    }, 3000);
}


document.getElementById("excluir").addEventListener("click", function() {
    mensagemExcluir("Produto excluído com sucesso!", "#DC3545"); 
});