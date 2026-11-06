import { Reveal } from "./motion";

export default function About() {
  return (
    <section id="about" className="px-5 py-20 sm:py-24">
      <Reveal className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">About</h2>
        <p className="mt-5 text-lg leading-relaxed text-slate-700">
          Hi, I&apos;m Tylor. I run Tycodes LLC from South Florida and work with local businesses in Broward, Miami-Dade
          and Palm Beach counties. I set things up, explain them in plain language, and stay around after the work is
          done. If you&apos;d rather talk to a person than a ticket queue, that&apos;s the idea.
        </p>
        <dl className="mt-8 grid gap-4 border-t border-slate-200 pt-6 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-slate-500">Company</dt>
            <dd className="mt-0.5 font-medium">Tycodes LLC</dd>
          </div>
          <div>
            <dt className="text-slate-500">Based in</dt>
            <dd className="mt-0.5 font-medium">South Florida</dd>
          </div>
          <div>
            <dt className="text-slate-500">Serving</dt>
            <dd className="mt-0.5 font-medium">Broward, Miami-Dade, Palm Beach</dd>
          </div>
        </dl>
      </Reveal>
    </section>
  );
}
