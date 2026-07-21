import { Link } from "wouter";
import { ArrowRight, Check } from "lucide-react";

const exploreLinks = [
  { label: "Start Here", href: "/start-here" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Workflow Insights", href: "/insights/what-to-automate-first" },
  { label: "When AI Is Not the Answer", href: "/insights/when-ai-is-not-the-answer" },
  { label: "About Barrana", href: "/about" },
];

const workflowLinks = [
  { label: "Lead Intake", href: "/workflows/lead-intake" },
  { label: "Appointment Booking", href: "/workflows/appointment-booking" },
  { label: "Client Onboarding", href: "/workflows/client-onboarding" },
  { label: "Document Collection", href: "/workflows/document-collection" },
  { label: "Human Oversight", href: "/human-in-the-loop-ai" },
  { label: "Governance", href: "/governance" },
];

export default function Footer() {
  return (
    <footer className="bg-[#09142F] text-white">
      <div className="container py-14 lg:py-16">
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.25fr_0.75fr_0.75fr]">
          <div className="max-w-xl">
            <img src="/barrana-logo-white.png" alt="Barrana.ai" width="210" height="44" className="h-11 w-auto" />
            <p className="mt-6 text-sm leading-7 text-slate-300">
              Barrana is a Canadian AI automation company founded by Ikram Rana. We connect the tools your business already uses, so routine work gets done without someone remembering every step, copying every detail, or chasing every follow-up.
            </p>
            <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9BE5DD]">A controlled starting point</p>
              <p className="mt-3 text-lg font-bold">Bring one repeated workflow.</p>
              <Link href="/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-white hover:text-[#9BE5DD]">
                Find the Workflow AI Should Fix First
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div>
            <h2 className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Explore</h2>
            <ul className="mt-5 space-y-3">
              {exploreLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-slate-300 transition hover:text-white">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Workflow Guides</h2>
            <ul className="mt-5 space-y-3">
              {workflowLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-slate-300 transition hover:text-white">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-6 py-8 md:grid-cols-3">
          {[
            "Workflow before software",
            "Human decision paths stay visible",
            "Routine actions leave a record",
          ].map((principle) => (
            <div key={principle} className="flex items-center gap-3 text-xs text-slate-400">
              <Check size={14} className="shrink-0 text-[#74D4CA]" aria-hidden="true" />
              {principle}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Barrana.ai. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/governance" className="transition hover:text-slate-300">Privacy and Governance</Link>
            <Link href="/contact" className="transition hover:text-slate-300">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
