import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Link2, Share2, MessageSquare, ArrowRight } from "lucide-react";
import { BOOKING_URL } from "@/lib/constants";

export default function GrowthOpsTile() {
  const capabilities = [
    { name: "Branded Link-in-Bio Page", desc: "One mobile-first landing page for every platform you're on.", icon: Link2 },
    { name: "Cross-Platform Posting", desc: "Publish once, and it goes out to Instagram, TikTok, X, and more.", icon: Share2 },
    { name: "Comment & DM Automation", desc: "Auto-reply with keyword triggers, so leads get answered fast.", icon: MessageSquare },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-6 md:p-8 relative overflow-hidden"
    >
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-600/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center gap-2 mb-4 relative z-10">
        <Link2 size={14} className="text-indigo-500" />
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Growth Operations</span>
      </div>

      <h3 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white tracking-tight mb-2 relative z-10">
        One page for every platform, <span className="text-indigo-500">every sale, and every lead</span>
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed max-w-2xl relative z-10">
        We set up and configure a branded hub for your business: one link that consolidates your social
        platforms, sells products or services, and captures leads. Pricing is discussed on a call.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5 relative z-10 mb-8">
        {capabilities.map((c) => (
          <div key={c.name} className="flex flex-col">
            <div className="flex items-center gap-2 mb-1.5">
              <c.icon size={13} className="text-indigo-500/70 flex-shrink-0" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 truncate">{c.name}</p>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center relative z-10">
        <motion.a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-analytics-id="growth-ops-tile-book-call"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-8 py-3.5 rounded-full transition-colors shadow-sm shadow-indigo-600/20 cursor-pointer"
        >
          Book a Call
          <ArrowRight size={16} />
        </motion.a>
      </div>

      <p className="text-center text-xs text-slate-500 mt-4 relative z-10">
        Or see the full breakdown on the{" "}
        <Link to="/growth-operations" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
          Growth Operations page
        </Link>
        .
      </p>
    </motion.div>
  );
}
