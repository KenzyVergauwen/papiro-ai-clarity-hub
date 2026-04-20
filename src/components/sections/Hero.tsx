import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, MessageSquare, Sparkles, LogOut } from "lucide-react";

export const Hero = () => {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* ambient backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-paper-warm" />
        <div className="absolute inset-0 bg-warm-mesh" />
        <div className="absolute inset-x-0 top-0 h-[640px]" style={{ background: "var(--gradient-fade)" }} />
        <div className="absolute inset-0 dot-grid opacity-60" />
      </div>

      <div className="container-page pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="mx-auto max-w-4xl text-center">
          <span className="eyebrow rise inline-flex items-center gap-2 rounded-full border border-emerald-brand/30 bg-emerald-soft px-3 py-1 text-emerald-deep">
            <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--emerald))]" />
            Clarity for AI in education
          </span>

          <h1 className="display mt-6 text-5xl md:text-7xl lg:text-[5.25rem] leading-[1.02] font-normal text-ink rise" style={{ animationDelay: "60ms" }}>
            Bring clarity to{" "}
            <span className="relative inline-block">
              <em className="italic font-normal text-emerald-deep">AI use</em>
              <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10" preserveAspectRatio="none">
                <path d="M2 6 Q 50 1, 100 5 T 198 4" stroke="hsl(var(--emerald))" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            </span>{" "}
            in academic work.
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed rise" style={{ animationDelay: "140ms" }}>
            Papiro helps schools and universities guide, document, and review AI use with confidence — turning transparency into trust, without turning learning into surveillance.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 rise" style={{ animationDelay: "220ms" }}>
            <Button variant="emerald" size="lg">
              Request a demo
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="border-foreground/15">
              See how it works
            </Button>
          </div>

          <p className="mt-6 text-xs text-muted-foreground rise" style={{ animationDelay: "300ms" }}>
            Built for institutions · Not a detector · Not a surveillance tool
          </p>
        </div>

        {/* product mock — mirrors real Papiro workspace */}
        <div className="mt-20 md:mt-24 mx-auto max-w-6xl rise" style={{ animationDelay: "380ms" }}>
          <ProductMock />
        </div>
      </div>
    </section>
  );
};

const steps = [
  { n: 1, label: "Assignment", active: true },
  { n: 2, label: "Sources" },
  { n: 3, label: "Annotate" },
  { n: 4, label: "Reflect" },
  { n: 5, label: "Review" },
];

