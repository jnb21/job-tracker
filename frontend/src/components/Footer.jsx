import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__copyright">
          © {year} Application Ledger. All rights reserved.
        </p>

        <nav className="site-footer__links" aria-label="Legal and support">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/cookie-policy">Cookie Policy</Link>
          <Link to="/contact">Contact</Link>
          <a
            href="https://github.com/jnb21/job-tracker"
            target="_blank"
            rel="noreferrer noopener"
          >
            Source on GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
