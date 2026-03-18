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
    slug: "operations-automation",
    number: "01",
    title: "Operations Automation",
    tagline: "Connect your tools. Eliminate coordination overhead.",
    description: "We build the automation layer that connects your CRM, calendar, email, project management, and invoicing tools into one coordinated system. When something happens in one tool, the right things happen automatically in all the others.",
    outcomes: ["Leads automatically logged and assigned", "Client records created without manual entry", "Tasks created and assigned on trigger events", "Status updates pushed across all systems"],
    color: "#283891",
    pipeline: PIPELINES.clientIntake,
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
    slug: "lead-automation",
    number: "03",
    title: "Lead Capture & Follow-Up",
    tagline: "Every lead captured. Every follow-up sent. No exceptions.",
    description: "A complete lead management automation system. Every inbound lead gets an immediate response, a qualification sequence, and a follow-up schedule — regardless of when they come in or how busy your team is.",
    outcomes: ["90-second automated first response", "Multi-step follow-up sequences", "Lead scoring and qualification", "CRM entry and team notification"],
    color: "#283891",
    pipeline: PIPELINES.leadCapture,
  },
  {
    slug: "client-intake",
    number: "04",
    title: "Client Intake Automation",
    tagline: "From inquiry to onboarded client without manual effort.",
    description: "The moment a new client engagement begins, the system takes over: confirmation emails, CRM record creation, file assignment, document requests, and follow-up scheduling — all without anyone on your team manually coordinating.",
    outcomes: ["Instant confirmation and welcome sequence", "CRM record auto-created", "File assigned to right team member", "Document collection initiated automatically"],
    color: "#7E0F4A",
    pipeline: PIPELINES.clientIntake,
  },
  {
    slug: "document-collection",
    number: "05",
    title: "Document Collection Automation",
    tagline: "Stop chasing documents. Let the system do it.",
    description: "Automated document request checklists, real-time tracking of what has and has not been received, 48-hour reminder sequences, and automatic escalation for overdue files. Your team focuses on the work, not the chase.",
    outcomes: ["Automated document request checklists", "Real-time receipt tracking", "48-hour reminder sequences", "Overdue file escalation and flagging"],
    color: "#283891",
    pipeline: PIPELINES.documentCollection,
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
