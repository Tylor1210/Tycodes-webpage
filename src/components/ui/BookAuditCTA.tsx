import { motion } from "motion/react";
import { CalendarClock, ArrowRight } from "lucide-react";
import { BOOKING_URL, PRIMARY_CTA_LABEL } from "@/lib/constants";
import { fadeUp } from "@/lib/motion";

interface BookAuditButtonProps {
  analyticsId: string;
  className?: string;
  size?: "default" | "lg";
  label?: string;
}

export function BookAuditButton({
  analyticsId,
  className = "",
  size = "default",
  label = PRIMARY_CTA_LABEL,
}: BookAuditButtonProps) {
  return (
    <motion.a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-analytics-id={analyticsId}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-full transition-colors shadow-sm shadow-indigo-600/20 cursor-pointer whitespace-nowrap ${
        size === "lg" ? "text-sm px-8 py-4" : "text-xs px-4 py-2.5"
      } ${className}`}
    >
      <CalendarClock size={size === "lg" ? 16 : 14} />
      {label}
      <ArrowRight size={size === "lg" ? 16 : 14} />
    </motion.a>
  );
}

export function BookAuditBand({ analyticsId }: { analyticsId: string }) {
  return (
    <motion.div
      {...fadeUp}
      className="mt-16 rounded-3xl bg-slate-900 dark:bg-indigo-950/40 border border-slate-800 dark:border-indigo-500/20 px-6 py-12 md:py-16 text-center relative overflow-hidden"
    >
      <motion.div
        aria-hidden
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      <div className="relative">
        <p className="text-xs font-bold uppercase tracking-wide text-indigo-400 mb-3">
          Free &middot; No obligation
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight mb-3 max-w-xl mx-auto">
          Not sure where to start? Let&apos;s look at your site together.
        </h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
          15 minutes, no pressure. We&apos;ll walk through what&apos;s working, what&apos;s costing you
          money, and whether Tycodes is the right fit.
        </p>
        <BookAuditButton analyticsId={analyticsId} size="lg" />
      </div>
    </motion.div>
  );
}
