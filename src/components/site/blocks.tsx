import { useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, X } from "lucide-react";
import BookButton from "./BookButton";
import { CountUp, Reveal, RevealGroup, RevealItem, TiltCard } from "./motion";
import { m, useScroll, useTransform, type MotionValue } from "motion/react";

/* Building blocks shared by the three service pages. */

const stagger = (i: number) => ({ "--i": i }) as React.CSSProperties;

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children?: ReactNode;
}) {
  return (
    <section className="px-5 pb-16 pt-10 sm:pb-24 sm:pt-14">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/#services"
          style={stagger(0)}
          className="hero-in inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft size={16} aria-hidden /> All services
        </Link>
        <p style={stagger(1)} className="hero-in mt-8 text-sm font-semibold uppercase tracking-wide text-brand-700">
          {eyebrow}
        </p>
        <h1
          style={stagger(2)}
          className="hero-in mt-3 text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
        >
          {title}
        </h1>
        <p style={stagger(3)} className="hero-in mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
          {intro}
        </p>
        <div style={stagger(4)} className="hero-in mt-8">
          {children}
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({ title, lead }: { title: string; lead?: string }) {
  return (
    <Reveal className="max-w-2xl">
      <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {lead && <p className="mt-3 text-lg leading-relaxed text-slate-600">{lead}</p>}
    </Reveal>
  );
}

export interface Reason {
  title: string;
  body: string;
}

/** Three short "why this matters" cards. */
export function ReasonCards({ reasons }: { reasons: Reason[] }) {
  return (
    <RevealGroup className="mt-10 grid gap-5 md:grid-cols-3">
      {reasons.map((r, i) => (
        <RevealItem key={r.title} className="h-full">
          <TiltCard className="h-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <span className="font-mono text-sm font-semibold text-brand-700">0{i + 1}</span>
            <h3 className="mt-3 text-xl font-semibold leading-snug tracking-tight">{r.title}</h3>
            <p className="mt-3 leading-relaxed text-slate-600">{r.body}</p>
          </TiltCard>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

export interface ProblemFix {
  problem: string;
  detail: string;
  fix: string;
}

/** Each row pairs a common problem with what Tycodes does about it. */
export function ProblemFixList({ items }: { items: ProblemFix[] }) {
  return (
    <RevealGroup className="mt-10 space-y-5">
      {items.map((it) => (
        <RevealItem key={it.problem}>
          <div className="grid overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm md:grid-cols-2">
            <div className="p-6">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <X size={14} aria-hidden /> The problem
              </p>
              <h3 className="mt-3 text-lg font-semibold leading-snug">{it.problem}</h3>
              <p className="mt-2 leading-relaxed text-slate-600">{it.detail}</p>
            </div>
            <div className="border-t border-brand-100 bg-brand-50/70 p-6 md:border-l md:border-t-0">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand-800">
                <Check size={14} aria-hidden /> What I do
              </p>
              <p className="mt-3 leading-relaxed text-slate-800">{it.fix}</p>
            </div>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

function ScrubRow({
  label,
  before,
  after,
  index,
  total,
  progress,
}: {
  label: string;
  before: string;
  after: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Each row flips from "before" to "after" at its own point along the scroll.
  const t = 0.12 + (index / total) * 0.78;
  const done = useTransform(progress, [t - 0.05, t + 0.05], [0, 1]);
  const doneSoft = useTransform(done, (v) => 1 - v);
  const scale = useTransform(done, [0, 1], [0.6, 1]);
  return (
    <li className="flex items-start gap-4 border-b border-slate-100 py-4 last:border-0">
      <span className="relative mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-slate-300 bg-white">
        <m.span style={{ opacity: done, scale }} className="absolute inset-0 grid place-items-center rounded-full bg-brand-700 text-white">
          <Check size={16} aria-hidden />
        </m.span>
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-semibold">{label}</p>
        <div className="relative mt-1 min-h-[2.75rem] text-sm leading-snug sm:min-h-[1.5rem]">
          <m.p style={{ opacity: doneSoft }} className="absolute inset-x-0 top-0 text-slate-500">
            {before}
          </m.p>
          <m.p style={{ opacity: done }} className="absolute inset-x-0 top-0 text-brand-800">
            {after}
          </m.p>
        </div>
      </div>
    </li>
  );
}

export interface ScrubItem {
  label: string;
  before: string;
  after: string;
}

/**
 * Sticky checklist whose rows flip from "needs work" to "handled" as you scroll.
 * Reduced motion gets a plain list with every row in its handled state.
 */
export function ScrubChecklist({ title, items }: { title: string; items: ScrubItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const fill = useTransform(scrollYProgress, [0.08, 0.92], [0, 1]);

  return (
    <>
      <div ref={ref} className="motion-only relative" style={{ height: `${70 + items.length * 34}vh` }}>
        <div className="sticky top-24">
          <div className="mx-auto max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
              <span className="text-xs font-medium uppercase tracking-wide text-slate-500">Keep scrolling</span>
            </div>
            <div className="mt-4 h-1 overflow-hidden rounded bg-slate-100">
              <m.div style={{ scaleX: fill, originX: 0 }} className="h-full bg-brand-700" />
            </div>
            <ul className="mt-2">
              {items.map((it, i) => (
                <ScrubRow key={it.label} {...it} index={i} total={items.length} progress={scrollYProgress} />
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="reduced-only mx-auto max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
        <ul className="mt-3">
          {items.map((it) => (
            <li key={it.label} className="flex items-start gap-4 border-b border-slate-100 py-4 last:border-0">
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-700 text-white">
                <Check size={16} aria-hidden />
              </span>
              <div>
                <p className="font-semibold">{it.label}</p>
                <p className="mt-1 text-sm text-brand-800">{it.after}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

/** Plain list of what the client receives. */
export function WhatYouGet({ items }: { items: string[] }) {
  return (
    <RevealGroup as="ul" className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2">
      {items.map((it) => (
        <RevealItem as="li" key={it} className="flex gap-3 text-lg leading-snug text-slate-800">
          <Check size={20} className="mt-1 shrink-0 text-brand-700" aria-hidden />
          <span>{it}</span>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

/** Price and booking button for a single service. */
export function PriceCard({
  name,
  price,
  unit,
  note,
  analyticsId,
}: {
  name: string;
  price: number;
  unit?: string;
  note: string;
  analyticsId: string;
}) {
  return (
    <Reveal className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <p className="text-sm font-medium text-slate-500">{name}</p>
      <p className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-500">Starting at</p>
      <p className="mt-1 flex items-baseline justify-center gap-1">
        <CountUp value={price} prefix="$" className="text-6xl font-semibold tabular-nums tracking-tight" />
        {unit && <span className="text-xl text-slate-500">{unit}</span>}
      </p>
      <p className="mt-2 text-slate-600">{note}</p>
      <BookButton analyticsId={analyticsId} size="lg" className="mt-7 w-full sm:w-auto" />
    </Reveal>
  );
}

/** Cards that stick and stack on top of each other as you scroll. Plain stack for reduced motion. */
export function StackCards({ items }: { items: { title: string; problem: string; fix: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <div ref={ref} data-reveal className="relative mt-10">
      {items.map((it, i) => (
        <StackCard key={it.title} item={it} index={i} total={items.length} progress={scrollYProgress} />
      ))}
    </div>
  );
}

function StackCard({
  item,
  index,
  total,
  progress,
}: {
  item: { title: string; problem: string; fix: string };
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - 1 - index) * 0.045]);
  return (
    <div className="stack-card sticky pb-6" style={{ top: `${6 + index * 1.1}rem` }}>
      <m.div
        style={{ scale, transformOrigin: "top center" }}
        className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md md:grid-cols-2"
      >
        <div className="p-7 sm:p-9">
          <p className="font-mono text-sm font-semibold text-brand-700">0{index + 1}</p>
          <h3 className="mt-3 text-2xl font-semibold leading-snug tracking-tight">{item.title}</h3>
          <p className="mt-3 leading-relaxed text-slate-600">{item.problem}</p>
        </div>
        <div className="border-t border-brand-100 bg-brand-50/70 p-7 sm:p-9 md:border-l md:border-t-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-800">What I do</p>
          <p className="mt-3 text-lg leading-relaxed text-slate-800">{item.fix}</p>
        </div>
      </m.div>
    </div>
  );
}
