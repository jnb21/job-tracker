import LegalLayout from './LegalLayout';

export default function CookiePolicy() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Cookie Policy"
      lastUpdated="September 21, 2026"
    >
      <section>
        <h2>Short version</h2>
        <p>
          Application Ledger does not set its own tracking or advertising
          cookies. It uses your browser's local storage to keep you signed
          in, and it loads web fonts from a third-party CDN.
        </p>
      </section>

      <section>
        <h2>Local storage, not cookies</h2>
        <p>
          When you log in, the app stores a signed session token in your
          browser's <code>localStorage</code> under the key{' '}
          <code>job_tracker_token</code>. This token is sent with each
          request so the app knows who you are — it is essential for the
          app to function and is not used for tracking or advertising. It
          stays on your device until you log out or clear your browser
          storage.
        </p>
      </section>

      <section>
        <h2>Third-party resources</h2>
        <p>
          The app loads typefaces from Google Fonts. Fetching these fonts
          causes your browser to make a request to Google's servers, which
          may process your IP address as part of serving that request.
          Google Fonts does not set tracking cookies on our pages, but see
          Google's own privacy documentation for details on how they handle
          this data.
        </p>
      </section>

      <section>
        <h2>Analytics</h2>
        <p>
          The app does not currently use any analytics or advertising
          cookies/services.{' '}
          <strong>
            [PLACEHOLDER: update this page if analytics such as Google
            Analytics, Plausible, etc. are added in the future.]
          </strong>
        </p>
      </section>

      <section>
        <h2>Managing browser storage</h2>
        <p>
          You can clear your session at any time by logging out, or by
          clearing your browser's site data/local storage for this site
          manually through your browser settings.
        </p>
      </section>

      <section>
        <h2>Changes to this policy</h2>
        <p>
          This policy may be updated as the app evolves. Material changes
          will be reflected by updating the "Last updated" date above.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions about this policy can be sent to{' '}
          <strong>[PLACEHOLDER: contact email]</strong>, or via the{' '}
          <a href="/contact">Contact page</a>.
        </p>
      </section>
    </LegalLayout>
  );
}
