import { useRef, useState, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { m, useScroll, useTransform, type MotionValue } from "motion/react";
import BookButton from "@/components/site/BookButton";
import FinalCta from "@/components/site/FinalCta";
import PageShell from "@/components/site/PageShell";
import ProductScene, { ProductPoster, SWATCHES } from "@/components/site/ProductScene";
import Timeline from "@/components/site/Timeline";
import { PageHero, PriceCard, ReasonCards, SectionHeading, StackCards } from "@/components/site/blocks";
import { Reveal } from "@/components/site/motion";

const DEMO_URL = "https://tycodes.app";

const beats = [
  { n: "01", title: "Meet your product.", body: "Not a photo. The real shape, moving with every scroll.", from: -0.04, to: 0.2 },
  { n: "02", title: "Get closer.", body: "Zoom in on the details that make people want it.", from: 0.2, to: 0.42 },
  { n: "03", title: "Take it apart.", body: "Show what is inside and how it is made.", from: 0.42, to: 0.62 },
  { n: "04", title: "Pick a style.", body: "Colors and options change right on the page.", from: 0.62, to: 0.82 },
];

function Beat({
  progress,
  from,
  to,
  children,
  interactive = false,
  className = "",
}: {
  progress: MotionValue<number>;
  from: number;
  to: number;
  children: ReactNode;
  interactive?: boolean;
  className?: string;
}) {
  const last = to >= 1;
  const opacity = useTransform(progress, last ? [from, from + 0.05] : [from, from + 0.04, to - 0.04, to], last ? [0, 1] : [0, 1, 1, 0]);
  const y = useTransform(progress, last ? [from, from + 0.06] : [from, from + 0.05, to - 0.05, to], last ? [36, 0] : [36, 0, 0, -36]);
  const pointerEvents = useTransform(opacity, (v) => (interactive && v > 0.6 ? "auto" : "none"));
  return (
    <div className={`absolute ${className}`}>
      <m.div style={{ opacity, y, pointerEvents }}>{children}</m.div>
    </div>
  );
}

/** The pinned, scroll-scrubbed 3D scene: five beats that end in a checkout card. */
function Scene() {
  const ref = useRef<HTMLDivElement>(null);
  const [picked, setPicked] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 64px", "end end"] });
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const textPos = "inset-x-5 bottom-6 md:inset-x-auto md:bottom-auto md:left-12 md:top-1/2 md:-mt-24 md:max-w-sm";

  return (
    <>
      <div ref={ref} className="motion-only relative" style={{ height: "560vh" }}>
        <div className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden">
          <ProductScene progress={scrollYProgress} picked={picked} />
          {/* Scrim so beat text stays readable over the product on small screens. */}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white via-white/80 to-transparent md:hidden" />

          {beats.map((b) => (
            <Beat key={b.n} progress={scrollYProgress} from={b.from} to={b.to} className={textPos}>
              <p className="font-mono text-sm font-semibold text-brand-700">{b.n}</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{b.title}</h2>
              <p className="mt-2 text-lg leading-relaxed text-slate-600">{b.body}</p>
              {b.n === "01" && <p className="mt-5 text-sm font-medium text-slate-500">Keep scrolling</p>}
            </Beat>
          ))}

          <Beat
            progress={scrollYProgress}
            from={0.82}
            to={1.1}
            interactive
            className="inset-x-5 bottom-5 md:inset-x-auto md:bottom-auto md:right-12 md:top-1/2 md:-mt-48 md:w-80"
          >
            <p className="font-mono text-sm font-semibold text-brand-700">05</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:mt-2 sm:text-4xl">Straight to checkout.</h2>
            <div className="mt-3 rounded-xl border border-slate-200 bg-white p-4 shadow-lg sm:mt-4 sm:p-5">
              <div className="flex items-baseline justify-between">
                <p className="font-semibold">Demo Bottle</p>
                <p className="text-xl font-semibold tabular-nums">$38</p>
              </div>
              <div className="mt-3 flex items-center gap-3 sm:mt-4" role="group" aria-label="Choose a color">
                {SWATCHES.map((s, i) => (
                  <button
                    key={s.name}
                    type="button"
                    aria-label={s.name}
                    aria-pressed={picked === i}
                    onClick={() => setPicked(i)}
                    className={`h-8 w-8 rounded-full border-2 ${picked === i ? "border-slate-900" : "border-white ring-1 ring-slate-300"}`}
                    style={{ backgroundColor: s.hex }}
                  />
                ))}
              </div>
              <button
                type="button"
                className="mt-4 w-full rounded-md bg-slate-900 px-4 py-3 text-sm font-semibold text-white sm:mt-5"
              >
                Buy now
              </button>
              <p className="mt-3 text-xs leading-snug text-slate-500">Demo product. Your page uses your products.</p>
            </div>
          </Beat>

          <div aria-hidden className="absolute right-3 top-1/2 hidden h-40 w-0.5 -translate-y-1/2 bg-slate-200 sm:block">
            <m.div style={{ scaleY: bar, originY: 0 }} className="h-full bg-brand-700" />
          </div>
        </div>
      </div>

      <div className="reduced-only mx-auto max-w-3xl px-5">
        <ProductPoster className="mx-auto h-72 w-auto" />
        <ol className="mt-6 space-y-4">
          {[...beats, { n: "05", title: "Straight to checkout.", body: "Pick a style and buy in a few taps." }].map((b) => (
            <li key={b.n}>
              <p className="text-xl font-semibold">{b.title}</p>
              <p className="text-slate-600">{b.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

export default function Scroll3D() {
  return (
    <PageShell>
      <PageHero
        eyebrow="3D Scroll Shop"
        title="A product page that moves as people scroll."
        intro="Your product in real 3D, reacting to every scroll, with a short path from looking to buying. This page is a small sample of what it feels like."
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <BookButton analyticsId="3d-hero-book" size="lg" />
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics-id="3d-hero-demo"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 px-6 py-3.5 text-base font-semibold text-slate-800 hover:bg-slate-50"
          >
            See the demos <ArrowUpRight size={18} aria-hidden />
          </a>
        </div>
      </PageHero>

      <section id="scene" aria-label="Scroll demo">
        <Scene />
      </section>

      <section className="px-5 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading title="Why a scroll shop" />
          <ReasonCards
            reasons={[
              {
                title: "Flat photos undersell your product.",
                body: "A grid of pictures cannot show how something is made, how it feels, or why it costs what it does.",
              },
              {
                title: "Every extra click loses someone.",
                body: "The longer the path from looking to buying, the more people drop out along the way.",
              },
              {
                title: "Most stores look the same.",
                body: "Shoppers scroll past pages that look like every other template. Motion gives your product a reason to stop them.",
              },
            ]}
          />
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50/60 px-5 pb-28 pt-20 sm:pt-24">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            title="Common problems, and what I do about them"
            lead="You bring the product. I handle the build."
          />
          <StackCards
            items={[
              {
                title: "Your photos do not show the product properly",
                problem: "Buyers cannot see every side, the details, or the scale, so they hesitate.",
                fix: "I build your product in 3D, so people can turn it, zoom in and see how it is made.",
              },
              {
                title: "The page is slow on phones",
                problem: "Heavy pages stall on mobile, and most of your visitors are on mobile.",
                fix: "I build it to load fast and run smoothly on phones, and I test it on real devices.",
              },
              {
                title: "Shoppers leave before checkout",
                problem: "Too many steps stand between looking at a product and buying it.",
                fix: "The page leads straight into checkout, so buying takes a few taps.",
              },
              {
                title: "Your store looks like everyone else's",
                problem: "A stock template makes a great product look ordinary.",
                fix: "I design the scroll story around your brand and your product, not around a template.",
              },
            ]}
          />
        </div>
      </section>

      <section id="demo" className="px-5 py-20 sm:py-24">
        <Reveal className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">tycodes.app</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            See the demos, then make one for your own products.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
            Paste your website and get a shoppable 3D scroll demo of your products in about a minute. No call needed
            to try it.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics-id="3d-demo-make"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-900 px-6 py-3.5 text-base font-semibold text-white hover:bg-slate-700"
            >
              Make a demo of your own <ArrowUpRight size={18} aria-hidden />
            </a>
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics-id="3d-demo-see"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 px-6 py-3.5 text-base font-semibold text-slate-800 hover:bg-slate-50"
            >
              See the demos <ArrowUpRight size={18} aria-hidden />
            </a>
          </div>
        </Reveal>
      </section>

      <section className="border-t border-slate-200 bg-slate-50/60 px-5 py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <SectionHeading title="How a project goes" lead="A one-time project with a clear start and finish." />
          <Timeline
            steps={[
              {
                title: "Look at your products and brand",
                body: "We start with a call. I look at your products, your brand and how you sell today.",
              },
              {
                title: "Build and test",
                body: "I build the 3D scroll page, connect checkout, and test it on real phones and computers.",
              },
              {
                title: "Launch and hand over",
                body: "I put it live, make sure it works, and hand it over with everything written down.",
              },
            ]}
          />
        </div>
      </section>

      <section className="px-5 py-20 sm:py-24">
        <PriceCard name="3D Scroll Shop" price={1500} note="One-time project" analyticsId="3d-price-book" />
      </section>

      <FinalCta />
    </PageShell>
  );
}
