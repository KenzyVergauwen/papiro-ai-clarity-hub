import { useEffect, useState } from "react";
import {
  MessageSquare,
  Highlighter,
  PenLine,
  Send,
  Check,
  FileText,
  Upload,
  Save,
  ChevronRight,
  Search,
  Square,
  PenTool,
  ChevronDown,
} from "lucide-react";
import { TopBar } from "./Hero";

type StepId = 2 | 3 | 4 | 5;

const steps: { n: number; id: StepId | 1; label: string }[] = [
  { n: 1, id: 1, label: "Assignment" },
  { n: 2, id: 2, label: "Sources" },
  { n: 3, id: 3, label: "Annotate" },
  { n: 4, id: 4, label: "Reflect" },
  { n: 5, id: 5, label: "Review" },
];

const SCENE_DURATION = 4600; // ms per scene

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
      <div
        className="absolute -right-10 top-20 h-32 w-32 rounded-full bg-emerald-soft blur-3xl opacity-80 float-slow"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        <TopBar />

        {/* Workflow header + stepper */}
        <div className="px-6 md:px-8 py-6 border-b border-border bg-gradient-to-b from-emerald-soft/30 to-transparent">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-brand mb-1.5">
                Papiro student workflow
              </div>
              <h3 className="display text-2xl md:text-3xl text-ink">
                Document and submit your work
              </h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-xl">
                Show where AI supported your work, link those moments to the prompts you used, and produce a review-ready record.
              </p>
            </div>
            <div className="rounded-xl border border-emerald-brand/30 bg-emerald-soft/60 px-3.5 py-2">
              <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-deep/70 leading-none">
                Project
              </div>
              <div className="text-sm font-semibold text-emerald-deep leading-tight mt-1">
                Digital Humanities
              </div>
              <div className="text-[10px] font-mono text-emerald-deep/70 leading-none mt-1">
                DH-118-P2
              </div>
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
                      ? "bg-card border-emerald-brand text-ink ring-2 ring-emerald-brand/40 scale-105"
                      : isPast
                      ? "bg-card border-emerald-brand/30 text-emerald-deep"
                      : "bg-card border-border text-muted-foreground"
                  }`}
                >
                  <span
                    className={`h-5 w-5 rounded-full grid place-items-center text-[10px] font-mono transition-colors ${
                      isActive
                        ? "bg-emerald-brand text-white"
                        : isPast
                        ? "bg-emerald-soft text-emerald-deep"
                        : "bg-muted text-foreground/60"
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
        <div className="relative min-h-[400px] bg-paper-warm/20">
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
        @keyframes cursorMove { 0% { transform: translate(0,0) } 100% { transform: var(--cursor-end) } }
        .scene-fade > * { animation: fadeUp 0.5s ease-out both; }
      `}</style>
    </div>
  );
};

/* ============= Reusable side panel (Progress and guidance) ============= */
const GuidancePanel = ({
  state = "success" as "success" | "info",
  message,
  rows,
  primaryLabel = "Next step",
}: {
  state?: "success" | "info";
  message: string;
  rows: { label: string; value: string }[];
  primaryLabel?: string;
}) => (
  <div className="rounded-xl border border-border bg-card p-4 shadow-soft">
    <div className="flex items-center justify-between mb-2">
      <div className="text-[11px] font-semibold text-ink">Progress and guidance</div>
      <span
        className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full ${
          state === "success"
            ? "bg-emerald-soft text-emerald-deep"
            : "bg-sky-soft text-sky-ink"
        }`}
      >
        {state}
      </span>
    </div>
    <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">{message}</p>
    <div className="space-y-1.5">
      {rows.map((r) => (
        <div
          key={r.label}
          className="flex items-center justify-between rounded-md bg-paper-warm/40 px-2.5 py-2"
        >
          <span className="text-[11px] text-foreground/80">{r.label}</span>
          <span className="text-[11px] font-semibold text-ink">{r.value}</span>
        </div>
      ))}
    </div>
    <div className="mt-3 flex items-center gap-2">
      <button className="flex-1 h-8 rounded-md bg-emerald-brand text-white text-[11px] font-medium inline-flex items-center justify-center gap-1.5">
        <Save className="h-3 w-3" /> Save draft
      </button>
      <button className="flex-1 h-8 rounded-md bg-ink text-background text-[11px] font-medium">
        {primaryLabel}
      </button>
    </div>
  </div>
);

