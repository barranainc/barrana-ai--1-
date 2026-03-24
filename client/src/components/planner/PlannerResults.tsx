/**
 * PlannerResults.tsx — Redesigned v2
 * 8-section narrative results page for non-technical business owners.
 * Narrative arc: Snapshot → Cost → #1 Opportunity → More → Control → Roadmap → Before/After → Get Plan
 */

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import type { Opportunity, PlannerState, WorkflowId } from "@/types/planner";
import { usePlannerScoring } from "@/hooks/usePlannerScoring";
import { INDUSTRY_MAP } from "@/config/planner/industries";
import BeforeAfterSection from "@/components/service/BeforeAfterSection";
import LeadCaptureForm from "./LeadCaptureForm";
import ShareResults from "./ShareResults";

// ── Brand ─────────────────────────────────────────────────────────────────────
const NAVY = "#283891";
const BURGUNDY = "#7E0F4A";
const GREY = "#7B7B7B";
const DARK = "#1A1A2E";
const GREEN = "#0D9668";
const AMBER = "#D97706";

// ── Animated counter ──────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1400, trigger = false) {
  const [count, setCount] = useState(0);
  const frame = useRef<number>(0);
  useEffect(() => {
    if (!trigger || target === 0) { setCount(target); return; }
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(ease * target));
      if (t < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [target, duration, trigger]);
  return count;
}

// ── Animated counter component ────────────────────────────────────────────────
function AnimCount({ value, trigger }: { value: number; trigger: boolean }) {
  const count = useCountUp(value, 1200, trigger);
  return <>{count}</>;
}

// ── Intersection observer ─────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ── Fade-in section ───────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// ── Jargon tooltip ────────────────────────────────────────────────────────────
function JargonTip({ term, tip }: { term: string; tip: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span style={{ position: "relative", display: "inline" }}>
      <span
        style={{ borderBottom: `1.5px dotted ${GREY}`, cursor: "help" }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onTouchStart={() => setOpen((v) => !v)}
      >
        {term}
      </span>
      {open && (
        <span
          style={{
            position: "absolute", bottom: "calc(100% + 6px)", left: 0, zIndex: 50,
            background: DARK, color: "white", fontSize: 12, lineHeight: 1.5,
            padding: "8px 12px", borderRadius: 8, width: 220,
            boxShadow: "0 4px 16px rgba(0,0,0,0.25)", display: "block",
            pointerEvents: "none",
          }}
        >
          {tip}
        </span>
      )}
    </span>
  );
}

// ── Snapshot pill ─────────────────────────────────────────────────────────────
function Pill({ icon, text, highlight }: { icon: string; text: string; highlight?: boolean }) {
  return (
    <div
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        background: highlight ? BURGUNDY : "#EEF1FA",
        color: highlight ? "white" : NAVY,
        borderRadius: 24, padding: "9px 16px",
        fontSize: 13, fontWeight: 600, flexShrink: 0,
      }}
    >
      <span style={{ fontSize: 16, lineHeight: 1 }}>{icon}</span>
      <span>{text}</span>
    </div>
  );
}

// ── Semicircular complexity gauge ─────────────────────────────────────────────
function ComplexityGauge({ level }: { level: "low" | "medium" | "high" }) {
  const configs = {
    low: { angle: -62, color: GREEN, label: "LOW", desc: "Your tools are in place and workflows are standard. Most implementations at this level go live in 2-3 weeks." },
    medium: { angle: 0, color: AMBER, label: "MEDIUM", desc: "Some workflows need custom configuration. A phased 4-6 week implementation keeps this manageable." },
    high: { angle: 62, color: "#DC2626", label: "HIGH", desc: "Several moving parts and dependencies. A discovery session maps these properly before we build." },
  };
  const cfg = configs[level];
  const angleRad = (cfg.angle * Math.PI) / 180;
  const cx = 80, cy = 78, R = 62, L = 50;
  const nx = cx + L * Math.sin(angleRad);
  const ny = cy - L * Math.cos(angleRad);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <svg width="160" height="96" viewBox="0 0 160 96" aria-label={`Complexity: ${cfg.label}`}>
        {/* Track */}
        <path d={`M ${cx - R},${cy} A ${R},${R} 0 0,1 ${cx + R},${cy}`}
          fill="none" stroke="#E2E4ED" strokeWidth="10" strokeLinecap="round" />
        {/* Colored overlay */}
        <path d={`M ${cx - R},${cy} A ${R},${R} 0 0,1 ${cx + R},${cy}`}
          fill="none" stroke={cfg.color} strokeWidth="10" strokeLinecap="round" strokeOpacity={0.18} />
        {/* Needle */}
        <line x1={cx} y1={cy} x2={nx} y2={ny}
          stroke={cfg.color} strokeWidth="3" strokeLinecap="round" />
        <circle cx={cx} cy={cy} r="5" fill={cfg.color} />
        {/* Zone labels */}
        <text x={cx - R + 4} y={cy + 18} fontSize="10" fill={level === "low" ? GREEN : "#9CA3AF"}
          textAnchor="middle" fontWeight={level === "low" ? "700" : "400"}>Low</text>
        <text x={cx} y={cy + 18} fontSize="10" fill={level === "medium" ? AMBER : "#9CA3AF"}
          textAnchor="middle" fontWeight={level === "medium" ? "700" : "400"}>Med</text>
        <text x={cx + R - 4} y={cy + 18} fontSize="10" fill={level === "high" ? "#DC2626" : "#9CA3AF"}
          textAnchor="middle" fontWeight={level === "high" ? "700" : "400"}>High</text>
      </svg>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: cfg.color, marginBottom: 6 }}>
          {cfg.label} COMPLEXITY
        </div>
        <p style={{ fontSize: 13, color: GREY, lineHeight: 1.6, margin: 0, maxWidth: 300 }}>
          {cfg.desc}
        </p>
      </div>
    </div>
  );
}

