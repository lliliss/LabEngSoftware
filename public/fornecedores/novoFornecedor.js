/*document.addEventListener("DOMContentLoaded", function() {
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
})();*/
document.addEventListener("DOMContentLoaded", () => {
  const botaoSalvar = document.getElementById("salvar");
  const botaoVoltar = document.getElementById("voltar");

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

  if (botaoSalvar) {
    botaoSalvar.addEventListener("click", async () => {
      const nome = document.getElementById("nome").value.trim();
      const cnpj = document.getElementById("cnpj").value.trim();
      const email = document.getElementById("email").value.trim();

      if (!nome || !cnpj || !email) {
        exibirMensagem("Preencha todos os campos obrigatórios.", "#f44336");
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const resposta = await fetch("http://localhost:5000/api/fornecedores/enviar", {
          method: "POST",
          headers: { "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
           },
          body: JSON.stringify({ nome, cnpj, email })
        });

        const dados = await resposta.json();

        if (resposta.ok) {
          exibirMensagem("Fornecedor cadastrado com sucesso!", "#4CAF50");
          limparCampos();
        } else {
          exibirMensagem(`Erro: ${dados.message || "Erro desconhecido."}`, "#f44336");
        }
      } catch (erro) {
        console.error("Erro ao enviar fornecedor:", erro);
        exibirMensagem("Erro ao se comunicar com o servidor.", "#f44336");
      }
    });
  }

if (botaoVoltar) {
    botaoVoltar.addEventListener("click", () => {
      window.location.href = "../fornecedores/fornecedores.html";
    });
}

function exibirMensagem(texto, cor) {
    const mensagem = document.getElementById("mensagem");
    mensagem.style.display = "block";
    mensagem.style.backgroundColor = cor;
    mensagem.textContent = texto;
    setTimeout(() => {
      mensagem.style.display = "none";
    }, 4000);
}

function limparCampos() {
    document.getElementById("nome").value = "";
    document.getElementById("cnpj").value = "";
    document.getElementById("email").value = "";
  }
});
