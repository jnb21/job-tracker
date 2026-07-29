import { useEffect, useRef, useState } from 'react';
import { STATUSES } from '../data/mockApplications';

const EMPTY = {
  company: '',
  role: '',
  status: 'applied',
  applied_date: new Date().toISOString().slice(0, 10),
  notes: '',
};

export default function ApplicationForm({ initial, onSubmit, onCancel }) {
  const [values, setValues] = useState(initial ?? EMPTY);
  const [error, setError] = useState('');
  const firstFieldRef = useRef(null);

  useEffect(() => {
    firstFieldRef.current?.focus();
  }, []);

  function handleChange(field) {
    return (e) => setValues((v) => ({ ...v, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!values.company.trim() || !values.role.trim()) {
      setError('Company and role are both required.');
      return;
    }
    setError('');
    onSubmit(values);
  }

  return (
    <div className="modal-backdrop" onMouseDown={onCancel}>
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-label={initial ? 'Edit application' : 'Log a new application'}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <h2 className="modal-card__title">
          {initial ? 'Edit entry' : 'Log a new application'}
        </h2>

        <form onSubmit={handleSubmit} className="form">
          <label className="field">
            <span className="field__label">Company</span>
            <input
              ref={firstFieldRef}
              type="text"
              value={values.company}
              onChange={handleChange('company')}
              placeholder="Northwind Systems"
              required
            />
          </label>

          <label className="field">
            <span className="field__label">Role</span>
            <input
              type="text"
              value={values.role}
              onChange={handleChange('role')}
              placeholder="Backend Engineer Intern"
              required
            />
          </label>

          <div className="field-row">
            <label className="field">
              <span className="field__label">Status</span>
              <select value={values.status} onChange={handleChange('status')}>
                {STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span className="field__label">Applied on</span>
              <input
                type="date"
                value={values.applied_date}
                onChange={handleChange('applied_date')}
              />
            </label>
          </div>

          <label className="field">
            <span className="field__label">Notes</span>
            <textarea
              rows={3}
              value={values.notes}
              onChange={handleChange('notes')}
              placeholder="Recruiter contact, next steps, anything to remember."
            />
          </label>

          {error && <p className="field-error">{error}</p>}

          <div className="modal-card__actions">
            <button type="button" className="btn btn--ghost" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary">
              {initial ? 'Save changes' : 'Add application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
