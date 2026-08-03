import { motion } from "motion/react";
import { Bot, MessageSquare, Star, Cable, Sparkles } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import PricingTierCard from "@/components/ui/PricingTierCard";
import { BookAuditBand } from "@/components/ui/BookAuditCTA";
import { BOOKING_URL } from "@/lib/constants";
import { fadeUp, staggerContainer, fadeUpItem } from "@/lib/motion";

const systems = [
  {
    id: "lead-capture",
    name: "Lead Capture & Booking",
    icon: MessageSquare,
    description: "Every website inquiry gets answered and booked, day or night.",
    features: [
      "Instant AI response to every website inquiry, day or night",
      "Automatic lead qualification before it reaches your inbox",
      "Direct calendar booking, no back-and-forth scheduling",
      "Follow-up reminder sent automatically if a lead goes cold",
    ],
  },
  {
    id: "follow-up-reviews",
    name: "Follow-Up & Reviews",
    icon: Star,
    description: "Turns one-time customers into repeat customers and reviews.",
    features: [
      "Automated post-purchase or post-service follow-up (email/SMS)",
      "Google review requests sent at the right moment",
      "Simple re-engagement sequence for past customers",
      "Monthly summary of response and review rates",
    ],
  },
  {
    id: "back-office-sync",
    name: "Back-Office Sync",
    icon: Cable,
    description: "Your CRM, invoicing, and inbox, kept in sync automatically.",
    features: [
      "Connects your CRM, invoicing tool, and inbox",
      "New leads and orders sync automatically, no double entry",
      "Real-time notification when something needs your attention",
      "Built on the same API integration approach as our custom projects",
    ],
  },
];

export default function AutomationPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <PageHeader
        icon={Bot}
        eyebrow="Workflow Automation"
        accent="emerald"
        title={
          <>
            Automation that <span className="text-emerald-600 dark:text-emerald-400">scales.</span>
          </>
        }
        subtitle="Three standardized workflow systems that handle the busywork: leads, follow-up, and back-office data entry, so nothing falls through the cracks. Get any one, or unlock all three as your automation ecosystem."
      />

      {/* Individual systems */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-40px" }}
        variants={staggerContainer}
      >
        {systems.map((s) => (
          <motion.div key={s.id} variants={fadeUpItem}>
            <PricingTierCard
              name={s.name}
              description={s.description}
              price="$999"
              priceLabel="Setup Fee"
              monthly="$69/mo"
              features={s.features}
              ctaLabel="Book a Call"
              ctaHref={BOOKING_URL}
              ctaAnalyticsId={`automation-${s.id}-cta`}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Bundle */}
      <motion.div {...fadeUp} className="mb-20">
        <PricingTierCard
          name="Full Ecosystem Access"
          description="All three systems, working together as one connected setup."
          price="$1,999"
          priceLabel="Setup Fee"
          monthly="$99/mo"
          badge={{ label: "Best Value", tone: "amber" }}
          highlighted
          features={[
            "All three systems: Lead Capture & Booking, Follow-Up & Reviews, and Back-Office Sync",
            "Priority support and faster turnaround on changes",
            "First access to new automation modules as we build them",
            "One monthly bill instead of three separate ones",
          ]}
          ctaLabel="Book a Call"
          ctaHref={BOOKING_URL}
          ctaAnalyticsId="automation-bundle-cta"
        />
      </motion.div>

      {/* What's included in every system */}
      <motion.div
        {...fadeUp}
        className="rounded-3xl bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/5 p-6 md:p-8 mb-16 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="text-emerald-600 dark:text-emerald-400" size={20} />
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Built the same way as our custom projects
          </h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
          These systems aren&apos;t off-the-shelf templates. They&apos;re built on the same API integrations and AI
          logic we use for larger custom automation work, just standardized into a fixed price. The $69 or $99
          monthly fee covers hosting, monitoring, and keeping the integrations working as your tools update. Need something more
          specific to your business? That&apos;s still available as a custom project, so book a call and we&apos;ll
          talk through what makes sense.
        </p>
      </motion.div>

      <BookAuditBand analyticsId="automation-bottom-book-audit" />
    </div>
  );
}
