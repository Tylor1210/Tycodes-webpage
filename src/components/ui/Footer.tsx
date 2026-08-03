import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Github, Mail } from "lucide-react";
import { BookAuditButton } from "./BookAuditCTA";
import { CONTACT_EMAIL } from "@/lib/constants";
import { staggerContainer, fadeUpItem } from "@/lib/motion";

export default function Footer() {
  return (
    <footer className="mt-12 flex-shrink-0 border-t border-slate-200 dark:border-white/5 pt-8 pb-6">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8"
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-40px" }}
        variants={staggerContainer}
      >
        {/* Brand column */}
        <motion.div variants={fadeUpItem}>
          <Link to="/" className="hover:opacity-80 transition-opacity flex-shrink-0 block w-fit -ml-4">
            <svg viewBox="0 0 380 140" className="h-[60px] md:h-[70px] w-auto" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(40,40)">
                <rect x="0" y="0" width="60" height="60" rx="12" fill="#111827" />
                <text x="30" y="40" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="28" fill="#4F46E5">
                  &lt;/&gt;
                </text>
              </g>
              <text x="105" y="78" fontFamily="JetBrains Mono, monospace" fontSize="42" className="fill-slate-900 dark:fill-white" letterSpacing="1">
                Tycodes
              </text>
              <text x="285" y="78" fontFamily="JetBrains Mono, monospace" fontSize="42" fill="#4F46E5">
                .dev
              </text>
            </svg>
          </Link>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Websites and infrastructure for small businesses and new companies who want to own what they build.
          </p>
        </motion.div>

        {/* Navigation column */}
        <motion.div variants={fadeUpItem}>
          <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 mb-4">Navigate</p>
          <nav className="flex flex-col gap-2">
            {[
              { label: "Home", to: "/" },
              { label: "Services & Pricing", to: "/services" },
              { label: "Digital Presence", to: "/digital-presence" },
              { label: "Shipping & Commerce", to: "/ship-com" },
              { label: "Automation", to: "/automation" },
              { label: "Growth Operations", to: "/growth-operations" },
              { label: "Brand Infrastructure", to: "/brand" },
              { label: "Projects", to: "/projects" },
            ].map(({ label, to }) => (
              <Link key={to} to={to} className="text-xs text-slate-600 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-white transition-colors font-medium">
                {label}
              </Link>
            ))}
          </nav>
        </motion.div>

        {/* Contact column */}
        <motion.div variants={fadeUpItem}>
          <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 mb-4">Connect</p>
          <div className="flex flex-col gap-3 items-start">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-white transition-colors font-medium group"
            >
              <Mail size={12} className="text-indigo-600 group-hover:scale-110 transition-transform" />
              {CONTACT_EMAIL}
            </a>
            <a
              href="https://github.com/Tylor1210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-white transition-colors font-medium group"
            >
              <Github size={12} className="text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-white group-hover:scale-110 transition-all" />
              github.com/Tylor1210
            </a>
            <BookAuditButton analyticsId="footer-book-audit" label="Book a Free Audit" className="mt-2" />
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-6 border-t border-slate-200 dark:border-white/5">
        <p className="text-[10px] text-slate-400 dark:text-slate-600 uppercase tracking-wide">
          &copy; 2026 Tycodes LLC &middot; All rights reserved
        </p>
        <p className="text-[10px] text-slate-400 dark:text-slate-600 uppercase tracking-wide">
          Built with Vite + React &middot; You own the code
        </p>
      </div>
    </footer>
  );
}
