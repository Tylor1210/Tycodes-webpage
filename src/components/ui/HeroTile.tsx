import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Bot, ExternalLink, Cable, Syringe, Layers } from "lucide-react";

export default function HeroTile() {
  const tiers = [
    { name: "The Connector", tag: "$2,500 – $7,500", desc: "API & Middleware. Custom bridges between CRM, Email, and Project Management tools.", icon: Cable },
    { name: "The Transfusion", tag: "$5,000 – $15,000", desc: "Intelligent Workflow Injection. Custom AI logic tailored to your bottlenecks.", icon: Syringe },
    { name: "The Architect", tag: "$15,000 – $50k+", desc: "Custom ERP & Internal Tools. Autonomous systems built to run on autopilot.", icon: Layers },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Link
        to="/automation"
        className="group block rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 p-6 md:p-8 transition-all outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 relative overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-600/5 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center gap-2">
            <Bot size={14} className="text-emerald-500" />
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Autonomous Systems</span>
          </div>
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-600 group-hover:text-emerald-500 transition-colors flex items-center gap-1">
            View Systems <ExternalLink size={11} />
          </span>
        </div>

        <h3 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white tracking-tight mb-2 relative z-10">
          Automation that <span className="text-emerald-500">scales</span>
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed max-w-2xl relative z-10">
          Stop fighting your software. Deploy custom AI employees and API bridges built for absolute efficiency.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5 relative z-10">
          {tiers.map((p) => (
            <div key={p.name} className="flex flex-col pointer-events-none">
              <div className="flex items-center justify-between mb-1.5 gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <p.icon size={13} className="text-emerald-500/70 flex-shrink-0" />
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 truncate">{p.name}</p>
                </div>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 bg-emerald-500/5 px-2 py-0.5 rounded flex-shrink-0">
                  {p.tag}
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}
