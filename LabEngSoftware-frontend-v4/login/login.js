document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let user = document.getElementById("user").value.trim();
    let password = document.getElementById("password").value;

    let userError = document.getElementById("userError");
    let passwordError = document.getElementById("passwordError");

    userError.textContent = "";
    passwordError.textContent = "";

    let isValid = true;

    if (user === "") {
        userError.textContent = "O usuário é obrigatório!";
        isValid = false;
    }

    if (password === "") {
        passwordError.textContent = "A senha é obrigatória!";
        isValid = false;
    }

    if (isValid) {
        let listUser = JSON.parse(localStorage.getItem('listUser') || '[]');

       
        let userValid = listUser.find(item => item.user === user && item.password === password);

        if (userValid) {
            alert("Login realizado com sucesso!");
            
          
            localStorage.setItem("userLoggedIn", JSON.stringify(userValid));

            setTimeout(function() {
                window.location.href = "home.html"; 
            }, 1000);
        } else {
            passwordError.textContent = "Usuário ou senha incorretos!";
        }
    }
});