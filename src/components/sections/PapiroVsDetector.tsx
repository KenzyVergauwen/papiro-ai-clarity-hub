import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Check,
  X,
  Scan,
  ShieldAlert,
  MessageSquare,
  PenLine,
  FileText,
  Sparkles,
  Eye,
  EyeOff,
  Lock,
  Unlock,
} from "lucide-react";

const SCENE_DURATION = 5200; // ms

type Phase = 0 | 1 | 2 | 3;

export const PapiroVsDetector = () => {
  const [phase, setPhase] = useState<Phase>(0);

  useEffect(() => {
    const t = setInterval(() => {
      setPhase((p) => ((p + 1) % 4) as Phase);
    }, SCENE_DURATION);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="compare" className="relative py-24 md:py-32 overflow-hidden">
      {/* ambient backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-paper-warm/40" />
        <div className="absolute inset-0 dot-grid opacity-40" />
      </div>

      <div className="container-page">
        {/* heading */}
        <div className="max-w-3xl">
          <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-emerald-brand/30 bg-emerald-soft px-3 py-1 text-emerald-deep">
            <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--emerald))]" />
            Papiro vs. AI detectors
          </span>
          <h2 className="display mt-4 text-4xl md:text-5xl leading-[1.05] text-ink">
            One produces a <em className="italic text-[hsl(var(--peach-ink))]">verdict</em>.{" "}
            The other produces <em className="italic text-emerald-deep">context</em>.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed text-lg">
            See the same student paper reviewed two ways. Detectors guess. Papiro documents.
          </p>
        </div>

        {/* phase indicator */}
        <div className="mt-10 flex items-center justify-center gap-2">
          {["Same paper", "Review", "Findings", "Outcome"].map((label, i) => (
            <div
              key={label}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border transition-all duration-500 ${
                phase === i
                  ? "bg-card border-emerald-brand text-ink ring-2 ring-emerald-brand/30 scale-105"
                  : i < phase
                  ? "bg-card border-emerald-brand/30 text-emerald-deep"
                  : "bg-card border-border text-muted-foreground"
              }`}
            >
              <span
                className={`h-5 w-5 rounded-full grid place-items-center text-[10px] font-mono transition-colors ${
                  phase === i
                    ? "bg-emerald-brand text-white"
                    : i < phase
                    ? "bg-emerald-soft text-emerald-deep"
                    : "bg-muted text-foreground/60"
                }`}
              >
                {i < phase ? <Check className="h-3 w-3" /> : i + 1}
              </span>
              {label}
            </div>
          ))}
        </div>

        {/* side-by-side */}
        <div className="mt-10 grid lg:grid-cols-[1fr_auto_1fr] gap-6 items-stretch">
          <DetectorPanel phase={phase} />

          {/* divider — VS */}
          <div className="hidden lg:flex flex-col items-center justify-center gap-3 px-2">
            <div className="h-full w-px bg-border" />
            <div className="rounded-full border border-border bg-card text-ink font-mono text-[11px] tracking-[0.2em] px-3 py-1.5 shadow-soft">
              VS
            </div>
            <div className="h-full w-px bg-border" />
          </div>

          <PapiroPanel phase={phase} />
        </div>

        {/* progress bar */}
        <div className="mt-6 h-0.5 w-full bg-border/60 rounded-full overflow-hidden">
          <div
            key={phase}
            className="h-full bg-emerald-brand"
            style={{ animation: `pvdProgress ${SCENE_DURATION}ms linear forwards` }}
          />
        </div>

        {/* feature comparison summary */}
        <div className="mt-14 grid md:grid-cols-2 gap-5">
          <FeatureColumn
            tone="peach"
            title="What AI detectors give you"
            icon={ShieldAlert}
            items={[
              { label: "A probability score", supported: false, note: "No reasoning, no source" },
              { label: "False positives on non-native writers", supported: false },
              { label: "Visibility into how AI was actually used", supported: false },
              { label: "A conversation between teacher and student", supported: false },
              { label: "Compliance with EU AI Act transparency rules", supported: false },
            ]}
          />
          <FeatureColumn
            tone="emerald"
            title="What Papiro gives you"
            icon={Sparkles}
            items={[
              { label: "Documented prompts linked to the work", supported: true },
              { label: "Student reflection on AI choices", supported: true },
              { label: "Auditable trail for teacher review", supported: true },
              { label: "Random sampling for fair evaluation", supported: true },
              { label: "Aligned with EU AI Act and institutional policy", supported: true },
            ]}
          />
        </div>
      </div>

      <style>{`
        @keyframes pvdProgress { from { width: 0% } to { width: 100% } }
        @keyframes pvdFadeUp { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes pvdScanLine {
          0% { top: 0%; opacity: 0 }
          10% { opacity: 1 }
          90% { opacity: 1 }
          100% { top: 100%; opacity: 0 }
        }
        @keyframes pvdShake {
          0%, 100% { transform: translateX(0) }
          20% { transform: translateX(-2px) }
          40% { transform: translateX(2px) }
          60% { transform: translateX(-1px) }
          80% { transform: translateX(1px) }
        }
        @keyframes pvdPulse {
          0%, 100% { opacity: 0.6 }
          50% { opacity: 1 }
        }
        @keyframes pvdHighlight { from { width: 0% } to { width: 100% } }
        .pvd-fade > * { animation: pvdFadeUp 0.5s ease-out both }
      `}</style>
    </section>
  );
};

/* ============= LEFT — AI DETECTOR ============= */
const DetectorPanel = ({ phase }: { phase: Phase }) => (
  <div className="relative rounded-2xl border border-[hsl(var(--peach-ink))]/25 bg-card shadow-soft overflow-hidden flex flex-col">
    {/* header */}
    <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-gradient-to-b from-peach/40 to-transparent">
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-md bg-peach grid place-items-center">
          <Scan className="h-3.5 w-3.5 text-[hsl(var(--peach-ink))]" />
        </div>
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[hsl(var(--peach-ink))]">
            AI detector
          </div>
          <div className="text-sm font-semibold text-ink leading-tight">
            DetectAI · v3.2
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <Lock className="h-3 w-3 text-[hsl(var(--peach-ink))]" />
        <span className="text-[10px] font-mono uppercase tracking-wider text-[hsl(var(--peach-ink))]">
          Black box
        </span>
      </div>
    </div>

    {/* paper area */}
    <div className="relative flex-1 p-5 bg-paper-warm/20">
      <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
        student.docx · 1,240 words
      </div>

      <div className="relative rounded-lg border border-border bg-card p-4 overflow-hidden min-h-[220px]">
        {/* scan line — phase 1 */}
        {phase === 1 && (
          <div
            className="absolute inset-x-0 h-8 pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(to bottom, transparent, hsl(var(--peach-ink) / 0.15), transparent)",
              animation: "pvdScanLine 1.6s ease-in-out infinite",
            }}
          />
        )}

        <div className="text-[11px] font-bold text-ink mb-2">
          Argentinië tussen herstel en achteruitgang
        </div>
        <div className="space-y-1.5">
          {/* lines — some get falsely flagged at phase 2+ */}
          <DetectorLine width="95%" flagged={phase >= 2} delay={0} />
          <DetectorLine width="92%" flagged={false} />
          <DetectorLine width="88%" flagged={phase >= 2} delay={150} />
          <DetectorLine width="94%" flagged={false} />
          <DetectorLine width="86%" flagged={phase >= 2} delay={300} />
          <DetectorLine width="90%" flagged={false} />
          <DetectorLine width="80%" flagged={phase >= 2} delay={450} />
        </div>

        {/* false-positive callout — phase 2 */}
        {phase >= 2 && (
          <div
            className="mt-3 rounded-md border border-[hsl(var(--peach-ink))]/30 bg-peach/40 px-2.5 py-1.5 flex items-start gap-1.5"
            style={{ animation: "pvdFadeUp 0.4s ease-out both" }}
          >
            <AlertTriangle className="h-3 w-3 text-[hsl(var(--peach-ink))] mt-0.5 shrink-0" />
            <div className="text-[10px] text-[hsl(var(--peach-ink))] leading-snug">
              <span className="font-semibold">3 sentences flagged.</span> Reason: not provided.
            </div>
          </div>
        )}
      </div>

      {/* score / verdict */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div
          className={`rounded-lg border p-3 transition-all ${
            phase >= 1 ? "border-[hsl(var(--peach-ink))]/40 bg-peach/30" : "border-border bg-card"
          }`}
        >
          <div className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">
            AI probability
          </div>
          <div
            className={`mt-1 font-mono text-2xl font-bold ${
              phase >= 1 ? "text-[hsl(var(--peach-ink))]" : "text-muted-foreground/40"
            }`}
            style={phase === 1 ? { animation: "pvdShake 0.4s ease-in-out 2" } : undefined}
          >
            {phase === 0 ? "—" : phase === 1 ? "73%" : "73%"}
          </div>
          <div className="mt-0.5 text-[9px] text-muted-foreground">No explanation</div>
        </div>
        <div
          className={`rounded-lg border p-3 transition-all ${
            phase >= 3
              ? "border-[hsl(var(--peach-ink))]/50 bg-peach/40"
              : "border-border bg-card"
          }`}
        >
          <div className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">
            Verdict
          </div>
          <div
            className={`mt-1 text-sm font-semibold ${
              phase >= 3 ? "text-[hsl(var(--peach-ink))]" : "text-muted-foreground/40"
            }`}
          >
            {phase >= 3 ? "Likely AI-generated" : "Pending…"}
          </div>
          <div className="mt-0.5 text-[9px] text-muted-foreground">
            {phase >= 3 ? "Action: confront student" : ""}
          </div>
        </div>
      </div>

      {/* limitations — phase 3 */}
      {phase >= 3 && (
        <div className="mt-3 space-y-1.5 pvd-fade">
          <Limitation text="Cannot show what was actually used" />
          <Limitation text="No prompts, no sources, no reasoning" />
          <Limitation text="Bias against non-native English writers" />
        </div>
      )}
    </div>
  </div>
);

const DetectorLine = ({
  width,
  flagged,
  delay = 0,
}: {
  width: string;
  flagged: boolean;
  delay?: number;
}) => (
  <div className="relative h-2">
    <div className="absolute inset-0 rounded bg-foreground/10" style={{ width }} />
    {flagged && (
      <div
        className="absolute inset-y-0 left-0 rounded bg-[hsl(var(--peach-ink))]/35 ring-1 ring-[hsl(var(--peach-ink))]/40"
        style={{
          width,
          animation: `pvdHighlight 0.6s ${delay}ms ease-out both`,
        }}
      />
    )}
  </div>
);

const Limitation = ({ text }: { text: string }) => (
  <div className="flex items-start gap-1.5 text-[10px] text-[hsl(var(--peach-ink))]">
    <X className="h-3 w-3 mt-0.5 shrink-0" />
    <span>{text}</span>
  </div>
);

/* ============= RIGHT — PAPIRO ============= */
const PapiroPanel = ({ phase }: { phase: Phase }) => (
  <div className="relative rounded-2xl border border-emerald-brand/30 bg-card shadow-card overflow-hidden flex flex-col">
    {/* header */}
    <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-gradient-to-b from-emerald-soft/60 to-transparent">
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-md bg-emerald-soft grid place-items-center">
          <FileText className="h-3.5 w-3.5 text-emerald-deep" />
        </div>
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-deep">
            Papiro
          </div>
          <div className="text-sm font-semibold text-ink leading-tight">
            Documented review
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <Unlock className="h-3 w-3 text-emerald-deep" />
        <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-deep">
          Transparent
        </span>
      </div>
    </div>

    {/* paper area */}
    <div className="relative flex-1 p-5 bg-paper-warm/20">
      <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
        student.docx · 1,240 words · 2 annotations
      </div>

      <div className="relative rounded-lg border border-border bg-card p-4 overflow-hidden min-h-[220px]">
        <div className="text-[11px] font-bold text-ink mb-2">
          Argentinië tussen herstel en achteruitgang
        </div>
        <div className="space-y-1.5 relative">
          <PapiroLine width="95%" />
          <PapiroLine width="92%" annotated={phase >= 1} delay={0} label="Prompt 1" />
          <PapiroLine width="88%" />
          <PapiroLine width="94%" />
          <PapiroLine width="86%" annotated={phase >= 1} delay={250} label="Prompt 2" />
          <PapiroLine width="90%" />
          <PapiroLine width="80%" />
        </div>

        {/* linked prompt callout — phase 2 */}
        {phase >= 2 && (
          <div
            className="mt-3 rounded-md border border-emerald-brand/30 bg-emerald-soft/40 px-2.5 py-2"
            style={{ animation: "pvdFadeUp 0.4s ease-out both" }}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <MessageSquare className="h-3 w-3 text-emerald-deep" />
              <span className="text-[9px] font-mono uppercase tracking-wider text-emerald-deep font-semibold">
                Linked prompt · ChatGPT
              </span>
            </div>
            <p className="text-[10px] text-foreground/80 leading-snug italic">
              "Geef me een tijdslijn van Milei's economisch beleid 2023–2025…"
            </p>
          </div>
        )}
      </div>

      {/* trust + reflection */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div
          className={`rounded-lg border p-3 transition-all ${
            phase >= 1
              ? "border-emerald-brand/40 bg-emerald-soft/40"
              : "border-border bg-card"
          }`}
        >
          <div className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">
            AI use, documented
          </div>
          <div
            className={`mt-1 font-mono text-2xl font-bold ${
              phase >= 1 ? "text-emerald-deep" : "text-muted-foreground/40"
            }`}
          >
            {phase === 0 ? "—" : "2 / 2"}
          </div>
          <div className="mt-0.5 text-[9px] text-muted-foreground">
            Prompts linked to text
          </div>
        </div>
        <div
          className={`rounded-lg border p-3 transition-all ${
            phase >= 3
              ? "border-emerald-brand/50 bg-emerald-soft/50"
              : "border-border bg-card"
          }`}
        >
          <div className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">
            Outcome
          </div>
          <div
            className={`mt-1 text-sm font-semibold ${
              phase >= 3 ? "text-emerald-deep" : "text-muted-foreground/40"
            }`}
          >
            {phase >= 3 ? "Ready for review" : "Pending…"}
          </div>
          <div className="mt-0.5 text-[9px] text-muted-foreground">
            {phase >= 3 ? "Action: discuss with nuance" : ""}
          </div>
        </div>
      </div>

      {/* features — phase 3 */}
      {phase >= 3 && (
        <div className="mt-3 space-y-1.5 pvd-fade">
          <Feature text="Every AI moment is shown and explained" />
          <Feature text="Student reflection attached to each prompt" />
          <Feature text="Fair for every writer, every language" />
        </div>
      )}
    </div>
  </div>
);

const PapiroLine = ({
  width,
  annotated,
  delay = 0,
  label,
}: {
  width: string;
  annotated?: boolean;
  delay?: number;
  label?: string;
}) => (
  <div className="relative h-2">
    <div className="absolute inset-0 rounded bg-foreground/10" style={{ width }} />
    {annotated && (
      <>
        <div
          className="absolute inset-y-0 left-0 rounded bg-emerald-soft ring-1 ring-emerald-brand/40"
          style={{
            width,
            animation: `pvdHighlight 0.6s ${delay}ms ease-out both`,
          }}
        />
        {label && (
          <span
            className="absolute -right-1 -top-3 text-[8px] font-mono uppercase tracking-wider text-emerald-deep bg-emerald-soft border border-emerald-brand/30 px-1 rounded"
            style={{ animation: `pvdFadeUp 0.4s ${delay + 200}ms ease-out both` }}
          >
            {label}
          </span>
        )}
      </>
    )}
  </div>
);

const Feature = ({ text }: { text: string }) => (
  <div className="flex items-start gap-1.5 text-[10px] text-emerald-deep">
    <Check className="h-3 w-3 mt-0.5 shrink-0" />
    <span>{text}</span>
  </div>
);

/* ============= FEATURE COMPARISON COLUMNS ============= */
const FeatureColumn = ({
  tone,
  title,
  icon: Icon,
  items,
}: {
  tone: "peach" | "emerald";
  title: string;
  icon: typeof Sparkles;
  items: { label: string; supported: boolean; note?: string }[];
}) => {
  const isEmerald = tone === "emerald";
  return (
    <div
      className={`rounded-2xl border p-6 ${
        isEmerald
          ? "border-emerald-brand/30 bg-emerald-soft/20"
          : "border-[hsl(var(--peach-ink))]/25 bg-peach/20"
      }`}
    >
      <div className="flex items-center gap-3 mb-5">
        <div
          className={`h-10 w-10 rounded-xl grid place-items-center ${
            isEmerald
              ? "bg-emerald-soft text-emerald-deep"
              : "bg-peach text-[hsl(var(--peach-ink))]"
          }`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="display text-xl text-ink">{title}</h3>
      </div>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li
            key={item.label}
            className="flex items-start gap-3 rounded-lg bg-card border border-border px-3 py-2.5"
          >
            <span
              className={`shrink-0 h-5 w-5 rounded-full grid place-items-center ${
                item.supported
                  ? "bg-emerald-brand text-white"
                  : "bg-peach text-[hsl(var(--peach-ink))]"
              }`}
            >
              {item.supported ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
            </span>
            <div className="min-w-0">
              <div className="text-sm text-foreground/90 leading-snug">{item.label}</div>
              {item.note && (
                <div className="text-[11px] text-muted-foreground mt-0.5">{item.note}</div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
