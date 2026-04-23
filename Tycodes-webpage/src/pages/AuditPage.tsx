import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ArrowLeft, LineChart, ShieldAlert, CheckCircle2, Loader2, AlertTriangle, ArrowRight, Mail, Phone, Rocket, Info } from "lucide-react";

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
  is_estimated: boolean;       // true when savings < $2k — show asterisk
  needs_consultation: boolean; // true when savings > $10k — route to founder call
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
    const platformTaxRate = platform === "shopify" ? 0.02 : 0.015; 
    const platformPenalty = monthlySpend * platformTaxRate;
    
    const totalWasteMo = platformPenalty + appFees;
    const totalWasteYr = totalWasteMo * 12;

    return {
      platformPenalty,
      totalWasteMo,
      totalWasteYr
    };
  }, [monthlySpend, appFees, platform]);

  const handleDeepAudit = async () => {
    setIsScanning(true);
    setScanError(null);
    setAuditData(null);
    setShowLeadForm(false);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/audit`, {
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
    } catch (error: any) {
      setScanError(error.message || "An unexpected error occurred during the scan.");
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

      await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/claim`, {
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
      
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/calculate`, {
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
            <Rocket size={32} className="text-emerald-400 animate-bounce" />
          </div>
          <h4 className="text-lg font-black text-white tracking-widest uppercase mb-2 text-center">Transmission Successful</h4>
          <p className="text-xs text-emerald-400 text-center animate-pulse">Redirecting to booking calendar...</p>
        </div>
      );
    }

    if (showLeadForm) {
      return (
        <form onSubmit={handleClaimSubmit} className="mt-8 bg-[#050505] border border-white/10 rounded-2xl p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <h4 className="text-sm font-bold text-white mb-4">Finalize Architecture Plan</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">Email (Required)</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="founder@brand.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">Phone (Optional)</label>
              <div className="relative">
                <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[11px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:scale-[1.02]"
            >
              {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : "Confirm & Book Intro"}
            </button>
            <button
              type="button"
              onClick={() => setShowLeadForm(false)}
              className="w-full text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
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
          <a
            href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ39ZxoVryKgnZLG_aJ5RfWwq30dGRspuOFH18-mxuwWiBaATCpOY1wk1TFNkOy-8Vy1mt0kyT2N?gv=true"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-4 bg-amber-600 hover:bg-amber-500 shadow-amber-600/20 text-white text-[11px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg hover:scale-[1.02]"
          >
            Schedule Founder Consultation
          </a>
        ) : (
          <button
            onClick={() => setShowLeadForm(true)}
            className={`flex items-center justify-center gap-2 w-full py-4 ${auditData ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/20' : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20'} text-white text-[11px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg hover:scale-[1.02]`}
          >
            {auditData ? 'Start Development' : 'Claim Your Margins'}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-[11px] font-bold uppercase tracking-widest mb-10 w-fit">
        <ArrowLeft size={14} /> Back to Home
      </Link>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-emerald-500/15 p-2 rounded-xl">
            <LineChart size={18} className="text-emerald-500" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-500">Heuristic Audit</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-4">
          Analysis for <span className="text-blue-500">{domain}</span>
        </h1>
        <p className="text-base text-slate-400 max-w-2xl leading-relaxed">
          Based on the {platform.charAt(0).toUpperCase() + platform.slice(1)} ecosystem, we've estimated your current platform drain. Adjust the sliders or run a Deep Scan to analyze the true margins.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 md:p-10 space-y-10">
          <div>
            <div className="flex justify-between items-end mb-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-1.5">Monthly Revenue</label>
                <p className="text-[11px] text-slate-500">Total gross volume processed</p>
              </div>
              <span className="text-2xl font-mono font-black text-white">{usd(monthlySpend)}</span>
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
              className="w-full h-2 appearance-none cursor-pointer rounded-full bg-white/10 accent-blue-500"
            />
            
            {monthlySpend === 0 && (
              <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-xl animate-in fade-in zoom-in duration-300">
                <p className="text-xs text-slate-300 mb-3 text-center">Do you sell products or process payments online?</p>
                <div className="flex gap-2">
                  <button onClick={() => setUsesEcom(true)} className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest border transition-all ${usesEcom === true ? 'bg-blue-500 text-white border-blue-500' : 'bg-transparent text-slate-400 border-white/10 hover:border-white/30'}`}>Yes, E-com</button>
                  <button onClick={() => setUsesEcom(false)} className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest border transition-all ${usesEcom === false ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-transparent text-slate-400 border-white/10 hover:border-white/30'}`}>No, Informational</button>
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="flex justify-between items-end mb-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-1.5">Monthly App Fees</label>
                <p className="text-[11px] text-slate-500">Subscriptions for themes/plugins</p>
              </div>
              <span className="text-2xl font-mono font-black text-white">{usd(appFees)}</span>
            </div>
            <input
              type="range" min={0} max={2000} step={50}
              value={appFees}
              onChange={(e) => setAppFees(Number(e.target.value))}
              className="w-full h-2 appearance-none cursor-pointer rounded-full bg-white/10 accent-blue-500"
            />
          </div>

          <div className="pt-6 border-t border-white/5">
            <button
              onClick={handleDeepAudit}
              disabled={isScanning || (monthlySpend === 0 && usesEcom === null)}
              className="flex items-center justify-center gap-2 w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[11px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:scale-[1.02]"
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
              className="flex items-center justify-center gap-2 w-full py-3 mt-2 bg-transparent hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed text-slate-400 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all border border-white/5 hover:border-white/10"
            >
               Fast Calculate (I KNOW MY COSTS)
            </button>
            <p className="text-center text-[10px] text-slate-500 mt-3">
              Uses Tycodes Agentic AI to scrape and analyze the architecture of {domain}.
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
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-rose-400">Scan Failed</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {scanError}
              </p>
            </div>
          )}

          {isScanning && scanProgress && (
             <div className="bg-blue-500/5 border border-blue-500/20 rounded-3xl p-8 flex items-center justify-center animate-in fade-in">
               <div className="flex flex-col items-center gap-3">
                 <Loader2 size={24} className="text-blue-500 animate-spin" />
                 <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">{scanProgress}</span>
               </div>
             </div>
          )}

          {auditData && (
            <div className="bg-blue-500/5 border border-blue-500/20 rounded-3xl p-6 md:p-8 relative overflow-hidden animate-in fade-in zoom-in duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-blue-400 mb-6 flex items-center gap-2">
                  <CheckCircle2 size={16} /> Deep Scan Complete
                </h3>

                <div className="mb-6 p-4 rounded-xl bg-black/40 border border-white/5">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Target Specs</span>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                    <div><span className="text-slate-500">Domain:</span> {domain}</div>
                    <div className="capitalize"><span className="text-slate-500">Platform:</span> {platform}</div>
                    <div><span className="text-slate-500">Revenue:</span> {usd(monthlySpend)}/mo</div>
                    <div><span className="text-slate-500">App Fees:</span> {usd(appFees)}/mo</div>
                  </div>
                </div>

                {platform !== "other" && !auditData.detected_stack.join(" ").toLowerCase().includes(platform.toLowerCase()) && (
                  <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 animate-in fade-in zoom-in duration-500">
                    <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-widest text-amber-500 mb-1">Platform Mismatch Detected</h4>
                      <p className="text-[11px] text-amber-200/80 leading-relaxed">
                        You selected <span className="font-bold capitalize">{platform}</span>, but our Agentic Auditor detected 
                        <span className="font-bold"> {auditData.detected_stack.join(", ")}</span>. Your actual margins might be different than initially calculated.
                      </p>
                    </div>
                  </div>
                )}

                {(platform.toLowerCase() === "shopify" || platform.toLowerCase() === "wix") && (
                  <div className="mb-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-start gap-3 animate-in fade-in zoom-in duration-500">
                    <Info size={16} className="text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-widest text-blue-400 mb-1">The Transaction Tax</h4>
                      <p className="text-[11px] text-blue-200/80 leading-relaxed">
                        Platforms like <span className="capitalize">{platform}</span> charge a per-transaction platform tax on top of standard processing. Tycodes integrates directly with Stripe—eliminating the platform tax entirely while keeping standard secure processing fees.
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-4 mb-6">
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Detected Stack</span>
                    <div className="flex flex-wrap gap-2">
                      {auditData.detected_stack.map((tech, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-slate-300">{tech}</span>
                      ))}
                    </div>
                  </div>

                  {/* Itemized Hidden Tax Breakdown */}
                  <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 overflow-hidden">
                    <div className="px-4 py-2.5 border-b border-rose-500/10 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-rose-400">Tycodes: Your Estimated Monthly Cost</span>
                      <span className="text-base font-mono font-black text-rose-400">{usd(auditData.estimated_monthly_total)}/mo</span>
                    </div>
                    <div className="divide-y divide-white/5">
                      <div className="flex justify-between items-center px-4 py-2">
                        <span className="text-[11px] text-slate-400">Base Subscription</span>
                        <span className="text-[11px] font-mono text-slate-300">{usd(auditData.base_subscription)}/mo</span>
                      </div>
                      <div className="flex justify-between items-center px-4 py-2">
                        <span className="text-[11px] text-slate-400">App Fees</span>
                        <span className="text-[11px] font-mono text-slate-300">{usd(auditData.app_fees)}/mo</span>
                      </div>
                      {auditData.platform_transaction_fee > 0 && (
                        <div className="flex justify-between items-center px-4 py-2 bg-rose-500/10">
                          <span className="text-[11px] text-rose-400 font-bold flex items-center gap-1.5">
                            <AlertTriangle size={11} /> Platform Transaction Tax (2%)
                          </span>
                          <span className="text-[11px] font-mono font-bold text-rose-400">{usd(auditData.platform_transaction_fee)}/mo</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center px-4 py-2">
                        <span className="text-[11px] text-slate-400">Domain / Hosting</span>
                        <span className="text-[11px] font-mono text-slate-300">{usd(auditData.hosting_cost)}/mo</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0a0a0a] rounded-2xl p-5 border border-blue-500/30">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-blue-500 mb-3">Tycodes Proposal</h4>
                  
                  <div className="mb-4">
                    <span className="block text-[10px] text-slate-500 mb-1">Recommended Rebuild</span>
                    <div className="flex flex-col gap-1.5 mt-2">
                      {auditData.recommended_tycodes_components.map((comp, i) => (
                        <span key={i} className="text-[11px] text-blue-400 flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-blue-500" />
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-start mb-1 mt-6">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mt-2">Tycodes Build</span>
                    {auditData.is_enterprise ? (
                      <span className="text-sm font-black text-amber-500 uppercase tracking-widest mt-2">Strategic Transformation</span>
                    ) : (
                      <div className="text-right">
                        <div className="flex items-start justify-end gap-1">
                          <span className="text-2xl font-mono font-black text-blue-400">{usd(auditData.setup_fee)} Setup</span>
                          {auditData.is_estimated && (
                            <span className="text-blue-400 text-lg font-black leading-none mt-0.5" title="Estimated starting fee — final price may vary based on features and add-ons">*</span>
                          )}
                        </div>
                        <span className="text-[10px] font-bold text-blue-400/80 uppercase tracking-widest bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20 inline-block">
                          2 payments of {usd(auditData.setup_fee / 2)} <span className="opacity-70 lowercase font-normal">(50% non refundable deposit, 50% upon completion)</span>
                        </span>
                        {auditData.is_estimated && (
                          <p className="text-[10px] text-slate-500 mt-2 text-right leading-relaxed">
                            * Estimated starting fee. Final price may vary based on features and add-ons — let's discuss first.
                          </p>
                        )}
                        {auditData.mgmt_fee > 0 && (
                          <span className="text-[11px] font-bold text-slate-400 block mt-2">
                            + {usd(auditData.mgmt_fee)}/mo Management
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {(!auditData.is_enterprise && auditData.savings_1_yr > 0) && (
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                        <span className="block text-[10px] font-bold uppercase tracking-widest text-emerald-500/70 mb-1">1-Year Savings</span>
                        <span className="text-sm font-mono font-bold text-emerald-400">{usd(auditData.savings_1_yr)}</span>
                      </div>
                      <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                        <span className="block text-[10px] font-bold uppercase tracking-widest text-emerald-500/70 mb-1">3-Year Savings</span>
                        <span className="text-sm font-mono font-bold text-emerald-400">{usd(auditData.savings_3_yr)}</span>
                      </div>
                    </div>
                  )}

                  {!auditData.is_enterprise && (
                    <div className="mt-4 p-3 bg-black/40 rounded-xl border border-white/5">
                      <p className="text-[11px] text-slate-400 leading-relaxed text-center">
                        {auditData.tycodes_payment_plan}
                      </p>
                    </div>
                  )}
                </div>
                
                {renderLeadCapture()}
              </div>
            </div>
          )}

          {/* Heuristic / Manual Result */}
          {!auditData && !scanError && (
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-3xl p-6 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10">
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-emerald-400 mb-6 flex items-center gap-2">
                  <ShieldAlert size={16} /> Heuristic Waste
                </h3>
                
                <div className="space-y-5 mb-10">
                  <div className="flex justify-between items-center pb-5 border-b border-white/5">
                    <span className="text-base text-slate-400">Gateway Penalty (~{(platform === "shopify" ? 2 : 1.5)}%)</span>
                    <span className="text-lg font-mono font-bold text-rose-400">-{usd(stats.platformPenalty)}/mo</span>
                  </div>
                  <div className="flex justify-between items-center pb-5 border-b border-white/5">
                    <span className="text-base text-slate-400">App Subscription Tax</span>
                    <span className="text-lg font-mono font-bold text-rose-400">-{usd(appFees)}/mo</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-base font-bold text-white">Total Annual Drain</span>
                    <span className="text-3xl font-mono font-black text-rose-500">-{usd(stats.totalWasteYr)}</span>
                  </div>
                </div>

                <div className="bg-[#0a0a0a] rounded-3xl p-6 border border-emerald-500/30">
                  <h4 className="text-[11px] font-bold uppercase tracking-widest text-emerald-500 mb-4 flex items-center gap-2">
                    <CheckCircle2 size={16} /> Tycodes Architecture
                  </h4>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-300">Tycodes Annual Savings</span>
                    <span className="text-2xl font-mono font-black text-emerald-400">+{usd(stats.totalWasteYr)}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">By migrating to a custom Vite/React frontend and retaining full code ownership, you keep 100% of your margins.</p>
                </div>
                
                {renderLeadCapture()}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
