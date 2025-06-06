document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const mensagemErro = document.getElementById('mensagemErro');
  mensagemErro.textContent = '';
  
  try {
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    const data = await response.json();

    if (response.ok) {
      // 1. Armazena os dados de autenticação
      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario', JSON.stringify(data.usuario));
      
      // 2. Debug (pode remover depois)
      console.log('Login bem-sucedido:', {
        token: data.token,
        usuario: data.usuario
      });

      // 3. Verifica se há URL de redirecionamento
      const urlParams = new URLSearchParams(window.location.search);
      const redirectUrl = urlParams.get('redirect');

      // 4. Redireciona inteligentemente
      if (redirectUrl) {
        // Redireciona para a página originalmente solicitada
        window.location.href = redirectUrl;
      } else {
        // Redireciona conforme o tipo de usuário
        const destino = data.usuario.tipo === 'admin' 
          ? '../dashboard/index.html' 
          : '../dashboard/index.html';
        window.location.href = destino;
      }
      
    } else {
      // Exibe mensagem de erro do servidor
      mensagemErro.textContent = data.erro || 'Credenciais inválidas';
      mensagemErro.style.display = 'block';
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    mensagemErro.textContent = 'Erro na conexão com o servidor';
    mensagemErro.style.display = 'block';
  }
});

// Verifica se já está logado (evita ficar na página de login)
document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  if (token) {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const destino = usuario?.tipo === 'admin' 
      ? '../dashboard/index.html' 
      : '../dashboard/index.html';
    window.location.href = destino;
  }
});