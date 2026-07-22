/**
 * CaseStudyPageLayout.tsx
 * Master template for all 12 case study pages.
 * Sections: Hero → Business → Problem → Solution (WorkflowDiagram) →
 * Control Layer → Tools → Before/After Results → Key Result → Cross-Industry → CTA → Links
 * Includes Article + BreadcrumbList JSON-LD schema.
 */

import React, { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { colors, spacing, typography, cards, surfaces } from "@/styles/design-tokens";
import WorkflowDiagram from "@/components/diagrams/WorkflowDiagram";
import ControlLayerCard from "@/components/service/ControlLayerCard";
import BeforeAfterSection from "@/components/service/BeforeAfterSection";
import ServiceCTASection from "@/components/service/ServiceCTASection";
import InternalLinksGrid from "@/components/service/InternalLinksGrid";
import BreadcrumbNav from "@/components/linking/BreadcrumbNav";
import SEOHead from "@/components/SEOHead";
import RelatedResources from "@/components/linking/RelatedResources";
import { useReducedMotion } from "@/hooks/useReducedMotion";

import type { WorkflowStep } from "@/components/diagrams/WorkflowDiagram";

export interface CaseStudyData {
  // Meta
  title: string;
  description: string;
  slug: string;

  // Tags
  industry: string;
  location: string;
  teamSize: string;
  relatableIndustries: string[];

  // Hero
  h1: string;
  subheadline: string;
  intro: string;

  // Business
  businessDescription: string;

  // Problem
  problemHeading?: string;
  problemBody: string[];
  beforeMetrics: { label: string; value: string }[];

  // Solution
  solutionIntro: string;
  workflowSteps: WorkflowStep[];

  // Control layer
  controlItems: { title: string; desc: string }[];

  // Tools
  tools: string[];

  // Before/After results
  results: { label: string; before: string; after: string; beforeW: number; afterW: number }[];
  implementationTimeline?: string;
  investmentRange?: string;
  payback?: string;

  // Key result
  keyResultCallout: string;

  // Why this matters
  whyItMatters: string;
  whyBullets: string[];

  // Cross-industry
  crossIndustryItems: { industry: string; note: string }[];

  // CTA
  ctaHeadline: string;
  ctaBody: string;

  // Internal links
  internalLinks: { label: string; href: string; desc?: string }[];

  // Accent color
  color?: string;
}

// ── helpers ─────────────────────────────────────────────────────────────────

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const NAVY = colors.navy;
const TEAL = colors.magenta;

const sec = (bg: string): React.CSSProperties => ({ background: bg, padding: `${spacing.sectionPadding} 0` });
const h2Style: React.CSSProperties = { ...typography.sectionHeading, marginBottom: "1rem", lineHeight: 1.25 };

// ── sub-components ───────────────────────────────────────────────────────────

function Hero({ data, show }: { data: CaseStudyData; show: boolean }) {
  const reduced = useReducedMotion();
  const st = (i: number): React.CSSProperties => ({
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0)" : "translateY(18px)",
    transition: reduced ? "none" : `opacity 0.55s ease ${i * 0.1}s, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
  });

  return (
    <section style={{ background: colors.surfaceLight, paddingTop: "6rem", paddingBottom: "4rem" }}>
      <div className="container">
        {/* Breadcrumb */}
        <nav style={{ display: "flex", gap: "0.375rem", fontSize: "0.8125rem", color: "var(--b-grey)", marginBottom: "2rem", alignItems: "center", ...st(0) }}>
          <Link href="/" style={{ color: "var(--b-grey)", textDecoration: "none" }}>Home</Link>
          <span>/</span>
          <Link href="/case-studies" style={{ color: "var(--b-grey)", textDecoration: "none" }}>Case Studies</Link>
          <span>/</span>
          <span style={{ color: "var(--b-dark)", fontWeight: 600 }}>{data.industry}</span>
        </nav>

        {/* Industry / Location badges */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem", ...st(1) }}>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "0.25rem 0.75rem", borderRadius: 999, background: `${data.color ?? NAVY}18`, color: data.color ?? NAVY }}>
            {data.industry}
          </span>
          <span style={{ fontSize: "0.75rem", fontWeight: 600, padding: "0.25rem 0.75rem", borderRadius: 999, background: "#F3F4F6", color: "#6B7280" }}>
            {data.location}
          </span>
          <span style={{ fontSize: "0.75rem", fontWeight: 600, padding: "0.25rem 0.75rem", borderRadius: 999, background: "#F3F4F6", color: "#6B7280" }}>
            {data.teamSize}
          </span>
        </div>

        <div style={{ borderLeft: "4px solid var(--b-navy)", paddingLeft: "1.5rem", maxWidth: "780px" }}>
          <h1 style={{ fontWeight: 800, color: "#111827", fontSize: "clamp(1.875rem, 4vw, 2.875rem)", lineHeight: 1.15, marginBottom: "1rem", ...st(2) }}>
            {data.h1}
          </h1>
          <p style={{ color: NAVY, fontSize: "1.0625rem", fontWeight: 600, lineHeight: 1.6, marginBottom: "1.25rem", ...st(3) }}>
            {data.subheadline}
          </p>
          <p style={{ color: "var(--b-grey)", lineHeight: 1.75, fontSize: "0.9375rem", marginBottom: "2rem", ...st(4) }}>
            {data.intro}
          </p>
          <div style={st(5)}>
            <Link href="/contact" className="btn-primary">Get Similar Results - Book a Free Audit</Link>
            <p style={{ fontSize: "0.8125rem", color: "var(--b-grey)", marginTop: "0.625rem" }}>
              See what automation looks like for your operations. 60 minutes. No obligation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function BeforeMetrics({ metrics, color }: { metrics: { label: string; value: string }[]; color: string }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1rem", marginTop: "1.5rem" }}>
      {metrics.map((m, i) => (
        <div key={i} style={{
          ...cards.typeA, borderLeft: `3px solid ${color}`,
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(12px)",
          transition: `opacity 0.4s ease ${i * 0.08}s, transform 0.4s ease ${i * 0.08}s`,
        }}>
          <p style={{ fontWeight: 800, fontSize: "1.25rem", color: colors.magenta, marginBottom: "0.375rem" }}>{m.value}</p>
          <p style={{ ...typography.metricLabel, lineHeight: 1.4, margin: 0 }}>{m.label}</p>
        </div>
      ))}
    </div>
  );
}

function KeyResultCallout({ text, color }: { text: string; color: string }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} style={{
      background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)`,
      borderRadius: 20, padding: "2.5rem", marginTop: "1rem",
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)",
      transition: "opacity 0.6s ease, transform 0.6s ease",
    }}>
      <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)", fontWeight: 700, color: "white", lineHeight: 1.6, margin: 0 }}>
        {text}
      </p>
    </div>
  );
}

