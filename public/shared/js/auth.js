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
  // Verifica autenticação ao carregar
  checkAuth();
  
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

// Inicia quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initAuth);
