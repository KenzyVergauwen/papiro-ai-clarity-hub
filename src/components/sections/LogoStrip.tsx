const logos = ["Northgate University", "St. Auden's", "Linde Hogeschool", "Polaris Institute", "KU Westmark", "Avenir College"];

export const LogoStrip = () => (
  <section className="border-y border-border bg-background">
    <div className="container-page py-10">
      <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
        Trusted by forward-looking academic institutions
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {logos.map((l) => (
          <span key={l} className="text-sm text-muted-foreground/70 font-medium tracking-wide">
            {l}
          </span>
        ))}
      </div>
    </div>
  </section>
);
