import { useEffect, useMemo, useState } from 'react';
import {
  fetchApplications,
  createApplication,
  updateApplication,
  deleteApplication,
} from './api/client';
import { STATUSES } from './data/mockApplications';
import StatsBar from './components/StatsBar';
import StatusFilter from './components/StatusFilter';
import ApplicationTable from './components/ApplicationTable';
import ApplicationForm from './components/ApplicationForm';
import './App.css';

export default function App() {
  const [applications, setApplications] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [errorMessage, setErrorMessage] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [editingApp, setEditingApp] = useState(null); // null | {} | application
  const [pendingDelete, setPendingDelete] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setStatus('loading');
    try {
      const data = await fetchApplications();
      setApplications(data);
      setStatus('ready');
    } catch (err) {
      setErrorMessage(err.message || 'Could not reach the server.');
      setStatus('error');
    }
  }

  const counts = useMemo(() => {
    const c = { all: applications.length };
    STATUSES.forEach((s) => {
      c[s.value] = applications.filter((a) => a.status === s.value).length;
    });
    return c;
  }, [applications]);

  const filtered = useMemo(() => {
    const rows =
      activeFilter === 'all'
        ? applications
        : applications.filter((a) => a.status === activeFilter);
    return [...rows].sort(
      (a, b) => new Date(b.applied_date) - new Date(a.applied_date)
    );
  }, [applications, activeFilter]);

  async function handleFormSubmit(values) {
    if (editingApp && editingApp.id) {
      const updated = await updateApplication(editingApp.id, values);
      setApplications((prev) =>
        prev.map((a) => (a.id === updated.id ? updated : a))
      );
    } else {
      const created = await createApplication(values);
      setApplications((prev) => [created, ...prev]);
    }
    setEditingApp(null);
  }

  async function confirmDelete() {
    await deleteApplication(pendingDelete.id);
    setApplications((prev) => prev.filter((a) => a.id !== pendingDelete.id));
    setPendingDelete(null);
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="page-header__eyebrow">Application Ledger</p>
          <h1 className="page-header__title">Where every application stands</h1>
        </div>
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => setEditingApp({})}
        >
          + Log application
        </button>
      </header>

      {status === 'loading' && <p className="state-note">Loading your ledger…</p>}

      {status === 'error' && (
        <div className="state-note state-note--error">
          <p>Couldn't load applications: {errorMessage}</p>
          <button type="button" className="btn btn--ghost" onClick={load}>
            Try again
          </button>
        </div>
      )}

      {status === 'ready' && (
        <>
          <StatsBar applications={applications} />
          <StatusFilter
            activeStatus={activeFilter}
            onChange={setActiveFilter}
            counts={counts}
          />
          <ApplicationTable
            applications={filtered}
            onEdit={setEditingApp}
            onDelete={setPendingDelete}
          />
        </>
      )}

      {editingApp !== null && (
        <ApplicationForm
          initial={editingApp.id ? editingApp : null}
          onSubmit={handleFormSubmit}
          onCancel={() => setEditingApp(null)}
        />
      )}

      {pendingDelete && (
        <div className="modal-backdrop" onMouseDown={() => setPendingDelete(null)}>
          <div
            className="modal-card modal-card--small"
            role="alertdialog"
            aria-modal="true"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <h2 className="modal-card__title">Remove this entry?</h2>
            <p className="modal-card__body">
              {pendingDelete.company} — {pendingDelete.role}. This can't be undone.
            </p>
            <div className="modal-card__actions">
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => setPendingDelete(null)}
              >
                Cancel
              </button>
              <button type="button" className="btn btn--danger" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
