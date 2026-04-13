import { Link } from "react-router-dom";
import { Bot, ExternalLink, Zap, Layout } from "lucide-react";

export default function HeroTile() {
  const tiers = [
    { name: "The Connector", tag: "$2,500 – $7.5k", desc: "API & Middleware. Custom bridges between CRM, Email, and Project Management tools." },
    { name: "The Agent", tag: "$5,000 – $15k+", desc: "Autonomous AI Agents. Deploy 24/7 digital employees for support and document analysis." },
    { name: "The Architect", tag: "$15,000 – $50k+", desc: "Custom ERP & Internal Tools. Private dashboards and strategic systems for your business." },
  ];

  return (
    <Link
      to="/automation"
      className="group rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.12)] p-5 transition-all outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 flex flex-col relative overflow-hidden"
    >
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-emerald-600/8 rounded-full blur-2xl pointer-events-none" />
      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="flex items-center gap-2">
          <Bot size={13} className="text-emerald-500" />
          <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Autonomous Systems</span>
        </div>
        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-600 group-hover:text-emerald-500 transition-colors flex items-center gap-1">
          View Systems <ExternalLink size={9} />
        </span>
      </div>

      <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight mb-1 relative z-10">
        Automation that <span className="text-emerald-500">scales</span>
      </h3>
      <p className="text-[10px] text-slate-500 mb-4 leading-relaxed relative z-10">
        Stop fighting your software. Deploy custom AI employees and API bridges built for absolute efficiency.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 relative z-10">
        {tiers.map((p) => (
          <div key={p.name} className="flex flex-col py-1 pointer-events-none border-b border-slate-100 dark:border-white/5 last:border-0 pb-3 md:pb-1">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">{p.name}</p>
              <span className="text-[10px] font-black text-emerald-500 border border-emerald-500/20 bg-emerald-500/5 px-2 py-0.5 rounded flex-shrink-0">
                {p.tag}
              </span>
            </div>
            <p className="text-[9px] text-slate-500 leading-relaxed max-w-[90%] line-clamp-2">{p.desc}</p>
          </div>
        ))}
      </div>
    </Link>
  );
}