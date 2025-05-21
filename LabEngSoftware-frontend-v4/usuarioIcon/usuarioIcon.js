function mostrarAba(idAba) {
    const abas = document.querySelectorAll('.conteudoInfo, .conteudoSenha');
    const botoes = document.querySelectorAll('.botaoInfo, .botaoSenha');

    abas.forEach(aba => aba.style.display = 'none');
    botoes.forEach(botao => botao.classList.remove('ativo'));

    document.getElementById(idAba).style.display = 'block';
    const botaoClicado = idAba === 'dadosConta' ? document.querySelector('.botaoInfo') : document.querySelector('.botaoSenha');
    botaoClicado.classList.add('ativo');
}

function atualizarInformacoes(e) {
    e.preventDefault();
    const mensagem = document.getElementById("mensagemInformacoes");
    mensagem.textContent = "Informações atualizadas com sucesso!";
    mensagem.className = "mensagemFormulario sucesso";
}

function alterarSenha(e) {
    e.preventDefault();

    const atual = document.getElementById("senhaAtual").value;
    const nova = document.getElementById("novaSenha").value;
    const confirmar = document.getElementById("confirmarSenha").value;
    const mensagem = document.getElementById("mensagemSenha");

    if (nova !== confirmar) {
        mensagem.textContent = "As senhas não coincidem.";
        mensagem.className = "mensagemFormulario erro";
        return;
    }

    if (nova.length < 6) {
        mensagem.textContent = "A nova senha deve ter pelo menos 6 caracteres.";
        mensagem.className = "mensagemFormulario erro";
        return;
    }

    mensagem.textContent = "Senha atualizada com sucesso!";
    mensagem.className = "mensagemFormulario sucesso";
}


document.addEventListener("DOMContentLoaded", () => {
    mostrarAba('dadosConta');
});
