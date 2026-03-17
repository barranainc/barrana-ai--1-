/*
 * Home.tsx — Barrana.ai Homepage
 * Brand Colors (OFFICIAL):
 *   Navy:    #283891  (primary — nav, headings, CTAs, dark sections)
 *   Magenta: #7E0F4A  (accent — underlines, highlights, badges, hover)
 *   Grey:    #7B7B7B  (body text, secondary labels)
 * Hero: Light background with "Stop drowning in admin. Automate it." tagline
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import JsonLd from "@/components/JsonLd";
import HeroWorkflowDiagram from "@/components/diagrams/HeroWorkflowDiagram";
import SystemArchDiagram from "@/components/diagrams/SystemArchDiagram";
import MethodologyFlow from "@/components/diagrams/MethodologyFlow";
import PipelineDiagram, { PIPELINES } from "@/components/diagrams/PipelineDiagram";

// Brand color constants
const NAVY = "#283891";
const MAGENTA = "#7E0F4A";
const GREY = "#7B7B7B";
const DARK = "#1A1A2E";
const OFFWHITE = "#F5F6FA";
const BORDER = "#E2E4ED";

// ─── Scroll reveal hook ───
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

// ─── Animated counter ───
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useReveal(0.5);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 1400;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Home() {
  const hero = useReveal(0.05);
  const problemsReveal = useReveal();
  const solution = useReveal();
  const methodology = useReveal();
  const workflows = useReveal();
  const caseStudies = useReveal();
  const industriesReveal = useReveal();
  const stats = useReveal(0.3);
  const faq = useReveal();
  const cta = useReveal(0.2);

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeWorkflow, setActiveWorkflow] = useState(0);

  const faqs = [
    { q: "What types of businesses do you work with?", a: "We work with small and medium businesses in the Toronto and GTA area with 2 to 50 staff. Our clients are typically professional service firms — immigration consultants, accounting firms, law firms, contractors, clinics, and real estate teams — who rely on client relationships and are losing time to manual coordination." },
    { q: "How long does it take to see results?", a: "Most clients see measurable operational improvements within 30 days of deployment. Our methodology is designed to prioritize the highest-impact, lowest-friction automations first, so you get ROI quickly before we build out the full system." },
    { q: "Do you replace our existing software?", a: "No. We integrate with the tools you already use — your CRM, calendar, email, invoicing system, and project management tools. We build automation layers that connect them together, not replace them." },
    { q: "What does fixed-price mean?", a: "Every engagement is scoped and priced before work begins. You know exactly what you are getting and what it costs. There are no hourly billing surprises. If scope changes, we discuss it openly before proceeding." },
    { q: "Is this PIPEDA compliant?", a: "Yes. We build all systems with Canadian privacy law in mind. Client data stays within Canadian-compliant infrastructure. We document data flows and ensure your automation systems meet PIPEDA requirements." },
    { q: "What happens after the system is deployed?", a: "We provide a monitoring and optimization phase where we track system performance, resolve edge cases, and refine based on real operational data. The system improves as your business evolves." },
  ];

  const workflowTabs = [
    { label: "Lead Capture", pipeline: PIPELINES.leadCapture },
    { label: "Client Intake", pipeline: PIPELINES.clientIntake },
    { label: "Document Collection", pipeline: PIPELINES.documentCollection },
  ];

  const problemsList = [
    {
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      title: "Leads Going Cold",
      body: "A potential client fills out your contact form at 7pm on a Friday. By Monday morning, they have already booked with a competitor. Your response time is not a sales problem. It is a systems problem.",
    },
    {
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
      title: "Admin Eating Hours",
      body: "Someone on your team is spending 2 to 3 hours every day copying information between systems: intake forms to CRMs, invoices to QuickBooks, schedules to project trackers. This work creates no value.",
    },
    {
      icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
      title: "No Visibility Into Operations",
      body: "You are running a business, but you are not entirely sure which stage each client is in, whether your team is overloaded, or which tasks have been dropped. Manual operations are invisible operations.",
    },
    {
      icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
      title: "Missed Calls and Inquiries",
      body: "Your phone goes unanswered during busy hours. Messages come in through email, Instagram, and your website at the same time and no single system captures all of them.",
    },
    {
      icon: "M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z",
      title: "Invoicing and Follow-Up Delays",
      body: "Invoices go out late. Payment reminders do not get sent until someone remembers. Cash flow suffers not because of bad clients, but because of inconsistent processes.",
    },
    {
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
      title: "Staff Doing Work That Does Not Scale",
      body: "Your team is good at client work. But they are spending a significant portion of their time on coordination, scheduling, and administrative tasks that could be handled systematically.",
    },
  ];

  const industriesList = [
    { icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", label: "Immigration Consultants", sub: "Client intake, document collection, file tracking", href: "/industries/immigration-consultants" },
    { icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z", label: "Accounting Firms", sub: "Document chase elimination, invoice automation", href: "/industries/accounting-firms" },
    { icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3", label: "Law Firms", sub: "Matter intake, billing cycles, client updates", href: "/industries/law-firms" },
    { icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z", label: "Contractors", sub: "Lead capture, quote follow-up, job scheduling", href: "/industries/contractors" },
    { icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", label: "Physiotherapy Clinics", sub: "Appointment reminders, patient intake, no-show reduction", href: "/industries/physiotherapy-clinics" },
    { icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: "Real Estate Teams", sub: "Lead nurture, CRM automation, listing alerts", href: "/industries/real-estate-teams" },
    { icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", label: "Service Businesses", sub: "Scheduling, follow-up, client communication", href: "/industries/service-businesses" },
  ];

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Barrana.ai",
    "url": "https://barrana.ai",
    "description": "AI automation for small business in Toronto and the GTA.",
    "address": { "@type": "PostalAddress", "addressLocality": "Toronto", "addressRegion": "ON", "addressCountry": "CA" },
    "areaServed": ["Toronto", "Vaughan", "Markham", "Richmond Hill", "Mississauga", "North York"],
    "serviceType": ["AI Automation", "Business Process Automation", "Workflow Automation", "CRM Integration"],
  };

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={orgSchema} />

      {/* ─── HERO — Light background, new tagline ─── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "#FFFFFF",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        {/* Subtle dot-grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(40,56,145,0.055) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
        {/* Soft colour blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute" style={{ top: "10%", right: "5%", width: 480, height: 480, borderRadius: "50%", background: `radial-gradient(circle, rgba(40,56,145,0.05) 0%, transparent 70%)`, animation: "mesh-move 14s ease-in-out infinite" }} />
          <div className="absolute" style={{ bottom: "10%", left: "0%", width: 360, height: 360, borderRadius: "50%", background: `radial-gradient(circle, rgba(126,15,74,0.04) 0%, transparent 70%)`, animation: "mesh-move 18s ease-in-out 4s infinite reverse" }} />
        </div>

        <div className="container relative z-10 pt-28 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: Copy */}
            <div
              ref={hero.ref}
              style={{
                opacity: hero.visible ? 1 : 0,
                transform: hero.visible ? "translateY(0)" : "translateY(36px)",
                transition: "opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-0.5 rounded" style={{ backgroundColor: NAVY }} />
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: NAVY, letterSpacing: "0.14em" }}
                >
                  AI Automation for Toronto Businesses
                </span>
              </div>

              {/* Main headline — matches the screenshot exactly */}
              <h1
                className="font-extrabold leading-tight mb-6"
                style={{ color: DARK, fontSize: "clamp(2.5rem, 5.5vw, 4rem)", letterSpacing: "-0.03em" }}
              >
                Stop drowning in<br />
                admin.{" "}
                <span
                  className="relative inline-block"
                  style={{ color: NAVY }}
                >
                  Automate it.
                  {/* Magenta underline */}
                  <span
                    className="absolute left-0 bottom-0 w-full"
                    style={{
                      height: "3px",
                      background: MAGENTA,
                      display: "block",
                      transformOrigin: "left",
                      animation: "underline-grow 0.8s cubic-bezier(0.16,1,0.3,1) 0.6s both",
                    }}
                  />
                </span>
              </h1>

              <p className="text-lg leading-relaxed mb-4 max-w-xl" style={{ color: GREY }}>
                Barrana.ai builds AI automation systems that close response gaps, eliminate manual coordination, and give small businesses in Toronto and the GTA the operational backbone to grow without adding headcount.
              </p>

              <p className="text-sm leading-relaxed mb-8 max-w-xl" style={{ color: GREY, opacity: 0.8 }}>
                A lead comes in at 7pm and sits unanswered until morning. A new client onboards and someone spends 40 minutes copying data between systems. An invoice goes out two weeks late because no one remembered to generate it. These are not isolated problems — they are symptoms of operations that depend on manual effort for tasks that should run automatically.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <Link href="/contact" className="btn-primary">
                  Book a Free Automation Audit
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
                <Link href="/case-studies" className="btn-secondary">
                  View Example Workflows
                </Link>
              </div>

              <div className="flex flex-wrap gap-6">
                {["10+ years software delivery", "PIPEDA-aware", "Fixed-price engagements"].map((badge) => (
                  <div key={badge} className="flex items-center gap-2 text-sm" style={{ color: GREY }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: MAGENTA }} />
                    {badge}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Animated diagram — full width, properly sized */}
            <div
              style={{
                opacity: hero.visible ? 1 : 0,
                transform: hero.visible ? "translateX(0)" : "translateX(36px)",
                transition: "opacity 1s ease 0.25s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.25s",
              }}
            >
              <div
                className="relative rounded-2xl p-4 lg:p-6"
                style={{
                  background: OFFWHITE,
                  border: `1px solid ${BORDER}`,
                  boxShadow: `0 20px 60px rgba(40,56,145,0.08), 0 4px 16px rgba(40,56,145,0.04)`,
                }}
              >
                {/* Window chrome */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1.5">
                    {["#ff5f57","#febc2e","#28c840"].map((c) => (
                      <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                  <span
                    className="text-xs font-semibold uppercase tracking-widest ml-2"
                    style={{ color: GREY }}
                  >
                    Small Business Automation System
                  </span>
                </div>
                {/* Diagram fills the full width of the card */}
                <div className="w-full overflow-hidden">
                  <HeroWorkflowDiagram />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS BAND ─── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: NAVY }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `linear-gradient(90deg, transparent 0%, rgba(126,15,74,0.08) 50%, transparent 100%)` }}
        />
        <div className="container py-12">
          <div ref={stats.ref} className="grid grid-cols-2 lg:grid-cols-4">
            {[
              { value: 10, suffix: "+", label: "Years of software delivery" },
              { value: 6, suffix: "", label: "GTA cities served" },
              { value: 90, suffix: " days", label: "Max ROI recovery window" },
              { value: 100, suffix: "%", label: "Fixed-price engagements" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="text-center py-6 px-6 relative"
                style={{
                  opacity: stats.visible ? 1 : 0,
                  transform: stats.visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
                  transition: `opacity 0.6s ease ${i * 0.12}s, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.12}s`,
                  borderRight: i < 3 ? "1px solid rgba(255,255,255,0.1)" : "none",
                }}
              >
                <div className="text-4xl lg:text-5xl font-extrabold text-white mb-2" style={{ letterSpacing: "-0.04em" }}>
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── APPROACH ─── */}
      <section style={{ backgroundColor: OFFWHITE }} className="py-20 lg:py-28">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="eyebrow">Our Approach</div>
              <h2 className="text-3xl lg:text-4xl font-extrabold mb-6" style={{ color: DARK }}>
                Built for Operators,<br />Not Just Optimists
              </h2>
              <p className="leading-relaxed mb-5" style={{ color: GREY }}>
                We have spent over a decade building software systems for businesses across industries. Barrana.ai was created because we kept seeing the same problem: small business owners were being sold AI tools with no plan for how those tools would actually fit into their day-to-day operations.
              </p>
              <p className="leading-relaxed mb-8" style={{ color: GREY }}>
                Before writing a single line of automation logic, we map your workflows, identify friction points, and build systems that reduce your team's cognitive load — not add to it.
              </p>
              <Link href="/about" className="btn-secondary">
                About Barrana.ai
              </Link>
            </div>
            <div
              className="relative rounded-2xl p-6 lg:p-8"
              style={{
                background: "white",
                border: `1px solid ${BORDER}`,
                boxShadow: `0 16px 48px rgba(40,56,145,0.07)`,
              }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: GREY }}>
                Barrana Automation Layer
              </p>
              <div className="w-full overflow-hidden">
                <SystemArchDiagram />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── OPERATIONAL PROBLEMS ─── */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "#FFFFFF" }}>
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
              <h2 className="text-3xl lg:text-4xl font-extrabold" style={{ color: DARK }}>
                If Your Business Has a Team,<br />It Has These Problems
              </h2>
              <p className="leading-relaxed" style={{ color: GREY }}>
                These are not unique to your industry. They are symptoms of manual operations running at capacity.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-px rounded-2xl overflow-hidden" style={{ backgroundColor: BORDER }}>
            {problemsList.map((p, i) => (
              <div
                key={p.title}
                className="bg-white p-7 group transition-colors"
                style={{
                  opacity: problemsReveal.visible ? 1 : 0,
                  transform: problemsReveal.visible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.5s ease ${0.1 + i * 0.07}s, transform 0.5s ease ${0.1 + i * 0.07}s`,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = OFFWHITE)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `rgba(40,56,145,0.08)` }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={p.icon} />
                  </svg>
                </div>
                <h3 className="font-bold text-base mb-2" style={{ color: DARK }}>{p.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: GREY }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THE BARRANA SOLUTION ─── */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: OFFWHITE }}>
        <div className="container">
          <div
            ref={solution.ref}
            className="grid lg:grid-cols-2 gap-16 items-center"
            style={{
              opacity: solution.visible ? 1 : 0,
              transform: solution.visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <div>
              <div className="eyebrow">The Barrana Solution</div>
              <h2 className="text-3xl lg:text-4xl font-extrabold mb-6" style={{ color: DARK }}>
                We Build Systems That Do the Operational Work for You
              </h2>
              <p className="leading-relaxed mb-4" style={{ color: GREY }}>
                Not software subscriptions. Not AI experiments. Working automation systems built around your actual business workflows.
              </p>
              <p className="leading-relaxed mb-4" style={{ color: GREY }}>
                Barrana.ai operates as a systems integrator. We take the tools your business already uses and build automation layers that connect them together.
              </p>
              <p className="leading-relaxed mb-6" style={{ color: GREY }}>
                When a new lead comes in, the system responds immediately, logs it in your CRM, notifies the right person, and schedules the follow-up. When a client completes an intake form, the information routes directly to your project management system without anyone manually copying it.
              </p>

              <blockquote
                className="border-l-4 pl-5 py-1 mb-8 italic"
                style={{ borderColor: MAGENTA, color: DARK }}
              >
                "This is not AI replacing your team. This is AI handling the coordination work your team should not be doing in the first place."
              </blockquote>

              <Link href="/services" className="btn-primary">
                View All Services
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>

            <div className="space-y-3">
              {[
                { title: "Operations Automation", desc: "Connect your CRM, calendar, email, and project management tools into one coordinated system.", href: "/services/operations-automation" },
                { title: "AI Receptionist", desc: "Never miss a lead. An AI system that responds to inquiries 24/7 across all your channels.", href: "/services/ai-receptionist" },
                { title: "Lead Capture & Follow-Up", desc: "Automated response, qualification, and booking sequences for every inbound lead.", href: "/services/lead-automation" },
                { title: "Client Intake Automation", desc: "From inquiry to onboarded client without manual data entry or coordination.", href: "/services/workflow-automation" },
                { title: "Document Collection", desc: "Automated checklists, reminders, and tracking so your team stops chasing documents.", href: "/services/workflow-automation" },
              ].map((service, i) => (
                <Link
                  key={service.title}
                  href={service.href}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl border transition-all group"
                  style={{
                    borderColor: BORDER,
                    opacity: solution.visible ? 1 : 0,
                    transform: solution.visible ? "translateX(0)" : "translateX(20px)",
                    transition: `opacity 0.5s ease ${0.1 + i * 0.08}s, transform 0.5s ease ${0.1 + i * 0.08}s, border-color 0.2s, box-shadow 0.2s`,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = `rgba(40,56,145,0.2)`;
                    el.style.boxShadow = `0 4px 16px rgba(40,56,145,0.07)`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = BORDER;
                    el.style.boxShadow = "none";
                  }}
                >
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: i % 2 === 0 ? NAVY : MAGENTA }} />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm mb-0.5" style={{ color: DARK }}>{service.title}</div>
                    <div className="text-xs leading-relaxed" style={{ color: GREY }}>{service.desc}</div>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5 opacity-25 group-hover:opacity-70 transition-opacity">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke={NAVY} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── METHODOLOGY ─── */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <div
            ref={methodology.ref}
            style={{
              opacity: methodology.visible ? 1 : 0,
              transform: methodology.visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <div className="eyebrow">How We Work</div>
            <div className="grid lg:grid-cols-2 gap-4 items-end mb-14">
              <h2 className="text-3xl lg:text-4xl font-extrabold" style={{ color: DARK }}>
                The Barrana<br />Automation Method
              </h2>
              <p className="leading-relaxed" style={{ color: GREY }}>
                Five stages. Fixed pricing. Clear deliverables at every step.
              </p>
            </div>
          </div>
          <div className="w-full overflow-hidden">
            <MethodologyFlow />
          </div>
          <div className="mt-12 text-center">
            <Link href="/contact" className="btn-primary">
              Start With a Free Automation Audit
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WORKFLOW EXAMPLES ─── */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: OFFWHITE }}>
        <div className="container">
          <div
            ref={workflows.ref}
            style={{
              opacity: workflows.visible ? 1 : 0,
              transform: workflows.visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <div className="eyebrow">Real-World Examples</div>
            <div className="grid lg:grid-cols-2 gap-4 items-end mb-10">
              <h2 className="text-3xl lg:text-4xl font-extrabold" style={{ color: DARK }}>
                What Automation Looks Like<br />in a Real Business
              </h2>
              <p className="leading-relaxed" style={{ color: GREY }}>
                These are examples of the types of workflows we have built for GTA businesses.
              </p>
            </div>
          </div>

          <div className="flex gap-2 mb-8 flex-wrap">
            {workflowTabs.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setActiveWorkflow(i)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                style={{
                  backgroundColor: activeWorkflow === i ? NAVY : "white",
                  color: activeWorkflow === i ? "white" : GREY,
                  border: `1.5px solid ${activeWorkflow === i ? NAVY : BORDER}`,
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div
            className="bg-white rounded-2xl p-6 lg:p-8 border"
            style={{ borderColor: BORDER }}
          >
            {workflowTabs[activeWorkflow] && (
              <div className="w-full overflow-hidden">
                <PipelineDiagram
                  steps={workflowTabs[activeWorkflow].pipeline}
                  title={workflowTabs[activeWorkflow].label + " Automation Pipeline"}
                />
              </div>
            )}

            <div className="mt-8 pt-6 border-t" style={{ borderColor: BORDER }}>
              {activeWorkflow === 0 && (
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-bold text-sm mb-2" style={{ color: DARK }}>Contractor: Lead Response and Booking</h4>
                    <p className="text-sm leading-relaxed" style={{ color: GREY }}>A homeowner submits a quote request through the website at 9pm. Within 90 seconds, they receive a confirmation, a short questionnaire to qualify the job, and a link to book a site visit.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-2" style={{ color: DARK }}>Result</h4>
                    <p className="text-sm leading-relaxed" style={{ color: GREY }}>The contractor wakes up the next morning with a qualified appointment already in Jobber. No one on the team needed to respond manually.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-2" style={{ color: DARK }}>Outcome</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2"><span className="text-xs font-bold" style={{ color: NAVY }}>90 sec</span><span className="text-xs" style={{ color: GREY }}>lead response time</span></div>
                      <div className="flex items-center gap-2"><span className="text-xs font-bold" style={{ color: MAGENTA }}>+22%</span><span className="text-xs" style={{ color: GREY }}>quote conversion</span></div>
                      <div className="flex items-center gap-2"><span className="text-xs font-bold" style={{ color: NAVY }}>100%</span><span className="text-xs" style={{ color: GREY }}>after-hours captured</span></div>
                    </div>
                  </div>
                </div>
              )}
              {activeWorkflow === 1 && (
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-bold text-sm mb-2" style={{ color: DARK }}>Immigration Consultant: Client Intake</h4>
                    <p className="text-sm leading-relaxed" style={{ color: GREY }}>A new client fills out a consultation request form. The system immediately sends a confirmation email, creates a client record in the CRM, assigns the file to a consultant based on visa type.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-2" style={{ color: DARK }}>Result</h4>
                    <p className="text-sm leading-relaxed" style={{ color: GREY }}>No one on the team needs to touch this until the consultation date. A follow-up task is automatically scheduled for 24 hours later.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-2" style={{ color: DARK }}>Outcome</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2"><span className="text-xs font-bold" style={{ color: NAVY }}>87%</span><span className="text-xs" style={{ color: GREY }}>intake time reduction</span></div>
                      <div className="flex items-center gap-2"><span className="text-xs font-bold" style={{ color: MAGENTA }}>0</span><span className="text-xs" style={{ color: GREY }}>manual data entry steps</span></div>
                      <div className="flex items-center gap-2"><span className="text-xs font-bold" style={{ color: NAVY }}>45 days</span><span className="text-xs" style={{ color: GREY }}>ROI recovery</span></div>
                    </div>
                  </div>
                </div>
              )}
              {activeWorkflow === 2 && (
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-bold text-sm mb-2" style={{ color: DARK }}>Accounting Firm: Document Collection</h4>
                    <p className="text-sm leading-relaxed" style={{ color: GREY }}>When a client engagement starts, the system automatically sends a document request checklist, tracks which documents have been received, and sends reminders for outstanding items every 48 hours.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-2" style={{ color: DARK }}>Result</h4>
                    <p className="text-sm leading-relaxed" style={{ color: GREY }}>Staff no longer chase documents manually. Files that are overdue are automatically flagged and escalated. The team focuses on filing, not chasing.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-2" style={{ color: DARK }}>Outcome</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2"><span className="text-xs font-bold" style={{ color: NAVY }}>8 hrs</span><span className="text-xs" style={{ color: GREY }}>saved per week</span></div>
                      <div className="flex items-center gap-2"><span className="text-xs font-bold" style={{ color: MAGENTA }}>100%</span><span className="text-xs" style={{ color: GREY }}>document tracking</span></div>
                      <div className="flex items-center gap-2"><span className="text-xs font-bold" style={{ color: NAVY }}>60 days</span><span className="text-xs" style={{ color: GREY }}>ROI recovery</span></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link href="/case-studies" className="btn-secondary">
              See Full Case Studies
            </Link>
          </div>
        </div>
      </section>

      {/* ─── INDUSTRIES ─── */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <div
            ref={industriesReveal.ref}
            style={{
              opacity: industriesReveal.visible ? 1 : 0,
              transform: industriesReveal.visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <div className="eyebrow">Industries We Serve</div>
            <div className="grid lg:grid-cols-2 gap-4 items-end mb-12">
              <h2 className="text-3xl lg:text-4xl font-extrabold" style={{ color: DARK }}>
                We Work With Operators,<br />Not Industries
              </h2>
              <p className="leading-relaxed" style={{ color: GREY }}>
                Every industry has different workflows. We have studied the operational patterns of each one.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {industriesList.map((ind, i) => (
              <Link
                key={ind.label}
                href={ind.href}
                className="group relative overflow-hidden rounded-2xl p-6 border bg-white transition-all"
                style={{
                  borderColor: BORDER,
                  opacity: industriesReveal.visible ? 1 : 0,
                  transform: industriesReveal.visible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.5s ease ${0.05 + i * 0.06}s, transform 0.5s ease ${0.05 + i * 0.06}s, border-color 0.2s, box-shadow 0.2s`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = `rgba(40,56,145,0.2)`;
                  el.style.boxShadow = `0 12px 32px rgba(40,56,145,0.08)`;
                  el.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = BORDER;
                  el.style.boxShadow = "none";
                  el.style.transform = "translateY(0)";
                }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110" style={{ backgroundColor: `rgba(40,56,145,0.08)` }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={ind.icon} />
                  </svg>
                </div>
                <h3 className="font-bold text-sm mb-1 transition-colors" style={{ color: DARK }}>{ind.label}</h3>
                <p className="text-xs leading-relaxed" style={{ color: GREY }}>{ind.sub}</p>
                {/* Magenta underline on hover */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300" style={{ backgroundColor: MAGENTA }} />
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/industries" className="btn-secondary">
              Find Your Industry
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CASE STUDY HIGHLIGHT ─── */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: OFFWHITE }}>
        <div className="container">
          <div
            ref={caseStudies.ref}
            style={{
              opacity: caseStudies.visible ? 1 : 0,
              transform: caseStudies.visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <div className="eyebrow">Case Study Highlights</div>
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-12" style={{ color: DARK }}>
              Operational Results From Real Implementations
            </h2>
          </div>

          <div
            className="bg-white rounded-2xl overflow-hidden border"
            style={{ borderColor: BORDER }}
          >
            <div className="grid lg:grid-cols-2">
              <div className="p-8 lg:p-10">
                <div
                  className="inline-block px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider mb-4"
                  style={{ background: `rgba(40,56,145,0.08)`, color: NAVY }}
                >
                  Case Study — General Contractor, Mississauga
                </div>
                <h3 className="text-xl font-extrabold mb-4 leading-snug" style={{ color: DARK }}>
                  How a Mississauga Contractor Cut Lead Response Time and Increased Quote Conversion
                </h3>

                <div className="mb-5">
                  <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: GREY }}>The Problem</div>
                  <p className="text-sm leading-relaxed" style={{ color: GREY }}>
                    A residential renovation contractor was generating 40 to 60 inbound leads per month. The owner was on job sites from 7am to 5pm — lead inquiries came in throughout the day but meaningful follow-up only happened during breaks. An estimated 8 to 12 qualified leads were being lost per month to slow response time alone.
                  </p>
                </div>

                <div className="mb-6">
                  <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: GREY }}>The Solution</div>
                  <p className="text-sm leading-relaxed" style={{ color: GREY }}>
                    24/7 lead capture with 90-second automated response, qualification questions, Jobber booking integration, quote follow-up sequences, and after-hours voice AI capture.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { value: "90 sec", label: "Lead response time (from 4–6 hrs)" },
                    { value: "+22%", label: "Quote conversion rate in 60 days" },
                    { value: "100%", label: "After-hours leads captured" },
                    { value: "30 days", label: "Projected ROI recovery" },
                  ].map((stat) => (
                    <div key={stat.label} className="p-3 rounded-xl" style={{ backgroundColor: OFFWHITE }}>
                      <div className="text-xl font-extrabold mb-0.5" style={{ color: NAVY }}>{stat.value}</div>
                      <div className="text-xs" style={{ color: GREY }}>{stat.label}</div>
                    </div>
                  ))}
                </div>

                <Link href="/case-studies" className="btn-primary text-sm">
                  Read Full Case Study
                </Link>
              </div>

              <div
                className="p-8 lg:p-10 flex flex-col justify-center"
                style={{ backgroundColor: OFFWHITE, borderLeft: `1px solid ${BORDER}` }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider mb-6" style={{ color: GREY }}>Contractor Lead Automation System</p>
                <div className="w-full overflow-hidden">
                  <PipelineDiagram steps={PIPELINES.leadCapture} />
                </div>

                <div className="mt-8 pt-6 border-t" style={{ borderColor: BORDER }}>
                  <div
                    className="inline-block px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider mb-3"
                    style={{ background: `rgba(126,15,74,0.08)`, color: MAGENTA }}
                  >
                    Immigration Firm, North York
                  </div>
                  <h4 className="font-bold text-sm mb-2" style={{ color: DARK }}>Client Intake Time Reduced by an Estimated 87%</h4>
                  <p className="text-xs leading-relaxed mb-3" style={{ color: GREY }}>
                    Intake time per new client dropped from approximately 45 minutes to under 6 minutes. The firm onboards clients faster and with fewer errors.
                  </p>
                  <div className="flex gap-4">
                    <div><span className="text-sm font-bold" style={{ color: NAVY }}>87%</span><span className="text-xs ml-1" style={{ color: GREY }}>time reduction</span></div>
                    <div><span className="text-sm font-bold" style={{ color: MAGENTA }}>45 days</span><span className="text-xs ml-1" style={{ color: GREY }}>ROI recovery</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── AEO DIRECT ANSWER BLOCK ─── */}
      <section className="py-12" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <div className="aeo-block max-w-3xl">
            <div className="aeo-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              Direct Answer
            </div>
            <h3>What does Barrana.ai do?</h3>
            <p>Barrana.ai builds AI automation systems for small and medium businesses in Toronto and the GTA. We design, build, and deploy automation that handles lead response, client intake, document collection, appointment scheduling, invoicing, and operational reporting — so business owners and their teams can focus on client work instead of coordination. All implementations are fixed-price, PIPEDA-aware, and built around the tools you already use.</p>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <div
            ref={faq.ref}
            style={{
              opacity: faq.visible ? 1 : 0,
              transform: faq.visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <div className="eyebrow">Common Questions</div>
                <h2 className="text-3xl lg:text-4xl font-extrabold mb-6" style={{ color: DARK }}>
                  Questions We Hear<br />From Every Client
                </h2>
                <p className="leading-relaxed mb-8" style={{ color: GREY }}>
                  These are the questions that come up in almost every initial conversation. If yours is not here, book a free audit and we will answer it directly.
                </p>
                <Link href="/contact" className="btn-primary">
                  Book a Free Audit
                </Link>
              </div>

              <div className="space-y-3">
                {faqs.map((item, i) => (
                  <div
                    key={i}
                    className="faq-item"
                    style={{ borderColor: openFaq === i ? `rgba(40,56,145,0.2)` : undefined }}
                  >
                    <button
                      className="faq-trigger"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      <span>{item.q}</span>
                      <svg
                        width="16" height="16" viewBox="0 0 16 16" fill="none"
                        className="flex-shrink-0 transition-transform duration-200"
                        style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)" }}
                      >
                        <path d="M3 6l5 5 5-5" stroke={NAVY} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    {openFaq === i && (
                      <div className="faq-content">
                        <p>{item.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA BAND ─── */}
      <section className="cta-section relative py-24 overflow-hidden">
        {/* Animated concentric rings */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute" style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="absolute rounded-full border"
                style={{
                  top: "50%", left: "50%",
                  width: n * 200, height: n * 200,
                  marginLeft: -(n * 100), marginTop: -(n * 100),
                  borderColor: `rgba(126,15,74,0.1)`,
                  animation: `cta-ring-expand ${5 + n * 1.5}s ease-in-out ${n * 0.8}s infinite`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="container relative z-10 text-center">
          <div
            ref={cta.ref}
            style={{
              opacity: cta.visible ? 1 : 0,
              transform: cta.visible ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{ backgroundColor: `rgba(126,15,74,0.15)`, border: `1px solid rgba(126,15,74,0.25)` }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4ade80", animation: "pulse 2s ease-in-out infinite" }} />
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.85)" }}>Free — No Obligation</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-extrabold text-white mb-5" style={{ letterSpacing: "-0.03em" }}>
              Ready to Recover Hours Every Week?
            </h2>
            <p className="mb-10 max-w-xl mx-auto text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              Book a free 60-minute Automation Audit. We map your workflows, identify your highest-impact automation opportunities, and give you a clear picture of what is possible.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="btn-magenta text-base px-8 py-4">
                Book Free Automation Audit
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <Link href="/case-studies" className="btn-ghost-white text-base px-8 py-4">
                See Case Studies
              </Link>
            </div>
            <p className="mt-6 text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>Serving Toronto, Vaughan, Markham, Richmond Hill, Mississauga, and North York</p>
          </div>
        </div>

        <style>{`
          @keyframes cta-ring-expand {
            0%, 100% { transform: translate(-50%, -50%) scale(0.95); opacity: 0.08; }
            50%       { transform: translate(-50%, -50%) scale(1.05); opacity: 0.03; }
          }
        `}</style>
      </section>
    </div>
  );
}
