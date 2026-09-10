import StatusStamp from './StatusStamp';

export default function ApplicationRow({ application, onEdit, onDelete }) {
  return (
    <tr className="ledger-row">
      <td className="ledger-row__company">{application.company}</td>
      <td className="ledger-row__role">{application.role}</td>
      <td>{application.location || '—'}</td>
      <td>{application.platform || '—'}</td>
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
