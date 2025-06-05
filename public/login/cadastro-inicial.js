document.getElementById('cadastroInicialForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const cpf = document.getElementById('cpf').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;
    const mensagem = document.getElementById('mensagem');

    // Validações básicas
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

    try {
        const response = await fetch('http://localhost:5000/api/usuarios/cadastro-inicial', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, cpf, senha })
        });

        const data = await response.json();

        if (response.ok) {
            mensagem.textContent = 'Administrador cadastrado com sucesso! Redirecionando para login...';
            mensagem.style.color = 'green';
            
            // Redireciona para login após 2 segundos
            setTimeout(() => {
                window.location.href = 'logins.html';
            }, 2000);
        } else {
            mensagem.textContent = data.erro || 'Erro ao cadastrar administrador';
            mensagem.style.color = 'red';
        }
    } catch (error) {
        console.error('Erro:', error);
        mensagem.textContent = 'Erro na conexão com o servidor';
        mensagem.style.color = 'red';
    }
});