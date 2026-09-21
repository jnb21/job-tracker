import LegalLayout from './LegalLayout';

export default function Terms() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Terms of Service"
      lastUpdated="September 21, 2026"
    >
      <section>
        <h2>Agreement</h2>
        <p>
          By creating an account or using the "Try the demo" option on
          Application Ledger, you agree to these Terms of Service. This is a
          personal, independently-run project provided on an as-is basis for
          tracking job and internship applications.
        </p>
      </section>

      <section>
        <h2>Your account</h2>
        <ul>
          <li>You are responsible for keeping your login credentials confidential.</li>
          <li>You must provide accurate information when registering.</li>
          <li>
            You are responsible for the application data you enter into
            your account.
          </li>
        </ul>
      </section>

      <section>
        <h2>Acceptable use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Attempt to gain unauthorized access to another user's account or data.</li>
          <li>Use the service to store or transmit unlawful, harmful, or abusive content.</li>
          <li>Attempt to disrupt, overload, or reverse-engineer the service beyond fair use.</li>
          <li>
            Enter sensitive personal or confidential information into the
            shared demo account, since demo data is visible to other demo
            users.
          </li>
        </ul>
      </section>

      <section>
        <h2>Availability</h2>
        <p>
          The app is hosted on a free hosting tier and may be slow to
          respond after periods of inactivity, may have downtime, and is
          not guaranteed to be available at all times. Demo account data may
          be reset without notice.
        </p>
      </section>

      <section>
        <h2>Termination</h2>
        <p>
          We may suspend or remove accounts that violate these terms, or
          disable the service entirely at our discretion, including without
          advance notice.
        </p>
      </section>

      <section>
        <h2>Disclaimer of warranty</h2>
        <p>
          The service is provided "as is" and "as available," without
          warranties of any kind, express or implied. We do not guarantee
          that the app will be error-free, secure, or uninterrupted.
        </p>
      </section>

      <section>
        <h2>Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, the operator of this app
          is not liable for any indirect, incidental, or consequential
          damages arising from your use of the service, including loss of
          data.
        </p>
      </section>

      <section>
        <h2>Changes to these terms</h2>
        <p>
          These terms may be updated as the app evolves. Continued use of
          the app after changes are posted constitutes acceptance of the
          revised terms.
        </p>
      </section>

      <section>
        <h2>Governing law</h2>
        <p>
          <strong>
            [PLACEHOLDER: governing jurisdiction, if you want one specified.]
          </strong>
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions about these terms can be sent to{' '}
          <strong>[PLACEHOLDER: contact email]</strong>, or via the{' '}
          <a href="/contact">Contact page</a>.
        </p>
      </section>
    </LegalLayout>
  );
}
