import { useState, useMemo } from "react";
import {
  Calculator,
  CheckCircle2,
  TrendingUp,
  Info,
  ChevronDown,
  SlidersHorizontal,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
type Platform = "shopify" | "wix";
interface Plan { label: string; monthly: number; penaltyRate: number; }

// ─── Static config ────────────────────────────────────────────────────────────
const PLATFORMS: Record<Platform, { label: string; plans: Plan[] }> = {
  shopify: {
    label: "Shopify",
    plans: [
      { label: "Basic — $39/mo", monthly: 39, penaltyRate: 0.02 },
      { label: "Shopify — $105/mo", monthly: 105, penaltyRate: 0.01 },
      { label: "Advanced — $399/mo", monthly: 399, penaltyRate: 0.006 },
    ],
  },
  wix: {
    label: "Wix",
    plans: [
      { label: "Light — $17/mo", monthly: 17, penaltyRate: 0.02 },
      { label: "Core — $29/mo", monthly: 29, penaltyRate: 0.02 },
      { label: "Business — $36/mo", monthly: 36, penaltyRate: 0.02 },
      { label: "Elite — $159/mo", monthly: 159, penaltyRate: 0.0 },
    ],
  },
};

const STRIPE_RATE = 0.029;   // 2.9 % — identical pass-through on both sides
const STRIPE_FIXED = 0.30;    // $0.30 per transaction
const AVG_ORDER = 75;      // assumed average order value for tx-count math
const DOMAIN_ANNUAL = 15;      // $15/yr domain — pass-through
const TY_BASE_FEE = 1250;    // Tycodes base professional fee
const TY_VALUE_PCT = 0.15;    // 15 % of Year-1 savings added to fee

const usd = (n: number, dec = 0) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec });

