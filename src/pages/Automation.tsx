import { motion } from "motion/react";
import { Zap, Bot, Info, Cable, Syringe, Layers } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { BookAuditBand } from "@/components/ui/BookAuditCTA";
import { fadeUp, staggerContainer, fadeUpItem } from "@/lib/motion";

export default function AutomationPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <PageHeader
        icon={Bot}
        eyebrow="Autonomous Systems"
        accent="emerald"
        title={
          <>
            Automation that <span className="text-emerald-600 dark:text-emerald-400">scales.</span>
          </>
        }
        subtitle="Stop fighting your software and start making it work for you. From simple API bridges to autonomous AI digital employees, I build the infrastructure that replaces manual labor with real efficiency."
      />

      {/* Tiers Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-40px" }}
        variants={staggerContainer}
      >
        {[
          {
            name: "The Connector",
            price: "$2,500 – $7,500",
            subtitle: "API & Middleware",
            body: "Custom bridges between CRM, email, and project management tools to eliminate manual data entry.",
            icon: Cable,
            example: "Whenever a lead fills out your website form, The Connector instantly checks their LinkedIn, updates your Salesforce, and pings your sales team in Slack.",
          },
          {
            name: "The Transfusion",
            price: "$5,000 – $15,000",
            subtitle: "Intelligent Workflow Injection",
            body: "Custom AI logic and automation tailored to your specific marketing or operational bottlenecks.",
            icon: Syringe,
            example: "An AI support agent that reads every incoming email, references your company manual, drafts a response, and only tags a human when necessary.",
          },
          {
            name: "The Architect",
            price: "$15,000 – $50,000+",
            subtitle: "Custom ERP & Internal Tools",
            body: "Foundation-level infrastructure and autonomous systems built to run your business on autopilot.",
            icon: Layers,
            example: "A construction management dashboard where the owner can track job sites, real-time material costs, and crew schedules in one private app.",
          },
        ].map((pkg) => (
          <motion.div
            key={pkg.name}
            variants={fadeUpItem}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-white/[0.03] rounded-2xl p-6 border border-slate-200 dark:border-white/5 flex flex-col h-full hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/5 transition-[colors,box-shadow] duration-200 shadow-sm"
          >
            <div className="bg-emerald-500/10 p-2.5 rounded-xl w-fit mb-4">
              <pkg.icon size={18} className="text-emerald-600 dark:text-emerald-400" />
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400 mb-1">
                {pkg.name}
              </h3>
              <p className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight mb-1">{pkg.price}</p>
              <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wide">{pkg.subtitle}</p>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex-1">{pkg.body}</p>

            <div className="pt-4 border-t border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <Zap size={11} className="text-emerald-600 dark:text-emerald-400" />
                <span className="text-[11px] font-bold uppercase tracking-wide text-slate-500">The ROI Example</span>
              </div>
              <p className="text-xs text-slate-500 italic leading-relaxed">&ldquo;{pkg.example}&rdquo;</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Summary comparison */}
      <h2 className="text-2xl font-semibold tracking-tight mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
        <Info className="text-emerald-600 dark:text-emerald-400" size={20} />
        System Comparison
      </h2>
      <motion.div
        {...fadeUp}
        className="rounded-3xl bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/5 p-6 md:p-8 overflow-x-auto mb-20 shadow-sm"
      >
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-slate-200 dark:border-white/10 text-[11px] uppercase tracking-wide text-slate-500">
              <th className="pb-4 font-bold w-1/4">System Type</th>
              <th className="pb-4 font-bold">Complexity</th>
              <th className="pb-4 font-bold">Delivery Time</th>
              <th className="pb-4 font-bold text-emerald-600 dark:text-emerald-400">Core Value</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
              <td className="py-5 text-slate-900 dark:text-white font-bold">The Connector</td>
              <td className="py-5 text-slate-600 dark:text-slate-400">Low to Moderate</td>
              <td className="py-5 text-slate-600 dark:text-slate-400">1 – 2 Weeks</td>
              <td className="py-5 text-emerald-600 dark:text-emerald-400 font-bold">Data Synchronization</td>
            </tr>
            <tr className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
              <td className="py-5 text-slate-900 dark:text-white font-bold">The Transfusion</td>
              <td className="py-5 text-slate-600 dark:text-slate-400">High (LLM Logic)</td>
              <td className="py-5 text-slate-600 dark:text-slate-400">3 – 6 Weeks</td>
              <td className="py-5 text-emerald-600 dark:text-emerald-400 font-bold">Intelligent Workflow</td>
            </tr>
            <tr className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
              <td className="py-5 text-slate-900 dark:text-white font-bold">The Architect</td>
              <td className="py-5 text-slate-600 dark:text-slate-400">Very High (Full Stack)</td>
              <td className="py-5 text-slate-600 dark:text-slate-400">2 – 4 Months</td>
              <td className="py-5 text-emerald-600 dark:text-emerald-400 font-bold">Operational Control</td>
            </tr>
          </tbody>
        </table>
      </motion.div>

      <BookAuditBand analyticsId="automation-bottom-book-audit" />
    </div>
  );
}
