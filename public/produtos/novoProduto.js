document.addEventListener("DOMContentLoaded", function() {
    const botaoVoltar = document.getElementById("voltar");

    if (botaoVoltar) {
        botaoVoltar.addEventListener("click", function() {
            window.location.href = "../produtos/produtos.html"; 
        });
    }

    const botaoSalvar = document.getElementById("salvar");
    if (botaoSalvar) {
        botaoSalvar.addEventListener("click", function() {
            const nome = document.getElementById("nome").value;
            const categoria = document.getElementById("categoria").value;
            const quantidade = parseInt(document.getElementById("decricao").value);

            const produto = {
                nome,
                categoria,
                descricao,
            };

            fetch("http://localhost:5000/produtos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(produto)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro ao salvar produto");
                }
                return response.json();
            })
            .then(data => {
                exibirMensagem("Produto salvo com sucesso!", "#4CAF50");
                console.log("Produto salvo:", data);
            })
            .catch(error => {
                console.error("Erro:", error);
                exibirMensagem("Erro ao salvar produto.", "#f44336");
            });
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
