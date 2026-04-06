// Script de interacción para mostrar información de autos
document.addEventListener("DOMContentLoaded", function() { // Espera a que el DOM esté listo
    const logos = document.querySelectorAll(".logo"); // Selecciona todos los contenedores de logo
    const modal = document.getElementById("modalAuto"); // Referencia al modal
    const imagenAuto = document.getElementById("imagenAuto"); // Imagen dentro del modal
    const descrAuto = document.getElementById("descrAuto"); // Descripción dentro del modal
    const btnSeleccionar = document.getElementById("btnSeleccionar"); // Botón para volver

    // Diccionario de autos con imagen y descripción por marca
    const autos = {
        Ford: {
            img: 'images/autos/Ford_Mustang_GT.jpeg', // Imagen Ford
            desc: 'Ford Mustang GT: Potencia y estilo en un solo paquete.' // Descripción Ford
        },
        Chevrolet: {
            img: 'images/autos/Chevrolet_Camaro.jpeg', // Imagen Chevrolet
            desc: 'Chevrolet Silverado: La fuerza y durabilidad que necesitas.' // Descripción Chevrolet
        },
        Honda: {
            img: 'images/autos/Honda_Civic.jpeg', // Imagen Honda
            desc: 'Honda Civic: Eficiencia y confiabilidad en cada viaje.' // Descripción Honda
        },
        Toyota: {
            img: 'images/autos/Toyota_Corolla.jpeg', // Imagen Toyota
            desc: 'Toyota Corolla: Comodidad y tecnología para tu día a día.' // Descripción Toyota
        }
    };

    logos.forEach(logo => { // Para cada logo
        logo.style.cursor = "pointer"; // Cambia el cursor a mano
        logo.addEventListener("click", function() { // Al hacer clic en el logo
            const marca = logo.getAttribute("data-marca"); // Obtiene la marca
            if (autos[marca]) { // Si existe la marca en el diccionario
                imagenAuto.src = autos[marca].img; // Cambia la imagen del modal
                descrAuto.textContent = autos[marca].desc; // Cambia la descripción
                modal.style.display = "flex"; // Muestra el modal
            }
        });
    });

    // Botón volver: cierra el modal y sube al inicio
    btnSeleccionar.addEventListener("click", function() {
        modal.style.display = "none"; // Oculta el modal
        imagenAuto.src = ""; // Limpia la imagen
        descrAuto.textContent = ""; // Limpia la descripción
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Sube al inicio
    });

    // Cierra el modal si se hace clic fuera del contenido
    modal.addEventListener("click", function(e) {
        if (e.target === modal) { // Si el clic es en el fondo
            modal.style.display = "none"; // Oculta el modal
            imagenAuto.src = ""; // Limpia la imagen
            descrAuto.textContent = ""; // Limpia la descripción
        }
    });
});