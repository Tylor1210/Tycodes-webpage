import { motion } from "motion/react";
import { Bot, Share2, Youtube, Twitch, Video } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { BookAuditBand } from "@/components/ui/BookAuditCTA";
import { fadeUp, staggerContainer, fadeUpItem } from "@/lib/motion";

export default function BrandPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <PageHeader
        icon={Bot}
        eyebrow="Auto-Growth"
        accent="indigo"
        title={
          <>
            Automated Brand <span className="text-indigo-600 dark:text-indigo-400">Infrastructure.</span>
          </>
        }
        subtitle="Stop spending hours on content. We build autonomous content pipelines that keep your brand active across every platform while you focus on running your business."
      />

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6"
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-40px" }}
        variants={staggerContainer}
      >
        {[
          { icon: Video, label: "Instagram", body: "Short-form clip repurposing from long-form content. Auto-posted." },
          { icon: Youtube, label: "YouTube", body: "Automated upload scheduling, thumbnail generation, and description SEO." },
          { icon: Twitch, label: "Twitch", body: "Stream alerts, clip archiving, and highlight reel automation." },
        ].map(({ icon: Icon, label, body }) => (
          <motion.div
            key={label}
            variants={fadeUpItem}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 p-5 hover:border-indigo-500/30 transition-colors shadow-sm"
          >
            <div className="bg-indigo-600/10 p-2 rounded-lg w-fit mb-3">
              <Icon size={14} className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{label}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{body}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        {...fadeUp}
        className="rounded-3xl bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 p-8 mb-10 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-4">
          <Share2 size={18} className="text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">How it works</h2>
        </div>
        <motion.ol
          className="space-y-4"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-40px" }}
          variants={staggerContainer}
        >
          {[
            "We audit your current content workflow and identify automation opportunities.",
            "Custom pipelines are built using Python + AI to generate, schedule, and post.",
            "You approve. The system runs. You collect the analytics.",
          ].map((step, i) => (
            <motion.li key={i} variants={fadeUpItem} className="flex gap-4">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold text-lg font-mono leading-none mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{step}</p>
            </motion.li>
          ))}
        </motion.ol>
      </motion.div>

      <BookAuditBand analyticsId="brand-bottom-book-audit" />
    </div>
  );
}
