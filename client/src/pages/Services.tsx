/**
 * Services.tsx — Barrana.ai Services Overview
 * Design: Premium Systems Consultancy
 * Light backgrounds, scroll reveal, diverse layouts, pipeline diagrams
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import PipelineDiagram, { PIPELINES } from "@/components/diagrams/PipelineDiagram";

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

const servicesList = [
  {
    slug: "lead-response-automation",
    number: "01",
    title: "Lead Response Automation",
    tagline: "Respond to every lead in 90 seconds. Even at 11pm.",
    description: "A complete lead response system that replies instantly, qualifies the prospect, creates a CRM record, and books an appointment — automatically. The first business to respond wins. Now that's always you.",
    outcomes: ["90-second automated first response", "Multi-step follow-up sequences", "Lead scoring and qualification", "CRM entry and team notification"],
    color: "#283891",
    pipeline: PIPELINES.leadCapture,
  },
  {
    slug: "ai-receptionist",
    number: "02",
    title: "AI Receptionist",
    tagline: "Never miss a lead. Respond in under 90 seconds, 24/7.",
    description: "An AI system that responds to inbound inquiries across all your channels — website, phone, email, and social — captures the lead, qualifies them, and routes them to the right person or booking flow. Your team wakes up to qualified appointments, not missed opportunities.",
    outcomes: ["24/7 response across all channels", "Automated lead qualification", "Booking integration with your calendar", "After-hours voice AI capture"],
    color: "#7E0F4A",
    pipeline: PIPELINES.leadCapture,
  },
  {
    slug: "client-intake-automation",
    number: "03",
    title: "Client Intake Automation",
    tagline: "From inquiry to onboarded client without manual effort.",
    description: "The moment a new client engagement begins, the system takes over: confirmation emails, CRM record creation, file assignment, document requests, and follow-up scheduling — all without anyone on your team manually coordinating.",
    outcomes: ["Instant confirmation and welcome sequence", "CRM record auto-created", "File assigned to right team member", "Document collection initiated automatically"],
    color: "#283891",
    pipeline: PIPELINES.clientIntake,
  },
  {
    slug: "document-collection",
    number: "04",
    title: "Document Collection Automation",
    tagline: "Stop chasing documents. Let the system do it.",
    description: "Automated document request checklists, real-time tracking of what has and has not been received, 48-hour reminder sequences, and automatic escalation for overdue files. Your team focuses on the work, not the chase.",
    outcomes: ["Automated document request checklists", "Real-time receipt tracking", "48-hour reminder sequences", "Overdue file escalation and flagging"],
    color: "#7E0F4A",
    pipeline: PIPELINES.documentCollection,
  },
  {
    slug: "appointment-automation",
    number: "05",
    title: "Appointment Automation",
    tagline: "Booked, confirmed, and reminded — without lifting a finger.",
    description: "A fully automated scheduling system that books appointments, sends confirmation sequences, triggers pre-appointment reminders, and follows up after the meeting. Your calendar fills itself.",
    outcomes: ["Online booking integrated with your calendar", "Automated confirmation and reminder sequences", "No-show reduction through multi-step reminders", "Post-appointment follow-up triggered automatically"],
    color: "#283891",
    pipeline: PIPELINES.leadCapture,
  },
  {
    slug: "invoice-automation",
    number: "06",
    title: "Invoice Automation",
    tagline: "Invoices sent. Payments tracked. Follow-ups handled.",
    description: "Automate invoice generation, delivery, payment tracking, and overdue follow-up sequences. Get paid faster without your team manually chasing every outstanding balance.",
    outcomes: ["Auto-generated invoices on project milestone", "Payment status tracked in real time", "Overdue payment reminders sent automatically", "Reconciliation updates pushed to your accounting system"],
    color: "#7E0F4A",
    pipeline: PIPELINES.documentCollection,
  },
  {
    slug: "workflow-automation",
    number: "07",
    title: "Workflow Automation",
    tagline: "Connect your tools. Eliminate coordination overhead.",
    description: "We build the automation layer that connects your CRM, calendar, email, project management, and invoicing tools into one coordinated system. When something happens in one tool, the right things happen automatically in all the others.",
    outcomes: ["Leads automatically logged and assigned", "Client records created without manual entry", "Tasks created and assigned on trigger events", "Status updates pushed across all systems"],
    color: "#283891",
    pipeline: PIPELINES.clientIntake,
  },
  {
    slug: "crm-automation",
    number: "08",
    title: "CRM Automation",
    tagline: "Your CRM stays current — with zero manual data entry.",
    description: "Every call, email, form submission, and meeting automatically creates or updates the right CRM record. No more stale data, no more manual logging, no more deals falling through the cracks because of missing context.",
    outcomes: ["All interactions auto-logged to CRM", "Deal stages updated by trigger events", "Contact records enriched automatically", "Pipeline reports generated without manual input"],
    color: "#7E0F4A",
    pipeline: PIPELINES.clientIntake,
  },
  {
    slug: "operations-reporting",
    number: "09",
    title: "Operations Reporting",
    tagline: "Know what's happening in your business without asking.",
    description: "Automated dashboards, weekly performance summaries, and real-time status reports built from your live data. No manual compilation, no spreadsheets — just the numbers you need, ready when you need them.",
    outcomes: ["Automated weekly performance reports", "Real-time pipeline and revenue dashboards", "Team activity and task completion tracking", "Custom KPI alerts and anomaly flags"],
    color: "#283891",
    pipeline: PIPELINES.clientIntake,
  },
  {
    slug: "after-hours-automation",
    number: "10",
    title: "After-Hours Automation",
    tagline: "Your business never sleeps. Even when your team does.",
    description: "An after-hours system that captures every inquiry that arrives outside business hours — by phone, form, or message — qualifies the lead, books a callback or appointment, and has the full context ready for your team when they start the day.",
    outcomes: ["All after-hours inquiries captured and responded to", "Leads qualified and appointments booked overnight", "Morning briefing report ready for your team", "Zero leads lost to after-hours silence"],
    color: "#7E0F4A",
    pipeline: PIPELINES.leadCapture,
  },
  {
    slug: "ai-agents",
    number: "11",
    title: "AI Agents",
    tagline: "AI that takes actions — not just answers questions.",
    description: "Purpose-built AI agents that handle intake, follow-up, qualification, document collection, and reporting. Unlike chatbots, these agents act inside your business tools: booking appointments, creating records, sending sequences, and routing tasks.",
    outcomes: ["Agents handle repetitive coordination tasks end-to-end", "10–20+ hours of admin work recovered per week", "Consistent execution — identical process every time", "Escalates exceptions to humans automatically"],
    color: "#283891",
    pipeline: PIPELINES.clientIntake,
  },
  {
    slug: "custom-ai-systems",
    number: "12",
    title: "Custom AI Systems",
    tagline: "Your whole operation automated. Built for how you work.",
    description: "For businesses that have outgrown individual automations. We design and build a unified AI system that connects all your workflows, agents, and tools into one governed operational platform — with full visibility and control.",
    outcomes: ["+30–50% capacity without new headcount", "One source of truth across all tools", "Unified monitoring and reporting dashboard", "Phased implementation with quick early wins"],
    color: "#7E0F4A",
    pipeline: PIPELINES.clientIntake,
  },
];

function ServiceSection({ service, idx }: { service: typeof servicesList[0]; idx: number }) {
  const reveal = useReveal();
  const isEven = idx % 2 === 0;
  return (
    <section
      className="py-20 lg:py-24"
      style={{ backgroundColor: isEven ? "#FFFFFF" : "#F2F4F8" }}
    >
      <div className="container">
        <div
          ref={reveal.ref}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          style={{
            opacity: reveal.visible ? 1 : 0,
            transform: reveal.visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className={isEven ? "" : "lg:order-2"}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-5xl font-extrabold opacity-10" style={{ color: service.color }}>{service.number}</span>
              <span className="section-label">{service.title}</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold mb-3" style={{ color: "#111827" }}>
              {service.tagline}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>

            <div className="space-y-2 mb-8">
              {service.outcomes.map((outcome) => (
                <div key={outcome} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: service.color }} />
                  <span className="text-sm text-gray-700">{outcome}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href={`/services/${service.slug}`} className="btn-primary text-sm">
                View Service Details
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <Link href="/contact" className="btn-outline text-sm">Get a Quote</Link>
            </div>
          </div>

          <div className={isEven ? "" : "lg:order-1"}>
            <div
              className="rounded-2xl p-6"
              style={{
                background: "white",
                border: "1px solid rgba(40,56,145,0.08)",
                boxShadow: "0 8px 32px rgba(40,56,145,0.06)",
              }}
            >
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                {service.title} Workflow
              </p>
              <PipelineDiagram steps={service.pipeline} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Services() {
  const hero = useReveal(0.05);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden" style={{ backgroundColor: "#F7F8FB" }}>
        <div className="absolute inset-0 dot-grid-bg opacity-50 pointer-events-none" />
        <div className="container relative z-10">
          <div
            ref={hero.ref}
            style={{
              opacity: hero.visible ? 1 : 0,
              transform: hero.visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <div className="section-divider mb-4">
              <span className="section-label">Services</span>
            </div>
            <div className="max-w-3xl">
              <h1 className="text-4xl lg:text-5xl font-extrabold mb-6" style={{ color: "#111827" }}>
                Automation Systems Built Around<br />Your Actual Workflows
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Not software subscriptions. Not AI experiments. Working automation systems built around your actual business workflows. Every service is scoped, priced, and delivered at a fixed price before work begins.
              </p>
              <Link href="/contact" className="btn-primary">
                Book a Free Automation Audit
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      {servicesList.map((service, idx) => (
        <ServiceSection key={service.slug} service={service} idx={idx} />
      ))}

      {/* CTA */}
      <section className="py-20" style={{ background: "linear-gradient(135deg, #283891 0%, #1e2d7a 50%, #7E0F4A 100%)" }}>
        <div className="container text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Ready to Automate Your Operations?</h2>
          <p className="text-blue-200 mb-8 max-w-xl mx-auto">
            Book a free 60-minute Automation Audit. We map your workflows and identify your highest-impact opportunities. No obligation.
          </p>
          <Link href="/contact" className="btn-accent">
            Book Free Automation Audit
          </Link>
        </div>
      </section>
    </div>
  );
}
