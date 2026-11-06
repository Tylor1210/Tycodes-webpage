import Hero from "@/components/site/Hero";
import Services from "@/components/site/Services";
import HowItWorks from "@/components/site/HowItWorks";
import About from "@/components/site/About";
import FinalCta from "@/components/site/FinalCta";
import PageShell from "@/components/site/PageShell";

/** Home page. Prerendered to static HTML at build time (see scripts/prerender.mjs), then hydrated. */
export default function Home() {
  return (
    <PageShell>
      <Hero />
      <Services />
      <HowItWorks />
      <About />
      <FinalCta />
    </PageShell>
  );
}
