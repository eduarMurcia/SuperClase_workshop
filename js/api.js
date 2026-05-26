const API_URL = 'https://script.google.com/macros/s/AKfycbzSC1YETg4tFOUrjwv1G9v81y-YT6yNaIYroiZ5DdTiV8dM3KEC3mjC_UXP-JnNOP3msg/exec';

async function sendData(payload) {

  try {

    await fetch(API_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

  } catch (error) {

    console.error('Apps Script request error:', error);

  }
}

export async function startAttempt(session) {

  await sendData({
    action: 'startAttempt',
    attemptId: session.attemptId,
    studentName: session.studentName,
    studentGroup: session.studentGroup
  });

}

export async function saveAnswer(
  attemptId,
  questionId,
  answer
) {

  await sendData({
    action: 'saveAnswer',
    attemptId,
    questionId,
    answer
  });

}

export async function submitAttempt(attemptId) {

  await sendData({
    action: 'submitAttempt',
    attemptId
  });

}
