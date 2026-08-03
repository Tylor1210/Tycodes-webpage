import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import { LineChart, ShieldAlert, CheckCircle2, Loader2, AlertTriangle, ArrowRight, Mail, Phone, Rocket, Info } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { BookAuditButton } from "@/components/ui/BookAuditCTA";
import { fadeUpMount } from "@/lib/motion";

interface AuditData {
  // Itemized TCO fields
  base_subscription: number;
  app_fees: number;
  platform_transaction_fee: number;
  hosting_cost: number;
  estimated_monthly_total: number;
  // Legacy field kept for compatibility
  estimated_monthly_cost?: number;
  // Stack & components
  detected_stack: string[];
  recommended_tycodes_components: string[];
  // Pricing
  tycodes_estimated_cost: number;
  tycodes_payment_plan: string;
  is_enterprise: boolean;
  setup_fee: number;
  mgmt_fee: number;
  savings_1_yr: number;
  savings_3_yr: number;
  // Dynamic pricing flags
  is_estimated: boolean;       // true when savings < $2k - show asterisk
  needs_consultation: boolean; // true when savings > $10k - route to founder call

  // Value-Based Commission Fields
  base_setup_fee: number;
  performance_commission: number;
  annual_savings_total: number;
  payback_months: number | string;
}

