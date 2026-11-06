import { useRef } from "react";
import { m } from "motion/react";
import { RevealGroup, RevealItem } from "./motion";
import { useProgressLine } from "./useProgressLine";

export interface TimelineStep {
  title: string;
  body: string;
}

/** Numbered steps joined by a line that fills as the list scrolls past. */
export default function Timeline({ steps }: { steps: TimelineStep[] }) {
  const listRef = useRef<HTMLDivElement>(null);
  const progress = useProgressLine(listRef);

  return (
    <div ref={listRef} className="relative">
      <div aria-hidden className="absolute bottom-5 left-5 top-5 w-px bg-slate-200" />
      <m.div
        aria-hidden
        data-progress-line
        style={{ scaleY: progress, originY: 0 }}
        className="absolute bottom-5 left-5 top-5 w-px bg-brand-700"
      />
      <RevealGroup as="ol" className="relative space-y-10">
        {steps.map((s, i) => (
          <RevealItem as="li" key={s.title} className="flex gap-5">
            <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-brand-700 bg-white text-base font-semibold text-brand-700">
              {i + 1}
            </span>
            <div className="pt-1.5">
              <h3 className="text-xl font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-1.5 max-w-lg leading-relaxed text-slate-600">{s.body}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
