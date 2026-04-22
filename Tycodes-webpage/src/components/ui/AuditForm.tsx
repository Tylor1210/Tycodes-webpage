import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AuditForm() {
  return (
    <form className="space-y-6 mt-8" onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-slate-200">Business Email</Label>
        <Input id="email" type="email" placeholder="tylor@tycodes.dev" className="bg-slate-900 border-slate-700 text-white" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bottleneck" className="text-slate-200">What is your biggest manual bottleneck?</Label>
        <Textarea id="bottleneck" placeholder="e.g. I spend 2 hours a day moving data from Gmail to Sheets..." className="bg-slate-900 border-slate-700 text-white min-h-[100px]" />
      </div>
      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 text-lg">
        Get My Free Audit
      </Button>
      <p className="text-[10px] text-center text-slate-500 uppercase tracking-widest">
        Secure Automation • TYcodes LLC
      </p>
    </form>
  );
}