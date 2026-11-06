import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import BookButton from "./BookButton";
import { CountUp, Reveal, RevealGroup, RevealItem, TiltCard } from "./motion";

const services = [
  {
    id: "ai-visibility",
    to: "/ai-visibility",
    name: "AI Visibility",
    audience: "For trades and local service businesses",
    line: "Help customers find you when they ask ChatGPT and Google for a recommendation.",
    bullets: [
      "Your business details cleaned up so AI tools and search can read them",
      "Google Business Profile and local listings checked and fixed",
      "A monthly report on where you appear and what changed",
    ],
    price: 400,
    unit: "/mo",
    note: "Plus a one-time setup, quoted on the call",
  },
  {
    id: "tech-partner",
    to: "/tech-partner",
    name: "Tech Partner",
    audience: "",
    line: "Your tech handled. Software set up, AI for your office, accounts and backups locked down.",
    bullets: [
      "Email, accounts and passwords set up and secured",
      "Backups that run on their own and get tested",
      "Help when something breaks",
    ],
    price: 250,
    unit: "/mo",
    note: "Billed monthly",
  },
  {
    id: "3d-scroll-shop",
    to: "/3d-scroll-shop",
    name: "3D Scroll Shop",
    audience: "For product brands",
    line: "A product page that moves as people scroll and drops them straight into checkout.",
    bullets: [
      "Your product shown in 3D that reacts as visitors scroll",
      "Built to load fast on phones",
      "Checkout connected so buying takes a few taps",
    ],
    price: 1500,
    unit: "",
    note: "One-time project",
  },
];

export default function Services() {
  return (
    <section id="services" className="px-5 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">What we do</h2>
          <p className="mt-3 text-lg text-slate-600">Three ways we help, with prices you can see up front.</p>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <RevealItem key={s.id} className="h-full">
              <TiltCard className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:border-brand-700/40 hover:shadow-md">
                <h3 className="text-xl font-semibold tracking-tight">{s.name}</h3>
                <p className="mt-1 min-h-5 text-sm text-slate-500">{s.audience}</p>
                <p className="mt-4 text-base leading-relaxed text-slate-700">{s.line}</p>
                <ul className="mt-5 space-y-2.5">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5 text-sm leading-snug text-slate-700">
                      <Check size={16} className="mt-0.5 shrink-0 text-brand-700" aria-hidden />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-7">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Starting at</p>
                  <p className="mt-1 flex items-baseline gap-1">
                    <CountUp value={s.price} prefix="$" className="text-4xl font-semibold tabular-nums tracking-tight" />
                    {s.unit && <span className="text-base text-slate-500">{s.unit}</span>}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">{s.note}</p>
                  <Link
                    to={s.to}
                    data-analytics-id={`service-${s.id}-learn`}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-800 hover:underline"
                  >
                    How {s.name} works <ArrowRight size={16} aria-hidden />
                  </Link>
                  <BookButton
                    analyticsId={`service-${s.id}-book`}
                    label="Book a call"
                    variant="outline"
                    className="mt-4 w-full"
                  />
                </div>
              </TiltCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
