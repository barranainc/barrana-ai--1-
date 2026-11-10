/**
 * CaseStudies.tsx - Barrana.ai Case Studies Index
 * A "Real client projects" section (real, anonymized work with dated figures; owner brief 6 Nov 2026) above
 * the 12-card filterable grid of illustrative examples. Each illustrative card: industry badge + title + key
 * metric + location, labelled "Illustrative". Keep the two kinds visibly separate.
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ShieldCheck } from "lucide-react";
import AuditBookingLink from "@/components/AuditBookingLink";
import SEOHead from "@/components/SEOHead";

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

interface CaseStudyCard {
  slug: string;
  industry: string;
  industryTag: string; // filter tag
  location: string;
  title: string;
  keyMetric: string;
  metricLabel: string;
  summary: string;
  color: string;
}

const CARDS: CaseStudyCard[] = [
  {
    slug: "immigration-firm-north-york",
    industry: "Immigration Consulting",
    industryTag: "Professional Services",
    location: "North York, Toronto",
    title: "Immigration Firm Recovers 14 Hours Per Week and Grows Capacity by 25%",
    keyMetric: "14 hrs",
    metricLabel: "Recovered per week",
    summary: "Intake time cut from 45 min to under 5. Document collection from 3-week chase to 9-day automated system.",
    color: "#283891",
  },
  {
    slug: "accounting-firm-vaughan",
    industry: "Accounting Firm",
    industryTag: "Professional Services",
    location: "Vaughan, Ontario",
    title: "Accounting Firm Increases Tax Season Capacity by 30% Without New Hires",
    keyMetric: "+30%",
    metricLabel: "Tax season capacity",
    summary: "Document chase eliminated. Invoice payment cycle accelerated by 11 days. Same team, 30% more clients.",
    color: "#7E0F4A",
  },
  {
    slug: "contractor-mississauga",
    industry: "General Contractor",
    industryTag: "Trades & Home Services",
    location: "Mississauga, Ontario",
    title: "Contractor Cuts Lead Response to 90 Seconds and Increases Quote Conversion 22%",
    keyMetric: "90 sec",
    metricLabel: "Lead response time",
    summary: "From 4-6 hour response delays to 90-second automated follow-up. 100% after-hours lead capture.",
    color: "#b45309",
  },
  {
    slug: "physio-clinic-richmond-hill",
    industry: "Physiotherapy Clinic",
    industryTag: "Healthcare",
    location: "Richmond Hill, Ontario",
    title: "Physio Clinic Cuts No-Shows by 40% and Recovers 10 Admin Hours Per Week",
    keyMetric: "−40%",
    metricLabel: "No-show rate",
    summary: "Automated appointment reminders and intake forms. 10 admin hours per week recovered. Wait list activated.",
    color: "#059669",
  },
  {
    slug: "law-firm-toronto",
    industry: "Law Firm",
    industryTag: "Professional Services",
    location: "Toronto, Ontario",
    title: "Toronto Law Firm Eliminates Intake Bottleneck and Recovers 12 Billable Hours Per Week",
    keyMetric: "12 hrs",
    metricLabel: "Billable hours recovered",
    summary: "New matter intake automated end-to-end. Conflict check, engagement letter, and document request all triggered automatically.",
    color: "#283891",
  },
  {
    slug: "real-estate-team-markham",
    industry: "Real Estate Team",
    industryTag: "Real Estate",
    location: "Markham, Ontario",
    title: "Real Estate Team Triples Lead Follow-Up Capacity Without Adding Staff",
    keyMetric: "3×",
    metricLabel: "Lead follow-up capacity",
    summary: "Lead nurture sequences running 90 days automatically. Buyer and seller pipelines fully automated. Response time under 2 minutes.",
    color: "#7E0F4A",
  },
  {
    slug: "dental-office-scarborough",
    industry: "Dental Office",
    industryTag: "Healthcare",
    location: "Scarborough, Ontario",
    title: "Dental Office Reduces No-Shows by 35% and Fills Cancellations Within Hours",
    keyMetric: "−35%",
    metricLabel: "No-show reduction",
    summary: "Automated recall campaigns, waitlist activation, and hygiene reactivation sequences. Front desk time freed for patient care.",
    color: "#0EA5E9",
  },
  {
    slug: "cleaning-company-etobicoke",
    industry: "Cleaning Company",
    industryTag: "Trades & Home Services",
    location: "Etobicoke, Ontario",
    title: "Cleaning Company Automates Quoting, Scheduling, and Follow-Up Across 200 Clients",
    keyMetric: "200",
    metricLabel: "Clients automated",
    summary: "Quoting, scheduling, recurring reminders, and review requests all running automatically. Owner off the phone.",
    color: "#10B981",
  },
  {
    slug: "hvac-company-brampton",
    industry: "HVAC Company",
    industryTag: "Trades & Home Services",
    location: "Brampton, Ontario",
    title: "HVAC Company Fills 300 Seasonal Maintenance Slots in 10 Days Instead of 6 Weeks",
    keyMetric: "10 days",
    metricLabel: "To fill seasonal schedule",
    summary: "Fall maintenance campaign automated. Emergency dispatch live 24/7. Maintenance agreement renewal rate up 28%.",
    color: "#b45309",
  },
  {
    slug: "property-management-toronto",
    industry: "Property Management",
    industryTag: "Real Estate",
    location: "Toronto, Ontario",
    title: "Property Manager Automates Lease Renewals and Recovers 15 Admin Hours Per Week",
    keyMetric: "15 hrs",
    metricLabel: "Admin hours recovered",
    summary: "Lease renewal outreach, tenant maintenance requests, and monthly owner reporting all automated. Zero staff increase.",
    color: "#283891",
  },
  {
    slug: "insurance-brokerage-vaughan",
    industry: "Insurance Brokerage",
    industryTag: "Financial Services",
    location: "Vaughan, Ontario",
    title: "Insurance Brokerage Drops Renewal Lapse Rate from 18% to Under 5%",
    keyMetric: "−72%",
    metricLabel: "Renewal lapse reduction",
    summary: "Policy renewal outreach running 90 days in advance. Lead response time 90 seconds. Quote follow-up 100% consistent.",
    color: "#7E0F4A",
  },
  {
    slug: "marketing-agency-liberty-village",
    industry: "Marketing Agency",
    industryTag: "Professional Services",
    location: "Liberty Village, Toronto",
    title: "Marketing Agency Grows from 12 to 17 Clients Without Adding Operations Staff",
    keyMetric: "+40%",
    metricLabel: "Client capacity increase",
    summary: "Client onboarding, monthly reporting, and invoice follow-up fully automated. Agency grew without ops overhead.",
    color: "#0EA5E9",
  },
];

interface RealProjectCard {
  href: string;
  label: string;
  title: string;
  metric: string;
  note: string;
}

/** Real, anonymized client projects. Figures must match the project page and carry their date. */
const REAL_PROJECTS: RealProjectCard[] = [
  {
    href: "/case-studies/immigration-practice-automation",
    label: "Real client project | Canadian immigration consultancy",
    title: "How a regulated immigration practice automated intake, agreements, case setup and document collection.",
    metric: "100+ agreements generated in a single month (as of November 2026).",
    note: "Client identity withheld for confidentiality.",
  },
];

