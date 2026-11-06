import BookButton from "./BookButton";

const platforms = [
  { value: "other", label: "Other or not sure" },
  { value: "wix", label: "Wix" },
  { value: "squarespace", label: "Squarespace" },
  { value: "shopify", label: "Shopify" },
  { value: "woocommerce", label: "WooCommerce" },
];

const stagger = (i: number) => ({ "--i": i }) as React.CSSProperties;

/*
 * The auditor entry point. It is a plain GET form to /audit, so it works before any JavaScript
 * loads and hands off the same ?domain= and ?platform= params AuditPage already reads.
 */
export default function Hero() {
  return (
    <section className="px-5 pb-16 pt-14 sm:pb-24 sm:pt-20">
      <div className="mx-auto max-w-3xl">
        <h1
          style={stagger(0)}
          className="hero-in text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl"
        >
          Is your website working for you? Find out free.
        </h1>
        <p style={stagger(1)} className="hero-in mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
          Enter your website and we&apos;ll scan it. Then book a 15 minute call and we&apos;ll walk you through what we
          found.
        </p>

        <form
          action="/audit"
          method="get"
          style={stagger(2)}
          className="hero-in mt-9 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label htmlFor="audit-domain" className="mb-1.5 block text-sm font-medium text-slate-700">
                Your website
              </label>
              <input
                id="audit-domain"
                name="domain"
                type="text"
                inputMode="url"
                autoComplete="url"
                autoCapitalize="none"
                spellCheck={false}
                required
                placeholder="yourbusiness.com"
                className="h-12 w-full rounded-md border border-slate-300 bg-white px-3.5 text-base text-slate-900 placeholder:text-slate-400 focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-700/20"
              />
            </div>
            <div className="sm:w-48">
              <label htmlFor="audit-platform" className="mb-1.5 block text-sm font-medium text-slate-700">
                Built on
              </label>
              <select
                id="audit-platform"
                name="platform"
                defaultValue="other"
                className="h-12 w-full rounded-md border border-slate-300 bg-white px-3 text-base text-slate-900 focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-700/20"
              >
                {platforms.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              data-analytics-id="hero-run-audit"
              className="h-12 rounded-md bg-slate-900 px-6 text-base font-semibold text-white transition-colors hover:bg-slate-700"
            >
              Run free audit
            </button>
          </div>
          <p className="mt-3 text-sm text-slate-500">Takes about a minute. No email needed to see results.</p>
        </form>

        <div style={stagger(3)} className="hero-in mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <BookButton analyticsId="hero-book" size="lg" />
          <span className="text-sm text-slate-500">Free, 15 minutes, no pressure.</span>
        </div>
      </div>
    </section>
  );
}
