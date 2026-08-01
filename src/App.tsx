import { Link } from "react-router-dom";
import { motion } from "motion/react";
import HeroTile from "./components/ui/HeroTile";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
import MainHeroFunnel from "./components/ui/MainHeroFunnel";
import { BookAuditButton, BookAuditBand } from "./components/ui/BookAuditCTA";
import {
  Share2,
  Bot,
  FolderOpen,
  ExternalLink,
  Zap,
  TrendingUp,
  ShieldCheck,
  Rocket,
  Database,
  Target,
  BarChart3,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4 },
};

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#020202] text-slate-900 dark:text-white selection:bg-indigo-600/40 font-sans tracking-tight overflow-x-hidden flex flex-col transition-colors duration-300">
      <main className="relative z-10 flex flex-col flex-1 w-[90%] mx-auto py-6 md:py-8 lg:py-10 max-w-[1400px]">
        <Navbar />

        {/* ── HERO ── */}
        <section className="relative rounded-3xl bg-slate-50 dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/5 overflow-hidden px-6 py-12 md:px-12 md:py-16">
          <div className="absolute inset-0 blueprint-grid pointer-events-none opacity-60" />
          <div className="relative z-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400 mb-4">
              AI-powered websites &amp; automation for small businesses
            </p>
            <h1 className="text-3xl md:text-5xl font-semibold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-5">
              Websites and AI, built on infrastructure you actually own.
            </h1>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8 max-w-xl">
              We build new sites, or add AI automation to the one you already have &mdash; on lean
              infrastructure you own outright. Most of what runs it costs nothing beyond your domain;
              a dedicated AI assistant is available as a simple add-on if you want one.
            </p>
            <BookAuditButton analyticsId="home-hero-book-audit" size="lg" />
          </div>

          <div className="relative z-10 mt-10 max-w-2xl">
            <MainHeroFunnel />
          </div>
        </section>

        {/* ── SERVICE MENU TEASER ── */}
        <motion.div {...fadeUp}>
          <Link
            to="/services"
            className="group mt-6 block rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 p-6 md:p-8 transition-all outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 relative overflow-hidden"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 relative z-10">
              <div className="flex items-center gap-2">
                <Database size={14} className="text-indigo-500" />
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Web Development Menu</span>
              </div>
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-600 group-hover:text-indigo-500 transition-colors flex items-center gap-1">
                View Pricing <ExternalLink size={11} />
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white tracking-tight mb-2 relative z-10">
              We don&apos;t build sites. We build <span className="text-indigo-500">revenue engines.</span>
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed max-w-2xl relative z-10">
              Every tier is designed to eliminate waste and compound margin over time. No platform lock-in, no hidden fees.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 relative z-10">
              {[
                { name: "Digital Presence", tag: "$799", desc: "Conversion-optimized landing page. Loads in under 1 second. Ranks locally. Costs you nothing after launch." },
                { name: "Vite-com", tag: "$1,500+", desc: "Custom checkout engine. Eliminate the 2% Shopify transaction fee and $600/yr in mandatory apps. You own the code." },
                { name: "High-Velocity E-com", tag: "$3,500+", desc: "Built for brands doing $250k+ in GMV. Real-time inventory, massive SKU support, and a storefront that never throttles under load." },
                { name: "Enterprise Contract", tag: "$25k+", desc: "Full infrastructure migration for high-volume operators. We replace every vendor dependency with infrastructure you own outright." },
              ].map((p) => (
                <div key={p.name} className="flex flex-col py-1 pointer-events-none border-b border-slate-100 dark:border-white/5 last:border-0 pb-4 md:pb-1">
                  <div className="flex items-center justify-between mb-1 gap-2">
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{p.name}</p>
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 bg-indigo-500/5 px-2 py-0.5 rounded flex-shrink-0">
                      {p.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-md">{p.desc}</p>
                </div>
              ))}
            </div>
          </Link>
        </motion.div>

        {/* ── PORTFOLIO / DIGITAL PRESENCE / BRAND ── */}
        <motion.div {...fadeUp} className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* PORTFOLIO */}
          <Link
            to="/projects"
            className="group rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/30 transition-all outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 p-5 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-4">
              <FolderOpen size={14} className="text-indigo-500" />
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Portfolio</span>
            </div>
            <div className="space-y-3 flex-1">
              {[
                { name: "Tycodes-webpage", lang: "TypeScript" },
                { name: "tycodes-small-ecom1", lang: "TypeScript" },
                { name: "confirmAutomation", lang: "Python" },
              ].map((p) => (
                <div key={p.name} className="flex items-start justify-between group/item gap-1">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 group-hover/item:text-indigo-500 transition-colors truncate">
                      {p.name}
                    </p>
                    <span className="text-[11px] font-mono text-slate-400">{p.lang}</span>
                  </div>
                  <ExternalLink size={11} className="text-slate-300 dark:text-slate-700 group-hover:text-indigo-500 transition-colors flex-shrink-0 mt-0.5" />
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 group-hover:text-indigo-500 transition-colors flex items-center gap-1">
                View all <ExternalLink size={10} />
              </span>
            </div>
          </Link>

          {/* DIGITAL PRESENCE */}
          <Link
            to="/digital-presence"
            className="group rounded-2xl bg-white dark:bg-slate-900/80 border border-indigo-500/30 hover:border-indigo-500/60 p-5 flex flex-col justify-between transition-all outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-indigo-600/15 p-1.5 rounded-lg">
                  <Rocket size={13} className="text-indigo-500" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">Digital Presence</span>
              </div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white tracking-tight mb-2">
                Your site. <span className="text-indigo-500">Your margins.</span>
              </h3>
              <div className="space-y-1.5">
                {[
                  { icon: Zap, sub: "Sub-1s load time" },
                  { icon: TrendingUp, sub: "Zero monthly fees" },
                  { icon: ShieldCheck, sub: "Localized SEO" },
                ].map(({ icon: Icon, sub }) => (
                  <div key={sub} className="flex items-center gap-1.5">
                    <Icon size={11} className="text-indigo-500 flex-shrink-0" />
                    <span className="text-xs text-slate-500 leading-snug">{sub}</span>
                  </div>
                ))}
              </div>
            </div>
            <button
              data-analytics-id="home-digital-presence-cta"
              className="mt-4 w-full py-2 bg-indigo-600 group-hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-all cursor-pointer">
              Get the Package
            </button>
          </Link>

          {/* BRAND INFRASTRUCTURE */}
          <Link
            to="/brand"
            className="group rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/40 p-5 flex flex-col justify-between transition-all outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
          >
            <div className="flex items-center gap-2 mb-3">
              <Bot size={13} className="text-indigo-500" />
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Auto-Growth</span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white tracking-tight mb-1.5">
                Brand Infrastructure
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Autonomous content for YT, Twitch &amp; TikTok.
              </p>
            </div>
            <Share2 className="text-slate-300 dark:text-slate-700 group-hover:text-indigo-500 transition-colors mt-3" size={22} />
          </Link>
        </motion.div>

        {/* ── AUTOMATION / HERO TILE ── */}
        <div className="mt-6">
          <HeroTile />
        </div>

        {/* ── LOGISTICS-TO-LOGIC PILLAR ── */}
        <motion.div {...fadeUp} className="mt-6 rounded-3xl bg-slate-50 dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/5 p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left: The concept */}
            <div className="lg:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400 mb-4">
                How we operate
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white tracking-tight mb-4 leading-tight">
                Built for reliability, not just launch day.
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mb-4">
                We treat every project like a system with a real owner: clear scope, measurable output, and no dropped
                handoffs. If something breaks, you&apos;ll hear from us before you have to ask.
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                That discipline comes in part from the founder&apos;s background as a{" "}
                <strong className="text-slate-900 dark:text-white">U.S. Army National Guard 92-Y</strong> (Unit Supply
                Specialist), managing supply chain operations where a dropped handoff had real consequences &mdash; the
                same standard now applied to every site and workflow we ship.
              </p>
            </div>

            {/* Right: The 3 pillars */}
            <div className="flex flex-col gap-5">
              {[
                {
                  icon: Target,
                  label: "Precision Architecture",
                  body: "Every integration point is intentional. No redundant tools, no vanity features — only systems that directly increase revenue or reduce operational cost."
                },
                {
                  icon: BarChart3,
                  label: "Accountability by Design",
                  body: "Every workflow we build has a measurable output. You always know exactly what the system is doing and what it's returning."
                },
                {
                  icon: ShieldCheck,
                  label: "Zero Tolerance for Waste",
                  body: "Platform fees, manual data entry, duplicate tools — we identify and eliminate every dollar of operational drag in your stack."
                }
              ].map(({ icon: Icon, label, body }) => (
                <div key={label} className="flex gap-3">
                  <div className="bg-indigo-500/10 p-2 rounded-lg w-fit h-fit flex-shrink-0 mt-0.5">
                    <Icon size={13} className="text-indigo-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">{label}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <BookAuditBand analyticsId="home-bottom-book-audit" />

        <Footer />
      </main>
    </div>
  );
}

export default App;
