import { Link } from "react-router-dom";
import { CONTACT_EMAIL } from "@/lib/constants";

const services = [
  { to: "/ai-visibility", label: "AI Visibility" },
  { to: "/tech-partner", label: "Tech Partner" },
  { to: "/3d-scroll-shop", label: "3D Scroll Shop" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 text-sm text-slate-600 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-base font-semibold text-slate-900">Tycodes LLC</p>
          <p className="mt-1">South Florida</p>
        </div>
        <nav aria-label="Services">
          <p className="font-medium text-slate-900">Services</p>
          <ul className="mt-2 space-y-1.5">
            {services.map((s) => (
              <li key={s.to}>
                <Link to={s.to} className="hover:text-slate-900 hover:underline">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="font-medium text-slate-900">Contact</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="mt-2 inline-block font-medium text-brand-800 hover:underline">
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
      <div className="border-t border-slate-100 px-5 py-4 text-center text-xs text-slate-500">
        &copy; 2026 Tycodes LLC
      </div>
    </footer>
  );
}
