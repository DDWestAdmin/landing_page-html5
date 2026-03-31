document.addEventListener('DOMContentLoaded', () => {
  const logoImages = document.querySelectorAll('#logos img[data-marca]');
  logoImages.forEach(img => {
    img.addEventListener('click', () => {
      const marca = img.dataset.marca;
      const marcaSelect = document.getElementById('marca-select');
      const modeloSelect = document.getElementById('modelo-select');

      if (!marcaSelect) return;
      marcaSelect.value = marca;

      // Disparar evento change para actualizar lista de modelos y mostrar autos.
      const changeEvent = new Event('change');
      marcaSelect.dispatchEvent(changeEvent);

      // Actualizar select de modelo: si hay opción con el mismo modelo, dejarlo.
      if (modeloSelect) {
        modeloSelect.value = '';
      }
    });
  });
});
