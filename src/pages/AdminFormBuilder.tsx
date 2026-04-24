import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AppChrome } from "@/components/workflow/AppChrome";
import {
  LayoutTemplate,
  Blocks,
  SlidersHorizontal,
  Eye,
  Send,
  ChevronRight,
  Type,
  AlignLeft,
  Sliders,
  ListChecks,
  CircleDot,
  Calendar,
  Upload,
  Heading1,
  GripVertical,
  Plus,
  Trash2,
  Copy,
  ArrowUp,
  ArrowDown,
  Check,
  Settings2,
} from "lucide-react";

const steps = [
  { id: "start", n: "01", icon: LayoutTemplate, label: "Start", desc: "Blank or from template" },
  { id: "build", n: "02", icon: Blocks, label: "Build", desc: "Drag in components" },
  { id: "configure", n: "03", icon: SlidersHorizontal, label: "Configure", desc: "Refine each question" },
  { id: "preview", n: "04", icon: Eye, label: "Preview", desc: "See it as a student" },
  { id: "publish", n: "05", icon: Send, label: "Publish", desc: "Roll out to courses" },
] as const;

type StepId = (typeof steps)[number]["id"];

type FieldType =
  | "short"
  | "long"
  | "score"
  | "checklist"
  | "multiple"
  | "date"
  | "upload"
  | "section"
  | "info";

type Field = {
  id: string;
  type: FieldType;
  label: string;
  help?: string;
  required?: boolean;
  options?: string[];
};

const initialFields: Field[] = [
  { id: "f1", type: "section", label: "About your AI use" },
  {
    id: "f2",
    type: "long",
    label: "Where did AI most shape your thinking?",
    help: "Be specific — point to a paragraph or a decision.",
    required: true,
  },
  {
    id: "f3",
    type: "checklist",
    label: "Which AI tools did you use?",
    options: ["ChatGPT", "Claude", "Perplexity", "Copilot", "Other"],
    required: true,
  },
  {
    id: "f4",
    type: "score",
    label: "How original is your final argument? (1 = mostly AI, 5 = fully my own)",
    required: true,
  },
  { id: "f5", type: "section", label: "Verification & sources" },
  {
    id: "f6",
    type: "multiple",
    label: "Did you verify AI-suggested sources independently?",
    options: ["Yes, every source", "Yes, most sources", "A few", "No"],
    required: true,
  },
  {
    id: "f7",
    type: "upload",
    label: "Attach your annotated draft (optional)",
  },
];

