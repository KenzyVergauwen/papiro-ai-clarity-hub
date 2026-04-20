import { FileText, MessageSquare, Highlighter, Sparkles, Send, Eye, ListChecks, ScrollText } from "lucide-react";

const studentSteps = [
  { icon: FileText, label: "Assignment", desc: "Load task and key details", color: "emerald" },
  { icon: MessageSquare, label: "Sources", desc: "Attach AI conversations", color: "sky" },
  { icon: Highlighter, label: "Annotate", desc: "Mark where AI was used", color: "amber" },
  { icon: Sparkles, label: "Reflect", desc: "Explain your choices", color: "peach" },
  { icon: Send, label: "Review & submit", desc: "Send a review-ready record", color: "emerald" },
] as const;

const reviewerSteps = [
  { icon: ScrollText, label: "Open submission", desc: "Work, prompts and reflection together" },
  { icon: Eye, label: "See AI context", desc: "Tools, prompts and annotated regions" },
  { icon: MessageSquare, label: "Read annotations", desc: "Why AI was used at each spot" },
  { icon: ListChecks, label: "Evaluate with nuance", desc: "Grade with structure, not suspicion" },
];

const colorMap = {
  emerald: "bg-emerald-soft text-emerald-deep",
  sky: "bg-sky-soft text-sky-ink",
  amber: "bg-amber-soft text-amber-ink",
  peach: "bg-peach text-peach-ink",
} as const;

export const HowItWorks = () => (
  <section id="how" className="py-24 md:py-32 relative overflow-hidden">
    <div className="absolute inset-0 -z-10 bg-warm-mesh opacity-60" />
    <div className="container-page">
      <div className="max-w-3xl">
        <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-emerald-brand/30 bg-emerald-soft px-3 py-1 text-emerald-deep">
          <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--emerald))]" />
          How it works
        </span>
        <h2 className="display mt-4 text-4xl md:text-5xl leading-[1.05] text-ink">
          A simple flow on both sides — <em className="italic text-emerald-deep">student</em> and <em className="italic text-emerald-deep">reviewer</em>.
        </h2>
        <p className="mt-5 text-muted-foreground leading-relaxed max-w-2xl">
          Papiro doesn't try to <em>catch</em> AI use. It makes the work process visible so that grading can be more accurate, more fair, and more honest.
        </p>
      </div>

      {/* STUDENT FLOW — horizontal stepper */}
      <div className="mt-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="h-7 w-7 rounded-full bg-emerald-brand text-white grid place-items-center text-xs font-mono">S</span>
          <h3 className="display text-2xl">The student side</h3>
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">From draft to submission</span>
        </div>

        <div className="relative">
          <div className="absolute left-0 right-0 top-7 h-px bg-gradient-to-r from-transparent via-border to-transparent hidden md:block" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {studentSteps.map((s, i) => (
              <div key={s.label} className="relative">
                <div className={`mx-auto h-14 w-14 rounded-2xl grid place-items-center ${colorMap[s.color]} shadow-soft relative z-10`}>
                  <s.icon className="h-6 w-6" />
                </div>
                <div className="mt-3 text-center">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Step 0{i + 1}</div>
                  <div className="text-sm font-semibold mt-0.5">{s.label}</div>
                  <div className="text-xs text-muted-foreground mt-1 leading-snug">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* REVIEWER FLOW — annotation inspector card */}
      <div className="mt-20 grid lg:grid-cols-[1fr_1.1fr] gap-8 items-stretch">
        <div className="rounded-2xl bg-foreground text-background p-8 md:p-10 relative overflow-hidden">
          <div className="absolute inset-0 dot-grid opacity-20" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-7 w-7 rounded-full bg-emerald-brand text-white grid place-items-center text-xs font-mono">R</span>
              <h3 className="display text-2xl">The reviewer side</h3>
            </div>
            <ol className="space-y-4">
              {reviewerSteps.map((s, i) => (
                <li key={s.label} className="flex items-start gap-4">
                  <span className="shrink-0 h-9 w-9 rounded-lg bg-background/10 border border-background/15 grid place-items-center">
                    <s.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-background/50">Step 0{i + 1}</div>
                    <div className="text-base font-medium">{s.label}</div>
                    <div className="text-sm text-background/65 mt-0.5">{s.desc}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Annotation inspector mock */}
        <AnnotationMock />
      </div>
    </div>
  </section>
);

const AnnotationMock = () => (
  <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
    <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-paper-warm/40">
      <div className="text-xs font-semibold">Annotation inspector</div>
      <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Page 1</span>
    </div>
    <div className="grid grid-cols-[1fr_1fr] divide-x divide-border">
      {/* AI chat */}
      <div className="p-4 space-y-3 bg-paper-warm/20">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-soft text-amber-ink text-[10px] font-mono uppercase tracking-wider px-2 py-0.5">
          Chat 1 · Prompt 1
        </div>
        <p className="text-xs leading-relaxed text-foreground/85">
          "Schrijf een krantenartikel over de achteruitgang van de Argentijnse economie…"
        </p>
        <div className="rounded-lg bg-emerald-soft/60 border border-emerald-brand/20 p-3">
          <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-deep mb-1">Response 1</div>
          <p className="text-[11px] leading-relaxed text-emerald-deep/90">
            Ik ga eerst de recente context rond Argentinië en Milei kort verifiëren…
          </p>
        </div>
      </div>

      {/* Inspector form */}
      <div className="p-4 space-y-3">
        <div className="rounded-lg bg-amber-soft/70 text-amber-ink text-[11px] px-3 py-2">
          Annotation anchored to PDF page 1.
        </div>
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">Reference prompt</div>
          <div className="h-8 rounded-md border border-border flex items-center px-2.5 text-[11px] text-foreground/80 justify-between">
            Outline · Counter-examples <span className="text-muted-foreground">▾</span>
          </div>
        </div>
        <div>
          <div className="text-[10px] font-medium text-foreground mb-1">Why did you use AI here?</div>
          <div className="rounded-md border border-border bg-paper-warm/30 p-2.5 text-[11px] text-muted-foreground italic leading-snug">
            I used AI to test the structure of my argument and check if this section was complete.
          </div>
        </div>
        <div className="flex items-center justify-between pt-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-deep">Context · not verdict</span>
          <button className="text-[11px] rounded-md bg-emerald-brand text-white px-2.5 py-1">Save note</button>
        </div>
      </div>
    </div>
  </div>
);
