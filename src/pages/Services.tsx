import { Link } from "react-router-dom";
import { ArrowLeft, Database, CheckCircle2, TrendingUp, BarChart3, Mail } from "lucide-react";

export default function ServicesPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-[11px] font-bold uppercase tracking-widest mb-10">
        <ArrowLeft size={14} /> Back to Home
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-600/15 p-3 rounded-xl">
          <Database className="text-blue-500" size={22} />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500/80">Services & Pricing</span>
      </div>

      <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight mb-4">
        Web Architecture & <span className="text-blue-500">Development.</span>
      </h1>

      <p className="text-slate-400 text-base leading-relaxed mb-10 max-w-2xl">
        Stop paying the "Platform Tax." Custom React/Vite infrastructure eliminates bloated subscription fees,
        third-party app costs, and transaction margin loss. These are our transparent pricing models.
      </p>

      {/* Pricing Tiers Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {[
          { name: "Startup Package", setup: "$500", mo: "N/A" },
          { name: "Small E-com", setup: "$2,500", mo: "N/A" },
          { name: "Large E-com", setup: "$5,000", mo: "$199/mo" },
          { name: "Contract", setup: "$25k+", mo: "$2,500/mo" },
        ].map((tier) => (
          <div key={tier.name} className="rounded-2xl bg-[#0a0a0a] border border-white/10 p-5 hover:border-blue-600/40 transition-colors">
            <h3 className="text-sm font-bold text-white mb-3">{tier.name}</h3>
            <p className="text-2xl font-black text-blue-500 tracking-tighter mb-1">{tier.setup}</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Setup Fee</p>
            <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
              <span className="text-[10px] text-slate-400 font-mono">Management</span>
              <span className="text-xs font-bold text-slate-300">{tier.mo}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 3-Year ROI Chart */}
      <div className="rounded-3xl bg-[#0a0a0a] border border-white/10 p-6 md:p-8 mb-12 overflow-x-auto">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="text-emerald-500" size={20} />
          <h2 className="text-xl font-bold tracking-tighter">3-Year Average Savings Chart</h2>
        </div>
        <p className="text-xs text-slate-500 mb-6 font-mono">
          *Figures represent reclaimed "Platform Tax" minus our service fees. (Pure Infrastructure Focus)
        </p>
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-white/10 text-[10px] uppercase tracking-widest text-slate-500">
              <th className="pb-3 font-bold w-1/4">Service Tier</th>
              <th className="pb-3 font-bold">Year 1 Savings</th>
              <th className="pb-3 font-bold">Year 2 Savings</th>
              <th className="pb-3 font-bold">Year 3 Savings</th>
              <th className="pb-3 font-black text-emerald-500">Total 3-Year ROI</th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium">
            <tr className="border-b border-white/5 group hover:bg-white/5 transition-colors">
              <td className="py-4 text-white font-bold group-hover:text-blue-400">Startup Package</td>
              <td className="py-4 text-emerald-400">+$9</td>
              <td className="py-4 text-emerald-400">+$553</td>
              <td className="py-4 text-emerald-400">+$603</td>
              <td className="py-4 text-emerald-500 font-black">+$1,165</td>
            </tr>
            <tr className="border-b border-white/5 group hover:bg-white/5 transition-colors">
              <td className="py-4 text-white font-bold group-hover:text-blue-400">Small E-com</td>
              <td className="py-4 text-emerald-400">+$652</td>
              <td className="py-4 text-emerald-400">+$3,412</td>
              <td className="py-4 text-emerald-400">+$3,912</td>
              <td className="py-4 text-emerald-500 font-black">+$7,976</td>
            </tr>
            <tr className="border-b border-white/5 group hover:bg-white/5 transition-colors">
              <td className="py-4 text-white font-bold group-hover:text-blue-400">Large E-com</td>
              <td className="py-4 text-emerald-400">+$1,272</td>
              <td className="py-4 text-emerald-400">+$4,412</td>
              <td className="py-4 text-emerald-400">+$5,112</td>
              <td className="py-4 text-emerald-500 font-black">+$10,796</td>
            </tr>
            <tr className="group hover:bg-white/5 transition-colors">
              <td className="py-4 text-white font-bold group-hover:text-blue-400">Contract</td>
              <td className="py-4 text-emerald-400">+$118,000</td>
              <td className="py-4 text-emerald-400">+$160,000</td>
              <td className="py-4 text-emerald-400">+$190,000</td>
              <td className="py-4 text-emerald-500 font-black">+$468,000</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Detailed cost comparison breakdown */}
      <h2 className="text-2xl font-bold tracking-tighter mb-8 flex items-center gap-3">
        <BarChart3 className="text-blue-500" /> Detailed Cost Comparison
      </h2>

      <div className="space-y-8 mb-12">
        {/* Startup Package comp */}
        <div className="rounded-2xl border border-white/10 overflow-hidden">
          <div className="bg-[#0a0a0a] p-5 border-b border-white/10">
            <h3 className="text-lg font-bold text-white mb-1 tracking-tight">1. Startup Package (Non-Ecommerce)</h3>
            <p className="text-xs text-slate-500 font-mono">Target: Service professionals replacing Wix or Squarespace.</p>
          </div>
          <div className="bg-[#050505] p-5 overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[500px]">
              <thead>
                <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-slate-500">
                  <th className="pb-3 w-1/3">Expense Category</th>
                  <th className="pb-3 text-red-400/80">Legacy Platform (Wix/Squarespace)</th>
                  <th className="pb-3 text-emerald-500">TYcodes "Pure Path" (Vite)</th>
                </tr>
              </thead>
              <tbody>
                {/* rows */}
                {[
                  ["Annual Subscription", "$432 ($36/mo avg)", "$0 (Cloudflare Pages)"],
                  ["Email Hosting", "$84 ($7/mo)", "$12 (Zoho Mail)"],
                  ["Domain Renewal", "$20", "$15 (Cloudflare)"],
                  ["Hidden 'Bloat' Fees", "$50 (Template/Plugin renewals)", "$0 (Custom Built)"],
                  ["Year 1 Setup Fee", "$0", "$500 (Your Fee)"],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                    <td className="py-3 text-slate-300 font-medium">{row[0]}</td>
                    <td className="py-3 text-slate-500 font-mono text-xs">{row[1]}</td>
                    <td className="py-3 text-slate-300 font-mono text-xs">{row[2]}</td>
                  </tr>
                ))}
                <tr className="bg-white/5 font-bold">
                  <td className="py-3 px-3 rounded-l-lg">TOTAL (Year 1)</td>
                  <td className="py-3 text-red-400 font-mono text-xs">$586</td>
                  <td className="py-3 rounded-r-lg text-emerald-500 font-mono text-xs">$527</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Small E-com comp */}
        <div className="rounded-2xl border border-white/10 overflow-hidden">
          <div className="bg-[#0a0a0a] p-5 border-b border-white/10">
            <h3 className="text-lg font-bold text-white mb-1 tracking-tight">2. Small E-com (&lt;100 Products)</h3>
            <p className="text-xs text-slate-500 font-mono">Target: Emerging brands replacing Shopify Basic.</p>
          </div>
          <div className="bg-[#050505] p-5 overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[500px]">
              <thead>
                <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-slate-500">
                  <th className="pb-3 w-1/3">Expense Category</th>
                  <th className="pb-3 text-red-400/80">Shopify Basic + Apps</th>
                  <th className="pb-3 text-emerald-500">TYcodes E-com (Vite+Stripe)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Platform Subscription", "$468 ($39/mo)", "$1,188 ($120/yr Managed Fee)"],
                  ["Transaction Tax", "2.0% (3rd party gateway fee)", "0% (Direct Stripe Integration)"],
                  ["Essential Apps", "$600 (Reviews, Upsells, SEO)", "$0 (Hard-coded Features)"],
                  ["Year 1 Setup Fee", "$0", "$2,500 (Your Fee)"],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 text-slate-300 font-medium">{row[0]}</td>
                    <td className="py-3 text-slate-500 font-mono text-xs">{row[1]}</td>
                    <td className="py-3 text-slate-300 font-mono text-xs">{row[2]}</td>
                  </tr>
                ))}
                <tr className="bg-white/5 font-bold">
                  <td className="py-3 px-3 rounded-l-lg">Avg. Annual Waste</td>
                  <td className="py-3 text-red-400 font-mono text-xs">$4,240 (on $150k sales)</td>
                  <td className="py-3 rounded-r-lg text-emerald-500 font-mono text-xs">$1,188</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Large E-com comp */}
        <div className="rounded-2xl border border-white/10 overflow-hidden">
          <div className="bg-[#0a0a0a] p-5 border-b border-white/10">
            <h3 className="text-lg font-bold text-white mb-1 tracking-tight">3. Large E-com (High-SKU / High-Traffic)</h3>
            <p className="text-xs text-slate-500 font-mono">Target: Established retailers replacing Shopify "Growth" or "Pro".</p>
          </div>
          <div className="bg-[#050505] p-5 overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[500px]">
              <thead>
                <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-slate-500">
                  <th className="pb-3 w-1/3">Expense Category</th>
                  <th className="pb-3 text-red-400/80">Shopify Pro + Enterprise Apps</th>
                  <th className="pb-3 text-emerald-500">TYcodes Enterprise (React+Supabase)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Platform Subscription", "$1,260 ($105/mo)", "$2,388 ($120/yr Managed Fee)"],
                  ["Transaction Tax", "1.0% (approx. $5,000 on $500k)", "0% (Direct Stripe Integration)"],
                  ["App Stack 'Tax'", "$1,800 (Inventory, Filter, Search)", "$0 (Integrated API Logic)"],
                  ["Infrastructure Costs", "Included", "$300 (Supabase Pro)"],
                  ["Year 1 Setup Fee", "$0", "$5,000 (Your Fee)"],
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

        {/* Contract comp */}
        <div className="rounded-2xl border border-white/10 overflow-hidden">
          <div className="bg-[#0a0a0a] p-5 border-b border-white/10">
            <h3 className="text-lg font-bold text-white mb-1 tracking-tight">4. The "Contract" Tier (Enterprise Migration)</h3>
            <p className="text-xs text-slate-500 font-mono">Target: High-volume corporations replacing Shopify Plus.</p>
          </div>
          <div className="bg-[#050505] p-5 overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[500px]">
              <thead>
                <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-slate-500">
                  <th className="pb-3 w-1/3">Expense Category</th>
                  <th className="pb-3 text-red-400/80">Shopify Plus (Enterprise)</th>
                  <th className="pb-3 text-emerald-500">TYcodes Custom Infrastructure</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Base Subscription", "$27,600 ($2,300/mo)", "$30,000 ($2,500/mo Managed Fee)"],
                  ["Transaction Tax", "0.5% ($100,000 on $20M Sales)", "0% (Direct Bank/Stripe API)"],
                  ["Platform Revenue Share", "Variable % of GMV", "$0"],
                  ["Database & Scaling", "Included (Locked)", "$1,200 (Dedicated Cloud Clusters)"],
                  ["Year 1 Setup Fee", "$0", "$50,000 (Your Fee)"],
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

      {/* Final Summary Table */}
      <h2 className="text-2xl font-bold tracking-tighter mb-6">Service Summary</h2>
      <div className="rounded-3xl bg-[#0a0a0a] border border-white/10 p-6 md:p-8 overflow-x-auto mb-10">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-white/10 text-[10px] uppercase tracking-widest text-slate-500">
              <th className="pb-3 font-bold w-1/5">Service Tier</th>
              <th className="pb-3 font-bold w-1/5">Setup Fee</th>
              <th className="pb-3 font-bold w-1/5">Monthly Management</th>
              <th className="pb-3 font-bold">Primary "Tax" Removed</th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium">
            {[
              ["Startup Package", "$500–$750", "$0", "Monthly Hosting Subscriptions"],
              ["Small E-com", "$2,500", "$99", "App Fees & Third-Party Transaction Fees"],
              ["Large E-com", "$5,000", "$199", "High-SKU Management Fees & API Limits"],
              ["Contract", "$25k–$50k", "$2,500", "Enterprise Revenue Sharing & Variable Fees"],
            ].map((row, i) => (
              <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                <td className="py-4 text-white font-bold">{row[0]}</td>
                <td className="py-4 text-blue-400 font-mono">{row[1]}</td>
                <td className="py-4 text-slate-400 font-mono">{row[2]}</td>
                <td className="py-4 text-slate-300 flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-blue-500" />
                  {row[3]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-8">
        <a
          href="mailto:contact@tycodes.dev"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-[11px] px-10 py-4 rounded-2xl transition-all hover:scale-105 shadow-lg shadow-blue-600/20"
        >
          <Mail size={14} />
          Book a Free Audit
        </a>
      </div>
    </div>
  );
}
