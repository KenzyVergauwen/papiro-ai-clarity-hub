import { PageShell, Prose } from "@/components/PageShell";

const Terms = () => (
  <PageShell
    eyebrow="Legal"
    title="Terms of Service"
    lead="The rules of the road for using Papiro. Last updated: April 2026."
  >
    <Prose>
      <h2>1. Acceptance</h2>
      <p>
        By accessing or using Papiro, you agree to these Terms. If you are using
        Papiro on behalf of an institution, you represent that you are
        authorised to do so.
      </p>

      <h2>2. The service</h2>
      <p>
        Papiro provides a workspace for documenting how AI is used in academic
        work. Features may evolve over time; we'll communicate material changes
        in advance where reasonable.
      </p>

      <h2>3. Acceptable use</h2>
      <ul>
        <li>Don't use Papiro to harass, deceive or harm others.</li>
        <li>Don't attempt to break, probe or reverse-engineer the service.</li>
        <li>Don't upload content you don't have the right to share.</li>
      </ul>

      <h2>4. Your content</h2>
      <p>
        You retain ownership of the content you create in Papiro. You grant us a
        limited licence to host and display that content solely to operate the
        service for you and your institution.
      </p>

      <h2>5. Accounts</h2>
      <p>
        You're responsible for keeping your credentials secure and for activity
        that happens under your account. Notify us immediately if you suspect
        unauthorised access.
      </p>

      <h2>6. Availability</h2>
      <p>
        We aim for high availability but do not guarantee uninterrupted service.
        We may perform maintenance and will try to do so outside teaching hours
        where possible.
      </p>

      <h2>7. Termination</h2>
      <p>
        Institutions may terminate their contract per the licence agreement.
        Individual users may stop using Papiro at any time. We may suspend
        accounts that violate these Terms.
      </p>

      <h2>8. Liability</h2>
      <p>
        To the maximum extent permitted by Dutch law, Papiro is provided "as
        is". Our liability is limited as set out in the institutional licence
        agreement.
      </p>

      <h2>9. Governing law</h2>
      <p>
        These Terms are governed by the laws of the Netherlands. Disputes will
        be brought before the competent courts of Amsterdam.
      </p>

      <h2>10. Contact</h2>
      <p>
        Questions? Write to{" "}
        <a href="mailto:legal@papiro.education">legal@papiro.education</a>.
      </p>
    </Prose>
  </PageShell>
);

export default Terms;
