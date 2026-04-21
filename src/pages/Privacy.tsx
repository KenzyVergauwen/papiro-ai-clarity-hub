import { PageShell, Prose } from "@/components/PageShell";

const Privacy = () => (
  <PageShell
    eyebrow="Legal"
    title="Privacy Policy"
    lead="How we handle the data you and your institution share with Papiro. Last updated: April 2026."
  >
    <Prose>
      <h2>1. Who we are</h2>
      <p>
        Papiro B.V. ("Papiro", "we", "us") is a Dutch company providing software
        for schools and universities. We act as a data processor on behalf of
        the institutions that license our product.
      </p>

      <h2>2. What we collect</h2>
      <ul>
        <li><strong>Account data:</strong> name, email, role, institution.</li>
        <li><strong>Workspace content:</strong> documents, annotations, AI chat attachments and reflections you create in Papiro.</li>
        <li><strong>Usage data:</strong> basic analytics about how the product is used, in aggregated form.</li>
      </ul>

      <h2>3. What we don't do</h2>
      <p>
        We do not sell personal data. We do not run "AI detection" scoring on
        student work. We do not use student content to train third-party AI
        models.
      </p>

      <h2>4. Legal basis</h2>
      <p>
        We process personal data under the GDPR on the basis of the contract
        with the institution and, where relevant, legitimate interest in keeping
        the service secure and reliable.
      </p>

      <h2>5. Data sharing</h2>
      <p>
        We use a small number of carefully selected sub-processors for hosting,
        authentication and email delivery. A full list is available on request
        for institutional customers.
      </p>

      <h2>6. Retention</h2>
      <p>
        Workspace data is retained for as long as the institution's contract is
        active, plus a short grace period for export. After that, data is
        deleted from production systems.
      </p>

      <h2>7. Your rights</h2>
      <p>
        You can request access, correction or deletion of your personal data at
        any time by contacting your institution's administrator, or by writing
        to <a href="mailto:privacy@papiro.education">privacy@papiro.education</a>.
      </p>

      <h2>8. Contact</h2>
      <p>
        Questions about this policy? Reach our Data Protection Officer at{" "}
        <a href="mailto:privacy@papiro.education">privacy@papiro.education</a>.
      </p>
    </Prose>
  </PageShell>
);

export default Privacy;
