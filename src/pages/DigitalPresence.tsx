import { Link } from "react-router-dom";
import { Zap, TrendingUp, ShieldCheck, Rocket, ArrowLeft, Mail, Smartphone, BarChart3, Globe } from "lucide-react";

export default function DigitalPresence() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-[11px] font-bold uppercase tracking-widest mb-10">
        <ArrowLeft size={14} /> Back to Home
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-600/15 p-3 rounded-xl">
          <Rocket className="text-blue-500" size={22} />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500/80">Digital Presence Tier</span>
      </div>

      <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight mb-4">
        Premium <span className="text-blue-500">Landing Pages.</span>
      </h1>

      <p className="text-slate-400 text-base leading-relaxed mb-10 max-w-xl">
        High-Conversion Landing Pages. Lightning-fast Vite + React architecture. Built for lead capture and local SEO to turn browsers into clients.
      </p>

      {/* Core pitch */}
      <div className="rounded-3xl bg-[#0a0a0a] border border-white/10 p-8 mb-6">
        <h2 className="text-xl font-bold tracking-tighter mb-3">The Solution</h2>
        <p className="text-slate-400 text-sm leading-relaxed mb-6">
          We deploy a high-performance Vite-based architecture that outperforms bloated Wix or Squarespace sites. This gives you enterprise-grade speed, a professional first impression, and localized SEO injection that ensures your brand actually appears in search results.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Zap, label: "Enterprise Speed", body: "Vite + React with zero framework overhead. Scores 95+ on Lighthouse." },
            { icon: TrendingUp, label: "Lead Capture", body: "Optimized conversion paths and custom forms to maximize inbound flow." },
            { icon: ShieldCheck, label: "Local SEO", body: "Schema markup + meta injection so you rank in local searches from day one." },
            { icon: Smartphone, label: "Mobile-First", body: "Responsive layouts optimized for thumb-navigation and lightning-fast mobile speeds." },
            { icon: BarChart3, label: "Insightful Tracking", body: "Google Analytics & Meta Pixel integration to track every visitor and conversion." },
            { icon: Globe, label: "Global Hosting", body: "Secure SSL encryption and deployment on a global CDN for 99.9% uptime." },
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
          <p className="text-3xl font-black text-blue-400 tracking-tighter">$799</p>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">One-Time Setup</p>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed">
          The ultimate foundation for service-based businesses. No monthly hosting fees, no bloated platform costs. Just professional architecture you own.
        </p>
      </div>

      {/* Pricing Tiers Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {[
          { name: "Digital Presence", setup: "$799", mo: "N/A" },
          { name: "Vite-com", setup: "$1,500+", mo: "N/A" },
          { name: "High-Velocity E-com", setup: "$3,500+", mo: "$199/mo" },
          { name: "Enterprise Contract", setup: "$25k+", mo: "$2,500/mo" },
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

      <div className="flex justify-center mt-8">
        <a
          href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ39ZxoVryKgnZLG_aJ5RfWwq30dGRspuOFH18-mxuwWiBaATCpOY1wk1TFNkOy-8Vy1mt0kyT2N?gv=true"
          target="_blank"
          rel="noopener noreferrer"
          data-analytics-id="digital-presence-get-started"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-[11px] px-10 py-4 rounded-2xl transition-all hover:scale-105 shadow-lg shadow-blue-600/20 cursor-pointer"
        >
          <Mail size={14} />
          Get Started
        </a>
      </div>
    </div>
  );
}
