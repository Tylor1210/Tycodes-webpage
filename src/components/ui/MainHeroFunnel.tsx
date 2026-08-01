import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
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
    <div className="rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col relative p-5 md:p-6">
      <AnimatePresence mode="wait">
        {step === "initial" && (
          <motion.div
            key="initial"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 flex flex-col justify-center space-y-4 py-1"
          >
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400 mb-2">
                Or run our free AI scanner first
              </p>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white tracking-tight mb-1.5">
                Not ready to book yet?
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
                Tell us whether you're starting fresh or already have a site, and we'll point you to the right next step.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setStep("build")}
                className="group flex flex-col gap-2.5 p-4 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-indigo-500/50 hover:bg-indigo-50 dark:hover:bg-indigo-500/5 transition-all text-left cursor-pointer"
              >
                <div className="bg-indigo-500/10 p-2 rounded-lg w-fit">
                  <Zap size={16} className="text-indigo-500" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-0.5">Build New</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Launch a high-performance storefront or landing page.</p>
                </div>
              </button>

              <button
                onClick={() => setStep("optimize")}
                className="group flex flex-col gap-2.5 p-4 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-indigo-500/50 hover:bg-indigo-50 dark:hover:bg-indigo-500/5 transition-all text-left cursor-pointer"
              >
                <div className="bg-indigo-500/10 p-2 rounded-lg w-fit">
                  <Settings size={16} className="text-indigo-500" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-0.5">Optimize Existing</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">See what switching off Shopify, Wix, or Squarespace could save you.</p>
                </div>
              </button>
            </div>
          </motion.div>
        )}

        {step === "build" && (
          <motion.div
            key="build"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 flex flex-col space-y-4 py-1"
          >
            <button onClick={() => setStep("initial")} className="text-xs font-semibold uppercase tracking-wide text-slate-500 hover:text-indigo-500 transition-colors flex items-center gap-1.5 w-fit cursor-pointer">
              &larr; Back
            </button>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white tracking-tight mb-1.5">Build from Scratch</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
                We design and develop custom, high-velocity web architecture tailored to your brand.
              </p>
            </div>

            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 rounded-xl flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-500/10 p-2 rounded-lg">
                  <Layout className="text-indigo-500" size={18} />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Project Briefing</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Tell us about your goals and required features.</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <a href="mailto:contact@tycodes.dev?subject=New Project Briefing" data-analytics-id="hero-email-us" className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer">
                  <Mail size={14} />
                  Email Us
                </a>
                <a href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ39ZxoVryKgnZLG_aJ5RfWwq30dGRspuOFH18-mxuwWiBaATCpOY1wk1TFNkOy-8Vy1mt0kyT2N?gv=true" target="_blank" rel="noopener noreferrer" data-analytics-id="hero-book-meeting" className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-500 border border-indigo-500/30 text-xs font-semibold rounded-lg transition-colors cursor-pointer">
                  <Zap size={14} />
                  Book Meeting
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {step === "optimize" && (
          <motion.div
            key="optimize"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 flex flex-col space-y-4 py-1"
          >
            <button onClick={() => setStep("initial")} className="text-xs font-semibold uppercase tracking-wide text-slate-500 hover:text-indigo-500 transition-colors flex items-center gap-1.5 w-fit cursor-pointer">
              &larr; Back
            </button>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white tracking-tight mb-1">Free AI Site Scanner</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
                In under 60 seconds, we scan your live site and estimate what you could be saving by switching off Shopify, Wix, or your current app stack.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Platform</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <button
                    onClick={() => setPlatform("shopify")}
                    className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${platform === "shopify" ? "bg-indigo-500/10 border-indigo-500/50 text-indigo-500" : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-white/20"}`}
                  >
                    Shopify
                  </button>
                  <button
                    onClick={() => setPlatform("wix")}
                    className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${platform === "wix" ? "bg-indigo-500/10 border-indigo-500/50 text-indigo-500" : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-white/20"}`}
                  >
                    Wix
                  </button>
                  <button
                    onClick={() => setPlatform("squarespace")}
                    className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${platform === "squarespace" ? "bg-indigo-500/10 border-indigo-500/50 text-indigo-500" : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-white/20"}`}
                  >
                    Squarespace
                  </button>
                  <button
                    onClick={() => setPlatform("woocommerce")}
                    className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${platform === "woocommerce" ? "bg-indigo-500/10 border-indigo-500/50 text-indigo-500" : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-white/20"}`}
                  >
                    WooCommerce
                  </button>
                  <button
                    onClick={() => setPlatform("other")}
                    className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${platform === "other" ? "bg-indigo-500/10 border-indigo-500/50 text-indigo-500" : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-white/20"} sm:col-span-2`}
                  >
                    Other / None
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Current Domain</label>
                <div className="relative">
                  <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="e.g. yourstore.com"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAudit}
                disabled={!domain}
                data-analytics-id="hero-start-audit"
                className="flex items-center justify-center gap-2 w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Find My Savings <ArrowRight size={14} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
