import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import AuditForm from "./AuditForm";

export default function HeroTile() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="md:col-span-2 md:row-span-2"
    >
      <Card className="h-full border-blue-500/20 bg-slate-900/50 backdrop-blur-md overflow-hidden">
        <CardHeader>
          <div className="flex items-center gap-2 text-blue-400 mb-2">
            <Sparkles size={16} />
            <span className="text-xs font-bold uppercase tracking-widest italic">Florida Tech Partner</span>
          </div>
          <CardTitle className="text-4xl font-extrabold text-white">
            Automation that <span className="text-blue-500 underline decoration-2">scales</span>.
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-400 mb-6 max-w-sm">
            Stop wasting hours on manual data entry. Get custom Python & AI workflows for your specific business needs.
          </p>

          <Sheet>
            <SheetTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 rounded-full px-10 py-6 text-lg shadow-lg shadow-blue-500/20">
                Get Your Free Audit
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-slate-950 border-slate-800 w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle className="text-2xl text-white">Workflow Audit</SheetTitle>
                <SheetDescription className="text-slate-400">
                  I'll analyze your current stack and find 3 things we can automate this week.
                </SheetDescription>
              </SheetHeader>
              <AuditForm />
            </SheetContent>
          </Sheet>
        </CardContent>
      </Card>
    </motion.div>
  );
}