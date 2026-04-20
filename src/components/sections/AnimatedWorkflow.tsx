import { useEffect, useState } from "react";
import { MessageSquare, Highlighter, PenLine, Send, Check, Sparkles, FileText, Plus } from "lucide-react";
import { TopBar } from "./Hero";

type StepId = 2 | 3 | 4 | 5;

const steps: { n: number; id: StepId | 1; label: string }[] = [
  { n: 1, id: 1, label: "Assignment" },
  { n: 2, id: 2, label: "Sources" },
  { n: 3, id: 3, label: "Annotate" },
  { n: 4, id: 4, label: "Reflect" },
  { n: 5, id: 5, label: "Review" },
];

const SCENE_DURATION = 4200; // ms per scene

export const AnimatedWorkflow = () => {
  const [active, setActive] = useState<StepId>(2);

  useEffect(() => {
    const order: StepId[] = [2, 3, 4, 5];
    let i = 0;
    const t = setInterval(() => {
      i = (i + 1) % order.length;
      setActive(order[i]);
    }, SCENE_DURATION);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative">
      {/* floating accent shapes */}
      <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-peach blur-2xl opacity-70 float-slow" />
      <div className="absolute -right-10 top-20 h-32 w-32 rounded-full bg-emerald-soft blur-3xl opacity-80 float-slow" style={{ animationDelay: "2s" }} />

      <div className="relative rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        <TopBar />

        {/* Workflow header + stepper */}
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

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {steps.map((s) => {
              const isActive = s.id === active;
              const isPast = s.n < active;
              return (
                <div
                  key={s.n}
                  className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs border transition-all duration-500 ${
                    isActive
                      ? "bg-emerald-brand text-white border-emerald-brand scale-105"
                      : isPast
                      ? "bg-emerald-soft border-emerald-brand/30 text-emerald-deep"
                      : "bg-card border-border text-muted-foreground"
                  }`}
                >
                  <span
                    className={`h-5 w-5 rounded-full grid place-items-center text-[10px] font-mono transition-colors ${
                      isActive ? "bg-white text-emerald-deep" : isPast ? "bg-emerald-brand text-white" : "bg-muted text-foreground/70"
                    }`}
                  >
                    {isPast ? <Check className="h-3 w-3" /> : s.n}
                  </span>
                  {s.label}
                </div>
              );
            })}
          </div>
        </div>

        {/* Scene area */}
        <div className="relative min-h-[360px] bg-paper-warm/20">
          {active === 2 && <SourcesScene />}
          {active === 3 && <AnnotateScene />}
          {active === 4 && <ReflectScene />}
          {active === 5 && <SubmitScene />}
        </div>
      </div>

      {/* progress bar */}
      <div className="mt-3 h-0.5 w-full bg-border/60 rounded-full overflow-hidden">
        <div
          key={active}
          className="h-full bg-emerald-brand"
          style={{ animation: `progressBar ${SCENE_DURATION}ms linear forwards` }}
        />
      </div>

      <style>{`
        @keyframes progressBar { from { width: 0% } to { width: 100% } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes drawBox { from { transform: scale(0.6); opacity: 0 } to { transform: scale(1); opacity: 1 } }
        @keyframes typeIn { from { width: 0 } to { width: 100% } }
        @keyframes cursorMove { 0% { transform: translate(0,0) } 100% { transform: var(--cursor-end) } }
        .scene-fade > * { animation: fadeUp 0.5s ease-out both; }
      `}</style>
    </div>
  );
};

/* ============= SCENE 1 — SOURCES (attach AI chat) ============= */
const SourcesScene = () => (
  <div className="grid lg:grid-cols-[260px_1fr] divide-y lg:divide-y-0 lg:divide-x divide-border h-full">
    <div className="p-5 scene-fade">
      <div className="flex items-center gap-2 mb-1">
        <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
        <h4 className="text-sm font-semibold">Step 2 · Sources</h4>
      </div>
      <p className="text-[11px] text-muted-foreground mb-4">Attach AI chats that supported this work.</p>
      <button className="w-full h-9 rounded-md bg-emerald-brand text-white text-xs flex items-center justify-center gap-1.5">
        <Plus className="h-3.5 w-3.5" /> Add AI chat
      </button>
      <div className="mt-3 space-y-2">
        <div className="rounded-md border border-emerald-brand/30 bg-emerald-soft/40 p-2.5" style={{ animation: "fadeUp 0.5s 0.2s ease-out both" }}>
          <div className="flex items-center justify-between">
            <div className="text-[11px] font-semibold">Argentinië · context check</div>
            <Check className="h-3 w-3 text-emerald-deep" />
          </div>
          <div className="text-[10px] text-muted-foreground font-mono mt-0.5">ChatGPT · 4 prompts</div>
        </div>
        <div className="rounded-md border border-emerald-brand/30 bg-emerald-soft/40 p-2.5" style={{ animation: "fadeUp 0.5s 0.6s ease-out both" }}>
          <div className="flex items-center justify-between">
            <div className="text-[11px] font-semibold">Outline · counter-examples</div>
            <Check className="h-3 w-3 text-emerald-deep" />
          </div>
          <div className="text-[10px] text-muted-foreground font-mono mt-0.5">Claude · 2 prompts</div>
        </div>
        <div className="rounded-md border border-dashed border-border p-2.5 text-center" style={{ animation: "fadeUp 0.5s 1s ease-out both" }}>
          <div className="text-[10px] text-muted-foreground">+ Drop another chat</div>
        </div>
      </div>
    </div>

    <div className="p-6">
      <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Preview · ChatGPT</div>
      <div className="mt-2 rounded-lg border border-border bg-card overflow-hidden">
        <div className="px-4 py-2 border-b border-border bg-paper-warm/40 text-[11px] font-semibold flex items-center justify-between">
          Argentinië · context check
          <span className="text-[9px] font-mono text-muted-foreground">Imported just now</span>
        </div>
        <div className="p-4 space-y-3">
          <div className="rounded-lg bg-amber-soft/60 border border-amber-ink/15 p-3" style={{ animation: "fadeUp 0.5s 0.3s ease-out both" }}>
            <div className="text-[9px] font-mono uppercase tracking-wider text-amber-ink mb-1">Prompt</div>
            <p className="text-[11px] text-foreground/85 leading-relaxed">
              "Schrijf een krantenartikel over de achteruitgang van de Argentijnse economie onder Milei."
            </p>
          </div>
          <div className="rounded-lg bg-emerald-soft/50 border border-emerald-brand/20 p-3" style={{ animation: "fadeUp 0.5s 0.7s ease-out both" }}>
            <div className="text-[9px] font-mono uppercase tracking-wider text-emerald-deep mb-1">Response</div>
            <p className="text-[11px] text-emerald-deep/90 leading-relaxed">
              Ik verifieer eerst de recente context rond Argentinië en Milei, en stel daarna een gestructureerd artikel voor met …
              <span className="inline-block h-3 w-1 align-middle bg-emerald-deep ml-0.5 animate-pulse" />
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ============= SCENE 2 — ANNOTATE (highlight + note) ============= */
const AnnotateScene = () => (
  <div className="grid lg:grid-cols-[1fr_280px] divide-y lg:divide-y-0 lg:divide-x divide-border">
    <div className="p-6 relative">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Highlighter className="h-3.5 w-3.5 text-amber-ink" />
          <h4 className="text-sm font-semibold">Step 3 · Annotate where AI was used</h4>
        </div>
        <div className="text-[10px] font-mono text-muted-foreground">essay.pdf · page 1</div>
      </div>

      {/* document mock */}
      <div className="relative rounded-lg border border-border bg-card p-5 overflow-hidden">
        <div className="text-[11px] font-semibold mb-2">De achteruitgang van de Argentijnse economie</div>
        <div className="space-y-1.5">
          <div className="h-2 rounded bg-foreground/10 w-[95%]" />
          <div className="h-2 rounded bg-foreground/10 w-[88%]" />
          <div className="h-2 rounded bg-foreground/10 w-[92%]" />
          <div className="h-2 rounded bg-foreground/10 w-[70%]" />
          <div className="h-2 rounded bg-foreground/10 w-[96%]" />
          <div className="h-2 rounded bg-foreground/10 w-[60%]" />
        </div>

        {/* highlight rectangle drawing in */}
        <div
          className="absolute rounded-md ring-2 ring-amber-ink/60 bg-amber-soft/70"
          style={{
            left: "20px",
            top: "70px",
            width: "78%",
            height: "62px",
            animation: "drawBox 0.6s 0.3s cubic-bezier(.2,.7,.3,1) both",
          }}
        />

        {/* cursor */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: "10%",
            top: "30%",
            animation: "cursorMove 1.2s 0.1s ease-out both",
            ["--cursor-end" as string]: "translate(280px, 70px)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="hsl(var(--ink))" stroke="white" strokeWidth="1.5">
            <path d="M3 2l7 18 2.5-7L20 10z" />
          </svg>
        </div>

        {/* annotation badge */}
        <div
          className="absolute right-3 top-[140px] inline-flex items-center gap-1.5 rounded-full bg-amber-ink text-amber-soft px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider shadow-soft"
          style={{ animation: "fadeUp 0.4s 0.9s ease-out both" }}
        >
          <Sparkles className="h-2.5 w-2.5" /> AI used here
        </div>
      </div>
    </div>

    {/* annotation panel */}
    <div className="p-5 bg-card scene-fade">
      <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-2">Annotation</div>
      <div className="rounded-md bg-amber-soft/60 text-amber-ink text-[11px] px-3 py-2">
        Anchored to PDF page 1
      </div>
      <div className="mt-3">
        <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">Linked prompt</div>
        <div className="h-9 rounded-md border border-border flex items-center justify-between px-2.5 text-[11px]" style={{ animation: "fadeUp 0.4s 0.6s ease-out both" }}>
          <span>Outline · counter-examples</span>
          <span className="text-muted-foreground">▾</span>
        </div>
      </div>
      <div className="mt-3">
        <div className="text-[10px] font-medium mb-1">Why did you use AI here?</div>
        <div className="rounded-md border border-border bg-paper-warm/30 p-2.5 min-h-[64px] text-[11px] text-foreground/80 leading-snug" style={{ animation: "fadeUp 0.4s 1.1s ease-out both" }}>
          To check whether my counter-arguments were complete before writing this paragraph.
        </div>
      </div>
      <button className="mt-3 w-full h-8 rounded-md bg-emerald-brand text-white text-[11px]" style={{ animation: "fadeUp 0.4s 1.5s ease-out both" }}>
        Save annotation
      </button>
    </div>
  </div>
);

/* ============= SCENE 3 — REFLECT ============= */
const ReflectScene = () => (
  <div className="p-6 md:p-8 grid lg:grid-cols-2 gap-6">
    <div className="scene-fade">
      <div className="flex items-center gap-2 mb-2">
        <PenLine className="h-3.5 w-3.5 text-sky-ink" />
        <h4 className="text-sm font-semibold">Step 4 · Reflect on your process</h4>
      </div>
      <p className="text-xs text-muted-foreground mb-4">A short reflection gives reviewers context — not a verdict.</p>

      <div className="space-y-3">
        <ReflectQ q="Did AI shape your argument, or did you shape the AI output?" delay={0.2}>
          I drafted my own outline first, then used AI only to challenge my counter-examples and tighten phrasing in two paragraphs.
        </ReflectQ>
        <ReflectQ q="What did you change after reviewing the AI output?" delay={0.7}>
          I rejected the suggested intro and rewrote it, kept the structural critique, and rephrased two sentences in my own voice.
        </ReflectQ>
      </div>
    </div>

    <div className="scene-fade space-y-3">
      <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Quick checks</div>
      {[
        ["Reviewed AI output before using", true],
        ["Verified factual claims separately", true],
        ["Rewrote AI text in my own words", true],
      ].map(([label, on], i) => (
        <div
          key={label as string}
          className="flex items-center justify-between rounded-md border border-border bg-paper-warm/30 px-3 py-2.5"
          style={{ animation: `fadeUp 0.4s ${0.3 + i * 0.25}s ease-out both` }}
        >
          <span className="text-[11px]">{label}</span>
          <span className={`h-5 w-9 rounded-full relative ${on ? "bg-emerald-brand" : "bg-muted"}`}>
            <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow ${on ? "right-0.5" : "left-0.5"}`} />
          </span>
        </div>
      ))}
      <div className="rounded-md border border-emerald-brand/30 bg-emerald-soft/40 p-3 mt-2" style={{ animation: "fadeUp 0.4s 1.2s ease-out both" }}>
        <div className="flex items-center gap-1.5 text-[11px] text-emerald-deep">
          <Check className="h-3.5 w-3.5" /> Reflection looks complete and specific
        </div>
      </div>
    </div>
  </div>
);

const ReflectQ = ({ q, children, delay }: { q: string; children: string; delay: number }) => (
  <div className="rounded-md border border-border bg-card p-3" style={{ animation: `fadeUp 0.4s ${delay}s ease-out both` }}>
    <div className="text-[11px] font-medium text-foreground mb-1.5">{q}</div>
    <div className="text-[11px] text-muted-foreground leading-relaxed italic">"{children}"</div>
  </div>
);

/* ============= SCENE 4 — REVIEW & SUBMIT ============= */
const SubmitScene = () => (
  <div className="p-6 md:p-8 grid lg:grid-cols-[1fr_280px] gap-6 items-start">
    <div className="scene-fade">
      <div className="flex items-center gap-2 mb-2">
        <Send className="h-3.5 w-3.5 text-emerald-brand" />
        <h4 className="text-sm font-semibold">Step 5 · Review & submit</h4>
      </div>
      <p className="text-xs text-muted-foreground mb-4">A single review-ready record — work, sources, annotations and reflection.</p>

      <div className="rounded-lg border border-border bg-card divide-y divide-border">
        {[
          { icon: FileText, label: "Final document", value: "essay.pdf · 1,498 words" },
          { icon: MessageSquare, label: "AI chats attached", value: "2 conversations" },
          { icon: Highlighter, label: "Annotations", value: "5 regions linked to prompts" },
          { icon: PenLine, label: "Reflection", value: "Completed" },
        ].map((row, i) => (
          <div
            key={row.label}
            className="flex items-center justify-between px-4 py-3"
            style={{ animation: `fadeUp 0.4s ${0.15 + i * 0.15}s ease-out both` }}
          >
            <div className="flex items-center gap-2.5">
              <span className="h-7 w-7 rounded-md bg-emerald-soft text-emerald-deep grid place-items-center">
                <row.icon className="h-3.5 w-3.5" />
              </span>
              <div>
                <div className="text-[11px] font-medium">{row.label}</div>
                <div className="text-[10px] text-muted-foreground">{row.value}</div>
              </div>
            </div>
            <Check className="h-4 w-4 text-emerald-brand" />
          </div>
        ))}
      </div>
    </div>

    <div className="space-y-3 scene-fade">
      <div className="rounded-xl border border-emerald-brand/30 bg-gradient-to-br from-emerald-soft/80 to-emerald-soft/30 p-4" style={{ animation: "fadeUp 0.5s 0.7s ease-out both" }}>
        <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-deep">Ready to submit</div>
        <div className="mt-1 text-base font-semibold text-emerald-deep">All checks passed</div>
        <p className="mt-1 text-[11px] text-emerald-deep/80">Your reviewer will see context, not just the document.</p>
      </div>
      <button
        className="w-full h-10 rounded-md bg-emerald-brand text-white text-sm font-medium inline-flex items-center justify-center gap-2 shadow-emerald"
        style={{ animation: "fadeUp 0.5s 1.1s ease-out both" }}
      >
        <Send className="h-4 w-4" /> Submit to reviewer
      </button>
      <div
        className="rounded-md border border-emerald-brand/40 bg-card p-3 flex items-center gap-2 text-[11px]"
        style={{ animation: "fadeUp 0.5s 1.6s ease-out both" }}
      >
        <span className="h-6 w-6 rounded-full bg-emerald-brand text-white grid place-items-center">
          <Check className="h-3.5 w-3.5" />
        </span>
        <div>
          <div className="font-medium">Submitted</div>
          <div className="text-muted-foreground text-[10px]">Sent to Dr. Mira Solberg</div>
        </div>
      </div>
    </div>
  </div>
);
