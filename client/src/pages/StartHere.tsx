/*
 * StartHere.tsx — Barrana.ai "Start Here" Page
 * Brand Colors (OFFICIAL):
 *   Navy:    #283891  (primary)
 *   Magenta: #7E0F4A  (accent)
 *   Grey:    #7B7B7B  (body text)
 *   Dark:    #1A1A2E  (headings)
 *   Offwhite: #F5F6FA (alt section bg)
 *   Border:  #E2E4ED
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  HelpCircle,
  DollarSign,
  Map,
  Phone,
  Plug,
  Shield,
  Calculator,
  FileText,
  Scale,
  Stethoscope,
  HardHat,
  Building2,
  Sparkles,
  BookOpen,
  ArrowRight,
} from "lucide-react";

import FAQAccordion, { FAQItem } from "@/components/ui/FAQAccordion";

// Brand color constants
const NAVY = "#283891";
const MAGENTA = "#7E0F4A";
const GREY = "#7B7B7B";
const DARK = "#1A1A2E";
const OFFWHITE = "#F5F6FA";
const BORDER = "#E2E4ED";

// ─── Scroll reveal hook ───────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Section reveal wrapper ───────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
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

// ─── Hover card wrapper ──────────────────────────────────────────────
function HoverCard({
  children,
  style = {},
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={className}
      style={{
        borderRadius: "0.875rem",
        border: `1px solid ${BORDER}`,
        boxShadow: hovered
          ? "0 8px 24px rgba(0,0,0,0.08)"
          : "0 2px 8px rgba(0,0,0,0.04)",
        padding: "1.75rem",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        ...style,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

// ─── Scroll-to helper ────────────────────────────────────────────────
function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ─── Responsive style block ─────────────────────────────────────────
const responsiveStyles = `
  .sh-grid-2x2 { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
  .sh-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
  .sh-grid-industry { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
  .sh-section { padding: 6rem 0; }
  .sh-section-compact { padding: 4.5rem 0; }
  @media (max-width: 900px) {
    .sh-grid-2x2 { grid-template-columns: 1fr; }
    .sh-grid-3 { grid-template-columns: 1fr; }
    .sh-grid-industry { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 600px) {
    .sh-grid-industry { grid-template-columns: 1fr; }
  }
`;

// ─── Data ────────────────────────────────────────────────────────────

const industryCards = [
  { icon: Calculator, name: "Accounting Firms", pain: "Your team chases tax documents for 15+ hours per week. That is $39,000/year.", href: "/industries/accounting-firms" },
  { icon: FileText, name: "Immigration Consultants", pain: "Intake takes 45 minutes per client. At 50 clients/month, that is 37 hours on data entry.", href: "/industries/immigration-consultants" },
  { icon: Scale, name: "Law Firms", pain: "Every hour your lawyer does admin is $300\u2013$500 that disappears.", href: "/industries/law-firms" },
  { icon: Stethoscope, name: "Clinics", pain: "A 20% no-show rate costs a busy clinic $150,000/year.", href: "/industries/physiotherapy-clinics" },
  { icon: HardHat, name: "Contractors", pain: "You lose 8\u201312 leads per month while you are on the job.", href: "/industries/contractors" },
  { icon: Building2, name: "Real Estate Teams", pain: "80% of your leads take 6\u201312 months. Without follow-up, they close with someone else.", href: "/industries/real-estate-teams" },
  { icon: Shield, name: "Insurance Brokers", pain: "40% of your quotes get zero follow-up. Every lapsed renewal is gone forever.", href: "/industries/insurance-brokers" },
  { icon: Sparkles, name: "Coaches and Solopreneurs", pain: "You spend 15 hours/week on admin. At your rate, that is $78,000/year.", href: "/solopreneurs" },
];

const caseStudies = [
  { location: "Immigration Firm \u00b7 North York", amount: "$86,400+ recovered", detail: "14 staff hours/week recovered = $36,400/yr in capacity. 25% more client files handled. $50,000+ in captured evening leads." },
  { location: "Accounting Firm \u00b7 Vaughan", amount: "$82,000+ in new revenue", detail: "65 additional clients at avg $800 = $52,000 new revenue. Invoice delays eliminated = $30,000+ accelerated cash flow." },
  { location: "Physiotherapy Clinic \u00b7 Richmond Hill", amount: "$85,000/yr recovered", detail: "No-shows dropped to 13.6%. Revenue from reduced empty slots + filled cancellations." },
  { location: "Contractor \u00b7 Mississauga", amount: "$24K\u2013$100K/yr recaptured", detail: "Quote conversion up 22%. 3\u20134 more jobs/month at $8,000\u2013$25,000 per job captured from competitors." },
];

const faqItems: FAQItem[] = [
  {
    question: "Is this going to be really expensive?",
    answer: "A single automated workflow costs $1,500 to $4,000. A full system costs $5,000 to $12,000. Fixed pricing \u2014 you know the number before we start. Most businesses see the investment returned within the first month or two. And the audit that tells you everything? That is free.",
  },
  {
    question: "I am not technical at all. Will I understand this?",
    answer: "You do not need to understand it. We handle all the setup, testing, and training. You keep using the same tools you use now. The automation runs in the background. If you can use email and a calendar, you are technical enough.",
  },
  {
    question: "Will this replace my staff?",
    answer: "No. Automation handles the repetitive coordination work: data entry, follow-up emails, scheduling, reminders. Your staff is freed up for the work that actually requires their skills. Most teams end up less stressed and more productive, not smaller.",
  },
  {
    question: "What if AI makes a mistake with my clients?",
    answer: "Every system we build has safety rails: approval gates for sensitive actions, stop-loss triggers that catch errors, human escalation when something unexpected happens, and full logs so you can see everything. Nothing runs unsupervised in areas that matter.",
  },
  {
    question: "I have tried technology before and it did not work.",
    answer: "Most failed tech projects fail because they start with the tool instead of the problem. We start by mapping your actual workflows. Then we figure out what to automate. Then we build and test with real scenarios from your business before anything goes live. The audit is free. If automation is not the right answer, we will tell you that.",
  },
  {
    question: "How long before I see results?",
    answer: "First automated workflow goes live in 1 to 2 weeks. You will see results \u2014 faster responses, fewer missed leads, less admin time \u2014 within the first week of operation. Full system payback: typically 30 to 60 days.",
  },
];

const costCards = [
  { label: "Missed / slow leads", amount: "$36,000\u2013$180,000/year", desc: "Leads come in after hours, over weekends, during busy periods. No one responds for hours. By then the prospect has moved on." },
  { label: "Admin hours", amount: "$26,000\u2013$78,000/year", desc: "Staff spend 15\u201320 hours per week on data entry, reminders, follow-ups, and document chasing. None of it generates revenue." },
  { label: "No-shows", amount: "$15,000\u2013$150,000/year", desc: "A 15\u201320% no-show rate means 3\u201310 empty slots per week. At $80\u2013$300 per visit, that is real revenue disappearing." },
  { label: "Invoice delays", amount: "$10,000\u2013$50,000/year", desc: "Invoices go out 2\u20134 weeks late. Payment reminders depend on someone remembering. Cash flow suffers." },
];

// ─── Component ───────────────────────────────────────────────────────

export default function StartHere() {
  useEffect(() => {
    document.title = "Start Here: AI Automation for Your Business | Barrana.ai";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", "Not sure if AI automation is right for your business? Start here. No jargon. No pressure. Find out what it costs you to stay manual, what you can automate, and where to begin.");
    }
  }, []);

  return (
    <>
      <style>{responsiveStyles}</style>

      {/* ───── SECTION 1: HERO ───── */}
      <section style={{ background: "#fff", paddingTop: "5rem", paddingBottom: "5.5rem" }}>
        <div className="container" style={{ maxWidth: "52rem" }}>
          <Reveal>
            <h1
              style={{
                color: DARK,
                fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                marginBottom: "1.75rem",
              }}
            >
              You Run a Business. You Are Busy. You Keep Hearing About AI.{" "}
              <span style={{ color: MAGENTA }}>Start Here.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p
              style={{
                color: GREY,
                fontSize: "1.1875rem",
                lineHeight: 1.75,
                marginBottom: "2rem",
                maxWidth: "40rem",
              }}
            >
              This page is for business owners who are curious about AI automation but not sure what it actually means for a business like theirs. No jargon. No hype. Just a clear path to understanding whether this is worth your time.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p style={{ color: GREY, fontSize: "1.0625rem", lineHeight: 1.75, marginBottom: "1.25rem" }}>
              You do not need to know anything about AI to read this page. You do not need to be technical. You do not need to commit to anything. This is just a starting point.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ color: GREY, fontSize: "1.0625rem", lineHeight: 1.75 }}>
              By the end of this page, you will know: (1) whether your business has a problem automation can solve, (2) roughly what it would cost to fix it, and (3) what to do next if you want to explore further.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ───── SECTION 2: FOUR-PATH ROUTER ───── */}
      <section className="sh-section" style={{ background: OFFWHITE }}>
        <div className="container">
          <Reveal>
            <p className="eyebrow" style={{ letterSpacing: "0.1em" }}>Start With Your Situation</p>
            <h2 style={{ color: DARK, fontSize: "clamp(1.875rem, 3.5vw, 2.25rem)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "1rem" }}>
              Which of These Sounds Like You?
            </h2>
            <p style={{ color: GREY, fontSize: "1.125rem", lineHeight: 1.7, marginBottom: "3rem", maxWidth: "36rem" }}>
              Pick the one that fits best. Each path is different.
            </p>
          </Reveal>

          <div className="sh-grid-2x2">
            {/* Card A */}
            <Reveal delay={0.05}>
              <HoverCard style={{ background: "#fff", cursor: "pointer", padding: "2rem" }} onClick={() => scrollToId("basics")}>
                <div style={{ width: 44, height: 44, borderRadius: "0.625rem", background: `${NAVY}10`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                  <HelpCircle size={22} color={NAVY} />
                </div>
                <p style={{ color: DARK, fontStyle: "italic", marginBottom: "0.75rem", lineHeight: 1.55, fontSize: "1.0625rem" }}>
                  "I have no idea what AI automation actually is or whether it applies to my business."
                </p>
                <p style={{ color: MAGENTA, fontWeight: 700, fontSize: "1.05rem", marginBottom: "0.5rem" }}>Start from zero</p>
                <p style={{ color: GREY, fontSize: "0.9375rem", lineHeight: 1.65 }}>
                  You have heard the buzzword. You are not sure what it means in practice. You want a plain-language explanation before anything else.
                </p>
              </HoverCard>
            </Reveal>

            {/* Card B */}
            <Reveal delay={0.1}>
              <HoverCard style={{ background: "#fff", cursor: "pointer", padding: "2rem" }} onClick={() => scrollToId("cost")}>
                <div style={{ width: 44, height: 44, borderRadius: "0.625rem", background: `${NAVY}10`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                  <DollarSign size={22} color={NAVY} />
                </div>
                <p style={{ color: DARK, fontStyle: "italic", marginBottom: "0.75rem", lineHeight: 1.55, fontSize: "1.0625rem" }}>
                  "I know my business has problems. I am not sure if AI is the fix or what it would cost."
                </p>
                <p style={{ color: MAGENTA, fontWeight: 700, fontSize: "1.05rem", marginBottom: "0.5rem" }}>See what it is costing you</p>
                <p style={{ color: GREY, fontSize: "0.9375rem", lineHeight: 1.65 }}>
                  You are losing money to slow responses, manual admin, missed follow-ups, or no-shows. You want to see the numbers before you do anything else.
                </p>
              </HoverCard>
            </Reveal>

            {/* Card C */}
            <Reveal delay={0.15}>
              <Link href="/automation-planner" style={{ textDecoration: "none" }}>
                <HoverCard style={{ background: "#fff", cursor: "pointer", borderLeft: `4px solid ${NAVY}`, padding: "2rem" }}>
                  <div style={{ width: 44, height: 44, borderRadius: "0.625rem", background: `${NAVY}10`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                    <Map size={22} color={NAVY} />
                  </div>
                  <p style={{ color: DARK, fontStyle: "italic", marginBottom: "0.75rem", lineHeight: 1.55, fontSize: "1.0625rem" }}>
                    "I think I want to automate something but I do not know where to start."
                  </p>
                  <p style={{ color: MAGENTA, fontWeight: 700, fontSize: "1.05rem", marginBottom: "0.5rem" }}>Map your starting point</p>
                  <p style={{ color: GREY, fontSize: "0.9375rem", lineHeight: 1.65 }}>
                    You are past the "what is this?" stage. You want to figure out which part of your business to automate first and what it would look like.
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", color: NAVY, fontWeight: 600, fontSize: "0.875rem", marginTop: "1rem" }}>
                    Open Automation Planner <ArrowRight size={14} />
                  </div>
                </HoverCard>
              </Link>
            </Reveal>

            {/* Card D */}
            <Reveal delay={0.2}>
              <Link href="/contact" style={{ textDecoration: "none" }}>
                <HoverCard style={{ background: "#fff", cursor: "pointer", borderLeft: `4px solid ${NAVY}`, padding: "2rem" }}>
                  <div style={{ width: 44, height: 44, borderRadius: "0.625rem", background: `${NAVY}10`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                    <Phone size={22} color={NAVY} />
                  </div>
                  <p style={{ color: DARK, fontStyle: "italic", marginBottom: "0.75rem", lineHeight: 1.55, fontSize: "1.0625rem" }}>
                    "I already know I need this. I just want to talk to someone."
                  </p>
                  <p style={{ color: MAGENTA, fontWeight: 700, fontSize: "1.05rem", marginBottom: "0.5rem" }}>Talk to us</p>
                  <p style={{ color: GREY, fontSize: "0.9375rem", lineHeight: 1.65 }}>
                    You are ready. You want a human to look at your business and tell you what to do. That is what the free Automation Audit is for.
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", color: NAVY, fontWeight: 600, fontSize: "0.875rem", marginTop: "1rem" }}>
                    Book Free Audit <ArrowRight size={14} />
                  </div>
                </HoverCard>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───── SECTION 3: AI AUTOMATION IN 60 SECONDS ───── */}
      <section className="sh-section" id="basics" style={{ background: "#fff" }}>
        <div className="container">
          <Reveal>
            <p className="eyebrow" style={{ letterSpacing: "0.1em" }}>The Basics</p>
            <h2 style={{ color: DARK, fontSize: "clamp(1.875rem, 3.5vw, 2.25rem)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "3rem" }}>
              AI Automation in 60 Seconds. No Jargon.
            </h2>
          </Reveal>

          <div className="sh-grid-3">
            {/* Type B soft cards — no border, soft bg */}
            <Reveal delay={0.05}>
              <div style={{ background: "rgba(245,246,250,0.5)", borderRadius: "0.75rem", padding: "2rem" }}>
                <div style={{ width: 44, height: 44, borderRadius: "0.625rem", background: `${NAVY}10`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                  <Plug size={22} color={NAVY} />
                </div>
                <h3 style={{ color: DARK, fontWeight: 700, fontSize: "1.125rem", marginBottom: "0.875rem" }}>What It Is</h3>
                <p style={{ color: GREY, fontSize: "0.9375rem", lineHeight: 1.7, marginBottom: "0.75rem" }}>
                  AI automation connects the software tools your business already uses — your email, your calendar, your client database, your accounting software — so that routine tasks happen automatically instead of manually.
                </p>
                <p style={{ color: GREY, fontSize: "0.9375rem", lineHeight: 1.7 }}>
                  When a potential client fills out your website form, instead of someone reading the email, typing the info into a spreadsheet, sending a confirmation, and scheduling a meeting — all of that happens in seconds, automatically.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div style={{ background: "rgba(245,246,250,0.5)", borderRadius: "0.75rem", padding: "2rem" }}>
                <div style={{ width: 44, height: 44, borderRadius: "0.625rem", background: `${NAVY}10`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                  <Shield size={22} color={NAVY} />
                </div>
                <h3 style={{ color: DARK, fontWeight: 700, fontSize: "1.125rem", marginBottom: "0.875rem" }}>What It Does Not Do</h3>
                <p style={{ color: GREY, fontSize: "0.9375rem", lineHeight: 1.7 }}>
                  It does not replace your team. It does not make decisions that need your professional judgement. It does not touch sensitive client work. It handles the repetitive coordination: the scheduling, the reminders, the data entry, the follow-ups, the invoicing. The stuff that eats your day but does not need your expertise.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div style={{ background: "rgba(245,246,250,0.5)", borderRadius: "0.75rem", padding: "2rem" }}>
                <div style={{ width: 44, height: 44, borderRadius: "0.625rem", background: `${NAVY}10`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                  <DollarSign size={22} color={NAVY} />
                </div>
                <h3 style={{ color: DARK, fontWeight: 700, fontSize: "1.125rem", marginBottom: "0.875rem" }}>What It Costs</h3>
                <p style={{ color: GREY, fontSize: "0.9375rem", lineHeight: 1.7 }}>
                  For most small businesses: $3,000 to $12,000 to set up, depending on how many workflows you automate. Monthly costs: $200 to $500. Most businesses see the investment pay for itself within 30 to 60 days through saved time, captured leads, and faster billing.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <p style={{ color: DARK, fontWeight: 600, fontSize: "1.0625rem", textAlign: "center", margin: "3rem 0 1.75rem" }}>
              That is it. That is the entire concept. The rest is details about your business.
            </p>
            <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/automation-planner" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                Take the Automation Planner <ArrowRight size={16} />
              </Link>
              <button
                onClick={() => scrollToId("cost")}
                style={{
                  background: "none",
                  border: "none",
                  color: NAVY,
                  fontWeight: 600,
                  fontSize: "0.9375rem",
                  cursor: "pointer",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                Or keep reading to see the cost of doing nothing.
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───── SECTION 4: WHAT YOUR OPERATIONS COST ───── */}
      <section className="sh-section" id="cost" style={{ background: OFFWHITE }}>
        <div className="container">
          <Reveal>
            <p className="eyebrow" style={{ letterSpacing: "0.1em" }}>The Real Cost</p>
            <h2 style={{ color: DARK, fontSize: "clamp(1.875rem, 3.5vw, 2.25rem)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "1rem" }}>
              Before You Think About AI, Look at What Doing Nothing Costs.
            </h2>
            <p style={{ color: GREY, fontSize: "1.125rem", lineHeight: 1.7, marginBottom: "3rem", maxWidth: "44rem" }}>
              Most business owners have never calculated the annual cost of their manual operations. Here it is for a typical service business:
            </p>
          </Reveal>

          <div className="sh-grid-2x2">
            {costCards.map((card, i) => (
              <Reveal key={card.label} delay={0.05 * i}>
                <HoverCard style={{ background: "#fff", padding: "2rem", borderRadius: "1rem" }}>
                  <p style={{ color: GREY, fontWeight: 600, fontSize: "0.8125rem", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.625rem" }}>
                    {card.label}
                  </p>
                  <p style={{ color: MAGENTA, fontWeight: 800, fontSize: "1.625rem", marginBottom: "0.625rem", fontVariantNumeric: "tabular-nums" }}>
                    {card.amount}
                  </p>
                  <p style={{ color: GREY, fontSize: "0.9375rem", lineHeight: 1.65 }}>
                    {card.desc}
                  </p>
                </HoverCard>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.25}>
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <p style={{ color: MAGENTA, fontWeight: 800, fontSize: "1.375rem", marginBottom: "1.75rem" }}>
                $80,000 to $200,000 per year in operational waste for a 5\u201315 person service business.
              </p>
              <Link href="/automation-planner" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                Calculate Your Specific Number <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───── SECTION 5: FIND YOUR INDUSTRY ───── */}
      <section className="sh-section" style={{ background: "#fff" }}>
        <div className="container">
          <Reveal>
            <p className="eyebrow" style={{ letterSpacing: "0.1em" }}>Your Business Type</p>
            <h2 style={{ color: DARK, fontSize: "clamp(1.875rem, 3.5vw, 2.25rem)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "1rem" }}>
              What Does AI Automation Look Like for a Business Like Yours?
            </h2>
            <p style={{ color: GREY, fontSize: "1.125rem", lineHeight: 1.7, marginBottom: "3rem", maxWidth: "44rem" }}>
              Every business is different. Click on your industry to see the specific workflows, costs, and automation opportunities that apply to you.
            </p>
          </Reveal>

          <div className="sh-grid-industry">
            {industryCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <Reveal key={card.name} delay={0.04 * i}>
                  <Link href={card.href} style={{ textDecoration: "none" }}>
                    <HoverCard style={{ background: "rgba(245,246,250,0.5)", border: "none", height: "100%", padding: "1.5rem" }}>
                      <div style={{ width: 40, height: 40, borderRadius: "0.625rem", background: `${NAVY}10`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                        <Icon size={20} color={NAVY} />
                      </div>
                      <p style={{ color: DARK, fontWeight: 700, fontSize: "1rem", marginBottom: "0.5rem" }}>
                        {card.name}
                      </p>
                      <p style={{ color: GREY, fontSize: "0.875rem", lineHeight: 1.6, fontStyle: "italic", marginBottom: "0.75rem" }}>
                        {card.pain}
                      </p>
                      <span style={{ color: NAVY, fontSize: "0.8125rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.25rem" }}>
                        Learn more <ArrowRight size={13} />
                      </span>
                    </HoverCard>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.3}>
            <p style={{ color: GREY, textAlign: "center", margin: "2.5rem 0 1.5rem", fontSize: "0.9375rem", lineHeight: 1.7 }}>
              Not seeing your industry? If your business has clients, appointments, follow-ups, and invoicing, automation applies.
            </p>
            <div style={{ textAlign: "center" }}>
              <Link href="/automation-planner" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                Start the Automation Planner <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───── SECTION 6: REAL RESULTS ───── */}
      <section className="sh-section" style={{ background: OFFWHITE }}>
        <div className="container">
          <Reveal>
            <p className="eyebrow" style={{ letterSpacing: "0.1em" }}>Real Results</p>
            <h2 style={{ color: DARK, fontSize: "clamp(1.875rem, 3.5vw, 2.25rem)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "1rem" }}>
              Here Is What Businesses Like Yours Recovered After Automating.
            </h2>
            <p style={{ color: GREY, fontSize: "1.125rem", lineHeight: 1.7, marginBottom: "3rem", maxWidth: "40rem" }}>
              These are real outcomes from GTA service businesses.
            </p>
          </Reveal>

          <div className="sh-grid-2x2">
            {caseStudies.map((cs, i) => (
              <Reveal key={cs.location} delay={0.05 * i}>
                <HoverCard style={{ background: "#fff", padding: "2rem", borderRadius: "1rem" }}>
                  <p style={{ color: NAVY, fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>
                    {cs.location}
                  </p>
                  <p style={{ color: MAGENTA, fontWeight: 800, fontSize: "1.5rem", marginBottom: "0.625rem" }}>
                    {cs.amount}
                  </p>
                  <p style={{ color: GREY, fontSize: "0.9375rem", lineHeight: 1.65 }}>
                    {cs.detail}
                  </p>
                </HoverCard>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.25}>
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <Link href="/case-studies" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                Read All Case Studies <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───── SECTION 7: COMMON FEARS ───── */}
      <section className="sh-section" style={{ background: "#fff" }}>
        <div className="container" style={{ maxWidth: "48rem" }}>
          <Reveal>
            <p className="eyebrow" style={{ letterSpacing: "0.1em" }}>Honest Answers</p>
            <h2 style={{ color: DARK, fontSize: "clamp(1.875rem, 3.5vw, 2.25rem)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "3rem" }}>
              Every Business Owner Has These Same Concerns. Here Are Straight Answers.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <FAQAccordion items={faqItems} />
          </Reveal>
        </div>
      </section>

      {/* ───── SECTION 8: YOUR NEXT STEP ───── */}
      <section className="sh-section" style={{ background: OFFWHITE }}>
        <div className="container">
          <Reveal>
            <p className="eyebrow" style={{ letterSpacing: "0.1em" }}>What to Do Next</p>
            <h2 style={{ color: DARK, fontSize: "clamp(1.875rem, 3.5vw, 2.25rem)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "3rem" }}>
              Three Ways to Move Forward. All Free to Start.
            </h2>
          </Reveal>

          <div className="sh-grid-3">
            {/* Option 1 */}
            <Reveal delay={0.05}>
              <HoverCard style={{ background: "#fff", height: "100%", padding: "2rem", borderRadius: "1rem" }}>
                <div style={{ width: 44, height: 44, borderRadius: "0.625rem", background: `${NAVY}10`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                  <BookOpen size={22} color={NAVY} />
                </div>
                <h3 style={{ color: DARK, fontWeight: 700, fontSize: "1.1875rem", marginBottom: "0.875rem" }}>Explore on Your Own</h3>
                <p style={{ color: GREY, fontSize: "0.9375rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                  Read the guides, browse by industry, and explore at your own pace. No pressure. No forms.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <Link href="/insights/what-to-automate-first" style={{ color: NAVY, fontWeight: 600, fontSize: "0.9rem", textDecoration: "none" }}>
                    What Should a Small Business Automate First? &rarr;
                  </Link>
                  <Link href="/ai-automation-industries" style={{ color: NAVY, fontWeight: 600, fontSize: "0.9rem", textDecoration: "none" }}>
                    AI Automation for Your Industry &rarr;
                  </Link>
                  <Link href="/resources" style={{ color: NAVY, fontWeight: 600, fontSize: "0.9rem", textDecoration: "none" }}>
                    All Resources &rarr;
                  </Link>
                </div>
              </HoverCard>
            </Reveal>

            {/* Option 2 */}
            <Reveal delay={0.1}>
              <HoverCard style={{ background: "#fff", height: "100%", padding: "2rem", borderRadius: "1rem" }}>
                <div style={{ width: 44, height: 44, borderRadius: "0.625rem", background: `${NAVY}10`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                  <Map size={22} color={NAVY} />
                </div>
                <h3 style={{ color: DARK, fontWeight: 700, fontSize: "1.1875rem", marginBottom: "0.875rem" }}>Map Your Workflows</h3>
                <p style={{ color: GREY, fontSize: "0.9375rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                  Take the Automation Planner. Answer 8 guided questions about your business and get a personalised report showing your top automation opportunities. Takes 3 to 5 minutes.
                </p>
                <Link href="/automation-planner" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem" }}>
                  Start the Automation Planner <ArrowRight size={16} />
                </Link>
                <p style={{ color: GREY, fontSize: "0.8rem", marginTop: "0.75rem" }}>
                  Free. No account required. Results on screen immediately.
                </p>
              </HoverCard>
            </Reveal>

            {/* Option 3 */}
            <Reveal delay={0.15}>
              <HoverCard style={{ background: "#fff", height: "100%", padding: "2rem", borderRadius: "1rem" }}>
                <div style={{ width: 44, height: 44, borderRadius: "0.625rem", background: `${NAVY}10`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                  <Phone size={22} color={NAVY} />
                </div>
                <h3 style={{ color: DARK, fontWeight: 700, fontSize: "1.1875rem", marginBottom: "0.875rem" }}>Talk to a Human</h3>
                <p style={{ color: GREY, fontSize: "0.9375rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                  Book a free 60-minute Automation Audit. We look at your specific workflows, calculate what your manual operations cost per year, and show you exactly what to automate first.
                </p>
                <Link
                  href="/contact"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "0.9rem",
                    padding: "0.65rem 1.25rem",
                    borderRadius: "0.5rem",
                    border: `2px solid ${NAVY}`,
                    color: NAVY,
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "background 0.2s, color 0.2s",
                  }}
                >
                  Book a Free Automation Audit <ArrowRight size={16} />
                </Link>
                <p style={{ color: GREY, fontSize: "0.8rem", marginTop: "0.75rem" }}>
                  60 minutes. No obligation. You keep the audit even if you do nothing.
                </p>
              </HoverCard>
            </Reveal>
          </div>

          <Reveal delay={0.25}>
            <p style={{ color: GREY, fontStyle: "italic", textAlign: "center", marginTop: "2.5rem", fontSize: "0.95rem" }}>
              You do not have to choose now. Bookmark this page and come back when you are ready. We are not going anywhere.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ───── SECTION 9: WHO IS BARRANA ───── */}
      <section className="sh-section-compact" style={{ background: "#fff" }}>
        <div className="container" style={{ maxWidth: "60ch", textAlign: "center" }}>
          <Reveal>
            <p style={{ color: GREY, fontSize: "1.0625rem", lineHeight: 1.75, marginBottom: "1.25rem" }}>
              Barrana.ai helps small businesses in Toronto and the GTA automate their operations. We have been building business technology systems for over 10 years. We use fixed pricing (never hourly), we work with your existing tools (never force you to change), and we keep humans in the loop for every decision that matters.
            </p>
            <p style={{ color: GREY, fontSize: "1rem", lineHeight: 1.7 }}>
              Our office is at 50 Corstate Avenue, Unit 01, Vaughan, ON L4K 4X2. Phone: +1 647 367 6771.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
