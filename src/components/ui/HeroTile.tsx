import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Bot, MessageSquare, Star, Cable, ArrowRight } from "lucide-react";
import { BOOKING_URL } from "@/lib/constants";

export default function HeroTile() {
  const systems = [
    { name: "Lead Capture & Booking", desc: "Instantly qualifies and books every website inquiry, so no more missed leads.", icon: MessageSquare },
    { name: "Follow-Up & Reviews", desc: "Automated follow-up and review requests that keep customers coming back.", icon: Star },
    { name: "Back-Office Sync", desc: "Connects your CRM, invoicing, and inbox, so nothing gets entered twice.", icon: Cable },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-6 md:p-8 relative overflow-hidden"
    >
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-600/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center gap-2 mb-4 relative z-10">
        <Bot size={14} className="text-emerald-500" />
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Workflow Automation</span>
      </div>

      <h3 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white tracking-tight mb-2 relative z-10">
        Automation that <span className="text-emerald-500">scales</span>, starting at $999
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed max-w-2xl relative z-10">
        Three workflow systems that handle the busywork: leads, follow-up, and back-office data entry, so
        nothing falls through the cracks. Ongoing maintenance is $69/mo, and it&apos;s optional.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5 relative z-10 mb-8">
        {systems.map((s) => (
          <div key={s.name} className="flex flex-col">
            <div className="flex items-center gap-2 mb-1.5">
              <s.icon size={13} className="text-emerald-500/70 flex-shrink-0" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 truncate">{s.name}</p>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center relative z-10">
        <motion.a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-analytics-id="hero-tile-automation-get-started"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-8 py-3.5 rounded-full transition-colors shadow-sm shadow-emerald-600/20 cursor-pointer"
        >
          Get Started Now
          <ArrowRight size={16} />
        </motion.a>
      </div>

      <p className="text-center text-xs text-slate-500 mt-4 relative z-10">
        Or see the full breakdown on the{" "}
        <Link to="/automation" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">
          Automation page
        </Link>
        .
      </p>
    </motion.div>
  );
}
