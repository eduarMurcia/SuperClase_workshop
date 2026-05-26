const SESSION_KEY = 'superclase_session';

export function createSession(studentName, studentGroup) {

  const existing = getSession();

  if (existing) {
    return existing;
  }

  const session = {
    attemptId: crypto.randomUUID(),
    studentName,
    studentGroup,
    createdAt: new Date().toISOString(),
    submitted: false
  };

  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify(session)
  );

  return session;
}

export function getSession() {

  const saved = localStorage.getItem(SESSION_KEY);

  if (!saved) {
    return null;
  }

  return JSON.parse(saved);
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}
