import { Link } from "react-router-dom";
import { Github, Mail, Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-12 flex-shrink-0 border-t border-slate-200 dark:border-white/5 pt-8 pb-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
        {/* Brand column */}
        <div>
          <Link to="/" className="hover:opacity-80 transition-opacity flex-shrink-0 block w-fit -ml-4">
            <svg viewBox="0 0 380 140" className="h-[60px] md:h-[70px] w-auto" xmlns="http://www.w3.org/2000/svg">
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

              <text x="270" y="78" fontFamily="JetBrains Mono, monospace" fontSize="42" fill="#3B82F6">
                .dev
              </text>
            </svg>
          </Link>
          <p className="text-[10px] text-slate-500 dark:text-slate-600 font-mono uppercase tracking-widest mt-2 leading-relaxed">
            Venture Infrastructure<br />& Systems Engineering
          </p>
          <div className="flex items-center gap-1.5 mt-4">
            <Zap size={10} className="text-blue-600" />
            <span className="text-[9px] text-slate-500 dark:text-slate-600 font-mono uppercase tracking-widest">Florida 2026</span>
          </div>
        </div>

        {/* Navigation column */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">Navigate</p>
          <nav className="flex flex-col gap-2">
            {[
              { label: "Home", to: "/" },
              { label: "Services", to: "/services" },
              { label: "Startup Package", to: "/startup-package" },
              { label: "Brand Infrastructure", to: "/brand" },
              { label: "Ship-com Package", to: "/ship-com" },
              { label: "Projects", to: "/projects" },
            ].map(({ label, to }) => (
              <Link key={to} to={to} className="text-[11px] text-slate-600 dark:text-slate-500 hover:text-blue-600 dark:hover:text-white transition-colors font-medium">
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact column */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">Connect</p>
          <div className="flex flex-col gap-3">
            <a
              href="mailto:contact@tycodes.dev"
              className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-500 hover:text-blue-600 dark:hover:text-white transition-colors font-medium group"
            >
              <Mail size={12} className="text-blue-600 group-hover:scale-110 transition-transform" />
              contact@tycodes.dev
            </a>
            <a
              href="https://github.com/Tylor1210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-500 hover:text-blue-600 dark:hover:text-white transition-colors font-medium group"
            >
              <Github size={12} className="text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-white group-hover:scale-110 transition-all" />
              github.com/Tylor1210
            </a>
            <a
              href="mailto:contact@tycodes.dev"
              className="mt-2 inline-flex items-center gap-1.5 bg-blue-600/10 hover:bg-blue-600 border border-blue-600/30 text-blue-600 dark:text-blue-400 hover:text-white text-[10px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl transition-all w-fit"
            >
              <Mail size={10} />
              Start a Project
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-6 border-t border-slate-200 dark:border-white/5">
        <p className="text-[9px] text-slate-400 dark:text-slate-700 font-mono uppercase tracking-widest">
          © 2026 Tycodes LLC · All rights reserved
        </p>
        <p className="text-[9px] text-slate-400 dark:text-slate-700 font-mono uppercase tracking-widest">
          Built with Vite + React · No platform tax
        </p>
      </div>
    </footer>
  );
}
