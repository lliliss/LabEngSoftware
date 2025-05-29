/*document.addEventListener("DOMContentLoaded", function() {
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
});*/


document.addEventListener("DOMContentLoaded", function () {
  const usuario = JSON.parse(localStorage.getItem("usuarioParaEdicao"));

  if (!usuario || !usuario.id_usuario) {
    alert("Nenhum usuário válido selecionado.");
    window.location.href = "usuarios.html";
    return;
  }

  // Preenche os campos do formulário
  document.getElementById("nome").value = usuario.nome || "";
  document.getElementById("categoria").value = usuario.email || "";
  document.getElementById("cargo").value = usuario.cargo || "";

  // Botão voltar
  const botaoVoltar = document.getElementById("Voltar");
  if (botaoVoltar) {
    botaoVoltar.addEventListener("click", function () {
      localStorage.removeItem("usuarioParaEdicao");
      window.location.href = "usuarios.html";
    });
  }

document.getElementById("salvar").addEventListener("click", async function () {
  const usuarioOriginal = JSON.parse(localStorage.getItem("usuarioParaEdicao"));
  if (!usuarioOriginal) {
    alert("Nenhum usuario carregado para edição.");
    return;
  }


  const usuarioAtualizado = {
  nome: document.getElementById("nome").value.trim(),
  email: document.getElementById("categoria").value.trim(),
  cargo: document.getElementById("cargo").value.trim(),
};

  try {
    const resposta = await fetch(`http://localhost:5000/api/usuarios/editar/${usuarioOriginal.id_usuario}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(usuarioAtualizado)
    });

    if (resposta.ok) {
      alert("Usuário atualizado com sucesso!");
      localStorage.removeItem("usuarioParaEdicao");
      window.location.href = "usuarios.html"; // volta para listagem
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
    const usuarioAtual = JSON.parse(localStorage.getItem("usuarioParaEdicao"));
    console.log("Usuario carregado para exclusão:", usuarioAtual);

    if (!usuarioAtual || !usuarioAtual.id_usuario) {
      alert("Nenhum Usuário selecionado para exclusão.");
      return;
    }

    const idUsuario = usuarioAtual.id_usuario;

    if (confirm("Tem certeza que deseja excluir este usuario?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/deleteusuarios/${idUsuario}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          alert("Usuário excluído com sucesso.");
          localStorage.removeItem("usuarioParaEdicao");
          window.location.href = "usuarios.html"; // Redireciona para a tela principal
        } else {
          const errorData = await response.json();
          alert("Erro ao excluir usuario: " + (errorData.message || response.statusText));
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro ao tentar excluir o usuario.");
      }
    }
  });
});
