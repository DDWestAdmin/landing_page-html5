// Funciones auxiliares para mostrar/limpiar mensajes de error dentro del modal de registro
function showRegisterError(msg) {
    clearRegisterError();
    const modalBody = document.querySelector('#registroModal .modal-body');
    if (!modalBody) {
        alert(msg);
        return;
    }
    const div = document.createElement('div');
    div.id = 'registroError';
    div.className = 'alert alert-danger';
    div.textContent = msg;
    modalBody.insertBefore(div, modalBody.firstChild);
}

function clearRegisterError() {
    const existing = document.getElementById('registroError');
    if (existing) existing.remove();
}

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
           showRegisterError("Contraseña no válida. Ingrese de nuevo.");
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
           showRegisterError("La contraseña debe tener como mínimo 8 caracteres.");
        return;
    }

    //validar que la contraseña lleva capitales
    if (!/[A-Z]/. test(contraseña)){
           showRegisterError("La contraseña debe contener al menos una letra mayúscula");
        return;
    }

    //validar que la contraseña lleve números
    if (!/[0-9]/. test(contraseña)){
           showRegisterError("La contraseña debe contener al menos un número");
        return;
    }

    //validar que la cntraseña lleve caracteres especiales
    if (!/[!@#$%^&*(),.?":{}|<>]/. test(contraseña)){
           showRegisterError("La contraseña debe contener al menos un carácter especial (por ejemplo: ! @ # ? . ,)");
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
        // Limpiar posibles mensajes de error y notificar éxito
        clearRegisterError();
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