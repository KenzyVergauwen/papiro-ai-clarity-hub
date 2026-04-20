import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CTA = () => (
  <section id="cta" className="py-24 md:py-32 bg-paper-warm border-t border-border">
    <div className="container-page">
      <div className="relative overflow-hidden rounded-2xl bg-foreground text-background p-10 md:p-16">
        <div className="absolute inset-0 grid-lines opacity-[0.06]" />
        <div className="relative max-w-2xl">
          <h2 className="display text-4xl md:text-5xl leading-[1.05]">
            Bring clarity to AI in your institution.
          </h2>
          <p className="mt-5 text-background/70 text-lg leading-relaxed">
            Book a 30-minute walk-through. We'll show you how Papiro fits your existing courses and policies.
          </p>
          <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg">
            <input
              type="email"
              required
              placeholder="you@institution.edu"
              className="flex-1 h-12 rounded-md bg-background/5 border border-background/20 px-4 text-background placeholder:text-background/50 focus:outline-none focus:border-background/60 transition-colors"
            />
            <Button type="submit" size="lg" variant="paper">
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
