document.addEventListener('DOMContentLoaded', () => {
  const salvarBtn = document.getElementById('salvar');
  const voltarBtn = document.getElementById('voltar');
  const mensagem = document.getElementById('mensagem');

  salvarBtn.addEventListener('click', async () => {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('categoria').value;
    const cpf = document.getElementById('quantidade').value;
    const tipoUsuario = document.getElementById('tipoUsuario').value;

    const usuario = { nome, email, cpf, tipoUsuario };

    try {
      const resposta = await fetch('http://localhost:5000/api/usuarios/enviar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario),
      });

      const resultado = await resposta.json();

      if (resposta.ok) {
        mensagem.textContent = resultado.message;
        mensagem.style.color = 'green';
      } else {
        mensagem.textContent = resultado.error || 'Erro ao cadastrar.';
        mensagem.style.color = 'red';
      }
    } catch (erro) {
      console.error('Erro ao enviar usuário:', erro);
      mensagem.textContent = 'Erro na conexão com o servidor.';
      mensagem.style.color = 'red';
    }
  });

  voltarBtn.addEventListener('click', () => {
    window.location.href = '../usuarios/usuarios.html';
  });
});
