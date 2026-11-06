import BookButton from "./BookButton";
import { CONTACT_EMAIL, CTA_SHORT } from "@/lib/constants";
import { Reveal } from "./motion";

export default function FinalCta() {
  return (
    <section id="book" className="px-5 pb-20 sm:pb-24">
      <Reveal className="mx-auto max-w-6xl rounded-2xl bg-brand-800 px-6 py-14 text-center text-white sm:px-12 sm:py-16">
        <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Ready to see where your site stands?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-brand-50">
          Book a free 15 minute audit call. No pressure, just a straight look at what we found.
        </p>
        <div className="mt-8">
          <BookButton analyticsId="final-book" label={CTA_SHORT} variant="inverse" size="lg" />
        </div>
        <p className="mt-5 text-sm text-brand-100">
          Prefer email?{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-white underline underline-offset-2">
            {CONTACT_EMAIL}
          </a>
        </p>
      </Reveal>
    </section>
  );
}
