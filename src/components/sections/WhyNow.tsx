import { AlertTriangle, EyeOff, Scale } from "lucide-react";

const items = [
  {
    icon: AlertTriangle,
    title: "AI use is outpacing institutional guidance",
    body: "Adoption is happening in every classroom. Policy frameworks struggle to keep pace with day-to-day reality.",
    tone: "amber",
  },
  {
    icon: EyeOff,
    title: "Programmes respond inconsistently",
    body: "What's allowed in one course is forbidden in the next. Students and teachers are left guessing.",
    tone: "peach",
  },
  {
    icon: Scale,
    title: "Detectors create false certainty",
    body: "Probabilistic flags don't make fair conversations. Institutions need context, not verdicts.",
    tone: "sky",
  },
] as const;

const tones = {
  amber: "bg-amber-soft text-amber-ink",
  peach: "bg-peach text-peach-ink",
  sky: "bg-sky-soft text-sky-ink",
} as const;

export const WhyNow = () => (
  <section id="product" className="py-24 md:py-32">
    <div className="container-page">
      <div className="grid md:grid-cols-12 gap-10 md:gap-16">
        <div className="md:col-span-5">
          <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-emerald-brand/30 bg-emerald-soft px-3 py-1 text-emerald-deep">
            <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--emerald))]" />
            Why now
          </span>
          <h2 className="display mt-4 text-4xl md:text-5xl leading-[1.05] text-ink">
            AI is already in every classroom. The real question is how institutions <em className="italic text-emerald-deep">respond</em>.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            The choice isn't ban or allow. It's whether you can <em className="italic">see</em> what's happening, talk about it honestly, and review it fairly.
          </p>
        </div>
        <div className="md:col-span-7 space-y-3">
          {items.map((it) => (
            <div key={it.title} className="rounded-xl border border-border bg-card p-6 flex gap-5 hover:shadow-soft transition-shadow">
              <div className={`shrink-0 h-11 w-11 rounded-xl ${tones[it.tone]} flex items-center justify-center`}>
                <it.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{it.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{it.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
