document.getElementById('salvar').addEventListener('click', function (e) {
  e.preventDefault(); // Evita o comportamento padrão do botão

  

  const nome = document.getElementById('nome').value;
  const categoria = document.getElementById('categoria').value;
  const fornecedores = document.getElementById('fornecedores').value;
  const numeroDeSerie = document.getElementById('numeroDeSerie').value;

  const quantidade = parseInt(document.getElementById('quantidade').value);
  const validade = document.getElementById('validade').value;

  if (!nome || isNaN(quantidade) || !validade) {
    document.getElementById('mensagem').innerText = 'Preencha os campos obrigatórios!';
    return;
  }

  const dados = {
    nome,
    categoria,
    fornecedores,
    lote: {
      quantidade,
      dataValidade: validade,
      numeroSerie: numeroDeSerie
    }
  };

  const token = localStorage.getItem('token');
  fetch("https://labengsoftware.onrender.com/api/produtos/enviar", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    credentials:"include",
    body: JSON.stringify(dados)
  })
        
  .then(response => response.json())
  .then(data => {


    document.getElementById('nome').value = '';
    document.getElementById('categoria').value = '';
    document.getElementById('fornecedores').value = '';
    document.getElementById('numeroDeSerie').value = '';
    document.getElementById('quantidade').value = '';
    document.getElementById('validade').value = '';


    const msg = document.getElementById('mensagem');
    msg.innerText = 'Salvo com sucesso!';
    msg.style.display = 'block';
    setTimeout(() => {
      msg.style.display = 'none';
      msg.innerText = '';
    }, 3000);


  })
  .catch(error => {
    document.getElementById('mensagem').innerText = 'Erro ao salvar!';
    console.error('Erro:', error);
  });
});


const botaoVoltar = document.getElementById("voltar");
if (botaoVoltar) {
  botaoVoltar.addEventListener("click", function () {
    localStorage.removeItem("produtoParaEdicao");
    window.location.href = "produtos.html";
  });
}


// Carregar fornecedores no select
document.addEventListener('DOMContentLoaded', async () => {

      // Configuração inicial da data mínima
    const campoValidade = document.getElementById('validade');
    const mensagemErro = document.getElementById('erroData');
    
    // Obter data atual no formato YYYY-MM-DD
    const hoje = new Date();
    const dd = String(hoje.getDate()).padStart(2, '0');
    const mm = String(hoje.getMonth() + 1).padStart(2, '0');
    const yyyy = hoje.getFullYear();
    const dataMinima = `${yyyy}-${mm}-${dd}`;
    
    // Definir data mínima no campo
    campoValidade.setAttribute('min', dataMinima);
    
    // Validação em tempo real
    campoValidade.addEventListener('change', () => {
        const dataSelecionada = new Date(campoValidade.value);
        if (dataSelecionada < hoje) {
            mensagemErro.style.display = 'block';
            campoValidade.setCustomValidity('Data inválida');
        } else {
            mensagemErro.style.display = 'none';
            campoValidade.setCustomValidity('');
        }
    });

  const selectFornecedores = document.getElementById('fornecedores');
  if (!selectFornecedores) return;

  try {
    const token = localStorage.getItem('token');
    const response = await fetch('https://labengsoftware.onrender.com/api/fornecedores', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
      , credentials: "include",
    });

    const fornecedores = await response.json();

    if (fornecedores.length === 0) {
      selectFornecedores.innerHTML = '<option value="">Nenhum fornecedor encontrado</option>';
      return;
    }

    selectFornecedores.innerHTML = '<option value="">Selecione...</option>';
    fornecedores.forEach(fornecedor => {
      const option = document.createElement('option');
      option.value = fornecedor.id_fornecedor; // ou 'id' se for esse o nome
      option.textContent = fornecedor.nome;
      selectFornecedores.appendChild(option);
    });

    
  } catch (erro) {
    console.error('Erro ao carregar fornecedores:', erro);
    selectFornecedores.innerHTML = '<option value="">Erro ao carregar fornecedores</option>';
  }
});