function stripeMonth(revenue: number) {
  return revenue * STRIPE_RATE + (revenue / AVG_ORDER) * STRIPE_FIXED;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function SavingsCalculator() {
  const [platform, setPlatform] = useState<Platform>("shopify");
  const [planIdx, setPlanIdx] = useState(0);
  const [revenue, setRevenue] = useState(5000);
  // Mobile-only collapsible — details hidden by default on small screens
  const [showDetails, setShowDetails] = useState(false);

  const cfg = PLATFORMS[platform];
  const plan = cfg.plans[planIdx] ?? cfg.plans[0];

  const switchPlatform = (p: Platform) => { setPlatform(p); setPlanIdx(0); };

  const c = useMemo(() => {
    // Pass-through costs — identical on both sides
    const stripe = stripeMonth(revenue);
    const domainMo = DOMAIN_ANNUAL / 12;

    // Competitor monthly
    const subscription = plan.monthly;
    const penalty = revenue * plan.penaltyRate;          // 3rd-party gateway penalty
    const currentMo = subscription + penalty + stripe + domainMo;
    const currentYr = currentMo * 12;

    // Tycodes monthly (zero subscription, zero penalty)
    const tycodesMo = stripe + domainMo;
    const tycodesYr = tycodesMo * 12;

    // True savings = only what we eliminate
    const savedSub = subscription * 12;
    const savedPenalty = penalty * 12;
    const annualSaving = savedSub + savedPenalty;

    // Value-based professional fee
    const proFee = TY_BASE_FEE + TY_VALUE_PCT * annualSaving;
    const yr1Net = annualSaving - proFee;
    const breakEven = annualSaving > 0
      ? Math.ceil((proFee / (annualSaving / 12)) * 10) / 10
      : Infinity;

    return {
      stripe, domainMo,
      subscription, penalty, currentMo, currentYr,
      tycodesMo, tycodesYr,
      savedSub, savedPenalty, annualSaving,
      proFee, yr1Net, breakEven,
    };
  }, [platform, planIdx, revenue, plan]);

  return (
    <section id="savings-calculator" className="scroll-mt-20 h-full">
      <div className="h-full rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col relative">

        {/* Ambient glows */}
        <div className="absolute -top-20 -left-20 w-56 h-56 bg-emerald-500/4 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-rose-500/4 rounded-full blur-3xl pointer-events-none" />

        {/* ── Header: Always Visible ── */}
        <div className="relative z-10 px-5 pt-5 pb-4 border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="bg-emerald-500/10 p-1.5 rounded-lg">
              <Calculator size={12} className="text-emerald-400" />
            </div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-500/70">
              Platform Tax Savings Calculator
            </span>
          </div>
          <h2 className="text-lg font-extrabold text-white tracking-tight leading-snug">
            Calculate your <span className="text-rose-400">platform tax</span> now!
          </h2>

          {/* Penalty explainer */}
          <div className="mt-2.5 flex gap-2 items-start bg-amber-500/5 border border-amber-500/20 rounded-xl px-3 py-2">
            <Info size={11} className="text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-[9px] text-slate-400 leading-relaxed">
              <span className="text-amber-400 font-bold">What is the 2% Gateway Penalty?</span>{" "}
              Platforms charge this specifically because you chose to use your own processor (Stripe) instead of theirs — it's a middleman tax. We eliminate it.
            </p>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="relative z-10 flex-1 overflow-y-auto px-5 py-4 space-y-4 min-h-0">

          {/* ── Mobile-only toggle button ── */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="md:hidden w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 transition-all shadow-lg active:scale-95"
          >
            <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300">
              <SlidersHorizontal size={12} className="text-emerald-400" />
              {showDetails ? "Hide Calculator Settings" : "Adjust My Web Costs"}
            </span>
            <ChevronDown
              size={14}
              className={`text-slate-500 transition-transform duration-300 ${showDetails ? "rotate-180" : ""}`}
            />
          </button>

          {/* ── Collapsible Content: HIDDEN on mobile by default, ALWAYS visible on desktop ── */}
          <div className={showDetails ? "space-y-4 block" : "space-y-4 hidden md:block"}>

            {/* Controls */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <FieldLabel>Platform</FieldLabel>
                <div className="flex gap-1.5 mt-1.5">
                  {(["shopify", "wix"] as Platform[]).map((p) => (
                    <button
                      key={p}
                      onClick={() => switchPlatform(p)}
                      className={`flex-1 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg border transition-all ${platform === p
                          ? "bg-rose-500/12 border-rose-500/40 text-rose-400"
                          : "bg-slate-900 border-slate-700 text-slate-500 hover:border-slate-600 hover:text-slate-400"
                        }`}
                    >
                      {PLATFORMS[p].label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <FieldLabel>Monthly Revenue</FieldLabel>
                  <span className="text-[10px] font-black text-white font-mono">{usd(revenue)}</span>
                </div>
                <input
                  type="range" min={500} max={100000} step={500}
                  value={revenue}
                  onChange={(e) => setRevenue(Number(e.target.value))}
                  className="w-full h-1.5 appearance-none cursor-pointer rounded-full bg-slate-800 accent-emerald-500"
                />
              </div>
            </div>

            {/* Plan select */}
            <div>
              <FieldLabel>{cfg.label} Plan</FieldLabel>
              <div className="space-y-1 mt-1.5">
                {cfg.plans.map((p, i) => (
                  <button
                    key={p.label}
                    onClick={() => setPlanIdx(i)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border text-[10px] font-semibold transition-all text-left ${planIdx === i
                        ? "bg-slate-800 border-slate-600 text-white"
                        : "bg-slate-900/60 border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-400"
                      }`}
                  >
                    <span>{p.label}</span>
                    <span className="flex items-center gap-2">
                      {p.penaltyRate > 0 && <span className="text-[8px] font-mono text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded">+{(p.penaltyRate * 100).toFixed(1)}%</span>}
                      {planIdx === i && <CheckCircle2 size={11} className="text-emerald-400 flex-shrink-0" />}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Result Cards */}
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-rose-500/5 border border-rose-500/20 p-3">
                <span className="text-[9px] font-black uppercase tracking-widest text-rose-400 block mb-2">Current</span>
                <Line label="Subscription" value={c.subscription} color="text-slate-400" />
                <Line label="Gateway Penalty" value={c.penalty} color="text-rose-400" bold />
                <PassThru stripe={c.stripe} domain={c.domainMo} />
                <Total value={c.currentMo} color="text-rose-400" />
              </div>

              <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/20 p-3">
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400 block mb-2">Tycodes</span>
                <LineZero label="Subscription" />
                <LineZero label="Gateway Penalty" accent />
                <PassThru stripe={c.stripe} domain={c.domainMo} />
                <Total value={c.tycodesMo} color="text-emerald-400" />
              </div>
            </div>

            {/* Savings Breakdown */}
            <div className="rounded-xl bg-slate-900 border border-slate-700 p-3 space-y-2">
              <FieldLabel>Annual Savings</FieldLabel>
              <SavRow label="Subscriptions removed" value={c.savedSub} />
              <SavRow label="Penalty removed" value={c.savedPenalty} accent />
              <div className="flex justify-between items-center border-t border-slate-700 pt-2 text-[10px] font-black text-white">
                <span>Total Annual Savings</span>
                <span className="text-base text-emerald-400 font-mono">{usd(c.annualSaving)}</span>
              </div>
            </div>

            {/* Fee & ROI */}
            <div className="rounded-xl border-2 border-dashed border-slate-700 p-3 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">One-Time Payment</p>
                  <p className="text-[8px] text-slate-600 font-mono italic">$1,250 base + 15% savings</p>
                </div>
                <span className="text-xl font-black text-white font-mono">{usd(c.proFee)}</span>
              </div>

              <div className={`rounded-lg p-2.5 ${c.yr1Net >= 0 ? "bg-emerald-500/8 border border-emerald-500/20" : "bg-amber-500/8 border border-amber-500/20"}`}>
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-black text-white">Net Year 1 ROI</span>
                  <span className={`text-base font-black font-mono ${c.yr1Net >= 0 ? "text-emerald-400" : "text-amber-400"}`}>
                    {c.yr1Net >= 0 ? "+" : ""}{usd(c.yr1Net)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="space-y-2 pt-2">
              <a
                href="mailto:contact@tycodes.dev?subject=Startup Package — Savings Calculator"
                className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-emerald-700/30"
              >
                <TrendingUp size={12} />
                Get a Quote
              </a>
              <p className="text-center text-[8px] font-mono text-slate-600">
                One-time payment · 100% code ownership
              </p>
            </div>

          </div>{/* end collapsible content */}
        </div>
      </div>
    </section>
  );
}

// ─── Micro components ─────────────────────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="block text-[9px] font-bold uppercase tracking-widest text-slate-500">{children}</span>;
}

function Line({ label, value, color, bold }: { label: string; value: number; color: string; bold?: boolean }) {
  return (
    <div className="flex justify-between gap-1 items-center py-0.5">
      <span className={`text-[9px] truncate ${bold ? "font-semibold text-rose-300" : "text-slate-500"}`}>{label}</span>
      <span className={`text-[9px] font-mono flex-shrink-0 ${color} ${bold ? "font-bold" : ""}`}>${value.toFixed(2)}</span>
    </div>
  );
}

function LineZero({ label, accent }: { label: string; accent?: boolean }) {
  return (
    <div className="flex justify-between gap-1 items-center py-0.5">
      <span className={`text-[9px] truncate ${accent ? "font-semibold text-emerald-300/70" : "text-slate-600"}`}>{label}</span>
      <span className="text-[9px] font-mono text-emerald-500/70 line-through">$0.00</span>
    </div>
  );
}

function PassThru({ stripe, domain }: { stripe: number; domain: number }) {
  return (
    <div className="border-t border-white/5 mt-1.5 pt-1.5">
      <p className="text-[7px] uppercase tracking-widest text-slate-700 font-bold mb-0.5">Pass-through</p>
      <div className="flex justify-between gap-1 py-0.5">
        <span className="text-[9px] text-slate-600">Stripe 2.9%+$0.3</span>
        <span className="text-[9px] font-mono text-slate-600">${stripe.toFixed(2)}</span>
      </div>
      <div className="flex justify-between gap-1 py-0.5">
        <span className="text-[9px] text-slate-600">Domain ($15/yr)</span>
        <span className="text-[9px] font-mono text-slate-600">${domain.toFixed(2)}</span>
      </div>
    </div>
  );
}

function Total({ value, color }: { value: number; color: string }) {
  return (
    <div className="border-t border-white/8 mt-1.5 pt-1.5 flex justify-between">
      <span className="text-[9px] font-black text-slate-400">Total/mo</span>
      <span className={`text-sm font-black font-mono ${color}`}>${value.toFixed(2)}</span>
    </div>
  );
}

function SavRow({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className={`text-[9px] leading-snug ${accent ? "text-slate-200 font-semibold" : "text-slate-500"}`}>{label}</span>
      <span className={`text-[9px] font-black font-mono flex-shrink-0 ${accent ? "text-emerald-400" : "text-slate-400"}`}>
        +{usd(value)}
      </span>
    </div>
  );
}
