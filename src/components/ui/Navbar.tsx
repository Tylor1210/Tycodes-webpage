import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Mail, Activity, Users, Sun, Moon } from "lucide-react";
import { useTheme } from "../theme-provider";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Web Architecture", to: "/services" },
  { label: "Digital Presence", to: "/digital-presence" },
  { label: "Automation", to: "/automation" },
  { label: "Brand Infrastructure", to: "/brand" },
  { label: "Projects", to: "/projects" },
];

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
      <header className="flex justify-between items-center mb-6 md:mb-8 border border-slate-200 dark:border-white/10 px-4 md:px-5 py-3 rounded-2xl bg-white/50 dark:bg-[#0a0a0a]/70 backdrop-blur-md sticky top-4 z-50 shadow-lg shadow-black/5 flex-shrink-0">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <Link to="/" className="hover:opacity-80 transition-opacity flex-shrink-0 flex items-center">
            {/* Simple Logo Icon & Text for Navbar instead of the huge original one */}
            <div className="bg-slate-900 dark:bg-white rounded-lg w-8 h-8 flex items-center justify-center mr-2">
              <span className="text-blue-500 font-mono text-xs font-bold">&lt;/&gt;</span>
            </div>
            <span className="font-mono font-bold text-lg text-slate-900 dark:text-white tracking-tight">
              Tycodes<span className="text-blue-500">.dev</span>
            </span>
          </Link>
        </div>


        {/* Right: Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Stats - Hidden on smaller screens to save space */}
          <div className="hidden xl:flex items-center gap-2 bg-slate-100 dark:bg-white/5 px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10">
            <Activity size={12} className="text-blue-600" />
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest font-mono">
              S&P 500: <span className="text-slate-900 dark:text-white">{market.price}</span>
            </span>
          </div>

          <div className="hidden xl:flex items-center gap-2 bg-slate-100 dark:bg-white/5 px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10">
            <Users size={11} className="text-emerald-500" />
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest font-mono">
              Traffic: <span className="text-slate-900 dark:text-white">{visitorCount.toLocaleString()}</span>
            </span>
          </div>

          <span className={`hidden lg:inline text-[9px] font-mono uppercase px-3 py-2 rounded-xl border ${isMarketOpen ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/5" : "text-amber-500 border-amber-500/20 bg-amber-500/5"}`}>
            {isMarketOpen ? "Open" : "Closed"}
          </span>

          {/* Contact CTA */}
          <a
            href="mailto:contact@tycodes.dev"
            data-analytics-id="navbar-contact"
            className="hidden sm:flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl transition-all hover:scale-105 shadow-lg shadow-blue-600/20 cursor-pointer"
          >
            <Mail size={12} />
            <span>Contact</span>
          </a>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all text-slate-600 dark:text-slate-400 shrink-0"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(true)}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all shrink-0"
            aria-label="Open menu"
          >
            <Menu size={14} className="text-slate-600 dark:text-slate-400" />
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
        <nav className="flex flex-col p-6 gap-2 flex-1">
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
          <p className="text-center text-slate-500 text-[9px] font-mono mt-4 uppercase tracking-widest">
            Tycodes LLC · Florida 2026
          </p>
        </div>
      </div>
    </>
  );
}
