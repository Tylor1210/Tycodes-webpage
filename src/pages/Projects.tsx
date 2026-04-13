import { Link } from "react-router-dom";
import { FolderOpen, ArrowLeft, ExternalLink, Github } from "lucide-react";

const projects = [
  { name: "Tycodes-webpage", tag: "TypeScript · Agency Site", url: "https://github.com/Tylor1210/Tycodes-webpage", desc: "The official Tycodes agency website. Built with React, Vite, and tailwind CSS." },
  { name: "tycodes-small-ecom1", tag: "TypeScript · E-com Engine", url: "https://github.com/Tylor1210/tycodes-small-ecom1", desc: "A high-performance custom storefront template replacing platform-locked solutions with direct Stripe integration." },
  { name: "confirmAutomation", tag: "HTML · Email Automation", url: "https://github.com/Tylor1210/confirmAutomation", desc: "Automated confirmation email system with customizable templates and trigger workflows." },
  { name: "Data-Structures-and-Algos", tag: "C++ · Spring '26", url: "https://github.com/Tylor1210/Data-Structures-and-Algos---Spring26", desc: "Spring 2026 data structures and algorithm implementations in C++." },
  { name: "2026spring-c-projects", tag: "C# · Spring Projects", url: "https://github.com/Tylor1210/2026spring-c-projects", desc: "Collection of C# projects from Spring 2026 coursework." },
];

export default function ProjectsPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-[11px] font-bold uppercase tracking-widest mb-10">
        <ArrowLeft size={14} /> Back to Home
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-600/15 p-3 rounded-xl">
          <FolderOpen className="text-blue-500" size={22} />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500/80">Recent Work</span>
      </div>

      <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight mb-4">
        Recent <span className="text-blue-500">Projects.</span>
      </h1>

      <p className="text-slate-400 text-base leading-relaxed mb-10 max-w-xl">
        A look at what's been built lately. All repos are public on GitHub.
      </p>

      <div className="space-y-4 mb-10">
        {projects.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start justify-between gap-4 rounded-2xl bg-[#0a0a0a] border border-white/10 p-6 hover:border-blue-600/40 transition-all"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-sm font-bold group-hover:text-blue-400 transition-colors">{p.name}</h3>
                <span className="text-[9px] font-mono text-slate-600 border border-white/10 px-2 py-0.5 rounded-md">{p.tag}</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">{p.desc}</p>
            </div>
            <ExternalLink size={14} className="text-slate-700 group-hover:text-blue-500 transition-colors flex-shrink-0 mt-0.5" />
          </a>
        ))}
      </div>

      <a
        href="https://github.com/Tylor1210"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-black uppercase tracking-widest text-[11px] px-8 py-4 rounded-2xl transition-all"
      >
        <Github size={14} />
        View All on GitHub
      </a>
    </div>
  );
}
