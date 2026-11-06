import BookButton from "./BookButton";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#about", label: "About" },
];

// Plain anchors (no router) so the header works on the prerendered page and on /audit.
export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="/" className="flex items-center gap-2.5" aria-label="Tycodes home">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-slate-900 font-mono text-xs font-bold text-brand-400">
            &lt;/&gt;
          </span>
          <span className="text-lg font-semibold tracking-tight">Tycodes</span>
        </a>
        <div className="flex items-center gap-6 md:gap-8">
          <nav aria-label="Main" className="hidden items-center gap-7 text-sm text-slate-600 md:flex">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="transition-colors hover:text-slate-900">
                {l.label}
              </a>
            ))}
          </nav>
          <span className="sm:hidden">
            <BookButton analyticsId="header-book-mobile" label="Book audit" size="sm" arrow={false} />
          </span>
          <span className="hidden sm:inline">
            <BookButton analyticsId="header-book" label="Book a free audit" size="sm" arrow={false} />
          </span>
        </div>
      </div>
    </header>
  );
}
