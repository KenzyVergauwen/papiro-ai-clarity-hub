import { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

interface Props {
  eyebrow?: string;
  title: string;
  lead?: string;
  children: ReactNode;
}

export const PageShell = ({ eyebrow, title, lead, children }: Props) => (
  <div className="min-h-screen flex flex-col bg-background">
    <SiteHeader />
    <main className="flex-1">
      <section className="relative overflow-hidden border-b border-border bg-warm-mesh">
        <div className="absolute inset-0 grid-lines opacity-40" aria-hidden="true" />
        <div className="container-page relative py-20 md:py-28">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="display mt-4 text-4xl md:text-6xl leading-[1.05] text-foreground max-w-3xl">
            {title}
          </h1>
          {lead && (
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              {lead}
            </p>
          )}
        </div>
      </section>
      <section className="container-page py-16 md:py-24">
        <div className="max-w-3xl mx-auto">{children}</div>
      </section>
    </main>
    <SiteFooter />
  </div>
);

export const Prose = ({ children }: { children: ReactNode }) => (
  <div className="space-y-6 text-foreground/85 leading-relaxed [&_h2]:display [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:text-foreground [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-medium [&_h3]:text-foreground [&_h3]:mt-8 [&_h3]:mb-2 [&_p]:text-base [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_a]:text-emerald-deep [&_a]:underline-offset-4 hover:[&_a]:underline">
    {children}
  </div>
);
