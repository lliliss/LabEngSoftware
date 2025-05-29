document.addEventListener("DOMContentLoaded", function () {
  const usuario = JSON.parse(localStorage.getItem("usuarioParaEdicao"));

  if (!usuario || !usuario.id_usuario) {
    alert("Nenhum usuário válido selecionado.");
    window.location.href = "usuarios.html";
    return;
  }

  // Preenche os campos de input
  document.getElementById("nome").value = usuario.nome || "";
  document.getElementById("categoria").value = usuario.email || "";

  const cargoSelect = document.getElementById("tipoUsuario");

  // Corrige o problema de seleção usando o texto visível das opções
  Array.from(cargoSelect.options).forEach(option => {
    if (option.text.trim().toLowerCase() === usuario.tipo_usuario.trim().toLowerCase()) {
      option.selected = true;
    }
  });

  // Botão voltar
  const botaoVoltar = document.getElementById("Voltar");
  if (botaoVoltar) {
    botaoVoltar.addEventListener("click", function () {
      localStorage.removeItem("usuarioParaEdicao");
      window.location.href = "usuarios.html";
    });
  }

  // Botão salvar
  document.getElementById("salvar").addEventListener("click", async function () {
    const usuarioOriginal = JSON.parse(localStorage.getItem("usuarioParaEdicao"));
    if (!usuarioOriginal) {
      alert("Nenhum usuario carregado para edição.");
      return;
    }

    const tipoMapReverso = {
      "Funcionário": "funcionario",
      "Administrador": "admin"
    };

    const selectText = cargoSelect.options[cargoSelect.selectedIndex].text;
    const tipoUsuarioConvertido = tipoMapReverso[selectText] || cargoSelect.value.trim();

    const usuarioAtualizado = {
      nome: document.getElementById("nome").value.trim(),
      email: document.getElementById("categoria").value.trim(),
      tipo_usuario: tipoUsuarioConvertido
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
        window.location.href = "usuarios.html";
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
          window.location.href = "usuarios.html";
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
