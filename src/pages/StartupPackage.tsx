import { Link } from "react-router-dom";
import { Zap, TrendingUp, ShieldCheck, Rocket, ArrowLeft, Mail } from "lucide-react";

export default function StartupPackagePage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-[11px] font-bold uppercase tracking-widest mb-10">
        <ArrowLeft size={14} /> Back to Home
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-600/15 p-3 rounded-xl">
          <Rocket className="text-blue-500" size={22} />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500/80">The Startup Package</span>
      </div>

      <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight mb-4">
        Eliminate the <span className="text-blue-500">Platform Tax.</span>
      </h1>

      <p className="text-slate-400 text-base leading-relaxed mb-10 max-w-xl">
        Most businesses are locked into restrictive monthly subscriptions with Shopify or Wix that eat into their margins before they even make a sale. We change that.
      </p>

      {/* Core pitch */}
      <div className="rounded-3xl bg-[#0a0a0a] border border-white/10 p-8 mb-6">
        <h2 className="text-xl font-bold tracking-tighter mb-3">The Solution</h2>
        <p className="text-slate-400 text-sm leading-relaxed mb-6">
          We deploy a high-performance Vite-based architecture with a custom Stripe integration. This gives you enterprise-grade speed, a professional checkout experience, and localized SEO injection that ensures your brand actually appears in search results — all without the $30–$100/mo "platform tax."
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Zap, label: "Enterprise Speed", body: "Vite + React with zero framework overhead. Scores 95+ on Lighthouse." },
            { icon: TrendingUp, label: "Custom Stripe", body: "Full checkout flow. No transaction fees. Keep 100% of your margin." },
            { icon: ShieldCheck, label: "Local SEO", body: "Schema markup + meta injection so you rank in local searches from day one." },
          ].map(({ icon: Icon, label, body }) => (
            <div key={label} className="bg-white/3 rounded-2xl p-5 border border-white/5">
              <div className="bg-blue-600/10 p-2 rounded-lg w-fit mb-3">
                <Icon size={14} className="text-blue-500" />
              </div>
              <h3 className="text-sm font-bold mb-1">{label}</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Savings callout */}
      <div className="rounded-3xl bg-blue-600/10 border border-blue-600/20 p-6 mb-10 flex items-center gap-6">
        <div>
          <p className="text-3xl font-black text-blue-400 tracking-tighter">50%+</p>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Annual Cost Reduction</p>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed">
          Compared to a Shopify plan + apps + transaction fees, our architecture pays for itself in under 6 months.
        </p>
      </div>

      {/* Pricing Tiers Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {[
          { name: "Startup Package", setup: "$999", mo: "N/A" },
          { name: "Small E-com", setup: "$2,500+", mo: "N/A" },
          { name: "Large E-com", setup: "$4,999+", mo: "$199/mo" },
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

      <a
        href="mailto:contact@tycodes.dev"
        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-[11px] px-8 py-4 rounded-2xl transition-all hover:scale-105 shadow-lg shadow-blue-600/20"
      >
        <Mail size={14} />
        Get the Package
      </a>
    </div>
  );
}
