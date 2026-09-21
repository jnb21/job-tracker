import { Link } from 'react-router-dom';

export default function LegalLayout({ eyebrow, title, lastUpdated, children }) {
  return (
    <div className="page legal-page">
      <header className="page-header legal-page__header">
        <div>
          <p className="page-header__eyebrow">{eyebrow}</p>
          <h1 className="page-header__title">{title}</h1>
          <p className="legal-page__updated">Last updated: {lastUpdated}</p>
        </div>
      </header>

      <div className="legal-page__body">{children}</div>

      <Link to="/" className="link-btn legal-page__back">
        ← Back to the ledger
      </Link>
    </div>
  );
}
