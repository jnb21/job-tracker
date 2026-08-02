// Single point of contact with the backend. No component talks to fetch()
// directly — everything goes through the functions exported here.

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const TOKEN_KEY = 'job_tracker_token';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function request(path, options = {}) {
  const token = getToken();
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const message = typeof body.detail === 'string' ? body.detail : `${res.status} ${res.statusText}`;
    const err = new Error(message);
    err.status = res.status;
    throw err;
  }
  if (res.status === 204) return null;
  return res.json();
}

// --- Auth ---

export function registerUser(email, password) {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function login(email, password) {
  const { access_token } = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  setToken(access_token);
  return access_token;
}

export function fetchMe() {
  return request('/auth/me');
}

// --- Applications ---

export function fetchApplications() {
  return request('/applications/');
}

export function createApplication(payload) {
  return request('/applications/', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateApplication(id, payload) {
  return request(`/applications/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function deleteApplication(id) {
  return request(`/applications/${id}`, { method: 'DELETE' });
}
