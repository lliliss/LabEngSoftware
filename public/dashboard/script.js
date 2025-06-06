// script.js atualizado
/*document.addEventListener('DOMContentLoaded', function() {
  // Verificar autenticação primeiro
  if (!checkAuth()) return;

  // Carregar dashboard após garantir que os elementos existem
  setTimeout(() => carregarDashboard(), 100);
});

async function carregarDashboard() {
  try {
    console.log('Iniciando carregamento do dashboard...');
    const token = localStorage.getItem('token');
    
    const response = await fetch('/api/dashboard', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Dados recebidos:', data);

    // Verificar se os elementos existem antes de tentar acessá-los
    const elementos = {
      totalUsuarios: document.querySelector('.CardInfo:nth-child(1) h3'),
      totalEstoque: document.getElementById('totalEstoque'),
      totalFornecedores: document.getElementById('totalFornecedores'),
      entradaBox: document.querySelector('.SecaoDados .DadoBox:nth-child(1)'),
      fornecedorBox: document.querySelector('.SecaoDados .DadoBox:nth-child(2)'),
      produtosBox: document.querySelector('.SecaoDados .DadoBox:nth-child(3)')
    };

    // Verificar elementos faltantes
    for (const [key, element] of Object.entries(elementos)) {
      if (!element) {
        console.error(`Elemento não encontrado: ${key}`);
      }
    }

    // Atualizar valores apenas se os elementos existirem
    if (elementos.totalUsuarios) elementos.totalUsuarios.textContent = data.totalUsuarios || '0';
    if (elementos.totalEstoque) elementos.totalEstoque.textContent = data.totalEstoque || '0';
    if (elementos.totalFornecedores) elementos.totalFornecedores.textContent = data.totalFornecedores || '0';

    if (elementos.entradaBox) {
      elementos.entradaBox.querySelector('.header span').textContent = 'Últimos 7 dias';
      elementos.entradaBox.querySelector('.ladoDireito p:nth-child(1) strong').textContent = data.entradasRecentes || '0';
      elementos.entradaBox.querySelector('.ladoDireito p:nth-child(2) strong').textContent = data.fornecedoresRecentes || '0';
    }

    if (elementos.fornecedorBox) {
      elementos.fornecedorBox.querySelector('.header span').textContent = 'Últimos 7 dias';
      const fornecedorText = elementos.fornecedorBox.querySelector('.ladoDireito p:nth-child(1)');
      if (fornecedorText) fornecedorText.innerHTML = `<strong>${data.totalFornecedores || '0'}</strong> Total de fornecedores`;
    }

    if (elementos.produtosBox) {
      const spanProdutos = elementos.produtosBox.querySelector('.header span');
      if (spanProdutos) spanProdutos.remove();
      
      const produtoText = elementos.produtosBox.querySelector('.ladoDireito p:nth-child(1) strong');
      if (produtoText) produtoText.textContent = data.totalProdutos || '0';
    }

  } catch (err) {
    console.error('Erro detalhado:', err);
    alert('Erro ao carregar dashboard. Verifique o console para detalhes.');
  }
}

// Adicione esta função no script.js
function verificarDadosRecebidos(data) {
  const requiredFields = [
    'totalUsuarios', 'totalProdutos', 'totalFornecedores',
    'entradasRecentes', 'fornecedoresRecentes', 'totalEstoque'
  ];
  
  const missingFields = requiredFields.filter(field => data[field] === undefined);
  
  if (missingFields.length > 0) {
    console.error('Campos faltando na resposta:', missingFields);
    return false;
  }
  
  return true;
}

// Modifique a função carregarDashboard para usar a verificação
if (!verificarDadosRecebidos(data)) {
  throw new Error('Resposta da API incompleta');
}*/