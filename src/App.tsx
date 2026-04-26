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

        {/* ── Primary grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">

          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-4">
            {/* MAIN HERO FUNNEL */}
            <MainHeroFunnel />

            {/* 2-col grid: all remaining cards */}
            <div className="grid grid-cols-2 gap-4">

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

              {/* STARTUP PACKAGE */}
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
                    Premium <span className="text-blue-500">Landing Pages.</span>
                  </h3>
                  <div className="space-y-1">
                    {[
                      { icon: Zap, sub: "Vite + React" },
                      { icon: TrendingUp, sub: "100% margin" },
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

              {/* LIVE DATA STREAM */}
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

            </div> {/* end 2-col sub-grid */}
          </div> {/* end left column */}

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-4">

            {/* SERVICE MENU */}
            <Link
              to="/services"
              className="group rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.12)] p-5 transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-600 flex flex-col relative overflow-hidden"
            >
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-600/8 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center justify-between mb-3 relative z-10">
                <div className="flex items-center gap-2">
                  <Database size={13} className="text-blue-500" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Service Menu</span>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-600 group-hover:text-blue-500 transition-colors flex items-center gap-1">
                  View Pricing <ExternalLink size={9} />
                </span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight mb-1 relative z-10">
                Web Architecture &amp; Development
              </h3>
              <p className="text-[10px] text-slate-500 mb-4 leading-relaxed relative z-10">
                Custom Vite + React infrastructure. Eliminate platform taxes and keep your margins.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 relative z-10">
                {[
                  { name: "Digital Presence", tag: "$799", desc: "High-Conversion Landing Page. Lightning-fast Vite + React architecture. Built for lead capture and local SEO to turn browsers into clients." },
                  { name: "Vite-com", tag: "$1,500+", desc: "Custom Storefront Engine. Replace Shopify/Wix with a high-margin Stripe build. Zero platform fees and total ownership of your checkout." },
                  { name: "High-Velocity E-com", tag: "$3,500+", desc: "Enterprise-Grade Scale. Optimized for massive SKU catalogs and heavy traffic. Built on Supabase for real-time inventory and sub-second performance." },
                  { name: "Enterprise Contract", tag: "$25k+", desc: "Strategic Systems Architect. Full-scale custom infrastructure and autonomous workflows for businesses doing millions in GMV." },
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

            {/* AUTONOMOUS SYSTEMS */}
            <HeroTile />

          </div> {/* end right column */}
        </div> {/* end primary grid */}

        <Footer />
      </main>
    </div>
  );
}

export default App;