function ToolsList({ tools }: { tools: string[] }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem", marginTop: "1rem" }}>
      {tools.map((t) => (
        <span key={t} style={{ fontSize: "0.8125rem", fontWeight: 600, padding: "0.375rem 0.875rem", borderRadius: 999, background: "#EEF2FF", color: NAVY }}>
          {t}
        </span>
      ))}
    </div>
  );
}

function CrossIndustry({ items }: { items: { industry: string; note: string }[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "0.875rem", marginTop: "1.25rem" }}>
      {items.map((item, i) => (
        <div key={i} style={{ ...cards.typeA, padding: "1.125rem" }}>
          <p style={{ fontWeight: 700, color: colors.navy, fontSize: "0.875rem", marginBottom: "0.375rem" }}>{item.industry}</p>
          <p style={{ ...typography.cardBody, lineHeight: 1.5, margin: 0 }}>{item.note}</p>
        </div>
      ))}
    </div>
  );
}

function ImplementationBox({ timeline, investment, payback }: { timeline?: string; investment?: string; payback?: string }) {
  if (!timeline && !investment && !payback) return null;
  const items = [
    timeline && { label: "Timeline", value: timeline },
    investment && { label: "Investment Range", value: investment },
    payback && { label: "Payback", value: payback },
  ].filter(Boolean) as { label: string; value: string }[];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem", marginTop: "1.5rem" }}>
      {items.map((item) => (
        <div key={item.label} style={{ background: colors.surfaceLight, borderRadius: 12, padding: "1.25rem", border: "1px solid rgba(40,56,145,0.07)" }}>
          <p style={{ ...typography.eyebrow, marginBottom: "0.375rem" }}>{item.label}</p>
          <p style={{ fontWeight: 700, color: "#111827", fontSize: "0.9375rem", margin: 0 }}>{item.value}</p>
        </div>
      ))}
    </div>
  );
}

// ── main layout ──────────────────────────────────────────────────────────────

interface Props { data: CaseStudyData }

