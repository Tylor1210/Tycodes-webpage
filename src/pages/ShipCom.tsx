import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Package, CheckCircle2, ShoppingCart, Database, Info } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import PricingTierCard from "@/components/ui/PricingTierCard";
import { BookAuditBand } from "@/components/ui/BookAuditCTA";
import { BOOKING_URL } from "@/lib/constants";
import { fadeUp, staggerContainer, fadeUpItem } from "@/lib/motion";

const tiers = [
  {
    id: "tier1",
    name: "Tier 1: Small E-com",
    description: '(Growth Focus) — For emerging brands replacing Shopify Basic.',
    price: "$2,500",
    priceLabel: "Setup",
    monthly: "$99/mo",
    roi: "+ $7,976 3-Year ROI",
  },
  {
    id: "tier2",
    name: "Tier 2: Large E-com",
    description: "(Scale Focus) — For established retailers replacing Shopify Pro/Growth.",
    price: "$5,000",
    priceLabel: "Setup",
    monthly: "$199/mo",
    roi: "+ $10,796 3-Year ROI",
    badge: "Popular" as const,
  },
  {
    id: "tier3",
    name: 'Tier 3: The "Contract"',
    description: "(Enterprise/Titan Focus) — For corporations replacing Shopify Plus ($2M+ revenue).",
    price: "$25k–$50k",
    priceLabel: "Setup",
    monthly: "$2,500/mo",
    roi: "+ $468,000 3-Year ROI",
  },
];

const breakdowns = [
  {
    title: "Tier 1: Small E-com Cost Profile",
    competitor: "Shopify Basic",
    ours: 'TYcodes "Pure Path"',
    rows: [
      ["Monthly Managed Fee", "$39", "$99"],
      ["Transaction Tax", "2.0% (Added Fee)", "0% (Direct Integration)"],
      ["Shipping Apps", "$30 - $60/mo", "$0 (API Integrated)"],
    ],
  },
  {
    title: "Tier 2: Large E-com Cost Profile",
    competitor: "Shopify Pro",
    ours: "TYcodes Enterprise",
    rows: [
      ["Monthly Managed Fee", "$105", "$199"],
      ["Transaction Tax", "1.0% (approx. $5k on $500k)", "0% (Direct Bank API)"],
      ["Shipping Surcharges", "High (Hidden Markups)", "$0 (Base Rate Access)"],
    ],
  },
  {
    title: 'Tier 3: The "Contract" Cost Profile',
    competitor: "Shopify Plus",
    ours: "TYcodes Custom Infra",
    rows: [
      ["Monthly Managed Fee", "$2,300", "$2,500"],
      ["Transaction Tax", "0.5% ($100k on $20M sales)", "0% (Direct Bank/Stripe)"],
      ["Logistics Audit Recovery", "$0 (Lost Revenue)", "2% Avg. Reclaimed"],
    ],
  },
];

