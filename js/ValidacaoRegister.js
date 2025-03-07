document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    let user = document.getElementById("user").value.trim();
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    let userError = document.getElementById("userError");
    let passwordError = document.getElementById("passwordError");
    let confirmPasswordError = document.getElementById("confirmPasswordError");

    userError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";

    let isValid = true;

    if (user === "") {
        userError.textContent = "O usuário é obrigatório!";
        isValid = false;
    }

    if (password.length < 6) {
        passwordError.textContent = "A senha deve ter pelo menos 6 caracteres!";
        isValid = false;
    }

    if (password !== confirmPassword) {
        confirmPasswordError.textContent = "As senhas não coincidem!";
        isValid = false;
    } 

    if (isValid) {
        let listUser = JSON.parse(localStorage.getItem('listUser') || '[]');

        let userExists = listUser.some(item => item.user === user);
        if (userExists) {
            userError.textContent = "Este usuário já está cadastrado!";
            return;
        }

        listUser.push({ user: user, password: password });
        localStorage.setItem('listUser', JSON.stringify(listUser));

        alert("Registro realizado com sucesso! Redirecionando para o login...");

        setTimeout(function() {
            window.location.href = "login.html"; 
        }, 1000);
    }
});
