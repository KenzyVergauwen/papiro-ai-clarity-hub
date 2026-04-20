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
  <section id="principles" className="py-24 md:py-32 bg-foreground text-background relative overflow-hidden">
    <div className="absolute inset-0 -z-0 opacity-30" style={{ background: "radial-gradient(60% 50% at 80% 20%, hsl(var(--emerald) / 0.35) 0%, transparent 60%), radial-gradient(50% 40% at 10% 80%, hsl(var(--peach-ink) / 0.2) 0%, transparent 60%)" }} />
    <div className="container-page relative">
      <div className="max-w-3xl">
        <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-background/20 bg-background/5 px-3 py-1 text-background/80">
          <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--emerald))]" />
          Principles
        </span>
        <h2 className="display mt-4 text-4xl md:text-5xl leading-[1.05]">
          Papiro gives <em className="italic text-[hsl(var(--emerald-soft))]">context</em>, not a verdict.
        </h2>
        <p className="mt-5 text-background/70 leading-relaxed">
          We don't tell you whether something is fraud, fully AI, or "safe". We help you see the work behind the work — so the conversation between teacher and student can be honest and grounded.
        </p>
      </div>

      <div className="mt-14 grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-background/15 p-8 bg-background/[0.02]">
          <div className="flex items-center gap-2 mb-6">
            <span className="h-7 w-7 rounded-lg bg-[hsl(var(--peach-ink))]/20 text-[hsl(var(--peach))] grid place-items-center">
              <X className="h-4 w-4" />
            </span>
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
        <div className="rounded-2xl border border-[hsl(var(--emerald))]/40 bg-[hsl(var(--emerald))]/10 p-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="h-7 w-7 rounded-lg bg-[hsl(var(--emerald))] text-white grid place-items-center">
              <Check className="h-4 w-4" />
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-[hsl(var(--emerald-soft))]">What it is</span>
          </div>
          <ul className="space-y-3">
            {isYes.map((i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-[hsl(var(--emerald))] shrink-0" />
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);
