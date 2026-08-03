import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Database, CheckCircle2, TrendingUp, BarChart3, MessageSquare, Star, Cable, Bot, Sparkles, ArrowRight } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import PricingTierCard from "@/components/ui/PricingTierCard";
import { BookAuditBand } from "@/components/ui/BookAuditCTA";
import { BOOKING_URL } from "@/lib/constants";
import { fadeUp, staggerContainer, fadeUpItem } from "@/lib/motion";

const mainTiers = [
  {
    name: "Digital Presence",
    price: "$799",
    monthly: "N/A",
  },
  {
    name: "Website Infrastructure",
    price: "$999",
    priceLabel: "One-Time Setup Fee",
    monthly: "$0/mo",
    highlighted: true,
    badge: { label: "Recommended After Your Audit", tone: "amber" as const },
    description: "The complete foundation for a new LLC or growing local business.",
    features: [
      "Up to 5 custom pages (Home, About, Services, Contact, plus one more), built on the same Vite + React stack that powers our own site. No page-builder lock-in; you own the code.",
      "Mobile-first design with sub-1-second load times",
      "Local SEO built in from day one: schema markup, sitemap, and meta tags configured for your market",
      "AI-powered visitor concierge: a chat assistant trained on your business, built on the same AI engine behind our audit scanner, that answers FAQs and captures leads or bookings 24/7",
      "Contact and booking forms wired directly to your email and calendar, with no monthly form-builder fees",
      "30 days of post-launch support",
    ],
  },
  {
    name: "Vite-com",
    price: "$1,499",
    monthly: "N/A",
  },
  {
    name: "High-Velocity E-com",
    price: "$3,499",
    monthly: "$199/mo",
  },
  {
    name: "Enterprise Contract",
    description: "Full infrastructure migration for high-volume operators. Custom-scoped, so pricing is discussed on a call.",
    ctaLabel: "Book a Call",
    ctaHref: BOOKING_URL,
    ctaAnalyticsId: "services-enterprise-contract-cta",
  },
];

const autonomousTiers = [
  {
    name: "Lead Capture & Booking",
    price: "$999 + $69/mo",
    subtitle: "Never Miss An Inquiry",
    body: "Instantly qualifies and books every website inquiry onto your calendar, day or night.",
    icon: MessageSquare,
  },
  {
    name: "Follow-Up & Reviews",
    price: "$999 + $69/mo",
    subtitle: "Repeat Customers & Reviews",
    body: "Automated post-sale follow-up and review requests that keep customers coming back.",
    icon: Star,
  },
  {
    name: "Back-Office Sync",
    price: "$999 + $69/mo",
    subtitle: "No More Double Entry",
    body: "Connects your CRM, invoicing, and inbox so new leads and orders sync automatically.",
    icon: Cable,
  },
];

