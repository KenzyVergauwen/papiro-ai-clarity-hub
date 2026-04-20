import { Check, X } from "lucide-react";

const isNot = [
  "A pure AI detector",
  "A surveillance product",
  "An automatic grading system",
  "A replacement for the teacher",
];
const isYes = [
  "A provenance & documentation product",
  "A structured review workflow",
  "A way to make AI use discussable",
  "A tool for fairer interpretation",
];

export const Principles = () => (
  <section id="principles" className="py-24 md:py-32 bg-foreground text-background">
    <div className="container-page">
      <div className="max-w-3xl">
        <span className="eyebrow text-background/60">Principles</span>
        <h2 className="display mt-4 text-4xl md:text-5xl leading-[1.05]">
          Papiro gives <em className="italic">context</em>, not a verdict.
        </h2>
        <p className="mt-5 text-background/70 leading-relaxed">
          We don't tell you whether something is fraud, fully AI, or "safe". We help you see the work behind the work — so the conversation between teacher and student can be honest and grounded.
        </p>
      </div>

      <div className="mt-14 grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-background/15 p-8">
          <div className="flex items-center gap-2 mb-6">
            <X className="h-4 w-4" />
            <span className="text-xs font-mono uppercase tracking-widest text-background/60">What it is not</span>
          </div>
          <ul className="space-y-3">
            {isNot.map((i) => (
              <li key={i} className="flex items-start gap-3 text-background/80">
                <span className="mt-2.5 h-px w-4 bg-background/30 shrink-0" />
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-background/15 bg-background/[0.03] p-8">
          <div className="flex items-center gap-2 mb-6">
            <Check className="h-4 w-4" />
            <span className="text-xs font-mono uppercase tracking-widest text-background/60">What it is</span>
          </div>
          <ul className="space-y-3">
            {isYes.map((i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-2.5 h-px w-4 bg-background shrink-0" />
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);
