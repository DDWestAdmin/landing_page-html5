 document.addEventListener("DOMContentLoaded", function() {
    const usuario = document.getElementById("registro_usuario");
    const correo = document.getElementById("registro_email");
    const contraseña = document.getElementById("registro_password");
    const confirmar_contraseña = document.getElementById("registro_password_confirm");

    let error = [];

    if (usuario.lenght )