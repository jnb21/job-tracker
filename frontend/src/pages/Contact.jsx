import LegalLayout from './LegalLayout';

export default function Contact() {
  return (
    <LegalLayout eyebrow="Support" title="Contact" lastUpdated="September 21, 2026">
      <section>
        <h2>Get in touch</h2>
        <p>
          Application Ledger is an independently-run, personal project.
          For questions, bug reports, feature requests, or data requests
          (such as account deletion), reach out here:
        </p>
        <ul>
          <li>
            <strong>Email:</strong> <strong>[PLACEHOLDER: contact email]</strong>
          </li>
          <li>
            <strong>Bug reports / feature requests:{' '}</strong>
            <a
              href="https://github.com/jnb21/job-tracker/issues"
              target="_blank"
              rel="noreferrer noopener"
            >
              open an issue on GitHub
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h2>Response times</h2>
        <p>
          This is a personal project maintained outside of a formal support
          team, so responses may take a few days.
        </p>
      </section>
    </LegalLayout>
  );
}
