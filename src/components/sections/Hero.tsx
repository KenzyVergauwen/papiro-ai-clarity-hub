import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* ambient backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-paper-warm" />
        <div className="absolute inset-x-0 top-0 h-[600px]" style={{ background: "var(--gradient-fade)" }} />
        <div className="absolute inset-0 grid-lines opacity-40" />
      </div>

      <div className="container-page pt-20 pb-28 md:pt-32 md:pb-40">
        <div className="mx-auto max-w-4xl text-center">
          <span className="eyebrow rise">
            <span className="h-1 w-1 rounded-full bg-foreground" />
            Clarity for AI in education
          </span>

          <h1 className="display mt-6 text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.02] font-normal text-ink rise" style={{ animationDelay: "60ms" }}>
            Bring clarity to <em className="italic font-normal">AI use</em> in academic work.
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed rise" style={{ animationDelay: "140ms" }}>
            Papiro helps schools and universities guide, document, and review AI use with confidence — turning transparency into trust, without turning learning into surveillance.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 rise" style={{ animationDelay: "220ms" }}>
            <Button variant="ink" size="lg">
              Request a demo
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              See how it works
            </Button>
          </div>

          <p className="mt-6 text-xs text-muted-foreground rise" style={{ animationDelay: "300ms" }}>
            Built for institutions · Not a detector · Not a surveillance tool
          </p>
        </div>

        {/* product mock */}
        <div className="mt-20 md:mt-28 mx-auto max-w-5xl rise" style={{ animationDelay: "380ms" }}>
          <ProductMock />
        </div>
      </div>
    </section>
  );
};

const ProductMock = () => (
  <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
    <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/40">
      <div className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
      </div>
      <div className="ml-3 text-xs font-mono text-muted-foreground">papiro.app / submission · ENG-204</div>
    </div>
    <div className="grid md:grid-cols-[1fr_320px] divide-y md:divide-y-0 md:divide-x divide-border">
      <div className="p-6 md:p-8">
        <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Submission</div>
        <h3 className="display text-2xl mb-4">Essay — The Ethics of Generative Models</h3>
        <div className="space-y-3 text-sm leading-relaxed text-foreground/90">
          <p>
            <span className="bg-accent/60 px-1 rounded-sm">Generative systems are reshaping how we approach research</span>, particularly in disciplines that rely on synthesis…
          </p>
          <p className="text-muted-foreground">
            …the implications extend beyond authorship. We must ask <span className="underline decoration-dotted decoration-muted-foreground underline-offset-4">how transparency reshapes evaluation</span>.
          </p>
          <p>
            <span className="bg-accent/60 px-1 rounded-sm">In the second draft, I restructured the argument</span> after consulting an assistant for counter-examples.
          </p>
        </div>
      </div>
      <div className="p-6 bg-muted/30 space-y-5">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">AI context</div>
          <div className="space-y-2">
            {[
              { tool: "ChatGPT", use: "Outline · Counter-examples" },
              { tool: "Grammarly", use: "Style polish" },
            ].map((x) => (
              <div key={x.tool} className="flex items-center justify-between rounded-md border border-border bg-card px-3 py-2 text-xs">
                <span className="font-medium">{x.tool}</span>
                <span className="text-muted-foreground">{x.use}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Student reflection</div>
          <p className="text-xs text-muted-foreground italic leading-relaxed">
            "I used the assistant to test my reasoning. The thesis and final structure are mine."
          </p>
        </div>
        <div className="rounded-md bg-foreground text-background px-3 py-2.5 text-xs flex items-center justify-between">
          <span>Reviewer view</span>
          <span className="font-mono opacity-70">CONTEXT · NOT VERDICT</span>
        </div>
      </div>
    </div>
  </div>
);