const ProductMock = () => (
  <div className="relative">
    {/* floating accent shapes */}
    <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-peach blur-2xl opacity-70 float-slow" />
    <div className="absolute -right-10 top-20 h-32 w-32 rounded-full bg-emerald-soft blur-3xl opacity-80 float-slow" style={{ animationDelay: "2s" }} />

    <div className="relative rounded-2xl border border-border bg-card shadow-card overflow-hidden">
      {/* App chrome — mirrors real Papiro top bar */}
      <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5">
            <div className="flex flex-col gap-0.5">
              <span className="h-0.5 w-3 bg-foreground" />
              <span className="h-0.5 w-3 bg-foreground" />
              <span className="h-0.5 w-3 bg-foreground" />
            </div>
            <span className="text-xs font-mono tracking-[0.18em] font-semibold">PAPIRO</span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            <Pill active>Workspace</Pill>
            <Pill>AI chats</Pill>
            <Pill>Sent in</Pill>
            <Pill>Settings</Pill>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <div className="rounded-full border border-border px-3 py-1.5 text-right">
            <div className="text-[11px] font-medium leading-none">Bram Traens</div>
            <div className="text-[10px] text-muted-foreground leading-none mt-0.5">student@mail.com</div>
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-full border border-[hsl(var(--peach-ink))]/30 text-[hsl(var(--peach-ink))] bg-peach/40 px-3 py-1.5 text-xs">
            <LogOut className="h-3 w-3" /> Log out
          </button>
        </div>
      </div>

      {/* Workflow header */}
      <div className="px-6 md:px-8 py-6 border-b border-border bg-gradient-to-b from-emerald-soft/30 to-transparent">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-brand mb-1.5">
              Papiro student workflow
            </div>
            <h3 className="display text-2xl md:text-3xl text-ink">Document and submit your work</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-xl">
              Show where AI supported your work, link those moments to the prompts you used, and produce a review-ready record.
            </p>
          </div>
          <div className="rounded-xl border border-emerald-brand/30 bg-emerald-soft/60 px-3.5 py-2">
            <div className="text-xs font-medium text-emerald-deep leading-none">Bram Traens</div>
            <div className="text-[10px] text-emerald-deep/70 leading-none mt-1">student@mail.com</div>
          </div>
        </div>

        {/* 5-step stepper */}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {steps.map((s) => (
            <div
              key={s.n}
              className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs border transition-colors ${
                s.active
                  ? "bg-emerald-brand text-white border-emerald-brand"
                  : "bg-card border-border text-muted-foreground"
              }`}
            >
              <span
                className={`h-5 w-5 rounded-full grid place-items-center text-[10px] font-mono ${
                  s.active ? "bg-white text-emerald-deep" : "bg-muted text-foreground/70"
                }`}
              >
                {s.n}
              </span>
              {s.label}
            </div>
          ))}
        </div>
      </div>

      {/* 3-column workspace */}
      <div className="grid lg:grid-cols-[240px_1fr_260px] divide-y lg:divide-y-0 lg:divide-x divide-border">
        {/* Saved drafts */}
        <div className="p-5 bg-card">
          <div className="flex items-center gap-2 mb-1">
            <FileText className="h-3.5 w-3.5 text-muted-foreground" />
            <h4 className="text-sm font-semibold">Saved drafts</h4>
          </div>
          <p className="text-[11px] text-muted-foreground mb-4">Jump back into previous work.</p>
          <div className="rounded-lg border border-border p-3 bg-paper-warm/40">
            <div className="text-xs font-semibold leading-snug">Achteruitgang Argentijnse Economie</div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-amber-ink mt-1">Draft</div>
            <div className="mt-2 text-[11px] text-muted-foreground">Digital Humanities</div>
            <div className="text-[10px] text-muted-foreground/80">30/03/2026 · DH-118-P2</div>
          </div>
        </div>

        {/* Step content */}
        <div className="p-6 bg-paper-warm/20">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h4 className="text-base font-semibold">Step 1. Assignment</h4>
              <p className="text-xs text-muted-foreground mt-0.5">Start with the assignment ID and the key submission details.</p>
            </div>
            <button className="text-[11px] inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-muted-foreground">
              ↻ Start new
            </button>
          </div>
          <div className="mt-5 rounded-lg border border-dashed border-border bg-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-3.5 w-3.5 text-emerald-brand" />
              <span className="text-xs font-semibold">Assignment lookup</span>
            </div>
            <p className="text-[11px] text-muted-foreground mb-3">
              Use the task ID to load the assignment context and submission limits.
            </p>
            <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Task or project ID</label>
            <div className="mt-1 h-9 rounded-md border border-border bg-background flex items-center px-3 text-xs font-mono text-foreground">
              DH-118-P2<span className="ml-0.5 inline-block h-3 w-px bg-foreground animate-pulse" />
            </div>
            <div className="mt-3 rounded-md bg-emerald-soft/50 border border-emerald-brand/20 px-3 py-2 text-[11px] text-emerald-deep flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-brand" />
              Assignment loaded — Argentijnse Economie · 1500 words
            </div>
          </div>
        </div>

        {/* Progress sidebar */}
        <div className="p-5 bg-card">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-sm font-semibold">Progress</h4>
            <span className="text-[9px] font-mono uppercase tracking-wider rounded-full bg-sky-soft text-sky-ink px-1.5 py-0.5">Info</span>
          </div>
          <p className="text-[11px] text-muted-foreground mb-4">Started a fresh draft.</p>
          <div className="space-y-2">
            <ProgressRow label="Assignment ready" value="Yes" good />
            <ProgressRow label="AI chats selected" value="2" good />
            <ProgressRow label="Source file uploaded" value="No" />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <button className="h-8 rounded-md bg-emerald-brand text-white text-xs flex items-center justify-center gap-1">
              <FileText className="h-3 w-3" /> Save
            </button>
            <button className="h-8 rounded-md bg-foreground text-background text-xs">
              Next step
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* tiny annotation chip floating */}
    <div className="hidden md:flex absolute -right-4 bottom-16 items-center gap-2 rounded-lg border border-border bg-card shadow-card px-3 py-2 float-slow">
      <MessageSquare className="h-3.5 w-3.5 text-emerald-brand" />
      <div className="text-[11px]">
        <div className="font-medium">Annotation saved</div>
        <div className="text-muted-foreground">Page 1 · Prompt 1</div>
      </div>
    </div>
  </div>
);

const Pill = ({ children, active }: { children: React.ReactNode; active?: boolean }) => (
  <span
    className={`text-xs px-3 py-1.5 rounded-full ${
      active ? "bg-emerald-brand text-white" : "text-muted-foreground hover:text-foreground"
    }`}
  >
    {children}
  </span>
);

const ProgressRow = ({ label, value, good }: { label: string; value: string; good?: boolean }) => (
  <div className="flex items-center justify-between rounded-md border border-border bg-paper-warm/30 px-2.5 py-2">
    <span className="text-[11px] text-muted-foreground">{label}</span>
    <span className={`text-[11px] font-mono ${good ? "text-emerald-deep" : "text-muted-foreground"}`}>{value}</span>
  </div>
);
