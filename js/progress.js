export function setupProgressTracking() {
  const progressFill = document.getElementById('progress-fill');
  const progressText = document.getElementById('progress-text');

  function updateProgress() {
    const textareas = document.querySelectorAll('textarea[data-question]');
    const radios = document.querySelectorAll('input[type="radio"]');

    let totalQuestions = 0;
    let answeredQuestions = 0;

    textareas.forEach((textarea) => {
      totalQuestions++;

      if (textarea.value.trim() !== '') {
        answeredQuestions++;
      }
    });

    const radioGroups = {};

    radios.forEach((radio) => {
      if (!radioGroups[radio.name]) {
        radioGroups[radio.name] = [];
      }

      radioGroups[radio.name].push(radio);
    });

    Object.values(radioGroups).forEach((group) => {
      totalQuestions++;

      const checked = group.some(radio => radio.checked);

      if (checked) {
        answeredQuestions++;
      }
    });

    const progress = totalQuestions === 0
      ? 0
      : Math.round((answeredQuestions / totalQuestions) * 100);

    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${progress}% completado`;
  }

  document.addEventListener('input', updateProgress);
  document.addEventListener('change', updateProgress);

  updateProgress();
}
