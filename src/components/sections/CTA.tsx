import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CTA = () => (
  <section id="cta" className="py-24 md:py-32 bg-paper-warm border-t border-border">
    <div className="container-page">
      <div className="relative overflow-hidden rounded-3xl bg-foreground text-background p-10 md:p-16">
        <div className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(50% 60% at 90% 0%, hsl(var(--emerald) / 0.5) 0%, transparent 60%), radial-gradient(40% 50% at 0% 100%, hsl(var(--peach-ink) / 0.35) 0%, transparent 60%)" }} />
        <div className="absolute inset-0 dot-grid opacity-[0.08]" />
        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-background/20 bg-background/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-background/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--emerald))]" />
            Get started
          </span>
          <h2 className="display mt-5 text-4xl md:text-5xl leading-[1.05]">
            Bring clarity to AI in your <em className="italic text-[hsl(var(--emerald-soft))]">institution</em>.
          </h2>
          <p className="mt-5 text-background/70 text-lg leading-relaxed">
            Book a 30-minute walk-through. We'll show you how Papiro fits your existing courses and policies.
          </p>
          <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg">
            <input
              type="email"
              required
              placeholder="you@institution.edu"
              className="flex-1 h-12 rounded-xl bg-background/5 border border-background/20 px-4 text-background placeholder:text-background/50 focus:outline-none focus:border-[hsl(var(--emerald))] focus:ring-2 focus:ring-[hsl(var(--emerald))]/30 transition-all"
            />
            <Button type="submit" size="lg" variant="emerald">
              Request a demo
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </form>
          <p className="mt-4 text-xs text-background/50">
            No commitments · Reply within one working day
          </p>
        </div>
      </div>
    </div>
  </section>
);
