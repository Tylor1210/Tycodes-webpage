import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeroTile from "./components/ui/HeroTile";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
import MainHeroFunnel from "./components/ui/MainHeroFunnel";
import {
  Newspaper,
  Share2,
  Bot,
  FolderOpen,
  ExternalLink,
  Zap,
  TrendingUp,
  ShieldCheck,
  Rocket,
  Database,
  Shield,
  Target,
  BarChart3,
} from "lucide-react";

function App() {
  const [news, setNews] = useState<{ title: string; url: string }[]>([]);
  const [market] = useState({ price: "5,130.42", change: "+0.45%" });
  const [isMarketOpen, setIsMarketOpen] = useState(false);
  const [visitorCount] = useState(1240);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
        );
        const ids = await response.json();
        const stories = await Promise.all(
          ids.slice(0, 4).map(async (id: number) => {
            const res = await fetch(
              `https://hacker-news.firebaseio.com/v0/item/${id}.json`
            );
            return res.json();
          })
        );
        setNews(stories);
      } catch (err) {
        console.error("Sync error", err);
      }
    };

    const checkMarket = () => {
      const now = new Date();
      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
        weekday: "short",
      }).formatToParts(now);
      const day = parts.find((p) => p.type === "weekday")?.value;
      const hour = parseInt(parts.find((p) => p.type === "hour")?.value || "0");
      setIsMarketOpen(day !== "Sat" && day !== "Sun" && hour >= 9 && hour < 16);
    };

    fetchNews();
    checkMarket();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020202] text-slate-900 dark:text-white selection:bg-blue-600/40 font-sans tracking-tight overflow-x-hidden flex flex-col transition-colors duration-300">
      {/* Background grid */}
      <div className="fixed inset-0 blueprint-grid pointer-events-none" />

      <main className="relative z-10 flex flex-col flex-1 w-[90%] mx-auto py-6 md:py-8 lg:py-10 max-w-[1400px]">
        {/* Navbar */}
        <Navbar market={market} isMarketOpen={isMarketOpen} visitorCount={visitorCount} />

        {/* ── Primary grid — flat for correct mobile stacking order ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">

          {/* 1. MAIN HERO FUNNEL — mobile: 1st | desktop: col1 row1 */}
          <div className="lg:col-start-1 lg:row-start-1">
            <MainHeroFunnel />
          </div>

          {/* 2. SERVICE MENU — mobile: 2nd | desktop: col2 row1 */}
          <Link
            to="/services"
            className="lg:col-start-2 lg:row-start-1 group rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.12)] p-5 transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-600 flex flex-col relative overflow-hidden"
          >
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-600/8 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between mb-3 relative z-10">
              <div className="flex items-center gap-2">
                <Database size={13} className="text-blue-500" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Web Development | Vite-com menu</span>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-600 group-hover:text-blue-500 transition-colors flex items-center gap-1">
                View Pricing <ExternalLink size={9} />
              </span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight mb-1 relative z-10">
              We don't build sites. We build <span className="text-blue-500">revenue engines.</span>
            </h3>
            <p className="text-[10px] text-slate-500 mb-4 leading-relaxed relative z-10">
              Every tier is a performance system designed to eliminate waste and compound margin over time. No platform lock-in. No hidden taxes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 relative z-10">
              {[
                { name: "Digital Presence", tag: "$799", desc: "Conversion-optimized landing page. Loads in under 1 second. Ranks locally. Costs you nothing after launch." },
                { name: "Vite-com", tag: "$1,500+", desc: "Custom checkout engine. Eliminate the 2% Shopify transaction tax and $600/yr in mandatory apps. You own the code." },
                { name: "High-Velocity E-com", tag: "$3,500+", desc: "Built for brands doing $250k+ in GMV. Real-time inventory, massive SKU support, and a storefront that never throttles under load." },
                { name: "Enterprise Contract", tag: "$25k+", desc: "Full infrastructure migration for high-volume operators. We replace every vendor dependency with infrastructure you own outright." },
              ].map((p) => (
                <div key={p.name} className="flex flex-col py-1 pointer-events-none border-b border-slate-100 dark:border-white/5 last:border-0 pb-3 md:pb-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">{p.name}</p>
                    <span className="text-[10px] font-black text-blue-500 border border-blue-500/20 bg-blue-500/5 px-2 py-0.5 rounded flex-shrink-0">
                      {p.tag}
                    </span>
                  </div>
                  <p className="text-[9px] text-slate-500 leading-relaxed max-w-[90%]">{p.desc}</p>
                </div>
              ))}
            </div>
          </Link>

          {/* 3. AUTONOMOUS SYSTEMS (AI Automation) — mobile: 3rd | desktop: col2 row2 */}
          <div className="lg:col-start-2 lg:row-start-2">
            <HeroTile />
          </div>

          {/* 4. SMALL CARDS GRID — mobile: 4th | desktop: col1 row2 */}
          <div className="lg:col-start-1 lg:row-start-2 grid grid-cols-2 gap-4">

            {/* PORTFOLIO */}
            <Link
              to="/projects"
              className="group rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-blue-500/30 transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-600 p-4 flex flex-col"
            >
              <div className="flex items-center gap-2 mb-3">
                <FolderOpen size={13} className="text-blue-500" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Portfolio</span>
              </div>
              <div className="space-y-2.5 flex-1">
                {[
                  { name: "Tycodes-webpage", lang: "TypeScript" },
                  { name: "tycodes-small-ecom1", lang: "TypeScript" },
                  { name: "confirmAutomation", lang: "Python" },
                  { name: "Data-Structures-and-Algos", lang: "C/C++" },
                  { name: "2026spring-c-projects", lang: "C" },
                ].map((p) => (
                  <div key={p.name} className="flex items-start justify-between group/item gap-1">
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-semibold text-slate-600 dark:text-slate-400 group-hover/item:text-blue-500 transition-colors truncate">
                        {p.name}
                      </p>
                      <span className="text-[8px] font-mono text-slate-400">{p.lang}</span>
                    </div>
                    <ExternalLink size={9} className="text-slate-300 dark:text-slate-700 group-hover:text-blue-500 transition-colors flex-shrink-0 mt-0.5" />
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-white/5">
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-blue-500 transition-colors flex items-center gap-1">
                  View all <ExternalLink size={8} />
                </span>
              </div>
            </Link>

            {/* DIGITAL PRESENCE */}
            <Link
              to="/digital-presence"
              className="group rounded-2xl bg-white dark:bg-slate-900/80 border border-blue-500/30 hover:border-blue-500/60 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] p-4 flex flex-col justify-between transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-600 relative overflow-hidden"
            >
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-blue-600/15 p-1.5 rounded-lg">
                    <Rocket size={11} className="text-blue-500" />
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-blue-500/80">Digital Presence</span>
                </div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white tracking-tight mb-1.5">
                  Your site. <span className="text-blue-500">Your margins.</span>
                </h3>
                <div className="space-y-1">
                  {[
                    { icon: Zap, sub: "Sub-1s load time" },
                    { icon: TrendingUp, sub: "Zero monthly fees" },
                    { icon: ShieldCheck, sub: "Localized SEO" },
                  ].map(({ icon: Icon, sub }) => (
                    <div key={sub} className="flex items-center gap-1.5">
                      <Icon size={9} className="text-blue-500 flex-shrink-0" />
                      <span className="text-[9px] text-slate-500 leading-snug">{sub}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                data-analytics-id="home-digital-presence-cta"
                className="mt-3 w-full py-1.5 bg-blue-600 group-hover:bg-blue-500 text-white text-[9px] font-black uppercase tracking-widest rounded-xl transition-all cursor-pointer">
                Get the Package
              </button>
            </Link>

            {/* BRAND INFRASTRUCTURE */}
            <Link
              to="/brand"
              className="group rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 p-4 flex flex-col justify-between transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <div className="flex items-center gap-2 mb-2">
                <Bot size={12} className="text-blue-500" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Auto-Growth</span>
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-tight mb-1">
                  Brand Infrastructure
                </h3>
                <p className="text-[9px] text-slate-500 leading-relaxed">
                  Autonomous content for YT, Twitch &amp; TikTok.
                </p>
              </div>
              <Share2 className="text-slate-300 dark:text-slate-700 group-hover:text-blue-500 transition-colors mt-2" size={20} />
            </Link>

            {/* LIVE TECH NEWS */}
            <div className="rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-4 overflow-hidden">
              <div className="flex items-center gap-2 mb-2.5 text-slate-500">
                <Newspaper size={11} />
                <span className="text-[9px] font-bold uppercase tracking-widest">Live Tech News</span>
              </div>
              <div className="space-y-2">
                {news.length > 0 ? (
                  news.slice(0, 4).map((item, i) => (
                    <a
                      key={i}
                      href={item?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-[9px] text-slate-600 dark:text-slate-400 line-clamp-2 tracking-tight hover:text-blue-500 transition-colors"
                    >
                      • {item?.title}
                    </a>
                  ))
                ) : (
                  <div className="space-y-1.5">
                    <div className="h-2 w-full bg-slate-100 dark:bg-white/5 animate-pulse rounded" />
                    <div className="h-2 w-3/4 bg-slate-100 dark:bg-white/5 animate-pulse rounded" />
                    <div className="h-2 w-5/6 bg-slate-100 dark:bg-white/5 animate-pulse rounded" />
                  </div>
                )}
              </div>
            </div>

          </div> {/* end small cards grid */}

        </div> {/* end primary grid */}




        {/* ── LOGISTICS-TO-LOGIC PILLAR ── */}
        <div className="mt-6 rounded-3xl bg-[#0a0a0a] border border-white/5 p-6 md:p-8 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: The concept */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Shield size={14} className="text-blue-400" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-blue-400 font-mono">&lt;TY/&gt; 92-Y Focus</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter mb-3 leading-tight">
                Logistics-to-Logic.<br />
                <span className="text-blue-500">Military precision. Applied to software.</span>
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xl mb-6">
                As a <strong className="text-white">U.S. Army National Guard 92-Y</strong> (Unit Supply Specialist), I managed supply chain operations where a single data silo or tracking failure had real-world consequences. That operational discipline is the foundation of every system I build.
              </p>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
                Most agencies build websites. We engineer <em className="text-white">supply chains for data</em> — systems where every tool, every API, every dollar flows with zero friction and full visibility. No silos. No dropped handoffs. No revenue that disappears between platforms.
              </p>
            </div>

            {/* Right: The 3 pillars */}
            <div className="flex flex-col gap-4">
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
                  <div className="bg-blue-500/10 p-2 rounded-lg w-fit h-fit flex-shrink-0 mt-0.5">
                    <Icon size={12} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-white mb-0.5">{label}</p>
                    <p className="text-[10px] text-slate-500 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
}

export default App;