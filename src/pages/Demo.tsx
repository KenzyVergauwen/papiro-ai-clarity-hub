import { FormEvent, useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, PlayCircle, GraduationCap, Users } from "lucide-react";

// SHA-256 of the demo password. The plain password is never embedded in the bundle.
// Current password: papiro-demo-2026
const PASSWORD_HASH =
  "c18b9a6fe9e5c69551a6b8bf64839c01198fe7fa6d03cde5bb6ee895025a22c3";

const SESSION_KEY = "papiro-demo-unlocked";

async function sha256Hex(input: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function Demo() {
  const [unlocked, setUnlocked] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Restore unlock state from sessionStorage (per tab, cleared when closed)
  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY) === PASSWORD_HASH) {
        setUnlocked(true);
      }
    } catch {
      /* ignore */
    }
    setChecking(false);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const hash = await sha256Hex(password);
      if (hash === PASSWORD_HASH) {
        try {
          sessionStorage.setItem(SESSION_KEY, PASSWORD_HASH);
        } catch {
          /* ignore */
        }
        setUnlocked(true);
      } else {
        setError("Onjuist wachtwoord. Probeer opnieuw.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (checking) {
    return <div className="min-h-screen bg-background" />;
  }

  // IMPORTANT: The protected content is NOT rendered (and therefore not present
  // in the DOM) until the password check succeeds. There is no blur-overlay
  // trick that can be removed via dev tools.
  if (!unlocked) {
    return <PasswordGate
      password={password}
      setPassword={setPassword}
      onSubmit={handleSubmit}
      error={error}
      submitting={submitting}
    />;
  }

  return <DemoContent />;
}

// ---------------------------------------------------------------------------
// Password gate
// ---------------------------------------------------------------------------

interface GateProps {
  password: string;
  setPassword: (v: string) => void;
  onSubmit: (e: FormEvent) => void;
  error: string | null;
  submitting: boolean;
}

const PasswordGate = ({ password, setPassword, onSubmit, error, submitting }: GateProps) => (
  <div className="min-h-screen flex flex-col bg-background">
    <SiteHeader />
    <main className="flex-1 grid place-items-center bg-warm-mesh relative overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-40" aria-hidden />
      <div className="container-page relative py-20 md:py-28">
        <div className="max-w-md mx-auto bg-card border border-border rounded-3xl p-8 md:p-10 shadow-emerald/10 shadow-2xl">
          <div className="h-12 w-12 rounded-2xl bg-emerald-brand/10 text-emerald-deep grid place-items-center mb-5">
            <Lock className="h-5 w-5" />
          </div>
          <p className="eyebrow">Private demo</p>
          <h1 className="display mt-3 text-3xl md:text-4xl leading-tight text-foreground">
            Toegang met wachtwoord
          </h1>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Deze pagina bevat opgenomen demo-video's voor pilots en geselecteerde
            instellingen. Vul het wachtwoord in dat je van het Papiro-team hebt
            ontvangen.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-3">
            <Input
              type="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Wachtwoord"
              aria-label="Wachtwoord"
              autoComplete="current-password"
            />
            {error && (
              <p className="text-xs text-destructive" role="alert">{error}</p>
            )}
            <Button
              type="submit"
              variant="emerald"
              className="w-full"
              disabled={submitting || password.length === 0}
            >
              {submitting ? "Controleren…" : "Open demo"}
            </Button>
          </form>

          <p className="mt-6 text-[11px] text-muted-foreground/70 leading-relaxed">
            Geen wachtwoord? Neem contact op via{" "}
            <a href="/contact" className="underline underline-offset-2 hover:text-foreground">
              de contactpagina
            </a>{" "}
            om een pilot in te plannen.
          </p>
        </div>
      </div>
    </main>
    <SiteFooter />
  </div>
);

// ---------------------------------------------------------------------------
// Demo content (only rendered after successful password check)
// ---------------------------------------------------------------------------

interface DemoVideo {
  title: string;
  description: string;
  /** YouTube/Vimeo/Loom embed URL */
  embedUrl: string;
}

