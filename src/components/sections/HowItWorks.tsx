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

        {/* Teacher submissions overview mock */}
        <TeacherOverviewMock />
      </div>
    </div>
  </section>
);

type Row = {
  name: string;
  code: string;
  state: "submitted" | "reviewed" | "draft";
  date: string;
  flags: { label: string; tone: "amber" | "emerald" }[];
};

const rows: Row[] = [
  { name: "Avery Lane", code: "CPW-001", state: "submitted", date: "27-03-2026", flags: [{ label: "Random sample", tone: "emerald" }] },
  { name: "Samira Haddad", code: "CPW-003", state: "submitted", date: "27-03-2026", flags: [{ label: "Brief reflection", tone: "amber" }, { label: "Random sample", tone: "emerald" }] },
  { name: "Jules Mercier", code: "CPW-005", state: "reviewed", date: "25-03-2026", flags: [{ label: "Random sample", tone: "emerald" }] },
];

const stateStyles = {
  submitted: "text-emerald-deep",
  reviewed: "text-sky-ink",
  draft: "text-amber-ink",
} as const;

const TeacherOverviewMock = () => (
  <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
    {/* App top bar */}
    <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-paper-warm/40">
      <div className="flex items-center gap-2">
        <div className="inline-flex items-center gap-1.5 text-foreground">
          <svg viewBox="0 0 52 52" aria-hidden="true" className="h-3.5 w-3.5">
            <rect x="4" y="7" width="38" height="8" rx="4" fill="currentColor" />
            <rect x="4" y="22" width="38" height="8" rx="4" fill="currentColor" />
            <rect x="4" y="37" width="20" height="8" rx="4" fill="currentColor" />
          </svg>
          <span className="text-[10px] font-medium uppercase tracking-[0.22em]">Papiro</span>
        </div>
        <span className="text-[10px] font-medium rounded-full bg-emerald-brand text-white px-2.5 py-1 ml-2">Submissions</span>
        <span className="text-[10px] font-medium rounded-full text-foreground/70 px-2.5 py-1 hidden sm:inline">Assignments</span>
      </div>
      <div className="text-right">
        <div className="text-[10px] font-semibold leading-tight">Dr. Mira Solberg</div>
        <div className="text-[9px] text-muted-foreground leading-tight">teacher@papiro.test</div>
      </div>
    </div>

    {/* Header */}
    <div className="px-5 pt-5 pb-3 flex items-start justify-between gap-3">
      <div>
        <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">POL-204-A1</div>
        <div className="text-base font-semibold mt-0.5">Student overview</div>
        <div className="text-[11px] text-muted-foreground">Random sample of 5 students prepared.</div>
      </div>
      <div className="hidden sm:flex items-center gap-2 shrink-0">
        <div className="text-[10px] rounded-full border border-sky-ink/30 text-sky-ink px-2.5 py-1 font-medium">⤫ Draw sample</div>
      </div>
    </div>

    {/* Stat chips */}
    <div className="px-5 flex flex-wrap gap-1.5">
      {[
        ["Expected", "10"],
        ["Submitted", "8"],
        ["Drafts", "3"],
        ["Missing", "2"],
        ["Flagged", "4"],
      ].map(([k, v]) => (
        <span key={k} className="text-[10px] rounded-full border border-border px-2 py-0.5 text-muted-foreground">
          {k}: <span className="font-semibold text-foreground">{v}</span>
        </span>
      ))}
    </div>

    {/* Filter tabs */}
    <div className="px-5 mt-3 flex flex-wrap gap-1.5">
      {["All (11)", "Needs attention (4)", "Missing (2)", "Drafts (3)"].map((t) => (
        <span key={t} className="text-[10px] rounded-full border border-border px-2.5 py-1 text-foreground/70">{t}</span>
      ))}
      <span className="text-[10px] rounded-full bg-emerald-brand text-white px-2.5 py-1 font-medium">Sample (5)</span>
    </div>

    {/* Table */}
    <div className="mt-4 mx-3 mb-3 rounded-xl border border-border overflow-hidden">
      <div className="grid grid-cols-[1.2fr_0.9fr_1fr_1.1fr] px-3 py-2 bg-paper-warm/40 text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
        <div>Student</div>
        <div>State</div>
        <div>Latest</div>
        <div>Flags</div>
      </div>
      {rows.map((r, i) => (
        <div key={r.code} className={`grid grid-cols-[1.2fr_0.9fr_1fr_1.1fr] gap-2 px-3 py-3 items-center text-[11px] ${i > 0 ? "border-t border-border" : ""}`}>
          <div>
            <div className="font-semibold text-foreground leading-tight">{r.name}</div>
            <div className="text-[10px] text-muted-foreground font-mono">{r.code}</div>
          </div>
          <div className={`text-[9px] font-mono uppercase tracking-widest ${stateStyles[r.state]}`}>
            {r.state}
          </div>
          <div className="text-foreground/80 text-[10px]">{r.date}</div>
          <div className="flex flex-wrap gap-1">
            {r.flags.map((f) => (
              <span
                key={f.label}
                className={`text-[9px] rounded-full px-1.5 py-0.5 font-medium ${
                  f.tone === "amber" ? "bg-amber-soft text-amber-ink" : "bg-emerald-soft text-emerald-deep"
                }`}
              >
                {f.label}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);
