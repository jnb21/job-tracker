import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="page">
      <div className="empty-state">
        <p className="empty-state__title">Page not found</p>
        <p className="empty-state__body">
          The page you're looking for doesn't exist.{' '}
          <Link to="/">Back to the ledger</Link>
        </p>
      </div>
    </div>
  );
}