const studentVideos: DemoVideo[] = [
  {
    title: "Een opdracht inleveren met context",
    description:
      "Een student doorloopt de vijf stappen: opdracht laden, AI-gesprekken koppelen, markeren waar AI gebruikt is, reflecteren en inleveren.",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    title: "Reflectie en bronvermelding",
    description:
      "Hoe een student in Papiro een korte reflectie schrijft over de gemaakte keuzes en welke bronnen de AI-output gevalideerd hebben.",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

const teacherVideos: DemoVideo[] = [
  {
    title: "Een ingeleverde opdracht beoordelen",
    description:
      "Een docent opent de review-weergave: tekst, gekoppelde AI-prompts, gemarkeerde passages en de reflectie van de student in één scherm.",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    title: "Reflectieformulier koppelen aan een vak",
    description:
      "Hoe een docent een door de faculteit opgebouwd reflectieformulier selecteert, aanpast en koppelt aan een specifieke opdracht.",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

const DemoContent = () => {
  const handleLock = () => {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      /* ignore */
    }
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border bg-warm-mesh">
          <div className="absolute inset-0 grid-lines opacity-40" aria-hidden />
          <div className="container-page relative py-16 md:py-20">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="eyebrow">Private demo</p>
                <h1 className="display mt-4 text-4xl md:text-5xl leading-[1.05] text-foreground max-w-3xl">
                  Papiro <em className="italic text-emerald-deep">in actie</em>.
                </h1>
                <p className="mt-5 text-lg text-muted-foreground max-w-2xl leading-relaxed">
                  Twee korte rondleidingen — eerst vanuit de student, daarna
                  vanuit de docent — door een echte Papiro-omgeving.
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLock} className="shrink-0">
                <Lock className="h-4 w-4 mr-2" /> Vergrendelen
              </Button>
            </div>
          </div>
        </section>

        {/* Student section */}
        <DemoSection
          eyebrow="Student"
          icon={<GraduationCap className="h-5 w-5" />}
          title="Hoe een student inlevert met context"
          intro="De student werkt zoals altijd, en koppelt onderweg de relevante AI-gesprekken, markeert waar AI gebruikt is en schrijft een korte reflectie. Het resultaat is een dossier dat de docent in één oogopslag kan beoordelen."
          bullets={[
            "Vijf rustige stappen: Opdracht · Bronnen · Markeren · Reflectie · Inleveren",
            "AI-gesprekken vanuit ChatGPT, Claude, Copilot en Gemini koppelen",
            "Reflectieformulier afgestemd op het vak of de faculteit",
          ]}
          videos={studentVideos}
        />

        <div className="container-page">
          <div className="hairline" />
        </div>

        {/* Teacher section */}
        <DemoSection
          eyebrow="Docent"
          icon={<Users className="h-5 w-5" />}
          title="Hoe een docent een inzending beoordeelt"
          intro="De docent ziet niet alleen de tekst, maar ook hoe ze tot stand kwam. Geen verdict, wel context: gekoppelde prompts, gemarkeerde passages, de reflectie en de tijdslijn van het werk."
          bullets={[
            "Naast elkaar: tekst, AI-gesprekken en reflectie van de student",
            "Eigen reflectievragen per opdracht of per vak",
            "Snelle feedback en notities, klaar voor een gesprek met de student",
          ]}
          videos={teacherVideos}
        />

        {/* Footer note */}
        <section className="container-page py-16">
          <div className="bg-card border border-border rounded-3xl p-8 md:p-10 max-w-3xl mx-auto text-center">
            <p className="eyebrow">Volgende stap</p>
            <h2 className="display mt-3 text-2xl md:text-3xl text-foreground">
              Klaar om Papiro te testen op jouw instelling?
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We zetten samen een pilot op met een handvol vakken en docenten.
              Geen langdurig traject — een paar weken om te zien of Papiro voor
              jullie werkt.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button variant="emerald" asChild>
                <a href="/contact">Plan een pilot</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

// ---------------------------------------------------------------------------
// Reusable section
// ---------------------------------------------------------------------------

interface SectionProps {
  eyebrow: string;
  icon: React.ReactNode;
  title: string;
  intro: string;
  bullets: string[];
  videos: DemoVideo[];
}

const DemoSection = ({ eyebrow, icon, title, intro, bullets, videos }: SectionProps) => (
  <section className="container-page py-16 md:py-20">
    <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
      <div className="lg:col-span-4">
        <div className="flex items-center gap-2 text-emerald-deep">
          <div className="h-8 w-8 rounded-lg bg-emerald-brand/10 grid place-items-center">
            {icon}
          </div>
          <p className="eyebrow !mb-0">{eyebrow}</p>
        </div>
        <h2 className="display mt-4 text-2xl md:text-3xl text-foreground leading-tight">
          {title}
        </h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">{intro}</p>
        <ul className="mt-6 space-y-3">
          {bullets.map((b) => (
            <li key={b} className="flex gap-3 text-sm text-foreground/85">
              <PlayCircle className="h-4 w-4 mt-0.5 text-emerald-deep shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-8 space-y-8">
        {videos.map((v) => (
          <article
            key={v.title}
            className="bg-card border border-border rounded-2xl overflow-hidden"
          >
            <div className="relative w-full aspect-video bg-muted">
              <iframe
                src={v.embedUrl}
                title={v.title}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <div className="p-5 md:p-6">
              <h3 className="text-base font-semibold text-foreground">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {v.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
