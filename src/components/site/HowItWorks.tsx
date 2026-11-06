import { Reveal } from "./motion";
import Timeline from "./Timeline";

const steps = [
  {
    title: "Free audit",
    body: "Run the scan on your site, or book a 15 minute call. We look at how your site and business show up online and what is getting in the way.",
  },
  {
    title: "Fix the gaps",
    body: "We pick the fixes that matter most and handle them. You approve the plan and see the price before anything starts.",
  },
  {
    title: "Monthly report",
    body: "On monthly plans, you get a short plain-language report each month on what changed and what comes next.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-slate-200 bg-slate-50/60 px-5 py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">How it works</h2>
          <p className="mt-3 text-lg text-slate-600">Three simple steps. You see the plan and the price before we start.</p>
        </Reveal>
        <Timeline steps={steps} />
      </div>
    </section>
  );
}
