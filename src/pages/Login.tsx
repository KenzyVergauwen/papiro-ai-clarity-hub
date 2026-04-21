import { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Mode = "signin" | "signup";
type Role = "student" | "educator";

const MicrosoftIcon = () => (
  <svg viewBox="0 0 23 23" aria-hidden="true" className="h-4 w-4">
    <rect x="1" y="1" width="10" height="10" fill="#F25022" />
    <rect x="12" y="1" width="10" height="10" fill="#7FBA00" />
    <rect x="1" y="12" width="10" height="10" fill="#00A4EF" />
    <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
  </svg>
);

const Login = () => {
  const [mode, setMode] = useState<Mode>("signin");
  const [role, setRole] = useState<Role>("student");

  return (
    <main className="min-h-screen bg-warm-mesh">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left — editorial panel */}
        <aside className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-ink text-background p-10 xl:p-14">
          <div className="absolute inset-0 grid-lines opacity-20" aria-hidden="true" />
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[hsl(var(--emerald)/0.25)] blur-3xl" aria-hidden="true" />

          <div className="relative">
            <Link to="/" aria-label="Papiro home">
              <Logo invert className="h-6" />
            </Link>
          </div>

          <div className="relative max-w-md">
            <p className="eyebrow text-background/60">Context, not verdict</p>
            <h1 className="display mt-5 text-4xl xl:text-5xl leading-[1.05] text-background">
              A calmer place to think with AI.
            </h1>
            <p className="mt-5 text-base text-background/70 leading-relaxed">
              Papiro helps students and educators document how AI was used —
              honestly, transparently, and without the noise of detection scores.
            </p>

            <div className="hairline mt-10 bg-background/15" />
            <figure className="mt-6">
              <blockquote className="text-sm text-background/80 leading-relaxed">
                “Finally, a tool that treats AI like a source instead of a suspect.”
              </blockquote>
              <figcaption className="mt-3 text-xs uppercase tracking-[0.2em] text-background/50">
                Lecturer · Digital Humanities
              </figcaption>
            </figure>
          </div>

          <div className="relative flex items-center justify-between text-xs text-background/50 font-mono">
            <span>© {new Date().getFullYear()} Papiro</span>
            <span>v1.0 · Pilot</span>
          </div>
        </aside>

        {/* Right — form */}
        <section className="flex items-center justify-center px-6 py-12 sm:px-10">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="lg:hidden mb-10 flex justify-center">
              <Link to="/" aria-label="Papiro home">
                <Logo className="h-6" />
              </Link>
            </div>

            <p className="eyebrow">{mode === "signin" ? "Welcome back" : "Get started"}</p>
            <h2 className="display mt-3 text-3xl sm:text-4xl text-foreground">
              {mode === "signin" ? "Sign in to Papiro" : "Create your account"}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              {mode === "signin"
                ? "Continue your work and pick up where you left off."
                : "Join your institution's workspace in under a minute."}
            </p>

            {/* Tabs */}
            <div className="mt-8 inline-flex rounded-full border border-border bg-background p-1 shadow-soft">
              <TabButton active={mode === "signin"} onClick={() => setMode("signin")}>
                Sign in
              </TabButton>
              <TabButton active={mode === "signup"} onClick={() => setMode("signup")}>
                Sign up
              </TabButton>
            </div>

            {/* SSO */}
            <div className="mt-8">
              <Button variant="paper" className="w-full justify-center border border-border h-11">
                <MicrosoftIcon />
                <span>Continue with Microsoft</span>
              </Button>
            </div>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                or with email
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              {mode === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" placeholder="Ada Lovelace" autoComplete="name" />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">
                  {role === "educator" ? "Institutional email" : "Student email"}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@university.edu"
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  {mode === "signin" && (
                    <a
                      href="#"
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Forgot password?
                    </a>
                  )}
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete={mode === "signin" ? "current-password" : "new-password"}
                />
                {mode === "signup" && (
                  <p className="text-xs text-muted-foreground">
                    At least 8 characters, with one number.
                  </p>
                )}
              </div>

              {mode === "signup" && (
                <div className="space-y-2">
                  <Label>I am a…</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <RoleChip
                      active={role === "student"}
                      onClick={() => setRole("student")}
                      label="Student"
                      hint="Submit work"
                    />
                    <RoleChip
                      active={role === "educator"}
                      onClick={() => setRole("educator")}
                      label="Educator"
                      hint="Review & guide"
                    />
                  </div>
                </div>
              )}

              <Button type="submit" variant="emerald" className="w-full h-11 mt-2">
                {mode === "signin" ? "Sign in" : "Create account"}
              </Button>
            </form>

            <p className="mt-8 text-sm text-muted-foreground text-center">
              {mode === "signin" ? (
                <>
                  New to Papiro?{" "}
                  <button
                    onClick={() => setMode("signup")}
                    className="text-foreground underline-offset-4 hover:underline"
                  >
                    Create an account
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setMode("signin")}
                    className="text-foreground underline-offset-4 hover:underline"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>

            <p className="mt-10 text-center text-xs text-muted-foreground">
              By continuing you agree to our{" "}
              <a href="#" className="underline-offset-4 hover:underline">Terms</a> and{" "}
              <a href="#" className="underline-offset-4 hover:underline">Privacy Policy</a>.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

const TabButton = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-5 py-1.5 text-sm rounded-full transition-all ${
      active
        ? "bg-foreground text-background shadow-soft"
        : "text-muted-foreground hover:text-foreground"
    }`}
  >
    {children}
  </button>
);

const RoleChip = ({
  active,
  onClick,
  label,
  hint,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  hint: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex flex-col items-start rounded-xl border px-4 py-3 text-left transition-all ${
      active
        ? "border-emerald-brand bg-emerald-soft/60 ring-1 ring-emerald-brand"
        : "border-border bg-background hover:border-foreground/30"
    }`}
  >
    <span className="text-sm font-medium text-foreground">{label}</span>
    <span className="text-xs text-muted-foreground mt-0.5">{hint}</span>
  </button>
);

export default Login;
