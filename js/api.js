const API_URL = 'https://script.google.com/macros/s/AKfycbzSC1YETg4tFOUrjwv1G9v81y-YT6yNaIYroiZ5DdTiV8dM3KEC3mjC_UXP-JnNOP3msg/exec';

export async function startAttempt(session) {

  await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({
      action: 'startAttempt',
      attemptId: session.attemptId,
      studentName: session.studentName,
      studentGroup: session.studentGroup
    })
  });

}

export async function saveAnswer(
  attemptId,
  questionId,
  answer
) {

  await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({
      action: 'saveAnswer',
      attemptId,
      questionId,
      answer
    })
  });

}

export async function submitAttempt(attemptId) {

  await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({
      action: 'submitAttempt',
      attemptId
    })
  });

}
