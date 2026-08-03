import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Zap, TrendingUp, ShieldCheck, Rocket, Smartphone, BarChart3, Globe, ArrowRight } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { BookAuditBand } from "@/components/ui/BookAuditCTA";
import { fadeUp, staggerContainer, fadeUpItem } from "@/lib/motion";

export default function DigitalPresence() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <PageHeader
        icon={Rocket}
        eyebrow="Digital Presence Tier"
        title={
          <>
            Premium <span className="text-indigo-600">Landing Pages.</span>
          </>
        }
        subtitle="High-conversion landing pages on lightning-fast Vite + React architecture. Built for lead capture and local SEO to turn browsers into clients."
      />

      {/* Core pitch */}
      <motion.div
        {...fadeUp}
        className="rounded-3xl bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 p-8 mb-6"
      >
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">The Solution</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
          We deploy a high-performance Vite-based architecture that outperforms bloated Wix or Squarespace sites.
          This gives you enterprise-grade speed, a professional first impression, and localized SEO injection that
          ensures your brand actually appears in search results.
        </p>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-40px" }}
          variants={staggerContainer}
        >
          {[
            { icon: Zap, label: "Enterprise Speed", body: "Vite + React with zero framework overhead. Scores 95+ on Lighthouse." },
            { icon: TrendingUp, label: "Lead Capture", body: "Optimized conversion paths and custom forms to maximize inbound flow." },
            { icon: ShieldCheck, label: "Local SEO", body: "Schema markup + meta injection so you rank in local searches from day one." },
            { icon: Smartphone, label: "Mobile-First", body: "Responsive layouts optimized for thumb-navigation and lightning-fast mobile speeds." },
            { icon: BarChart3, label: "Insightful Tracking", body: "Google Analytics & Meta Pixel integration to track every visitor and conversion." },
            { icon: Globe, label: "Global Hosting", body: "Secure SSL encryption and deployment on a global CDN for 99.9% uptime." },
          ].map(({ icon: Icon, label, body }) => (
            <motion.div
              key={label}
              variants={fadeUpItem}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="bg-slate-50 dark:bg-white/3 rounded-2xl p-5 border border-slate-200 dark:border-white/5"
            >
              <div className="bg-indigo-600/10 p-2 rounded-lg w-fit mb-3">
                <Icon size={14} className="text-indigo-600" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{label}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Savings callout */}
      <motion.div
        {...fadeUp}
        className="rounded-3xl bg-indigo-50 dark:bg-indigo-600/10 border border-indigo-200 dark:border-indigo-600/20 p-6 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-6"
      >
        <div className="shrink-0">
          <p className="text-3xl font-semibold text-indigo-600 dark:text-indigo-400 tracking-tight">$799</p>
          <p className="text-xs text-slate-500 uppercase tracking-wide font-bold">One-Time Setup</p>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          The ultimate foundation for service-based businesses. No monthly hosting fees, no bloated platform costs.
          Just professional architecture you own.
        </p>
      </motion.div>

      {/* Next step pointer */}
      <motion.div {...fadeUp}>
        <Link
          to="/services"
          data-analytics-id="digital-presence-website-infrastructure-pointer"
          className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] p-5 mb-12 hover:border-indigo-500/40 transition-colors cursor-pointer"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-indigo-600 mb-1">Need more than one page?</p>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Check out <span className="font-semibold text-slate-900 dark:text-white">Website Infrastructure</span>{" "}
              ($999), a 5-page site with a built-in AI visitor concierge, the next step up from a single landing page.
            </p>
          </div>
          <ArrowRight size={18} className="text-indigo-600 shrink-0 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>

      <BookAuditBand analyticsId="digital-presence-bottom-book-audit" />
    </div>
  );
}
