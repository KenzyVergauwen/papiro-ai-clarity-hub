import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Is Papiro an AI detector?",
    a: "No. Papiro is a provenance and documentation tool. We help students show how their work came to be — and help teachers review it with that context. We don't produce probabilistic 'AI scores'.",
  },
  {
    q: "Does it replace the teacher's judgement?",
    a: "Never. Papiro structures information; the teacher always decides. The goal is to make evaluation conversations better, not automate them.",
  },
  {
    q: "What about student privacy?",
    a: "Students choose what AI context to share. Papiro is designed to be transparent to all parties — it's not a surveillance product running silently in the background.",
  },
  {
    q: "How does Papiro fit existing systems?",
    a: "Papiro complements the LMS and tools your institution already uses. Submissions, AI context and reviews live alongside your existing workflow.",
  },
  {
    q: "Can we pilot it with one programme first?",
    a: "Yes — most institutions start with a single faculty or course, then expand once the workflow proves itself.",
  },
];

export const FAQ = () => (
  <section id="faq" className="py-24 md:py-32">
    <div className="container-page">
      <div className="grid md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <span className="eyebrow">FAQ</span>
          <h2 className="display mt-4 text-4xl md:text-5xl leading-[1.05] text-ink">
            Questions, answered.
          </h2>
          <p className="mt-5 text-muted-foreground">
            Can't find what you're looking for? <a href="#cta" className="underline underline-offset-4">Talk to us</a>.
          </p>
        </div>
        <div className="md:col-span-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="text-left text-base md:text-lg font-medium hover:no-underline py-6">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-base">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  </section>
);