export default function AuditPage() {
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform") || "shopify";
  const domain = searchParams.get("domain") || "yourstore.com";

  // Manual states
  const [monthlySpend, setMonthlySpend] = useState(10000);
  const [appFees, setAppFees] = useState(150);
  const [usesEcom, setUsesEcom] = useState<boolean | null>(true);

  // Deep scan states
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState<string | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);
  const [auditData, setAuditData] = useState<AuditData | null>(null);

  // Lead Capture States
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const usd = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const stats = useMemo(() => {
    let platformTaxRate = 0;
    if (platform === "shopify") platformTaxRate = 0.02;
    else if (platform === "wix") platformTaxRate = 0.029;

    const platformPenalty = monthlySpend * platformTaxRate;

    const totalWasteMo = platformPenalty + appFees;
    const totalWasteYr = totalWasteMo * 12;

    return {
      platformPenalty,
      totalWasteMo,
      totalWasteYr
    };
  }, [monthlySpend, appFees, platform]);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://tycodes-auditor.tclont11.workers.dev';

  const handleDeepAudit = async () => {
    setIsScanning(true);
    setScanError(null);
    setAuditData(null);
    setShowLeadForm(false);
    try {
      const response = await fetch(`${API_BASE_URL}/audit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url: domain, user_revenue: monthlySpend, app_fees: appFees, uses_ecom: usesEcom !== false })
      });

      if (!response.ok) {
        throw new Error("Failed to scan website. The server returned an error.");
      }

      const data = await response.json();
      setAuditData(data);
    } catch (error) {
      setScanError(error instanceof Error ? error.message : "An unexpected error occurred during the scan.");
    } finally {
      setIsScanning(false);
    }
  };

  const handleClaimSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail) return;

    setIsSubmitting(true);
    try {
      const payloadData = auditData || {
        base_subscription: 29,
        app_fees: appFees,
        platform_transaction_fee: monthlySpend * 0.02,
        hosting_cost: 2,
        estimated_monthly_total: stats.totalWasteMo,
        detected_stack: [platform],
        recommended_tycodes_components: ["Custom Vite + React architecture"],
        tycodes_estimated_cost: 0,
        tycodes_payment_plan: "TBD",
        is_enterprise: false,
        setup_fee: 0,
        mgmt_fee: 0,
        savings_1_yr: 0,
        savings_3_yr: 0
      };

      await fetch(`${API_BASE_URL}/claim`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: contactEmail,
          phone: contactPhone,
          domain: domain,
          audit_data: payloadData
        })
      });

      setSubmissionSuccess(true);

      setTimeout(() => {
        window.open("https://calendar.google.com/calendar/appointments/schedules/AcZssZ39ZxoVryKgnZLG_aJ5RfWwq30dGRspuOFH18-mxuwWiBaATCpOY1wk1TFNkOy-8Vy1mt0kyT2N?gv=true", "_blank");
      }, 2500);

    } catch (err) {
      console.error("Failed to submit lead", err);
      setSubmissionSuccess(true);
      setTimeout(() => {
        window.open("https://calendar.google.com/calendar/appointments/schedules/AcZssZ39ZxoVryKgnZLG_aJ5RfWwq30dGRspuOFH18-mxuwWiBaATCpOY1wk1TFNkOy-8Vy1mt0kyT2N?gv=true", "_blank");
      }, 2500);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleManualAudit = async () => {
    setIsScanning(true);
    setAuditData(null);
    setScanProgress("Calculating custom pricing...");

    try {
      await new Promise(r => setTimeout(r, 600));

      const response = await fetch(`${API_BASE_URL}/calculate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          revenue: monthlySpend,
          app_fees: appFees,
          uses_ecom: usesEcom !== false,
          platform: platform
        })
      });

      if (!response.ok) {
        throw new Error("Failed to calculate audit.");
      }

      const data = await response.json();
      setAuditData(data);
      setScanProgress("Calculation Complete");
      setTimeout(() => {
        document.getElementById('audit-results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error(error);
      setScanProgress("Calculation Failed");
    } finally {
      setIsScanning(false);
    }
  };

  const renderLeadCapture = () => {
    if (submissionSuccess) {
      return (
        <div className="mt-8 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 flex flex-col items-center justify-center animate-in zoom-in duration-500">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 relative">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping" />
            <Rocket size={32} className="text-emerald-600 dark:text-emerald-400 animate-bounce" />
          </div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight mb-2 text-center">You&apos;re All Set!</h4>
          <p className="text-sm text-emerald-600 dark:text-emerald-400 text-center animate-pulse">Redirecting you to the booking calendar...</p>
        </div>
      );
    }

    if (showLeadForm) {
      return (
        <form onSubmit={handleClaimSubmit} className="mt-8 bg-white dark:bg-[#050505] border border-slate-200 dark:border-white/10 rounded-2xl p-6 animate-in fade-in slide-in-from-bottom-4 duration-300 shadow-sm">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Get Your Free Proposal</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1.5">Email (Required)</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="founder@brand.com"
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1.5">Phone (Optional)</label>
              <div className="relative">
                <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold uppercase tracking-wide rounded-xl transition-all shadow-lg shadow-indigo-600/20 hover:scale-[1.02] cursor-pointer"
            >
              {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : "Book My Free Call"}
            </button>
            <button
              type="button"
              onClick={() => setShowLeadForm(false)}
              className="w-full text-xs font-bold uppercase tracking-wide text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      );
    }

    return (
      <div className="mt-8">
        {auditData?.needs_consultation || auditData?.is_enterprise ? (
          <BookAuditButton
            analyticsId="audit-founder-consultation"
            label="Schedule Founder Consultation"
            size="lg"
            className="w-full"
          />
        ) : (
          <button
            onClick={() => setShowLeadForm(true)}
            className={`flex items-center justify-center gap-2 w-full py-4 ${auditData ? 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/20' : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20'} text-white text-xs font-bold uppercase tracking-wide rounded-xl transition-all shadow-lg hover:scale-[1.02] cursor-pointer`}
          >
            {auditData ? 'Get My Free Report' : 'Get My Free Estimate'}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <PageHeader
        icon={LineChart}
        eyebrow="Free Website Audit"
        title={
          <>
            Here&apos;s what <span className="text-indigo-600 dark:text-indigo-400">{domain}</span> could be costing you
          </>
        }
        subtitle={`We'll scan your ${platform.charAt(0).toUpperCase() + platform.slice(1)} site, flag the fees and inefficiencies eating into your margins, and show you what a custom-built site could save you every month. Adjust the numbers below or run a full scan for a precise breakdown.`}
      />

      <motion.div {...fadeUpMount} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/5 rounded-3xl p-6 md:p-10 space-y-10 shadow-sm">
          <div>
            <div className="flex justify-between items-end mb-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400 mb-1.5">Monthly Revenue</label>
                <p className="text-xs text-slate-500">Total gross volume processed</p>
              </div>
              <span className="text-2xl font-mono font-bold text-slate-900 dark:text-white">{usd(monthlySpend)}</span>
            </div>
            <input
              type="range" min={0} max={250000} step={1000}
              value={monthlySpend}
              onChange={(e) => {
                const val = Number(e.target.value);
                setMonthlySpend(val);
                if (val > 0) setUsesEcom(true);
                else setUsesEcom(null);
              }}
              className="w-full h-2 appearance-none cursor-pointer rounded-full bg-slate-200 dark:bg-white/10 accent-indigo-500"
            />

            {monthlySpend === 0 && (
              <div className="mt-4 p-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl animate-in fade-in zoom-in duration-300">
                <p className="text-xs text-slate-700 dark:text-slate-300 mb-3 text-center">Do you sell products or process payments online?</p>
                <div className="flex gap-2">
                  <button onClick={() => setUsesEcom(true)} className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wide border transition-all cursor-pointer ${usesEcom === true ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-transparent text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/30'}`}>Yes, E-com</button>
                  <button onClick={() => setUsesEcom(false)} className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wide border transition-all cursor-pointer ${usesEcom === false ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-transparent text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/30'}`}>No, Informational</button>
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="flex justify-between items-end mb-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400 mb-1.5">Monthly App Fees</label>
                <p className="text-xs text-slate-500">Subscriptions for themes/plugins</p>
              </div>
              <span className="text-2xl font-mono font-bold text-slate-900 dark:text-white">{usd(appFees)}</span>
            </div>
            <input
              type="range" min={0} max={2000} step={50}
              value={appFees}
              onChange={(e) => setAppFees(Number(e.target.value))}
              className="w-full h-2 appearance-none cursor-pointer rounded-full bg-slate-200 dark:bg-white/10 accent-indigo-500"
            />
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-white/5">
            <button
              onClick={handleDeepAudit}
              disabled={isScanning || (monthlySpend === 0 && usesEcom === null)}
              className="flex items-center justify-center gap-2 w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold uppercase tracking-wide rounded-xl transition-all shadow-lg shadow-indigo-600/20 hover:scale-[1.02] cursor-pointer"
            >
              {isScanning ? (
                <span className="flex items-center gap-2"><div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" /> Scanning...</span>
              ) : (
                <span className="flex items-center gap-2">Run Deep Scan <ArrowRight size={14} /></span>
              )}
            </button>
             <button
              onClick={handleManualAudit}
              disabled={isScanning || (monthlySpend === 0 && usesEcom === null)}
              className="flex items-center justify-center gap-2 w-full py-3 mt-2 bg-transparent hover:bg-slate-50 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed text-slate-600 dark:text-slate-400 text-xs font-semibold uppercase tracking-wide rounded-xl transition-all border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 cursor-pointer"
            >
               Already Know Your Costs? Calculate Instantly
            </button>
            <p className="text-center text-xs text-slate-500 mt-3">
              We&apos;ll scan {domain} automatically and analyze its tech stack, fees, and setup.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6">

          {scanError && (
            <div className="bg-rose-500/5 border border-rose-500/20 rounded-3xl p-6 md:p-8 relative overflow-hidden animate-in fade-in zoom-in duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-rose-500/15 p-2 rounded-xl">
                  <AlertTriangle size={18} className="text-rose-500" />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-wide text-rose-600 dark:text-rose-400">Scan Failed</h3>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {scanError}
              </p>
            </div>
          )}

          {isScanning && scanProgress && (
             <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-3xl p-8 flex items-center justify-center animate-in fade-in">
               <div className="flex flex-col items-center gap-3">
                 <Loader2 size={24} className="text-indigo-600 dark:text-indigo-400 animate-spin" />
                 <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">{scanProgress}</span>
               </div>
             </div>
          )}

          {auditData && (
            <div className="bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20 rounded-3xl p-6 md:p-8 relative overflow-hidden animate-in fade-in zoom-in duration-500">
              <div className="relative z-10">
                <h3 className="text-xs font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-400 mb-6 flex items-center gap-2">
                  <CheckCircle2 size={16} /> Scan Complete
                </h3>

                <div className="mb-6 p-4 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/5">
                  <span className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">Site Details</span>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <div><span className="text-slate-500">Domain:</span> {domain}</div>
                    <div className="capitalize"><span className="text-slate-500">Platform:</span> {platform}</div>
                    <div><span className="text-slate-500">Revenue:</span> {usd(monthlySpend)}/mo</div>
                    <div><span className="text-slate-500">App Fees:</span> {usd(appFees)}/mo</div>
                  </div>
                </div>

                {platform !== "other" && !auditData.detected_stack.join(" ").toLowerCase().includes(platform.toLowerCase()) && (
                  <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 animate-in fade-in zoom-in duration-500">
                    <AlertTriangle size={16} className="text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wide text-amber-700 dark:text-amber-500 mb-1">Platform Mismatch Detected</h4>
                      <p className="text-xs text-amber-900/80 dark:text-amber-200/80 leading-relaxed">
                        You selected <span className="font-bold capitalize">{platform}</span>, but our scan detected
                        <span className="font-bold"> {auditData.detected_stack.join(", ")}</span>. Your actual savings might be different than what&apos;s shown below.
                      </p>
                    </div>
                  </div>
                )}

                {(platform.toLowerCase() === "shopify" || platform.toLowerCase() === "wix") && (
                  <div className="mb-6 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-start gap-3 animate-in fade-in zoom-in duration-500">
                    <Info size={16} className="text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-400 mb-1">Extra Fees You&apos;re Paying</h4>
                      <p className="text-xs text-indigo-900/80 dark:text-indigo-200/80 leading-relaxed">
                        Platforms like <span className="capitalize">{platform}</span> add an extra fee on top of standard payment processing. Tycodes connects directly to Stripe, so you only pay standard, secure processing fees and no extra platform fee.
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-4 mb-6">
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1">Detected Stack</span>
                    <div className="flex flex-wrap gap-2">
                      {auditData.detected_stack.map((tech, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-700 dark:text-slate-300">{tech}</span>
                      ))}
                    </div>
                  </div>

                  {/* What You're Losing Per Sale */}
                  {auditData.platform_transaction_fee > 0 && (
                    <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-4 animate-in slide-in-from-right-4 duration-500">
                      <div className="flex items-center gap-2 mb-3">
                        <ShieldAlert size={16} className="text-rose-600 dark:text-rose-500" />
                        <h4 className="text-xs font-bold uppercase tracking-wide text-rose-600 dark:text-rose-500">What You&apos;re Losing Per Sale</h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-600 dark:text-slate-400">Standard Stripe Fee</span>
                          <span className="text-xs font-mono text-slate-700 dark:text-slate-300">2.9% + 30¢</span>
                        </div>
                        <div className="flex justify-between items-center bg-rose-500/5 p-2 rounded-lg border border-rose-500/10">
                          <span className="text-xs text-rose-600 dark:text-rose-400 font-bold">Extra Platform Fee ({platform === "shopify" ? "2.0%" : "2.9%"})</span>
                          <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400">+{usd(auditData.platform_transaction_fee)}/mo</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          By using {platform.charAt(0).toUpperCase() + platform.slice(1)}, you pay this extra fee on every sale. Tycodes&apos; direct Stripe integration removes it completely.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Itemized Monthly Cost Breakdown */}
                  <div className="rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-black/40 overflow-hidden">
                    <div className="px-4 py-2.5 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Total Monthly Cost</span>
                      <span className="text-base font-mono font-bold text-slate-900 dark:text-white">{usd(auditData.estimated_monthly_total)}/mo</span>
                    </div>
                    <div className="divide-y divide-slate-100 dark:divide-white/5">
                      <div className="flex justify-between items-center px-4 py-2">
                        <span className="text-xs text-slate-600 dark:text-slate-400">Base Subscription</span>
                        <span className="text-xs font-mono text-slate-700 dark:text-slate-300">{usd(auditData.base_subscription)}/mo</span>
                      </div>
                      <div className="flex justify-between items-center px-4 py-2">
                        <span className="text-xs text-slate-600 dark:text-slate-400">App Fees</span>
                        <span className="text-xs font-mono text-slate-700 dark:text-slate-300">{usd(auditData.app_fees)}/mo</span>
                      </div>
                      {auditData.platform_transaction_fee > 0 && (
                        <div className="flex justify-between items-center px-4 py-2 bg-rose-500/5">
                          <span className="text-xs text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1.5">
                            {platform === "shopify" || auditData.detected_stack.join(" ").toLowerCase().includes("shopify") ? "Extra fee Shopify charges per sale (2%)" : "Extra fee your platform charges per sale"}
                          </span>
                          <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400">{usd(auditData.platform_transaction_fee)}/mo</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center px-4 py-2">
                        <span className="text-xs text-slate-600 dark:text-slate-400">Domain / Hosting</span>
                        <span className="text-xs font-mono text-slate-700 dark:text-slate-300">{usd(auditData.hosting_cost)}/mo</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-[#0a0a0a] rounded-2xl p-5 border border-indigo-500/30">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xs font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">Tycodes: {auditData.recommended_tycodes_components[0] || 'Vite-com'}</h4>
                    <span className="text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20 uppercase tracking-wide">
                      Recommended Package
                    </span>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-slate-500 uppercase tracking-wide">Base Setup Fee</span>
                      <span className="text-xs font-mono text-slate-900 dark:text-white font-bold">{usd(auditData.base_setup_fee)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-emerald-600 dark:text-emerald-500 uppercase tracking-wide font-bold">Success Fee (20%)</span>
                        <div className="group relative">
                          <Info size={12} className="text-emerald-600/50 dark:text-emerald-500/50 cursor-help" />
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 p-2 bg-slate-900 border border-white/10 rounded-lg text-xs text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                            A one-time fee equal to 20% of what we expect to save you in the first year. We only get paid when you save.
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-emerald-600 dark:text-emerald-500 font-bold">+{usd(auditData.performance_commission)}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex justify-between items-center">
                      <span className="text-xs text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wide">Total Tycodes Investment</span>
                      <span className="text-xl font-mono text-indigo-600 dark:text-indigo-400 font-bold">{usd(auditData.setup_fee)}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 italic leading-relaxed">
                      The Success Fee is a one-time charge equal to 20% of your projected first-year savings. We only get paid when you save.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-6">
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                      <span className="block text-xs font-bold uppercase tracking-wide text-emerald-700/70 dark:text-emerald-500/70 mb-1">Year 1 Savings</span>
                      <span className="text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400">{usd(auditData.savings_1_yr)}</span>
                    </div>
                    <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                      <span className="block text-xs font-bold uppercase tracking-wide text-indigo-700/70 dark:text-indigo-500/70 mb-1">Payback Period</span>
                      <span className="text-sm font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {typeof auditData.payback_months === 'number' || !isNaN(Number(auditData.payback_months)) ? `${auditData.payback_months} Months` : auditData.payback_months}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="block text-xs text-slate-500 mb-1">What&apos;s Included</span>
                    <div className="flex flex-col gap-1.5 mt-2">
                      {auditData.recommended_tycodes_components.map((comp, i) => (
                        <span key={i} className="text-xs text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-indigo-500" />
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {renderLeadCapture()}
              </div>
            </div>
          )}

          {/* Manual / Heuristic Result */}
          {!auditData && !scanError && (
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-3xl p-6 md:p-10 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xs font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400 mb-6 flex items-center gap-2">
                  <ShieldAlert size={16} /> Estimated Monthly Waste
                </h3>

                <div className="space-y-5 mb-10">
                  <div className="flex justify-between items-center pb-5 border-b border-slate-100 dark:border-white/5">
                    <span className="text-base text-slate-600 dark:text-slate-400">{platform === "shopify" ? "Shopify's per-sale fee (2%)" : "Extra fee your platform charges per sale"}</span>
                    <span className="text-lg font-mono font-bold text-rose-600 dark:text-rose-400">-{usd(stats.platformPenalty)}/mo</span>
                  </div>
                  <div className="flex justify-between items-center pb-5 border-b border-slate-100 dark:border-white/5">
                    <span className="text-base text-slate-600 dark:text-slate-400">App &amp; Plugin Subscriptions</span>
                    <span className="text-lg font-mono font-bold text-rose-600 dark:text-rose-400">-{usd(appFees)}/mo</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-base font-bold text-slate-900 dark:text-white">Total Annual Waste</span>
                    <span className="text-3xl font-mono font-bold text-rose-600 dark:text-rose-500">-{usd(stats.totalWasteYr)}</span>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-[#0a0a0a] rounded-3xl p-6 border border-emerald-500/30">
                  <h4 className="text-xs font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-500 mb-4 flex items-center gap-2">
                    <CheckCircle2 size={16} /> Tycodes Architecture
                  </h4>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-700 dark:text-slate-300">Estimated Annual Savings</span>
                    <span className="text-2xl font-mono font-bold text-emerald-600 dark:text-emerald-400">+{usd(stats.totalWasteYr)}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">With a custom-built site you own outright, you keep 100% of what you earn, with no more platform fees eating into your margins.</p>
                </div>

                {renderLeadCapture()}
              </div>
            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
}
