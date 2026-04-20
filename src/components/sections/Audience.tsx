import { GraduationCap, Users, Building2 } from "lucide-react";

const audiences = [
  {
    icon: GraduationCap,
    tag: "Students",
    title: "Show your process, not just the result.",
    body: "Upload your work, attach AI conversations, annotate where help was used, and reflect on your choices.",
    points: ["Upload assignments", "Attach AI transcripts", "Annotate AI-assisted passages", "Add a short reflection"],
    accent: "emerald",
  },
  {
    icon: Users,
    tag: "Educators",
    title: "Review with context, not suspicion.",
    body: "See submissions alongside the AI context the student provided — and grade with confidence.",
    points: ["See submission + AI context", "Read student annotations", "Compare original vs. assisted", "Leave structured feedback"],
    accent: "amber",
  },
  {
    icon: Building2,
    tag: "Institutions",
    title: "Turn policy into practice.",
    body: "A consistent framework across courses and faculties — without depending on detection tools.",
    points: ["Programme-wide consistency", "Transparent reporting", "Reduced reliance on detectors", "A foundation for trust"],
    accent: "sky",
  },
] as const;

const accentMap = {
  emerald: { chip: "bg-emerald-soft text-emerald-deep", icon: "bg-emerald-brand text-white", dot: "bg-[hsl(var(--emerald))]", glow: "from-emerald-soft/60" },
  amber: { chip: "bg-amber-soft text-amber-ink", icon: "bg-[hsl(var(--amber-ink))] text-white", dot: "bg-[hsl(var(--amber-ink))]", glow: "from-amber-soft/60" },
  sky: { chip: "bg-sky-soft text-sky-ink", icon: "bg-[hsl(var(--sky-ink))] text-white", dot: "bg-[hsl(var(--sky-ink))]", glow: "from-sky-soft/60" },
} as const;

export const Audience = () => (
  <section id="audience" className="py-24 md:py-32 bg-paper-warm border-y border-border relative overflow-hidden">
    <div className="absolute inset-0 -z-0 bg-warm-mesh opacity-50" />
    <div className="container-page relative">
      <div className="max-w-2xl">
        <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-emerald-brand/30 bg-emerald-soft px-3 py-1 text-emerald-deep">
          <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--emerald))]" />
          Who it's for
        </span>
        <h2 className="display mt-4 text-4xl md:text-5xl leading-[1.05] text-ink">
          Designed for institutions that want a <em className="italic text-emerald-deep">clearer</em> way forward.
        </h2>
      </div>

      <div className="mt-14 grid md:grid-cols-3 gap-6">
        {audiences.map((a) => {
          const c = accentMap[a.accent];
          return (
            <article
              key={a.tag}
              className="group relative rounded-2xl border border-border bg-card p-8 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-500 overflow-hidden"
            >
              <div className={`absolute -top-12 -right-12 h-40 w-40 rounded-full bg-gradient-to-br ${c.glow} to-transparent blur-2xl opacity-80`} />
              <div className="relative">
                <div className="flex items-center justify-between mb-8">
                  <div className={`h-11 w-11 rounded-xl ${c.icon} flex items-center justify-center shadow-soft`}>
                    <a.icon className="h-5 w-5" />
                  </div>
                  <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-full ${c.chip}`}>
                    {a.tag}
                  </span>
                </div>
                <h3 className="display text-2xl text-ink leading-tight">{a.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{a.body}</p>
                <ul className="mt-6 space-y-2">
                  {a.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm">
                      <span className={`mt-1.5 h-1.5 w-1.5 rounded-full ${c.dot} shrink-0`} />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);
