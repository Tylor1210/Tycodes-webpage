import type { Variants } from "motion/react";

/** Standard scroll-reveal: fade + slight rise, plays once per element. */
export const fadeUp = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.45, ease: "easeOut" as const },
};

/** Same motion, for above-the-fold content that should animate on mount instead of on scroll. */
export const fadeUpMount = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: "easeOut" as const },
};

/** Parent wrapper for staggered children — pair with fadeUpItem on each child. */
export const staggerContainer: Variants = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.08 } },
  animate: { transition: { staggerChildren: 0.06 } },
};

export const fadeUpItem: Variants = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export const staggerViewport = { once: true, margin: "-40px" } as const;

/** Subtle lift for cards on hover — pairs with a shadow/border transition in CSS. */
export const cardHover = {
  whileHover: { y: -4 },
  transition: { duration: 0.2, ease: "easeOut" as const },
};
