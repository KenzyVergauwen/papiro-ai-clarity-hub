import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { LogoStrip } from "@/components/sections/LogoStrip";
import { WhyNow } from "@/components/sections/WhyNow";
import { Audience } from "@/components/sections/Audience";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Principles } from "@/components/sections/Principles";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    <SiteHeader />
    <main>
      <Hero />
      <LogoStrip />
      <WhyNow />
      <Audience />
      <HowItWorks />
      <Principles />
      <FAQ />
      <CTA />
    </main>
    <SiteFooter />
  </div>
);

export default Index;