export default function ServicesPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <PageHeader
        icon={Database}
        eyebrow="Services & Pricing"
        title={
          <>
            Web Architecture &amp; <span className="text-indigo-600">Development.</span>
          </>
        }
        subtitle='Custom infrastructure that replaces expensive subscriptions and per-transaction fees with something you own outright. These are our transparent, one-time pricing models.'
      />

      {/* Pricing Tiers Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {mainTiers.map((tier) => (
          <PricingTierCard
            key={tier.name}
            name={tier.name}
            price={tier.price}
            priceLabel={tier.priceLabel}
            monthly={tier.monthly}
            highlighted={tier.highlighted}
            badge={tier.badge}
            description={tier.description}
            features={tier.features}
            ctaLabel={tier.ctaLabel}
            ctaHref={tier.ctaHref}
            ctaAnalyticsId={tier.ctaAnalyticsId}
          />
        ))}
      </div>

      {/* AI Concierge callout */}
      <motion.div
        {...fadeUp}
        className="rounded-2xl border border-indigo-200 dark:border-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-500/[0.06] p-6 mb-12 flex items-start gap-4"
      >
        <div className="bg-indigo-600/10 p-2.5 rounded-xl shrink-0">
          <Sparkles className="text-indigo-600" size={20} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
            New: AI Visitor Concierge, included in Website Infrastructure
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Every Website Infrastructure build ships with a chat assistant trained on your business, built on the
            same AI engine that powers our audit scanner. It answers visitor questions and captures leads or
            bookings around the clock, so you're not paying a separate monthly fee for a chatbot app.
          </p>
        </div>
      </motion.div>

      {/* 3-Year ROI Chart */}
      <motion.div
        {...fadeUp}
        className="rounded-3xl bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 p-6 md:p-8 mb-12 overflow-x-auto"
      >
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="text-emerald-600 dark:text-emerald-500" size={20} />
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">3-Year Average Savings Chart</h2>
        </div>
        <p className="text-xs text-slate-500 mb-6 font-mono">
          *Figures represent reclaimed "Platform Tax" minus our service fees. (Pure Infrastructure Focus)
        </p>
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-slate-200 dark:border-white/10 text-xs uppercase tracking-wide text-slate-500">
              <th className="pb-3 font-bold w-1/4">Service Tier</th>
              <th className="pb-3 font-bold">Year 1 Savings</th>
              <th className="pb-3 font-bold">Year 2 Savings</th>
              <th className="pb-3 font-bold">Year 3 Savings</th>
              <th className="pb-3 font-bold text-emerald-600 dark:text-emerald-500">Total 3-Year ROI</th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium">
            <tr className="border-b border-slate-100 dark:border-white/5 group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
              <td className="py-4 text-slate-900 dark:text-white font-bold group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Digital Presence</td>
              <td className="py-4 text-emerald-600 dark:text-emerald-400">-$213</td>
              <td className="py-4 text-emerald-600 dark:text-emerald-400">+$340</td>
              <td className="py-4 text-emerald-600 dark:text-emerald-400">+$603</td>
              <td className="py-4 text-emerald-600 dark:text-emerald-500 font-bold">+$730</td>
            </tr>
            <tr className="border-b border-slate-100 dark:border-white/5 group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
              <td className="py-4 text-slate-900 dark:text-white font-bold group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Website Infrastructure</td>
              <td className="py-4 text-emerald-600 dark:text-emerald-400">-$350</td>
              <td className="py-4 text-emerald-600 dark:text-emerald-400">+$610</td>
              <td className="py-4 text-emerald-600 dark:text-emerald-400">+$980</td>
              <td className="py-4 text-emerald-600 dark:text-emerald-500 font-bold">+$1,240</td>
            </tr>
            <tr className="border-b border-slate-100 dark:border-white/5 group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
              <td className="py-4 text-slate-900 dark:text-white font-bold group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Vite-com</td>
              <td className="py-4 text-emerald-600 dark:text-emerald-400">+$1,652</td>
              <td className="py-4 text-emerald-600 dark:text-emerald-400">+$4,412</td>
              <td className="py-4 text-emerald-600 dark:text-emerald-400">+$4,912</td>
              <td className="py-4 text-emerald-600 dark:text-emerald-500 font-bold">+$10,976</td>
            </tr>
            <tr className="border-b border-slate-100 dark:border-white/5 group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
              <td className="py-4 text-slate-900 dark:text-white font-bold group-hover:text-indigo-600 dark:group-hover:text-indigo-400">High-Velocity E-com</td>
              <td className="py-4 text-emerald-600 dark:text-emerald-400">+$2,772</td>
              <td className="py-4 text-emerald-600 dark:text-emerald-400">+$5,412</td>
              <td className="py-4 text-emerald-600 dark:text-emerald-400">+$6,112</td>
              <td className="py-4 text-emerald-600 dark:text-emerald-500 font-bold">+$14,296</td>
            </tr>
            <tr className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
              <td className="py-4 text-slate-900 dark:text-white font-bold group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Enterprise Contract</td>
              <td className="py-4 text-emerald-600 dark:text-emerald-400">+$118,000</td>
              <td className="py-4 text-emerald-600 dark:text-emerald-400">+$160,000</td>
              <td className="py-4 text-emerald-600 dark:text-emerald-400">+$190,000</td>
            </tr>
          </tbody>
        </table>
      </motion.div>

      {/* Workflow Automation Section */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-indigo-600/10 p-3 rounded-xl">
          <Bot className="text-indigo-600" size={20} />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Workflow <span className="text-indigo-600">Automation.</span>
        </h2>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-40px" }}
        variants={staggerContainer}
      >
        {autonomousTiers.map((pkg) => (
          <motion.div
            key={pkg.name}
            variants={fadeUpItem}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-white/3 rounded-2xl p-5 border border-slate-200 dark:border-white/5 flex flex-col hover:border-indigo-500/30 transition-colors"
          >
            <div className="bg-indigo-600/10 p-2 rounded-lg w-fit mb-4">
              <pkg.icon size={14} className="text-indigo-600" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wide text-indigo-600 mb-1">{pkg.name}</h3>
            <p className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight mb-1">{pkg.price}</p>
            <p className="text-xs font-mono text-slate-500 uppercase tracking-wide mb-4">{pkg.subtitle}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{pkg.body}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Bundle pointer */}
      <motion.div {...fadeUp}>
        <Link
          to="/automation"
          data-analytics-id="services-automation-bundle-pointer"
          className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] p-5 mb-12 hover:border-indigo-500/40 transition-colors cursor-pointer"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-indigo-600 mb-1">Want all three?</p>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Get <span className="font-semibold text-slate-900 dark:text-white">Full Ecosystem Access</span> -
              all three workflow systems for $1,999 + $99/mo, on the Automation page.
            </p>
          </div>
          <ArrowRight size={18} className="text-indigo-600 shrink-0 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>

      {/* Detailed cost comparison breakdown */}
      <h2 className="text-2xl font-bold tracking-tight mb-8 flex items-center gap-3 text-slate-900 dark:text-white">
        <BarChart3 className="text-indigo-600" /> Detailed Cost Comparison
      </h2>

      <motion.div
        className="space-y-8 mb-12"
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-40px" }}
        variants={staggerContainer}
      >
        {/* Digital Presence comp */}
        <motion.div variants={fadeUpItem} className="rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden">
          <div className="bg-white dark:bg-[#0a0a0a] p-5 border-b border-slate-200 dark:border-white/10">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 tracking-tight">1. Digital Presence (Landing Page)</h3>
            <p className="text-xs text-slate-500 font-mono">Target: Service professionals replacing Wix or Squarespace.</p>
          </div>
          <div className="bg-slate-50 dark:bg-[#050505] p-5 overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[500px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/5 text-xs uppercase tracking-wide text-slate-500">
                  <th className="pb-3 w-1/3">Expense Category</th>
                  <th className="pb-3 text-rose-600 dark:text-rose-400/80">Legacy Platform (Wix/Squarespace)</th>
                  <th className="pb-3 text-emerald-600 dark:text-emerald-500">TYcodes "Pure Path" (Vite)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Annual Subscription", "$432 ($36/mo avg)", "$0 (Cloudflare Pages)"],
                  ["Email Hosting", "$84 ($7/mo)", "$12 (Zoho Mail)"],
                  ["Domain Renewal", "$20", "$15 (Cloudflare)"],
                  ["Hidden 'Bloat' Fees", "$50 (Template/Plugin renewals)", "$0 (Custom Built)"],
                  ["Year 1 Setup Fee", "$0", "$799 (Your Fee)"],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-slate-100 dark:border-white/5 last:border-0 hover:bg-white dark:hover:bg-white/5 transition-colors">
                    <td className="py-3 text-slate-700 dark:text-slate-300 font-medium">{row[0]}</td>
                    <td className="py-3 text-slate-500 font-mono text-xs">{row[1]}</td>
                    <td className="py-3 text-slate-700 dark:text-slate-300 font-mono text-xs">{row[2]}</td>
                  </tr>
                ))}
                <tr className="bg-slate-100 dark:bg-white/5 font-bold">
                  <td className="py-3 px-3 rounded-l-lg text-slate-900 dark:text-white">TOTAL (Year 1)</td>
                  <td className="py-3 text-rose-600 dark:text-rose-400 font-mono text-xs">$586</td>
                  <td className="py-3 rounded-r-lg text-emerald-600 dark:text-emerald-500 font-mono text-xs">$826</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Website Infrastructure comp */}
        <motion.div variants={fadeUpItem} className="rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden">
          <div className="bg-white dark:bg-[#0a0a0a] p-5 border-b border-slate-200 dark:border-white/10">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 tracking-tight">2. Website Infrastructure (AI-Enabled Site)</h3>
            <p className="text-xs text-slate-500 font-mono">
              Target: New LLCs and growing local businesses replacing a site builder plus a separate chatbot and form-builder subscription.
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-[#050505] p-5 overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[500px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/5 text-xs uppercase tracking-wide text-slate-500">
                  <th className="pb-3 w-1/3">Expense Category</th>
                  <th className="pb-3 text-rose-600 dark:text-rose-400/80">Legacy Stack (Builder + Chatbot + Forms)</th>
                  <th className="pb-3 text-emerald-600 dark:text-emerald-500">TYcodes Website Infrastructure</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Site Builder Subscription", "$432 ($36/mo avg)", "$0 (Cloudflare Pages)"],
                  ["AI Chatbot / Live-Chat Tool", "$300 ($25/mo avg)", "$0 (AI Concierge included)"],
                  ["Form-Builder Fees", "$180 ($15/mo avg)", "$0 (Native form integration)"],
                  ["Domain Renewal", "$20", "$15 (Cloudflare)"],
                  ["Year 1 Setup Fee", "$0", "$999 (Your Fee)"],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-slate-100 dark:border-white/5 last:border-0 hover:bg-white dark:hover:bg-white/5 transition-colors">
                    <td className="py-3 text-slate-700 dark:text-slate-300 font-medium">{row[0]}</td>
                    <td className="py-3 text-slate-500 font-mono text-xs">{row[1]}</td>
                    <td className="py-3 text-slate-700 dark:text-slate-300 font-mono text-xs">{row[2]}</td>
                  </tr>
                ))}
                <tr className="bg-slate-100 dark:bg-white/5 font-bold">
                  <td className="py-3 px-3 rounded-l-lg text-slate-900 dark:text-white">TOTAL (Year 1)</td>
                  <td className="py-3 text-rose-600 dark:text-rose-400 font-mono text-xs">$932</td>
                  <td className="py-3 rounded-r-lg text-emerald-600 dark:text-emerald-500 font-mono text-xs">$1,014</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Vite-com comp */}
        <motion.div variants={fadeUpItem} className="rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden">
          <div className="bg-white dark:bg-[#0a0a0a] p-5 border-b border-slate-200 dark:border-white/10">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 tracking-tight">3. Vite-com (Custom Storefront)</h3>
            <p className="text-xs text-slate-500 font-mono">Target: Emerging brands replacing Shopify Basic.</p>
          </div>
          <div className="bg-slate-50 dark:bg-[#050505] p-5 overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[500px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/5 text-xs uppercase tracking-wide text-slate-500">
                  <th className="pb-3 w-1/3">Expense Category</th>
                  <th className="pb-3 text-rose-600 dark:text-rose-400/80">Shopify Basic + Apps</th>
                  <th className="pb-3 text-emerald-600 dark:text-emerald-500">TYcodes E-com (Vite+Stripe)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Platform Subscription", "$468 ($39/mo)", "$0 (Serverless)"],
                  ["Transaction Tax", "2.0% (3rd party gateway fee)", "0% (Direct Stripe Integration)"],
                  ["Essential Apps", "$600 (Reviews, Upsells, SEO)", "$0 (Hard-coded Features)"],
                  ["Year 1 Setup Fee", "$0", "$1,499 (Your Fee)"],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-slate-100 dark:border-white/5 hover:bg-white dark:hover:bg-white/5 transition-colors">
                    <td className="py-3 text-slate-700 dark:text-slate-300 font-medium">{row[0]}</td>
                    <td className="py-3 text-slate-500 font-mono text-xs">{row[1]}</td>
                    <td className="py-3 text-slate-700 dark:text-slate-300 font-mono text-xs">{row[2]}</td>
                  </tr>
                ))}
                <tr className="bg-slate-100 dark:bg-white/5 font-bold">
                  <td className="py-3 px-3 rounded-l-lg text-slate-900 dark:text-white">Avg. Annual Waste</td>
                  <td className="py-3 text-rose-600 dark:text-rose-400 font-mono text-xs">$4,240 (on $150k sales)</td>
                  <td className="py-3 rounded-r-lg text-emerald-600 dark:text-emerald-500 font-mono text-xs">$1,188</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* High-Velocity E-com comp */}
        <motion.div variants={fadeUpItem} className="rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden">
          <div className="bg-white dark:bg-[#0a0a0a] p-5 border-b border-slate-200 dark:border-white/10">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 tracking-tight">4. High-Velocity E-com (Enterprise Scale)</h3>
            <p className="text-xs text-slate-500 font-mono">Target: Established retailers replacing Shopify "Growth" or "Pro".</p>
          </div>
          <div className="bg-slate-50 dark:bg-[#050505] p-5 overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[500px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/5 text-xs uppercase tracking-wide text-slate-500">
                  <th className="pb-3 w-1/3">Expense Category</th>
                  <th className="pb-3 text-rose-600 dark:text-rose-400/80">Shopify Pro + Enterprise Apps</th>
                  <th className="pb-3 text-emerald-600 dark:text-emerald-500">TYcodes Enterprise (React+Supabase)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Platform Subscription", "$1,260 ($105/mo)", "$300 (Supabase/Edge)"],
                  ["Transaction Tax", "1.0% (approx. $5,000 on $500k)", "0% (Direct Stripe Integration)"],
                  ["App Stack 'Tax'", "$1,800 (Inventory, Filter, Search)", "$0 (Integrated API Logic)"],
                  ["Infrastructure Costs", "Included", "$0 (Edge architecture)"],
                  ["Year 1 Setup Fee", "$0", "$3,499 (Your Fee)"],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-slate-100 dark:border-white/5 last:border-0 hover:bg-white dark:hover:bg-white/5 transition-colors">
                    <td className="py-3 text-slate-700 dark:text-slate-300 font-medium">{row[0]}</td>
                    <td className="py-3 text-slate-500 font-mono text-xs">{row[1]}</td>
                    <td className="py-3 text-slate-700 dark:text-slate-300 font-mono text-xs">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Enterprise Contract */}
        <motion.div
          variants={fadeUpItem}
          className="rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6"
        >
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 tracking-tight">
              5. Enterprise Contract (Full Migration)
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
              For high-volume operators replacing Shopify Plus or an equivalent enterprise platform. Every
              engagement is scoped to your infrastructure and traffic, so pricing is discussed on a call rather
              than listed here.
            </p>
          </div>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics-id="services-enterprise-contract-comparison-cta"
            className="inline-flex items-center justify-center gap-1.5 shrink-0 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wide bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            Book a Call
          </a>
        </motion.div>
      </motion.div>

      {/* Final Summary Table */}
      <h2 className="text-2xl font-bold tracking-tight mb-6 text-slate-900 dark:text-white">Service Summary</h2>
      <motion.div
        {...fadeUp}
        className="rounded-3xl bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 p-6 md:p-8 overflow-x-auto mb-10"
      >
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-slate-200 dark:border-white/10 text-xs uppercase tracking-wide text-slate-500">
              <th className="pb-3 font-bold w-1/5">Service Tier</th>
              <th className="pb-3 font-bold w-1/5">Setup Fee</th>
              <th className="pb-3 font-bold w-1/5">Monthly Management</th>
              <th className="pb-3 font-bold">Primary "Tax" Removed</th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium">
            {[
              ["Digital Presence", "$799", "$0", "Monthly Hosting Subscriptions"],
              ["Website Infrastructure", "$999", "$0", "AI Chatbot, Form-Builder & Site-Builder Subscriptions"],
              ["Vite-com", "$1,499", "$0", "App Fees & Third-Party Transaction Fees"],
              ["High-Velocity E-com", "$3,499", "$199", "High-SKU Management Fees & API Limits"],
              ["Enterprise Contract", "Book a Call", "Book a Call", "Enterprise Revenue Sharing & Variable Fees"],
              ["Lead Capture & Booking", "$999", "$69", "Missed Leads & Manual Scheduling"],
              ["Follow-Up & Reviews", "$999", "$69", "Lost Repeat Business & Review Gaps"],
              ["Back-Office Sync", "$999", "$69", "Manual Data Entry & Duplicate Work"],
              ["Full Ecosystem Access", "$1,999", "$99", "All Three, Managed as One System"],
            ].map((row, i) => (
              <tr key={i} className="border-b border-slate-100 dark:border-white/5 last:border-0 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                <td className="py-4 text-slate-900 dark:text-white font-bold">{row[0]}</td>
                <td className="py-4 font-mono text-indigo-600 dark:text-indigo-400">{row[1]}</td>
                <td className="py-4 text-slate-600 dark:text-slate-400 font-mono">{row[2]}</td>
                <td className="py-4 text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-indigo-600" />
                  {row[3]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <BookAuditBand analyticsId="services-bottom-book-audit" />
    </div>
  );
}
