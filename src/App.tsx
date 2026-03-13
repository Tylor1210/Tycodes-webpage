import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeroTile from "./components/ui/HeroTile";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
import { Newspaper, Share2, Bot, FolderOpen, ExternalLink, Zap, TrendingUp, ShieldCheck, Rocket, Database, Package } from "lucide-react";

function App() {
  const [news, setNews] = useState<{ title: string, url: string }[]>([]);
  const [market] = useState({ price: "5,130.42", change: "+0.45%" });
  const [isMarketOpen, setIsMarketOpen] = useState(false);
  const [visitorCount, setVisitorCount] = useState(1240);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
        const ids = await response.json();
        const stories = await Promise.all(ids.slice(0, 4).map(async (id: number) => {
          const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
          return res.json();
        }));
        setNews(stories);
      } catch (err) { console.error("Sync error", err); }
    };

    const checkMarket = () => {
      const now = new Date();
      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York", hour: "numeric", minute: "numeric", hour12: false, weekday: "short",
      }).formatToParts(now);
      const day = parts.find(p => p.type === 'weekday')?.value;
      const hour = parseInt(parts.find(p => p.type === "hour")?.value || "0");
      setIsMarketOpen(day !== "Sat" && day !== "Sun" && hour >= 9 && hour < 16);
    };

    const fetchVisitorCount = async () => {
      try {
        const response = await fetch("https://api.counterapi.dev/v1/tycodes/tycodes-site-visits/up");
        const data = await response.json();
        if (data && typeof data.count === 'number') {
          setVisitorCount(0 + data.count);
        }
      } catch (err) {
        console.error("Failed to fetch visitor count", err);
      }
    };

    fetchNews();
    checkMarket();
    fetchVisitorCount();
  }, []);

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-blue-600/40 font-sans tracking-tight overflow-x-hidden flex flex-col">
      {/* Dynamic Background Pattern */}
      <div className="fixed inset-0 blueprint-grid pointer-events-none" />

      <main className="relative z-10 flex flex-col flex-1 min-h-screen px-4 py-6 md:px-8 md:py-8 lg:px-12 lg:py-10 w-full">
        {/* Navbar */}
        <Navbar market={market} isMarketOpen={isMarketOpen} visitorCount={visitorCount} />

        {/* BENTO GRID — fills remaining vertical space on desktop, stacks naturally on mobile */}
        <div className="
          flex-1 h-full
          grid gap-4
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-6
          lg:grid-rows-[auto_auto_auto]
          auto-rows-[minmax(160px,auto)]
          lg:auto-rows-[unset]
        ">

          {/* Main Hero — cols 1-3, row 1 */}
          {/* col-span-2 lg:col-start-1 lg:col-span-3 lg:row-start-2 group rounded-3xl */}
          <div className="sm:col-span-2 lg:col-start-1 lg:col-span-3 lg:row-start-1 min-h-[280px] lg:min-h-0 h-full">
            <HeroTile />
          </div>

          {/* STARTUP PACKAGE — cols 4-5, row 1 */}
          <Link to="/startup-package" className="lg:col-start-4 lg:col-span-2 lg:row-start-1 group rounded-3xl bg-[#0a0a0a] border border-white/10 p-5 md:p-6 flex flex-col justify-between hover:border-blue-600/40 transition-all cursor-pointer overflow-hidden relative outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-3xl block">
            {/* Subtle glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/5 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-blue-600/15 p-2 rounded-lg">
                  <Rocket className="text-blue-500" size={14} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500/80">The Startup Package</span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight leading-snug mb-2">
                Eliminate the <span className="text-blue-500">Platform Tax.</span>
              </h3>
              <p className="text-[10px] text-slate-500 leading-relaxed mb-4">
                Platforms like Shopify &amp; Wix lock you into $30–$100/mo before you make a single sale. We deploy a Vite-based architecture that improves your net profit margins from day one reducing annual costs by 50% or more.
              </p>
              <div className="space-y-2">
                {[
                  { icon: Zap, label: "Enterprise-grade speed", sub: "Vite + React, zero overhead" },
                  { icon: TrendingUp, label: "Custom Stripe checkout", sub: "Keep 100% of your margin" },
                  { icon: ShieldCheck, label: "Localized SEO injection", sub: "Increase your traffic from search" },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-md bg-blue-600/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={10} className="text-blue-500" />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-slate-300">{label}</span>
                      <span className="text-[10px] text-slate-600 ml-1.5 font-mono">{sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button className="mt-4 w-full py-2.5 bg-blue-600 group-hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all group-hover:scale-[1.02] shadow-lg shadow-blue-600/20">
              Get the Package
            </button>
          </Link>

          {/* DATA STREAM / NEWS — col 6, row 1 */}
          <div className="lg:col-start-6 lg:col-span-1 lg:row-start-1 rounded-3xl bg-[#0a0a0a] border border-white/5 p-5 md:p-6 overflow-hidden">
            <div className="flex items-center gap-2 mb-4 text-slate-500">
              <Newspaper size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Live Data Stream</span>
            </div>
            <div className="space-y-3">
              {news.length > 0 ? (
                <>
                  <p className="text-[11px] text-slate-400 line-clamp-2 tracking-tight hover:text-blue-400 cursor-pointer transition-colors">• {news[0]?.title}</p>
                  <p className="text-[11px] text-slate-400 line-clamp-2 tracking-tight hover:text-blue-400 cursor-pointer transition-colors">• {news[1]?.title}</p>
                  <p className="text-[11px] text-slate-400 line-clamp-2 tracking-tight hover:text-blue-400 cursor-pointer transition-colors">• {news[2]?.title}</p>
                  <p className="text-[11px] text-slate-400 line-clamp-2 tracking-tight hover:text-blue-400 cursor-pointer transition-colors">• {news[3]?.title}</p>
                </>
              ) : (
                <div className="space-y-2">
                  <div className="h-3 w-full bg-white/5 animate-pulse rounded" />
                  <div className="h-3 w-3/4 bg-white/5 animate-pulse rounded" />
                </div>
              )}
            </div>
          </div>


          {/* AUTOMATED BRAND INFRASTRUCTURE — cols 1-3, row 2 (directly under HeroTile) */}
          <Link to="/brand" className="sm:col-span-2 lg:col-start-1 lg:col-span-3 lg:row-start-2 group rounded-3xl bg-[#0a0a0a] border border-white/10 p-5 md:p-6 flex items-center justify-between hover:border-blue-600/50 transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-3xl block">
            <div className="max-w-[75%]">
              <div className="flex items-center gap-2 mb-2">
                <Bot size={14} className="text-blue-600" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Auto-Growth</span>
              </div>
              <h3 className="text-sm md:text-base font-bold text-white uppercase tracking-tighter mb-1 leading-tight">Automated Brand Infrastructure</h3>
              <p className="text-[10px] text-slate-500">Autonomous content orchestration for YT, Twitch, and TikTok.</p>
            </div>
            <Share2 className="text-slate-800 group-hover:text-blue-600 transition-colors flex-shrink-0 ml-4" size={36} />
          </Link>

          {/* WEB ARCHITECTURE & DEVELOPMENT — cols 4-6, row 2 */}
          <Link to="/services" className="sm:col-span-2 lg:col-start-4 lg:col-span-3 lg:row-start-2 rounded-3xl bg-[#0a0a0a] border border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.15)] p-5 md:p-6 hover:border-blue-500/60 hover:shadow-[0_0_25px_rgba(59,130,246,0.25)] transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-600 flex flex-col group/tile relative overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between mb-2 relative z-10">
              <div className="flex items-center gap-2">
                <Database size={14} className="text-blue-600" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Web Arch & Dev</span>
              </div>
              <div className="text-[9px] font-bold uppercase tracking-widest text-slate-600 group-hover/tile:text-blue-500 transition-colors flex items-center gap-1 z-10 relative">
                View Pricing <ExternalLink size={9} />
              </div>
            </div>
            <p className="text-[10px] text-slate-500 mb-4 leading-relaxed max-w-sm">
              Custom Vite + React infrastructure. Eliminate platform taxes and keep your margins.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 flex-1">
              {[
                { name: "Startup Package", tag: "$500+", desc: "Vite + React. Replaces Wix/Shopify." },
                { name: "Small E-com", tag: "$2.5k+", desc: "Custom Stripe e-commerce build." },
                { name: "Large E-com", tag: "$5k+", desc: "High-SKU Supabase architecture." },
                { name: "Enterprise Contract", tag: "$25k+", desc: "Custom infra for millions in GMV." },
              ].map((p, i) => (
                <div key={i} className="flex items-center justify-between group/item py-0.5 pointer-events-none">
                  <div>
                    <p className="text-[11px] font-semibold text-slate-300 transition-colors">{p.name}</p>
                    <p className="text-[9px] text-slate-600 font-mono mt-0.5">{p.desc}</p>
                  </div>
                  <span className="text-[11px] font-black tracking-tight text-blue-400 border border-blue-500/20 bg-blue-500/5 px-2 py-0.5 rounded flex-shrink-0 ml-2">{p.tag}</span>
                </div>
              ))}
            </div>
          </Link>

          {/* RECENT PROJECTS — cols 1-3, row 3 (moved to the left) */}
          <Link to="/projects" className="sm:col-span-2 lg:col-start-1 lg:col-span-3 lg:row-start-3 rounded-3xl bg-[#0a0a0a] border border-white/5 p-5 md:p-6 hover:border-blue-600/30 transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-600 flex flex-col group/tile">
            <div className="flex items-center gap-2 mb-4">
              <FolderOpen size={14} className="text-blue-600" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Projects</span>
            </div>
            <div className="space-y-3 flex-1">
              {[
                { name: "confirmAutomation" },
                { name: "Data-Structures-and-Algos" },
                { name: "2026spring-c-projects" },
              ].map((p, i) => (
                <div key={i} className="flex items-center justify-between group/item py-0.5">
                  <p className="text-[11px] font-semibold text-slate-400 group-hover/item:text-blue-400 transition-colors">{p.name}</p>
                  <ExternalLink size={10} className="text-slate-700 group-hover/tile:text-blue-500 transition-colors flex-shrink-0 ml-2 pointer-events-none" />
                </div>
              ))}
            </div>
          </Link>

          {/* SHIP-COM PACKAGE — cols 4-6, row 3
          <Link to="/ship-com" className="sm:col-span-2 lg:col-start-4 lg:col-span-3 lg:row-start-3 rounded-3xl bg-[#0a0a0a] border border-white/10 p-5 md:p-6 hover:border-orange-500/30 transition-all outline-none focus-visible:ring-2 focus-visible:ring-orange-500 flex flex-col group/tile relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-600/5 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="bg-orange-500/10 p-1.5 rounded-md">
                  <Package size={14} className="text-orange-500" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover/tile:text-orange-400 transition-colors">Ship-com Package</span>
              </div>
              <div className="text-[9px] font-bold uppercase tracking-widest text-slate-600 group-hover/tile:text-orange-300 transition-colors flex items-center gap-1 z-10 relative">
                View Logistics <ExternalLink size={9} />
              </div>
            </div>
            <p className="text-[10px] text-slate-500 mb-4 leading-relaxed max-w-sm mt-1">
              Optimize logistics & commerce. Reclaim margins from high shipping and platform fees.
            </p>
            <div className="flex-1 flex flex-col justify-end">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-black tracking-tight text-orange-400 border border-orange-500/20 bg-orange-500/5 px-2 py-0.5 rounded flex-shrink-0">
                  +$7.9k+ 3-Yr ROI
                </span>
                <span className="text-[9px] font-mono text-slate-600">Replaces Shopify/Plus</span>
              </div>
            </div>
          </Link> */}

        </div>

        <Footer />
      </main>
    </div>
  );
}

export default App;