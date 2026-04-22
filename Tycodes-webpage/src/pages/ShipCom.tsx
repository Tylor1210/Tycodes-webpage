import { Link } from "react-router-dom";
import { ArrowLeft, Package, CheckCircle2, ShoppingCart, Database, Mail } from "lucide-react";

export default function ShipComPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-[11px] font-bold uppercase tracking-widest mb-10">
        <ArrowLeft size={14} /> Back to Home
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <div className="bg-orange-500/15 p-3 rounded-xl">
          <Package className="text-orange-500" size={22} />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-orange-500/80">The Ship-com Package</span>
      </div>

      <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight mb-4">
        The Logistics & <span className="text-orange-500">Commerce Suite.</span>
      </h1>

      <p className="text-slate-400 text-base leading-relaxed mb-12 max-w-2xl">
        Target: Brands shipping physical goods who are currently losing margins to platform fees and shipping inefficiencies.
      </p>

      {/* Pricing Tiers Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {/* Tier 1 */}
        <div className="rounded-2xl border border-white/10 overflow-hidden flex flex-col hover:border-orange-500/30 transition-all">
          <div className="bg-[#0a0a0a] p-6 border-b border-white/10 flex-1">
            <h3 className="text-lg font-bold text-white mb-1 tracking-tight flex justify-between items-center">
              Tier 1: Small E-com
            </h3>
            <p className="text-[11px] font-mono text-orange-400 mb-4">(Growth Focus)</p>
            <p className="text-sm text-slate-500 mb-6">For emerging brands replacing Shopify Basic.</p>
            <div className="mb-2">
              <span className="text-2xl font-black text-white">$2,500</span>
              <span className="text-xs text-slate-500 ml-2">Setup</span>
            </div>
            <div>
              <span className="text-lg font-bold text-slate-300">$99</span>
              <span className="text-xs text-slate-500 ml-1">/mo Managed Fee</span>
            </div>
          </div>
          <div className="bg-emerald-500/10 p-4 border-t border-emerald-500/20">
            <p className="text-xs font-bold text-emerald-400 tracking-widest uppercase text-center">
              + $7,976 3-Year ROI
            </p>
          </div>
        </div>

        {/* Tier 2 */}
        <div className="rounded-2xl border border-white/10 overflow-hidden flex flex-col hover:border-orange-500/30 transition-all">
          <div className="bg-[#0a0a0a] p-6 border-b border-white/10 flex-1 relative">
            <div className="absolute top-0 right-0 bg-orange-500 text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-lg">
              Popular
            </div>
            <h3 className="text-lg font-bold text-white mb-1 tracking-tight flex justify-between items-center">
              Tier 2: Large E-com
            </h3>
            <p className="text-[11px] font-mono text-orange-400 mb-4">(Scale Focus)</p>
            <p className="text-sm text-slate-500 mb-6">For established retailers replacing Shopify Pro/Growth.</p>
            <div className="mb-2">
              <span className="text-2xl font-black text-white">$5,000</span>
              <span className="text-xs text-slate-500 ml-2">Setup</span>
            </div>
            <div>
              <span className="text-lg font-bold text-slate-300">$199</span>
              <span className="text-xs text-slate-500 ml-1">/mo Managed Fee</span>
            </div>
          </div>
          <div className="bg-emerald-500/10 p-4 border-t border-emerald-500/20">
            <p className="text-xs font-bold text-emerald-400 tracking-widest uppercase text-center">
              + $10,796 3-Year ROI
            </p>
          </div>
        </div>

        {/* Tier 3 */}
        <div className="rounded-2xl border border-white/10 overflow-hidden flex flex-col hover:border-orange-500/30 transition-all">
          <div className="bg-[#0a0a0a] p-6 border-b border-white/10 flex-1">
            <h3 className="text-lg font-bold text-white mb-1 tracking-tight flex justify-between items-center">
              Tier 3: The "Contract"
            </h3>
            <p className="text-[11px] font-mono text-orange-400 mb-4">(Enterprise/Titan Focus)</p>
            <p className="text-sm text-slate-500 mb-6">For corporations replacing Shopify Plus ($2M+ Revenue).</p>
            <div className="mb-2">
              <span className="text-2xl font-black text-white">$25k–$50k</span>
              <span className="text-xs text-slate-500 ml-2">Setup</span>
            </div>
            <div>
              <span className="text-lg font-bold text-slate-300">$2,500</span>
              <span className="text-xs text-slate-500 ml-1">/mo Managed Fee</span>
            </div>
          </div>
          <div className="bg-emerald-500/10 p-4 border-t border-emerald-500/20">
            <p className="text-xs font-bold text-emerald-400 tracking-widest uppercase text-center">
              + $468,000 3-Year ROI
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Cost Comparison */}
      <h2 className="text-2xl font-bold tracking-tighter mb-8 flex items-center gap-3">
        <ShoppingCart className="text-orange-500" /> Infrastructure Breakdown
      </h2>

      <div className="space-y-8 mb-16">
        {/* Tier 1 Breakdown */}
        <div className="rounded-2xl border border-white/10 overflow-hidden">
          <div className="bg-[#0a0a0a] p-5 border-b border-white/10">
            <h3 className="text-sm font-bold text-white tracking-widest uppercase">Tier 1: Small E-com Cost Profile</h3>
          </div>
          <div className="bg-[#050505] p-5 overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[500px]">
              <thead>
                <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-slate-500">
                  <th className="pb-3 w-1/3">Expense Category</th>
                  <th className="pb-3 text-red-400/80">Shopify Basic</th>
                  <th className="pb-3 text-emerald-500">TYcodes "Pure Path"</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Monthly Managed Fee", "$39", "$99"],
                  ["Transaction Tax", "2.0% (Added Fee)", "0% (Direct Integration)"],
                  ["Shipping Apps", "$30 - $60/mo", "$0 (API Integrated)"],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                    <td className="py-3 text-slate-300 font-medium">{row[0]}</td>
                    <td className="py-3 text-slate-500 font-mono text-xs">{row[1]}</td>
                    <td className="py-3 text-slate-300 font-mono text-xs">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tier 2 Breakdown */}
        <div className="rounded-2xl border border-white/10 overflow-hidden">
          <div className="bg-[#0a0a0a] p-5 border-b border-white/10">
            <h3 className="text-sm font-bold text-white tracking-widest uppercase">Tier 2: Large E-com Cost Profile</h3>
          </div>
          <div className="bg-[#050505] p-5 overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[500px]">
              <thead>
                <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-slate-500">
                  <th className="pb-3 w-1/3">Expense Category</th>
                  <th className="pb-3 text-red-400/80">Shopify Pro</th>
                  <th className="pb-3 text-emerald-500">TYcodes Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Monthly Managed Fee", "$105", "$199"],
                  ["Transaction Tax", "1.0% (approx. $5k on $500k)", "0% (Direct Bank API)"],
                  ["Shipping Surcharges", "High (Hidden Markups)", "$0 (Base Rate Access)"],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                    <td className="py-3 text-slate-300 font-medium">{row[0]}</td>
                    <td className="py-3 text-slate-500 font-mono text-xs">{row[1]}</td>
                    <td className="py-3 text-slate-300 font-mono text-xs">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tier 3 Breakdown */}
        <div className="rounded-2xl border border-white/10 overflow-hidden">
          <div className="bg-[#0a0a0a] p-5 border-b border-white/10">
            <h3 className="text-sm font-bold text-white tracking-widest uppercase">Tier 3: The "Contract" Cost Profile</h3>
          </div>
          <div className="bg-[#050505] p-5 overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[500px]">
              <thead>
                <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-slate-500">
                  <th className="pb-3 w-1/3">Expense Category</th>
                  <th className="pb-3 text-red-400/80">Shopify Plus</th>
                  <th className="pb-3 text-emerald-500">TYcodes Custom Infra</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Monthly Managed Fee", "$2,300", "$2,500"],
                  ["Transaction Tax", "0.5% ($100k on $20M sales)", "0% (Direct Bank/Stripe)"],
                  ["Logistics Audit Recovery", "$0 (Lost Revenue)", "2% Avg. Reclaimed"],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                    <td className="py-3 text-slate-300 font-medium">{row[0]}</td>
                    <td className="py-3 text-slate-500 font-mono text-xs">{row[1]}</td>
                    <td className="py-3 text-slate-300 font-mono text-xs">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Strategic Comparison */}
      <h2 className="text-2xl font-bold tracking-tighter mb-6 flex items-center gap-3">
        <Database className="text-indigo-500" /> Strategic Comparison: Why a Custom Stack Wins
      </h2>
      <div className="rounded-3xl bg-[#0a0a0a] border border-white/10 p-6 md:p-8 overflow-x-auto mb-10">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-white/10 text-[10px] uppercase tracking-widest text-slate-500">
              <th className="pb-3 font-bold w-1/4">Feature</th>
              <th className="pb-3 font-bold w-[37.5%] text-slate-400">Legacy E-commerce Platforms</th>
              <th className="pb-3 font-bold text-indigo-400">TYcodes Automated Systems</th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium">
            {[
              ["Checkout Speed", "Throttled by platform scripts", "Instant (React/Vite optimized)"],
              ["Payment Gateway", "Forced 3rd party \"middleman\" fees", "Direct-to-Bank (Stripe Elements)"],
              ["Data Control", "Proprietary/Locked DB", "Raw Postgres/SQL Access"],
              ["Scaling", "Higher revenue = Higher platform %", "Fixed Cost Infrastructure"],
            ].map((row) => (
              <tr key={row[0]} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                <td className="py-4 text-white font-bold">{row[0]}</td>
                <td className="py-4 text-slate-400 border-r border-white/5 pr-4 mr-4">{row[1]}</td>
                <td className="py-4 pl-4 text-indigo-300 font-mono flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-indigo-500 bg-indigo-500/10 rounded-full" />
                  {row[2]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-8">
        <a
          href="mailto:contact@tycodes.dev"
          className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-widest text-[11px] px-10 py-4 rounded-2xl transition-all hover:scale-105 shadow-lg shadow-orange-600/20"
        >
          <Mail size={14} />
          Book a Strategy Call
        </a>
      </div>
    </div>
  );
}