export default function CaseStudyPageLayout({ data }: Props) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const color = data.color ?? NAVY;

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.h1,
    description: data.description,
    author: { "@type": "Organization", name: "Barrana.ai" },
    publisher: { "@type": "Organization", name: "Barrana.ai", url: "https://barrana.ai" },
    datePublished: "2025-01-01",
  };
  const bcSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://barrana.ai" },
      { "@type": "ListItem", position: 2, name: "Case Studies", item: "https://barrana.ai/case-studies" },
      { "@type": "ListItem", position: 3, name: data.industry, item: `https://barrana.ai/case-studies/${data.slug}` },
    ],
  };

  return (
    <div className="template-page case-study-template">
      {/* SEO Head - OG, Twitter, Canonical */}
      <SEOHead title={data.title} description={data.description} type="article" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bcSchema) }} />

      {/* Breadcrumb Nav */}
      <div style={{ background: colors.surfaceLight, paddingTop: "3rem", paddingBottom: 0 }}>
        <div className="container">
          <BreadcrumbNav
            items={[
              { label: "Home", href: "/" },
              { label: "Case Studies", href: "/case-studies" },
              { label: data.industry },
            ]}
          />
        </div>
      </div>

      {/* 1. Hero */}
      <Hero data={data} show={mounted || reduced} />

      {/* 2. The Business */}
      <section style={sec("white")}>
        <div className="container" style={{ maxWidth: 800 }}>
          <h2 style={h2Style}>The Business</h2>
          <p style={{ color: "var(--b-grey)", lineHeight: 1.75, fontSize: "0.9375rem" }}>{data.businessDescription}</p>
        </div>
      </section>

      {/* 3. The Problem */}
      <section style={sec(colors.surfaceLight)}>
        <div className="container">
          <h2 style={h2Style}>{data.problemHeading ?? "The Problem"}</h2>
          {data.problemBody.map((p, i) => (
            <p key={i} style={{ color: "var(--b-grey)", lineHeight: 1.75, fontSize: "0.9375rem", maxWidth: "72ch", marginBottom: "0.875rem" }}>{p}</p>
          ))}
          <h3 style={{ fontWeight: 700, color: "#111827", fontSize: "0.9375rem", marginTop: "2rem", marginBottom: "0.25rem" }}>By the Numbers - Before</h3>
          <BeforeMetrics metrics={data.beforeMetrics} color={color} />
        </div>
      </section>

      {/* 4. The Solution */}
      <section style={sec("white")}>
        <div className="container">
          <h2 style={h2Style}>The Automation Solution</h2>
          <p style={{ color: "var(--b-grey)", lineHeight: 1.75, fontSize: "0.9375rem", maxWidth: "72ch", marginBottom: "2rem" }}>{data.solutionIntro}</p>
          <WorkflowDiagram steps={data.workflowSteps} />
        </div>
      </section>

      {/* 5. Control Layer */}
      <section style={sec(colors.surfaceLight)}>
        <div className="container">
          <h2 style={h2Style}>Governance &amp; Control Layer</h2>
          <ControlLayerCard items={data.controlItems} />
        </div>
      </section>

      {/* 6. Tools Used */}
      <section style={sec("white")}>
        <div className="container">
          <h2 style={h2Style}>Tools Used</h2>
          <ToolsList tools={data.tools} />
        </div>
      </section>

      {/* 7. Before / After Results */}
      <section style={sec(colors.surfaceLight)}>
        <div className="container">
          <h2 style={h2Style}>Before vs After Results</h2>
          <BeforeAfterSection metrics={data.results} />
          <ImplementationBox timeline={data.implementationTimeline} investment={data.investmentRange} payback={data.payback} />
        </div>
      </section>

      {/* 8. Key Result */}
      <section style={sec("white")}>
        <div className="container" style={{ maxWidth: 800 }}>
          <h2 style={h2Style}>The Key Result</h2>
          <KeyResultCallout text={data.keyResultCallout} color={color} />
        </div>
      </section>

      {/* 9. Why This Matters */}
      <section style={sec(colors.surfaceLight)}>
        <div className="container" style={{ maxWidth: 800 }}>
          <h2 style={h2Style}>Why This Matters for Your Business</h2>
          <p style={{ color: "var(--b-grey)", lineHeight: 1.75, fontSize: "0.9375rem", marginBottom: "1.5rem" }}>{data.whyItMatters}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {data.whyBullets.map((b, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <div style={{ width: 20, height: 20, borderRadius: 999, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 2.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <p style={{ color: "var(--b-grey)", fontSize: "0.9375rem", lineHeight: 1.6, margin: 0 }}>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Cross-Industry */}
      <section style={sec("white")}>
        <div className="container">
          <h2 style={h2Style}>Cross-Industry Relevance</h2>
          <p style={{ color: "var(--b-grey)", fontSize: "0.9375rem", lineHeight: 1.65, marginBottom: "0.5rem" }}>
            This case study is directly relevant if you operate in any of these industries:
          </p>
          <CrossIndustry items={data.crossIndustryItems} />
        </div>
      </section>

      {/* 11. CTA */}
      <ServiceCTASection
        headline={data.ctaHeadline}
        body={data.ctaBody}
        primaryCTA="Get Your Free 60-Minute Automation Audit"
        secondaryCTA="View All Case Studies"
        primaryMicro="Walk away with a clear plan. No pitch. No obligation."
      />

      {/* 12. Internal Links */}
      <section style={sec(colors.surfaceLight)}>
        <div className="container">
          <InternalLinksGrid links={data.internalLinks} />
        </div>
      </section>

      {/* 13. Contextual Related Resources */}
      <section style={sec("white")}>
        <div className="container">
          <RelatedResources pagePath={`/case-studies/${data.slug}`} />
        </div>
      </section>
    </div>
  );
}
