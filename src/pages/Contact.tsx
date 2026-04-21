import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Thanks — we'll be in touch within two working days.");
      (e.target as HTMLFormElement).reset();
    }, 600);
  };

  return (
    <PageShell
      eyebrow="Get in touch"
      title="Let's talk about AI in your institution."
      lead="Whether you're piloting Papiro, exploring policy, or just curious — drop us a line. We read every message."
    >
      <div className="grid md:grid-cols-5 gap-12">
        <div className="md:col-span-2 space-y-8">
          <ContactBlock
            label="General"
            value="hello@papiro.education"
            href="mailto:hello@papiro.education"
          />
          <ContactBlock
            label="Pilots & schools"
            value="pilots@papiro.education"
            href="mailto:pilots@papiro.education"
          />
          <ContactBlock
            label="Press"
            value="press@papiro.education"
            href="mailto:press@papiro.education"
          />
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
              Office
            </p>
            <p className="text-sm text-foreground/85 leading-relaxed">
              Papiro B.V.<br />
              Amsterdam, The Netherlands
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="md:col-span-3 space-y-5 rounded-2xl border border-border bg-card p-6 md:p-8 shadow-soft">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" required placeholder="Ada Lovelace" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required placeholder="you@school.edu" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="institution">Institution</Label>
            <Input id="institution" placeholder="University of …" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" required rows={6} placeholder="Tell us a little about what you're exploring." />
          </div>
          <Button type="submit" variant="emerald" className="w-full h-11" disabled={submitting}>
            {submitting ? "Sending…" : "Send message"}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            We'll only use your details to reply. See our{" "}
            <a href="/privacy" className="underline-offset-4 hover:underline text-foreground">Privacy Policy</a>.
          </p>
        </form>
      </div>
    </PageShell>
  );
};

const ContactBlock = ({ label, value, href }: { label: string; value: string; href: string }) => (
  <div>
    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">{label}</p>
    <a href={href} className="text-base text-foreground hover:text-emerald-deep transition-colors">
      {value}
    </a>
  </div>
);

export default Contact;
