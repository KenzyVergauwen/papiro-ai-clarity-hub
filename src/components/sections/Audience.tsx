import { GraduationCap, Users, Building2 } from "lucide-react";

const audiences = [
  {
    icon: GraduationCap,
    tag: "Students",
    title: "Show your process, not just the result.",
    body: "Upload your work, attach AI conversations, annotate where help was used, and reflect on your choices.",
    points: ["Upload assignments", "Attach AI transcripts", "Annotate AI-assisted passages", "Add a short reflection"],
  },
  {
    icon: Users,
    tag: "Educators",
    title: "Review with context, not suspicion.",
    body: "See submissions alongside the AI context the student provided — and grade with confidence.",
    points: ["See submission + AI context", "Read student annotations", "Compare original vs. assisted", "Leave structured feedback"],
  },
  {
    icon: Building2,
    tag: "Institutions",
    title: "Turn policy into practice.",
    body: "A consistent framework across courses and faculties — without depending on detection tools.",
    points: ["Programme-wide consistency", "Transparent reporting", "Reduced reliance on detectors", "A foundation for trust"],
  },
];

export const Audience = () => (
  <section id="audience" className="py-24 md:py-32 bg-paper-warm border-y border-border">
    <div className="container-page">
      <div className="max-w-2xl">
        <span className="eyebrow">Who it's for</span>
        <h2 className="display mt-4 text-4xl md:text-5xl leading-[1.05] text-ink">
          Designed for academic institutions that want a clearer way forward.
        </h2>
      </div>

      <div className="mt-14 grid md:grid-cols-3 gap-6">
        {audiences.map((a) => (
          <article
            key={a.tag}
            className="group relative rounded-xl border border-border bg-card p-8 shadow-soft hover:shadow-card transition-all duration-500"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="h-11 w-11 rounded-md bg-foreground text-background flex items-center justify-center">
                <a.icon className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                {a.tag}
              </span>
            </div>
            <h3 className="display text-2xl text-ink leading-tight">{a.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{a.body}</p>
            <ul className="mt-6 space-y-2">
              {a.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm">
                  <span className="mt-2 h-1 w-1 rounded-full bg-foreground shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  </section>
);
