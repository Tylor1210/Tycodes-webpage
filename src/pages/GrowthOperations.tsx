import { motion } from "motion/react";
import { Users, GitBranch, Mail, Share2, ListChecks, BarChart3 } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import PricingTierCard from "@/components/ui/PricingTierCard";
import { BookAuditBand } from "@/components/ui/BookAuditCTA";
import { BOOKING_URL } from "@/lib/constants";
import { fadeUp, staggerContainer, fadeUpItem } from "@/lib/motion";

const capabilities = [
  {
    icon: GitBranch,
    label: "Lead & Deal Pipeline",
    body: "Track every prospect from first contact to close, with clear stages so nothing slips through.",
  },
  {
    icon: Mail,
    label: "Inbox Integration",
    body: "See and reply to lead conversations without leaving the system.",
  },
  {
    icon: Share2,
    label: "Referral Tracking",
    body: "Know exactly who referred which client, and reward it accordingly.",
  },
  {
    icon: ListChecks,
    label: "Team Tasks & Follow-Ups",
    body: "Assign and track follow-up tasks so leads get contacted on schedule, every time.",
  },
  {
    icon: BarChart3,
    label: "Activity Dashboards",
    body: "A real-time view of pipeline health, conversion rates, and team performance.",
  },
  {
    icon: Users,
    label: "Client Communication Log",
    body: "Every call, email, and note tied to the client record, all in one place.",
  },
];

const steps = [
  "We assess your current lead and client process, and identify what's falling through the cracks.",
  "We configure the system for your business: pipelines, automations, and the integrations you actually use.",
  "We train your team and hand off a fully working setup, ready to run.",
];

export default function GrowthOperationsPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <PageHeader
        icon={Users}
        eyebrow="Growth Operations Setup"
        title={
          <>
            Run your leads and clients <span className="text-indigo-600 dark:text-indigo-400">like a real business.</span>
          </>
        }
        subtitle="We set up and configure a complete client and lead management system for your business: pipeline tracking, automated follow-up, referral tracking, and team task management, all in one place. Every setup is scoped to your business, so pricing is discussed on a call."
      />

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12"
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-40px" }}
        variants={staggerContainer}
      >
        {capabilities.map(({ icon: Icon, label, body }) => (
          <motion.div
            key={label}
            variants={fadeUpItem}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 p-5 hover:border-indigo-500/30 transition-colors shadow-sm"
          >
            <div className="bg-indigo-600/10 p-2 rounded-lg w-fit mb-3">
              <Icon size={14} className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{label}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{body}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        {...fadeUp}
        className="rounded-3xl bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 p-8 mb-12 shadow-sm"
      >
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white mb-4">How it works</h2>
        <ol className="space-y-4">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold text-lg font-mono leading-none mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
      </motion.div>

      <motion.div {...fadeUp} className="mb-12 max-w-md mx-auto">
        <PricingTierCard
          name="Growth Operations Setup"
          description="Custom-scoped to your business size and sales process."
          ctaLabel="Book a Call"
          ctaHref={BOOKING_URL}
          ctaAnalyticsId="growth-operations-cta"
        />
      </motion.div>

      <BookAuditBand analyticsId="growth-operations-bottom-book-audit" />
    </div>
  );
}
