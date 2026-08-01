import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Mail, Sun, Moon } from "lucide-react";
import { useTheme } from "../theme-provider";
import { BookAuditButton } from "./BookAuditCTA";
import { CONTACT_EMAIL } from "@/lib/constants";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Web Architecture", to: "/services" },
  { label: "Digital Presence", to: "/digital-presence" },
  { label: "Shipping & Commerce", to: "/ship-com" },
  { label: "Automation", to: "/automation" },
  { label: "Brand Infrastructure", to: "/brand" },
  { label: "Projects", to: "/projects" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  return (
    <>
      <header className="flex justify-between items-center mb-6 md:mb-8 border border-slate-200 dark:border-white/10 px-4 md:px-5 py-3 rounded-2xl bg-white/70 dark:bg-[#0a0a0a]/70 backdrop-blur-md sticky top-4 z-50 shadow-sm shadow-black/5 flex-shrink-0">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <Link to="/" className="group hover:opacity-90 transition-opacity flex-shrink-0 flex items-center">
            <motion.div
              whileHover={{ rotate: -6, scale: 1.06 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="bg-slate-900 dark:bg-white rounded-lg w-7 h-7 md:w-8 md:h-8 flex items-center justify-center mr-2"
            >
              <span className="text-indigo-500 font-mono text-[10px] md:text-xs font-bold">&lt;/&gt;</span>
            </motion.div>
            <span className="font-mono font-bold text-base md:text-lg text-slate-900 dark:text-white tracking-tight">
              Tycodes<span className="text-indigo-500">.dev</span>
            </span>
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Secondary contact affordance */}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            data-analytics-id="navbar-contact"
            aria-label="Email us"
            className="hidden sm:flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 text-slate-500 dark:text-slate-400 transition-all shrink-0"
          >
            <Mail size={14} />
          </a>

          {/* Primary CTA */}
          <BookAuditButton analyticsId="navbar-book-audit" label="Book Free Audit" className="hidden sm:inline-flex" />

          {/* Theme Toggle */}
          <motion.button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all text-slate-600 dark:text-slate-400 shrink-0 overflow-hidden"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          {/* Hamburger */}
          <motion.button
            onClick={() => setOpen(true)}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all shrink-0"
            aria-label="Open menu"
          >
            <Menu size={14} className="text-slate-600 dark:text-slate-400" />
          </motion.button>
        </div>
      </header>

      {/* Drawer overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 h-full w-72 z-50 bg-white dark:bg-[#0a0a0a] border-l border-slate-200 dark:border-white/10 flex flex-col transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-white/5">
          <span className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">Menu</span>
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-all hover:rotate-90 duration-200"
            aria-label="Close menu"
          >
            <X size={14} className="text-slate-500 dark:text-slate-400" />
          </button>
        </div>

        <nav className="flex flex-col p-6 gap-2 flex-1">
          {navLinks.map(({ label, to }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={`relative px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  active
                    ? "text-white"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="navbar-drawer-active"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    className="absolute inset-0 bg-indigo-600 rounded-xl -z-10"
                  />
                )}
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-slate-100 dark:border-white/5">
          <BookAuditButton analyticsId="navbar-drawer-book-audit" className="w-full" />
          <p className="text-center text-slate-500 text-[10px] font-mono mt-4 uppercase tracking-wide">
            Tycodes LLC &middot; Florida 2026
          </p>
        </div>
      </div>
    </>
  );
}
