// Importações no TOPO do arquivo (sintaxe correta)
import { checkAuth, initAuth } from '../shared/js/auth.js';

// Função principal para configurar elementos admin
export function setupAdminElements() {
  // Verifica autenticação primeiro
  if (!checkAuth()) return;
  
  const usuario = JSON.parse(localStorage.getItem('user'));
  
  // Seleciona TODOS os elementos admin uma única vez
  const adminElements = document.querySelectorAll('.admin-only');
  
  if (usuario?.tipo === 'admin') {
    adminElements.forEach(el => {
      el.style.display = 'block'; // Ou seu valor padrão (flex, grid, etc)
    });
  } else {
    // Garante que está oculto para não-admins (redundância segura)
    adminElements.forEach(el => {
      el.style.display = 'none';
    });
  }
}

// Versão autoinicializável (alternativa)
export function initAdminUI() {
  document.addEventListener('DOMContentLoaded', () => {
    setupAdminElements();
    
    // Opcional: Observar mudanças no localStorage
    window.addEventListener('storage', (event) => {
      if (event.key === 'usuario') {
        setupAdminElements();
      }
    });
  });
}