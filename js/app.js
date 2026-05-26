import { renderWorkshop } from './renderer.js';
import { setupAutosave, restoreAnswers } from './storage.js';
import { setupProgressTracking } from './progress.js';
import { createSession } from './session.js';
import { startAttempt } from './api.js';

const startButton = document.getElementById('start-btn');

startButton.addEventListener('click', async () => {
  try {

    const studentName = document.getElementById('student-name').value.trim();
    const studentGroup = document.getElementById('student-group').value.trim();

    if (!studentName || !studentGroup) {
      alert('Completa nombre y grupo');
      return;
    }

    const session = createSession(
      studentName,
      studentGroup
    );

    try {
      await startAttempt(session);
    } catch (error) {
      console.error('Error conectando con Apps Script:', error);
    }

    const response = await fetch('./workshops/ciencias7.json');
    const workshop = await response.json();

    renderWorkshop(workshop);

    restoreAnswers();
    setupAutosave();
    setupProgressTracking();

    document.getElementById('student-form').style.display = 'none';

  } catch (error) {

    console.error(error);
    alert('Ocurrió un error cargando el workshop');

  }
});