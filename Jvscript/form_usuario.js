//guardar usuarios registrados
let usuarios = []; 

//función registro de usuarios
function registrarUsuario(event) {
    event.preventDefault(); // Evitar que el formulario se envíe
    
    const usuario = document.getElementById("registro-usuario").value;
    const correo = document.getElementById("registro-email").value;    
    const contraseña = document.getElementById("registro-password").value;
    const confirmarContraseña = document.getElementById("registro-confirm-password").value;

    // Validar que las contraseñas coincidan
    if (contraseña !== confirmarContraseña) {
        alert("Contraseña no válida. Ingrese de nuevo.");
        return;
    }

    // Validar formato de correo electrónico
    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Validar el correo electrónico
    if (!validarEmail(correo)) {
        alert("Correo ingresado inválido.");
        return;
    }

    //si la contraseña es menor a 8 caracteres
    if (contraseña.length < 8) {
        alert("La contraseña debe tener como mínimo 8 caracteres.");
        return;
    }

    //Validar que se completen todos los campos
    if (!usuario||!correo||!contraseña||!confirmarContraseña) {
        alert("Debe completar todos los campos para continuar.");
        return;
    }

    //Si usuario ya existe
    if (usuaeios.find(u => u.correo === correo)) {
        alert("Correo yaregistrado. Por favor inicie sesión");
        return;
    }

    
}