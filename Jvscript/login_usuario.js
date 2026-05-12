//función iniciar sesión de usuarios
function iniciarSesion() {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const correo = document.getElementById("inicio-email") && document.getElementById("inicio-email").value;
    const contraseña = document.getElementById("inicio-password") && document.getElementById("inicio-password").value;

    if (!correo || !contraseña) {
        alert("Debe completar los campos para iniciar sesión.");
        return;
    }

    // Validar formato de correo electrónico
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(correo)) {
        alert("Correo inválido.");
        return;
    }

    // Buscar usuario que coincida con correo y contraseña
    const usuario = usuarios.find(u => u.correo === correo && u.contraseña === contraseña);
    if (usuario) {
        const nombre = usuario.nombre || usuario.usuario || usuario.nombreUsuario || '';
        localStorage.setItem('usuarioActivo', JSON.stringify({nombre: nombre, correo: usuario.correo}));
        alert('Inicio de sesión exitoso. ¡Bienvenido ' + (nombre || usuario.correo) + '!');
        try {
            const modalEl = document.getElementById('inicioSesionModal');
            const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
            modal.hide();
        } catch (e) {}
        mostrarUsuario();
    } else {
        alert('Correo o contraseña incorrectos.');
    }
}

// función mostrar usuario logueado
function mostrarUsuario() {
    const activo = JSON.parse(localStorage.getItem('usuarioActivo'));
    const formulario = document.getElementById('formulario_usuario');
    const info = document.getElementById('usuario_info');
    const span = document.getElementById('usuarioLogueado');
    const headerSpan = document.getElementById('header_usuario');

    // also update modal name element if present
    const modalName = document.getElementById('userModalName');

    if (activo && activo.correo) {
        if (formulario) formulario.style.display = 'none';
        if (span) span.textContent = 'Usuario: ' + (activo.nombre || activo.correo);
        if (info) info.style.display = 'flex';
        if (headerSpan) {
            headerSpan.textContent = (activo.nombre ? activo.nombre : activo.correo);
            headerSpan.style.display = 'inline-block';
        }
        if (modalName) modalName.textContent = (activo.nombre ? activo.nombre : activo.correo);
    } else {
        if (formulario) formulario.style.display = 'block';
        if (info) info.style.display = 'none';
        if (headerSpan) headerSpan.style.display = 'none';
        if (modalName) modalName.textContent = '-';
    }
}

// función cerrar sesión de usuarios
function cerrarSesion() {
    localStorage.removeItem('usuarioActivo');
    mostrarUsuario();
    alert('Sesión cerrada.');
}

// Inicializar eventos al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    mostrarUsuario();
    const btnSign = document.getElementById('button_signing');
    if (btnSign) btnSign.addEventListener('click', iniciarSesion);
    const btnLogout = document.getElementById('button_logout');
    if (btnLogout) btnLogout.addEventListener('click', cerrarSesion);
    const btnLogoutModal = document.getElementById('button_logout_modal');
    if (btnLogoutModal) btnLogoutModal.addEventListener('click', function() {
        cerrarSesion();
        try {
            const modalEl = document.getElementById('userModal');
            const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
            modal.hide();
        } catch (e) {}
    });
});