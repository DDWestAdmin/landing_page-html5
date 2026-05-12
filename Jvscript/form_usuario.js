// función registro de usuarios
function registrarUsuario(event) {
    event.preventDefault(); // Evitar que el formulario se envíe

    // Obtener usuarios desde localStorage (si existen)
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuario = document.getElementById("registro-usuario").value.trim();
    const correo = document.getElementById("registro-email").value.trim();
    const contraseña = document.getElementById("registro-password").value;
    const confirmarContraseña = document.getElementById("registro-password-confirm").value;

    // Validar que se completen todos los campos
    if (!usuario || !correo || !contraseña || !confirmarContraseña) {
        alert("Debe completar todos los campos para continuar.");
        return;
    }

    // Validar que las contraseñas coincidan
    if (contraseña !== confirmarContraseña) {
        alert("Contraseña no válida. Ingrese de nuevo.");
        return;
    }

    // Validar formato de correo electrónico
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(correo)) {
        alert("Correo ingresado inválido.");
        return;
    }

    // si la contraseña es menor a 8 caracteres
    if (contraseña.length < 8) {
        alert("La contraseña debe tener como mínimo 8 caracteres.");
        return;
    }

    // Si usuario ya existe
    if (usuarios.find(u => u.correo === correo)) {
        alert("Correo ya registrado. Por favor inicie sesión");
        return;
    }

    // crear objeto usuario
    const nuevo_usuario = {
        nombre: usuario,
        correo: correo,
        contraseña: contraseña
    };

    // guardar usuario en el array y en localStorage
    usuarios.push(nuevo_usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("Cuenta creada exitosamente. Por favor inicie sesión.");

    // Limpiar el formulario después del registro exitoso
    const form = document.getElementById("registroForm");
    if (form) form.reset();
}

// Vincular el submit del formulario al handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registroForm');
    if (form) form.addEventListener('submit', registrarUsuario);
});