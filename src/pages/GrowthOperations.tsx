import { motion } from "motion/react";
import { Link2, Share2, MessageSquare, ShoppingBag, Mail, BarChart3 } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import PricingTierCard from "@/components/ui/PricingTierCard";
import { BookAuditBand } from "@/components/ui/BookAuditCTA";
import { BOOKING_URL } from "@/lib/constants";
import { fadeUp, staggerContainer, fadeUpItem } from "@/lib/motion";

const capabilities = [
  {
    icon: Link2,
    label: "Branded Link-in-Bio Page",
    body: "One mobile-first landing page for every platform you're on, fully branded and built to convert.",
  },
  {
    icon: Share2,
    label: "Cross-Platform Posting",
    body: "Publish once, and it goes out across Instagram, TikTok, X, Facebook, YouTube, LinkedIn, and Threads.",
  },
  {
    icon: MessageSquare,
    label: "Comment & DM Automation",
    body: "Auto-reply to comments and DMs with keyword triggers, so leads get a response before they lose interest.",
  },
  {
    icon: ShoppingBag,
    label: "Built-In Monetization",
    body: "Sell digital products, merch, or course access, and collect tips, directly from your page.",
  },
  {
    icon: Mail,
    label: "Lead Capture Forms",
    body: "Custom signup forms that build a contact list you own and can export any time.",
  },
  {
    icon: BarChart3,
    label: "Real-Time Analytics",
    body: "See exactly which links convert: views, clicks, geography, and traffic source, all in one dashboard.",
  },
];

const steps = [
  "We assess your current social platforms and online presence, and map out what should live on your page.",
  "We configure and brand the page, connect your platforms, and set up posting and reply automations.",
  "We train you on posting, monetization, and reading the analytics, then hand off a fully working setup.",
];

export default function GrowthOperationsPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <PageHeader
        icon={Link2}
        eyebrow="Growth Operations Setup"
        title={
          <>
            One page for every platform, <span className="text-indigo-600 dark:text-indigo-400">every sale, and every lead.</span>
          </>
        }
        subtitle="We set up and configure a branded hub for your business: a single link that consolidates your social platforms, sells products or services, and captures leads automatically. Every setup is scoped to your business, so pricing is discussed on a call."
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
          description="Custom-scoped to your business and the platforms you're already on."
          ctaLabel="Book a Call"
          ctaHref={BOOKING_URL}
          ctaAnalyticsId="growth-operations-cta"
        />
      </motion.div>

      <BookAuditBand analyticsId="growth-operations-bottom-book-audit" />
    </div>
  );
}
