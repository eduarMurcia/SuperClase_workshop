export function setupAutosave() {
  document.addEventListener('input', () => {
    const answers = {};

    document.querySelectorAll('textarea').forEach(textarea => {
      answers[textarea.dataset.question] = textarea.value;
    });

    localStorage.setItem('superclase_answers', JSON.stringify(answers));

    const saveStatus = document.getElementById('save-status');
    saveStatus.textContent = 'Guardado automáticamente';
  });
}