export default function AdminFormBuilder() {
  const [active, setActive] = useState<StepId>("build");
  const [fields, setFields] = useState<Field[]>(initialFields);
  const [selectedId, setSelectedId] = useState<string>("f2");

  const selected = fields.find((f) => f.id === selectedId) ?? fields[0];

  const addField = (type: FieldType) => {
    const id = `f${Date.now()}`;
    const base: Field = {
      id,
      type,
      label: defaultLabel(type),
      required: false,
      ...(type === "checklist" || type === "multiple"
        ? { options: ["Option 1", "Option 2", "Option 3"] }
        : {}),
    };
    setFields((prev) => [...prev, base]);
    setSelectedId(id);
  };

  const move = (id: string, dir: -1 | 1) => {
    setFields((prev) => {
      const idx = prev.findIndex((f) => f.id === id);
      if (idx === -1) return prev;
      const next = [...prev];
      const target = idx + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  };

  const remove = (id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
    if (selectedId === id && fields.length > 1) {
      const idx = fields.findIndex((f) => f.id === id);
      const fallback = fields[idx === 0 ? 1 : idx - 1];
      if (fallback) setSelectedId(fallback.id);
    }
  };

  const duplicate = (id: string) => {
    setFields((prev) => {
      const idx = prev.findIndex((f) => f.id === id);
      if (idx === -1) return prev;
      const copy = { ...prev[idx], id: `f${Date.now()}` };
      const next = [...prev];
      next.splice(idx + 1, 0, copy);
      return next;
    });
  };

  const update = (id: string, patch: Partial<Field>) => {
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border bg-warm-mesh">
          <div className="absolute inset-0 grid-lines opacity-40" aria-hidden />
          <div className="container-page relative py-16 md:py-20">
            <p className="eyebrow">Workflow · Faculty admin</p>
            <h1 className="display mt-4 text-4xl md:text-5xl leading-[1.05] text-foreground max-w-3xl">
              Build reflection forms <em className="italic text-emerald-deep">your way</em>.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              A drag-and-drop builder for faculty admins. Start blank or from a template, then add the
              fields that match your discipline's policy on AI disclosure.
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
                      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                        Step {s.n}
                      </div>
                      <div className={`text-sm font-semibold mt-0.5 ${isActive ? "text-emerald-deep" : ""}`}>
                        {s.label}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 leading-snug hidden md:block">
                        {s.desc}
                      </div>
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
            role="teacher"
            userName="Prof. Helena Costa"
            userEmail="admin@papiro.test"
            activeTab="Form builder"
            tabs={["Forms", "Templates", "Form builder"]}
          >
            <div className="px-5 pt-5 pb-3 flex items-start justify-between gap-3 border-b border-border">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  Faculty of Humanities · Reflection forms
                </div>
                <div className="text-base font-semibold mt-0.5">
                  Reflection on AI use — Essay assignments
                </div>
                <div className="text-[11px] text-muted-foreground">
                  Draft · autosaved 1m ago · {fields.length} components
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2 shrink-0">
                <span className="text-[10px] rounded-full border border-border px-2.5 py-1 text-muted-foreground">
                  v0.3 draft
                </span>
                <span className="text-[10px] rounded-full bg-emerald-soft text-emerald-deep px-2.5 py-1 font-medium">
                  Step {steps.find((s) => s.id === active)?.n}
                </span>
              </div>
            </div>

            <div className="p-5 min-h-[520px]">
              {active === "start" && <StartPanel onNext={() => setActive("build")} />}
              {active === "build" && (
                <BuildPanel
                  fields={fields}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                  onAdd={addField}
                  onMove={move}
                  onRemove={remove}
                  onDuplicate={duplicate}
                  onNext={() => setActive("configure")}
                />
              )}
              {active === "configure" && (
                <ConfigurePanel
                  field={selected}
                  onUpdate={(patch) => update(selected.id, patch)}
                  onNext={() => setActive("preview")}
                />
              )}
              {active === "preview" && (
                <PreviewPanel fields={fields} onNext={() => setActive("publish")} />
              )}
              {active === "publish" && <PublishPanel fields={fields} />}
            </div>
          </AppChrome>

          <p className="mt-6 text-xs text-muted-foreground text-center font-mono">
            Click a step above to explore the form builder.
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

/* ---------------- Component library ---------------- */

const componentGroups: { title: string; items: { type: FieldType; label: string; icon: typeof Type; desc: string }[] }[] = [
  {
    title: "Inputs",
    items: [
      { type: "short", label: "Short answer", icon: Type, desc: "One-line text" },
      { type: "long", label: "Long answer", icon: AlignLeft, desc: "Paragraph text" },
      { type: "date", label: "Date", icon: Calendar, desc: "Date picker" },
      { type: "upload", label: "Upload", icon: Upload, desc: "File attachment" },
    ],
  },
  {
    title: "Choice",
    items: [
      { type: "score", label: "Score 1–5", icon: Sliders, desc: "Slider rating" },
      { type: "checklist", label: "Checklist", icon: ListChecks, desc: "Multi-select" },
      { type: "multiple", label: "Multiple choice", icon: CircleDot, desc: "Single select" },
    ],
  },
  {
    title: "Layout",
    items: [
      { type: "section", label: "Section title", icon: Heading1, desc: "Group fields" },
      { type: "info", label: "Info text", icon: AlignLeft, desc: "Explanation block" },
    ],
  },
];

function defaultLabel(type: FieldType) {
  switch (type) {
    case "short": return "Short answer question";
    case "long": return "Long answer question";
    case "score": return "Rate from 1 to 5";
    case "checklist": return "Select all that apply";
    case "multiple": return "Pick one option";
    case "date": return "Select a date";
    case "upload": return "Upload a file";
    case "section": return "New section";
    case "info": return "Add a short explanation for students.";
  }
}

function typeIcon(type: FieldType) {
  const map: Record<FieldType, typeof Type> = {
    short: Type, long: AlignLeft, score: Sliders, checklist: ListChecks,
    multiple: CircleDot, date: Calendar, upload: Upload, section: Heading1, info: AlignLeft,
  };
  return map[type];
}

/* ---------------- Step 01 — Start ---------------- */

const templates = [
  {
    id: "blank",
    name: "Blank form",
    desc: "Start from scratch and add components yourself.",
    tag: "Empty",
    items: 0,
  },
  {
    id: "essay",
    name: "Essay reflection",
    desc: "AI disclosure, verification and originality for written work.",
    tag: "Humanities",
    items: 7,
  },
  {
    id: "code",
    name: "Code project review",
    desc: "Tools used, prompt logs, debugging and licence checks.",
    tag: "Engineering",
    items: 9,
  },
  {
    id: "thesis",
    name: "Thesis disclosure",
    desc: "Long-form reflection with sectioned methodology questions.",
    tag: "Graduate",
    items: 12,
  },
];

const StartPanel = ({ onNext }: { onNext: () => void }) => (
  <div>
    <div className="flex items-start justify-between gap-3 mb-5">
      <div>
        <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">New form</div>
        <div className="text-base font-semibold mt-0.5">Choose a starting point</div>
        <div className="text-[11px] text-muted-foreground">Templates are editable — they're just a head start.</div>
      </div>
      <NextButton onClick={onNext} label="Open in builder" />
    </div>

    <div className="grid sm:grid-cols-2 gap-3">
      {templates.map((t, i) => (
        <button
          key={t.id}
          onClick={onNext}
          className={`text-left rounded-xl border p-4 transition-all hover:border-emerald-brand/50 hover:shadow-soft ${
            i === 1 ? "border-emerald-brand bg-emerald-soft/40" : "border-border bg-card"
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-sm font-semibold">{t.name}</div>
              <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{t.desc}</div>
            </div>
            <span className="shrink-0 text-[9px] font-mono uppercase tracking-widest rounded-full px-2 py-0.5 bg-paper-warm/60 text-foreground/70">
              {t.tag}
            </span>
          </div>
          <div className="mt-3 text-[10px] font-mono text-muted-foreground">
            {t.items === 0 ? "0 components · blank canvas" : `${t.items} components · ready to edit`}
          </div>
        </button>
      ))}
    </div>
  </div>
);

/* ---------------- Step 02 — Build ---------------- */

interface BuildProps {
  fields: Field[];
  selectedId: string;
  onSelect: (id: string) => void;
  onAdd: (type: FieldType) => void;
  onMove: (id: string, dir: -1 | 1) => void;
  onRemove: (id: string) => void;
  onDuplicate: (id: string) => void;
  onNext: () => void;
}

const BuildPanel = ({
  fields,
  selectedId,
  onSelect,
  onAdd,
  onMove,
  onRemove,
  onDuplicate,
  onNext,
}: BuildProps) => (
  <div className="grid lg:grid-cols-[220px_1fr_240px] gap-4">
    {/* Library */}
    <aside>
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
        Component library
      </div>
      <div className="space-y-4">
        {componentGroups.map((g) => (
          <div key={g.title}>
            <div className="text-[10px] font-semibold text-foreground/60 mb-1.5 px-1">{g.title}</div>
            <div className="space-y-1.5">
              {g.items.map((it) => {
                const Icon = it.icon;
                return (
                  <button
                    key={it.type}
                    onClick={() => onAdd(it.type)}
                    className="w-full flex items-center gap-2 rounded-lg border border-border bg-card px-2.5 py-2 text-left hover:border-emerald-brand/50 hover:bg-emerald-soft/30 transition-colors group"
                    title={it.desc}
                  >
                    <span className="h-7 w-7 rounded-md bg-paper-warm/60 grid place-items-center shrink-0 group-hover:bg-emerald-soft">
                      <Icon className="h-3.5 w-3.5 text-foreground/70 group-hover:text-emerald-deep" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-[11px] font-medium leading-tight truncate">{it.label}</div>
                      <div className="text-[9px] text-muted-foreground leading-tight truncate">
                        {it.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>

    {/* Canvas */}
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          Form canvas · {fields.length} components
        </div>
        <NextButton onClick={onNext} label="Configure fields" />
      </div>
      <div className="rounded-xl border border-border bg-paper-warm/30 p-3 space-y-2 min-h-[440px]">
        {fields.map((f) => (
          <CanvasItem
            key={f.id}
            field={f}
            selected={f.id === selectedId}
            onSelect={() => onSelect(f.id)}
            onUp={() => onMove(f.id, -1)}
            onDown={() => onMove(f.id, 1)}
            onRemove={() => onRemove(f.id)}
            onDuplicate={() => onDuplicate(f.id)}
          />
        ))}
        <div className="rounded-lg border border-dashed border-border p-4 text-center text-[11px] text-muted-foreground">
          <Plus className="h-3.5 w-3.5 inline-block mr-1" /> Drop a component here, or click one in the
          library
        </div>
      </div>
    </div>

    {/* Mini properties hint */}
    <aside className="hidden lg:block">
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
        Selected
      </div>
      <SelectedSummary
        field={fields.find((f) => f.id === selectedId) ?? fields[0]}
        onConfigure={onNext}
      />
    </aside>
  </div>
);

const CanvasItem = ({
  field,
  selected,
  onSelect,
  onUp,
  onDown,
  onRemove,
  onDuplicate,
}: {
  field: Field;
  selected: boolean;
  onSelect: () => void;
  onUp: () => void;
  onDown: () => void;
  onRemove: () => void;
  onDuplicate: () => void;
}) => {
  const Icon = typeIcon(field.type);
  return (
    <div
      onClick={onSelect}
      className={`group relative rounded-lg border bg-card px-3 py-2.5 cursor-pointer transition-all ${
        selected
          ? "border-emerald-brand shadow-soft ring-1 ring-emerald-brand/30"
          : "border-border hover:border-emerald-brand/40"
      }`}
    >
      <div className="flex items-start gap-2.5">
        <span className="mt-0.5 text-foreground/30 cursor-grab" title="Drag to reorder">
          <GripVertical className="h-4 w-4" />
        </span>
        <span
          className={`shrink-0 h-7 w-7 rounded-md grid place-items-center ${
            selected ? "bg-emerald-soft text-emerald-deep" : "bg-paper-warm/60 text-foreground/70"
          }`}
        >
          <Icon className="h-3.5 w-3.5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
              {labelForType(field.type)}
            </span>
            {field.required && (
              <span className="text-[9px] font-mono text-amber-ink">required</span>
            )}
          </div>
          <div
            className={`mt-0.5 text-sm leading-snug ${
              field.type === "section" ? "display font-semibold" : "font-medium"
            }`}
          >
            {field.label}
          </div>
          <FieldPreview field={field} compact />
        </div>
        <div
          className={`flex items-center gap-0.5 transition-opacity ${
            selected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <IconBtn onClick={onUp} title="Move up"><ArrowUp className="h-3 w-3" /></IconBtn>
          <IconBtn onClick={onDown} title="Move down"><ArrowDown className="h-3 w-3" /></IconBtn>
          <IconBtn onClick={onDuplicate} title="Duplicate"><Copy className="h-3 w-3" /></IconBtn>
          <IconBtn onClick={onRemove} title="Delete"><Trash2 className="h-3 w-3" /></IconBtn>
        </div>
      </div>
    </div>
  );
};

const IconBtn = ({
  onClick,
  title,
  children,
}: {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    title={title}
    className="h-6 w-6 rounded-md grid place-items-center text-foreground/60 hover:bg-muted hover:text-foreground transition-colors"
  >
    {children}
  </button>
);

function labelForType(t: FieldType) {
  return {
    short: "Short answer",
    long: "Long answer",
    score: "Score 1–5",
    checklist: "Checklist",
    multiple: "Multiple choice",
    date: "Date",
    upload: "Upload",
    section: "Section",
    info: "Info text",
  }[t];
}

const FieldPreview = ({ field, compact = false }: { field: Field; compact?: boolean }) => {
  const cls = compact ? "mt-1.5" : "mt-2";
  switch (field.type) {
    case "short":
      return (
        <div className={`${cls} h-7 rounded-md border border-dashed border-border bg-background/60`} />
      );
    case "long":
      return (
        <div className={`${cls} h-12 rounded-md border border-dashed border-border bg-background/60`} />
      );
    case "score":
      return (
        <div className={`${cls} flex items-center gap-1.5`}>
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              className={`h-5 w-5 rounded-full text-[10px] font-mono grid place-items-center border ${
                n === 3
                  ? "bg-emerald-brand text-white border-emerald-brand"
                  : "border-border text-foreground/60"
              }`}
            >
              {n}
            </span>
          ))}
        </div>
      );
    case "checklist":
      return (
        <div className={`${cls} space-y-1`}>
          {(field.options ?? []).slice(0, 3).map((o, i) => (
            <div key={o} className="flex items-center gap-1.5 text-[11px] text-foreground/75">
              <span
                className={`h-3 w-3 rounded-sm border ${
                  i === 0 ? "bg-emerald-brand border-emerald-brand" : "border-border"
                } grid place-items-center`}
              >
                {i === 0 && <Check className="h-2 w-2 text-white" />}
              </span>
              {o}
            </div>
          ))}
        </div>
      );
    case "multiple":
      return (
        <div className={`${cls} space-y-1`}>
          {(field.options ?? []).slice(0, 3).map((o, i) => (
            <div key={o} className="flex items-center gap-1.5 text-[11px] text-foreground/75">
              <span
                className={`h-3 w-3 rounded-full border ${
                  i === 0 ? "border-emerald-brand" : "border-border"
                } grid place-items-center`}
              >
                {i === 0 && <span className="h-1.5 w-1.5 rounded-full bg-emerald-brand" />}
              </span>
              {o}
            </div>
          ))}
        </div>
      );
    case "date":
      return (
        <div className={`${cls} inline-flex items-center gap-1.5 rounded-md border border-dashed border-border px-2 py-1 text-[11px] text-muted-foreground`}>
          <Calendar className="h-3 w-3" /> dd / mm / yyyy
        </div>
      );
    case "upload":
      return (
        <div className={`${cls} rounded-md border border-dashed border-border px-2 py-2 text-[11px] text-muted-foreground inline-flex items-center gap-1.5`}>
          <Upload className="h-3 w-3" /> Drop a file or click to browse
        </div>
      );
    case "info":
      return (
        <div className={`${cls} text-[11px] italic text-muted-foreground leading-snug`}>
          {field.help ?? "Information shown to students above the next question."}
        </div>
      );
    case "section":
      return null;
  }
};

const SelectedSummary = ({
  field,
  onConfigure,
}: {
  field: Field;
  onConfigure: () => void;
}) => {
  const Icon = typeIcon(field.type);
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <div className="flex items-center gap-2">
        <span className="h-7 w-7 rounded-md bg-emerald-soft text-emerald-deep grid place-items-center">
          <Icon className="h-3.5 w-3.5" />
        </span>
        <div className="min-w-0">
          <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
            {labelForType(field.type)}
          </div>
          <div className="text-[11px] font-semibold truncate">{field.label}</div>
        </div>
      </div>
      <ul className="mt-3 space-y-1.5 text-[11px] text-foreground/80">
        <li className="flex items-center justify-between">
          <span className="text-muted-foreground">Required</span>
          <span className="font-mono">{field.required ? "Yes" : "No"}</span>
        </li>
        {field.options && (
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Options</span>
            <span className="font-mono">{field.options.length}</span>
          </li>
        )}
        {field.help && (
          <li className="text-[10px] text-muted-foreground italic leading-snug">
            "{field.help}"
          </li>
        )}
      </ul>
      <button
        onClick={onConfigure}
        className="mt-3 w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-foreground text-background px-3 py-1.5 text-[11px] font-medium"
      >
        <Settings2 className="h-3 w-3" /> Configure
      </button>
    </div>
  );
};

/* ---------------- Step 03 — Configure ---------------- */

const ConfigurePanel = ({
  field,
  onUpdate,
  onNext,
}: {
  field: Field;
  onUpdate: (patch: Partial<Field>) => void;
  onNext: () => void;
}) => {
  const Icon = typeIcon(field.type);
  return (
    <div className="grid md:grid-cols-[1fr_1.1fr] gap-5">
      <div className="rounded-xl border border-border p-5 bg-paper-warm/30">
        <div className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-md bg-emerald-soft text-emerald-deep grid place-items-center">
            <Icon className="h-4 w-4" />
          </span>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              Editing · {labelForType(field.type)}
            </div>
            <div className="text-sm font-semibold">{field.label}</div>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <FormField label="Question text">
            <input
              value={field.label}
              onChange={(e) => onUpdate({ label: e.target.value })}
              className="w-full rounded-md border border-input bg-card px-2.5 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </FormField>

          <FormField label="Helper text (optional)">
            <textarea
              value={field.help ?? ""}
              onChange={(e) => onUpdate({ help: e.target.value })}
              rows={2}
              placeholder="Shown under the question to guide students."
              className="w-full rounded-md border border-input bg-card px-2.5 py-1.5 text-xs leading-relaxed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </FormField>

          {(field.type === "checklist" || field.type === "multiple") && (
            <FormField label="Options">
              <div className="space-y-1.5">
                {(field.options ?? []).map((opt, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-muted-foreground w-4">
                      {i + 1}.
                    </span>
                    <input
                      value={opt}
                      onChange={(e) => {
                        const next = [...(field.options ?? [])];
                        next[i] = e.target.value;
                        onUpdate({ options: next });
                      }}
                      className="flex-1 rounded-md border border-input bg-card px-2 py-1 text-xs"
                    />
                    <button
                      onClick={() =>
                        onUpdate({ options: (field.options ?? []).filter((_, j) => j !== i) })
                      }
                      className="h-6 w-6 rounded-md grid place-items-center text-foreground/50 hover:bg-muted hover:text-foreground"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() =>
                    onUpdate({ options: [...(field.options ?? []), `Option ${(field.options?.length ?? 0) + 1}`] })
                  }
                  className="inline-flex items-center gap-1 text-[11px] text-emerald-deep font-medium hover:underline"
                >
                  <Plus className="h-3 w-3" /> Add option
                </button>
              </div>
            </FormField>
          )}

          <FormField label="Validation">
            <label className="flex items-center gap-2 text-xs">
              <input
                type="checkbox"
                checked={!!field.required}
                onChange={(e) => onUpdate({ required: e.target.checked })}
                className="h-3.5 w-3.5 rounded border-input accent-emerald-brand"
              />
              <span>Required field — student must answer to submit</span>
            </label>
          </FormField>
        </div>

        <div className="mt-6 flex justify-end">
          <NextButton onClick={onNext} label="Preview as student" />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          Live preview
        </div>
        <div className="mt-3 rounded-lg border border-border p-4 bg-paper-warm/20">
          <div className="text-sm font-semibold flex items-center gap-1.5">
            {field.label}
            {field.required && <span className="text-amber-ink text-xs">*</span>}
          </div>
          {field.help && (
            <div className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
              {field.help}
            </div>
          )}
          <FieldPreview field={field} />
        </div>
        <div className="mt-4 text-[11px] text-muted-foreground leading-relaxed">
          Changes update instantly. Students see the form exactly as it appears here, embedded in
          their submission flow.
        </div>
      </div>
    </div>
  );
};

const FormField = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1.5">
      {label}
    </div>
    {children}
  </div>
);

/* ---------------- Step 04 — Preview ---------------- */

const PreviewPanel = ({ fields, onNext }: { fields: Field[]; onNext: () => void }) => (
  <div className="grid md:grid-cols-[1.4fr_1fr] gap-5">
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            Preview · student view
          </div>
          <div className="text-sm font-semibold mt-0.5">Reflection on AI use — Essay assignments</div>
        </div>
        <span className="text-[10px] rounded-full bg-emerald-soft text-emerald-deep px-2.5 py-1 font-medium">
          Read-only
        </span>
      </div>
      <div className="mt-4 space-y-4 max-h-[440px] overflow-y-auto pr-1">
        {fields.map((f) => (
          <div key={f.id}>
            {f.type === "section" ? (
              <div className="display text-base font-semibold border-b border-border pb-1.5 text-foreground">
                {f.label}
              </div>
            ) : f.type === "info" ? (
              <div className="rounded-md bg-paper-warm/40 border border-border px-3 py-2 text-[11px] italic text-foreground/75">
                {f.label}
              </div>
            ) : (
              <div>
                <div className="text-sm font-medium flex items-center gap-1.5">
                  {f.label}
                  {f.required && <span className="text-amber-ink text-xs">*</span>}
                </div>
                {f.help && (
                  <div className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                    {f.help}
                  </div>
                )}
                <FieldPreview field={f} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    <div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
        Form summary
      </div>
      <ul className="mt-3 rounded-xl border border-border divide-y divide-border bg-card">
        {[
          ["Components", `${fields.length}`],
          ["Required fields", `${fields.filter((f) => f.required).length}`],
          ["Sections", `${fields.filter((f) => f.type === "section").length}`],
          ["Estimated time", "≈ 4 min"],
        ].map(([k, v]) => (
          <li key={k} className="flex items-center justify-between px-3 py-2.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              {k}
            </span>
            <span className="text-sm font-medium">{v}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 rounded-xl border border-border p-4 text-[11px] text-foreground/80 leading-relaxed bg-paper-warm/30">
        Looks good? Publish the form so course coordinators can attach it to their assignments.
      </div>
      <div className="mt-4 flex justify-end">
        <NextButton onClick={onNext} label="Publish form" />
      </div>
    </div>
  </div>
);

/* ---------------- Step 05 — Publish ---------------- */

const PublishPanel = ({ fields }: { fields: Field[] }) => (
  <div className="grid md:grid-cols-[1.1fr_1fr] gap-5">
    <div className="rounded-xl border border-border p-5">
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
        Roll-out scope
      </div>
      <h3 className="display text-xl mt-1">Who gets this form?</h3>
      <ul className="mt-4 space-y-2.5 text-sm">
        {[
          ["Faculty", "Humanities"],
          ["Programmes", "BA Political Science · MA Philosophy"],
          ["Course types", "Essay · Thesis"],
          ["Active from", "01-09-2026"],
        ].map(([k, v]) => (
          <li
            key={k}
            className="flex items-center justify-between border-b border-border py-2 last:border-0"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              {k}
            </span>
            <span className="text-sm font-medium">{v}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 rounded-lg bg-emerald-soft/50 border border-emerald-brand/20 px-3 py-2.5 text-[11px] text-emerald-deep leading-relaxed">
        <Check className="h-3.5 w-3.5 inline-block mr-1" />
        Course coordinators will be notified and can attach this form when creating new assignments.
      </div>
    </div>
    <div className="rounded-xl bg-foreground text-background p-5 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="relative">
        <div className="text-[10px] font-mono uppercase tracking-widest text-background/60">
          Ready to publish
        </div>
        <div className="mt-1 text-base font-semibold">
          Reflection on AI use — Essay assignments
        </div>
        <div className="text-xs text-background/70">
          v1.0 · {fields.length} components · {fields.filter((f) => f.required).length} required
        </div>
        <div className="mt-5 rounded-lg bg-background/10 border border-background/15 p-3 text-xs text-background/85 leading-relaxed">
          Published forms are versioned. Future edits create a new draft — already-attached
          assignments keep using the version they were attached with.
        </div>
        <button className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full bg-emerald-brand text-white px-4 py-2.5 text-sm font-medium">
          <Send className="h-4 w-4" /> Publish v1.0
        </button>
      </div>
    </div>
  </div>
);
