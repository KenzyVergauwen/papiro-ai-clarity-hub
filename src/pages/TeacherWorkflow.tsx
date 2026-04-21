import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AppChrome } from "@/components/workflow/AppChrome";
import {
  Shuffle,
  Eye,
  MessageSquare,
  ListChecks,
  Download,
  Settings2,
  ChevronRight,
  Highlighter,
} from "lucide-react";

const steps = [
  { id: "overview", n: "01", icon: ListChecks, label: "Class overview", desc: "See submissions at a glance" },
  { id: "sample", n: "02", icon: Shuffle, label: "Random sample", desc: "Pull a fair review batch" },
  { id: "context", n: "03", icon: Eye, label: "AI context", desc: "Tools, prompts, regions" },
  { id: "annotations", n: "04", icon: MessageSquare, label: "Annotations", desc: "Read student reasoning" },
  { id: "evaluate", n: "05", icon: Highlighter, label: "Evaluate", desc: "Grade with structure" },
  { id: "policy", n: "06", icon: Settings2, label: "Policy & export", desc: "Set norms, export records" },
] as const;

type StepId = (typeof steps)[number]["id"];

export default function TeacherWorkflow() {
  const [active, setActive] = useState<StepId>("overview");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-border bg-warm-mesh">
          <div className="absolute inset-0 grid-lines opacity-40" aria-hidden />
          <div className="container-page relative py-16 md:py-20">
            <p className="eyebrow">Workflow · Educator</p>
            <h1 className="display mt-4 text-4xl md:text-5xl leading-[1.05] text-foreground max-w-3xl">
              Grade with <em className="italic text-emerald-deep">context</em>, not suspicion.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Open a submission and see the work, the AI tools used, the prompts that shaped it, and the student's own reasoning — all in one place.
            </p>
          </div>
        </section>

        <section className="container-page pt-12">
          <div className="relative">
            <div className="absolute left-0 right-0 top-7 h-px bg-gradient-to-r from-transparent via-border to-transparent hidden md:block" />
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              {steps.map((s) => {
                const isActive = active === s.id;
                const Icon = s.icon;
                return (
                  <button key={s.id} onClick={() => setActive(s.id)} className="group text-left">
                    <div
                      className={`mx-auto h-14 w-14 rounded-2xl grid place-items-center relative z-10 transition-all ${
                        isActive
                          ? "bg-emerald-brand text-white shadow-emerald scale-105"
                          : "bg-card border border-border text-foreground/70 group-hover:border-emerald-brand/40"
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="mt-3 text-center">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Step {s.n}</div>
                      <div className={`text-sm font-semibold mt-0.5 ${isActive ? "text-emerald-deep" : ""}`}>{s.label}</div>
                      <div className="text-xs text-muted-foreground mt-1 leading-snug hidden md:block">{s.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="container-page py-12">
          <AppChrome
            role="teacher"
            userName="Dr. Mira Solberg"
            userEmail="teacher@papiro.test"
            activeTab={active === "policy" ? "Settings" : "Submissions"}
            tabs={["Submissions", "Assignments", "Settings"]}
          >
            <div className="p-5 min-h-[460px]">
              {active === "overview" && <OverviewPanel onNext={() => setActive("sample")} />}
              {active === "sample" && <SamplePanel onNext={() => setActive("context")} />}
              {active === "context" && <ContextPanel onNext={() => setActive("annotations")} />}
              {active === "annotations" && <AnnotationsPanel onNext={() => setActive("evaluate")} />}
              {active === "evaluate" && <EvaluatePanel onNext={() => setActive("policy")} />}
              {active === "policy" && <PolicyPanel />}
            </div>
          </AppChrome>

          <p className="mt-6 text-xs text-muted-foreground text-center font-mono">
            Click a step above to explore the educator workflow.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

const NextButton = ({ onClick, label = "Continue" }: { onClick: () => void; label?: string }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-3.5 py-1.5 text-xs font-medium hover:opacity-90 transition-opacity"
  >
    {label} <ChevronRight className="h-3.5 w-3.5" />
  </button>
);

type Row = {
  name: string;
  code: string;
  state: "submitted" | "reviewed" | "draft" | "missing";
  date: string;
  flags: { label: string; tone: "amber" | "emerald" | "sky" }[];
};

const rows: Row[] = [
  { name: "Avery Lane", code: "CPW-001", state: "submitted", date: "27-03-2026", flags: [{ label: "Sample", tone: "emerald" }] },
  { name: "Bram de Vries", code: "CPW-002", state: "reviewed", date: "26-03-2026", flags: [] },
  { name: "Samira Haddad", code: "CPW-003", state: "submitted", date: "27-03-2026", flags: [{ label: "Brief reflection", tone: "amber" }, { label: "Sample", tone: "emerald" }] },
  { name: "Yusuf Demir", code: "CPW-004", state: "draft", date: "—", flags: [] },
  { name: "Jules Mercier", code: "CPW-005", state: "submitted", date: "25-03-2026", flags: [{ label: "Sample", tone: "emerald" }] },
  { name: "Lina Park", code: "CPW-006", state: "missing", date: "—", flags: [{ label: "Overdue", tone: "amber" }] },
  { name: "Tomás Ruiz", code: "CPW-007", state: "submitted", date: "27-03-2026", flags: [{ label: "Sample", tone: "emerald" }] },
];

const stateStyles = {
  submitted: "text-emerald-deep",
  reviewed: "text-sky-ink",
  draft: "text-amber-ink",
  missing: "text-destructive",
} as const;

const flagStyles = {
  emerald: "bg-emerald-soft text-emerald-deep",
  amber: "bg-amber-soft text-amber-ink",
  sky: "bg-sky-soft text-sky-ink",
} as const;

const OverviewPanel = ({ onNext }: { onNext: () => void }) => (
  <div>
    <div className="flex items-start justify-between gap-3 mb-4">
      <div>
        <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">POL-204-A1</div>
        <div className="text-base font-semibold mt-0.5">Class overview</div>
        <div className="text-[11px] text-muted-foreground">Spring 2026 · 11 students enrolled</div>
      </div>
      <NextButton onClick={onNext} label="Draw a sample" />
    </div>

    <div className="flex flex-wrap gap-1.5 mb-3">
      {[
        ["Expected", "11"],
        ["Submitted", "8"],
        ["Reviewed", "1"],
        ["Drafts", "1"],
        ["Missing", "1"],
        ["Flagged", "2"],
      ].map(([k, v]) => (
        <span key={k} className="text-[10px] rounded-full border border-border px-2 py-0.5 text-muted-foreground">
          {k}: <span className="font-semibold text-foreground">{v}</span>
        </span>
      ))}
    </div>

    <div className="flex flex-wrap gap-1.5 mb-3">
      {["All (11)", "Needs attention (2)", "Missing (1)", "Drafts (1)"].map((t) => (
        <span key={t} className="text-[10px] rounded-full border border-border px-2.5 py-1 text-foreground/70">{t}</span>
      ))}
    </div>

    <SubmissionsTable />
  </div>
);

const SubmissionsTable = () => (
  <div className="rounded-xl border border-border overflow-hidden">
    <div className="grid grid-cols-[1.2fr_0.9fr_1fr_1.4fr] px-3 py-2 bg-paper-warm/40 text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
      <div>Student</div>
      <div>State</div>
      <div>Latest</div>
      <div>Flags</div>
    </div>
    {rows.map((r, i) => (
      <div key={r.code} className={`grid grid-cols-[1.2fr_0.9fr_1fr_1.4fr] gap-2 px-3 py-3 items-center text-[11px] ${i > 0 ? "border-t border-border" : ""}`}>
        <div>
          <div className="font-semibold text-foreground leading-tight">{r.name}</div>
          <div className="text-[10px] text-muted-foreground font-mono">{r.code}</div>
        </div>
        <div className={`text-[9px] font-mono uppercase tracking-widest ${stateStyles[r.state]}`}>{r.state}</div>
        <div className="text-foreground/80 text-[10px]">{r.date}</div>
        <div className="flex flex-wrap gap-1">
          {r.flags.map((f) => (
            <span key={f.label} className={`text-[9px] rounded-full px-1.5 py-0.5 font-medium ${flagStyles[f.tone]}`}>
              {f.label}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const SamplePanel = ({ onNext }: { onNext: () => void }) => (
  <div className="grid md:grid-cols-[1fr_1.3fr] gap-5">
    <div className="rounded-xl border border-border p-5 bg-paper-warm/30">
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Random sampling</div>
      <h3 className="display text-xl mt-1">Review fewer, with more depth.</h3>
      <p className="mt-3 text-sm text-foreground/80 leading-relaxed">
        Instead of skimming every submission, draw a fair random sample. The selection is reproducible and recorded for institutional accountability.
      </p>
      <div className="mt-4 space-y-3">
        <label className="block text-xs">
          <span className="text-muted-foreground">Sample size</span>
          <div className="mt-1 flex items-center gap-2">
            <input type="range" min={1} max={11} defaultValue={5} className="flex-1 accent-emerald-brand" readOnly />
            <span className="font-mono text-foreground font-semibold">5 / 11</span>
          </div>
        </label>
        <label className="block text-xs">
          <span className="text-muted-foreground">Seed</span>
          <div className="mt-1 font-mono text-foreground bg-card border border-border rounded-md px-2 py-1.5 text-[11px]">
            pol204-2026-spring-a1
          </div>
        </label>
      </div>
      <button className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full bg-emerald-brand text-white px-4 py-2 text-xs font-medium">
        <Shuffle className="h-3.5 w-3.5" /> Draw sample
      </button>
    </div>
    <div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Sample of 5</div>
      <div className="mt-3">
        <SubmissionsTable />
      </div>
      <div className="mt-4 flex justify-end">
        <NextButton onClick={onNext} label="Open first submission" />
      </div>
    </div>
  </div>
);

const ContextPanel = ({ onNext }: { onNext: () => void }) => (
  <div className="grid md:grid-cols-[1fr_1.3fr] gap-5">
    <div className="rounded-xl border border-border p-5">
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Submission</div>
      <div className="text-sm font-semibold mt-0.5">Avery Lane · CPW-001</div>
      <div className="text-[11px] text-muted-foreground">Submitted 27-03-2026</div>

      <div className="mt-5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">AI tools used</div>
      <div className="mt-2 space-y-2">
        {[
          { tool: "ChatGPT", turns: 14, share: "Brainstorm + framing" },
          { tool: "Claude", turns: 6, share: "Intro rewrite" },
          { tool: "Perplexity", turns: 4, share: "Source discovery" },
        ].map((t) => (
          <div key={t.tool} className="rounded-lg border border-border p-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold">{t.tool}</div>
              <span className="text-[10px] font-mono text-muted-foreground">{t.turns} turns</span>
            </div>
            <div className="text-[10px] text-muted-foreground mt-0.5">{t.share}</div>
          </div>
        ))}
      </div>

      <div className="mt-5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">AI footprint</div>
      <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden flex">
        <div className="bg-emerald-brand" style={{ width: "38%" }} />
        <div className="bg-sky-ink" style={{ width: "12%" }} />
        <div className="bg-amber-ink" style={{ width: "8%" }} />
      </div>
      <div className="mt-1.5 text-[10px] text-muted-foreground">~58% of paragraphs touched by AI · 42% original</div>
    </div>

    <div className="rounded-xl border border-border bg-paper-warm/30 p-5">
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Draft preview</div>
      <div className="mt-3 space-y-2.5 text-sm leading-relaxed text-foreground/85">
        <p>NGOs have moved from advocacy on the sidelines to active participants in shaping national climate commitments.</p>
        <p>
          One of the clearest shifts has been the use of{" "}
          <span className="bg-amber-soft/80 text-amber-ink px-1 rounded">strategic litigation as a policy lever, with cases like Urgenda v. The Netherlands</span>{" "}
          setting binding emission targets through the courts.
        </p>
        <p>
          Beyond litigation,{" "}
          <span className="bg-emerald-soft/90 text-emerald-deep px-1 rounded">shadow reporting has given NGOs a structural role in the transparency mechanisms</span>{" "}
          of the Paris Agreement.
        </p>
      </div>
      <div className="mt-5 flex justify-end">
        <NextButton onClick={onNext} label="Read annotations" />
      </div>
    </div>
  </div>
);

const AnnotationsPanel = ({ onNext }: { onNext: () => void }) => (
  <div className="grid md:grid-cols-[1.1fr_1fr] gap-5">
    <div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Annotated passages · 7</div>
      <div className="mt-3 space-y-2.5">
        {[
          { tone: "amber", n: 3, tool: "ChatGPT", quote: "strategic litigation as a policy lever, with cases like Urgenda v. The Netherlands", note: "AI surfaced the case — I verified it in the library database before quoting." },
          { tone: "emerald", n: 1, tool: "ChatGPT", quote: "shadow reporting has given NGOs a structural role in the transparency mechanisms", note: "Suggested this framing — I rewrote it in my own words to fit the argument." },
          { tone: "sky", n: 2, tool: "Claude", quote: "This blend of legal pressure and informational accountability has reshaped how states approach their NDCs.", note: "Asked Claude to tighten this sentence — only edits to flow, not meaning." },
        ].map((a) => (
          <div key={a.n} className="rounded-lg border border-border p-3">
            <div className="flex items-center gap-2">
              <span
                className={`h-5 w-5 rounded-full grid place-items-center text-[10px] font-mono font-semibold ${
                  a.tone === "emerald" ? "bg-emerald-soft text-emerald-deep" : a.tone === "sky" ? "bg-sky-soft text-sky-ink" : "bg-amber-soft text-amber-ink"
                }`}
              >
                {a.n}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{a.tool}</span>
            </div>
            <p className="mt-2 text-xs italic text-foreground/70 border-l-2 border-border pl-2">"{a.quote}"</p>
            <p className="mt-2 text-xs text-foreground/85 leading-snug">{a.note}</p>
          </div>
        ))}
      </div>
    </div>
    <div className="rounded-xl bg-foreground text-background p-5 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="relative">
        <div className="text-[10px] font-mono uppercase tracking-widest text-background/60">Student reflection</div>
        <div className="mt-3 space-y-2.5 text-sm leading-relaxed text-background/90">
          <p>"I used ChatGPT mostly to find an angle — the litigation framing came from there. I verified Urgenda independently before quoting it."</p>
          <p>"Claude helped me tighten the intro, but I wrote the conclusion entirely on my own because the AI version felt too generic."</p>
        </div>
        <div className="mt-5 text-[10px] font-mono text-background/60">142 words · honest, specific</div>
        <div className="mt-5 flex justify-end">
          <button
            onClick={onNext}
            className="inline-flex items-center gap-1.5 rounded-full bg-emerald-brand text-white px-3.5 py-1.5 text-xs font-medium"
          >
            Evaluate <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const EvaluatePanel = ({ onNext }: { onNext: () => void }) => (
  <div className="grid md:grid-cols-[1fr_1.1fr] gap-5">
    <div className="rounded-xl border border-border p-5">
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Rubric · POL-204</div>
      <div className="mt-3 space-y-3">
        {[
          ["Argument & thesis", 4],
          ["Evidence & sourcing", 4],
          ["Independent analysis", 3],
          ["AI disclosure & reflection", 5],
        ].map(([k, v]) => (
          <div key={k as string}>
            <div className="flex items-center justify-between text-xs">
              <span className="text-foreground/80">{k}</span>
              <span className="font-mono text-foreground font-semibold">{v}/5</span>
            </div>
            <div className="mt-1 h-1.5 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-emerald-brand" style={{ width: `${(v as number) * 20}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Overall</span>
        <span className="text-2xl font-semibold text-emerald-deep display">16<span className="text-sm text-muted-foreground">/20</span></span>
      </div>
    </div>
    <div className="rounded-xl border border-border bg-paper-warm/30 p-5 flex flex-col">
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Feedback to student</div>
      <div className="mt-3 flex-1 text-sm leading-relaxed text-foreground/85 space-y-2">
        <p>Strong, focused argument. The Urgenda example is well-chosen and your decision to verify it independently is exactly the kind of judgement we're looking for.</p>
        <p>Push further on the analysis: where AI gave you a frame, show more of your own reasoning about why it fits this case rather than another.</p>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button className="rounded-full border border-border px-3.5 py-1.5 text-xs font-medium text-foreground/80">Save draft</button>
        <NextButton onClick={onNext} label="Send & set policy" />
      </div>
    </div>
  </div>
);

const PolicyPanel = () => (
  <div className="grid md:grid-cols-[1fr_1fr] gap-5">
    <div className="rounded-xl border border-border p-5">
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Course AI policy</div>
      <h3 className="display text-xl mt-1">POL-204 · Spring 2026</h3>
      <div className="mt-4 space-y-3">
        {[
          { label: "Open with disclosure", desc: "AI allowed; sources & annotations required.", on: true },
          { label: "Mandatory reflection", desc: "Minimum 100 words on AI use.", on: true },
          { label: "Random sampling", desc: "Review 5 of 11 submissions in depth.", on: true },
          { label: "Banned for final exam", desc: "No AI tools on the closed assessment.", on: false },
        ].map((p) => (
          <div key={p.label} className="flex items-start justify-between gap-3 rounded-lg border border-border p-3">
            <div>
              <div className="text-xs font-semibold">{p.label}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{p.desc}</div>
            </div>
            <span
              className={`shrink-0 h-5 w-9 rounded-full p-0.5 transition-colors ${
                p.on ? "bg-emerald-brand" : "bg-muted"
              }`}
            >
              <span className={`block h-4 w-4 rounded-full bg-card transition-transform ${p.on ? "translate-x-4" : ""}`} />
            </span>
          </div>
        ))}
      </div>
    </div>
    <div className="rounded-xl border border-border p-5">
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Records & export</div>
      <p className="mt-2 text-sm text-foreground/80 leading-relaxed">
        Every submission keeps a permanent, signed record: prompts, annotations, reflection, sample seed and grade. Export for accreditation or appeals.
      </p>
      <div className="mt-4 space-y-2">
        {[
          ["Class submissions (CSV)", "11 rows · 24 KB"],
          ["Sample audit (PDF)", "Reproducible seed"],
          ["Full assignment archive", "All sources + annotations"],
        ].map(([k, v]) => (
          <div key={k} className="flex items-center justify-between rounded-lg border border-border p-3">
            <div>
              <div className="text-xs font-semibold">{k}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{v}</div>
            </div>
            <button className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-deep hover:underline underline-offset-4">
              <Download className="h-3.5 w-3.5" /> Export
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
);
