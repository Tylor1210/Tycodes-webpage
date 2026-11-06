import { useScroll, useSpring } from "motion/react";

/** Progress (0 to 1) of a block scrolling through the viewport, smoothed for the filling timeline line. */
export function useProgressLine(target: React.RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({ target, offset: ["start 70%", "end 60%"] });
  return useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
}
