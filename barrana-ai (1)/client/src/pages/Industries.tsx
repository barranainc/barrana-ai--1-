/**
 * Industries.tsx — Barrana.ai Industries Overview
 * Design: Premium Systems Consultancy
 * Numbered alternating layout, scroll reveal, no emoji
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

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

const industriesList = [
  {
    slug: "immigration-consultants",
    number: "01",
    title: "Immigration Consultants",
    tagline: "From inquiry to case file — without the manual coordination.",
    description: "Immigration consultants manage high volumes of client inquiries, complex document requirements, and strict regulatory timelines. We build automation systems that handle intake, document collection, status updates, and follow-up — so your team focuses on the work that requires expertise.",
    automations: ["Automated intake and qualification", "Document checklist and collection", "Status update notifications", "Appointment and deadline reminders"],
    color: "#283891",
  },
  {
    slug: "accounting-firms",
    number: "02",
    title: "Accounting & Tax Firms",
    tagline: "Stop chasing documents. Let the system do it.",
    description: "Accounting and tax firms lose significant time to document collection, client follow-up, and manual data entry. We automate the coordination work — document requests, reminder sequences, CRM updates, and invoice generation — so your team spends time on billable work.",
    automations: ["Document collection and reminders", "Tax season intake automation", "Invoice generation and follow-up", "Client onboarding sequences"],
    color: "#7E0F4A",
  },
  {
    slug: "law-firms",
    number: "03",
    title: "Law Firms",
    tagline: "Client intake and matter management without the manual overhead.",
    description: "Law firms deal with sensitive client information, complex intake requirements, and strict confidentiality obligations. We build PIPEDA-aware automation systems that handle intake, document collection, and client communication — without routing sensitive data through unsecured channels.",
    automations: ["Secure client intake automation", "Conflict check workflow integration", "Document request and collection", "Matter status notifications"],
    color: "#283891",
  },
  {
    slug: "contractors",
    number: "04",
    title: "Contractors & Trades",
    tagline: "Never miss a lead. Quote faster. Follow up automatically.",
    description: "Contractors lose jobs to competitors who respond faster. We build lead capture and follow-up systems that respond to every inquiry within 90 seconds, qualify the lead, and route it to the right person — regardless of when it comes in.",
    automations: ["24/7 lead capture and response", "Automated quote follow-up", "Job scheduling and confirmation", "Invoice and payment automation"],
    color: "#7E0F4A",
  },
  {
    slug: "clinics",
    number: "05",
    title: "Clinics & Healthcare",
    tagline: "Appointment management and patient intake without the phone tag.",
    description: "Clinics spend significant staff time on appointment scheduling, confirmation calls, and intake paperwork. We build automation systems that handle booking, reminders, intake forms, and follow-up — freeing your front desk for patient-facing work.",
    automations: ["Online booking and confirmation", "Automated appointment reminders", "Patient intake form collection", "No-show follow-up sequences"],
    color: "#283891",
  },
  {
    slug: "real-estate",
    number: "06",
    title: "Real Estate Teams",
    tagline: "Lead response in 90 seconds. Follow-up that never drops the ball.",
    description: "Real estate teams work in a fast-moving market where lead response time determines outcomes. We build lead capture, qualification, and follow-up systems that ensure every inquiry gets an immediate response and a structured follow-up sequence.",
    automations: ["Instant lead response across channels", "Automated showing scheduling", "Lead nurture sequences", "Transaction coordination automation"],
    color: "#7E0F4A",
  },
];

function IndustryRow({ industry, idx }: { industry: typeof industriesList[0]; idx: number }) {
  const reveal = useReveal();
  const isEven = idx % 2 === 0;
  return (
    <div
      ref={reveal.ref}
      className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center py-14 lg:py-16"
      style={{
        borderTop: "1px solid rgba(40,56,145,0.08)",
        opacity: reveal.visible ? 1 : 0,
        transform: reveal.visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <div className={isEven ? "" : "lg:order-2"}>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl font-extrabold" style={{ color: industry.color, opacity: 0.12 }}>{industry.number}</span>
          <span className="section-label">{industry.title}</span>
        </div>
        <h2 className="text-2xl lg:text-3xl font-extrabold mb-3" style={{ color: "#111827" }}>
          {industry.tagline}
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">{industry.description}</p>
        <Link href={`/industries/${industry.slug}`} className="btn-primary text-sm">
          View Industry Solutions
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </Link>
      </div>

      <div className={isEven ? "" : "lg:order-1"}>
        <div
          className="rounded-2xl p-6"
          style={{
            backgroundColor: isEven ? "#F7F8FB" : "rgba(40,56,145,0.03)",
            border: "1px solid rgba(40,56,145,0.08)",
          }}
        >
          <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: industry.color }}>
            Common Automations
          </p>
          <div className="space-y-3">
            {industry.automations.map((a, i) => (
              <div
                key={a}
                className="flex items-center gap-3 p-3 bg-white rounded-xl"
                style={{
                  border: "1px solid rgba(40,56,145,0.06)",
                  opacity: reveal.visible ? 1 : 0,
                  transform: reveal.visible ? "translateX(0)" : "translateX(12px)",
                  transition: `opacity 0.4s ease ${i * 0.08 + 0.3}s, transform 0.4s ease ${i * 0.08 + 0.3}s`,
                }}
              >
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${industry.color}18` }}
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke={industry.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-sm text-gray-700">{a}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Industries() {
  const hero = useReveal(0.05);
  const cta = useReveal(0.2);

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
              <span className="section-label">Industries We Serve</span>
            </div>
            <div className="max-w-3xl">
              <h1 className="text-4xl lg:text-5xl font-extrabold mb-6" style={{ color: "#111827" }}>
                Automation Built Around<br />How Your Industry Works
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                We specialize in professional service businesses in Toronto and the GTA. Each industry has specific workflows, compliance requirements, and operational patterns. We build automation systems that reflect those realities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="pb-8" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container">
          {industriesList.map((industry, idx) => (
            <IndustryRow key={industry.slug} industry={industry} idx={idx} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, #283891 0%, #1e2d7a 50%, #7E0F4A 100%)" }}
      >
        <div
          ref={cta.ref}
          className="container text-center"
          style={{
            opacity: cta.visible ? 1 : 0,
            transform: cta.visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <h2 className="text-3xl font-extrabold text-white mb-4">Don't See Your Industry?</h2>
          <p className="text-blue-200 mb-8 max-w-xl mx-auto">
            We work with any professional service business in the GTA. Book a free Automation Audit and we will map your specific workflows.
          </p>
          <Link href="/contact" className="btn-accent">
            Book Free Automation Audit
          </Link>
        </div>
      </section>
    </div>
  );
}
