import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Mail, Activity, Users, Sun, Moon, Calculator } from "lucide-react";
import { useTheme } from "../theme-provider";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Vite-com", to: "/services" },
  { label: "Digital Presence", to: "/digital-presence" },
  { label: "Automation", to: "/automation" },
  { label: "Web Architecture & Development", to: "/web-architecture-development" },
  { label: "Brand Infrastructure", to: "/brand" },
  { label: "Projects", to: "/projects" },
];

function scrollToCalculator() {
  const el = document.getElementById("savings-calculator");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

interface NavbarProps {
  market: { price: string };
  isMarketOpen: boolean;
  visitorCount: number;
}

export default function Navbar({ market, isMarketOpen, visitorCount }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  return (
    <>
      <header className="flex justify-between items-center mb-6 md:mb-8 border-b border-white/5 pb-5 flex-shrink-0">
        {/* Left: Logo + tagline */}
        <div className="flex items-center gap-3 md:gap-4">
          <Link to="/" className="hover:opacity-80 transition-opacity flex-shrink-0 block mt-1">
            <svg viewBox="0 0 380 140" className="h-[90px] md:h-[110px] w-auto" xmlns="http://www.w3.org/2000/svg">
              {/* Icon */}
              <g transform="translate(40,40)">
                <rect x="0" y="0" width="60" height="60" rx="12" fill="#111827" />
                <text x="30" y="40" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="28" fill="#3B82F6">
                  &lt;/&gt;
                </text>
              </g>

              {/* Text */}
              <text x="105" y="78" fontFamily="JetBrains Mono, monospace" fontSize="42" className="fill-slate-900 dark:fill-white" letterSpacing="1">
                Tycodes
              </text>

              <text x="280" y="78" fontFamily="JetBrains Mono, monospace" fontSize="42" fill="#3B82F6">
                .dev
              </text>
            </svg>
          </Link>
          <div className="hidden md:block h-4 w-[1px] bg-white/10 relative top-1" />
          <p className="hidden md:block text-[10px] font-mono text-slate-500 dark:text-slate-500 uppercase tracking-[0.4em] relative top-1">
            Web Architecture, AI, &amp; Automation Solutions
          </p>
        </div>

        {/* Right: stats + contact + hamburger */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* S&P 500 */}
          <div className="hidden sm:flex items-center gap-2 bg-slate-100 dark:bg-white/5 px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10">
            <Activity size={12} className="text-blue-600" />
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest font-mono">
              S&P 500: <span className="text-slate-900 dark:text-white">{market.price}</span>
            </span>
          </div>

          {/* Traffic */}
          <div className="hidden sm:flex items-center gap-2 bg-slate-100 dark:bg-white/5 px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10">
            <Users size={11} className="text-emerald-500" />
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest font-mono">
              Traffic: <span className="text-slate-900 dark:text-white">{visitorCount.toLocaleString()}</span>
            </span>
          </div>

          {/* Market status */}
          <span className={`hidden sm:inline text-[9px] font-mono uppercase px-3 py-1.5 rounded-lg border ${isMarketOpen ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/5" : "text-amber-500 border-amber-500/20 bg-amber-500/5"}`}>
            {isMarketOpen ? "Open" : "Closed"}
          </span>

          {/* Calculate Savings CTA */}
          <button
            onClick={scrollToCalculator}
            className="hidden md:flex items-center gap-1.5 bg-emerald-600/15 hover:bg-emerald-600/25 text-emerald-400 border border-emerald-500/30 hover:border-emerald-500/60 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all hover:scale-105"
          >
            <Calculator size={11} />
            <span>Calculate Savings</span>
          </button>

          {/* Contact CTA */}
          <a
            href="mailto:contact@tycodes.dev"
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all hover:scale-105 shadow-lg shadow-blue-600/20"
          >
            <Mail size={11} />
            <span className="hidden sm:inline">Contact</span>
          </a>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all text-slate-600 dark:text-slate-400"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(true)}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all"
            aria-label="Open menu"
          >
            <Menu size={16} className="text-slate-600 dark:text-slate-400" />
          </button>
        </div>
      </header>

      {/* Drawer overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer panel */}
      <div className={`fixed top-0 right-0 h-full w-72 z-50 bg-white dark:bg-[#0a0a0a] border-l border-slate-200 dark:border-white/10 flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
        {/* Drawer header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-white/5">
          <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Menu</span>
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
            aria-label="Close menu"
          >
            <X size={14} className="text-slate-500 dark:text-slate-400" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col p-6 gap-1 flex-1">
          {/* Calculate Savings — prominent scroll CTA */}
          <button
            onClick={() => { setOpen(false); scrollToCalculator(); }}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all bg-emerald-600/10 border border-emerald-500/25 text-emerald-500 hover:bg-emerald-600/20 hover:border-emerald-500/50 mb-1"
          >
            <Calculator size={14} />
            Calculate Savings
          </button>
          {navLinks.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={`px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${location.pathname === to ? "bg-blue-600 text-white" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5"}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Drawer footer */}
        <div className="p-6 border-t border-slate-100 dark:border-white/5">
          <a
            href="mailto:contact@tycodes.dev"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all"
          >
            <Mail size={12} />
            Get in Touch
          </a>
          <p className="text-center text-slate-700 text-[9px] font-mono mt-4 uppercase tracking-widest">
            Tycodes LLC · Florida 2026
          </p>
        </div>
      </div>
    </>
  );
}
