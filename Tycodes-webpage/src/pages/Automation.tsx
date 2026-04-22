import { Link } from "react-router-dom";
import { ArrowLeft, Zap, Bot, Layout, CheckCircle2, Mail, TrendingUp, Info } from "lucide-react";

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

      {/* Tiers */}
      <div className="space-y-8 sm:space-y-12 mb-20">
        {/* Tier 1: The Connector */}
        <div className="rounded-3xl bg-[#0a0a0a] border border-white/5 overflow-hidden">
          <div className="p-6 md:p-10 border-b border-white/5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tighter mb-1">1. The Connector</h2>
                <p className="text-[10px] sm:text-xs font-mono text-emerald-500 leading-relaxed uppercase tracking-widest">API Integration & Middleware</p>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl w-fit">
                <span className="text-lg sm:text-xl font-black text-emerald-400 font-mono">$2,500 – $7,500</span>
                <p className="text-[9px] text-emerald-500/70 font-bold uppercase tracking-widest mt-0.5">One-time setup</p>
              </div>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-2xl">
              Stop fighting your software and start making it talk. I build custom bridges between your CRM, Email, and Project Management tools to ensure data flows instantly without manual entry.
            </p>

            <div className="bg-slate-900/50 rounded-2xl p-5 sm:p-6 border border-white/5">
              <div className="flex items-center gap-2 mb-3">
                <Zap size={14} className="text-emerald-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">The "Real World" Example</span>
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">
                "Whenever a lead fills out your website form, The Connector instantly checks their LinkedIn, updates your Salesforce, creates a folder in Google Drive, and pings your Sales team in Slack with a summary."
              </p>
            </div>
          </div>
        </div>

        {/* Tier 2: The Agent */}
        <div className="rounded-3xl bg-[#0a0a0a] border border-white/5 overflow-hidden relative">
          <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[9px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-bl-xl shadow-lg">
            High ROI
          </div>
          <div className="p-6 md:p-10 border-b border-white/5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tighter mb-1">2. The Agent</h2>
                <p className="text-[10px] sm:text-xs font-mono text-emerald-500 leading-relaxed uppercase tracking-widest">Autonomous AI Agents</p>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl w-fit">
                <span className="text-lg sm:text-xl font-black text-emerald-400 font-mono">$5,000 – $15,000+</span>
                <p className="text-[9px] text-emerald-500/70 font-bold uppercase tracking-widest mt-0.5">Per Agent build</p>
              </div>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-2xl">
              Deploy 24/7 digital employees that don't just "chat"—they execute. My AI Agents handle complex logic like lead qualification, customer support, and document analysis so your team can focus on high-level strategy.
            </p>

            <div className="bg-slate-900/50 rounded-2xl p-5 sm:p-6 border border-white/5">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={14} className="text-emerald-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">The "Real World" Example</span>
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">
                "An AI Support Agent that reads every incoming customer email, references your company’s 200-page manual, drafts a perfect response, and only tags a human if the customer is genuinely upset."
              </p>
            </div>
          </div>
        </div>

        {/* Tier 3: The Architect */}
        <div className="rounded-3xl bg-[#0a0a0a] border border-white/5 overflow-hidden">
          <div className="p-6 md:p-10 border-b border-white/5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tighter mb-1">3. The Architect</h2>
                <p className="text-[10px] sm:text-xs font-mono text-emerald-500 leading-relaxed uppercase tracking-widest">Custom ERP & Internal Tools</p>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl w-fit">
                <span className="text-lg sm:text-xl font-black text-emerald-400 font-mono">$15,000 – $50,000+</span>
                <p className="text-[9px] text-emerald-500/70 font-bold uppercase tracking-widest mt-0.5">Strategic Infrastructure</p>
              </div>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-2xl">
              Ditch the 10 different SaaS subscriptions and build your own command center. I design custom internal dashboards (ERPs) tailored specifically to your business workflows, giving you total data ownership and zero monthly seat fees.
            </p>

            <div className="bg-slate-900/50 rounded-2xl p-5 sm:p-6 border border-white/5">
              <div className="flex items-center gap-2 mb-3">
                <Layout size={14} className="text-emerald-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">The "Real World" Example</span>
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">
                "A Construction Management Dashboard where the owner can track 20 job sites, see real-time material costs, manage crew schedules, and generate invoices with one click—all in one private app."
              </p>
            </div>
          </div>
        </div>
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
              <td className="py-5 text-white font-bold">The Agent</td>
              <td className="py-5 text-slate-400">High (LLM Logic)</td>
              <td className="py-5 text-slate-400">3 – 6 Weeks</td>
              <td className="py-5 text-emerald-400 font-black">Decentralized Execution</td>
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
          href="mailto:contact@tycodes.dev?subject=Autonomous Systems Audit"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest text-[11px] px-10 py-4 rounded-2xl transition-all hover:scale-105 shadow-lg shadow-emerald-600/20"
        >
          <Mail size={14} />
          Book an Audit
        </a>
      </div>
    </div>
  );
}