export default function ShipComPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <PageHeader
        icon={Package}
        eyebrow="The Ship-com Package"
        accent="indigo"
        title={
          <>
            The Logistics &amp; <span className="text-indigo-600 dark:text-indigo-400">Commerce Suite.</span>
          </>
        }
        subtitle="Target: brands shipping physical goods who are currently losing margins to platform fees and shipping inefficiencies."
      />

      {/* Clarifying note vs. Vite-com */}
      <motion.div
        {...fadeUp}
        className="flex gap-3 items-start bg-indigo-500/5 border border-indigo-500/20 rounded-2xl px-5 py-4 mb-12"
      >
        <Info size={16} className="text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Shipping &amp; Commerce packages include ongoing logistics and fulfillment management, which is why
          pricing differs from our standalone storefront builds — see{" "}
          <Link to="/services" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
            Services
          </Link>{" "}
          for the full comparison.
        </p>
      </motion.div>

      {/* Pricing Tiers Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {tiers.map((tier) => (
          <div key={tier.name} className="flex flex-col">
            <PricingTierCard
              name={tier.name}
              description={tier.description}
              price={tier.price}
              priceLabel={tier.priceLabel}
              monthly={tier.monthly}
              badge={tier.badge ? { label: tier.badge, tone: "indigo" } : undefined}
              ctaLabel="Book a Strategy Call"
              ctaHref={BOOKING_URL}
              ctaAnalyticsId={`shipcom-${tier.id}-cta`}
              highlighted={!!tier.badge}
            />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="mt-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-2.5"
            >
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 tracking-wide uppercase text-center">
                {tier.roi}
              </p>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Detailed Cost Comparison */}
      <h2 className="text-2xl font-semibold tracking-tight mb-8 flex items-center gap-3 text-slate-900 dark:text-white">
        <ShoppingCart className="text-indigo-600 dark:text-indigo-400" /> Infrastructure Breakdown
      </h2>

      <motion.div
        className="space-y-8 mb-16"
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-40px" }}
        variants={staggerContainer}
      >
        {breakdowns.map((b) => (
          <motion.div
            key={b.title}
            variants={fadeUpItem}
            className="rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden"
          >
            <div className="bg-white dark:bg-[#0a0a0a] p-5 border-b border-slate-200 dark:border-white/10">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-wide uppercase">{b.title}</h3>
            </div>
            <div className="bg-slate-50 dark:bg-[#050505] p-5 overflow-x-auto">
              <table className="w-full text-left text-sm min-w-[500px]">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-white/5 text-[11px] uppercase tracking-wide text-slate-500">
                    <th className="pb-3 w-1/3">Expense Category</th>
                    <th className="pb-3 text-rose-500/80">{b.competitor}</th>
                    <th className="pb-3 text-indigo-600 dark:text-indigo-400">{b.ours}</th>
                  </tr>
                </thead>
                <tbody>
                  {b.rows.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-slate-100 dark:border-white/5 last:border-0 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                    >
                      <td className="py-3 text-slate-700 dark:text-slate-300 font-medium">{row[0]}</td>
                      <td className="py-3 text-slate-500 font-mono text-xs">{row[1]}</td>
                      <td className="py-3 text-slate-700 dark:text-slate-300 font-mono text-xs">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Strategic Comparison */}
      <h2 className="text-2xl font-semibold tracking-tight mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
        <Database className="text-indigo-600 dark:text-indigo-400" /> Strategic Comparison: Why a Custom Stack Wins
      </h2>
      <motion.div
        {...fadeUp}
        className="rounded-3xl bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 p-6 md:p-8 overflow-x-auto mb-10 shadow-sm"
      >
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-slate-200 dark:border-white/10 text-[11px] uppercase tracking-wide text-slate-500">
              <th className="pb-3 font-bold w-1/4">Feature</th>
              <th className="pb-3 font-bold w-[37.5%] text-slate-500 dark:text-slate-400">Legacy E-commerce Platforms</th>
              <th className="pb-3 font-bold text-indigo-600 dark:text-indigo-400">TYcodes Automated Systems</th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium">
            {[
              ["Checkout Speed", "Throttled by platform scripts", "Instant (React/Vite optimized)"],
              ["Payment Gateway", 'Forced 3rd party "middleman" fees', "Direct-to-Bank (Stripe Elements)"],
              ["Data Control", "Proprietary/Locked DB", "Raw Postgres/SQL Access"],
              ["Scaling", "Higher revenue = Higher platform %", "Fixed Cost Infrastructure"],
            ].map((row) => (
              <tr
                key={row[0]}
                className="border-b border-slate-100 dark:border-white/5 last:border-0 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
              >
                <td className="py-4 text-slate-900 dark:text-white font-bold">{row[0]}</td>
                <td className="py-4 text-slate-600 dark:text-slate-400 border-r border-slate-100 dark:border-white/5 pr-4 mr-4">
                  {row[1]}
                </td>
                <td className="py-4 pl-4 text-indigo-700 dark:text-indigo-300 font-mono flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 rounded-full" />
                  {row[2]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <BookAuditBand analyticsId="shipcom-bottom-book-audit" />
    </div>
  );
}
