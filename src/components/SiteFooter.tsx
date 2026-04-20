import { Logo } from "@/components/Logo";

export const SiteFooter = () => (
  <footer className="border-t border-border bg-background">
    <div className="container-page py-14">
      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <Logo className="h-6" />
          <p className="mt-5 text-sm text-muted-foreground max-w-sm leading-relaxed">
            Clarity for AI in education. Built for schools and universities that want a more honest conversation about AI in academic work.
          </p>
        </div>
        <FooterCol title="Product" links={["Overview", "How it works", "Principles", "FAQ"]} />
        <FooterCol title="Institution" links={["For schools", "For leadership", "For educators", "Pilot programme"]} />
        <FooterCol title="Company" links={["About", "Contact", "Privacy", "Terms"]} />
      </div>
      <div className="hairline mt-12" />
      <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Papiro. All rights reserved.</p>
        <p className="font-mono">Context, not verdict.</p>
      </div>
    </div>
  </footer>
);

const FooterCol = ({ title, links }: { title: string; links: string[] }) => (
  <div className="md:col-span-2">
    <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">{title}</h4>
    <ul className="space-y-2.5">
      {links.map((l) => (
        <li key={l}>
          <a href="#" className="text-sm hover:text-foreground text-foreground/80 transition-colors">
            {l}
          </a>
        </li>
      ))}
    </ul>
  </div>
);
