import BookButton from "./BookButton";
import FinalCta from "./FinalCta";
import PageShell from "./PageShell";
import Timeline, { type TimelineStep } from "./Timeline";
import {
  PageHero,
  PriceCard,
  ProblemFixList,
  type ProblemFix,
  ReasonCards,
  type Reason,
  ScrubChecklist,
  type ScrubItem,
  SectionHeading,
  WhatYouGet,
} from "./blocks";

export interface ServicePageContent {
  id: string;
  name: string;
  title: string;
  intro: string;
  whyTitle: string;
  reasons: Reason[];
  problems: ProblemFix[];
  checklistTitle: string;
  checklist: ScrubItem[];
  steps: TimelineStep[];
  gets: string[];
  note: string;
  price: { value: number; unit?: string; note: string };
}

/** Medium-motion service page: reveals, a scroll-scrubbed checklist, and a scroll-filled timeline. */
export default function ServicePage({ c }: { c: ServicePageContent }) {
  return (
    <PageShell>
      <PageHero eyebrow={c.name} title={c.title} intro={c.intro}>
        <BookButton analyticsId={`${c.id}-hero-book`} size="lg" />
      </PageHero>

      <section className="px-5 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading title={c.whyTitle} />
          <ReasonCards reasons={c.reasons} />
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50/60 px-5 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            title="Common problems, and what I do about them"
            lead="You should not have to become an expert. This is the work I take off your plate."
          />
          <ProblemFixList items={c.problems} />
        </div>
      </section>

      <section className="px-5 pt-20 sm:pt-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading title="What gets handled for you" lead="Scroll to watch the list get checked off." />
          <div className="mt-10">
            <ScrubChecklist title={c.checklistTitle} items={c.checklist} />
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50/60 px-5 py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <SectionHeading title="How we work together" />
          <Timeline steps={c.steps} />
        </div>
      </section>

      <section className="px-5 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <SectionHeading title="What you get" />
          <WhatYouGet items={c.gets} />
          <p className="mt-10 max-w-2xl rounded-lg border border-slate-200 bg-slate-50 p-5 text-base leading-relaxed text-slate-700">
            {c.note}
          </p>
        </div>
      </section>

      <section className="px-5 pb-20 sm:pb-24">
        <PriceCard
          name={c.name}
          price={c.price.value}
          unit={c.price.unit}
          note={c.price.note}
          analyticsId={`${c.id}-price-book`}
        />
      </section>

      <FinalCta />
    </PageShell>
  );
}
