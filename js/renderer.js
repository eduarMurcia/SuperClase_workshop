export function renderWorkshop(workshop) {
  const container = document.getElementById('workshop-container');

  container.innerHTML = '';

  workshop.bloques.forEach((bloque) => {
    const card = document.createElement('div');
    card.className = 'card';

    if (bloque.tipo === 'titulo') {
      card.innerHTML = `<h2>${bloque.contenido}</h2>`;
    }

    if (bloque.tipo === 'texto') {
      card.innerHTML = `<p>${bloque.contenido}</p>`;
    }

    if (bloque.tipo === 'pregunta_abierta') {
      card.innerHTML = `
        <h3>${bloque.pregunta}</h3>
        <textarea data-question="${bloque.id}" rows="6"></textarea>
      `;
    }

    if (bloque.tipo === 'multiple') {
      const options = bloque.opciones.map(option => `
        <label>
          <input type="radio" name="${bloque.id}" value="${option}" />
          ${option}
        </label>
      `).join('');

      card.innerHTML = `
        <h3>${bloque.pregunta}</h3>
        ${options}
      `;
    }

    container.appendChild(card);
  });
}
