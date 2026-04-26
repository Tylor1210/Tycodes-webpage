import { Link } from "react-router-dom";
import { Bot, Share2, ArrowLeft, Youtube, Twitch, Video, Mail } from "lucide-react";

export default function BrandPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-[11px] font-bold uppercase tracking-widest mb-10">
        <ArrowLeft size={14} /> Back to Home
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-600/15 p-3 rounded-xl">
          <Bot className="text-blue-500" size={22} />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500/80">Auto-Growth</span>
      </div>

      <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight mb-4">
        Automated Brand <span className="text-blue-500">Infrastructure.</span>
      </h1>

      <p className="text-slate-400 text-base leading-relaxed mb-10 max-w-xl">
        Stop spending hours on content. We build autonomous content pipelines that keep your brand active across every platform while you focus on running your business.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { icon: Video, label: "Instagram", body: "Short-form clip repurposing from long-form content. Auto-posted." },
          { icon: Youtube, label: "YouTube", body: "Automated upload scheduling, thumbnail generation, and description SEO." },
          { icon: Twitch, label: "Twitch", body: "Stream alerts, clip archiving, and highlight reel automation." }
        ].map(({ icon: Icon, label, body }) => (
          <div key={label} className="rounded-2xl bg-[#0a0a0a] border border-white/10 p-5 hover:border-blue-600/30 transition-all">
            <div className="bg-blue-600/10 p-2 rounded-lg w-fit mb-3">
              <Icon size={14} className="text-blue-500" />
            </div>
            <h3 className="text-sm font-bold mb-1">{label}</h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl bg-[#0a0a0a] border border-white/10 p-8 mb-10">
        <div className="flex items-center gap-3 mb-4">
          <Share2 size={18} className="text-blue-500" />
          <h2 className="text-xl font-bold tracking-tighter">How it works</h2>
        </div>
        <ol className="space-y-4">
          {[
            "We audit your current content workflow and identify automation opportunities.",
            "Custom pipelines are built using Python + AI to generate, schedule, and post.",
            "You approve. The system runs. You collect the analytics.",
          ].map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="text-blue-500 font-black text-lg font-mono leading-none mt-0.5">{i + 1}</span>
              <p className="text-sm text-slate-400 leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
      </div>

      <a
        href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ39ZxoVryKgnZLG_aJ5RfWwq30dGRspuOFH18-mxuwWiBaATCpOY1wk1TFNkOy-8Vy1mt0kyT2N?gv=true"
        target="_blank"
        rel="noopener noreferrer"
        data-analytics-id="brand-start-automating"
        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-[11px] px-8 py-4 rounded-2xl transition-all hover:scale-105 shadow-lg shadow-blue-600/20 cursor-pointer"
      >
        <Mail size={14} />
        Start Automating
      </a>
    </div>
  );
}
