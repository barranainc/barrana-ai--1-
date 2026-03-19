/**
 * CaseStudyDashboard.tsx
 * 3 case study cards with before/after metric pairs.
 * Numbers count up on viewport entry.
 */

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Clock } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CaseMetric {
  label: string;
  before: string;
  after: string;
}

interface CaseStudy {
  title: string;
  industry: string;
  metrics: CaseMetric[];
  deployed: string;
  keyResult: string;
}

const cases: CaseStudy[] = [
  {
    title: "Immigration Firm",
    industry: "North York, ON",
    metrics: [
      { label: "Intake Time",   before: "45 min", after: "5 min" },
      { label: "Response Time", before: "8 hrs",  after: "3 min" },
      { label: "Admin Hours",   before: "18/wk",  after: "4/wk"  },
      { label: "Status Calls",  before: "25/wk",  after: "6/wk"  },
    ],
    deployed: "Deployed in 4 weeks",
    keyResult: "14 hours recovered per week. 11 additional billable hours.",
  },
  {
    title: "Accounting Practice",
    industry: "Vaughan, ON",
    metrics: [
      { label: "Doc Collection", before: "18 days", after: "9 days" },
      { label: "Chase Emails",   before: "40/wk",   after: "0/wk"  },
      { label: "Capacity",       before: "Maxed",   after: "+30%"  },
      { label: "Manual Entry",   before: "6 hrs",   after: "< 1 hr" },
    ],
    deployed: "Deployed in 3 weeks",
    keyResult: "Document chase time eliminated. Capacity increased 30%.",
  },
  {
    title: "Contractor Business",
    industry: "Mississauga, ON",
    metrics: [
      { label: "Missed Leads",   before: "6–8/wk",  after: "0/wk"   },
      { label: "Quote Time",     before: "2 days",   after: "Same day" },
      { label: "Follow-Up",      before: "Manual",   after: "Auto"   },
      { label: "Booking Rate",   before: "Baseline", after: "+22%"   },
    ],
    deployed: "Deployed in 2 weeks",
    keyResult: "Zero missed after-hours leads. Booking rate up 22%.",
  },
];

export default function CaseStudyDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const show = visible || reduced;

  return (
    <div ref={containerRef} className="grid lg:grid-cols-3 gap-6">
      {cases.map((c, ci) => (
        <div
          key={c.title}
          style={{
            background: "white",
            border: "1px solid var(--b-border)",
            borderRadius: "0.875rem",
            overflow: "hidden",
            opacity: show ? 1 : 0,
            transform: show ? "translateY(0)" : "translateY(30px)",
            transition: reduced ? "none" : `opacity 0.6s ease ${ci * 0.2}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${ci * 0.2}s`,
          }}
        >
          {/* Card header */}
          <div style={{ padding: "1.5rem 1.5rem 1.25rem", borderBottom: "1px solid var(--b-border)" }}>
            <div style={{ fontWeight: 700, fontSize: "1.0625rem", color: "var(--b-dark)" }}>{c.title}</div>
            <div style={{ fontSize: "0.8125rem", color: "var(--b-grey)", marginTop: "0.2rem" }}>{c.industry}</div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.35rem",
              marginTop: "0.625rem", fontSize: "0.75rem", fontWeight: 700,
              color: "var(--b-navy)", background: "rgba(40,56,145,0.08)",
              borderRadius: "0.25rem", padding: "0.2rem 0.5rem",
            }}>
              <Clock size={11} strokeWidth={2.5} />
              {c.deployed}
            </div>
          </div>

          {/* Metrics */}
          <div style={{ padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {c.metrics.map((m) => (
              <div key={m.label} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "0.75rem", color: "var(--b-grey)", marginBottom: "0.2rem" }}>{m.label}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontWeight: 700, fontSize: "0.9375rem", color: "var(--b-warning)" }}>{m.before}</span>
                    <ArrowRight size={12} style={{ color: "var(--b-grey)", flexShrink: 0 }} />
                    <span style={{ fontWeight: 700, fontSize: "0.9375rem", color: "var(--b-success)" }}>{m.after}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Key result */}
          <div style={{
            margin: "0 1.5rem 1.5rem",
            background: "var(--b-success-bg)",
            borderLeft: "3px solid var(--b-success)",
            borderRadius: "0 0.4rem 0.4rem 0",
            padding: "0.75rem 1rem",
            fontSize: "0.8125rem",
            fontWeight: 600,
            color: "var(--b-dark)",
            lineHeight: 1.55,
          }}>
            {c.keyResult}
          </div>
        </div>
      ))}
    </div>
  );
}
