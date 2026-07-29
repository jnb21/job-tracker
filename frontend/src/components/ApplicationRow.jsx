import StatusStamp from './StatusStamp';

function formatDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function ApplicationRow({ application, onEdit, onDelete }) {
  return (
    <tr className="ledger-row">
      <td className="ledger-row__primary">
        <span className="ledger-row__company">{application.company}</span>
        <span className="ledger-row__role">{application.role}</span>
      </td>
      <td className="ledger-row__date">{formatDate(application.applied_date)}</td>
      <td>
        <StatusStamp status={application.status} />
      </td>
      <td className="ledger-row__notes">{application.notes || '—'}</td>
      <td className="ledger-row__actions">
        <button type="button" className="link-btn" onClick={() => onEdit(application)}>
          Edit
        </button>
        <button
          type="button"
          className="link-btn link-btn--danger"
          onClick={() => onDelete(application)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
