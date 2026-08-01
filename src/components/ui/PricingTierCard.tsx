import { motion } from "motion/react";
import { Check } from "lucide-react";
import { BOOKING_URL } from "@/lib/constants";
import { fadeUp } from "@/lib/motion";

interface PricingTierCardProps {
  name: string;
  price: string;
  priceLabel?: string;
  monthly?: string;
  description?: string;
  features?: string[];
  badge?: { label: string; tone: "indigo" | "amber" };
  ctaLabel?: string;
  ctaHref?: string;
  ctaAnalyticsId?: string;
  highlighted?: boolean;
}

const badgeTone = {
  indigo: "bg-indigo-600 text-white",
  amber: "bg-amber-500 text-white",
};

export default function PricingTierCard({
  name,
  price,
  priceLabel = "Setup Fee",
  monthly,
  description,
  features,
  badge,
  ctaLabel,
  ctaHref = BOOKING_URL,
  ctaAnalyticsId,
  highlighted = false,
}: PricingTierCardProps) {
  const isExternal = ctaHref.startsWith("http");

  return (
    <motion.div
      {...fadeUp}
      whileHover={{ y: -4 }}
      transition={{ ...fadeUp.transition, y: { duration: 0.2, ease: "easeOut" } }}
      className={`relative flex flex-col rounded-2xl border p-6 transition-[colors,box-shadow] duration-200 ${
        highlighted
          ? "border-indigo-500/50 bg-white dark:bg-indigo-500/[0.06] shadow-md shadow-indigo-500/5 hover:shadow-lg hover:shadow-indigo-500/10"
          : "border-slate-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] hover:border-indigo-500/30 hover:shadow-lg hover:shadow-slate-900/5 dark:hover:shadow-black/20"
      }`}
    >
      {badge && (
        <motion.span
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className={`absolute -top-3 left-6 text-[10px] font-bold uppercase tracking-wide px-3 py-1 rounded-full ${badgeTone[badge.tone]}`}
        >
          {badge.label}
        </motion.span>
      )}

      <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{name}</h3>
      {description && (
        <p className="text-xs text-slate-500 mb-4 leading-relaxed">{description}</p>
      )}

      <p className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 tracking-tight mb-1">
        {price}
      </p>
      <p className="text-[11px] text-slate-500 uppercase tracking-wide font-semibold mb-4">
        {priceLabel}
      </p>

      {features && features.length > 0 && (
        <ul className="space-y-2 mb-6 flex-1">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
              <Check size={13} className="text-indigo-500 mt-0.5 shrink-0" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      )}

      {monthly && (
        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-white/5 flex justify-between items-center text-xs">
          <span className="text-slate-400 font-mono">Management</span>
          <span className="font-bold text-slate-700 dark:text-slate-300">{monthly}</span>
        </div>
      )}

      {ctaLabel && (
        <motion.a
          href={ctaHref}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          data-analytics-id={ctaAnalyticsId}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`mt-6 inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide transition-colors cursor-pointer ${
            highlighted
              ? "bg-indigo-600 hover:bg-indigo-500 text-white"
              : "bg-transparent border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/10"
          }`}
        >
          {ctaLabel}
        </motion.a>
      )}
    </motion.div>
  );
}
