import { PageShell, Prose } from "@/components/PageShell";

const About = () => (
  <PageShell
    eyebrow="About Papiro"
    title="A calmer conversation about AI in education."
    lead="We're building the tools schools and universities need to talk honestly about AI — without surveillance, without scores, and without shame."
  >
    <Prose>
      <h2>Why we exist</h2>
      <p>
        AI didn't arrive with a manual. Most institutions reacted with detection
        software and bans, but neither approach reflects how students actually
        learn — or how educators actually teach. Papiro started from a simple
        idea: <em>context, not verdict.</em>
      </p>
      <p>
        Instead of guessing whether a paper was "AI-written," we help students
        document how they used AI, and give educators the context they need to
        respond thoughtfully.
      </p>

      <h2>What we believe</h2>
      <ul>
        <li>AI literacy is a skill, not a threat.</li>
        <li>Trust is built through transparency, not detection.</li>
        <li>Tools should serve pedagogy, not replace it.</li>
        <li>Students deserve to be treated as authors, not suspects.</li>
      </ul>

      <h2>Who we are</h2>
      <p>
        Papiro is a small team of educators, researchers and designers based in
        the Netherlands. We work closely with pilot schools across Europe to
        shape a product that actually fits the rhythm of academic work.
      </p>

      <h2>Where we're going</h2>
      <p>
        We're rolling out pilots through 2026 with secondary schools and
        universities. If your institution is exploring how to handle AI with
        integrity, we'd love to hear from you.
      </p>
    </Prose>
  </PageShell>
);

export default About;
