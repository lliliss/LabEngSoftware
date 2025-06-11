// notificacoes.js
document.addEventListener('DOMContentLoaded', async function() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '../login/logins.html';
            return;
        }

        // Carrega produtos com estoque baixo
        const responseEstoque = await fetch('https://labengsoftware.onrender.com/api/notificacoes/estoque-baixo', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            credentials: "include",
        });
        
        if (!responseEstoque.ok) {
            throw new Error('Erro ao carregar estoque baixo');
        }
        
        const estoqueBaixo = await responseEstoque.json();
        
        const tabelaEstoque = document.querySelector('#tabelaEstoqueBaixo tbody');
        tabelaEstoque.innerHTML = ''; // Limpa a tabela antes de adicionar novos dados
        
        if (estoqueBaixo.length === 0) {
            tabelaEstoque.innerHTML = '<tr><td colspan="2">Nenhum produto com estoque baixo</td></tr>';
        } else {
            estoqueBaixo.forEach(produto => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${produto.nome}</td>
                    <td>${produto.quantidade}</td>
                `;
                tabelaEstoque.appendChild(row);
            });
        }
        
        // Carrega produtos com vencimento próximo
        const responseVencimento = await fetch('https://labengsoftware.onrender.com/api/notificacoes/vencimento-proximo', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
            ,credentials:"include",
        });
        
        if (!responseVencimento.ok) {
            throw new Error('Erro ao carregar vencimentos próximos');
        }
        
        const vencimentoProximo = await responseVencimento.json();
        
        const tabelaVencimento = document.querySelector('#tabelaVencimentoProximo tbody');
        tabelaVencimento.innerHTML = ''; // Limpa a tabela antes de adicionar novos dados
        
        if (vencimentoProximo.length === 0) {
            tabelaVencimento.innerHTML = '<tr><td colspan="3">Nenhum produto com vencimento próximo</td></tr>';
        } else {
            vencimentoProximo.forEach(produto => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${produto.nome}</td>
                    <td>${produto.data_validade}</td>
                    <td>${produto.quantidade}</td>
                `;
                tabelaVencimento.appendChild(row);
            });
        }
        
    } catch (error) {
        console.error('Erro ao carregar notificações:', error);
        
        // Se o token estiver inválido ou expirado, redireciona para login
        if (error.message.includes('401') || error.message.includes('token')) {
            alert('Sessão expirada. Por favor, faça login novamente.');
            window.location.href = '../login/logins.html';
        } else {
            alert('Erro ao carregar dados das notificações');
        }
    }
});