/**
 * CaseStudies.tsx — Barrana.ai Case Studies
 * Design: Premium Systems Consultancy
 * Narrative-first layout, result callouts, scroll reveal
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

const caseStudies = [
  {
    id: "contractor-mississauga",
    industry: "General Contractor",
    location: "Mississauga, ON",
    title: "How a Mississauga Contractor Cut Lead Response Time and Increased Quote Conversion",
    summary: "A residential renovation contractor was generating 40 to 60 inbound leads per month but losing 8 to 12 qualified leads per month to slow response time. Barrana.ai built a 24/7 lead automation system that reduced response time from 4–6 hours to 90 seconds.",
    challenge: "The owner was on job sites from 7am to 5pm most days. Lead inquiries came in throughout the day but meaningful follow-up only happened during breaks or after hours. An estimated 8 to 12 qualified leads were being lost per month to slow response time alone. The business had no systematic way to capture after-hours inquiries.",
    solution: [
      "24/7 lead capture form with immediate 90-second automated response",
      "AI qualification questionnaire to assess job type and budget",
      "Automatic Jobber entry for qualified leads",
      "Scheduling link for site visit booking",
      "After-hours voice AI for phone inquiries",
      "Quote follow-up sequence at 3, 7, and 14 days",
    ],
    results: [
      { metric: "90 sec", label: "Lead response time (from 4–6 hrs)" },
      { metric: "+22%", label: "Quote conversion rate in 60 days" },
      { metric: "100%", label: "After-hours leads captured" },
      { metric: "30 days", label: "Projected ROI recovery" },
    ],
    quote: "I used to lose jobs because I was on a ladder when someone called. Now every lead gets a response before I even know they reached out.",
    color: "#283891",
  },
  {
    id: "immigration-north-york",
    industry: "Immigration Consulting Firm",
    location: "North York, ON",
    title: "Client Intake Time Reduced by an Estimated 87% for North York Immigration Firm",
    summary: "A North York immigration consulting firm was spending 45 minutes per new client on manual intake processing. Barrana.ai built an automated intake system that reduced this to approximately 4 minutes while improving data quality.",
    challenge: "The firm was processing 15 to 20 new client inquiries per week. Each intake required a consultant to manually collect information, create a CRM record, send a document checklist, and schedule a consultation. This consumed approximately 12 hours of consultant time per week — time that should have been spent on file work.",
    solution: [
      "Automated intake questionnaire triggered by initial inquiry",
      "Automatic CRM record creation with visa type tagging",
      "Consultant assignment based on case type and capacity",
      "Document checklist sent automatically with tracking",
      "Consultation scheduling link with 48-hour reminder",
      "File status dashboard updated automatically",
    ],
    results: [
      { metric: "87%", label: "Reduction in intake processing time" },
      { metric: "45→4 min", label: "Intake time per new client" },
      { metric: "+11 hrs", label: "Billable capacity recovered per week" },
      { metric: "100%", label: "Intake data completeness" },
    ],
    quote: "We went from spending half our week chasing documents to having them arrive automatically. Our team now focuses on the actual immigration work.",
    color: "#7E0F4A",
  },
  {
    id: "accounting-vaughan",
    industry: "Accounting Firm",
    location: "Vaughan, ON",
    title: "Tax Season Capacity Increased by an Estimated 30% for Vaughan Accounting Firm",
    summary: "A Vaughan accounting firm was hitting capacity limits every tax season due to manual document collection and administrative overhead. Barrana.ai built an automation system that eliminated document chase and accelerated the invoice payment cycle.",
    challenge: "During tax season, staff were spending 3 to 4 hours per day chasing clients for documents, sending reminders, and organizing submissions. Invoice generation was manual and often delayed by 1 to 2 weeks. The firm was turning away new clients during peak season due to capacity constraints.",
    solution: [
      "Automated document request sent at engagement start",
      "48-hour reminder sequences for outstanding documents",
      "Automatic document organization and tagging",
      "Invoice generation triggered at engagement milestones",
      "Payment reminder sequences at 7, 14, and 21 days",
      "Client onboarding standardization across all engagements",
    ],
    results: [
      { metric: "+30%", label: "Tax season capacity increase" },
      { metric: "0 hrs", label: "Document chase time (eliminated)" },
      { metric: "11 days", label: "Invoice payment cycle acceleration" },
      { metric: "0", label: "New hires required" },
    ],
    quote: "We handled 30% more clients this tax season with the same team. The system just runs — we don't think about document collection anymore.",
    color: "#283891",
  },
];

function CaseStudySection({ cs, idx }: { cs: typeof caseStudies[0]; idx: number }) {
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
          style={{
            opacity: reveal.visible ? 1 : 0,
            transform: reveal.visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          {/* Header */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span
              className="text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{ backgroundColor: `${cs.color}15`, color: cs.color }}
            >
              {cs.industry}
            </span>
            <span className="text-xs text-gray-400">&mdash; {cs.location}</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold mb-4 max-w-3xl" style={{ color: "#111827" }}>
            {cs.title}
          </h2>
          <p className="text-gray-500 leading-relaxed mb-8 max-w-2xl">{cs.summary}</p>

          {/* Results row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {cs.results.map((r, i) => (
              <div
                key={r.label}
                className="rounded-2xl p-5 text-center"
                style={{
                  backgroundColor: isEven ? "#F7F8FB" : "#FFFFFF",
                  border: "1px solid rgba(40,56,145,0.08)",
                  opacity: reveal.visible ? 1 : 0,
                  transform: reveal.visible ? "translateY(0)" : "translateY(16px)",
                  transition: `opacity 0.4s ease ${i * 0.1 + 0.2}s, transform 0.4s ease ${i * 0.1 + 0.2}s`,
                }}
              >
                <div className="text-xl lg:text-2xl font-extrabold mb-1" style={{ color: cs.color }}>{r.metric}</div>
                <div className="text-xs text-gray-500 leading-tight">{r.label}</div>
              </div>
            ))}
          </div>

          {/* Narrative */}
          <div className="grid lg:grid-cols-2 gap-10 mb-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-3 text-xs uppercase tracking-wider">The Challenge</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{cs.challenge}</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-3 text-xs uppercase tracking-wider">The Solution</h3>
              <div className="space-y-2">
                {cs.solution.map((s) => (
                  <div key={s} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ backgroundColor: cs.color }} />
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quote */}
          <div
            className="rounded-2xl p-6"
            style={{ backgroundColor: cs.color }}
          >
            <svg width="24" height="18" viewBox="0 0 24 18" fill="none" className="mb-3 opacity-40">
              <path d="M0 18V10.8C0 7.8 0.7 5.3 2.1 3.3C3.5 1.1 5.6 0 8.4 0L9.6 2.4C8 2.8 6.7 3.7 5.7 5.1C4.9 6.3 4.5 7.6 4.5 9H9V18H0ZM15 18V10.8C15 7.8 15.7 5.3 17.1 3.3C18.5 1.1 20.6 0 23.4 0L24.6 2.4C23 2.8 21.7 3.7 20.7 5.1C19.9 6.3 19.5 7.6 19.5 9H24V18H15Z" fill="white"/>
            </svg>
            <p className="text-white font-medium leading-relaxed italic">{cs.quote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CaseStudies() {
  const hero = useReveal(0.05);
  const disclaimer = useReveal();
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
              <span className="section-label">Case Studies</span>
            </div>
            <div className="max-w-3xl">
              <h1 className="text-4xl lg:text-5xl font-extrabold mb-6" style={{ color: "#111827" }}>
                Real Businesses.<br />Measurable Results.
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Every case study represents a real automation system we built for a real GTA business. The results are measured, not estimated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      {caseStudies.map((cs, idx) => (
        <CaseStudySection key={cs.id} cs={cs} idx={idx} />
      ))}

      {/* Disclaimer */}
      <section className="py-8" style={{ backgroundColor: "#F7F8FB" }}>
        <div
          ref={disclaimer.ref}
          className="container"
          style={{
            opacity: disclaimer.visible ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        >
          <p className="text-xs text-gray-400 max-w-3xl">
            <strong>Note on Results:</strong> All metrics are based on client-reported operational data and measurements taken 30 to 90 days after automation deployment. Individual results will vary based on business size, industry, workflow complexity, and implementation scope.
          </p>
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
          <h2 className="text-3xl font-extrabold text-white mb-4">Want Results Like These?</h2>
          <p className="text-blue-200 mb-8 max-w-xl mx-auto">
            Book a free 60-minute Automation Audit. We map your workflows, identify the highest-impact opportunities, and give you a prioritized plan.
          </p>
          <Link href="/contact" className="btn-accent">
            Book Free Automation Audit
          </Link>
        </div>
      </section>
    </div>
  );
}
