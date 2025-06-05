// Funções de autenticação compartilhadas
export const verificarAutenticacao = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/login/login.html';
        return false;
    }
    return true;
};

export const fazerLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = '/login/login.html';
};

// Verifica autenticação ao carregar a página
export const initAuth = () => {
    // Adiciona evento de logout se o botão existir
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', fazerLogout);
    }
    
    // Verifica se está nas páginas que requerem autenticação
    const protectedPages = ['/produtos/produtos.html', '/usuarios/usuarios.html'];
    if (protectedPages.some(page => window.location.pathname.includes(page))) {
        verificarAutenticacao();
    }
};

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initAuth);