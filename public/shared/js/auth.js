// shared/js/auth.js

// Tipos de usuário
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'funcionario'
};

// Verifica se está em página protegida
export const isProtectedPage = () => {
  const protectedPages = [
    '/dashboard/index.html',
    '/fornecedores/edicaoDeFornecedor.html',
    '/fornecedores/fornecedores.html',
    '/fornecedores/novoFornecedor.html',
    '/produtos/edicaoDeProduto.html',
    '/produtos/novoProduto.html',
    '/produtos/produtos.html',
    '/relatorios/relatorios.html',
    '/usuarios/edicaoDeUsuario.html',
    '/usuarios/novoUsuario.html',
    '/usuarios/usuarios.html'
  ];
  return protectedPages.some(page => window.location.pathname.endsWith(page));
};

// Verifica se está em página restrita a admin
export const isAdminPage = () => {
  const adminPages = [
    '/usuarios/usuarios.html'
  ];
  return adminPages.some(page => window.location.pathname.endsWith(page));
};

// Pega dados do usuário logado
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Verifica autenticação básica
export const checkAuth = () => {
  const token = localStorage.getItem('token');
  const user = getCurrentUser();
  
  // Redireciona se não estiver logado em página protegida
  if (isProtectedPage() && !token) {
    window.location.href = '/login/logins.html?redirect=' + encodeURIComponent(window.location.pathname);
    return false;
  }
  
  // Redireciona se não for admin em página de admin
  if (isAdminPage() && user?.tipo !== USER_ROLES.ADMIN) {
    window.location.href = '/dashboard/index.html?error=unauthorized';
    return false;
  }
  
  return true;
};

// Faz logout
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login/logins.html';
};

// Inicializa sistema de autenticação
export const initAuth = () => {
  if (!protectRoute()) return;

  // Controle de elementos
  const user = getCurrentUser();
  document.querySelectorAll('[data-auth-only]').forEach(el => {
    el.style.display = 'block';
  });

  if (isAdmin()) {
    document.querySelectorAll('[data-admin-only]').forEach(el => {
      el.style.display = 'block';
    });
  }
  
  // Adiciona evento de logout
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }
  
  // Mostra/oculta elementos baseado no tipo de usuário
  const adminElements = document.querySelectorAll('[data-admin-only]');
  if (adminElements.length > 0) {
    const user = getCurrentUser();
    const isAdmin = user?.tipo === USER_ROLES.ADMIN;
    
    adminElements.forEach(el => {
      el.style.display = isAdmin ? '' : 'none';
    });
  }

  
};

// shared/js/auth.js (Adições)

// Verifica se o usuário está logado (apenas checa token/user)
export const isLoggedIn = () => {
  return !!localStorage.getItem('token') && !!localStorage.getItem('user');
};

// Verifica se o usuário é admin
export const isAdmin = () => {
  const user = getCurrentUser();
  return user?.tipo === USER_ROLES.ADMIN;
};

// Proteção de rota com redirecionamento
export const protectRoute = () => {
  if (!checkAuth()) return false;
  
  // Adicional: Verifica se o token está perto de expirar
  const token = localStorage.getItem('token');
  if (token) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp - now < 300) { // 5 minutos para expirar
      alert('Sua sessão está prestes a expirar. Faça login novamente em breve.');
    }
  }
  
  return true;
};

// Inicia quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initAuth);
