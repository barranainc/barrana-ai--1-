/*
 * Home.tsx — Barrana.ai Homepage (V6 — Unified Rewrite)
 * Brand Colors (OFFICIAL):
 *   Navy:    #283891  (primary — nav, headings, CTAs, dark sections)
 *   Magenta: #7E0F4A  (accent — dollar amounts, highlights, badges)
 *   Grey:    #7B7B7B  (body text, secondary labels)
 *   Dark:    #1A1A2E  (headings on light backgrounds)
 *   Offwhite: #F5F6FA (section backgrounds)
 *   Border:  #E2E4ED
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight, Search, CheckCircle, Clock,
  FileText,
  HardHat,
  Calculator,
  Stethoscope,
  Scale,
  Building2,
  Smile,
  Shield,
  Activity,
  Sparkles,
  PhoneCall,
  CalendarX,
  DollarSign,
  Zap,
  Receipt,
  Award,
  Tag,
  Plug,
  MapPin,
  Monitor,
  Globe,
  Megaphone,
  Map,
  Settings,
  Calendar,
  Layers,
  ClipboardList,
  type LucideIcon,
} from "lucide-react";
import HomepagePlannerCTA from "@/components/planner-cta/HomepagePlannerCTA";

// Hero tab visuals
import HeroYourDayVisual from "@/components/diagrams/HeroYourDayVisual";
import HeroPlannerPreview from "@/components/diagrams/HeroPlannerPreview";
import HeroAuditCard from "@/components/diagrams/HeroAuditCard";

// Schema
import JsonLd from "@/components/JsonLd";

// Diagram components
import HeroArchitectureVisual from "@/components/diagrams/HeroArchitectureVisual";
import SocialProofToast from "@/components/diagrams/SocialProofToast";
import ObjectionCards from "@/components/diagrams/ObjectionCards";
import MethodTimeline from "@/components/diagrams/MethodTimeline";

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

// ─── Animated Counter ─────────────────────────────────────────────────
function AnimatedCounter({ target, prefix = "", suffix = "", duration = 1800 }: {
  target: number; prefix?: string; suffix?: string; duration?: number;
}) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useReveal(0.1);
  useEffect(() => {
    if (!visible) return;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, target, duration]);
  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

// ─── Industry workflow data ───────────────────────────────────────────
type IndustryTab = {
  id: string; label: string; icon: LucideIcon;
  headline: string; steps: string[];
  badgeLabel: string; badgeBefore: string; badgeAfter: string;
  copy: string; tasks: string[];
};

const INDUSTRY_TABS: IndustryTab[] = [
  {
    id: "immigration",
    label: "Immigration",
    icon: FileText,
    headline: "From inquiry to consultation without manual intake chaos",
    steps: [
      "A new inquiry comes in by phone, form, or email",
      "Key client intake details are collected automatically",
      "The inquiry is tagged by service or visa type",
      "A client record is created in the CRM",
      "The right consultant is notified",
      "A checklist or next-steps email is sent",
      "The client is prompted to book a consultation",
    ],
    badgeLabel: "Intake admin",
    badgeBefore: "45 min",
    badgeAfter: "5 min",
    copy: "Reduce back-and-forth during intake, keep inquiries organised, and help your team respond faster without manually sorting every new lead.",
    tasks: ["Intake collection", "Inquiry routing", "CRM updates", "Checklist delivery", "Booking prompts"],
  },
  {
    id: "contractor",
    label: "Contractors",
    icon: HardHat,
    headline: "Turn job inquiries into organised estimates faster",
    steps: [
      "New lead comes in from form, call, or message",
      "Service type and job details are captured",
      "Lead is logged in your system",
      "Request is routed to the right estimator or team member",
      "Estimate request or follow-up is sent automatically",
      "Site visit or call is booked",
    ],
    badgeLabel: "Lead handling",
    badgeBefore: "30 min",
    badgeAfter: "7 min",
    copy: "Stop losing leads in texts, emails, and missed calls. Capture job requests quickly and move prospects toward an estimate without admin delays.",
    tasks: ["Lead capture", "Job-type tagging", "Team routing", "Follow-up messages", "Estimate booking"],
  },
  {
    id: "accounting",
    label: "Accounting",
    icon: Calculator,
    headline: "Reduce time spent chasing clients for basic intake and documents",
    steps: [
      "A new client inquiry comes in",
      "Intake details are collected automatically",
      "Service type is tagged",
      "Client record is created",
      "Required document list is sent",
      "Follow-up reminders are triggered automatically",
      "Discovery call or appointment is booked",
    ],
    badgeLabel: "Admin follow-up",
    badgeBefore: "40 min",
    badgeAfter: "8 min",
    copy: "Spend less time repeating the same intake and document requests. Keep client onboarding moving without constant manual follow-up.",
    tasks: ["New client intake", "Service tagging", "CRM entry", "Document request emails", "Reminder sequences"],
  },
  {
    id: "clinic",
    label: "Medical Clinics",
    icon: Stethoscope,
    headline: "Handle inquiries and bookings without front-desk overload",
    steps: [
      "Patient inquiry comes in",
      "Contact and visit details are collected",
      "Request type is identified",
      "Record is updated or created",
      "Staff are notified when needed",
      "Booking link or next steps are sent",
      "Appointment gets scheduled faster",
    ],
    badgeLabel: "Front-desk admin",
    badgeBefore: "25 min",
    badgeAfter: "5 min",
    copy: "Reduce repetitive front-desk work, improve response speed, and make it easier for patients to move from inquiry to appointment.",
    tasks: ["Inquiry capture", "Request routing", "Patient record updates", "Appointment prompts", "Reminder messages"],
  },
  {
    id: "law",
    label: "Law Firms",
    icon: Scale,
    headline: "Route new matters properly before staff spend time on them",
    steps: [
      "New inquiry comes in",
      "Initial matter details are collected",
      "Request is tagged by practice area",
      "Contact record is created",
      "The right staff member is notified",
      "Intake instructions or next steps are sent",
      "Consultation request moves forward",
    ],
    badgeLabel: "Intake handling",
    badgeBefore: "35 min",
    badgeAfter: "6 min",
    copy: "Keep inquiries organised, reduce manual intake work, and ensure the right people see the right matters sooner.",
    tasks: ["New matter intake", "Practice-area tagging", "CRM record creation", "Team notification", "Consultation follow-up"],
  },
  {
    id: "real-estate",
    label: "Real Estate",
    icon: Building2,
    headline: "Capture buyer and seller inquiries before they go cold",
    steps: [
      "Inquiry comes in from site, ad, or form",
      "Contact and property interest details are collected",
      "Lead is tagged by intent",
      "CRM is updated automatically",
      "Agent or team member is notified",
      "Follow-up message is sent",
      "Viewing or consultation is booked",
    ],
    badgeLabel: "Lead response setup",
    badgeBefore: "20 min",
    badgeAfter: "4 min",
    copy: "Respond faster, reduce lead leakage, and keep your pipeline cleaner without manually managing every first touch.",
    tasks: ["Lead capture", "Buyer or seller tagging", "CRM updates", "Agent notification", "Booking prompts"],
  },
  {
    id: "dental",
    label: "Dental Offices",
    icon: Smile,
    headline: "Reduce missed calls and booking friction for new patients",
    steps: [
      "Patient inquiry comes in",
      "Contact and appointment details are collected",
      "Request type is identified",
      "Front-desk system is updated",
      "Booking link or next steps are sent",
      "Staff are notified if needed",
      "Appointment gets scheduled",
    ],
    badgeLabel: "Booking admin",
    badgeBefore: "20 min",
    badgeAfter: "4 min",
    copy: "Make it easier for patients to book while reducing repetitive front-desk tasks that slow your team down.",
    tasks: ["New patient intake", "Appointment request handling", "System updates", "Booking messages", "Reminder follow-ups"],
  },
  {
    id: "insurance",
    label: "Insurance Brokers",
    icon: Shield,
    headline: "Speed up intake and follow-up for policy inquiries",
    steps: [
      "New inquiry comes in",
      "Contact and policy need details are collected",
      "Request is tagged by product line",
      "Record is created in the system",
      "Broker or staff member is notified",
      "Required next steps are sent",
      "Consultation or call is booked",
    ],
    badgeLabel: "Inquiry processing",
    badgeBefore: "30 min",
    badgeAfter: "6 min",
    copy: "Reduce delays in intake and follow-up so your team can focus on client conversations instead of repetitive admin.",
    tasks: ["Intake capture", "Product-line tagging", "CRM updates", "Staff routing", "Booking follow-up"],
  },
  {
    id: "physio",
    label: "Physiotherapy",
    icon: Activity,
    headline: "Move patients from inquiry to assessment with less admin friction",
    steps: [
      "Patient inquiry comes in",
      "Contact and visit reason details are collected",
      "Request type is identified",
      "Record is updated or created",
      "Booking options are sent",
      "Staff are notified when necessary",
      "Assessment is booked",
    ],
    badgeLabel: "Admin handling",
    badgeBefore: "25 min",
    badgeAfter: "5 min",
    copy: "Reduce time spent on repetitive intake and help patients book faster without adding pressure to your front desk.",
    tasks: ["Intake collection", "Visit-type routing", "Record updates", "Booking links", "Staff notifications"],
  },
  {
    id: "cleaning",
    label: "Cleaning Companies",
    icon: Sparkles,
    headline: "Convert service requests into scheduled jobs faster",
    steps: [
      "New service request comes in",
      "Property and service details are collected",
      "Job type is tagged",
      "Lead record is created",
      "Team follow-up is triggered",
      "Quote or booking prompt is sent",
      "Job gets scheduled faster",
    ],
    badgeLabel: "Lead-to-booking admin",
    badgeBefore: "25 min",
    badgeAfter: "5 min",
    copy: "Keep service requests organised, reduce manual follow-up, and move leads toward quotes and bookings faster.",
    tasks: ["Request capture", "Job-type tagging", "Lead record creation", "Follow-up messages", "Booking prompts"],
  },
];

// ─── Six Problems data ────────────────────────────────────────────────
const PROBLEMS_LIST = [
  { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", title: "Leads Going Cold", desc: "A prospect inquires at 6pm. Your team sees it at 9am. By then, they have booked with the first business that responded. You never even knew you lost them." },
  { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", title: "Staff Buried in Coordination", desc: "Your team spends 2-3 hours per day copying data between systems, sending reminders, and chasing documents. That is 15+ hours per week of zero-revenue work." },
  { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", title: "Invisible Operations", desc: "You cannot tell which files are complete, which invoices are overdue, or who is overloaded. You discover dropped tasks when the client complains." },
  { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", title: "Calls Falling Through", desc: "Phone goes to voicemail during busy hours. Instagram DMs sit for days. Website forms get answered tomorrow. No single system captures everything." },
  { icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z", title: "Cash Flow Delayed", desc: "Invoices go out 2 weeks late. Payment reminders depend on someone remembering. Cash flow problems caused by inconsistent billing, not bad clients." },
  { icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6", title: "Growth Blocked", desc: "Your team is good at their work. But 40% of their time goes to admin instead of clients. You cannot grow without more people or fewer manual tasks." },
];

// ─── FAQ data (merged) ───────────────────────────────────────────────
const faqItems: FAQItem[] = [
  {
    question: "How much does automation cost?",
    answer:
      "Single workflow: $1,500\u2013$4,000 CAD. Multi-workflow system: $5,000\u2013$12,000. Full operational automation: $10,000\u2013$20,000. All fixed pricing after a free audit. Most businesses see full ROI within 30\u201360 days. Monthly maintenance: $200\u2013$500.",
  },
  {
    question: "How fast will I see results?",
    answer:
      "First automated workflow goes live in 1\u20132 weeks. Measurable results visible within the first week of operation. Full system payback typically 30\u201360 days.",
  },
  {
    question: "Will this replace my staff?",
    answer:
      "No. Automation replaces coordination tasks. Your staff are freed for higher-value work: advising clients, closing deals, building relationships. Most businesses find their team is more productive and less stressed, not smaller.",
  },
  {
    question: "Do I need to change my current software?",
    answer:
      "No. We integrate with QuickBooks, HubSpot, Zoho, Clio, Jane App, Jobber, Go High Level, Google Workspace, Microsoft 365, and dozens more. If you use spreadsheets, we can set up a lightweight CRM as part of implementation.",
  },
  {
    question: "Is this safe for regulated industries like law, healthcare, or immigration?",
    answer:
      "Yes. Every automation includes approval gates for sensitive actions, human review for regulated decisions, full audit logging, and PIPEDA-aware data handling. Your professional judgement stays in your hands. Automation handles the coordination around it.",
  },
  {
    question: "What if the AI gets something wrong?",
    answer:
      "Every system includes our Control Layer: stop-loss triggers, retry logic, approval gates, audit logging, and human escalation paths. If something unexpected happens, the system stops and alerts a human with full context.",
  },
  {
    question: "What should I automate first?",
    answer:
      "For most service businesses: lead response automation. It has the highest ROI, lowest complexity, and fastest implementation. If you are not sure, the free Automation Audit maps your workflows and tells you exactly where to start.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We serve small businesses across the Greater Toronto Area: Vaughan, Toronto, Markham, Richmond Hill, Mississauga, Brampton, North York, Scarborough, Etobicoke, and surrounding areas. Our office is at 50 Corstate Avenue, Unit 01, Vaughan, ON L4K 4X2.",
  },
];

// ─── Objection items ──────────────────────────────────────────────────
const objectionItems: FAQItem[] = [
  {
    question: "How much does this cost?",
    answer:
      "Single workflow automation: $1,500\u2013$4,000 CAD. Multi-workflow system: $5,000\u2013$12,000. Fixed pricing after a free audit. No hourly billing. No surprise invoices. Most businesses see full ROI within 30\u201360 days.",
  },
  {
    question: "Will this replace my staff?",
    answer:
      "No. Automation handles coordination tasks: scheduling, reminders, data entry, follow-up. Your staff handles expert work \u2014 advice, sales, client relationships. Automation makes your team more productive, not smaller.",
  },
  {
    question: "How long does setup take?",
    answer:
      "First workflow: 1\u20132 weeks. Full multi-workflow system: 4\u20138 weeks. You start seeing results from Week 1, not Month 3.",
  },
  {
    question: "Do I need to change my current software?",
    answer:
      "No. We integrate with QuickBooks, HubSpot, Zoho, Clio, Jane App, Google Workspace, spreadsheets, or nothing at all. Automation connects your existing tools.",
  },
  {
    question: "Is this safe for my regulated industry?",
    answer:
      "Every system includes human approval gates, stop-loss logic, and escalation paths. Sensitive decisions stay in human hands. All data stays in your controlled systems. PIPEDA-aware design for Canadian businesses.",
  },
  {
    question: "What if the automation makes a mistake?",
    answer:
      "Every automation includes a Control Layer: stop-loss triggers, retry logic, approval gates for sensitive actions, full logging, and escalation to humans when something unexpected happens. Nothing runs without boundaries.",
  },
];

// Merged FAQ items: objection items + unique faq items
const mergedFAQItems: FAQItem[] = [
  ...objectionItems,
  ...faqItems.filter(
    (f) => !objectionItems.some((o) => o.question.toLowerCase().replace(/[^a-z]/g, "").includes(f.question.toLowerCase().replace(/[^a-z]/g, "").slice(0, 20)))
  ),
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

// ─── FAQ Schema ───────────────────────────────────────────────────────
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: mergedFAQItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

// ─── Component ────────────────────────────────────────────────────────
// ─── Hero tab states ─────────────────────────────────────────────────
type HeroState = {
  id: string;
  tabLabel: string;
  icon: LucideIcon;
  headlineBefore: string;
  emphasisText: string;
  emphasisColor: string;
  afterText: string;
  sub: string;
  microcopy?: string;
  primaryCTA: { text: string; href: string };
  secondaryCTA: { text: string; href: string };
  metrics: { value: string; label: string }[];
};

const HERO_STATES: HeroState[] = [
  {
    id: "what-we-do",
    tabLabel: "What We Do",
    icon: Sparkles,
    headlineBefore: "Your Most Expensive Employee Is Doing Data Entry.",
    emphasisText: "That Employee Is You.",
    emphasisColor: MAGENTA,
    afterText: "",
    sub: "You did not build this business to chase follow-ups, send reminders, and manually type things into 3 different systems. We fix that. Your tools learn to talk to each other. The busywork runs itself. You go back to doing the work that actually pays.",
    microcopy: "No, you do not need to \u201Clearn AI.\u201D No, we will not replace your team. No, this is not another app you will never open.",
    primaryCTA: { text: "Show Me What I Can Stop Doing Manually", href: "/automation-planner" },
    secondaryCTA: { text: "See What This Looks Like for My Industry", href: "/ai-automation-industries" },
    metrics: [
      { value: "10+ Years", label: "Building business systems" },
      { value: "2\u201350 Staff", label: "The businesses we serve" },
      { value: "Fixed Pricing", label: "Never hourly. No surprises." },
    ],
  },
  {
    id: "the-problem",
    tabLabel: "The Problem",
    icon: DollarSign,
    headlineBefore: "You Already Know Something Is Wrong.",
    emphasisText: "Here Is What It Is Costing You.",
    emphasisColor: MAGENTA,
    afterText: "",
    sub: "Most service businesses lose $80,000 to $200,000 per year to slow lead response, manual admin, no-shows, and invoice delays. The waste is calculable. So is the fix.",
    primaryCTA: { text: "Calculate Your Annual Operational Cost", href: "/resources/roi-calculator" },
    secondaryCTA: { text: "See What Other Businesses Recovered", href: "/case-studies" },
    metrics: [
      { value: "$80K\u2013$200K/yr", label: "Average annual loss" },
      { value: "30\u201360 days", label: "Typical ROI timeline" },
      { value: "$3K\u2013$12K", label: "Fixed-price implementation" },
    ],
  },
  {
    id: "ready-to-plan",
    tabLabel: "Ready to Plan",
    icon: ClipboardList,
    headlineBefore: "You Know You Need to Automate.",
    emphasisText: "Let Us Find Your Starting Point.",
    emphasisColor: NAVY,
    afterText: "",
    sub: "The Barrana Automation Planner walks you through 8 guided questions about your business and gives you a personalised roadmap: what to automate first, what to keep human, and what it will cost. Takes 3 to 5 minutes.",
    primaryCTA: { text: "Start the Automation Planner", href: "/automation-planner" },
    secondaryCTA: { text: "Read: What to Automate First", href: "/insights/what-to-automate-first" },
    metrics: [
      { value: "3\u20135 min", label: "Time to complete" },
      { value: "Top 3\u20135", label: "Opportunities ranked" },
      { value: "Free", label: "No account required" },
    ],
  },
  {
    id: "ready-to-talk",
    tabLabel: "Ready to Talk",
    icon: PhoneCall,
    headlineBefore: "You Are Ready.",
    emphasisText: "Let Us Look at Your Business.",
    emphasisColor: NAVY,
    afterText: "",
    sub: "Book a free 60-minute Automation Audit. We map your workflows, calculate what your manual operations cost per year, and show you exactly what to automate first. You keep the audit even if you do nothing.",
    primaryCTA: { text: "Book Your Free Automation Audit", href: "/contact" },
    secondaryCTA: { text: "Call Us: +1 647 367 6771", href: "tel:+16473676771" },
    metrics: [
      { value: "60 min", label: "The audit takes one hour" },
      { value: "Free", label: "No charge, no obligation" },
      { value: "Yours to keep", label: "Full report whether or not you hire us" },
    ],
  },
];

export default function Home() {
  // Hero is always above the fold — use mount-trigger instead of IntersectionObserver
  const heroRef                    = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 60); return () => clearTimeout(t); }, []);
  const heroReveal                 = { ref: heroRef, visible: heroVisible };
  const workflowReveal   = useReveal(0.1);
  const ctaReveal        = useReveal(0.15);

  const [activeTab, setActiveTab] = useState(0);

  // Hero tab transition state
  const [heroTransitioning, setHeroTransitioning] = useState(false);
  const [displayTab, setDisplayTab] = useState(0);
  const reducedMotion = useRef(false);
  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  function switchHeroTab(newTab: number) {
    if (newTab === activeTab || heroTransitioning) return;
    if (reducedMotion.current) {
      setDisplayTab(newTab);
      setActiveTab(newTab);
      return;
    }
    setHeroTransitioning(true);
    setTimeout(() => {
      setDisplayTab(newTab);
      setActiveTab(newTab);
      setTimeout(() => setHeroTransitioning(false), 50);
    }, 200);
  }

  function handleTabKeyDown(e: React.KeyboardEvent, index: number) {
    const len = HERO_STATES.length;
    if (e.key === "ArrowRight") { e.preventDefault(); switchHeroTab((index + 1) % len); }
    if (e.key === "ArrowLeft") { e.preventDefault(); switchHeroTab((index - 1 + len) % len); }
  }

  // Hover state for Six Problems cards
  const [hoveredProblem, setHoveredProblem] = useState<number | null>(null);

  return (
    <>
      {/* ─── JSON-LD schemas ─── */}
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={faqSchema} />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 1: HERO — 4-Tab Interactive Hero
          ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "#F5F5F5", paddingTop: "5rem", paddingBottom: "5.5rem", minHeight: "90vh" }}>
        <style>{`
          .hero-grid { grid-template-columns: 1fr; }
          @media (min-width: 1024px) { .hero-grid { grid-template-columns: 1fr 1fr; gap: 4rem; } }
          .hero-metrics { grid-template-columns: repeat(3, 1fr); }
          @media (max-width: 600px) { .hero-metrics { grid-template-columns: 1fr; } }
        `}</style>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>

          {/* Badge — stays fixed */}
          <div
            style={{
              display: "inline-block",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: NAVY,
              background: "rgba(40,56,145,0.10)",
              border: "1px solid rgba(40,56,145,0.2)",
              borderRadius: "2rem",
              padding: "0.375rem 1rem",
              marginBottom: "1.5rem",
              opacity: heroReveal.visible ? 1 : 0,
              transition: "opacity 0.5s ease 0.1s",
            }}
          >
            AI Automation for Toronto Businesses
          </div>

          {/* Tab selector row + New to AI link */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "2.5rem",
              flexWrap: "wrap",
              opacity: heroReveal.visible ? 1 : 0,
              transition: "opacity 0.5s ease 0.2s",
            }}
          >
            <div
              role="tablist"
              style={{
                display: "flex",
                gap: "0.5rem",
                flexWrap: "wrap",
              }}
            >
            {HERO_STATES.map((state, i) => {
              const Icon = state.icon;
              return (
                <button
                  key={state.id}
                  role="tab"
                  aria-selected={activeTab === i}
                  tabIndex={activeTab === i ? 0 : -1}
                  onClick={() => switchHeroTab(i)}
                  onKeyDown={(e) => handleTabKeyDown(e, i)}
                  style={{
                    background: activeTab === i ? "white" : "transparent",
                    border: activeTab === i ? `1px solid ${BORDER}` : "1px solid transparent",
                    borderBottom: activeTab === i ? `2px solid ${MAGENTA}` : "2px solid transparent",
                    borderRadius: "0.75rem",
                    padding: "0.625rem 1.25rem",
                    color: activeTab === i ? NAVY : GREY,
                    fontWeight: activeTab === i ? 600 : 500,
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.375rem",
                    boxShadow: activeTab === i ? "0 1px 4px rgba(0,0,0,0.04)" : "none",
                    transition: "all 0.2s ease",
                  }}
                >
                  <Icon size={16} /> {state.tabLabel}
                </button>
              );
            })}
            </div>

            {/* New to AI — separate link to /start-here */}
            <Link
              href="/start-here"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: MAGENTA,
                textDecoration: "none",
                padding: "0.5rem 0.875rem",
                borderRadius: "2rem",
                background: "rgba(126,15,74,0.08)",
                border: `1px solid rgba(126,15,74,0.15)`,
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(126,15,74,0.14)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(126,15,74,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(126,15,74,0.08)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(126,15,74,0.15)";
              }}
            >
              New to AI? Start Here <ArrowRight size={13} />
            </Link>
          </div>

          {/* Transforming content */}
          <div
            role="tabpanel"
            style={{
              opacity: heroTransitioning ? 0 : 1,
              transform: heroTransitioning ? "translateY(-8px)" : "translateY(0)",
              transition: "opacity 0.25s ease, transform 0.25s ease",
            }}
          >
            <div className="hero-grid" style={{ display: "grid", gap: "4rem", alignItems: "center" }}>
              {/* Left column: headline + sub + CTAs */}
              <div style={{ maxWidth: "36rem" }}>
                <h1
                  style={{
                    color: DARK,
                    marginBottom: "1.25rem",
                    lineHeight: 1.08,
                    fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
                    letterSpacing: "-0.025em",
                    fontWeight: 800,
                  }}
                >
                  {HERO_STATES[displayTab].headlineBefore}{" "}
                  <span style={{ color: HERO_STATES[displayTab].emphasisColor, display: "block" }}>
                    {HERO_STATES[displayTab].emphasisText}
                  </span>
                  {HERO_STATES[displayTab].afterText && (
                    <span style={{ color: NAVY }}>{HERO_STATES[displayTab].afterText}</span>
                  )}
                </h1>

                <p
                  style={{
                    fontSize: "1.0625rem",
                    color: "#4A4A4A",
                    marginBottom: "2rem",
                    lineHeight: 1.7,
                    maxWidth: "52ch",
                  }}
                >
                  {HERO_STATES[displayTab].sub}
                </p>

                {/* Microcopy — the knowing wink (only on Tab 0) */}
                {HERO_STATES[displayTab].microcopy && (
                  <p
                    style={{
                      color: GREY,
                      fontSize: "0.9375rem",
                      fontStyle: "italic",
                      lineHeight: 1.65,
                      marginTop: "1rem",
                      maxWidth: "32rem",
                    }}
                  >
                    {HERO_STATES[displayTab].microcopy}
                  </p>
                )}

                {/* CTAs */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "1rem",
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <Link
                      href={HERO_STATES[displayTab].primaryCTA.href}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        background: MAGENTA,
                        color: "white",
                        fontWeight: 700,
                        fontSize: "0.9375rem",
                        padding: "0.875rem 1.75rem",
                        borderRadius: "0.5rem",
                        textDecoration: "none",
                        boxShadow: "0 4px 20px rgba(126,15,74,0.40)",
                      }}
                    >
                      {HERO_STATES[displayTab].primaryCTA.text}
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                  <div>
                    {HERO_STATES[displayTab].secondaryCTA.href.startsWith("tel:") ? (
                      <a
                        href={HERO_STATES[displayTab].secondaryCTA.href}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          background: "transparent",
                          color: NAVY,
                          fontWeight: 700,
                          fontSize: "0.9375rem",
                          padding: "0.875rem 1.75rem",
                          borderRadius: "0.5rem",
                          textDecoration: "none",
                          border: `2px solid ${NAVY}`,
                          transition: "border-color 0.2s, background 0.2s",
                        }}
                      >
                        {HERO_STATES[displayTab].secondaryCTA.text}
                        <ArrowRight size={16} />
                      </a>
                    ) : (
                      <Link
                        href={HERO_STATES[displayTab].secondaryCTA.href}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          background: "transparent",
                          color: NAVY,
                          fontWeight: 700,
                          fontSize: "0.9375rem",
                          padding: "0.875rem 1.75rem",
                          borderRadius: "0.5rem",
                          textDecoration: "none",
                          border: `2px solid ${NAVY}`,
                          transition: "border-color 0.2s, background 0.2s",
                        }}
                      >
                        {HERO_STATES[displayTab].secondaryCTA.text}
                        <ArrowRight size={16} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Right column: visual */}
              <div style={{ display: "flex", justifyContent: "center" }}>
                {displayTab === 0 && <HeroYourDayVisual />}
                {displayTab === 1 && <HeroArchitectureVisual />}
                {displayTab === 2 && <HeroPlannerPreview />}
                {displayTab === 3 && <HeroAuditCard />}
              </div>
            </div>

            {/* Metric cards */}
            <div
              className="hero-metrics"
              style={{
                display: "grid",
                gap: "1rem",
                marginTop: "2.5rem",
              }}
            >
              {HERO_STATES[displayTab].metrics.map((m) => (
                <div
                  key={m.label}
                  style={{
                    background: "white",
                    border: `1px solid ${BORDER}`,
                    borderRadius: "0.875rem",
                    padding: "1.25rem 1rem",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  }}
                >
                  <div style={{ color: displayTab === 0 ? NAVY : MAGENTA, fontWeight: 800, fontSize: "1.25rem", lineHeight: 1.2, marginBottom: "0.5rem" }}>
                    {m.value}
                  </div>
                  <div style={{ color: "#4A4A4A", fontSize: "0.8125rem", lineHeight: 1.4 }}>
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 2: TRUST STRIP (#1a2473)
          ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "#EDEDEF", borderBottom: "1px solid #E2E4ED" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "0",
              padding: "1rem 0",
            }}
            className="trust-strip"
          >
            <style>{`
              .trust-strip-item { display: flex; align-items: center; gap: 0.5rem; padding: 0.625rem 1.5rem; }
              .trust-strip-divider { width: 1px; height: 1.25rem; background: rgba(0,0,0,0.12); }
              @media (max-width: 640px) { .trust-strip-divider { display: none; } .trust-strip-item { width: 100%; justify-content: center; } }
            `}</style>
            {[
              { icon: Award, label: "10+ Years Building Business Systems" },
              { icon: Tag, label: "Fixed Pricing \u2014 Never Hourly" },
              { icon: Plug, label: "Works With Your Existing Tools" },
              { icon: MapPin, label: "Toronto \u00B7 Vaughan \u00B7 Markham \u00B7 Mississauga \u00B7 GTA" },
            ].map((item, i) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center" }}>
                {i > 0 && <div className="trust-strip-divider" />}
                <div className="trust-strip-item">
                  <item.icon size={15} color={MAGENTA} strokeWidth={2} />
                  <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: GREY, whiteSpace: "nowrap" }}>
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 3: THREE THINGS TO KNOW (bg: OFFWHITE)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="section" style={{ background: OFFWHITE, padding: "6rem 0" }}>
        <div className="container">
          <Reveal>
            <div className="eyebrow" style={{ letterSpacing: "0.1em" }}>Before You Scroll</div>
            <h2 style={{ color: DARK, marginBottom: "1rem", fontSize: "clamp(1.875rem, 3.5vw, 2.25rem)", letterSpacing: "-0.02em" }}>
              Three Things to Know Before You Scroll
            </h2>
            <p style={{ color: GREY, lineHeight: 1.7, maxWidth: "68ch", marginBottom: "3rem" }}>
              Common concerns we hear from every business owner considering automation. Here are the answers upfront.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ObjectionCards />
          </Reveal>
        </div>
      </section>

      {/* ─── START HERE BANNER ─── */}
      <div style={{ background: "rgba(40,56,145,0.06)", padding: "1rem 1.5rem", textAlign: "center" }}>
        <p style={{ fontSize: "0.9375rem", color: GREY, margin: 0 }}>
          New to AI automation? Not sure if this applies to your business?{" "}
          <Link href="/start-here" style={{ color: NAVY, fontWeight: 600, marginLeft: "0.5rem", textDecoration: "none" }}>
            Start Here →
          </Link>
        </p>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 4: THE MONEY LEAK (bg: white)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="section" style={{ background: "white", padding: "6rem 0" }}>
        <div className="container">
          <Reveal>
            <div className="eyebrow" style={{ letterSpacing: "0.1em" }}>The Real Cost</div>
            <h2 style={{ color: DARK, marginBottom: "1rem", fontSize: "clamp(1.875rem, 3.5vw, 2.25rem)", letterSpacing: "-0.02em" }}>
              You Are Losing Money in 4 Places Right Now.
            </h2>
            <p style={{ color: GREY, lineHeight: 1.7, maxWidth: "72ch", marginBottom: "3rem" }}>
              Most business owners know they are busy. Few have calculated what that busyness actually costs. Here is the math for a typical service business with 5\u201315 staff:
            </p>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "1.5rem",
            }}
            className="money-leak-grid"
          >
            <style>{`
              .money-leak-grid { grid-template-columns: 1fr !important; }
              @media (min-width: 768px) { .money-leak-grid { grid-template-columns: 1fr 1fr !important; } }
            `}</style>

            {[
              {
                amount: "$36,000 \u2013 $180,000 / year",
                title: "Missed and Slow Leads",
                body: "If you respond to enquiries in 4\u20138 hours instead of 5 minutes, you lose 30\u201350% of them to faster competitors. At $3,000\u2013$15,000 per client, losing 1\u20133 leads per month adds up fast.",
                calc: "2 missed leads/month \u00D7 $5,000 avg client value \u00D7 12 months = $120,000/year",
              },
              {
                amount: "$26,000 \u2013 $78,000 / year",
                title: "Admin Hours Burned",
                body: "Your team spends 10\u201330 hours per week on data entry, follow-up emails, scheduling, document chasing, and manual CRM updates. None of it requires their expertise.",
                calc: "15 hrs/week \u00D7 $35/hr \u00D7 52 weeks = $27,300/year in staff time on tasks that generate zero revenue",
              },
              {
                amount: "$15,000 \u2013 $150,000 / year",
                title: "No-Shows and Empty Slots",
                body: "If you run on appointments (clinic, consulting, coaching), a 15\u201320% no-show rate means 3\u201310 empty slots per week. At $80\u2013$300 per visit, that is real revenue disappearing.",
                calc: "5 no-shows/week \u00D7 $150 avg \u00D7 50 weeks = $37,500/year sitting in empty chairs",
              },
              {
                amount: "$10,000 \u2013 $50,000 / year",
                title: "Invoice Delays",
                body: "If invoices go out 2\u20134 weeks after work completion instead of the same day, your cash flow lags. Late reminders mean some invoices never get paid.",
                calc: "Average 2.5 weeks delay \u00D7 $8,000/month in invoicing = $5,000/month constantly floating",
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.08}>
                <div style={{
                  background: "white",
                  borderRadius: "1rem",
                  border: "1px solid rgba(226,228,237,0.6)",
                  borderLeft: `4px solid ${MAGENTA}`,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  padding: "2rem",
                  height: "100%",
                }}>
                  <div style={{ color: MAGENTA, fontWeight: 800, fontSize: "1.625rem", lineHeight: 1.2, marginBottom: "0.625rem" }}>
                    {card.amount}
                  </div>
                  <h3 style={{ color: DARK, fontWeight: 700, fontSize: "1.0625rem", marginBottom: "0.75rem" }}>
                    {card.title}
                  </h3>
                  <p style={{ color: GREY, lineHeight: 1.65, fontSize: "0.9375rem", marginBottom: "1rem" }}>
                    {card.body}
                  </p>
                  <div style={{
                    background: OFFWHITE,
                    borderRadius: "0.5rem",
                    padding: "0.875rem 1rem",
                    fontFamily: "monospace",
                    fontSize: "0.8125rem",
                    color: DARK,
                    lineHeight: 1.5,
                  }}>
                    {card.calc}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
              <p style={{ color: MAGENTA, fontWeight: 700, fontSize: "1.125rem", marginBottom: "0.75rem" }}>
                Add it up: a typical 5\u201315 person service business loses
              </p>
              <p style={{ color: MAGENTA, fontWeight: 800, fontSize: "2.5rem", lineHeight: 1.1, marginBottom: "0.5rem" }}>
                $80,000 to $200,000 per year
              </p>
              <p style={{ color: GREY, fontSize: "1rem", marginBottom: "0.5rem" }}>
                to operational friction.
              </p>
              <p style={{ color: GREY, fontSize: "0.875rem", maxWidth: "64ch", margin: "0 auto 1.75rem" }}>
                These are not theoretical numbers. They are calculated from real-world patterns across immigration firms, accounting practices, law firms, clinics, and contractors in the GTA.
              </p>
              <Link href="/automation-planner" className="btn-primary">
                Calculate Your Specific Number
                <ArrowRight size={16} />
              </Link>
              <p style={{ fontSize: "0.8125rem", color: GREY, marginTop: "0.5rem" }}>
                Enter your numbers. See your annual cost in 60 seconds.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 5: BUYER PATH SELECTOR (blue gradient)
          ═══════════════════════════════════════════════════════════════════ */}
      <section
        className="section"
        style={{
          background: OFFWHITE,
          padding: "6rem 0",
        }}
      >
        <style>{`
          .buyer-path-grid { grid-template-columns: 1fr !important; }
          @media (min-width: 768px) { .buyer-path-grid { grid-template-columns: 1fr 1fr !important; } }

          .buyer-card {
            display: block;
            background: white;
            border: 1px solid ${BORDER};
            border-radius: 1rem;
            padding: 2rem 2rem 1.75rem;
            cursor: pointer;
            text-decoration: none;
            position: relative;
            box-shadow: 0 1px 4px rgba(0,0,0,0.04);
            transition:
              background  0.24s ease,
              border-color 0.24s ease,
              transform   0.26s cubic-bezier(0.16,1,0.3,1),
              box-shadow  0.26s ease;
          }
          .buyer-card:hover,
          .buyer-card:focus-visible {
            background: white;
            border-color: rgba(40,56,145,0.3);
            transform: translateY(-5px);
            box-shadow: 0 8px 32px rgba(40,56,145,0.10);
            outline: none;
          }
          .buyer-card-icon-wrap {
            display: inline-flex;
            padding: 0.625rem;
            background: rgba(40,56,145,0.08);
            border: 1px solid rgba(40,56,145,0.12);
            border-radius: 0.625rem;
            margin-bottom: 1.25rem;
            transition: transform 0.26s cubic-bezier(0.16,1,0.3,1), box-shadow 0.26s ease;
          }
          .buyer-card:hover .buyer-card-icon-wrap {
            transform: scale(1.07);
            box-shadow: 0 0 12px rgba(40,56,145,0.15);
          }
          .buyer-card-arrow {
            position: absolute;
            bottom: 1.375rem;
            right: 1.5rem;
            opacity: 0.35;
            transition: transform 0.26s cubic-bezier(0.16,1,0.3,1), opacity 0.24s ease;
          }
          .buyer-card:hover .buyer-card-arrow {
            transform: translateX(5px);
            opacity: 0.85;
          }
          @media (prefers-reduced-motion: reduce) {
            .buyer-card,
            .buyer-card-icon-wrap,
            .buyer-card-arrow {
              transition: none !important;
              transform: none !important;
            }
          }
        `}</style>

        <div className="container">
          <Reveal>
            <div className="eyebrow" style={{ letterSpacing: "0.1em" }}>Find Your Priority</div>
            <h2 style={{ color: DARK, marginBottom: "1rem", fontSize: "clamp(1.875rem, 3.5vw, 2.25rem)", letterSpacing: "-0.02em" }}>
              Which of These Is Costing Your Business the Most?
            </h2>
            <p style={{ color: GREY, lineHeight: 1.7, marginBottom: "3rem", maxWidth: "52ch" }}>
              Choose what matters most. We will show you how it works for your business.
            </p>
          </Reveal>

          <div
            style={{ display: "grid", gap: "1.25rem" }}
            className="buyer-path-grid"
          >
            {[
              {
                icon: PhoneCall,
                title: "I am losing leads to slow response",
                dollar: "$36K\u2013$180K/yr at risk",
                href: "/services",
              },
              {
                icon: Clock,
                title: "My team is buried in admin work",
                dollar: "$26K\u2013$78K/yr in staff time wasted",
                href: "/services",
              },
              {
                icon: CalendarX,
                title: "No-shows and scheduling are killing my revenue",
                dollar: "$15K\u2013$150K/yr in empty slots",
                href: "/services",
              },
              {
                icon: DollarSign,
                title: "I just want to know what automation costs",
                dollar: "Fixed pricing from $1,500 CAD",
                href: "/automation-planner",
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.09}>
                <Link href={card.href} className="buyer-card">
                  <span className="buyer-card-icon-wrap">
                    <card.icon size={20} color={NAVY} strokeWidth={2} />
                  </span>
                  <div style={{
                    color: DARK,
                    fontWeight: 700,
                    fontSize: "1.0625rem",
                    lineHeight: 1.45,
                    marginBottom: "0.5rem",
                  }}>
                    {card.title}
                  </div>
                  <div style={{
                    color: MAGENTA,
                    fontWeight: 800,
                    fontSize: "1rem",
                    letterSpacing: "0.01em",
                    paddingBottom: "1.75rem",
                  }}>
                    {card.dollar}
                  </div>
                  <span className="buyer-card-arrow">
                    <ArrowRight size={17} color={NAVY} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 6: SIX PROBLEMS (bg: OFFWHITE)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="section" style={{ background: OFFWHITE, padding: "6rem 0" }}>
        <div className="container">
          <Reveal>
            <div className="eyebrow" style={{ letterSpacing: "0.1em" }}>Common Operational Problems</div>
            <h2 style={{ color: DARK, marginBottom: "1rem", fontSize: "clamp(1.875rem, 3.5vw, 2.25rem)", letterSpacing: "-0.02em" }}>
              The Six Problems Every Growing Service Business Hits
            </h2>
            <p style={{ color: GREY, lineHeight: 1.7, maxWidth: "68ch", marginBottom: "3rem" }}>
              These patterns show up in every industry we work with. The details change, but the friction is the same.
            </p>
          </Reveal>

          <style>{`
            .problems-grid {
              display: grid;
              grid-template-columns: 1fr;
              gap: 1.25rem;
            }
            @media (min-width: 1024px) {
              .problems-grid {
                gap: 1.25rem;
              }
            }
            @media (min-width: 768px) {
              .problems-grid {
                grid-template-columns: 1fr 1fr;
              }
            }
            @media (min-width: 1024px) {
              .problems-grid {
                grid-template-columns: 1fr 1fr 1fr;
              }
            }
          `}</style>

          <div className="problems-grid">
            {PROBLEMS_LIST.map((problem, i) => (
              <Reveal key={problem.title} delay={i * 0.08}>
                <div
                  onMouseEnter={() => setHoveredProblem(i)}
                  onMouseLeave={() => setHoveredProblem(null)}
                  style={{
                    background: "rgba(245,246,250,0.5)",
                    border: "none",
                    borderLeft: hoveredProblem === i ? `4px solid #E8850C` : "4px solid transparent",
                    borderRadius: "0.75rem",
                    padding: "2rem",
                    height: "100%",
                    transition: "border-color 0.2s ease, border-left 0.2s ease",
                  }}
                >
                  <div style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "0.5rem",
                    background: "rgba(40,56,145,0.07)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem",
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d={problem.icon} />
                    </svg>
                  </div>
                  <h3 style={{ color: DARK, fontWeight: 700, fontSize: "1.0625rem", marginBottom: "0.625rem" }}>
                    {problem.title}
                  </h3>
                  <p style={{ color: GREY, fontSize: "0.9375rem", lineHeight: 1.65, margin: 0 }}>
                    {problem.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 7: THE FIX (bg: white)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="section" style={{ background: "white", padding: "6rem 0" }}>
        <div className="container">
          <Reveal>
            <div className="eyebrow" style={{ letterSpacing: "0.1em" }}>The Fix</div>
            <h2 style={{ color: DARK, marginBottom: "1rem", fontSize: "clamp(1.875rem, 3.5vw, 2.25rem)", letterSpacing: "-0.02em" }}>
              Here Is How You Get That Money Back.
            </h2>
            <p style={{ color: GREY, lineHeight: 1.7, maxWidth: "68ch", marginBottom: "3rem" }}>
              Barrana automation systems eliminate the 4 money leaks above by connecting your existing tools into automated workflows. Nothing gets replaced. Everything gets connected.
            </p>
          </Reveal>

          <div
            style={{ display: "grid", gap: "1.5rem" }}
            className="fix-cards-grid"
          >
            <style>{`
              .fix-cards-grid { grid-template-columns: 1fr !important; }
              @media (min-width: 768px) { .fix-cards-grid { grid-template-columns: 1fr 1fr !important; } }
            `}</style>

            {[
              {
                icon: Zap,
                recovery: "Recover $36K\u2013$180K/yr",
                title: "Lead Response Automation",
                body: "Every enquiry gets a response in under 90 seconds, 24/7. Prospect is qualified, CRM record created, consultation booked. Even at 11pm on a Sunday.",
                before: [{ label: "Response time", val: "4\u20138 hrs" }, { label: "Lost leads", val: "8\u201312/mo" }],
                after: [{ label: "Response time", val: "90 sec" }, { label: "Lost leads", val: "1\u20132/mo" }],
              },
              {
                icon: Settings,
                recovery: "Recover $26K\u2013$78K/yr",
                title: "Admin Automation",
                body: "Intake, data entry, follow-up emails, CRM updates, and document collection run automatically. Your team does the expert work. The system does the coordination.",
                before: [{ label: "Admin hours", val: "15\u201320/wk" }, { label: "Staff focus", val: "admin" }],
                after: [{ label: "Admin hours", val: "3\u20135/wk" }, { label: "Staff focus", val: "revenue work" }],
              },
              {
                icon: Calendar,
                recovery: "Recover $15K\u2013$150K/yr",
                title: "Booking and Reminders",
                body: "Dual reminders (48hr email + 2hr SMS) reduce no-shows 25\u201340%. Cancellations auto-fill from waitlist. Online booking reduces phone volume 40\u201350%.",
                before: [{ label: "No-show rate", val: "15\u201320%" }, { label: "Empty slots", val: "manual fill" }],
                after: [{ label: "No-show rate", val: "8\u201312%" }, { label: "Empty slots", val: "filled from waitlist" }],
              },
              {
                icon: Receipt,
                recovery: "Recover $10K\u2013$50K/yr",
                title: "Invoice Automation",
                body: "Invoices trigger the day work completes. Payment reminders at 7/14/21 days. Reconciliation automated. Cash flow stabilised.",
                before: [{ label: "Invoice delay", val: "2\u20134 weeks" }, { label: "Collections", val: "manual" }],
                after: [{ label: "Invoice delay", val: "Same day" }, { label: "Collections", val: "accelerated" }],
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.08}>
                <div style={{
                  background: "white",
                  borderRadius: "1rem",
                  border: "1px solid rgba(226,228,237,0.6)",
                  borderLeft: "4px solid #0D9668",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  padding: "2rem",
                  height: "100%",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                    <card.icon size={18} color={NAVY} strokeWidth={2} />
                    <span style={{ color: "#0D9668", fontWeight: 700, fontSize: "1.0625rem" }}>
                      {card.recovery}
                    </span>
                  </div>
                  <h3 style={{ color: DARK, fontWeight: 700, fontSize: "1.0625rem", marginBottom: "0.75rem" }}>
                    {card.title}
                  </h3>
                  <p style={{ color: GREY, lineHeight: 1.65, fontSize: "0.9375rem", marginBottom: "1.25rem" }}>
                    {card.body}
                  </p>
                  {/* Before/After mini-bar */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                    <div style={{ background: "rgba(220,38,38,0.05)", borderRadius: "0.5rem", padding: "0.75rem 0.875rem", border: "1px solid rgba(220,38,38,0.12)" }}>
                      <div style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: GREY, marginBottom: "0.375rem" }}>Before</div>
                      {card.before.map((row) => (
                        <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8125rem" }}>
                          <span style={{ color: GREY }}>{row.label}</span>
                          <span style={{ fontWeight: 700, color: "#dc2626" }}>{row.val}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: "rgba(13,150,104,0.05)", borderRadius: "0.5rem", padding: "0.75rem 0.875rem", border: "1px solid rgba(13,150,104,0.12)" }}>
                      <div style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#0D9668", marginBottom: "0.375rem" }}>After</div>
                      {card.after.map((row) => (
                        <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8125rem" }}>
                          <span style={{ color: GREY }}>{row.label}</span>
                          <span style={{ fontWeight: 700, color: "#0D9668" }}>{row.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
              <Link href="/automation-planner" className="btn-primary">
                Start the Automation Planner \u2014 See which fix delivers the most for your business
                <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 8: MAP WHAT YOU CAN AUTOMATE (bg: OFFWHITE)
          ═══════════════════════════════════════════════════════════════════ */}
      <HomepagePlannerCTA />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 9: AUTOMATION METHOD (bg: white)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="section" style={{ background: "white", padding: "6rem 0" }}>
        <div className="container">
          <Reveal>
            <div className="eyebrow" style={{ letterSpacing: "0.1em" }}>The Process</div>
            <h2 style={{ color: DARK, marginBottom: "1rem", fontSize: "clamp(1.875rem, 3.5vw, 2.25rem)", letterSpacing: "-0.02em" }}>
              How It Works: The Barrana Automation Method
            </h2>
            <p style={{ color: GREY, lineHeight: 1.7, maxWidth: "68ch", marginBottom: "3rem" }}>
              Five stages. Fixed pricing. Your first automation live in 2\u20133 weeks.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <MethodTimeline />
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
              <Link href="/contact" className="btn-primary">
                Book Your Free Friction Mapping Session
                <ArrowRight size={16} />
              </Link>
              <p style={{ fontSize: "0.8125rem", color: GREY, marginTop: "0.5rem" }}>
                60 minutes. Free. You keep the workflow map regardless.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 10: HOW AUTOMATION FITS YOUR WORKFLOW (bg: OFFWHITE)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="section" style={{ background: OFFWHITE, padding: "6rem 0" }}>
        <style>{`
          @keyframes tabContentIn {
            from { opacity: 0; transform: translateY(12px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .industry-tab-bar::-webkit-scrollbar { display: none; }
          .industry-tab-bar { -ms-overflow-style: none; scrollbar-width: none; }
          .workflow-step-dot {
            width: 10px; height: 10px; border-radius: 50%;
            background: ${NAVY}; flex-shrink: 0; margin-top: 5px;
            box-shadow: 0 0 0 3px rgba(40,56,145,0.12);
          }
          .workflow-step-dot.last {
            background: ${MAGENTA};
            box-shadow: 0 0 0 3px rgba(126,15,74,0.15);
          }
        `}</style>
        <div className="container">

          {/* Section header */}
          <div
            ref={workflowReveal.ref}
            style={{
              opacity: workflowReveal.visible ? 1 : 0,
              transform: workflowReveal.visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
              marginBottom: "2.75rem",
              maxWidth: "640px",
            }}
          >
            <div className="eyebrow" style={{ letterSpacing: "0.1em" }}>Example Workflows</div>
            <h2 style={{ color: DARK, marginBottom: "1rem", fontSize: "clamp(1.875rem, 3.5vw, 2.25rem)", letterSpacing: "-0.02em" }}>
              How Automation Fits Your Workflow
            </h2>
            <p style={{ color: GREY, lineHeight: 1.75, margin: 0, fontSize: "1.0625rem" }}>
              Choose your industry to see exactly what gets handled automatically \u2014 and what your team no longer needs to do manually.
            </p>
          </div>

          {/* Tab bar */}
          <div
            className="industry-tab-bar"
            role="tablist"
            aria-label="Industry workflows"
            style={{
              display: "flex",
              overflowX: "auto",
              gap: "0.5rem",
              marginBottom: "2rem",
              paddingBottom: "4px",
            }}
          >
            {INDUSTRY_TABS.map((tab, i) => (
              <button
                key={tab.id}
                role="tab"
                id={`tab-btn-${tab.id}`}
                aria-selected={activeTab === i}
                aria-controls={`tab-panel-${tab.id}`}
                onClick={() => setActiveTab(i)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4375rem",
                  padding: "0.5625rem 1.25rem",
                  borderRadius: "2rem",
                  fontWeight: activeTab === i ? 700 : 500,
                  fontSize: "0.875rem",
                  border: `1.5px solid ${activeTab === i ? NAVY : BORDER}`,
                  background: activeTab === i ? NAVY : "white",
                  color: activeTab === i ? "white" : "#444",
                  cursor: "pointer",
                  transition: "all 0.18s ease",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  letterSpacing: activeTab === i ? "0.01em" : "0",
                  boxShadow: activeTab === i
                    ? "0 4px 14px rgba(40,56,145,0.22)"
                    : "0 1px 3px rgba(0,0,0,0.06)",
                }}
              >
                <tab.icon
                  size={14}
                  strokeWidth={2.2}
                  color={activeTab === i ? "white" : NAVY}
                  aria-hidden="true"
                />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab panel */}
          <div
            key={activeTab}
            role="tabpanel"
            id={`tab-panel-${INDUSTRY_TABS[activeTab].id}`}
            aria-labelledby={`tab-btn-${INDUSTRY_TABS[activeTab].id}`}
            style={{ animation: "tabContentIn 0.32s ease" }}
          >
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "1.25rem",
            }}
              className="workflow-grid"
            >
              <style>{`
                @media (min-width: 768px) {
                  .workflow-grid { grid-template-columns: 1fr 1fr !important; gap: 1.5rem !important; }
                }
                @media (min-width: 1024px) {
                  .workflow-grid { grid-template-columns: 55% 45% !important; }
                }
              `}</style>

              {/* LEFT: Workflow journey card */}
              <div style={{
                background: "white",
                borderRadius: "1.25rem",
                border: `1px solid ${BORDER}`,
                overflow: "hidden",
                boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
              }}>
                <div style={{
                  padding: "1.375rem 1.75rem",
                  borderBottom: `1px solid ${BORDER}`,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.875rem",
                }}>
                  <div style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "0.625rem",
                    background: `rgba(40,56,145,0.07)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    {(() => {
                      const TabIcon = INDUSTRY_TABS[activeTab].icon;
                      return <TabIcon size={20} strokeWidth={1.75} color={NAVY} aria-hidden="true" />;
                    })()}
                  </div>
                  <div>
                    <p style={{
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      letterSpacing: "0.09em",
                      textTransform: "uppercase",
                      color: MAGENTA,
                      margin: "0 0 0.25rem",
                    }}>
                      {INDUSTRY_TABS[activeTab].label}
                    </p>
                    <h3 style={{
                      fontSize: "1.0625rem",
                      fontWeight: 700,
                      color: DARK,
                      margin: 0,
                      lineHeight: 1.4,
                    }}>
                      {INDUSTRY_TABS[activeTab].headline}
                    </h3>
                  </div>
                </div>

                <div style={{ padding: "1.625rem 1.75rem" }}>
                  <p style={{
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    letterSpacing: "0.09em",
                    textTransform: "uppercase",
                    color: GREY,
                    margin: "0 0 1.25rem",
                  }}>
                    What happens, step by step
                  </p>
                  <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {INDUSTRY_TABS[activeTab].steps.map((step, si) => {
                      const isLast = si === INDUSTRY_TABS[activeTab].steps.length - 1;
                      return (
                        <li key={si} style={{
                          display: "flex",
                          gap: "1rem",
                          paddingBottom: isLast ? 0 : "0.125rem",
                        }}>
                          <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            flexShrink: 0,
                            width: "10px",
                          }}>
                            <div className={`workflow-step-dot${isLast ? " last" : ""}`} />
                            {!isLast && (
                              <div style={{
                                width: "2px",
                                flex: 1,
                                minHeight: "28px",
                                background: "linear-gradient(to bottom, rgba(40,56,145,0.15), rgba(40,56,145,0.04))",
                                margin: "4px 0",
                              }} />
                            )}
                          </div>
                          <div style={{ paddingBottom: isLast ? 0 : "1.125rem" }}>
                            <p style={{
                              margin: 0,
                              fontSize: "0.9375rem",
                              lineHeight: 1.55,
                              color: isLast ? NAVY : DARK,
                              fontWeight: isLast ? 600 : 400,
                            }}>
                              {step}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>

              {/* RIGHT: Business outcome card */}
              <div style={{
                background: NAVY,
                borderRadius: "1.25rem",
                overflow: "hidden",
                boxShadow: "0 4px 28px rgba(40,56,145,0.28)",
                display: "flex",
                flexDirection: "column",
              }}>
                <div style={{
                  padding: "1.5rem 1.75rem",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "0.625rem",
                    background: "rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <Clock size={20} strokeWidth={1.75} color="white" aria-hidden="true" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      letterSpacing: "0.09em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.55)",
                      margin: "0 0 0.3rem",
                    }}>
                      {INDUSTRY_TABS[activeTab].badgeLabel}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <span style={{
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        color: "rgba(255,255,255,0.38)",
                        textDecoration: "line-through",
                      }}>
                        {INDUSTRY_TABS[activeTab].badgeBefore}
                      </span>
                      <ArrowRight size={16} color={MAGENTA} aria-hidden="true" />
                      <span style={{
                        fontSize: "1.875rem",
                        fontWeight: 800,
                        color: "white",
                        letterSpacing: "-0.01em",
                      }}>
                        {INDUSTRY_TABS[activeTab].badgeAfter}
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{
                  padding: "1.5rem 1.75rem",
                  flex: 1,
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}>
                  <p style={{
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    letterSpacing: "0.09em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.55)",
                    margin: "0 0 1rem",
                  }}>
                    Handled automatically
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                    {INDUSTRY_TABS[activeTab].tasks.map((task) => (
                      <li key={task} style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                        <CheckCircle
                          size={16}
                          strokeWidth={2}
                          color={MAGENTA}
                          aria-hidden="true"
                          style={{ flexShrink: 0 }}
                        />
                        <span style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.88)", fontWeight: 500 }}>
                          {task}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ padding: "1.5rem 1.75rem" }}>
                  <p style={{
                    fontSize: "0.9rem",
                    color: "rgba(255,255,255,0.65)",
                    lineHeight: 1.7,
                    margin: "0 0 1.25rem",
                  }}>
                    {INDUSTRY_TABS[activeTab].copy}
                  </p>
                  <Link
                    href="/contact"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      color: "white",
                      background: MAGENTA,
                      textDecoration: "none",
                      padding: "0.75rem 1.5rem",
                      borderRadius: "0.5rem",
                      width: "100%",
                      boxSizing: "border-box",
                      letterSpacing: "0.01em",
                      boxShadow: "0 4px 14px rgba(126,15,74,0.35)",
                      transition: "opacity 0.2s",
                    }}
                  >
                    See how this works for your business
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Reveal delay={0.1}>
            <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
              <Link href="/services" className="btn-secondary">
                View All Services
                <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 11: AUTOMATION IS THE CORE (NAVY gradient)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="section" style={{ background: "linear-gradient(to bottom, #1a2d6e, #162358)", padding: "6rem 0" }}>
        <div className="container">
          <Reveal>
            <div className="section-divider mb-4" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
              <span className="section-label" style={{ color: "rgba(255,255,255,0.6)", background: "transparent", border: "1px solid rgba(255,255,255,0.2)" }}>FULL-STACK BUSINESS PARTNER</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }} className="lg-grid-2col">
              <div>
                <h2 style={{ fontSize: "clamp(1.875rem, 3.5vw, 2.25rem)", fontWeight: 800, color: "white", marginBottom: "1.25rem", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
                  Automation Is the Core.<br />But We Build Everything Around It.
                </h2>
                <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.75, marginBottom: "1.5rem" }}>
                  Most automation consultancies stop at workflows. We don't. If your automation needs a custom application, we build it. If your website isn't converting, we rebuild it. If your social media isn't bringing clients, we fix that too.
                </p>
                <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.75, marginBottom: "2rem", fontSize: "0.95rem" }}>
                  Barrana handles the full operational stack so you don't need five different vendors.
                </p>
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  <Link href="/services/full-stack" style={{ background: MAGENTA, color: "white", padding: "0.75rem 1.5rem", borderRadius: "8px", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none", display: "inline-block" }}>
                    See Full-Stack Services →
                  </Link>
                  <Link href="/automation-planner" style={{ background: "transparent", color: "white", padding: "0.75rem 1.5rem", borderRadius: "8px", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none", display: "inline-block", border: "1px solid rgba(255,255,255,0.3)" }}>
                    Start the Planner
                  </Link>
                </div>
              </div>
              <div>
                {[
                  { Icon: Monitor, title: "Custom Software & AI", desc: "Bespoke applications, AI agents, client portals, and internal tools built on your automation layer." },
                  { Icon: Globe, title: "Websites That Convert", desc: "Website design and rebuilds optimised to feed your automated systems with qualified enquiries." },
                  { Icon: Megaphone, title: "Social Media & Acquisition", desc: "Social media systems, content frameworks, and acquisition funnels that fill your pipeline." },
                  { Icon: Map, title: "Operational Consulting", desc: "Process mapping and workflow redesign \u2014 strategy before systems, every time." },
                ].map((card) => (
                  <div key={card.title} style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    borderRadius: "12px",
                    padding: "1rem 1.25rem",
                    marginBottom: "0.75rem",
                    display: "flex",
                    gap: "1rem",
                    alignItems: "flex-start",
                    backdropFilter: "blur(8px)",
                  }}>
                    <card.Icon size={20} color={MAGENTA} strokeWidth={1.75} style={{ flexShrink: 0, marginTop: "2px" }} aria-hidden="true" />
                    <div>
                      <div style={{ fontWeight: 700, color: "white", fontSize: "0.9rem", marginBottom: "0.25rem" }}>{card.title}</div>
                      <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", lineHeight: 1.5 }}>{card.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <style>{`.lg-grid-2col { } @media (max-width: 768px) { .lg-grid-2col { grid-template-columns: 1fr !important; } }`}</style>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 12: CASE STUDIES (bg: white)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="section" style={{ background: "white", padding: "6rem 0" }}>
        <div className="container">
          <Reveal>
            <div className="eyebrow" style={{ letterSpacing: "0.1em" }}>Real Results</div>
            <h2 style={{ color: DARK, marginBottom: "1rem", fontSize: "clamp(1.875rem, 3.5vw, 2.25rem)", letterSpacing: "-0.02em" }}>
              What Automation Actually Saved These Businesses.
            </h2>
          </Reveal>

          <div
            style={{ display: "grid", gap: "1.5rem", marginTop: "3rem" }}
            className="case-study-grid"
          >
            <style>{`
              .case-study-grid { grid-template-columns: 1fr !important; }
              @media (min-width: 768px) { .case-study-grid { grid-template-columns: 1fr 1fr !important; } }
            `}</style>

            {[
              {
                industry: "Immigration Firm",
                location: "North York",
                pain: "Staff spent 18 hrs/week on intake and document chasing",
                fix: "AI intake + document collection + status updates automated",
                result: "$86,400+ recovered",
                desc: "14 staff hours/week recovered = $36,400/yr in capacity. 25% more client files handled. $50,000+ in captured evening leads.",
              },
              {
                industry: "Accounting Firm",
                location: "Vaughan",
                pain: "Tax season at capacity. Turning away clients.",
                fix: "Document collection + invoicing + onboarding automated",
                result: "$82,000+ in new revenue",
                desc: "65 additional clients at avg $800 = $52,000 new revenue. Invoice delays eliminated = $30,000\u2013$50,000 accelerated cash flow.",
              },
              {
                industry: "Physiotherapy Clinic",
                location: "Richmond Hill",
                pain: "22% no-show rate across 6 practitioners",
                fix: "Dual reminders + waitlist + digital intake",
                result: "$85,000/yr recovered",
                desc: "No-shows dropped to 13.6%. Revenue from reduced empty slots + filled cancellations.",
              },
              {
                industry: "Contractor",
                location: "Mississauga",
                pain: "Losing 10+ leads/month to slow response",
                fix: "90-second lead response + after-hours AI + quote follow-up",
                result: "$24K\u2013$100K/yr recaptured",
                desc: "Quote conversion up 22%. 3\u20134 more jobs/month at $8,000\u2013$25,000 per job captured from competitors.",
              },
            ].map((card, i) => (
              <Reveal key={card.industry} delay={i * 0.08}>
                <div style={{
                  background: "white",
                  borderRadius: "1rem",
                  border: "1px solid rgba(226,228,237,0.6)",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  overflow: "hidden",
                  height: "100%",
                }}>
                  <div style={{ background: NAVY, padding: "0.75rem 1rem" }}>
                    <span style={{ color: "white", fontSize: "0.8125rem", fontWeight: 600 }}>
                      {card.industry} \u00B7 {card.location}
                    </span>
                  </div>
                  <div style={{ padding: "2rem" }}>
                    <div style={{ marginBottom: "0.875rem" }}>
                      <div style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: GREY, marginBottom: "0.25rem" }}>The problem</div>
                      <div style={{ fontSize: "0.9rem", color: DARK, lineHeight: 1.5 }}>{card.pain}</div>
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                      <div style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: GREY, marginBottom: "0.25rem" }}>The solution</div>
                      <div style={{ fontSize: "0.9rem", color: DARK, lineHeight: 1.5 }}>{card.fix}</div>
                    </div>
                    <p style={{ fontSize: "0.9375rem", color: DARK, lineHeight: 1.6, margin: 0 }}>
                      {card.desc} {" "}
                      <span style={{ color: MAGENTA, fontWeight: 800, fontSize: "1.125rem" }}>
                        {card.result}
                      </span>
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <div style={{ textAlign: "center", marginTop: "2.5rem", display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
              <Link href="/case-studies" className="btn-secondary">
                View All Case Studies
                <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn-primary">
                Book a Free Audit \u2014 See what these numbers look like for your business
                <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 13: INDUSTRY GRID (bg: OFFWHITE)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="section" style={{ background: OFFWHITE, padding: "6rem 0" }}>
        <div className="container">
          <Reveal>
            <h2 style={{ color: DARK, marginBottom: "3rem", fontSize: "clamp(1.875rem, 3.5vw, 2.25rem)", letterSpacing: "-0.02em" }}>
              Built for the Businesses That Lose the Most to Manual Operations.
            </h2>
          </Reveal>

          <div
            style={{ display: "grid", gap: "1.25rem" }}
            className="industry-selector-grid"
          >
            <style>{`
              .industry-selector-grid { grid-template-columns: 1fr !important; }
              @media (min-width: 768px) { .industry-selector-grid { grid-template-columns: 1fr 1fr !important; } }
              @media (min-width: 1024px) { .industry-selector-grid { grid-template-columns: repeat(4, 1fr) !important; } }
              .industry-selector-card:hover { border-color: ${NAVY} !important; box-shadow: 0 4px 16px rgba(40,56,145,0.12) !important; }
            `}</style>

            {[
              { icon: Calculator, name: "Accounting Firms", pain: "Tax season costs 40\u201360 hrs/wk in doc chasing. $30,000+ in staff time.", href: "/industries/accounting-firms" },
              { icon: FileText, name: "Immigration Consultants", pain: "Your consultants lose 18 hrs/wk to intake admin. $70,000+/yr at $75/hr.", href: "/industries/immigration-consultants" },
              { icon: Scale, name: "Law Firms", pain: "Every non-billable hour costs $300\u2013$500. Your lawyers lose 2 hrs/day. Do the math.", href: "/industries/law-firms" },
              { icon: Activity, name: "Physiotherapy Clinics", pain: "A 20% no-show rate at $80/visit = $150,000/yr in empty chairs.", href: "/industries/physiotherapy-clinics" },
              { icon: HardHat, name: "Contractors", pain: "Slow response loses 8\u201312 leads/month. At $8K avg job, that is $96,000+/yr.", href: "/industries/contractors" },
              { icon: Smile, name: "Dental Offices", pain: "300 overdue recall patients x $200 = $60,000 sitting in your recall list.", href: "/industries/dental-offices" },
              { icon: Building2, name: "Real Estate Teams", pain: "Abandoned 12-month leads. Each one a $15,000+ commission lost.", href: "/industries/real-estate-teams" },
              { icon: Sparkles, name: "Solopreneurs", pain: "15 hrs/wk on admin at $100/hr = $78,000/yr not spent on clients.", href: "/solopreneurs" },
            ].map((card, i) => (
              <Reveal key={card.name} delay={i * 0.05}>
                <Link
                  href={card.href}
                  className="industry-selector-card"
                  style={{
                    display: "block",
                    background: "rgba(245,246,250,0.5)",
                    border: "none",
                    borderRadius: "0.75rem",
                    padding: "2rem",
                    cursor: "pointer",
                    textDecoration: "none",
                    transition: "background 0.18s ease, box-shadow 0.18s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.5rem" }}>
                    <card.icon size={20} color={NAVY} strokeWidth={1.75} />
                    <span style={{ color: DARK, fontWeight: 700, fontSize: "0.9375rem" }}>{card.name}</span>
                  </div>
                  <div style={{ color: MAGENTA, fontSize: "0.8125rem", fontWeight: 700, lineHeight: 1.4 }}>
                    {card.pain}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 14: TIMELINE (bg: white)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="section" style={{ background: "white", padding: "6rem 0" }}>
        <div className="container">
          <Reveal>
            <div className="eyebrow" style={{ letterSpacing: "0.1em" }}>The Process</div>
            <h2 style={{ color: DARK, marginBottom: "1rem", fontSize: "clamp(1.875rem, 3.5vw, 2.25rem)", letterSpacing: "-0.02em" }}>
              From Money Leak to Money Recovered in 4 Weeks.
            </h2>
          </Reveal>

          <div
            style={{ display: "flex", gap: "0", alignItems: "stretch", marginTop: "2.5rem" }}
            className="timeline-container"
          >
            <style>{`
              .timeline-container { flex-direction: column !important; }
              @media (min-width: 1024px) { .timeline-container { flex-direction: row !important; } }
              .timeline-arrow { display: none; }
              @media (min-width: 1024px) { .timeline-arrow { display: flex !important; align-items: center; flex-shrink: 0; padding: 0 0.25rem; } }
            `}</style>

            {[
              {
                badge: "Week 1",
                title: "Free Audit",
                body: "We map your workflows and calculate exactly what your operations are costing you. You leave with a number.",
                dollar: "Identify $X in annual operational waste \u2014 at no cost",
                tag: "Free \u00B7 60 min \u00B7 No obligation",
              },
              {
                badge: "Weeks 2\u20133",
                title: "Build",
                body: "We connect your existing tools into automated workflows. Fixed pricing agreed upfront. No scope creep.",
                dollar: "Fixed price. Agreed before work begins.",
                tag: null,
              },
              {
                badge: "Week 4",
                title: "Live",
                body: "Your first automated workflow goes live. You see results within days, not months.",
                dollar: "Begin recovering the money immediately.",
                tag: null,
              },
              {
                badge: "Ongoing",
                title: "Expand",
                body: "Prove ROI on Phase 1. Decide what to automate next based on real data.",
                dollar: "Stack automations. Compound the savings.",
                tag: null,
              },
            ].map((step, i) => (
              <div key={step.title} style={{ display: "flex", flex: 1, alignItems: "stretch" }}>
                {i > 0 && (
                  <div className="timeline-arrow">
                    <ArrowRight size={20} color={GREY} strokeWidth={1.5} />
                  </div>
                )}
                <Reveal delay={i * 0.1} className="timeline-step-wrapper">
                  <div style={{
                    background: "white",
                    borderRadius: "0.875rem",
                    border: `1px solid ${BORDER}`,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                    padding: "1.5rem",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}>
                    <div style={{
                      display: "inline-flex",
                      alignSelf: "flex-start",
                      background: NAVY,
                      color: "white",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      padding: "0.3rem 0.75rem",
                      borderRadius: "2rem",
                      letterSpacing: "0.04em",
                    }}>
                      {step.badge}
                    </div>
                    <h3 style={{ color: DARK, fontWeight: 700, fontSize: "1.125rem", margin: 0 }}>
                      {step.title}
                    </h3>
                    <p style={{ color: GREY, fontSize: "0.9rem", lineHeight: 1.65, margin: 0, flex: 1 }}>
                      {step.body}
                    </p>
                    <div style={{ color: MAGENTA, fontWeight: 700, fontSize: "0.875rem" }}>
                      {step.dollar}
                    </div>
                    {step.tag && (
                      <div style={{
                        fontSize: "0.75rem",
                        color: GREY,
                        background: OFFWHITE,
                        borderRadius: "0.375rem",
                        padding: "0.375rem 0.625rem",
                        display: "inline-flex",
                        alignSelf: "flex-start",
                      }}>
                        {step.tag}
                      </div>
                    )}
                  </div>
                </Reveal>
              </div>
            ))}
          </div>

          <Reveal delay={0.2}>
            <p style={{ textAlign: "center", fontStyle: "italic", color: GREY, fontSize: "0.9375rem", marginTop: "2rem", maxWidth: "60ch", margin: "2rem auto 0" }}>
              "You do not commit to everything at once. Start with one workflow. See the ROI. Then decide."
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 15: OBJECTION FAQ — MERGED (bg: OFFWHITE)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="section" style={{ background: OFFWHITE, padding: "6rem 0" }}>
        <div className="container">
          <Reveal>
            <div className="eyebrow" style={{ letterSpacing: "0.1em" }}>Before You Decide</div>
            <div style={{ display: "grid", gap: "3rem", alignItems: "start" }} className="objection-grid">
              <style>{`
                .objection-grid { grid-template-columns: 1fr !important; }
                @media (min-width: 1024px) { .objection-grid { grid-template-columns: 1fr 1fr !important; } }
              `}</style>
              <div>
                <h2 style={{ color: DARK, marginBottom: "1rem", fontSize: "clamp(1.875rem, 3.5vw, 2.25rem)", letterSpacing: "-0.02em" }}>
                  The Questions Every Business Owner Asks Before Automating.
                </h2>
                <p style={{ color: GREY, lineHeight: 1.7, marginBottom: "1.5rem" }}>
                  Honest answers. No fluff. If automation is not right for your business, we will tell you.
                </p>
                <Link href="/contact" className="btn-primary" style={{ display: "inline-flex" }}>
                  Book a Free Audit
                  <ArrowRight size={16} />
                </Link>
              </div>
              <FAQAccordion items={mergedFAQItems} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 17: AEO BLOCK (bg: white)
          ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "white" }} className="section-sm">
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

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 18: FINAL CTA (NAVY gradient)
          ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(to bottom, #1a2d6e, #162358)", paddingTop: "5rem", paddingBottom: "5rem" }}>
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
            <h2 style={{ color: "white", marginBottom: "1rem", fontSize: "clamp(1.875rem, 3.5vw, 2.25rem)", letterSpacing: "-0.02em" }}>
              Your Operations Will Not Fix Themselves. The Audit Takes 60 Minutes.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: "2.5rem" }}>
              We will map your workflows, calculate what your manual operations cost per year, and show you exactly where automation recovers that money. Free. No obligation.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center", alignItems: "flex-start" }}>
              <div>
                <Link
                  href="/contact"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background: MAGENTA,
                    color: "white",
                    fontWeight: 700,
                    fontSize: "0.9375rem",
                    padding: "0.875rem 1.75rem",
                    borderRadius: "0.5rem",
                    textDecoration: "none",
                    boxShadow: "0 4px 20px rgba(126,15,74,0.4)",
                  }}
                >
                  Book Your Free Automation Audit
                  <ArrowRight size={16} />
                </Link>
              </div>
              <div>
                <Link
                  href="/automation-planner"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background: "transparent",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "0.9375rem",
                    padding: "0.875rem 1.75rem",
                    borderRadius: "0.5rem",
                    textDecoration: "none",
                    border: "1.5px solid rgba(255,255,255,0.4)",
                  }}
                >
                  Start the Automation Planner
                </Link>
              </div>
            </div>
            <p style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.5)", marginTop: "1.25rem" }}>
              Serving Toronto and GTA service businesses with 2\u201350 staff. Fixed pricing. Works with your existing tools.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Social proof toast (fixed position) ─── */}
      <SocialProofToast />
    </>
  );
}
