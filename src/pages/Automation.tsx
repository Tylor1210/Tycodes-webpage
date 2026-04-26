import { Link } from "react-router-dom";
import { ArrowLeft, Zap, Bot, Mail, Info, Cable, Syringe, Layers } from "lucide-react";

export default function AutomationPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-[11px] font-bold uppercase tracking-widest mb-10">
        <ArrowLeft size={14} /> Back to Home
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <div className="bg-emerald-500/15 p-3 rounded-xl">
          <Bot className="text-emerald-500" size={22} />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500/80">Autonomous Systems</span>
      </div>

      <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight mb-4">
        Automation that <span className="text-emerald-500">scales.</span>
      </h1>

      <p className="text-slate-400 text-base leading-relaxed mb-12 max-w-2xl">
        Stop fighting your software and start making it work for you. From simple API bridges to autonomous AI digital employees, 
        I build the infrastructure that replaces manual labor with absolute efficiency.
      </p>

      {/* Tiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {[
          {
            name: "The Connector",
            price: "$2,500 – $7,500",
            subtitle: "API & Middleware",
            body: "Custom bridges between CRM, Email, and Project Management tools to eliminate manual data entry.",
            icon: Cable,
            example: "Whenever a lead fills out your website form, The Connector instantly checks their LinkedIn, updates your Salesforce, and pings your Sales team in Slack."
          },
          {
            name: "The Transfusion",
            price: "$5,000 – $15,000",
            subtitle: "Intelligent Workflow Injection",
            body: "Custom AI logic and automation tailored to your specific marketing or operational bottlenecks.",
            icon: Syringe,
            example: "An AI Support Agent that reads every incoming email, references your company manual, drafts a perfect response, and only tags a human if necessary."
          },
          {
            name: "The Architect",
            price: "$15,000 – $50,000+",
            subtitle: "Custom ERP & Internal Tools",
            body: "Foundation-level infrastructure and autonomous systems built to run your business on autopilot.",
            icon: Layers,
            example: "A Construction Management Dashboard where the owner can track job sites, real-time material costs, and crew schedules in one private app."
          }
        ].map((pkg) => (
          <div key={pkg.name} className="bg-white/3 rounded-2xl p-6 border border-white/5 flex flex-col h-full hover:border-emerald-500/30 transition-colors">
            <div className="bg-emerald-500/10 p-2.5 rounded-xl w-fit mb-4">
              <pkg.icon size={18} className="text-emerald-500" />
            </div>
            
            <div className="mb-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-emerald-500 mb-1">{pkg.name}</h3>
              <p className="text-xl font-black text-white tracking-tighter mb-1">{pkg.price}</p>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{pkg.subtitle}</p>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed mb-6 flex-1">
              {pkg.body}
            </p>

            <div className="pt-4 border-t border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <Zap size={10} className="text-emerald-500" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">The ROI Example</span>
              </div>
              <p className="text-[10px] text-slate-500 italic leading-relaxed">
                "{pkg.example}"
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Summary comparison */}
      <h2 className="text-2xl font-bold tracking-tighter mb-6 flex items-center gap-2">
        <Info className="text-blue-500" size={20} />
        System Comparison
      </h2>
      <div className="rounded-3xl bg-[#0a0a0a] border border-white/5 p-6 md:p-8 overflow-x-auto mb-20">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-white/10 text-[10px] uppercase tracking-widest text-slate-500">
              <th className="pb-4 font-bold w-1/4">System Type</th>
              <th className="pb-4 font-bold">Complexity</th>
              <th className="pb-4 font-bold">Delivery Time</th>
              <th className="pb-4 font-black text-emerald-500">Core Value</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
              <td className="py-5 text-white font-bold">The Connector</td>
              <td className="py-5 text-slate-400">Low to Moderate</td>
              <td className="py-5 text-slate-400">1 – 2 Weeks</td>
              <td className="py-5 text-emerald-400 font-black">Data Synchronization</td>
            </tr>
            <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
              <td className="py-5 text-white font-bold">The Transfusion</td>
              <td className="py-5 text-slate-400">High (LLM Logic)</td>
              <td className="py-5 text-slate-400">3 – 6 Weeks</td>
              <td className="py-5 text-emerald-400 font-black">Intelligent Workflow</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="py-5 text-white font-bold">The Architect</td>
              <td className="py-5 text-slate-400">Very High (Full Stack)</td>
              <td className="py-5 text-slate-400">2 – 4 Months</td>
              <td className="py-5 text-emerald-400 font-black">Operational Control</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-col items-center gap-4 py-10 bg-emerald-500/5 rounded-3xl border border-emerald-500/10">
        <h2 className="text-xl font-bold tracking-tighter">Ready to reclaim your time?</h2>
        <p className="text-xs text-slate-500 mb-2">I find 3 manual tasks we can automate this week.</p>
        <a
          href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ39ZxoVryKgnZLG_aJ5RfWwq30dGRspuOFH18-mxuwWiBaATCpOY1wk1TFNkOy-8Vy1mt0kyT2N?gv=true"
          target="_blank"
          rel="noopener noreferrer"
          data-analytics-id="automation-book-audit"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest text-[11px] px-10 py-4 rounded-2xl transition-all hover:scale-105 shadow-lg shadow-emerald-600/20 cursor-pointer"
        >
          <Mail size={14} />
          Book an Audit
        </a>
      </div>
    </div>
  );
}
