// Single point of contact with the backend.
//
// Right now the FastAPI backend only exposes /health, so USE_MOCK is on and
// every function reads/writes the in-memory mock store instead. Once the
// real /applications routes exist on the backend, set USE_MOCK to false (or
// delete the mock branch) — no component code needs to change, since every
// component only calls the functions exported from this file.

import { _getAll, _create, _update, _remove } from '../data/mockApplications';

const USE_MOCK = true;
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`${res.status} ${res.statusText}: ${body}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

function delay(ms = 250) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchApplications() {
  if (USE_MOCK) {
    await delay();
    return _getAll();
  }
  return request('/applications');
}

export async function createApplication(payload) {
  if (USE_MOCK) {
    await delay();
    return _create(payload);
  }
  return request('/applications', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateApplication(id, payload) {
  if (USE_MOCK) {
    await delay();
    return _update(id, payload);
  }
  return request(`/applications/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function deleteApplication(id) {
  if (USE_MOCK) {
    await delay();
    return _remove(id);
  }
  return request(`/applications/${id}`, { method: 'DELETE' });
}
