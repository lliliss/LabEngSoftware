document.addEventListener("DOMContentLoaded", function () {
    const botaoVoltar = document.getElementById("voltar");

    if (botaoVoltar) {
        botaoVoltar.addEventListener("click", function () {
            window.location.href = "../fornecedores/fornecedores.html";
        });
    }

    const botaoSalvar = document.getElementById("salvar");
    if (botaoSalvar) {
        botaoSalvar.addEventListener("click", function () {
            const nome = document.getElementById("nome").value.trim();
            const cnpj = document.getElementById("cnpj").value.trim();
            const endereco = document.getElementById("endereco").value.trim();
            const telefone = document.getElementById("telefone").value.trim();
            const email = document.getElementById("email").value.trim();

            const fornecedor = {
                nome,
                cnpj,
                endereco,
                telefone,
                email
            };

            fetch("http://localhost:5000/fornecedores", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(fornecedor)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro ao salvar fornecedor");
                }
                return response.json();
            })
            .then(data => {
                exibirMensagem("Fornecedor salvo com sucesso!", "#4CAF50");
                console.log("Fornecedor salvo:", data);
            })
            .catch(error => {
                console.error("Erro:", error);
                exibirMensagem("Erro ao salvar fornecedor.", "#f44336");
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