// ── Opportunity story map ─────────────────────────────────────────────────────
const STORIES: Record<string, {
  problem: string; fix: string;
  scenario: string; howItWorks: string[];
}> = {
  "inbound-enquiries": {
    problem: "Every new enquiry waits until someone checks their inbox. During evenings and weekends, they wait until Monday. Competitors who respond in minutes win the consultation.",
    fix: "An automated response acknowledges every enquiry within 90 seconds — day or night. Qualifying questions are sent, a record is created in your CRM, and urgent leads are flagged for priority follow-up.",
    scenario: "A potential client fills out your form at 8:30pm on Thursday. By 9am Friday, they have already booked a consultation with the firm that responded at 8:31pm.",
    howItWorks: ["New enquiry arrives via website or email", "Acknowledgement sent within 90 seconds", "Qualifying questions sent automatically", "Lead record created in your CRM", "Qualified leads escalated for priority handling"],
  },
  "phone-calls": {
    problem: "Calls during lunch, back-to-back appointments, or when the whole team is occupied go to voicemail. A significant portion of callers hang up without leaving a message.",
    fix: "An AI receptionist answers every call, captures the reason for calling, books appointments directly into your calendar, and routes genuinely urgent calls to the right person.",
    scenario: "A patient calls at 12:15pm during your lunch break. Instead of voicemail, they book their appointment directly and arrive two weeks later.",
    howItWorks: ["Call received by AI receptionist", "Caller intent captured", "Appointment booked directly into calendar", "Urgent calls transferred to available staff", "Complete call summary logged automatically"],
  },
  "lead-qualification": {
    problem: "Your team spends time on discovery calls with people who are not a fit — wrong budget, wrong service, or not ready to move. Meanwhile, qualified prospects wait days for a response.",
    fix: "An automated qualification sequence asks the right questions before any human conversation. Qualified leads are fast-tracked. Unqualified leads receive appropriate resources automatically.",
    scenario: "You spend 45 minutes on a discovery call only to find out their budget is a quarter of your minimum. That time now goes to three qualified prospects instead.",
    howItWorks: ["New lead submits enquiry", "Automated qualification questions sent within minutes", "Responses scored against your criteria", "Qualified leads fast-tracked to your calendar", "Unqualified leads receive appropriate resources"],
  },
  "appointment-booking": {
    problem: "Booking requires back-and-forth messages or phone tag — days of exchanging availability. This wastes both sides' time and delays the relationship before it starts.",
    fix: "Clients see your real-time availability and book directly. Confirmations sent immediately. Reminders at 48 hours and 2 hours before every appointment.",
    scenario: "It is 9pm. A patient wants to book for next week. Instead of waiting until your office opens, they book online in 2 minutes and receive an instant confirmation.",
    howItWorks: ["Client visits your booking link", "Real-time availability shown from your calendar", "Client selects slot and provides details", "Confirmation sent immediately", "Reminders sent automatically at 48hr and 2hr before"],
  },
  "follow-up": {
    problem: "Leads and prospects fall through the cracks. Someone showed interest two weeks ago. You meant to follow up. You forgot. They have already moved on.",
    fix: "Every lead automatically receives a follow-up sequence. The timing, content, and escalation logic are set once and run indefinitely. No prospect falls through the cracks again.",
    scenario: "You met someone at a networking event. You meant to follow up Monday. It is Thursday. They have already hired a competitor. This never happens again.",
    howItWorks: ["Lead enters system via form, call, or referral", "Follow-up sequence triggered automatically", "Sequence adapts based on engagement", "Engaged leads escalated to human", "Long-term nurture continues for contacts not yet ready"],
  },
  "client-onboarding": {
    problem: "Onboarding a new client involves coordinating information, documents, contracts, and setup across multiple channels — days of back-and-forth occupying significant staff time.",
    fix: "A fully automated onboarding sequence is triggered the moment a client signs. They receive a branded portal, a clear checklist, and reminders until everything is complete.",
    scenario: "A new client signs the contract on Friday afternoon. On Monday morning, you receive a notification that their onboarding is 80% complete — and you have not touched it.",
    howItWorks: ["Contract signed or new client created", "Welcome message and portal sent immediately", "Document and information checklist delivered", "Reminders sent every 48hr for incomplete items", "Team notified only when review is needed"],
  },
  "document-collection": {
    problem: "You send the document list. Days pass. Some documents arrive. You send a reminder. More days pass. You call. They promise to send this weekend. Every file drags out by weeks.",
    fix: "The system sends document requests, tracks what has been received, and sends polite reminders every 48 hours for outstanding items — automatically, until the file is complete.",
    scenario: "You send the checklist. Three days later you get a notification: 7 of 9 items received, 2 reminders sent for outstanding items. You have not sent a single follow-up.",
    howItWorks: ["Document checklist sent via secure portal", "Client uploads directly to the portal", "System tracks receipt status in real time", "Reminders sent every 48hr for missing items", "File flagged complete when all documents received"],
  },
  "estimates-proposals": {
    problem: "Creating a proposal requires pulling job details, writing scope, calculating pricing, and formatting a document. This takes 2-3 hours per proposal during your busiest periods.",
    fix: "Proposal templates pre-populate from job details. Standard pricing applies automatically. Custom variations are flagged for human review. First draft is ready in minutes.",
    scenario: "A homeowner requests a quote on Monday. By Monday afternoon they have your detailed proposal. Your competitor sends theirs Thursday. You have already won the job.",
    howItWorks: ["Quote request received", "Job details entered once into your system", "Template auto-populates with details and pricing", "Custom items flagged for human pricing review", "Proposal sent with online acceptance option"],
  },
  "invoicing-payments": {
    problem: "Invoices get created late, sent late, or forgotten entirely after work is delivered. Payment follow-up depends on who remembers to check. Cash flow is unpredictable.",
    fix: "Invoices are generated automatically when milestones are completed. Payment reminders run on a schedule. Overdue accounts are escalated without manual intervention.",
    scenario: "You finish a job on Friday. Instead of creating the invoice on Monday (or Thursday), it is sent Friday afternoon while the work is fresh in the client's mind.",
    howItWorks: ["Job marked complete in your system", "Invoice generated automatically from job details", "Sent to client with payment link", "Reminders at 7, 14, and 21 days if unpaid", "Overdue accounts escalated to your team"],
  },
  "customer-support": {
    problem: "Your team answers the same questions repeatedly — hours, pricing, process, what to bring. This occupies time that could go to high-value work.",
    fix: "An automated FAQ system handles routine questions around the clock. Complex questions are escalated to a human with full context already captured.",
    scenario: "A client emails at 7pm asking what documents to bring. They receive an accurate, helpful response in 60 seconds. Your team reads it in the morning as a completed interaction.",
    howItWorks: ["Client submits question via chat, email, or form", "System checks FAQ knowledge base", "Routine questions answered automatically", "Complex questions routed to human with full context", "Repeated new questions added to knowledge base"],
  },
  "internal-updates": {
    problem: "Your team spends time updating each other on job status, client progress, and next steps via Slack, text, and ad hoc conversations. Things fall through the cracks.",
    fix: "Status updates are automated based on actions in your system. The right people are notified when things happen, without needing to chase for updates.",
    scenario: "A document is received. Your colleague is automatically notified. A job is completed. Your admin receives the handoff immediately. No Slack thread required.",
    howItWorks: ["Trigger event occurs in your system", "Relevant team member notified with context", "Required action is clear and timestamped", "Confirmation captured when action is taken", "Full audit trail maintained automatically"],
  },
  "reporting": {
    problem: "Your monthly or weekly report takes hours to compile — pulling numbers from multiple places, copying into a spreadsheet, formatting, and hoping nothing is wrong.",
    fix: "Data is pulled automatically from your systems, formatted consistently, and delivered to your inbox ready for review. You add commentary. The numbers are already there.",
    scenario: "It is the last day of the month. Instead of spending your evening on numbers, your report arrives in your inbox at 8am complete. You add three sentences and send it.",
    howItWorks: ["Scheduled trigger runs at your frequency", "Data pulled from your tools via API", "Report formatted automatically", "Delivered for your review and commentary", "Approved and sent to stakeholders"],
  },
  "review-requests": {
    problem: "Happy clients leave reviews when you ask in person, then forget. Unhappy clients post immediately. Your online reputation does not reflect the actual quality of your work.",
    fix: "Review requests are sent automatically after a positive service interaction. The timing and channel are set once and run for every completed job.",
    scenario: "You finish a great appointment. Three hours later, your client gets a friendly message asking for their Google review. 40% click. Your rating climbs from 4.1 to 4.7 in three months.",
    howItWorks: ["Appointment or job marked complete", "Optional satisfaction check sent", "Review request sent 2-4 hours after completion", "Link directed to Google or Facebook", "Unhappy clients routed to internal feedback"],
  },
  "scheduling-reminders": {
    problem: "No-shows cost you a full appointment slot and the revenue that goes with it. Last-minute cancellations with no replacement are nearly as bad. Most could have been prevented.",
    fix: "Reminders go out 48 hours and 2 hours before every appointment. Clients can confirm or reschedule directly. Cancelled slots trigger your waitlist automatically.",
    scenario: "48 appointments per week at a 20% no-show rate is 10 empty slots per week. Reminders reduce this by 60-70%. That is 6-7 recovered slots every single week.",
    howItWorks: ["Appointment booked in your system", "Reminder sent 48 hours before", "Second reminder sent 2 hours before", "Client can confirm or reschedule from the reminder", "Cancelled slots trigger waitlist notifications"],
  },
};

