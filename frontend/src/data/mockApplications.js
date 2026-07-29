// Mock data shaped exactly like the `applications` table / Application schema
// from the FastAPI backend, so swapping mockApi.js -> real fetch calls
// later requires no changes to any component.

export const STATUSES = [
  { value: 'applied', label: 'Applied' },
  { value: 'online_assessment', label: 'Online Assessment' },
  { value: 'interview', label: 'Interview' },
  { value: 'offer', label: 'Offer' },
  { value: 'rejected', label: 'Rejected' },
];

let seed = [
  {
    id: 1,
    company: 'Northwind Systems',
    role: 'Backend Engineer Intern',
    status: 'interview',
    applied_date: '2026-06-02',
    notes: 'Recruiter call went well, technical round scheduled.',
    created_at: '2026-06-02T14:20:00Z',
    updated_at: '2026-07-10T09:00:00Z',
  },
  {
    id: 2,
    company: 'Alderpoint Analytics',
    role: 'Software Engineer Intern',
    status: 'applied',
    applied_date: '2026-07-01',
    notes: '',
    created_at: '2026-07-01T10:00:00Z',
    updated_at: '2026-07-01T10:00:00Z',
  },
  {
    id: 3,
    company: 'Rivergate Health',
    role: 'Full Stack Intern',
    status: 'online_assessment',
    applied_date: '2026-06-20',
    notes: 'HackerRank due in 5 days.',
    created_at: '2026-06-20T08:30:00Z',
    updated_at: '2026-06-24T12:00:00Z',
  },
  {
    id: 4,
    company: 'Fenwick & Doyle',
    role: 'Platform Engineering Intern',
    status: 'rejected',
    applied_date: '2026-05-15',
    notes: 'Rejected after final round, asked for feedback.',
    created_at: '2026-05-15T09:00:00Z',
    updated_at: '2026-06-05T16:00:00Z',
  },
  {
    id: 5,
    company: 'Blackwell Robotics',
    role: 'SWE Intern',
    status: 'offer',
    applied_date: '2026-05-20',
    notes: 'Offer received, deadline to respond July 30.',
    created_at: '2026-05-20T09:00:00Z',
    updated_at: '2026-07-15T09:00:00Z',
  },
];

let nextId = seed.length + 1;

export function _getAll() {
  return structuredClone(seed);
}
export function _create(payload) {
  const row = {
    id: nextId++,
    notes: '',
    ...payload,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  seed = [row, ...seed];
  return structuredClone(row);
}
export function _update(id, payload) {
  seed = seed.map((r) =>
    r.id === id ? { ...r, ...payload, updated_at: new Date().toISOString() } : r
  );
  return structuredClone(seed.find((r) => r.id === id));
}
export function _remove(id) {
  seed = seed.filter((r) => r.id !== id);
}
