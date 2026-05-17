//función iniciar sesión de usuarios
function iniciarSesion() {
    // Obtener el array de usuarios desde localStorage (o array vacío si no existe)
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    // Leer valores de los campos del formulario de inicio de sesión
    const correo = document.getElementById("inicio-email") && document.getElementById("inicio-email").value;
    // Contraseña ingresada por el usuario
    const contraseña = document.getElementById("inicio-password") && document.getElementById("inicio-password").value;

    // Validar que ambos campos estén completos
    if (!correo || !contraseña) {
        alert("Debe completar los campos para iniciar sesión.");
        return;
    }

    // Validar formato de correo electrónico
    // Validación simple del formato del correo electrónico
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(correo)) {
        alert("Correo inválido.");
        return;
    }
    // Verificar que la parte después de @ tenga al menos 5 caracteres
    const dominio = correo.split('@')[1] || '';
    if (dominio.length < 5) {
        alert('Dominio del correo demasiado corto.');
        return;
    }

    // Buscar usuario que coincida con correo y contraseña
    // Buscar usuario con correo y contraseña coincidentes
    const usuario = usuarios.find(u => u.correo === correo && u.contraseña === contraseña);
    if (usuario) {
        // Determinar nombre a mostrar (varias claves posibles)
        const nombre = usuario.nombre || usuario.usuario || usuario.nombreUsuario || '';
        // Guardar sesión activa en localStorage
        localStorage.setItem('usuarioActivo', JSON.stringify({nombre: nombre, correo: usuario.correo}));
        // Notificar éxito al usuario
        alert('Inicio de sesión exitoso. ¡Bienvenido ' + (nombre || usuario.correo) + '!');
        // Intentar cerrar el modal de inicio de sesión si existe
        try {
            const modalEl = document.getElementById('inicioSesionModal');
            const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
            modal.hide();
        } catch (e) {}
        // Actualizar la UI para mostrar usuario
        mostrarUsuario();
    } else {
        // Credenciales inválidas
        alert('Correo o contraseña incorrectos.');
    }
}

// función mostrar usuario logueado
function mostrarUsuario() {
    // Obtener la sesión activa desde localStorage
    const activo = JSON.parse(localStorage.getItem('usuarioActivo'));
    // Referencias a elementos del DOM que se actualizarán
    const formulario = document.getElementById('formulario_usuario');
    const info = document.getElementById('usuario_info');
    const span = document.getElementById('usuarioLogueado');
    const headerSpan = document.getElementById('header_usuario');
    // Elemento del modal que muestra el nombre de usuario
    const modalName = document.getElementById('userModalName');

    // Si hay una sesión activa, ajustar la UI para mostrarla
    if (activo && activo.correo) {
        if (formulario) formulario.style.display = 'none';
        if (span) span.textContent = 'Usuario: ' + (activo.nombre || activo.correo);
        if (info) info.style.display = 'flex';
        if (headerSpan) {
            // Mostrar solo el nombre (o el correo si no hay nombre)
            headerSpan.textContent = (activo.nombre ? activo.nombre : activo.correo);
            headerSpan.style.display = 'inline-block';
        }
        if (modalName) modalName.textContent = (activo.nombre ? activo.nombre : activo.correo);
    } else {
        // Si no hay sesión, restaurar la UI por defecto
        if (formulario) formulario.style.display = 'block';
        if (info) info.style.display = 'none';
        if (headerSpan) headerSpan.style.display = 'none';
        if (modalName) modalName.textContent = '-';
    }
}

// función cerrar sesión de usuarios
function cerrarSesion() {
    // Eliminar la sesión activa y actualizar UI
    localStorage.removeItem('usuarioActivo');
    mostrarUsuario();
    alert('Sesión cerrada.');
}

// Inicializar eventos al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Al cargar la página, inicializar estado y listeners
    mostrarUsuario();
    const btnSign = document.getElementById('button_signing');
    if (btnSign) btnSign.addEventListener('click', iniciarSesion);
    // Listener para el botón de cierre de sesión en la esquina
    const btnLogout = document.getElementById('button_logout');
    if (btnLogout) btnLogout.addEventListener('click', cerrarSesion);
    // Listener para el botón de cierre de sesión dentro del modal del header
    const btnLogoutModal = document.getElementById('button_logout_modal');
    if (btnLogoutModal) btnLogoutModal.addEventListener('click', function() {
        cerrarSesion();
        // Intentar cerrar el modal después de cerrar sesión
        try {
            const modalEl = document.getElementById('userModal');
            const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
            modal.hide();
        } catch (e) {}
    });
});