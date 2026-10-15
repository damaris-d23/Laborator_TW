let loginForm = document.getElementById("loginForm");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");

loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Completarea regex-ului pentru email
    const emailRegex = /^[a-zA-Z]+\.[a-zA-Z]+(\d{0,2})?@e-uvt\.ro$/;
    
    // Regex pentru parolă dat în laborator (minim 7 char, litere mari/mici, cifre, speciale)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{7,}$/;

    if (!emailRegex.test(email)) {
        alert("Adresa de email este invalidă! Te rugăm să folosești formatul: nume.prenume@e-uvt.ro");
        return;
    }

    if (!passwordRegex.test(password)) {
        alert("Parola trebuie să aibă minim 7 caractere, o literă mare, o literă mică, o cifră și un caracter special!");
        return;
    }

    alert("Login reușit!");
    window.location.href = "chatbot.html"; // Legătura către următoarea pagină
});