import SavingsCalculator from "../components/SavingsCalculator";
import PageHeader from "@/components/ui/PageHeader";
import { BookAuditBand } from "@/components/ui/BookAuditCTA";
import { Calculator } from "lucide-react";

export default function CalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <PageHeader
        icon={Calculator}
        eyebrow="Platform Tax Savings"
        accent="indigo"
        title="Calculate your platform tax."
        subtitle="See how much you're losing to subscription fees and gateway penalties — and what switching to a custom stack would save you."
      />
      <div className="h-[70vh] min-h-[560px] max-h-[820px]">
        <SavingsCalculator />
      </div>
      <BookAuditBand analyticsId="calculator-bottom-book-audit" />
    </div>
  );
}
