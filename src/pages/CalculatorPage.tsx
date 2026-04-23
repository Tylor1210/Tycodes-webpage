import SavingsCalculator from "../components/SavingsCalculator";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function CalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 h-screen flex flex-col">
      <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-[11px] font-bold uppercase tracking-widest mb-10">
        <ArrowLeft size={14} /> Back to Home
      </Link>
      <div className="flex-1">
        <SavingsCalculator />
      </div>
    </div>
  );
}
