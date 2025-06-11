document.addEventListener('DOMContentLoaded', () => {
  const salvarBtn = document.getElementById('salvar');
  const voltarBtn = document.getElementById('voltar');
  const mensagem = document.getElementById('mensagem');

  const token = localStorage.getItem('token');
  const usuario = JSON.parse(localStorage.getItem('user'));

  // Aplicar máscara de CPF no input #quantidade
  const cpfInput = document.getElementById('quantidade');
  cpfInput.addEventListener('input', () => {
    cpfInput.value = cpfInput.value
      .replace(/\D/g, '') // Remove tudo que não é número
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .slice(0, 14); // Máximo 14 caracteres com pontos e traço
  });

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
    console.log(localStorage.getItem('token')); 
    console.log('Token:', token);
    console.log('Usuário logado:', usuario);
    console.log('Dados do novo usuário:', usuario);
    try {
      const token = localStorage.getItem('token');
      const resposta = await fetch('https://labengsoftware.onrender.com/api/usuarios/enviar', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: "include",
        body: JSON.stringify(usuario),
      });

      console.log('Resposta:', {
        status: resposta.status,
        statusText: resposta.statusText,
        headers: await resposta.headers.entries()
      });

      const resultado = await resposta.json();
      console.log('Resultado:', resultado);

      console.log('Dados sendo enviados:', {
        nome, email, cpf, tipoUsuario, senha
      });

      if (resposta.ok) {
        mensagem.textContent = resultado.message || 'Usuário cadastrado com sucesso!';
        mensagem.style.color = 'green';
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