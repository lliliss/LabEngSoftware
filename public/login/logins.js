document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  
  try {
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    const data = await response.json();

    if (response.ok) {
      // Armazena o token e os dados do usuário
      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario', JSON.stringify(data.usuario));
      
      console.log('Token armazenado:', localStorage.getItem('token'));
      console.log('Dados do usuário:', localStorage.getItem('usuario'));
      

      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario', JSON.stringify(data.usuario));
      // Redireciona para a página principal
      window.location.href = '../dashboard/index.html';
    } else {
      // Exibe mensagem de erro
      document.getElementById('mensagemErro').textContent = data.erro || 'Erro ao fazer login';
    }
  } catch (error) {
    console.error('Erro:', error);
    document.getElementById('mensagemErro').textContent = 'Erro na conexão com o servidor';
  }
});