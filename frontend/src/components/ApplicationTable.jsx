import ApplicationRow from './ApplicationRow';

export default function ApplicationTable({ applications, onEdit, onDelete }) {
  if (applications.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-state__title">Nothing logged here yet.</p>
        <p className="empty-state__body">
          Add an application to start tracking it through the pipeline.
        </p>
      </div>
    );
  }

  return (
    <table className="ledger">
      <thead>
        <tr>
          <th>Company / Role</th>
          <th>Applied</th>
          <th>Status</th>
          <th>Notes</th>
          <th aria-label="Actions" />
        </tr>
      </thead>
      <tbody>
        {applications.map((app) => (
          <ApplicationRow
            key={app.id}
            application={app}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
}
