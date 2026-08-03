import { motion } from "motion/react";
import { FolderOpen, ExternalLink, Github, GraduationCap } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { BookAuditBand } from "@/components/ui/BookAuditCTA";
import { staggerContainer, fadeUpItem } from "@/lib/motion";

const clientProjects = [
  {
    name: "Tycodes-webpage",
    tag: "TypeScript · Agency Site",
    url: "https://github.com/Tylor1210/Tycodes-webpage",
    desc: "The official Tycodes agency website. Built with React, Vite, and Tailwind CSS.",
  },
  {
    name: "tycodes-small-ecom1",
    tag: "TypeScript · E-com Engine",
    url: "https://github.com/Tylor1210/tycodes-small-ecom1",
    desc: "A high-performance custom storefront template replacing platform-locked solutions with direct Stripe integration.",
  },
  {
    name: "confirmAutomation",
    tag: "HTML · Email Automation",
    url: "https://github.com/Tylor1210/confirmAutomation",
    desc: "Automated confirmation email system with customizable templates and trigger workflows.",
  },
];

const courseworkProjects = [
  {
    name: "Data-Structures-and-Algos",
    tag: "C++ · Spring '26",
    url: "https://github.com/Tylor1210/Data-Structures-and-Algos---Spring26",
    desc: "Spring 2026 data structures and algorithm implementations in C++.",
  },
  {
    name: "2026spring-c-projects",
    tag: "C# · Spring Projects",
    url: "https://github.com/Tylor1210/2026spring-c-projects",
    desc: "Collection of C# projects from Spring 2026 coursework.",
  },
];

export default function ProjectsPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <PageHeader
        icon={FolderOpen}
        eyebrow="Recent Work"
        accent="indigo"
        title={
          <>
            Recent <span className="text-indigo-600 dark:text-indigo-400">Projects.</span>
          </>
        }
        subtitle="A look at what's been built lately. All repos are public on GitHub."
      />

      {/* Client & product work */}
      <h2 className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-3">Client &amp; Product Work</h2>
      <motion.div
        className="space-y-4 mb-10"
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-40px" }}
        variants={staggerContainer}
      >
        {clientProjects.map((p) => (
          <motion.a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeUpItem}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="group flex items-start justify-between gap-4 rounded-2xl bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 p-6 hover:border-indigo-500/40 hover:shadow-lg hover:shadow-slate-900/5 dark:hover:shadow-black/20 transition-[colors,box-shadow] duration-200 shadow-sm"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {p.name}
                </h3>
                <span className="text-[11px] font-mono text-slate-500 border border-slate-200 dark:border-white/10 px-2 py-0.5 rounded-md">
                  {p.tag}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{p.desc}</p>
            </div>
            <ExternalLink
              size={14}
              className="text-slate-400 dark:text-slate-700 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex-shrink-0 mt-0.5"
            />
          </motion.a>
        ))}
      </motion.div>

      {/* Coursework & learning - kept visible but clearly secondary */}
      <div className="flex items-center gap-2 mb-3">
        <GraduationCap size={14} className="text-slate-400" />
        <h2 className="text-xs font-bold uppercase tracking-wide text-slate-500">Coursework &amp; Learning</h2>
      </div>
      <p className="text-xs text-slate-500 mb-4 leading-relaxed max-w-lg">
        Ongoing computer science coursework, shared for transparency and not representative of client deliverables.
      </p>
      <div className="space-y-3 mb-10">
        {courseworkProjects.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start justify-between gap-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 p-4 hover:border-indigo-500/30 transition-all"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {p.name}
                </h3>
                <span className="text-[11px] font-mono text-slate-400 border border-slate-200 dark:border-white/10 px-2 py-0.5 rounded-md">
                  {p.tag}
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
            </div>
            <ExternalLink
              size={13}
              className="text-slate-400 dark:text-slate-700 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex-shrink-0 mt-0.5"
            />
          </a>
        ))}
      </div>

      <div className="flex justify-center mb-4">
        <a
          href="https://github.com/Tylor1210"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-transparent border border-slate-300 dark:border-white/15 hover:border-indigo-500/40 text-slate-700 dark:text-slate-300 font-semibold uppercase tracking-wide text-xs px-6 py-3 rounded-xl transition-all cursor-pointer"
        >
          <Github size={14} />
          View All on GitHub
        </a>
      </div>

      <BookAuditBand analyticsId="projects-bottom-book-audit" />
    </div>
  );
}
