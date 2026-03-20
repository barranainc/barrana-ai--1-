/*
 * Home.tsx — Barrana.ai Homepage (v2)
 * Brand Colors (OFFICIAL):
 *   Navy:    #283891  (primary — nav, headings, CTAs, dark sections)
 *   Magenta: #7E0F4A  (accent — underlines, highlights, badges, hover)
 *   Grey:    #7B7B7B  (body text, secondary labels)
 *
 * Rewritten with 10 animated diagram components, 3 new sections,
 * JSON-LD schema, and full prefers-reduced-motion support.
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, Search } from "lucide-react";

// Schema
import JsonLd from "@/components/JsonLd";

// New diagram components
import HeroSystemVisual from "@/components/diagrams/HeroSystemVisual";
import TrustBadges from "@/components/diagrams/TrustBadges";
import ObjectionCards from "@/components/diagrams/ObjectionCards";
import CostOfInaction from "@/components/diagrams/CostOfInaction";
import BeforeAfterComparison from "@/components/diagrams/BeforeAfterComparison";
import MethodTimeline from "@/components/diagrams/MethodTimeline";
import WorkflowDiagram, { WorkflowStep } from "@/components/diagrams/WorkflowDiagram";
import CaseStudyDashboard from "@/components/diagrams/CaseStudyDashboard";
import IndustryCards from "@/components/diagrams/IndustryCards";
import SocialProofToast from "@/components/diagrams/SocialProofToast";

// UI components
import FAQAccordion, { FAQItem } from "@/components/ui/FAQAccordion";

// Brand color constants
const NAVY    = "#283891";
const MAGENTA = "#7E0F4A";
const GREY    = "#7B7B7B";
const DARK    = "#1A1A2E";
const OFFWHITE = "#F5F6FA";
const BORDER  = "#E2E4ED";

// ─── Scroll reveal hook ───────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Section reveal wrapper ───────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const { ref, visible } = useReveal(0.12);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Workflow tab data ────────────────────────────────────────────────
const workflowTabs: {
  id: string;
  label: string;
  steps: WorkflowStep[];
  badge: string;
  description: string;
}[] = [
  {
    id: "immigration",
    label: "Immigration",
    steps: [
      { label: "Inquiry Arrives",   type: "trigger" },
      { label: "AI Qualifies (90s)",type: "ai"      },
      { label: "Categorize Visa",   type: "ai"      },
      { label: "CRM Record",        type: "action"  },
      { label: "Assign Consultant", type: "action"  },
      { label: "Send Checklist",    type: "action"  },
      { label: "Book Consultation", type: "outcome" },
    ],
    badge: "Intake: 45 min → 5 min",
    description:
      "Every inquiry — web form, email, or phone — is captured, categorized by visa type, logged in your CRM, and assigned to the right consultant with a document checklist sent automatically. No manual sorting. No missed inquiries.",
  },
  {
    id: "contractor",
    label: "Contractors",
    steps: [
      { label: "After-Hours Call",  type: "trigger" },
      { label: "AI Responds",       type: "ai"      },
      { label: "Qualifies Job",     type: "ai"      },
      { label: "CRM Record",        type: "action"  },
      { label: "Schedule Estimate", type: "action"  },
      { label: "Estimate Booked",   type: "outcome" },
    ],
    badge: "Zero missed leads",
    description:
      "Inquiries at 11pm get responded to in 90 seconds. The AI qualifies the job, logs it, and books the estimate — before your competitor's voicemail even picks up.",
  },
  {
    id: "accounting",
    label: "Accounting",
    steps: [
      { label: "Season Opens",       type: "trigger" },
      { label: "Doc Request Sent",   type: "action"  },
      { label: "Reminder System",    type: "ai"      },
      { label: "Files Tracked",      type: "action"  },
      { label: "Review Ready",       type: "action"  },
      { label: "Client Complete",    type: "outcome" },
    ],
    badge: "Chase time eliminated. Capacity +30%",
    description:
      "Automated document requests go out on day one of tax season. The system tracks what's received, sends intelligent follow-ups, and flags incomplete files. Your staff reviews work, not chasing paper.",
  },
  {
    id: "clinic",
    label: "Medical Clinics",
    steps: [
      { label: "Waitlist Entry",    type: "trigger" },
      { label: "Slot Opens",        type: "trigger" },
      { label: "AI Matches + Texts",type: "ai"      },
      { label: "Patient Confirms",  type: "action"  },
      { label: "Reminder Sent",     type: "action"  },
      { label: "Appointment Kept",  type: "outcome" },
    ],
    badge: "No-shows down 25–40%",
    description:
      "When a slot opens, the system matches it to the highest-priority waitlist patient, sends a text, books the confirmation, and sends a reminder 24 hours before. No staff intervention required.",
  },
  {
    id: "law",
    label: "Law Firms",
    steps: [
      { label: "Inquiry Arrives",  type: "trigger" },
      { label: "AI Screens",       type: "ai"      },
      { label: "Conflict Check",   type: "action"  },
      { label: "Assign Attorney",  type: "action"  },
      { label: "Intake Form Sent", type: "action"  },
      { label: "Retained",         type: "outcome" },
    ],
    badge: "Every inquiry captured",
    description:
      "Every call, form, and email is captured and screened. Conflict checks run automatically. Qualified leads are assigned and receive intake forms before they've talked to anyone. No leads fall through.",
  },
];

// ─── FAQ data ─────────────────────────────────────────────────────────
const faqItems: FAQItem[] = [
  {
    question: "How much does AI automation cost?",
    answer:
      "A single workflow automation typically costs $1,500–$4,000 CAD. Multi-system implementations range from $5,000–$15,000 CAD depending on scope. Pricing is always fixed — agreed after the free audit, before any work begins. No hourly billing. No scope creep invoices.",
  },
  {
    question: "How long until I see results?",
    answer:
      "The first automation is typically live within 2–3 weeks of the audit. Most clients see measurable improvement in lead response time, intake speed, or admin hours within the first 30 days. The free audit identifies which workflow delivers the fastest return.",
  },
  {
    question: "Do I need to replace my current software?",
    answer:
      "No. We build automation on top of the tools you already use — your CRM, calendar, email platform, and accounting system. Your team keeps working exactly how they work today. We add a coordination layer that connects those tools automatically.",
  },
  {
    question: "Will this replace my employees?",
    answer:
      "No. Automation handles coordination work: data entry, follow-up messages, reminders, document routing, and status updates. Your staff handles judgment, professional expertise, and client relationships — the work that actually requires a person. Most clients find their team has more time for billable work, not less.",
  },
  {
    question: "Is my client data secure?",
    answer:
      "Yes. All implementations are PIPEDA-aware. Client data stays within your existing systems — we do not move data to new platforms or third-party services without your explicit approval. We document every data flow in the system design phase before build begins.",
  },
  {
    question: "What if something breaks?",
    answer:
      "Every system is built with error handling, failure alerts, retry logic, and human escalation paths. If an automation encounters an exception, it fails safely and notifies the right person rather than silently dropping a task. Nothing in your operations fails without someone knowing about it.",
  },
  {
    question: "What happens in the free audit?",
    answer:
      "The audit is a 60-minute working session — not a sales call. We map your current workflows, identify the highest-friction manual tasks, calculate the time and revenue cost, and produce a prioritized automation roadmap. You receive the workflow map, friction analysis, and ROI projection to keep, regardless of whether you engage us.",
  },
  {
    question: "What if automation is not right for my business?",
    answer:
      "We will tell you honestly. The audit exists specifically to make that determination. If your operation is too small, too inconsistent, or does not yet have the workflow volume to justify automation investment, we will say so clearly and tell you what needs to be in place first.",
  },
];

// ─── Problems list ────────────────────────────────────────────────────
const problemsList = [
  {
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Leads Going Cold",
    desc: "A prospect inquires at 6pm. Your team sees it at 9am. By then, they have booked with the first business that responded. You never even knew you lost them.",
  },
  {
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    title: "Staff Buried in Coordination",
    desc: "Your team spends 2–3 hours per day copying data between systems, sending reminders, and chasing documents. That is 15+ hours per week of zero-revenue work.",
  },
  {
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    title: "Invisible Operations",
    desc: "You cannot tell which files are complete, which invoices are overdue, or who is overloaded. You discover dropped tasks when the client complains.",
  },
  {
    icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
    title: "Calls Falling Through",
    desc: "Phone goes to voicemail during busy hours. Instagram DMs sit for days. Website forms get answered tomorrow. No single system captures everything.",
  },
  {
    icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
    title: "Cash Flow Delayed",
    desc: "Invoices go out 2 weeks late. Payment reminders depend on someone remembering. Cash flow problems caused by inconsistent billing, not bad clients.",
  },
  {
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    title: "Growth Blocked",
    desc: "Your team is good at their work. But 40% of their time goes to admin instead of clients. You cannot grow without more people or fewer manual tasks.",
  },
];

// ─── LocalBusiness schema ─────────────────────────────────────────────
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Barrana.ai",
  description:
    "AI automation consultancy for small businesses. We build systems that respond to leads in 90 seconds, recover 15+ staff hours per week, and increase operational capacity by 30%.",
  url: "https://barrana.ai",
  telephone: "+1-647-367-6771",
  email: "help@barrana.ai",
  address: {
    "@type": "PostalAddress",
    streetAddress: "50 Corstate Avenue, Unit 01",
    addressLocality: "Vaughan",
    addressRegion: "Ontario",
    postalCode: "L4K 4X2",
    addressCountry: "CA",
  },
  areaServed: [
    "Toronto", "Vaughan", "Markham", "Richmond Hill", "Mississauga", "North York",
  ],
  serviceType: "AI Automation Consulting",
  sameAs: [
    "https://linkedin.com/company/barrana-ai",
    "https://instagram.com/barrana.ai",
    "https://tiktok.com/@barrana.ai",
    "https://facebook.com/barranaai",
  ],
};

// ─── Component ────────────────────────────────────────────────────────
export default function Home() {
  const heroReveal       = useReveal(0.01);
  const problemsReveal   = useReveal(0.1);
  const solutionReveal   = useReveal(0.1);
  const methodReveal     = useReveal(0.1);
  const workflowReveal   = useReveal(0.1);
  const casesReveal      = useReveal(0.1);
  const industriesReveal = useReveal(0.1);
  const faqReveal        = useReveal(0.1);
  const ctaReveal        = useReveal(0.15);

  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      {/* ─── JSON-LD: LocalBusiness ─── */}
      <JsonLd data={localBusinessSchema} />

      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section className="hero-home">
        <div className="container">
          <div
            ref={heroReveal.ref}
            className="grid lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-start"
            style={{ paddingTop: "4rem", paddingBottom: "4rem" }}
          >
            {/* Left: copy */}
            <div>
              <div
                className="eyebrow"
                style={{
                  opacity: heroReveal.visible ? 1 : 0,
                  transform: heroReveal.visible ? "translateY(0)" : "translateY(12px)",
                  transition: "opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s",
                }}
              >
                AI Automation for Toronto Businesses
              </div>

              <h1
                style={{
                  color: DARK,
                  marginBottom: "1.25rem",
                  opacity: heroReveal.visible ? 1 : 0,
                  transform: heroReveal.visible ? "translateY(0)" : "translateY(16px)",
                  transition: "opacity 0.65s ease 0.2s, transform 0.65s cubic-bezier(0.16,1,0.3,1) 0.2s",
                }}
              >
                Respond to Every Lead in 90 Seconds.{" "}
                <span style={{ position: "relative", display: "inline-block" }}>
                  Recover 15+ Hours
                  <span style={{
                    position: "absolute", bottom: "2px", left: 0, right: 0,
                    height: "3px", background: MAGENTA, borderRadius: "2px",
                    transformOrigin: "left",
                    transform: heroReveal.visible ? "scaleX(1)" : "scaleX(0)",
                    transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.8s",
                  }} />
                </span>{" "}
                of Admin Per Week.{" "}
                <span style={{ color: NAVY }}>Grow Without Hiring.</span>
              </h1>

              <p
                style={{
                  fontSize: "1.125rem",
                  color: GREY,
                  marginBottom: "1rem",
                  lineHeight: 1.7,
                  maxWidth: "52ch",
                  opacity: heroReveal.visible ? 1 : 0,
                  transform: heroReveal.visible ? "translateY(0)" : "translateY(12px)",
                  transition: "opacity 0.65s ease 0.4s, transform 0.65s ease 0.4s",
                }}
              >
                Barrana.ai builds AI automation systems that run your operations while your team does the work that actually generates revenue. Not tools. Not chatbots. Working systems with governance built in.
              </p>

              <p
                style={{
                  fontSize: "0.9375rem",
                  color: GREY,
                  marginBottom: "2rem",
                  lineHeight: 1.7,
                  maxWidth: "52ch",
                  opacity: heroReveal.visible ? 1 : 0,
                  transition: "opacity 0.65s ease 0.5s",
                }}
              >
                Right now, your business is losing leads to 4-hour response times, burning staff hours on manual data entry, and sending invoices weeks late because someone forgot. Each of these problems has a systematic fix that works inside your existing tools, requires no technical knowledge from your team, and pays for itself within 30 to 90 days.
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "1rem",
                  alignItems: "flex-start",
                  opacity: heroReveal.visible ? 1 : 0,
                  transform: heroReveal.visible ? "translateY(0)" : "translateY(12px)",
                  transition: "opacity 0.65s ease 0.6s, transform 0.65s ease 0.6s",
                }}
              >
                <div>
                  <Link href="/contact" className="btn-primary">
                    Get Your Free 60-Minute Automation Audit
                    <ArrowRight size={16} />
                  </Link>
                  <p style={{ fontSize: "0.8125rem", color: GREY, marginTop: "0.5rem", paddingLeft: "0.25rem" }}>
                    Walk away with a clear plan. No pitch. No obligation.
                  </p>
                </div>
                <a
                  href="#solution"
                  className="btn-secondary"
                  style={{ marginTop: "0" }}
                >
                  See How It Works
                  <ChevronDown size={16} />
                </a>
              </div>
            </div>

            {/* Right: system visual — sticky card so it sits snug against the headline */}
            <div style={{
              position: "sticky",
              top: "7rem",
              opacity: heroReveal.visible ? 1 : 0,
              transition: "opacity 0.8s ease 0.5s",
              background: "rgba(255,255,255,0.72)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(40,56,145,0.1)",
              borderRadius: "1.25rem",
              padding: "1.25rem 1.25rem 1rem",
              boxShadow: "0 4px 24px rgba(40,56,145,0.07)",
            }}>
              <HeroSystemVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST BADGES ─────────────────────────────────────────────── */}
      <section style={{ background: "white", borderBottom: `1px solid ${BORDER}` }}>
        <div className="container py-0">
          <TrustBadges />
        </div>
        <div style={{ textAlign: "center", padding: "0.875rem 1.5rem", fontSize: "0.8125rem", color: GREY, borderTop: `1px solid ${BORDER}`, background: OFFWHITE }}>
          Serving Toronto, Vaughan, Markham, Mississauga, Richmond Hill, and North York.{" "}
          <span style={{ color: NAVY, fontWeight: 600 }}>PIPEDA-aware implementations.</span>
        </div>
      </section>

      {/* ─── OBJECTION HANDLING (NEW) ─────────────────────────────────── */}
      <section style={{ background: OFFWHITE }} className="section-sm">
        <div className="container">
          <Reveal>
            <div className="eyebrow">Before You Scroll</div>
            <h2 style={{ color: DARK, marginBottom: "2.5rem", maxWidth: "40ch" }}>
              Three Things to Know Before You Scroll
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <ObjectionCards />
          </Reveal>
        </div>
      </section>

      {/* ─── COST OF INACTION (NEW) ───────────────────────────────────── */}
      <section style={{ background: "white" }} className="section-sm">
        <div className="container">
          <Reveal>
            <div className="eyebrow">The Real Cost</div>
            <div className="grid lg:grid-cols-2 gap-8 items-end mb-10">
              <h2 style={{ color: DARK }}>
                What Manual Operations Are Costing You Right Now
              </h2>
              <p style={{ color: GREY, lineHeight: 1.7 }}>
                The math most business owners have never done. These are not hypothetical — they are the documented costs of businesses operating without automation at current capacity.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <CostOfInaction />
          </Reveal>
          <Reveal delay={0.15}>
            <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
              <Link href="/contact" className="btn-primary">
                Get Your Free Automation Audit
                <ArrowRight size={16} />
              </Link>
              <p style={{ fontSize: "0.8125rem", color: GREY, marginTop: "0.5rem" }}>
                Find out exactly what automation would recover for your business.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── PROBLEMS ─────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28" style={{ background: OFFWHITE }}>
        <div className="container">
          <div
            ref={problemsReveal.ref}
            style={{
              opacity: problemsReveal.visible ? 1 : 0,
              transform: problemsReveal.visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <div className="eyebrow">Common Operational Problems</div>
            <div className="grid lg:grid-cols-2 gap-4 lg:gap-8 items-end mb-12">
              <h2 style={{ color: DARK }}>
                If Your Business Has a Team,<br />It Has These Problems
              </h2>
              <p style={{ color: GREY, lineHeight: 1.7 }}>
                These are not unique to your industry. They are symptoms of manual operations running at capacity.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-px rounded-2xl overflow-hidden" style={{ background: BORDER }}>
            {problemsList.map((p, i) => (
              <div
                key={p.title}
                className="bg-white p-7 group transition-colors"
                style={{
                  borderLeft: "4px solid var(--b-warning)",
                  borderTopLeftRadius: i === 0 ? "0.75rem" : 0,
                  opacity: problemsReveal.visible ? 1 : 0,
                  transform: problemsReveal.visible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.5s ease ${0.1 + i * 0.07}s, transform 0.5s ease ${0.1 + i * 0.07}s`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "var(--b-warning-bg)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "white";
                }}
              >
                <div style={{ width: "2.5rem", height: "2.5rem", marginBottom: "1rem", borderRadius: "0.5rem", background: "rgba(220,38,38,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--b-warning)" strokeWidth="1.75" style={{ width: "1.25rem", height: "1.25rem" }}>
                    <path d={p.icon} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: DARK, marginBottom: "0.625rem" }}>{p.title}</h3>
                <p style={{ fontSize: "0.9rem", color: GREY, lineHeight: 1.65 }}>{p.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
            <Reveal delay={0.2}>
              <Link href="/contact" className="btn-primary">
                Fix These Problems — Free Audit
                <ArrowRight size={16} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── SOLUTION / BEFORE–AFTER ──────────────────────────────────── */}
      <section id="solution" className="section" style={{ background: "white" }}>
        <div className="container">
          <div
            ref={solutionReveal.ref}
            style={{
              opacity: solutionReveal.visible ? 1 : 0,
              transform: solutionReveal.visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
              marginBottom: "2.5rem",
            }}
          >
            <div className="eyebrow">The Solution</div>
            <div className="grid lg:grid-cols-2 gap-6 items-end">
              <h2 style={{ color: DARK }}>
                We Build Systems That Do the Operational Work for You
              </h2>
              <p style={{ color: GREY, lineHeight: 1.7 }}>
                Not software subscriptions. Not chatbot installs. Working automation systems built around your actual workflows — deployed, tested, and monitored.
              </p>
            </div>
          </div>

          <Reveal delay={0.1}>
            <BeforeAfterComparison />
          </Reveal>

          <Reveal delay={0.2}>
            <p style={{ marginTop: "2rem", textAlign: "center", fontSize: "0.9375rem", color: GREY, maxWidth: "60ch", margin: "2rem auto 0" }}>
              Your tools stay the same. What changes is the coordination layer between them. That layer is now automated, monitored, and reliable.
            </p>
            <div style={{ textAlign: "center", marginTop: "1.75rem" }}>
              <Link href="/contact" className="btn-primary">
                Book Your Free Audit
                <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── METHOD ───────────────────────────────────────────────────── */}
      <section className="section" style={{ background: OFFWHITE }}>
        <div className="container">
          <div
            ref={methodReveal.ref}
            style={{
              opacity: methodReveal.visible ? 1 : 0,
              transform: methodReveal.visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
              marginBottom: "3rem",
            }}
          >
            <div className="eyebrow">The Process</div>
            <div className="grid lg:grid-cols-2 gap-6 items-end">
              <h2 style={{ color: DARK }}>
                How It Works: The Barrana Automation Method
              </h2>
              <p style={{ color: GREY, lineHeight: 1.7 }}>
                Five stages. Fixed pricing. Your first automation live in 2–3 weeks.
              </p>
            </div>
          </div>
          <Reveal delay={0.1}>
            <MethodTimeline />
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
              <Link href="/contact" className="btn-primary">
                Start with a Free Friction Mapping Session
                <ArrowRight size={16} />
              </Link>
              <p style={{ fontSize: "0.8125rem", color: GREY, marginTop: "0.5rem" }}>
                60 minutes. No pitch. Workflow map and ROI projection included.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── WORKFLOW TABS ────────────────────────────────────────────── */}
      <section className="section" style={{ background: "white" }}>
        <div className="container">
          <div
            ref={workflowReveal.ref}
            style={{
              opacity: workflowReveal.visible ? 1 : 0,
              transform: workflowReveal.visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
              marginBottom: "2.5rem",
            }}
          >
            <div className="eyebrow">Example Workflows</div>
            <div className="grid lg:grid-cols-2 gap-6 items-end">
              <h2 style={{ color: DARK }}>
                What Automation Looks Like in Practice
              </h2>
              <p style={{ color: GREY, lineHeight: 1.7 }}>
                Each workflow is built specifically for your business — not a template. These are the patterns we implement most often across five industries.
              </p>
            </div>
          </div>

          {/* Tab buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
            {workflowTabs.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(i)}
                style={{
                  padding: "0.5rem 1.25rem",
                  borderRadius: "2rem",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  border: `1.5px solid ${activeTab === i ? NAVY : BORDER}`,
                  background: activeTab === i ? NAVY : "white",
                  color: activeTab === i ? "white" : GREY,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active tab content */}
          <div style={{
            background: OFFWHITE,
            borderRadius: "0.875rem",
            padding: "1.5rem 1.75rem 1.75rem",
            border: `1px solid ${BORDER}`,
          }}>
            <WorkflowDiagram
              key={activeTab}
              steps={workflowTabs[activeTab].steps}
              resultBadge={workflowTabs[activeTab].badge}
            />
            <div style={{ marginTop: "1.75rem", paddingTop: "1.5rem", borderTop: `1px solid ${BORDER}` }}>
              <p style={{
                fontSize: "0.9375rem",
                color: GREY,
                lineHeight: 1.7,
                maxWidth: "72ch",
                margin: 0,
              }}>
                {workflowTabs[activeTab].description}
              </p>
            </div>
          </div>

          <Reveal delay={0.1}>
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <Link href="/services" className="btn-secondary">
                View All Services
                <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── CASE STUDIES ─────────────────────────────────────────────── */}
      <section className="section" style={{ background: OFFWHITE }}>
        <div className="container">
          <div
            ref={casesReveal.ref}
            style={{
              opacity: casesReveal.visible ? 1 : 0,
              transform: casesReveal.visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
              marginBottom: "2.5rem",
            }}
          >
            <div className="eyebrow">Results</div>
            <div className="grid lg:grid-cols-2 gap-6 items-end">
              <h2 style={{ color: DARK }}>
                Operational Results From Real Implementations
              </h2>
              <p style={{ color: GREY, lineHeight: 1.7 }}>
                Measured outcomes from deployed automation systems for service businesses across the GTA.
              </p>
            </div>
          </div>

          <CaseStudyDashboard />

          <Reveal delay={0.2}>
            <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
              <Link href="/contact" className="btn-primary">
                Get Your Free Audit
                <ArrowRight size={16} />
              </Link>
              <p style={{ fontSize: "0.8125rem", color: GREY, marginTop: "0.5rem" }}>
                Walk away with a clear plan — regardless of whether you engage us.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── INDUSTRIES ───────────────────────────────────────────────── */}
      <section className="section" style={{ background: "white" }}>
        <div className="container">
          <div
            ref={industriesReveal.ref}
            style={{
              opacity: industriesReveal.visible ? 1 : 0,
              transform: industriesReveal.visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
              marginBottom: "2.5rem",
            }}
          >
            <div className="eyebrow">Industries We Serve</div>
            <h2 style={{ color: DARK, maxWidth: "40ch" }}>
              Built for the Businesses That Need It Most
            </h2>
          </div>
          <IndustryCards />
        </div>
      </section>

      {/* ─── AEO DIRECT ANSWER BLOCK ──────────────────────────────────── */}
      <section style={{ background: OFFWHITE }} className="section-sm">
        <div className="container">
          <Reveal>
            <div className="aeo-block" style={{ maxWidth: "72ch" }}>
              <div className="aeo-label">
                <Search size={12} />
                Quick Answer
              </div>
              <h3>What is AI automation for small business?</h3>
              <p>
                AI automation for small business uses software to perform rule-based operational tasks without manual effort: responding to leads, qualifying inquiries, creating CRM records, collecting documents, scheduling appointments, generating invoices, and sending follow-up communications. The AI component adds language understanding, enabling systems to categorize inquiries, personalize responses, and extract information from unstructured inputs. The goal is to automate the coordination layer of business operations so teams focus on work that requires professional judgment and client relationships.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────────── */}
      <section className="section" style={{ background: "white" }}>
        <div className="container">
          <div
            ref={faqReveal.ref}
            style={{
              opacity: faqReveal.visible ? 1 : 0,
              transform: faqReveal.visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <div className="eyebrow">FAQ</div>
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
              <div>
                <h2 style={{ color: DARK, marginBottom: "0.75rem" }}>
                  Common Questions
                </h2>
                <p style={{ color: GREY, lineHeight: 1.7, marginBottom: "1.5rem" }}>
                  Everything you need to know before booking an audit.
                </p>
                <Link href="/contact" className="btn-primary" style={{ display: "inline-flex" }}>
                  Book Your Free Audit
                  <ArrowRight size={16} />
                </Link>
              </div>
              <FAQAccordion items={faqItems} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────────────── */}
      <section className="cta-section section">
        <div className="container">
          <div
            ref={ctaReveal.ref}
            style={{
              opacity: ctaReveal.visible ? 1 : 0,
              transform: ctaReveal.visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
              textAlign: "center",
              maxWidth: "56ch",
              margin: "0 auto",
            }}
          >
            <div className="eyebrow" style={{ color: "rgba(255,255,255,0.6)", justifyContent: "center" }}>
              <span style={{ background: "rgba(255,255,255,0.15)" }} />
              Ready to Start
            </div>
            <h2 style={{ color: "white", marginBottom: "1rem" }}>
              Your Operations Will Not Fix Themselves. The Audit Takes 60 Minutes.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: "2.5rem" }}>
              Every week you wait, your business loses leads to slow response, burns staff hours on admin, and delays revenue through inconsistent processes.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center", alignItems: "flex-start" }}>
              <div>
                <Link href="/contact" className="btn-primary" style={{ background: "white", color: NAVY }}>
                  Get Your Free 60-Minute Automation Audit
                  <ArrowRight size={16} />
                </Link>
                <p style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.55)", marginTop: "0.5rem" }}>
                  Walk away with a clear plan to automate your business in 30 days.
                </p>
              </div>
              <div>
                <Link href="/resources" className="btn-ghost-white">
                  Download: 5 Workflows to Automate First
                </Link>
                <p style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.55)", marginTop: "0.5rem" }}>
                  A free guide for business owners researching automation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Social proof toast (fixed position) ─── */}
      <SocialProofToast />
    </>
  );
}
