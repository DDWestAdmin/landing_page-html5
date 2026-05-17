// función registro de usuarios
function registrarUsuario(event) {
    // Evitar el envío por defecto del formulario
    event.preventDefault();

    // Obtener lista de usuarios existente desde localStorage
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Leer valores de los inputs de registro
    const usuario = document.getElementById("registro-usuario").value.trim();
    const correo = document.getElementById("registro-email").value.trim();
    const contraseña = document.getElementById("registro-password").value;
    const confirmarContraseña = document.getElementById("registro-password-confirm").value;

    // Validar campos obligatorios
    if (!usuario || !correo || !contraseña || !confirmarContraseña) {
        alert("Debe completar todos los campos para continuar.");
        return;
    }

    // Validar coincidencia de contraseñas
    if (contraseña !== confirmarContraseña) {
        alert("Contraseña no válida. Ingrese de nuevo.");
        return;
    }

    // Validar formato del correo
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(correo)) {
        alert("Correo ingresado inválido.");
        return;
    }
    // Validar que la parte después de @ tenga al menos 5 caracteres
    const dominio = correo.split('@')[1] || '';
    if (dominio.length < 5) {
        alert("Correo inválido.");
        return;
    }
    
    // Validar longitud mínima de contraseña
    if (contraseña.length < 8) {
        alert("La contraseña debe tener como mínimo 8 caracteres.");
        return;
    }

    //validar que la contraseña lleva capitales
    if (!/[A-Z]/. test(contraseña)){
        alert("La contraseña debe contener al menos una letra capital");
        return;
    }

    //validar que la contraseña lleve números
    if (!/[0-9]/. test(contraseña)){
        alert("La contraseña debe contener al menos un número");
        return;
    }

    //validar que la cntraseña lleve caracteres especiales
    if (!/[!@#$%^&*(),.?":{}|<>]/. test(contraseña)){
        alert("la contraseña debe contener un caracter especial ej:(., ?. #)");
        return;
    }

    // Comprobar si el correo ya está registrado
    if (usuarios.find(u => u.correo === correo)) {
        alert("Correo ya registrado. Por favor inicie sesión");
        return;
    }

    // Construir objeto de nuevo usuario
    const nuevo_usuario = {
        nombre: usuario,
        correo: correo,
        contraseña: contraseña
    };

    // Añadir usuario y persistir en localStorage
    usuarios.push(nuevo_usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("Cuenta creada exitosamente. Por favor inicie sesión.");

    // Limpiar formulario de registro
    const form = document.getElementById("registroForm");
    if (form) form.reset();
}

// Vincular el submit del formulario al handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registroForm');
    if (form) form.addEventListener('submit', registrarUsuario);
});