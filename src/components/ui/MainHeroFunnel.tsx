import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Settings, ArrowRight, Layout, Globe, Mail } from "lucide-react";

export default function MainHeroFunnel() {
  const [step, setStep] = useState<"initial" | "build" | "optimize">("initial");
  const [platform, setPlatform] = useState<"shopify" | "wix" | "squarespace" | "woocommerce" | "other">("shopify");
  const [domain, setDomain] = useState("");
  const navigate = useNavigate();

  const handleAudit = () => {
    navigate(`/audit?platform=${platform}&domain=${encodeURIComponent(domain)}`);
  };

  return (
    <div className="rounded-3xl bg-[#0a0a0a] border border-white/5 overflow-hidden flex flex-col relative p-5 md:p-6">
      {/* Ambient glows */}
      <div className="absolute -top-20 -left-20 w-56 h-56 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {step === "initial" && (
        <div className="relative z-10 flex flex-col justify-center space-y-5 py-2">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-2 leading-[1.1]">
              Stop paying <span className="text-blue-500">platform taxes.</span>
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Whether you're starting fresh or scaling an existing brand, we build custom infrastructure that maximizes your margins. Brands switching from Shopify or Wix to direct Stripe integration typically reclaim <span className="text-white font-semibold">2–3% per transaction</span> — kept by you, not the platform.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => setStep("build")}
              className="group flex flex-col gap-3 p-4 md:p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all text-left"
            >
              <div className="bg-blue-500/10 p-2.5 rounded-xl w-fit">
                <Zap size={18} className="text-blue-400 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">Build New</h3>
                <p className="text-[10px] text-slate-400 leading-relaxed">Launch a high-performance storefront or landing page.</p>
              </div>
            </button>

            <button
              onClick={() => setStep("optimize")}
              className="group flex flex-col gap-3 p-4 md:p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/5 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all text-left"
            >
              <div className="bg-emerald-500/10 p-2.5 rounded-xl w-fit">
                <Settings size={18} className="text-emerald-400 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">Optimize Existing</h3>
                <p className="text-[10px] text-slate-400 leading-relaxed">Calculate your exact savings migrating off Shopify, Wix, or Squarespace.</p>
              </div>
            </button>
          </div>
        </div>
      )}

      {step === "build" && (
        <div className="relative z-10 flex flex-col space-y-4 py-2 animate-in fade-in slide-in-from-right-4 duration-500">
          <button onClick={() => setStep("initial")} className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors flex items-center gap-1.5 w-fit">
            &larr; Back
          </button>

          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter mb-2">Build from Scratch</h2>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              We design and develop custom, high-velocity web architecture tailored to your brand.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col gap-4 mt-2">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500/10 p-2.5 rounded-xl">
                <Layout className="text-blue-500" size={20} />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-white">Project Briefing</h4>
                <p className="text-[10px] text-slate-400">Tell us about your goals and required features.</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-1">
              <a href="mailto:contact@tycodes.dev?subject=New Project Briefing" data-analytics-id="hero-email-us" className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:scale-[1.02]">
                <Mail size={14} />
                Email Us
              </a>
              <a href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ39ZxoVryKgnZLG_aJ5RfWwq30dGRspuOFH18-mxuwWiBaATCpOY1wk1TFNkOy-8Vy1mt0kyT2N?gv=true" target="_blank" rel="noopener noreferrer" data-analytics-id="hero-book-meeting" className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all hover:scale-[1.02]">
                <Zap size={14} />
                Book Meeting
              </a>
            </div>
          </div>
        </div>
      )}

      {step === "optimize" && (
        <div className="relative z-10 flex flex-col space-y-4 py-2 animate-in fade-in slide-in-from-right-4 duration-500">
          <button onClick={() => setStep("initial")} className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors flex items-center gap-1.5 w-fit">
            &larr; Back
          </button>

          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter mb-1">Revenue Leak Detection.</h2>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              In 60 seconds, our Agentic Auditor scans your live site and calculates the exact dollar amount Shopify, Wix, or your app stack is draining from your margins every month.
            </p>
          </div>

          <div className="space-y-4 mt-1">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">Platform</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  onClick={() => setPlatform("shopify")}
                  className={`py-2.5 text-xs font-bold rounded-xl border transition-all ${platform === "shopify" ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.1)]" : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20"}`}
                >
                  Shopify
                </button>
                <button
                  onClick={() => setPlatform("wix")}
                  className={`py-2.5 text-xs font-bold rounded-xl border transition-all ${platform === "wix" ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.1)]" : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20"}`}
                >
                  Wix
                </button>
                <button
                  onClick={() => setPlatform("squarespace")}
                  className={`py-2.5 text-xs font-bold rounded-xl border transition-all ${platform === "squarespace" ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.1)]" : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20"}`}
                >
                  Squarespace
                </button>
                <button
                  onClick={() => setPlatform("woocommerce")}
                  className={`py-2.5 text-xs font-bold rounded-xl border transition-all ${platform === "woocommerce" ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.1)]" : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20"}`}
                >
                  WooCommerce
                </button>
                <button
                  onClick={() => setPlatform("other")}
                  className={`py-2.5 text-xs font-bold rounded-xl border transition-all ${platform === "other" ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.1)]" : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20"} sm:col-span-2`}
                >
                  Other / None
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">Current Domain</label>
              <div className="relative">
                <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="e.g. yourstore.com"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                />
              </div>
            </div>

            <button
              onClick={handleAudit}
              disabled={!domain}
              data-analytics-id="hero-start-audit"
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-emerald-600/20 mt-2 hover:scale-[1.02] cursor-pointer"
            >
              Find My Revenue Leaks <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
