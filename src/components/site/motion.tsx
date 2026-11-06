import { useEffect, useRef, type ReactNode } from "react";
import {
  LazyMotion,
  MotionConfig,
  domAnimation,
  m,
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";

/*
 * Motion building blocks for the home page.
 * WHY: LazyMotion + `m` components keep the motion runtime small (no drag/layout code).
 * CONSTRAINT: animate only transform and opacity so phones stay smooth.
 * GOTCHA: reveal components render their hidden state into the prerendered HTML. That is fine
 * for crawlers (text is still in the DOM). index.css forces them visible for reduced motion,
 * and index.html has a <noscript> override.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

export function MotionRoot({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation}>{children}</LazyMotion>
    </MotionConfig>
  );
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/** Parent that reveals its <RevealItem> children one after another when scrolled into view. */
export function RevealGroup({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
}) {
  const Tag = m[as];
  return (
    <Tag
      data-reveal
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const Tag = m[as];
  return (
    <Tag variants={item} className={className}>
      {children}
    </Tag>
  );
}

/** Single element reveal (heading blocks, paragraphs). */
export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.div
      data-reveal
      className={className}
      variants={item}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
    >
      {children}
    </m.div>
  );
}

/** Counts up to `value` once it scrolls into view. Final value is in the HTML for crawlers and no-JS. */
export function CountUp({ value, prefix = "", className }: { value: number; prefix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduced = useReducedMotion();
  const format = (n: number) => prefix + Math.round(n).toLocaleString("en-US");

  useEffect(() => {
    if (reduced || !ref.current) return;
    ref.current.textContent = format(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  useEffect(() => {
    if (!inView || reduced || !ref.current) return;
    const el = ref.current;
    const controls = animate(0, value, {
      duration: 0.9,
      ease: EASE,
      onUpdate: (v) => {
        el.textContent = format(v);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, value]);

  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  );
}

/** Card that lifts and tilts toward a mouse pointer. Disabled for touch and reduced motion. */
export function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 180, damping: 18 });
  const rotateY = useSpring(ry, { stiffness: 180, damping: 18 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 7);
    rx.set(-py * 7);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <m.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      whileHover={reduced ? undefined : { y: -6 }}
      transition={{ duration: 0.35, ease: EASE }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={className}
    >
      {children}
    </m.div>
  );
}

/** Soft radial glow fixed behind the page that drifts slowly as you scroll. */
export function BackgroundGlow() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -320]);
  const x = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -120]);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <m.div
        style={{
          y,
          x,
          background: "radial-gradient(closest-side, rgba(15,118,110,0.13), rgba(15,118,110,0) 100%)",
        }}
        className="absolute -right-[25vw] -top-[20vw] h-[85vw] w-[85vw] max-h-[900px] max-w-[900px] will-change-transform"
      />
    </div>
  );
}
