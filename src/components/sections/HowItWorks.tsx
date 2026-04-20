const studentSteps = [
  "Choose an assignment or project",
  "Upload your own work",
  "Attach AI conversations or output",
  "Annotate where AI was used",
  "Add a short reflection",
  "Submit",
];

const teacherSteps = [
  "Open the submission",
  "See where AI played a role",
  "Read context and annotations",
  "Evaluate with more nuance",
];

export const HowItWorks = () => (
  <section id="how" className="py-24 md:py-32">
    <div className="container-page">
      <div className="max-w-3xl">
        <span className="eyebrow">How it works</span>
        <h2 className="display mt-4 text-4xl md:text-5xl leading-[1.05] text-ink">
          A simple flow on both sides — student and reviewer.
        </h2>
        <p className="mt-5 text-muted-foreground leading-relaxed max-w-2xl">
          Papiro doesn't try to <em>catch</em> AI use. It makes the work process visible so that grading can be more accurate, more fair, and more honest.
        </p>
      </div>

      <div className="mt-16 grid md:grid-cols-2 gap-px bg-border rounded-xl overflow-hidden border border-border">
        <FlowColumn title="The student side" subtitle="From draft to submission" steps={studentSteps} />
        <FlowColumn title="The reviewer side" subtitle="From submission to evaluation" steps={teacherSteps} dark />
      </div>
    </div>
  </section>
);

const FlowColumn = ({
  title,
  subtitle,
  steps,
  dark = false,
}: {
  title: string;
  subtitle: string;
  steps: string[];
  dark?: boolean;
}) => (
  <div className={`p-8 md:p-10 ${dark ? "bg-foreground text-background" : "bg-card"}`}>
    <div className="flex items-baseline justify-between mb-8">
      <h3 className="display text-2xl">{title}</h3>
      <span className={`text-xs font-mono uppercase tracking-widest ${dark ? "text-background/60" : "text-muted-foreground"}`}>
        {subtitle}
      </span>
    </div>
    <ol className="space-y-1">
      {steps.map((s, i) => (
        <li
          key={s}
          className={`flex items-center gap-5 py-3.5 border-b last:border-b-0 ${
            dark ? "border-background/10" : "border-border"
          }`}
        >
          <span
            className={`shrink-0 font-mono text-xs w-6 ${
              dark ? "text-background/50" : "text-muted-foreground"
            }`}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="text-base">{s}</span>
        </li>
      ))}
    </ol>
  </div>
);