const ALL_TAGS = ["All", "Professional Services", "Healthcare", "Trades & Home Services", "Real Estate", "Financial Services"];

function CardItem({ card, idx }: { card: CaseStudyCard; idx: number }) {
  const { ref, visible } = useReveal(0.1);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${(idx % 3) * 0.08}s, transform 0.5s ease ${(idx % 3) * 0.08}s`,
      }}
    >
      <Link href={`/case-studies/${card.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            border: "1px solid rgba(40,56,145,0.08)",
            boxShadow: "0 2px 12px rgba(40,56,145,0.06)",
            overflow: "hidden",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            transition: "box-shadow 0.2s ease, transform 0.2s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(40,56,145,0.14)";
            (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(40,56,145,0.06)";
            (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
          }}
        >
          {/* Top accent */}
          <div style={{ height: "4px", background: `linear-gradient(90deg, ${card.color} 0%, ${card.color}80 100%)` }} />

          <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
            {/* Tags row */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
              <span
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: card.color,
                  background: `${card.color}12`,
                  borderRadius: "999px",
                  padding: "0.2rem 0.625rem",
                }}
              >
                {card.industry}
              </span>
              <span style={{ fontSize: "0.6875rem", color: "#64748B" }}>{card.location}</span>
              <span
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  color: "#92400E",
                  background: "#FFF8E7",
                  borderRadius: "999px",
                  padding: "0.2rem 0.625rem",
                }}
              >
                Illustrative
              </span>
            </div>

            {/* Key metric */}
            <div
              style={{
                background: "#F7F9FC",
                borderRadius: "12px",
                padding: "1rem 1.25rem",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "baseline",
                gap: "0.75rem",
              }}
            >
              <span style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: card.color, lineHeight: 1 }}>
                {card.keyMetric}
              </span>
              <span style={{ fontSize: "0.8125rem", color: "#64748B", lineHeight: 1.3 }}>{card.metricLabel}</span>
            </div>

            {/* Title */}
            <h3
              style={{
                fontSize: "0.9375rem",
                fontWeight: 700,
                color: "#111827",
                lineHeight: 1.4,
                marginBottom: "0.625rem",
                flex: 1,
              }}
            >
              {card.title}
            </h3>

            {/* Summary */}
            <p style={{ fontSize: "0.8125rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
              {card.summary}
            </p>
          </div>

          {/* Footer link */}
          <div
            style={{
              borderTop: "1px solid rgba(40,56,145,0.07)",
              padding: "0.75rem 1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: card.color }}>
              Read Case Study
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={card.color} strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function CaseStudies() {
  const hero = useReveal(0.05);
  const cta = useReveal(0.2);
  const [activeTag, setActiveTag] = useState("All");

  const filtered = activeTag === "All" ? CARDS : CARDS.filter((c) => c.industryTag === activeTag);

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Case Studies: Client Work and Illustrative Examples | Barrana.ai"
        description="A real, anonymized Barrana client project alongside illustrative automation examples for service businesses. Real project figures are dated; illustrative examples are composites."
      />
      {/* Hero */}
      <section style={{ background: "#F7F9FC", paddingTop: "6rem", paddingBottom: "3.5rem" }}>
        <div className="container">
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
            <div style={{ maxWidth: "640px" }}>
              <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#111827", marginBottom: "1rem", lineHeight: 1.15 }}>
                Client work and illustrative examples
              </h1>
              <p style={{ fontSize: "1.0625rem", color: "#4B5563", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                Explore a real, anonymized Barrana client project alongside illustrative examples of what automation may look like for service businesses. Real project figures are dated and described on their own pages. Illustrative examples are composites, not verified client outcomes; results vary by workflow and implementation.
              </p>
              {/* Stats row */}
              <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
                {[
                  { v: String(REAL_PROJECTS.length), l: "Real Client Project" + (REAL_PROJECTS.length === 1 ? "" : "s") },
                  { v: String(CARDS.length), l: "Illustrative Examples" },
                  { v: "15 min", l: "Free Introductory Session" },
                ].map((s) => (
                  <div key={s.l}>
                    <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#283891" }}>{s.v}</div>
                    <div style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real client projects */}
      <section style={{ background: "white", padding: "3.5rem 0" }}>
        <div className="container">
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "#111827", marginBottom: "0.5rem" }}>
            Real client projects
          </h2>
          <p style={{ fontSize: "0.9375rem", color: "#4B5563", lineHeight: 1.6, marginBottom: "1.5rem", maxWidth: "640px" }}>
            Real Barrana work, published with the client's approval. Names are withheld and figures are dated on each page.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
            {REAL_PROJECTS.map((project) => (
              <Link
                key={project.href}
                href={project.href}
                className="block rounded-2xl border-2 border-[#15803d]/40 bg-white p-6 no-underline transition-shadow hover:shadow-lg"
              >
                <span className="inline-flex max-w-full items-start gap-1.5 rounded-lg bg-[#E8F5EE] px-3 py-1 text-[11px] leading-5 font-bold uppercase tracking-[0.06em] text-[#166534]">
                  <ShieldCheck size={13} className="mt-[3px] shrink-0" aria-hidden="true" />
                  {project.label}
                </span>
                <h3 className="mt-4 text-lg font-bold leading-snug text-gray-900">{project.title}</h3>
                <p className="mt-3 text-sm font-semibold text-[#283891]">{project.metric}</p>
                <p className="mt-1 text-sm text-slate-600">{project.note}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#15803d]">
                  Read the case study
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Illustrative examples heading */}
      <section style={{ background: "#F7F9FC", padding: "3rem 0 1.5rem" }}>
        <div className="container">
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "#111827", marginBottom: "0.5rem" }}>
            Illustrative examples
          </h2>
          <p style={{ fontSize: "0.9375rem", color: "#4B5563", lineHeight: 1.6, margin: 0, maxWidth: "640px" }}>
            Anonymised composites based on typical automation engagements for GTA service businesses. These are not verified client results; your results will differ.
          </p>
        </div>
      </section>

      {/* Filter tabs */}
      <section style={{ background: "white", borderBottom: "1px solid rgba(40,56,145,0.08)", position: "sticky", top: 0, zIndex: 10 }}>
        <div className="container" style={{ paddingTop: "0.875rem", paddingBottom: "0.875rem" }}>
          <div style={{ display: "flex", gap: "0.5rem", overflowX: "auto", paddingBottom: "2px" }}>
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                style={{
                  padding: "0.375rem 1rem",
                  borderRadius: "999px",
                  border: "1.5px solid",
                  borderColor: activeTag === tag ? "#283891" : "rgba(40,56,145,0.2)",
                  background: activeTag === tag ? "#283891" : "transparent",
                  color: activeTag === tag ? "white" : "#283891",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.15s ease",
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Card grid */}
      <section style={{ background: "#F7F9FC", padding: "2rem 0 4.5rem" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {filtered.map((card, idx) => (
              <CardItem key={card.slug} card={card} idx={idx} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p style={{ textAlign: "center", color: "#94A3B8", padding: "3rem 0" }}>
              No case studies for this filter yet.
            </p>
          )}
        </div>
      </section>

      {/* Disclaimer */}
      <section style={{ background: "white", padding: "1.5rem 0" }}>
        <div className="container">
          <p style={{ fontSize: "0.75rem", color: "#5F5F6B", maxWidth: "640px" }}>
            <strong>Note on figures:</strong> The illustrative examples are composites, not verified client results. Figures on real client project pages are dated and published with the client's approval. Real results vary with business size, industry, workflow complexity and implementation scope; we agree how to measure your baseline before work starts.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{ padding: "5rem 0", background: "linear-gradient(135deg, #283891 0%, #1e2d7a 50%, #7E0F4A 100%)" }}
      >
        <div
          ref={cta.ref}
          className="container"
          style={{
            textAlign: "center",
            opacity: cta.visible ? 1 : 0,
            transform: cta.visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 800, color: "white", marginBottom: "1rem" }}>
            Want Results Like These?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", marginBottom: "2rem", maxWidth: "480px", margin: "0 auto 2rem", lineHeight: 1.7 }}>
            Book a free 15-minute introductory session. We’ll discuss your business, understand your workflow challenges, and explore where AI automation could save your team valuable time.
          </p>
          <AuditBookingLink className="btn-accent">
            Book Free Introductory Session
          </AuditBookingLink>
        </div>
      </section>
    </div>
  );
}
