import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AppChrome } from "@/components/workflow/AppChrome";
import {
  FileText,
  MessageSquare,
  Highlighter,
  Sparkles,
  Send,
  Paperclip,
  Plus,
  Check,
  ChevronRight,
} from "lucide-react";

const steps = [
  { id: "assignment", n: "01", icon: FileText, label: "Assignment", desc: "Load task and key details" },
  { id: "sources", n: "02", icon: MessageSquare, label: "Sources", desc: "Attach AI conversations" },
  { id: "annotate", n: "03", icon: Highlighter, label: "Annotate", desc: "Mark where AI was used" },
  { id: "reflect", n: "04", icon: Sparkles, label: "Reflect", desc: "Explain your choices" },
  { id: "submit", n: "05", icon: Send, label: "Review & submit", desc: "Send a review-ready record" },
] as const;

type StepId = (typeof steps)[number]["id"];

export default function StudentWorkflow() {
  const [active, setActive] = useState<StepId>("assignment");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border bg-warm-mesh">
          <div className="absolute inset-0 grid-lines opacity-40" aria-hidden />
          <div className="container-page relative py-16 md:py-20">
            <p className="eyebrow">Workflow · Student</p>
            <h1 className="display mt-4 text-4xl md:text-5xl leading-[1.05] text-foreground max-w-3xl">
              Hand in your work <em className="italic text-emerald-deep">with</em> its context.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              A calm, five-step flow to capture how you actually wrote — sources, AI prompts, decisions, and reflection — alongside the work itself.
            </p>
          </div>
        </section>

        {/* Stepper */}
        <section className="container-page pt-12">
          <div className="relative">
            <div className="absolute left-0 right-0 top-7 h-px bg-gradient-to-r from-transparent via-border to-transparent hidden md:block" />
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {steps.map((s) => {
                const isActive = active === s.id;
                const Icon = s.icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActive(s.id)}
                    className="group text-left relative"
                  >
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

        {/* Mock */}
        <section className="container-page py-12">
          <AppChrome
            role="student"
            userName="Avery Lane"
            userEmail="avery@papiro.test"
            activeTab="My work"
            tabs={["My work", "Assignments", "Sources"]}
          >
            <div className="px-5 pt-5 pb-3 flex items-start justify-between gap-3 border-b border-border">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">POL-204-A1</div>
                <div className="text-base font-semibold mt-0.5">Essay — The role of NGOs in climate policy</div>
                <div className="text-[11px] text-muted-foreground">Due 27-03-2026 · 1500 words · Draft saved 2m ago</div>
              </div>
              <div className="hidden sm:flex items-center gap-2 shrink-0">
                <span className="text-[10px] rounded-full border border-border px-2.5 py-1 text-muted-foreground">Autosave on</span>
                <span className="text-[10px] rounded-full bg-emerald-soft text-emerald-deep px-2.5 py-1 font-medium">Step {steps.find((s) => s.id === active)?.n}</span>
              </div>
            </div>

            <div className="p-5 min-h-[420px]">
              {active === "assignment" && <AssignmentPanel onNext={() => setActive("sources")} />}
              {active === "sources" && <SourcesPanel onNext={() => setActive("annotate")} />}
              {active === "annotate" && <AnnotatePanel onNext={() => setActive("reflect")} />}
              {active === "reflect" && <ReflectPanel onNext={() => setActive("submit")} />}
              {active === "submit" && <SubmitPanel />}
            </div>
          </AppChrome>

          <p className="mt-6 text-xs text-muted-foreground text-center font-mono">
            Click a step above to explore the workflow.
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

const AssignmentPanel = ({ onNext }: { onNext: () => void }) => (
  <div className="grid md:grid-cols-[1.4fr_1fr] gap-5">
    <div className="rounded-xl border border-border p-5 bg-paper-warm/30">
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Brief</div>
      <h3 className="display text-xl mt-1">The role of NGOs in shaping post-Paris climate policy</h3>
      <p className="mt-3 text-sm text-foreground/80 leading-relaxed">
        Write a 1500-word essay analysing how non-governmental organisations have influenced national climate commitments since 2015. Use at least three peer-reviewed sources.
      </p>
      <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
        <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-emerald-deep mt-0.5" /> Argument with clear thesis</li>
        <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-emerald-deep mt-0.5" /> Cited evidence (APA)</li>
        <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-emerald-deep mt-0.5" /> Reflection on AI use required</li>
      </ul>
    </div>
    <div className="rounded-xl border border-border p-5">
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">AI policy</div>
      <div className="mt-2 inline-flex items-center gap-1.5 text-xs">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-brand" />
        <span className="font-semibold text-emerald-deep">Open with disclosure</span>
      </div>
      <p className="mt-2 text-xs text-foreground/75 leading-relaxed">
        AI tools are allowed for drafting, brainstorming and editing. You must attach the conversations and annotate where AI shaped your text.
      </p>
      <div className="mt-4 flex justify-end">
        <NextButton onClick={onNext} label="Start writing" />
      </div>
    </div>
  </div>
);

const SourcesPanel = ({ onNext }: { onNext: () => void }) => (
  <div className="grid md:grid-cols-[1fr_1.2fr] gap-5">
    <div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Attached sources</div>
      <div className="mt-3 space-y-2">
        {[
          { tool: "ChatGPT", title: "Brainstorm: NGO influence post-2015", turns: 14, tone: "emerald" },
          { tool: "Claude", title: "Rewrite intro paragraph", turns: 6, tone: "sky" },
          { tool: "Perplexity", title: "Find 3 peer-reviewed sources", turns: 4, tone: "amber" },
        ].map((s) => (
          <div key={s.title} className="rounded-lg border border-border p-3 flex items-start gap-3">
            <span
              className={`shrink-0 h-8 w-8 rounded-md grid place-items-center text-[10px] font-mono font-semibold ${
                s.tone === "emerald" ? "bg-emerald-soft text-emerald-deep" : s.tone === "sky" ? "bg-sky-soft text-sky-ink" : "bg-amber-soft text-amber-ink"
              }`}
            >
              {s.tool.slice(0, 2).toUpperCase()}
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold truncate">{s.title}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{s.tool} · {s.turns} turns</div>
            </div>
            <Check className="h-4 w-4 text-emerald-deep shrink-0" />
          </div>
        ))}
        <button className="w-full rounded-lg border border-dashed border-border p-3 text-xs text-muted-foreground hover:border-emerald-brand/50 hover:text-emerald-deep transition-colors inline-flex items-center justify-center gap-2">
          <Plus className="h-3.5 w-3.5" /> Attach another conversation
        </button>
      </div>
    </div>
    <div className="rounded-xl border border-border bg-paper-warm/30 p-5">
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Preview · ChatGPT</div>
      <div className="mt-3 space-y-3 text-xs">
        <div>
          <div className="text-[10px] font-mono text-emerald-deep">YOU</div>
          <p className="text-foreground/85 mt-0.5">Help me brainstorm an angle on NGO influence on climate policy after Paris 2015.</p>
        </div>
        <div className="rounded-lg bg-card border border-border p-3">
          <div className="text-[10px] font-mono text-muted-foreground">CHATGPT</div>
          <p className="text-foreground/80 mt-0.5">A few angles you could explore: (1) shadow reporting and accountability, (2) coalition lobbying at COPs, (3) litigation as a policy tool…</p>
        </div>
        <div>
          <div className="text-[10px] font-mono text-emerald-deep">YOU</div>
          <p className="text-foreground/85 mt-0.5">I like the litigation angle. Examples?</p>
        </div>
      </div>
      <div className="mt-5 flex justify-end">
        <NextButton onClick={onNext} label="Continue to annotate" />
      </div>
    </div>
  </div>
);

const AnnotatePanel = ({ onNext }: { onNext: () => void }) => (
  <div className="grid md:grid-cols-[1.4fr_1fr] gap-5">
    <div className="rounded-xl border border-border bg-card p-5 relative">
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Draft · page 2 of 4</div>
      <div className="mt-3 space-y-2.5 text-sm leading-relaxed text-foreground/85">
        <p>NGOs have moved from advocacy on the sidelines to active participants in shaping national climate commitments.</p>
        <p>
          One of the clearest shifts has been the use of{" "}
          <span className="bg-amber-soft/80 text-amber-ink px-1 rounded relative">
            strategic litigation as a policy lever, with cases like Urgenda v. The Netherlands setting binding emission targets through the courts
            <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-amber-ink text-white text-[9px] font-mono grid place-items-center">3</span>
          </span>
          .
        </p>
        <p>
          Beyond litigation,{" "}
          <span className="bg-emerald-soft/90 text-emerald-deep px-1 rounded relative">
            shadow reporting has given NGOs a structural role in the transparency mechanisms of the Paris Agreement
            <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-emerald-deep text-white text-[9px] font-mono grid place-items-center">1</span>
          </span>
          .
        </p>
        <p>This blend of legal pressure and informational accountability has reshaped how states approach their NDCs.</p>
      </div>
    </div>
    <div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Annotations</div>
      <div className="mt-3 space-y-2">
        <AnnotationCard n={1} tone="emerald" tool="ChatGPT" note="Suggested this framing — I rewrote in my own words." />
        <AnnotationCard n={2} tone="sky" tool="Claude" note="Asked Claude to tighten this sentence for flow." />
        <AnnotationCard n={3} tone="amber" tool="ChatGPT" note="AI surfaced the Urgenda case — I verified and added it." />
      </div>
      <div className="mt-4 rounded-lg border border-dashed border-border p-3 text-[11px] text-muted-foreground">
        Drag across any text to add a new annotation.
      </div>
      <div className="mt-4 flex justify-end">
        <NextButton onClick={onNext} label="Write reflection" />
      </div>
    </div>
  </div>
);

const AnnotationCard = ({ n, tone, tool, note }: { n: number; tone: "emerald" | "sky" | "amber"; tool: string; note: string }) => {
  const styles =
    tone === "emerald"
      ? "bg-emerald-soft text-emerald-deep"
      : tone === "sky"
      ? "bg-sky-soft text-sky-ink"
      : "bg-amber-soft text-amber-ink";
  return (
    <div className="rounded-lg border border-border p-3">
      <div className="flex items-center gap-2">
        <span className={`h-5 w-5 rounded-full grid place-items-center text-[10px] font-mono font-semibold ${styles}`}>{n}</span>
        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{tool}</span>
      </div>
      <p className="mt-1.5 text-xs text-foreground/80 leading-snug">{note}</p>
    </div>
  );
};

const ReflectPanel = ({ onNext }: { onNext: () => void }) => (
  <div className="grid md:grid-cols-[1fr_1fr] gap-5">
    <div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Reflection prompts</div>
      <div className="mt-3 space-y-2.5 text-sm">
        {[
          "Where did AI most shape your thinking, and where did you push back?",
          "Which choices in your draft are most clearly your own?",
          "What did you verify before trusting an AI suggestion?",
        ].map((p) => (
          <div key={p} className="rounded-lg border border-border p-3 text-xs text-foreground/80 leading-relaxed">
            {p}
          </div>
        ))}
      </div>
    </div>
    <div className="rounded-xl border border-border bg-paper-warm/30 p-5 flex flex-col">
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Your reflection</div>
      <div className="mt-3 flex-1 text-xs leading-relaxed text-foreground/85 space-y-2">
        <p>I used ChatGPT mostly to find an angle — the litigation framing came from there. I verified Urgenda independently in our library database before quoting it.</p>
        <p>Claude helped me tighten the intro, but I rewrote the conclusion entirely on my own because the AI version felt too generic.</p>
        <p className="text-muted-foreground italic">142 / 200 words</p>
      </div>
      <div className="mt-4 flex justify-end">
        <NextButton onClick={onNext} label="Review submission" />
      </div>
    </div>
  </div>
);

const SubmitPanel = () => (
  <div className="grid md:grid-cols-[1.1fr_1fr] gap-5">
    <div className="rounded-xl border border-border p-5">
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Submission summary</div>
      <h3 className="display text-xl mt-1">Ready to send</h3>
      <ul className="mt-4 space-y-2.5 text-sm">
        {[
          ["Draft", "1487 words · 4 pages"],
          ["Sources", "3 AI conversations attached"],
          ["Annotations", "7 marked passages"],
          ["Reflection", "142 words"],
        ].map(([k, v]) => (
          <li key={k} className="flex items-center justify-between border-b border-border py-2 last:border-0">
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{k}</span>
            <span className="text-sm font-medium">{v}</span>
          </li>
        ))}
      </ul>
    </div>
    <div className="rounded-xl bg-foreground text-background p-5 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="relative">
        <div className="text-[10px] font-mono uppercase tracking-widest text-background/60">Sent to</div>
        <div className="mt-1 text-base font-semibold">Dr. Mira Solberg</div>
        <div className="text-xs text-background/70">POL-204 · Spring 2026</div>
        <div className="mt-5 rounded-lg bg-background/10 border border-background/15 p-3 text-xs text-background/85 leading-relaxed">
          Your work, sources, annotations and reflection will be sent together as one review-ready record.
        </div>
        <button className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full bg-emerald-brand text-white px-4 py-2.5 text-sm font-medium">
          <Paperclip className="h-4 w-4" /> Submit assignment
        </button>
      </div>
    </div>
  </div>
);