/* ============= SCENE 2 — SOURCES ============= */
const SourcesScene = () => (
  <div className="grid lg:grid-cols-[1fr_240px] gap-4 p-5 md:p-6">
    <div className="rounded-xl border border-border bg-card p-5 scene-fade">
      <div className="flex items-center justify-between mb-1">
        <h4 className="text-sm font-semibold text-ink">Step 2. Sources</h4>
        <span className="text-[10px] font-mono uppercase tracking-wider rounded-full bg-emerald-soft text-emerald-deep px-2 py-0.5">
          1 chat selected
        </span>
      </div>
      <p className="text-[11px] text-muted-foreground mb-4">
        Choose the AI chats and uploaded file you want to carry forward.
      </p>

      <div className="grid md:grid-cols-2 gap-3">
        {/* Choose AI chats */}
        <div className="rounded-lg border border-border bg-paper-warm/30 p-3">
          <div className="flex items-start gap-2 mb-2">
            <span className="h-6 w-6 rounded-md bg-emerald-soft text-emerald-deep grid place-items-center shrink-0">
              <MessageSquare className="h-3 w-3" />
            </span>
            <div>
              <div className="text-[11px] font-semibold text-ink">Choose AI chats</div>
              <div className="text-[10px] text-muted-foreground leading-snug">
                Pick saved chats that document your AI use.
              </div>
            </div>
          </div>
          <div className="rounded-md border border-border bg-card flex items-center gap-1.5 px-2 h-7">
            <Search className="h-3 w-3 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground">Search project folders</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-emerald-soft text-emerald-deep border border-emerald-brand/30">
              All folders
            </span>
            <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-card text-muted-foreground border border-border">
              Selected · 1
            </span>
            <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-card text-muted-foreground border border-border">
              Unsorted · 2
            </span>
          </div>

          <div
            className="mt-3 rounded-md border border-emerald-brand/40 bg-emerald-soft/30 p-2"
            style={{ animation: "fadeUp 0.5s 0.5s ease-out both" }}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-1.5">
                <span className="h-3.5 w-3.5 rounded-sm bg-emerald-brand text-white grid place-items-center mt-0.5">
                  <Check className="h-2.5 w-2.5" />
                </span>
                <div>
                  <div className="text-[10px] font-semibold text-ink leading-tight">
                    Argentijnse economie en Milei
                  </div>
                  <div className="text-[9px] font-mono text-muted-foreground mt-0.5">
                    CHATGPT · 30-03-2026
                  </div>
                </div>
              </div>
              <span className="text-[9px] font-medium text-emerald-deep bg-emerald-soft px-1.5 py-0.5 rounded">
                Selected
              </span>
            </div>
          </div>

          <div
            className="mt-1.5 rounded-md border border-border bg-card p-2"
            style={{ animation: "fadeUp 0.5s 0.9s ease-out both" }}
          >
            <div className="flex items-start gap-1.5">
              <span className="h-3.5 w-3.5 rounded-sm border border-border mt-0.5" />
              <div>
                <div className="text-[10px] font-semibold text-foreground/80 leading-tight">
                  Outline · counter-examples
                </div>
                <div className="text-[9px] font-mono text-muted-foreground mt-0.5">
                  CLAUDE · 28-03-2026
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project upload */}
        <div className="rounded-lg border border-border bg-paper-warm/30 p-3">
          <div className="flex items-start gap-2 mb-2">
            <span className="h-6 w-6 rounded-md bg-amber-soft text-amber-ink grid place-items-center shrink-0">
              <Upload className="h-3 w-3" />
            </span>
            <div>
              <div className="text-[11px] font-semibold text-ink">Project upload</div>
              <div className="text-[10px] text-muted-foreground leading-snug">
                Upload the file you want to annotate.
              </div>
            </div>
          </div>

          <div
            className="rounded-md border-2 border-dashed border-border bg-card p-3 text-center"
            style={{ animation: "fadeUp 0.5s 0.3s ease-out both" }}
          >
            <div className="text-[10px] font-medium text-foreground/80">Drag a file or browse</div>
            <div className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground mt-0.5">
              PDF · DOCX · PPTX
            </div>
          </div>

          <div
            className="mt-2 rounded-md border border-border bg-card p-2 flex items-center gap-2"
            style={{ animation: "fadeUp 0.5s 0.7s ease-out both" }}
          >
            <span className="h-7 w-7 rounded-md bg-emerald-soft text-emerald-deep grid place-items-center">
              <FileText className="h-3.5 w-3.5" />
            </span>
            <div className="min-w-0">
              <div className="text-[10px] font-semibold text-ink truncate">
                Artikel_ArgentijnsVerval.pdf
              </div>
              <div className="text-[9px] font-mono text-muted-foreground">3.5 MB</div>
            </div>
            <Check className="h-3.5 w-3.5 text-emerald-brand ml-auto" />
          </div>
        </div>
      </div>
    </div>

    <GuidancePanel
      state="success"
      message="Assignment DH-118-P2 found. You still have 2 submissions left."
      rows={[
        { label: "Assignment ready", value: "Yes" },
        { label: "AI chats selected", value: "1 selected" },
        { label: "Source file uploaded", value: "Yes" },
      ]}
    />
  </div>
);

