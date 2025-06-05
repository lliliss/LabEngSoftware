document.addEventListener('DOMContentLoaded', () => {
  const salvarBtn = document.getElementById('salvar');
  const voltarBtn = document.getElementById('voltar');
  const mensagem = document.getElementById('mensagem');

  const token = localStorage.getItem('token');
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  
  if (!token || !usuario) {
    window.location.href = '../login/logins.html';
    return;
  }

  salvarBtn.addEventListener('click', async () => {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('categoria').value;
    const cpf = document.getElementById('quantidade').value;
    const tipoUsuario = document.getElementById('tipoUsuario').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;

    // Validação básica
    if (senha !== confirmarSenha) {
      mensagem.textContent = 'As senhas não coincidem!';
      mensagem.style.color = 'red';
      return;
    }

    if (senha.length < 6) {
      mensagem.textContent = 'A senha deve ter pelo menos 6 caracteres!';
      mensagem.style.color = 'red';
      return;
    }

    const usuario = { nome, email, cpf, tipoUsuario, senha };
    console.log(localStorage.getItem('token')); // Deve mostrar o token
    try {
    
      const resposta = await fetch('http://localhost:5000/api/usuarios/enviar', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(usuario),
      });

      // Adicione este log para debug
      console.log('Resposta:', {
        status: resposta.status,
        statusText: resposta.statusText,
        headers: await resposta.headers.entries()
      });

      const resultado = await resposta.json();
      console.log('Resultado:', resultado);


      if (resposta.ok) {
        mensagem.textContent = resultado.message || 'Usuário cadastrado com sucesso!';
        mensagem.style.color = 'green';
        // Limpa o formulário após cadastro bem-sucedido
        document.querySelectorAll('input').forEach(input => input.value = '');
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