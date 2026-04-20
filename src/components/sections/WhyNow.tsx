import { AlertTriangle, EyeOff, Scale } from "lucide-react";

const items = [
  {
    icon: AlertTriangle,
    title: "AI use is outpacing institutional guidance",
    body: "Adoption is happening in every classroom. Policy frameworks struggle to keep pace with day-to-day reality.",
  },
  {
    icon: EyeOff,
    title: "Programmes respond inconsistently",
    body: "What's allowed in one course is forbidden in the next. Students and teachers are left guessing.",
  },
  {
    icon: Scale,
    title: "Detectors create false certainty",
    body: "Probabilistic flags don't make fair conversations. Institutions need context, not verdicts.",
  },
];

export const WhyNow = () => (
  <section id="product" className="py-24 md:py-32">
    <div className="container-page">
      <div className="grid md:grid-cols-12 gap-10 md:gap-16">
        <div className="md:col-span-5">
          <span className="eyebrow">Why now</span>
          <h2 className="display mt-4 text-4xl md:text-5xl leading-[1.05] text-ink">
            AI is already in every classroom. The real question is how institutions respond.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            The choice isn't ban or allow. It's whether you can <em className="italic">see</em> what's happening, talk about it honestly, and review it fairly.
          </p>
        </div>
        <div className="md:col-span-7 space-y-px bg-border rounded-lg overflow-hidden border border-border">
          {items.map((it) => (
            <div key={it.title} className="bg-card p-7 flex gap-5">
              <div className="shrink-0 h-10 w-10 rounded-md bg-foreground text-background flex items-center justify-center">
                <it.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">{it.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
