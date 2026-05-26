import { renderWorkshop } from './renderer.js';
import { setupAutosave, restoreAnswers } from './storage.js';
import { setupProgressTracking } from './progress.js';

const startButton = document.getElementById('start-btn');

startButton.addEventListener('click', async () => {
  const studentName = document.getElementById('student-name').value.trim();
  const studentGroup = document.getElementById('student-group').value.trim();

  if (!studentName || !studentGroup) {
    alert('Completa nombre y grupo');
    return;
  }

  const response = await fetch('./workshops/ciencias7.json');
  const workshop = await response.json();

  renderWorkshop(workshop);

  restoreAnswers();
  setupAutosave();
  setupProgressTracking();

  document.getElementById('student-form').style.display = 'none';
});