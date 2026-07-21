import { Link } from "wouter";
import {
  ArrowRight,
  Check,
  ClipboardList,
  FileCheck2,
  MessagesSquare,
  RefreshCw,
  Route,
  ShieldCheck,
  UserCheck,
  Workflow,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";

const workflowSignals = [
  { label: "Signal", value: "A new request arrives", state: "captured" },
  { label: "Decision", value: "Is the information complete?", state: "checked" },
  { label: "Action", value: "Route, update, and follow up", state: "assigned" },
  { label: "Record", value: "Write the result to the right tool", state: "logged" },
  { label: "Escalation", value: "Send exceptions to a person", state: "human" },
];

const frictionPatterns = [
  {
    icon: MessagesSquare,
    title: "Requests wait in an inbox",
    copy: "Leads, client questions, and internal requests arrive faster than someone can sort and assign them.",
  },
  {
    icon: RefreshCw,
    title: "Information gets copied twice",
    copy: "The same details move between forms, email, spreadsheets, and your CRM by hand.",
  },
  {
    icon: ClipboardList,
    title: "Follow-up depends on memory",
    copy: "Work advances only when someone remembers the next message, document, approval, or reminder.",
  },
  {
    icon: FileCheck2,
    title: "Status is hard to see",
    copy: "People ask for updates because the current owner, next step, and exception are not visible in one place.",
  },
];

const method = [
  {
    number: "01",
    title: "Map the work",
    copy: "Trace the request from arrival to completion, including the tools, decisions, owners, and exceptions.",
  },
  {
    number: "02",
    title: "Choose the constraint",
    copy: "Identify the repeatable handoff creating delay, rework, or avoidable coordination.",
  },
  {
    number: "03",
    title: "Design the control",
    copy: "Define what the system can do, what it must record, and when a person needs to decide.",
  },
  {
    number: "04",
    title: "Implement and observe",
    copy: "Connect the existing tools, test real exceptions, and monitor the workflow before expanding it.",
  },
];

const scenarios = [
  {
    title: "Lead intake",
    path: "Form received → details checked → owner assigned → response prepared",
    boundary: "A person handles ambiguous requests and confirms the next commitment.",
  },
  {
    title: "Document collection",
    path: "Requirement created → request sent → receipt logged → missing item flagged",
    boundary: "A person reviews sensitive, unusual, or incomplete submissions.",
  },
  {
    title: "Operations reporting",
    path: "Source updated → data gathered → exceptions marked → summary delivered",
    boundary: "A person interprets the result and decides what action to take.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <SEOHead
        title="Barrana.ai | Workflow-First AI Automation"
        description="Barrana connects the tools your business already uses so routine work gets done with clear controls, records, and human oversight."
      />

      <section className="relative overflow-hidden bg-[#09142F] text-white">
        <div
          className="absolute inset-0 opacity-40"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(117,135,209,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(117,135,209,0.12) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="absolute -right-28 top-20 h-96 w-96 rounded-full bg-[#7E0F4A]/25 blur-3xl" aria-hidden="true" />
        <div className="container relative grid gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-28">
          <div className="max-w-3xl">
            <div className="mb-7 flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9BAAE8]">
              <span className="h-px w-9 bg-[#9BAAE8]" />
              Workflow-first AI automation
            </div>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.04] tracking-[-0.04em] sm:text-5xl lg:text-7xl">
              Find the workflow AI should fix first.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              Barrana is a Canadian AI automation company founded by Ikram Rana. We connect the tools your business already uses, so routine work gets done without someone remembering every step, copying every detail, or chasing every follow-up.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-[#172865] transition hover:bg-[#E8ECFF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                Find the Workflow AI Should Fix First
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link href="/insights/when-ai-is-not-the-answer" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/5">
                See when AI is not the answer
              </Link>
            </div>
            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300" aria-label="Approach principles">
              {[
                "Start with one constraint",
                "Keep a human decision path",
                "Use the tools already in place",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check size={14} className="text-[#74D4CA]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="rounded-2xl border border-white/15 bg-[#111E43]/90 p-4 shadow-2xl shadow-black/30 sm:p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#74D4CA]">Operational decision ledger</p>
                  <p className="mt-1 text-sm font-semibold text-white">Example workflow pattern</p>
                </div>
                <span className="rounded-full border border-[#74D4CA]/30 bg-[#74D4CA]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[#9BE5DD]">
                  observed
                </span>
              </div>
              <ol className="mt-4 space-y-2">
                {workflowSignals.map((item, index) => (
                  <li key={item.label} className="grid grid-cols-[2rem_1fr_auto] items-center gap-3 rounded-xl border border-white/8 bg-white/[0.035] p-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/8 font-mono text-xs text-[#9BAAE8]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
                      <p className="mt-0.5 text-sm text-slate-100">{item.value}</p>
                    </div>
                    <span className={`hidden rounded-md px-2 py-1 font-mono text-[9px] uppercase sm:block ${item.state === "human" ? "bg-[#7E0F4A]/30 text-[#F4B8D7]" : "bg-[#283891]/50 text-[#BEC8F1]"}`}>
                      {item.state}
                    </span>
                  </li>
                ))}
              </ol>
              <div className="mt-4 flex items-center gap-3 rounded-xl bg-[#74D4CA]/8 p-3 text-xs leading-5 text-[#BFECE7]">
                <UserCheck size={18} className="shrink-0" aria-hidden="true" />
                The workflow records routine actions and sends exceptions to the person who owns the decision.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-[#F7F8FC]" aria-label="How Barrana approaches automation">
        <div className="container grid divide-y divide-slate-200 md:grid-cols-3 md:divide-x md:divide-y-0">
          {[
            ["01", "Workflow before software", "Define the work before choosing the automation."],
            ["02", "Control before scale", "Set records, ownership, and exception paths first."],
            ["03", "Evidence before expansion", "Observe the first workflow before adding another."],
          ].map(([number, title, copy]) => (
            <div key={number} className="py-6 md:px-8 first:md:pl-0 last:md:pr-0">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7E0F4A]">Principle {number}</p>
              <p className="mt-2 font-bold text-[#15214A]">{title}</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7E0F4A]">Where to look first</p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#111A36] lg:text-4xl">The useful starting point is usually a handoff.</h2>
              <p className="mt-5 text-base leading-7 text-slate-600">
                AI is not the strategy by itself. The opportunity is the repeated moment where information arrives, someone checks it, a tool needs updating, and the next person needs a clear signal.
              </p>
              <Link href="/insights/what-to-automate-first" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#283891] hover:text-[#7E0F4A]">
                Learn what to automate first <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {frictionPatterns.map(({ icon: Icon, title, copy }) => (
                <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/[0.03]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF1FF] text-[#283891]">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-bold text-[#111A36]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F4F5FA] py-20 lg:py-24">
        <div className="container">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7E0F4A]">The Barrana method</p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#111A36] lg:text-4xl">A controlled path from operational friction to working system.</h2>
          </div>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 lg:grid-cols-4">
            {method.map((step) => (
              <li key={step.number} className="bg-white p-7">
                <p className="font-mono text-xs font-semibold text-[#7E0F4A]">{step.number}</p>
                <h3 className="mt-8 text-lg font-bold text-[#111A36]">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{step.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7E0F4A]">Workflow patterns</p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#111A36] lg:text-4xl">Make the path and the human boundary visible.</h2>
            </div>
            <p className="rounded-full bg-[#F3E6ED] px-4 py-2 text-xs font-semibold text-[#7E0F4A]">Illustrative scenarios, not client results.</p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {scenarios.map((scenario) => (
              <article key={scenario.title} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-[#111A36]">{scenario.title}</h3>
                  <Route size={18} className="text-[#283891]" aria-hidden="true" />
                </div>
                <p className="mt-5 rounded-xl bg-[#F6F7FB] p-4 font-mono text-xs leading-6 text-[#283891]">{scenario.path}</p>
                <div className="mt-5 flex items-start gap-3 border-t border-slate-100 pt-5">
                  <ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#7E0F4A]" aria-hidden="true" />
                  <p className="text-sm leading-6 text-slate-600">{scenario.boundary}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#13245C] py-16 text-white lg:py-20">
        <div className="container grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-[#9BE5DD]">
              <Workflow size={20} aria-hidden="true" />
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em]">Start with the workflow, not the tool</p>
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight lg:text-4xl">Bring one repeated workflow. We will determine whether it is ready for automation.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-blue-100">
              The initial conversation is for fit and scope. It is not a promise of a free strategy, solution design, implementation plan, or price quote.
            </p>
          </div>
          <Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-[#172865] transition hover:bg-[#E8ECFF]">
            Find the Workflow AI Should Fix First
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
