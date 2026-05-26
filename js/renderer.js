export function renderWorkshop(workshop) {
  const container = document.getElementById('workshop-container');

  container.innerHTML = '';

  workshop.bloques.forEach((bloque) => {
    const card = document.createElement('div');
    card.className = 'card';

    switch (bloque.tipo) {
      case 'titulo':
        card.innerHTML = `<h2>${bloque.contenido}</h2>`;
        break;

      case 'subtitulo':
        card.innerHTML = `<h3>${bloque.contenido}</h3>`;
        break;

      case 'texto':
        card.innerHTML = `<p>${bloque.contenido}</p>`;
        break;

      case 'destacado':
        card.innerHTML = `
          <div class="highlight-box">
            <strong>${bloque.titulo}</strong>
            <p>${bloque.contenido}</p>
          </div>
        `;
        break;

      case 'imagen':
        card.innerHTML = `
          <img src="${bloque.src}" alt="${bloque.alt || ''}" class="content-image" />
        `;
        break;

      case 'tabla':
        card.innerHTML = renderTable(bloque);
        break;

      case 'pregunta_abierta':
        card.innerHTML = `
          <h3>${bloque.pregunta}</h3>
          <textarea data-question="${bloque.id}" rows="6"></textarea>
        `;
        break;

      case 'multiple':
        const options = bloque.opciones.map(option => `
          <label class="option-label">
            <input type="radio" name="${bloque.id}" value="${option}" />
            ${option}
          </label>
        `).join('');

        card.innerHTML = `
          <h3>${bloque.pregunta}</h3>
          <div class="options-group">
            ${options}
          </div>
        `;
        break;

      case 'caso_clinico':
        card.innerHTML = `
          <div class="clinical-case">
            <h3>${bloque.titulo}</h3>
            <p>${bloque.descripcion}</p>
          </div>
        `;
        break;

      default:
        card.innerHTML = `<p>Bloque no soportado: ${bloque.tipo}</p>`;
    }

    container.appendChild(card);
  });
}

function renderTable(bloque) {
  const headers = bloque.columnas
    .map(col => `<th>${col}</th>`)
    .join('');

  const rows = bloque.filas
    .map(fila => {
      const cols = fila.map(col => `<td>${col}</td>`).join('');
      return `<tr>${cols}</tr>`;
    })
    .join('');

  return `
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>${headers}</tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  `;
}
