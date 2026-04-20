import { Button } from "@/components/ui/button";
import { ArrowRight, LogOut } from "lucide-react";
import { AnimatedWorkflow } from "./AnimatedWorkflow";

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

        {/* animated product demo */}
        <div className="mt-20 md:mt-24 mx-auto max-w-6xl rise" style={{ animationDelay: "380ms" }}>
          <AnimatedWorkflow />
        </div>
      </div>
    </section>
  );
};

export const Pill = ({ children, active }: { children: React.ReactNode; active?: boolean }) => (
  <span
    className={`text-xs px-3 py-1.5 rounded-full ${
      active ? "bg-emerald-brand text-white" : "text-muted-foreground hover:text-foreground"
    }`}
  >
    {children}
  </span>
);

export const TopBar = () => (
  <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-border bg-card">
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5">
        <svg viewBox="0 0 52 52" aria-hidden="true" className="h-3.5 w-3.5 text-foreground">
          <rect x="4" y="7" width="38" height="8" rx="4" fill="currentColor" />
          <rect x="4" y="22" width="38" height="8" rx="4" fill="currentColor" />
          <rect x="4" y="37" width="20" height="8" rx="4" fill="currentColor" />
        </svg>
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
);