// ── Industry label helper ────────────────────────────────────────────────────
function getIndustryLabel(industry: string | null): string {
  if (!industry) return "your business";
  return INDUSTRY_MAP[industry]?.label ?? industry.replace(/-/g, " ");
}

// ── JARGON map ────────────────────────────────────────────────────────────────
const JARGON: Record<string, string> = {
  "CRM record": "A digital file for this client in your customer database — created automatically with all the information they provided.",
  "trigger-action workflow": "When one thing happens (like a new enquiry), another thing happens automatically (like a response being sent). No manual step required.",
  "AI categorisation": "The system reads the enquiry and sorts it into the right category automatically — like a receptionist who knows which consultant handles which type of case.",
  escalation: "If the system encounters something it cannot handle, it alerts a human with all the context needed to take over immediately.",
  "knowledge base": "A library of standard answers to common questions. The system searches it automatically to respond to routine enquiries.",
};

// ── Hero opportunity card (Section 3) ────────────────────────────────────────
function HeroOpportunityCard({ opp, state, onCTA }: {
  opp: Opportunity;
  state: PlannerState;
  onCTA: () => void;
}) {
  const story = STORIES[opp.workflowId];
  const industryLabel = getIndustryLabel(state.industry);
  const toolNames = state.tools.slice(0, 2).join(" and ") || "your existing tools";

  const beforeAfterBullets: [string, string][] = {
    "inbound-enquiries": [["Response time", "Hours/days → Under 90 seconds"], ["After-hours coverage", "0% → 100% automated"], ["Lead record creation", "Manual → Instant and automatic"]],
    "phone-calls": [["Missed call rate", "30–50% during busy periods → Near zero"], ["After-hours booking", "Unavailable → 24/7 self-service"]],
    "lead-qualification": [["Time on unqualified calls", "High → Near zero"], ["Response to qualified leads", "Days → Same day"]],
    "appointment-booking": [["Time to book", "Days of back-and-forth → Under 3 minutes"], ["No-shows", "High → 40–60% reduction with reminders"]],
    "follow-up": [["Follow-up consistency", "Depends on memory → 100% automated"], ["Leads lost to no follow-up", "Regular → Near zero"]],
    "client-onboarding": [["Onboarding time", "1–2 weeks → 24–48 hours"], ["Staff time per onboarding", "3–5 hours → 30 min (review only)"]],
    "document-collection": [["Collection time", "2–4 weeks → 3–5 days"], ["Manual reminder time", "2–3 hrs/file → Zero"]],
    "estimates-proposals": [["Proposal creation time", "2–3 hours → 20–30 minutes"], ["Response to quote requests", "2–5 days → Same day"]],
    "invoicing-payments": [["Invoice creation delay", "3–14 days → Instant on completion"], ["Days to payment", "Reduced with consistent automated follow-up"]],
    "customer-support": [["Routine enquiry handling", "Manual → Automated 24/7"], ["Staff time on repeat questions", "5–10 hrs/week → Near zero"]],
    "internal-updates": [["Time on status conversations", "3–5 hrs/week → Near zero"], ["Missed handoffs", "Regular → Eliminated"]],
    "reporting": [["Report preparation time", "4–8 hours → Under 30 minutes"], ["Delivery consistency", "Variable → Always on time"]],
    "review-requests": [["Review request coverage", "10–15% of clients → 80–90%"], ["Review volume", "Low → Consistent growth"]],
    "scheduling-reminders": [["No-show rate", "15–25% → 5–8%"], ["Revenue lost to no-shows", "Significant → Substantially reduced"]],
  }[opp.workflowId] ?? [["Before automation", "Manual, time-consuming"], ["After automation", "Automated and consistent"]];

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #1A2464 0%, #283891 100%)",
        borderRadius: 20, padding: "40px 36px",
        boxShadow: "0 8px 40px rgba(40,56,145,0.25)",
      }}
    >
      {/* Badge */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        <span style={{ background: BURGUNDY, color: "white", borderRadius: 20, padding: "5px 14px", fontSize: 12, fontWeight: 700, letterSpacing: "0.04em" }}>
          ⚡ Start Here — Quick Win
        </span>
        <span style={{ background: "rgba(255,255,255,0.15)", color: "#C4D0F5", borderRadius: 20, padding: "5px 14px", fontSize: 12, fontWeight: 600 }}>
          Phase 1
        </span>
      </div>

      {/* Headline */}
      <h2 style={{ margin: "0 0 28px", fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)", fontWeight: 800, color: "white", lineHeight: 1.2 }}>
        {opp.name}
      </h2>

      {/* 3-part story */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 28 }}>
        {/* The Problem */}
        <div style={{ borderLeft: "3px solid rgba(255,255,255,0.2)", paddingLeft: 16 }}>
          <p style={{ margin: "0 0 6px", fontSize: 11, fontWeight: 700, color: BURGUNDY, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            The Problem
          </p>
          <p style={{ margin: 0, fontSize: 14, color: "#C4D0F5", lineHeight: 1.65 }}>
            {story?.problem ?? opp.description}
          </p>
        </div>

        {/* The Fix */}
        <div style={{ borderLeft: "3px solid rgba(255,255,255,0.2)", paddingLeft: 16 }}>
          <p style={{ margin: "0 0 6px", fontSize: 11, fontWeight: 700, color: "#6EE7B7", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            The Fix
          </p>
          <p style={{ margin: 0, fontSize: 14, color: "#C4D0F5", lineHeight: 1.65 }}>
            {story
              ? story.fix.replace("your CRM", toolNames !== "your existing tools" ? toolNames : "your CRM")
              : opp.estimatedImpact}
          </p>
        </div>

        {/* What Changes — mini before/after */}
        <div style={{ borderLeft: "3px solid rgba(255,255,255,0.2)", paddingLeft: 16 }}>
          <p style={{ margin: "0 0 10px", fontSize: 11, fontWeight: 700, color: "#93C5FD", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            What Changes
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {beforeAfterBullets.map(([label, change]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#E0E7FF", minWidth: 140 }}>{label}:</span>
                <span style={{ fontSize: 13, color: "#93C5FD", lineHeight: 1.4 }}>{change}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scenario — "sounds like me" */}
      {story && (
        <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 10, padding: "14px 16px", marginBottom: 28 }}>
          <p style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 700, color: "#A5B4FC", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Sound familiar?
          </p>
          <p style={{ margin: 0, fontSize: 13, color: "#C4D0F5", lineHeight: 1.6, fontStyle: "italic" }}>
            "{story.scenario}"
          </p>
        </div>
      )}

      {/* CTAs */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button
          onClick={onCTA}
          style={{
            padding: "13px 24px", borderRadius: 8, border: "none",
            background: BURGUNDY, color: "white", fontSize: 14, fontWeight: 700,
            cursor: "pointer", transition: "background 0.15s",
          }}
          onMouseEnter={(e) => { (e.target as HTMLElement).style.background = "#6a0c3e"; }}
          onMouseLeave={(e) => { (e.target as HTMLElement).style.background = BURGUNDY; }}
        >
          Book a Strategy Call About This
        </button>
        <p style={{ margin: "auto 0", fontSize: 12, color: "#8FA4E8" }}>
          30 minutes. We have already seen your results.
        </p>
      </div>
    </div>
  );
}

// ── Accordion opportunity card (Section 4) ───────────────────────────────────
const CLASS_CONFIG: Record<string, { label: string; bg: string; color: string }> = {
  "quick-win": { label: "Quick Win", bg: "#ECFDF5", color: GREEN },
  "strong-next": { label: "Strong Next", bg: "#EEF1FA", color: NAVY },
  "careful-design": { label: "Needs Planning", bg: "#FFFBEB", color: AMBER },
  "keep-human": { label: "Keep Human", bg: "#F3F4F6", color: GREY },
};

function AccordionOpportunityCard({ opp, isOpen, onToggle, state }: {
  opp: Opportunity; isOpen: boolean; onToggle: () => void; state: PlannerState;
}) {
  const cls = CLASS_CONFIG[opp.classification] ?? CLASS_CONFIG["strong-next"];
  const story = STORIES[opp.workflowId];
  const [showFlow, setShowFlow] = useState(false);

  return (
    <div
      style={{
        background: opp.phase === 1 ? "white" : "#F7F8FC",
        border: `1.5px solid ${opp.phase === 1 ? "#C4CCE8" : "#E2E4ED"}`,
        borderRadius: 14, overflow: "hidden",
        boxShadow: opp.phase === 1 ? "0 2px 12px rgba(40,56,145,0.07)" : "none",
        transition: "box-shadow 0.2s",
      }}
    >
      {/* Header — always visible */}
      <button
        onClick={onToggle}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "18px 20px", background: "none", border: "none", cursor: "pointer",
          gap: 12, textAlign: "left",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: NAVY, background: "#EEF1FA", padding: "3px 10px", borderRadius: 20, whiteSpace: "nowrap" }}>
            Phase {opp.phase}
          </span>
          <span style={{ fontSize: 11, fontWeight: 700, color: cls.color, background: cls.bg, padding: "3px 10px", borderRadius: 20, whiteSpace: "nowrap" }}>
            {cls.label}
          </span>
          <span style={{ fontSize: 15, fontWeight: 700, color: DARK, lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {opp.name}
          </span>
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
          <path d="M6 9l6 6 6-6" stroke={GREY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* One-liner preview (collapsed) */}
      {!isOpen && (
        <div style={{ padding: "0 20px 14px", fontSize: 13, color: GREY, lineHeight: 1.5 }}>
          {opp.description.split(".")[0]}.
        </div>
      )}

      {/* Expanded content */}
      {isOpen && (
        <div style={{ padding: "0 20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          {story && (
            <>
              <div>
                <p style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 700, color: BURGUNDY, textTransform: "uppercase", letterSpacing: "0.08em" }}>The Problem</p>
                <p style={{ margin: 0, fontSize: 14, color: "#4B5563", lineHeight: 1.65 }}>{story.problem}</p>
              </div>
              <div>
                <p style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 700, color: GREEN, textTransform: "uppercase", letterSpacing: "0.08em" }}>The Fix</p>
                <p style={{ margin: 0, fontSize: 14, color: "#4B5563", lineHeight: 1.65 }}>{story.fix}</p>
              </div>
              <div>
                <p style={{ margin: "0 0 8px", fontSize: 11, fontWeight: 700, color: NAVY, textTransform: "uppercase", letterSpacing: "0.08em" }}>Sounds familiar?</p>
                <p style={{ margin: 0, fontSize: 13, color: GREY, lineHeight: 1.6, fontStyle: "italic", padding: "10px 14px", background: "#F7F8FC", borderRadius: 8 }}>
                  "{story.scenario}"
                </p>
              </div>
            </>
          )}

          <div>
            <p style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 700, color: GREY, textTransform: "uppercase", letterSpacing: "0.08em" }}>Estimated impact</p>
            <p style={{ margin: 0, fontSize: 14, color: DARK, fontWeight: 600 }}>{opp.estimatedImpact}</p>
          </div>

          {/* How does this work? (expandable) */}
          {story && (
            <div>
              <button
                onClick={() => setShowFlow((v) => !v)}
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer", fontSize: 13, color: NAVY, fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 3 }}
              >
                {showFlow ? "Hide" : "How does this actually work?"}
              </button>
              {showFlow && (
                <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                  {story.howItWorks.map((step, i) => (
                    <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div style={{ width: 22, height: 22, borderRadius: "50%", background: i === 0 ? AMBER : i === story.howItWorks.length - 1 ? GREEN : NAVY, color: "white", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                        {i + 1}
                      </div>
                      <span style={{ fontSize: 13, color: "#4B5563", lineHeight: 1.5, paddingTop: 3 }}>{step}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Interactive roadmap (Section 6) ──────────────────────────────────────────
function InteractiveRoadmap({ phase1, phase2, phase3 }: { phase1: Opportunity[]; phase2: Opportunity[]; phase3: Opportunity[] }) {
  const [activePhase, setActivePhase] = useState<1 | 2 | 3>(1);

  const phases = [
    { key: 1 as const, label: "Immediate Wins", timeframe: "Weeks 1–3", items: phase1, icon: "⚡", color: NAVY, involvement: "60-minute audit + 30-minute training session" },
    { key: 2 as const, label: "Operational Improvements", timeframe: "Weeks 4–8", items: phase2, icon: "⚙️", color: "#4B61B8", involvement: "Brief check-in to confirm Phase 1 performance" },
    { key: 3 as const, label: "Connected Systems", timeframe: "Weeks 9–16", items: phase3, icon: "🔗", color: GREY, involvement: "Review session once Phase 1 and 2 are proven" },
  ];

  const active = phases.find((p) => p.key === activePhase)!;

  return (
    <div>
      {/* Phase selector — horizontal on desktop, tabs */}
      <div style={{ display: "flex", gap: 0, marginBottom: 24, borderRadius: 12, overflow: "hidden", border: "1.5px solid #E2E4ED" }}>
        {phases.map((ph, i) => (
          <button
            key={ph.key}
            onClick={() => setActivePhase(ph.key)}
            style={{
              flex: 1, padding: "14px 12px", border: "none", cursor: "pointer",
              background: activePhase === ph.key ? NAVY : "white",
              color: activePhase === ph.key ? "white" : GREY,
              borderRight: i < 2 ? "1.5px solid #E2E4ED" : "none",
              transition: "all 0.15s", textAlign: "center",
            }}
          >
            <div style={{ fontSize: 18, marginBottom: 4 }}>{ph.icon}</div>
            <div style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.2 }}>Phase {ph.key}</div>
            <div style={{ fontSize: 11, opacity: 0.75, marginTop: 2 }}>{ph.timeframe}</div>
          </button>
        ))}
      </div>

      {/* Expanded phase detail */}
      <div style={{ background: "#F7F9FC", borderRadius: 12, padding: "24px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <span style={{ fontSize: 22 }}>{active.icon}</span>
          <div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: DARK }}>Phase {active.key}: {active.label}</h3>
            <span style={{ fontSize: 12, color: GREY }}>{active.timeframe}</span>
          </div>
        </div>

        {active.items.length > 0 ? (
          <>
            <p style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, color: GREY, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              What gets automated
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
              {active.items.map((opp) => (
                <div key={opp.id} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: active.color, flexShrink: 0, marginTop: 6 }} />
                  <div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: DARK }}>{opp.name}</span>
                    <span style={{ fontSize: 13, color: GREY }}> — {opp.estimatedImpact}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p style={{ margin: "0 0 16px", fontSize: 14, color: GREY, fontStyle: "italic" }}>No items mapped to this phase yet.</p>
        )}

        <div style={{ borderTop: "1.5px solid #E2E4ED", paddingTop: 14, marginTop: 4 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: GREY }}>Your involvement: </span>
          <span style={{ fontSize: 12, color: DARK }}>{active.involvement}</span>
        </div>
      </div>

      <p style={{ margin: "16px 0 0", fontSize: 13, color: GREY, lineHeight: 1.6, fontStyle: "italic" }}>
        You do not need to commit to all three phases. Most businesses start with Phase 1, see the results, and decide from there.
      </p>
    </div>
  );
}

// ── Cost metric card ──────────────────────────────────────────────────────────
function CostCard({ icon, headline, subtext, trigger, tint }: {
  icon: string; headline: React.ReactNode; subtext: string; trigger: boolean; tint: string;
}) {
  return (
    <div style={{ background: tint, borderRadius: 14, padding: "24px 20px", border: `1.5px solid ${tint === "#FFF5F5" ? "#FECACA" : tint === "#FFF8F0" ? "#FED7AA" : "#E2E4ED"}` }}>
      <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
      <div style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: DARK, lineHeight: 1.1, marginBottom: 8 }}>
        {headline}
      </div>
      <p style={{ margin: 0, fontSize: 13, color: GREY, lineHeight: 1.65 }}>{subtext}</p>
    </div>
  );
}

// ── Main PlannerResults component ─────────────────────────────────────────────
interface Props {
  state: PlannerState;
  onRestart?: () => void;
}

export default function PlannerResults({ state, onRestart }: Props) {
  const scoringState = { ...state, currentStep: 9 };
  const results = usePlannerScoring(scoringState);
  const [isLeadSubmitted, setIsLeadSubmitted] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const leadFormRef = useRef<HTMLDivElement>(null);
  const costSectionRef = useRef<HTMLDivElement>(null);
  const { ref: costRef, inView: costInView } = useInView(0.2);

  // Derive volume numbers with defaults
  const adminHrs = state.volume.adminHoursPerWeek ?? 12;
  const enquiries = state.volume.enquiriesPerWeek ?? 8;
  const clients = state.volume.activeClientsPerMonth ?? 15;
  const annualAdminHrs = adminHrs * 52;
  const annualAdminCost = Math.round(annualAdminHrs * 30);
  const missedLeads = Math.round(enquiries * 0.2);
  const additionalCapacity = Math.round(clients * 0.25);

  const GHL_WEBHOOK = "https://services.leadconnectorhq.com/hooks/TJN9sRuDhSQqi5ra6peh/webhook-trigger/b3af7557-ff3f-4c10-a88e-d95fb0b78b0f";

  const handleLeadSubmit = async (email: string, businessName: string, name: string, notes: string) => {
    setIsLeadSubmitted(true);
    try {
      await fetch(GHL_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: name.split(" ")[0] || "",
          last_name: name.split(" ").slice(1).join(" ") || "",
          full_name: name,
          email,
          company_name: businessName,
          // Planner results summary
          industry: state.industry || "",
          role: state.role || "",
          workflows: (state.workflows || []).join(", "),
          pain_points: (state.painPoints || []).join(", "),
          tools: (state.tools || []).join(", "),
          notes: notes || "",
          // Computed results
          top_opportunity: results?.opportunities?.[0]?.name || "",
          estimated_annual_savings: `$${Math.round((results?.totalAnnualSavings || 0) / 1000)}K`,
          estimated_hours_saved: `${results?.totalWeeklyHours || 0} hrs/week`,
          // Tracking
          source: "barrana.ai",
          form_name: "Automation Planner Results",
          page_url: window.location.href,
          submitted_at: new Date().toISOString(),
          tags: ["website-lead", "planner-completion", (state.industry || "").toLowerCase().replace(/\s+/g, "-")],
        }),
      });
    } catch { /* silent — don't block UX */ }
  };

  const scrollToLeadForm = () => {
    leadFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!results) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 300, gap: 16 }}>
        <div style={{ width: 40, height: 40, border: "3px solid #E2E4ED", borderTop: `3px solid ${NAVY}`, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <p style={{ fontSize: 14, color: GREY, margin: 0 }}>Calculating your results…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const sortedOpps = [...results.opportunities].sort((a, b) => b.score - a.score);
  const heroOpp = results.suggestedStart ?? sortedOpps[0];
  const remainingOpps = sortedOpps.filter((o) => o.id !== heroOpp?.id).slice(0, 4);
  const industryLabel = getIndustryLabel(state.industry);
  const topPain = state.painPoints[0]?.replace(/-/g, " ") ?? "admin overhead";
  const toolsList = state.tools.slice(0, 3).join(", ") || "your tools";

  // Before/after metrics for Section 7
  const beforeAfterMetrics = [
    { label: "Admin hours/week", before: `${adminHrs} hours`, after: `${Math.round(adminHrs * 0.45)} hours`, beforeW: 85, afterW: Math.round(85 * 0.45) },
    { label: "Response time", before: "Hours or more", after: "Under 5 min", beforeW: 90, afterW: 12 },
    { label: "Follow-up consistency", before: "Inconsistent", after: "100% automated", beforeW: 35, afterW: 90 },
    { label: "Client capacity", before: `${clients} clients`, after: `${clients + additionalCapacity} clients`, beforeW: 55, afterW: Math.min(55 + 25, 90) },
  ];

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 16px 80px", display: "flex", flexDirection: "column", gap: 0 }}>

      {/* ── SECTION 1: Business Snapshot ──────────────────────────────────── */}
      <FadeIn delay={0}>
        <div style={{ background: "white", borderRadius: 16, border: "1.5px solid #E2E4ED", padding: "28px 24px", marginBottom: 20 }}>
          <p style={{ margin: "0 0 6px", fontSize: 11, fontWeight: 700, color: BURGUNDY, textTransform: "uppercase", letterSpacing: "0.12em" }}>
            Your Business Snapshot
          </p>
          <h2 style={{ margin: "0 0 20px", fontSize: 20, fontWeight: 800, color: DARK, lineHeight: 1.2 }}>
            Here is what we understood about your business
          </h2>

          {/* Pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
            <Pill icon="🏢" text={industryLabel} />
            {state.teamSize && <Pill icon="👥" text={`${state.teamSize} people`} />}
            <Pill icon="⚙️" text={`${state.selectedWorkflows.length} workflows mapped`} />
            {state.painPoints[0] && <Pill icon="⚠️" text={`Top pain: ${topPain}`} highlight />}
            {state.tools.length > 0 && <Pill icon="🛠️" text={`Uses ${toolsList}`} />}
            {state.volume.adminHoursPerWeek && <Pill icon="⏱️" text={`${state.volume.adminHoursPerWeek} hrs/week admin`} />}
          </div>

          <p style={{ margin: 0, fontSize: 15, color: "#4B5563", lineHeight: 1.7, borderTop: "1.5px solid #F0F2F9", paddingTop: 16 }}>
            Based on your inputs, we identified <strong style={{ color: NAVY }}>{sortedOpps.length} automation {sortedOpps.length === 1 ? "opportunity" : "opportunities"}</strong> for your {industryLabel.toLowerCase()}.
          </p>
        </div>
      </FadeIn>

      {/* ── SECTION 2: What This Is Costing You ──────────────────────────── */}
      <FadeIn delay={0.1}>
        <div ref={costRef} style={{ marginBottom: 20 }}>
          <div style={{ marginBottom: 16 }}>
            <p style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 700, color: BURGUNDY, textTransform: "uppercase", letterSpacing: "0.12em" }}>
              What This Is Costing You
            </p>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: DARK, lineHeight: 1.2 }}>
              The cost of your current operations — in real numbers
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
            <CostCard
              icon="⏱️"
              trigger={costInView}
              tint="#FFF5F5"
              headline={
                <><AnimCount value={adminHrs} trigger={costInView} /> hrs/week</>
              }
              subtext={`Spent on repetitive admin. That is ${annualAdminHrs.toLocaleString()} hours per year — at $30/hr staff cost, that is $${annualAdminCost.toLocaleString()}/year on tasks that generate zero revenue.`}
            />
            <CostCard
              icon="📉"
              trigger={costInView}
              tint="#FFF8F0"
              headline={
                <><AnimCount value={missedLeads} trigger={costInView} />+ leads/week at risk</>
              }
              subtext={`Research shows responding after 5 minutes reduces contact rates by over 80%. If even 20% of your enquiries go unanswered, that compounds every week.`}
            />
            <CostCard
              icon="📈"
              trigger={costInView}
              tint="#F0FFF4"
              headline={
                <><AnimCount value={additionalCapacity} trigger={costInView} /> more clients possible</>
              }
              subtext={`Businesses that automate their coordination layer typically handle 20–30% more volume with the same team — without hiring.`}
            />
          </div>
        </div>
      </FadeIn>

      {/* ── SECTION 3: #1 Opportunity ─────────────────────────────────────── */}
      {heroOpp && (
        <FadeIn delay={0.15}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ marginBottom: 14 }}>
              <p style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 700, color: BURGUNDY, textTransform: "uppercase", letterSpacing: "0.12em" }}>
                Your #1 Opportunity
              </p>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: DARK, lineHeight: 1.2 }}>
                Start here
              </h2>
            </div>
            <HeroOpportunityCard opp={heroOpp} state={state} onCTA={scrollToLeadForm} />
          </div>
        </FadeIn>
      )}

      {/* ── SECTION 4: More Opportunities ────────────────────────────────── */}
      {remainingOpps.length > 0 && (
        <FadeIn delay={0.2}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ marginBottom: 14 }}>
              <p style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 700, color: NAVY, textTransform: "uppercase", letterSpacing: "0.12em" }}>
                More Opportunities
              </p>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: DARK, lineHeight: 1.2 }}>
                Additional automation your business is ready for
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {remainingOpps.map((opp) => (
                <AccordionOpportunityCard
                  key={opp.id}
                  opp={opp}
                  state={state}
                  isOpen={openAccordion === opp.id}
                  onToggle={() => setOpenAccordion(openAccordion === opp.id ? null : opp.id)}
                />
              ))}
            </div>
          </div>
        </FadeIn>
      )}

      {/* ── SECTION 5: Your Control Points ───────────────────────────────── */}
      {results.humanLedItems.length > 0 && (
        <FadeIn delay={0.25}>
          <div style={{ background: "#F0F4FF", borderRadius: 16, border: `1.5px solid #C4CCE8`, padding: "28px 24px", marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: NAVY, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L4 7v5c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V7L12 2Z" fill="white" fillOpacity={0.2} stroke="white" strokeWidth="1.5" />
                  <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p style={{ margin: "0 0 2px", fontSize: 11, fontWeight: 700, color: NAVY, textTransform: "uppercase", letterSpacing: "0.1em" }}>Your Control Points</p>
                <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: DARK }}>You keep control of:</h2>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {results.humanLedItems.map((item) => (
                <div key={item.label} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: NAVY, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l2.5 2.5L10 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <div>
                    <p style={{ margin: "0 0 3px", fontSize: 14, fontWeight: 700, color: DARK }}>{item.label}</p>
                    <p style={{ margin: 0, fontSize: 13, color: GREY, lineHeight: 1.55 }}>{item.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1.5px solid #C4CCE8`, fontSize: 13, color: "#4B5563", lineHeight: 1.6 }}>
              Every Barrana automation system includes{" "}
              <JargonTip term="governance" tip="Rules built into the system that stop it from doing the wrong thing. Approval gates, stop-loss logic, and escalation paths are all part of governance." />
              : stop-loss logic, approval gates, and human{" "}
              <JargonTip term="escalation" tip="If the system encounters something it cannot handle, it alerts a human with all the context needed to take over immediately." />
              {" "}paths. Nothing runs without boundaries.
            </div>
          </div>
        </FadeIn>
      )}

      {/* ── SECTION 6: Implementation Roadmap ────────────────────────────── */}
      <FadeIn delay={0.3}>
        <div style={{ background: "white", borderRadius: 16, border: "1.5px solid #E2E4ED", padding: "28px 24px", marginBottom: 20 }}>
          <div style={{ marginBottom: 20 }}>
            <p style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 700, color: BURGUNDY, textTransform: "uppercase", letterSpacing: "0.12em" }}>
              Implementation Roadmap
            </p>
            <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 800, color: DARK }}>Your path from here to running</h2>
          </div>
          <InteractiveRoadmap phase1={results.roadmap.phase1} phase2={results.roadmap.phase2} phase3={results.roadmap.phase3} />
        </div>
      </FadeIn>

      {/* ── SECTION 6b: Complexity ────────────────────────────────────────── */}
      <FadeIn delay={0.33}>
        <div style={{ background: "#F7F9FC", borderRadius: 16, border: "1.5px solid #E2E4ED", padding: "28px 24px", marginBottom: 20, textAlign: "center" }}>
          <p style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 700, color: BURGUNDY, textTransform: "uppercase", letterSpacing: "0.12em" }}>
            Implementation Complexity
          </p>
          <h2 style={{ margin: "0 0 20px", fontSize: 20, fontWeight: 800, color: DARK }}>How straightforward is your build?</h2>
          <ComplexityGauge level={results.complexity} />
        </div>
      </FadeIn>

      {/* ── SECTION 7: Before / After ─────────────────────────────────────── */}
      <FadeIn delay={0.35}>
        <div style={{ background: "white", borderRadius: 16, border: "1.5px solid #E2E4ED", padding: "28px 24px", marginBottom: 20 }}>
          <p style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 700, color: BURGUNDY, textTransform: "uppercase", letterSpacing: "0.12em" }}>
            What Changes for Your Business
          </p>
          <h2 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 800, color: DARK }}>Your before and after</h2>
          <p style={{ margin: "0 0 24px", fontSize: 14, color: GREY, lineHeight: 1.6 }}>
            Based on your inputs and typical outcomes from similar {industryLabel.toLowerCase()} implementations.
          </p>
          <BeforeAfterSection metrics={beforeAfterMetrics} />
          <p style={{ margin: "18px 0 0", fontSize: 12, color: "#9CA3AF", lineHeight: 1.5 }}>
            Estimates are indicative. Actual results depend on implementation quality, staff adoption, and your specific workflows. A Barrana Automation Audit provides precise projections.
          </p>
        </div>
      </FadeIn>

      {/* ── SECTION 8: Get Your Plan ──────────────────────────────────────── */}
      <FadeIn delay={0.4}>
        <div
          ref={leadFormRef}
          style={{
            background: "linear-gradient(135deg, #1A2464 0%, #283891 100%)",
            borderRadius: 20, padding: "40px 28px",
            marginBottom: 20, boxShadow: "0 8px 40px rgba(40,56,145,0.2)",
          }}
        >
          <p style={{ margin: "0 0 6px", fontSize: 11, fontWeight: 700, color: "#8FA4E8", textTransform: "uppercase", letterSpacing: "0.12em" }}>
            Get Your Detailed Plan
          </p>
          <h2 style={{ margin: "0 0 8px", fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)", fontWeight: 800, color: "white" }}>
            Two ways to move forward
          </h2>
          <p style={{ margin: "0 0 28px", fontSize: 14, color: "#A3B4E8", lineHeight: 1.6 }}>
            Your results are saved. Choose whichever path makes sense for where you are right now.
          </p>

          {/* Two cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16, marginBottom: 28 }}>
            {/* Lead capture card */}
            <div style={{ background: "white", borderRadius: 16, padding: "28px 24px" }}>
              <p style={{ margin: "0 0 6px", fontSize: 12, fontWeight: 700, color: BURGUNDY, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Option A
              </p>
              <h3 style={{ margin: "0 0 8px", fontSize: 17, fontWeight: 800, color: DARK }}>
                Get Your Custom Automation Map
              </h3>
              <p style={{ margin: "0 0 20px", fontSize: 14, color: GREY, lineHeight: 1.6 }}>
                We will create a detailed plan based on your results — specific workflows, tool recommendations, timelines, and investment ranges. Delivered within 24 hours.
              </p>
              <LeadCaptureForm
                state={state}
                onSubmit={handleLeadSubmit}
                isSubmitted={isLeadSubmitted}
              />
            </div>

            {/* Strategy call card */}
            <div style={{ background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.15)", borderRadius: 16, padding: "28px 24px", display: "flex", flexDirection: "column" }}>
              <p style={{ margin: "0 0 6px", fontSize: 12, fontWeight: 700, color: "#93C5FD", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Option B
              </p>
              <h3 style={{ margin: "0 0 8px", fontSize: 17, fontWeight: 800, color: "white" }}>
                Discuss Your Results With a Strategist
              </h3>
              <p style={{ margin: "0 0 auto", fontSize: 14, color: "#A3B4E8", lineHeight: 1.6 }}>
                Walk through your automation opportunities with a Barrana strategist. 30 minutes. No obligation. We have already seen your results — the call starts where the planner left off.
              </p>
              <div style={{ marginTop: 24 }}>
                <a
                  href="/contact"
                  style={{
                    display: "block", textAlign: "center", padding: "14px 24px",
                    borderRadius: 8, border: "2px solid white", color: "white",
                    fontSize: 15, fontWeight: 700, textDecoration: "none",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => { const el = e.currentTarget; el.style.background = "white"; el.style.color = NAVY; }}
                  onMouseLeave={(e) => { const el = e.currentTarget; el.style.background = "transparent"; el.style.color = "white"; }}
                >
                  Book a Strategy Call
                </a>
                <p style={{ margin: "10px 0 0", fontSize: 12, color: "#8FA4E8", textAlign: "center" }}>
                  30 minutes. Free. No pressure.
                </p>
              </div>
            </div>
          </div>

          {/* Share */}
          <div style={{ borderTop: "1.5px solid rgba(255,255,255,0.12)", paddingTop: 24 }}>
            <p style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, color: "#8FA4E8" }}>
              Share these results with your team or business partner:
            </p>
            <ShareResults state={state} />
          </div>
        </div>
      </FadeIn>

      {/* Restart */}
      {onRestart && (
        <div style={{ textAlign: "center", marginTop: 8 }}>
          <button
            onClick={onRestart}
            style={{ background: "none", border: "none", color: GREY, fontSize: 13, cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 2 }}
          >
            Start over
          </button>
        </div>
      )}
    </div>
  );
}
