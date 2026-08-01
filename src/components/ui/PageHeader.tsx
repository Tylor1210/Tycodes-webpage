import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, type LucideIcon } from "lucide-react";
import { staggerContainer, fadeUpItem } from "@/lib/motion";

interface PageHeaderProps {
  icon: LucideIcon;
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  accent?: "indigo" | "amber" | "emerald";
}

const accentClasses = {
  indigo: { badgeBg: "bg-indigo-600/10", icon: "text-indigo-600", eyebrow: "text-indigo-600" },
  amber: { badgeBg: "bg-amber-500/10", icon: "text-amber-600", eyebrow: "text-amber-600" },
  emerald: { badgeBg: "bg-emerald-600/10", icon: "text-emerald-600", eyebrow: "text-emerald-600" },
} as const;

export default function PageHeader({ icon: Icon, eyebrow, title, subtitle, accent = "indigo" }: PageHeaderProps) {
  const c = accentClasses[accent];

  return (
    <motion.div className="mb-10" initial="initial" animate="animate" variants={staggerContainer}>
      <motion.div variants={fadeUpItem}>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all text-xs font-semibold uppercase tracking-wide mb-8 group"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" /> Back to Home
        </Link>
      </motion.div>

      <motion.div className="flex items-center gap-3 mb-5" variants={fadeUpItem}>
        <div className={`${c.badgeBg} p-2.5 rounded-xl`}>
          <Icon className={c.icon} size={20} />
        </div>
        <span className={`text-xs font-bold uppercase tracking-wide ${c.eyebrow}`}>{eyebrow}</span>
      </motion.div>

      <motion.h1
        className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] mb-4 text-slate-900 dark:text-white"
        variants={fadeUpItem}
      >
        {title}
      </motion.h1>

      {subtitle && (
        <motion.p
          className="text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl"
          variants={fadeUpItem}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
