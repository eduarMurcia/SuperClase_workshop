const STORAGE_KEY = 'superclase_answers';

export function setupAutosave() {
  document.addEventListener('input', saveAnswers);
  document.addEventListener('change', saveAnswers);
}

export function restoreAnswers() {
  const savedAnswers = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (!savedAnswers) {
    return;
  }

  Object.entries(savedAnswers).forEach(([questionId, value]) => {
    const textarea = document.querySelector(`textarea[data-question="${questionId}"]`);

    if (textarea) {
      textarea.value = value;
    }

    const radio = document.querySelector(`input[type="radio"][name="${questionId}"][value="${value}"]`);

    if (radio) {
      radio.checked = true;
    }
  });

  const saveStatus = document.getElementById('save-status');
  saveStatus.textContent = 'Respuestas restauradas';
}

function saveAnswers() {
  const answers = {};

  document.querySelectorAll('textarea[data-question]').forEach((textarea) => {
    answers[textarea.dataset.question] = textarea.value;
  });

  const radioGroups = {};

  document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    if (!radioGroups[radio.name]) {
      radioGroups[radio.name] = radio;
    }

    if (radio.checked) {
      answers[radio.name] = radio.value;
    }
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));

  const saveStatus = document.getElementById('save-status');
  saveStatus.textContent = 'Guardado automáticamente';
}