/* ============= SCENE 3 — ANNOTATE ============= */
const AnnotateScene = () => (
  <div className="p-5 md:p-6 scene-fade">
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <h4 className="text-sm font-semibold text-ink">Step 3. Annotation workspace</h4>
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] font-mono uppercase tracking-wider rounded-full bg-emerald-soft text-emerald-deep px-2 py-0.5">
            1 annotation
          </span>
          <span className="text-[9px] font-mono uppercase tracking-wider rounded-full bg-sky-soft text-sky-ink px-2 py-0.5">
            1 chat linked
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-[200px_1fr_220px] gap-3">
        {/* Attached AI conversations */}
        <div className="rounded-lg border border-border bg-paper-warm/30 p-3">
          <div className="text-[10px] font-semibold text-ink mb-2">Attached AI conversations</div>
          <div className="rounded-md bg-amber-soft/60 border border-amber-ink/15 px-2 py-1.5 mb-2">
            <div className="text-[8px] font-mono uppercase tracking-wider text-amber-ink">
              Chat 1 (ChatGPT) · Prompt 1
            </div>
          </div>
          <p className="text-[10px] text-foreground/75 leading-snug">
            "Schrijf een krantenartikel over de achteruitgang van de Argentijnse economie onder Milei…"
          </p>
          <div className="mt-2 rounded-md bg-emerald-soft/40 border border-emerald-brand/20 px-2 py-1.5">
            <div className="text-[8px] font-mono uppercase tracking-wider text-emerald-deep">
              Response 1
            </div>
          </div>
          <p className="text-[10px] text-foreground/75 leading-snug mt-1">
            Ik verifieer eerst de recente context rond Argentinië en Milei…
          </p>
        </div>

        {/* Document */}
        <div className="rounded-lg border border-border bg-paper-warm/30 p-3 relative">
          <div className="text-[10px] font-semibold text-ink mb-1">Document to annotate</div>
          <div className="text-[10px] text-muted-foreground mb-2">
            Highlight an area, link it to a prompt, and save the note.
          </div>

          <div className="flex items-center gap-1.5 mb-3">
            <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1">
              <PenTool className="h-3 w-3" /> Highlight tool
            </span>
            <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-amber-ink text-amber-soft inline-flex items-center gap-1">
              <Square className="h-2.5 w-2.5" /> Rectangle
            </span>
            <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-card text-muted-foreground border border-border">
              Freehand
            </span>
          </div>

          <div className="relative rounded-md border border-border bg-card p-3 overflow-hidden">
            <div className="text-center text-[8px] font-mono uppercase tracking-wider text-muted-foreground border-b border-border pb-1 mb-2">
              De Internationale Tribune · 30 maart 2026
            </div>
            <div className="text-[10px] font-bold text-center text-ink leading-tight mb-2 px-2">
              Argentinië tussen herstel en achteruitgang: hoe ver kan Javier Milei gaan?
            </div>
            <div className="space-y-1.5 relative">
              <div className="h-1.5 rounded bg-foreground/10 w-[95%]" />
              {/* target line being highlighted */}
              <div className="relative h-1.5 w-[88%]">
                <div className="absolute inset-0 rounded bg-foreground/10" />
                {/* orange highlight that grows left-to-right as the cursor drags */}
                <div
                  className="absolute -inset-y-1 left-0 rounded-sm bg-amber-soft/80 ring-1 ring-amber-ink/40"
                  style={{
                    width: "0%",
                    animation: "highlightDrag 1.1s 0.35s cubic-bezier(.4,.1,.3,1) forwards",
                  }}
                />
                {/* cursor that drags across the line */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    left: "0%",
                    top: "-6px",
                    animation: "cursorDrag 1.1s 0.35s cubic-bezier(.4,.1,.3,1) forwards",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="hsl(var(--ink))" stroke="white" strokeWidth="1.5">
                    <path d="M3 2l7 18 2.5-7L20 10z" />
                  </svg>
                </div>
              </div>
              <div className="h-1.5 rounded bg-foreground/10 w-[92%]" />
              <div className="h-1.5 rounded bg-foreground/10 w-[70%]" />
              <div className="h-1.5 rounded bg-foreground/10 w-[85%]" />
            </div>
          </div>
        </div>

        {/* Annotation inspector */}
        <div className="rounded-lg border border-border bg-paper-warm/30 p-3">
          <div className="text-[10px] font-semibold text-ink mb-2">Annotation inspector</div>
          <div className="rounded-md bg-amber-soft/60 border border-amber-ink/20 px-2 py-1.5 text-[10px] text-amber-ink">
            Annotation anchored to PDF page 1.
          </div>

          <div
            className="mt-2 rounded-md border border-border bg-card px-2 py-1.5"
            style={{ animation: "fadeUp 0.4s 0.6s ease-out both" }}
          >
            <div className="text-[8px] font-mono uppercase tracking-wider text-muted-foreground">
              Reference prompt
            </div>
            <div className="flex items-center justify-between mt-0.5">
              <span className="text-[10px] font-medium text-ink">Outline · counter-examples</span>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </div>
          </div>

          <div
            className="mt-2 rounded-md border border-border bg-card px-2 py-1.5"
            style={{ animation: "fadeUp 0.4s 0.9s ease-out both" }}
          >
            <div className="text-[8px] font-mono uppercase tracking-wider text-muted-foreground">
              Contribution type
            </div>
            <div className="flex items-center justify-between mt-0.5">
              <span className="text-[10px] font-medium text-ink">Structure check</span>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </div>
          </div>

          <div
            className="mt-2"
            style={{ animation: "fadeUp 0.4s 1.2s ease-out both" }}
          >
            <div className="text-[10px] font-medium text-ink mb-1">Why did you use AI here?</div>
            <div className="rounded-md border border-border bg-card p-2 text-[10px] text-foreground/75 leading-snug min-h-[44px]">
              To test whether my counter-arguments were complete before writing this paragraph.
            </div>
          </div>

          <button
            className="mt-2 w-full h-7 rounded-md bg-emerald-brand text-white text-[10px] font-medium"
            style={{ animation: "fadeUp 0.4s 1.5s ease-out both" }}
          >
            Save annotation
          </button>
        </div>
      </div>
    </div>
  </div>
);

