document.addEventListener('DOMContentLoaded', () => {
  const logoImages = document.querySelectorAll('#logos img[data-marca]');
  logoImages.forEach(img => {
    img.addEventListener('click', () => {
      const marca = img.dataset.marca;
      const marcaSelect = document.getElementById('marca-select');
      const modeloSelect = document.getElementById('modelo-select');
      const filtroDiv = document.getElementById('filtro');
      const modelosDiv = document.getElementById('modelos');

      if (!marcaSelect) return;

      // Mostrar filtro y área de modelos cuando un logo es seleccionado
      if (filtroDiv) filtroDiv.style.display = 'block';
      if (modelosDiv) modelosDiv.style.display = 'flex';

      marcaSelect.value = marca;

      // Disparar evento change para actualizar lista de modelos y mostrar autos.
      const changeEvent = new Event('change');
      marcaSelect.dispatchEvent(changeEvent);

      // Actualizar select de modelo: resetear selección de modelo
      if (modeloSelect) {
        modeloSelect.value = '';
      }
    });
  });
});
