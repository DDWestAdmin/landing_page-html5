// Script de interacción para mostrar información de autos
document.addEventListener("DOMContentLoaded", function() { // Espera a que el DOM esté listo
    const logos = document.querySelectorAll(".logo"); // Selecciona todos los contenedores de logo
    const modal = document.getElementById("modalAuto"); // Referencia al modal
    const imagenAuto = document.getElementById("imagenAuto"); // Imagen dentro del modal
    const descrAuto = document.getElementById("descrAuto"); // Descripción dentro del modal
    const botonSeleccionar = document.getElementById("botonSeleccionar"); // Botón para volver

    // Diccionario de autos con imagen y descripción por marca
    const autos = {
        Ford: {
            img: 'images/autos/Ford_Mustang_GT.jpeg', // Imagen Ford
            desc: 'Ford Mustang GT 2022\n\n"Dosis diaria de Dopamina"\n\nMotor: \nV8 Ti-VCT de 5.0 litros\n\nPotencia: \n450 a 460 caballos de fuerza (HP),\ny un torque de 556 Nm,\ncon transmisión automática de 10 velocidades.\n\nConsumo de Gasolina:\n5.5 a 6.0 Km/l en ciudad,\n11.5 Km/l en carretera, y\n8.1 Km/l ciclo Mixto.' // Descripción Ford
        },
        Chevrolet: {
            img: 'images/autos/Chevrolet_Camaro.jpeg', // Imagen Chevrolet
            desc: 'Chevrolet CamaroZL1 2022\n\n"Toma el control hasta los extremos"\n\nMotor:\n6.2 LT V8 Supercargado\n\nPotencia:\n650 caballos de fuerza (HP),\ny un torque de 881 Nm.\n\nConsumo de Gasolina:\n5.9 K,/l en ciudad,\n8.5 Km/l en carretera,\n6.8 Km/l ciclo Mixto.' // Descripción Chevrolet
        },
        Honda: {
            img: 'images/autos/Honda_Civic.jpeg', // Imagen Honda
            desc: 'Honda Civic RS 2021\n\n"El poder de los Sueños"\n\nMotror:\nDOCH I-VTEC de 1.5 litros Turbo,\n4 cilindros.\n\nPotencia:\n180 caballos de fuerza (HP),\ny un torque de 240 Nm.\n\nConsumo de Gasolina:\n11.1 Km/l en ciudad,\n18.5 Km/l en carretera, y\n15.6 Km/l ciclo Mixto.' // Descripción Honda
        },
        Toyota: {
            img: 'images/autos/Toyota_Corolla.jpeg', // Imagen Toyota
            desc: 'Toyota Corolla Hatchback 2026\n\n"Vayamos a Lugares"\n\nMotor:\nDynamic Force de 2.0 litreos,\n4 cilindros.\n\nPotencia:\n169 caballos de potencia (HP),\ny un torque de 205 Nm.\n\nConsumo de Gasolina:\n13.6 Km/l en ciudad,\n17.4 Km/l en carretera,\n14.8 Km/l ciclo Mixto.' // Descripción Toyota
        }
    };

    logos.forEach(logo => { // Para cada logo
        logo.style.cursor = "pointer"; // Cambia el cursor a mano
        logo.addEventListener("click", function() { // Al hacer clic en el logo
            const marca = logo.getAttribute("data-marca"); // Obtiene la marca
                        if (autos[marca]) { // Si existe la marca en el diccionario
                                imagenAuto.src = autos[marca].img; // Cambia la imagen del modal
                                // Reemplaza saltos de línea por <br> y espacios dobles por &nbsp;&nbsp;
                                descrAuto.innerHTML = autos[marca].desc 
                                    .replace(/\n/g, '<br>') // Cambia los saltos de línea por <br>
                                    .replace(/  /g, '&nbsp;&nbsp;'); // Cambia la descripción del modal
                                modal.style.display = "flex"; // Muestra el modal
                        }
        });
    });

    // Botón volver: cierra el modal y sube al inicio
    botonSeleccionar.addEventListener("click", function() {
        modal.style.display = "none"; // Oculta el modal
        imagenAuto.src = ""; // Limpia la imagen
        descrAuto.innerHTML = ""; // Limpia la descripción
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Sube al inicio
    });

    // Cierra el modal si se hace clic fuera del contenido
    modal.addEventListener("click", function(e) {
        if (e.target === modal) { // Si el clic es en el fondo
            modal.style.display = "none"; // Oculta el modal
            imagenAuto.src = ""; // Limpia la imagen
            descrAuto.innerHTML = ""; // Limpia la descripción
        }
    });
});