/* ============= SCENE 4 — REFLECT ============= */
const ReflectScene = () => (
  <div className="grid lg:grid-cols-[1fr_240px] gap-4 p-5 md:p-6">
    <div className="rounded-xl border border-border bg-card p-5 scene-fade">
      <div className="flex items-center gap-2 mb-1">
        <PenLine className="h-3.5 w-3.5 text-sky-ink" />
        <h4 className="text-sm font-semibold text-ink">Step 4. Reflection</h4>
      </div>
      <p className="text-[11px] text-muted-foreground mb-4">
        Synthesise the patterns across your annotations and show your AI literacy.
      </p>

      <div className="grid md:grid-cols-[170px_1fr] gap-3">
        {/* Documented so far */}
        <div className="rounded-lg border border-border bg-paper-warm/30 p-3">
          <div className="text-[10px] font-semibold text-ink mb-2">Documented so far</div>
          {[
            ["Selected AI chats", "1"],
            ["Prompt references", "3"],
            ["Annotations saved", "2"],
          ].map(([k, v], i) => (
            <div
              key={k}
              className="flex items-center justify-between border-b border-border/60 last:border-0 py-1.5"
              style={{ animation: `fadeUp 0.4s ${0.2 + i * 0.15}s ease-out both` }}
            >
              <span className="text-[10px] text-foreground/80">{k}</span>
              <span className="text-[11px] font-semibold text-ink">{v}</span>
            </div>
          ))}
        </div>

        {/* Synthesis */}
        <div className="rounded-lg border border-border bg-paper-warm/30 p-3 space-y-2">
          <div className="text-[10px] font-semibold text-ink">Synthesis across the submission</div>
          <ReflectField
            q="What kinds of AI support did you use most?"
            a="Mostly wording checks, structure tests, and verifying that my argument was clearly sequenced."
            delay={0.3}
          />
          <ReflectField
            q="Where did you apply the most judgment or revision?"
            a="In the interpretive sections — I compared suggestions against my own evidence and removed wording that overstated the claim."
            delay={0.7}
          />
          <ReflectField
            q="What remained fully your own reasoning?"
            a="The framing of the argument and the conclusion — those came from my notes, not from AI output."
            delay={1.1}
          />
        </div>
      </div>
    </div>

    <GuidancePanel
      state="info"
      message="Selection captured with the highlight tool. Complete the reflection to continue."
      rows={[
        { label: "Checklist complete", value: "3/5" },
        { label: "Reflection ready", value: "No" },
        { label: "Submission state", value: "Draft" },
      ]}
    />
  </div>
);

const ReflectField = ({ q, a, delay }: { q: string; a: string; delay: number }) => (
  <div style={{ animation: `fadeUp 0.4s ${delay}s ease-out both` }}>
    <div className="text-[10px] font-medium text-ink mb-1">{q}</div>
    <div className="rounded-md border border-border bg-card px-2 py-1.5 text-[10px] text-foreground/70 leading-snug italic">
      {a}
    </div>
  </div>
);

/* ============= SCENE 5 — REVIEW & SUBMIT ============= */
const SubmitScene = () => (
  <div className="grid lg:grid-cols-[1fr_240px] gap-4 p-5 md:p-6">
    <div className="rounded-xl border border-border bg-card p-5 scene-fade">
      <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
        <div>
          <h4 className="text-sm font-semibold text-ink">Step 5. Review and submit</h4>
          <p className="text-[11px] text-muted-foreground">
            Confirm each required part is ready and submit.
          </p>
        </div>
        <button
          className="h-9 rounded-md bg-emerald-brand text-white text-[11px] font-medium px-3 inline-flex items-center gap-1.5 shadow-emerald"
          style={{ animation: "fadeUp 0.5s 1.4s ease-out both" }}
        >
          <Send className="h-3.5 w-3.5" /> Submit task
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {/* Readiness checklist */}
        <div className="rounded-lg border border-border bg-paper-warm/30 p-3">
          <div className="text-[10px] font-semibold text-ink mb-2">Readiness checklist</div>
          {[
            ["Assignment details complete", "Ready"],
            ["At least one AI chat selected", "Ready"],
            ["Source file uploaded", "Ready"],
            ["Annotations added", "Ready"],
            ["Reflection completed", "Ready"],
          ].map(([label, status], i) => (
            <div
              key={label}
              className="flex items-center justify-between rounded-md bg-card border border-border px-2 py-1.5 mb-1.5 last:mb-0"
              style={{ animation: `fadeUp 0.4s ${0.15 + i * 0.12}s ease-out both` }}
            >
              <span className="text-[10px] text-foreground/85">{label}</span>
              <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-soft text-emerald-deep">
                {status}
              </span>
            </div>
          ))}
        </div>

        {/* Submission summary */}
        <div className="rounded-lg border border-border bg-paper-warm/30 p-3">
          <div className="text-[10px] font-semibold text-ink mb-2">Submission summary</div>
          {[
            ["Status", "Ready"],
            ["Project", "DH-118-P2"],
            ["Student ID", "DH-001"],
            ["AI use", "AI chats attached"],
            ["Selected chats", "1"],
            ["Annotations", "5 linked"],
          ].map(([k, v], i) => (
            <div
              key={k}
              className="flex items-center justify-between border-b border-border/60 last:border-0 py-1.5"
              style={{ animation: `fadeUp 0.4s ${0.2 + i * 0.1}s ease-out both` }}
            >
              <span className="text-[10px] text-foreground/75">{k}</span>
              <span className="text-[10px] font-semibold text-ink">{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="mt-3 rounded-md border border-amber-ink/25 bg-amber-soft/40 px-3 py-2 text-[10px] text-amber-ink leading-snug flex items-start gap-2"
        style={{ animation: "fadeUp 0.4s 1s ease-out both" }}
      >
        <ChevronRight className="h-3 w-3 mt-0.5 shrink-0" />
        Your teacher will review the uploaded work together with the prompt references, annotation notes, and your reflection.
      </div>
    </div>

    <GuidancePanel
      state="success"
      message="All required parts are ready. You can submit when satisfied with the record."
      rows={[
        { label: "Checklist complete", value: "5/5" },
        { label: "Reflection ready", value: "Yes" },
        { label: "Submission state", value: "Ready" },
      ]}
      primaryLabel="Submit"
    />
  </div>
);
