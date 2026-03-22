/**
 * ServicePageLayout.tsx
 * Master template for all 12 service pages.
 * Composes shared components in a fixed order with alternating backgrounds.
 * Includes JSON-LD Service schema and BreadcrumbList schema.
 */

import React from "react";
import TrustBadges from "@/components/diagrams/TrustBadges";
import WorkflowDiagram from "@/components/diagrams/WorkflowDiagram";
import FAQAccordion from "@/components/ui/FAQAccordion";
import ServiceHero from "./ServiceHero";
import HeroVisualCard from "./HeroVisualCard";
import CostOfInactionCards from "./CostOfInactionCards";
import BeforeAfterSection from "./BeforeAfterSection";
import ControlLayerCard from "./ControlLayerCard";
import ROIMetricsGrid from "./ROIMetricsGrid";
import WhoThisIsFor from "./WhoThisIsFor";
import AEOBlock from "./AEOBlock";
import ServiceCTASection from "./ServiceCTASection";
import InternalLinksGrid from "./InternalLinksGrid";

import type { WorkflowStep } from "@/components/diagrams/WorkflowDiagram";
import type { FAQItem } from "@/components/ui/FAQAccordion";

export interface ServicePageData {
  // Meta
  title: string;
  description: string;

  // Hero
  breadcrumb: string;
  h1: string;
  subheadline: string;
  body: string[];
  ctaText?: string;
  ctaMicro?: string;

  // Cost of inaction
  costHeading: string;
  costItems: { figure: string; label: string; desc: string }[];

  // Before/after
  beforeAfterMetrics: {
    label: string;
    before: string;
    after: string;
    beforeW: number;
    afterW: number;
  }[];

  // Workflow
  workflowHeading?: string;
  workflowSteps: WorkflowStep[];
  workflowBadge?: string;

  // Control layer
  controlItems: { title: string; desc: string }[];

  // ROI
  roiMetrics: { label: string; before?: string; after: string }[];
  roiNote?: string;
  roiCtaText?: string;

  // Who this is for
  bestFit: string[];
  notFit: string[];

  // AEO
  aeoQuestion: string;
  aeoAnswer: string;

  // FAQ
  faqItems: FAQItem[];

  // Final CTA
  ctaHeadline: string;
  ctaBody: string;
  primaryCTA?: string;
  secondaryCTA?: string;
  primaryMicro?: string;
  secondaryMicro?: string;

  // Internal links
  internalLinks: { label: string; href: string; desc?: string }[];

  // Hero visual stats (shown in right column of hero — pulled from roiMetrics if not provided)
  heroStats?: { value: string; label: string }[];

  // Custom children slot (rendered between workflow and control layer)
  children?: React.ReactNode;
}

const sectionStyle = (bg: string): React.CSSProperties => ({
  background: bg,
  padding: "4.5rem 0",
});

const headingStyle: React.CSSProperties = {
  fontWeight: 800,
  color: "var(--b-dark)",
  fontSize: "clamp(1.375rem, 2.5vw, 1.875rem)",
  marginBottom: "1rem",
  lineHeight: 1.25,
};

const subheadingStyle: React.CSSProperties = {
  color: "var(--b-grey)",
  fontSize: "0.9375rem",
  lineHeight: 1.65,
  marginBottom: "2rem",
  maxWidth: "56ch",
};

interface ServicePageLayoutProps {
  data: ServicePageData;
}

export default function ServicePageLayout({ data }: ServicePageLayoutProps) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.title,
    description: data.description,
    provider: {
      "@type": "LocalBusiness",
      name: "Barrana.ai",
      url: "https://barrana.ai",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://barrana.ai",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://barrana.ai/services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: data.breadcrumb,
        item: `https://barrana.ai/services/${data.breadcrumb
          .toLowerCase()
          .replace(/\s+/g, "-")}`,
      },
    ],
  };

  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* 1. Hero — white/off-white bg */}
      <ServiceHero
        breadcrumb={data.breadcrumb}
        h1={data.h1}
        subheadline={data.subheadline}
        body={data.body}
        ctaText={data.ctaText}
        ctaMicro={data.ctaMicro}
        visual={
          <HeroVisualCard
            show={true}
            stats={(data.heroStats ?? data.roiMetrics.slice(0, 4).map((m) => ({
              value: m.after.split(" ")[0] ?? m.after,
              label: m.label,
            })))}
          />
        }
      />

      {/* 2. Trust Badges — white bg */}
      <section style={{ background: "white", paddingBottom: 0 }}>
        <TrustBadges />
      </section>

      {/* 3. Cost of Inaction — off-white bg */}
      <section style={sectionStyle("#F7F9FC")}>
        <div className="container">
          <h2 style={headingStyle}>{data.costHeading}</h2>
          <CostOfInactionCards items={data.costItems} />
        </div>
      </section>

      {/* 4. Before vs After — white bg */}
      <section style={sectionStyle("white")}>
        <div className="container">
          <h2 style={headingStyle}>Before vs After</h2>
          <p style={subheadingStyle}>
            See the measurable impact of automation on your day-to-day operations.
          </p>
          <BeforeAfterSection metrics={data.beforeAfterMetrics} />
        </div>
      </section>

      {/* 5. How the System Works — off-white bg */}
      <section style={sectionStyle("#F7F9FC")}>
        <div className="container">
          <h2 style={headingStyle}>
            {data.workflowHeading ?? "How the System Works"}
          </h2>
          <p style={{ ...subheadingStyle, marginBottom: "1.5rem" }}>
            A fully automated workflow runs end-to-end — no manual hand-offs required.
          </p>
          <WorkflowDiagram
            steps={data.workflowSteps}
            resultBadge={data.workflowBadge}
          />
        </div>
      </section>

      {/* Custom children slot — between workflow and control layer */}
      {data.children}

      {/* 6. Control Layer — white bg */}
      <section style={sectionStyle("white")}>
        <div className="container">
          <h2 style={{ ...headingStyle, marginBottom: "1.5rem" }}>
            Built-In Governance & Control
          </h2>
          <ControlLayerCard items={data.controlItems} />
        </div>
      </section>

      {/* 7. ROI & Impact — off-white bg */}
      <section style={sectionStyle("#F7F9FC")}>
        <div className="container">
          <h2 style={headingStyle}>ROI &amp; Impact</h2>
          <p style={subheadingStyle}>
            Real results from systems just like yours.
          </p>
          <ROIMetricsGrid
            metrics={data.roiMetrics}
            note={data.roiNote}
            ctaText={data.roiCtaText}
          />
        </div>
      </section>

      {/* 8. Who This Is For — white bg */}
      <section style={sectionStyle("white")}>
        <div className="container">
          <h2 style={headingStyle}>Who This Is For</h2>
          <p style={subheadingStyle}>
            This service is designed for a specific type of business. Make sure it's the right fit before we talk.
          </p>
          <WhoThisIsFor bestFit={data.bestFit} notFit={data.notFit} />
        </div>
      </section>

      {/* 9. Quick Answer — off-white bg */}
      <section style={sectionStyle("#F7F9FC")}>
        <div className="container" style={{ maxWidth: "720px" }}>
          <AEOBlock question={data.aeoQuestion} answer={data.aeoAnswer} />
        </div>
      </section>

      {/* 10. FAQ — white bg */}
      <section style={sectionStyle("white")}>
        <div className="container">
          <h2 style={headingStyle}>Frequently Asked Questions</h2>
          <div style={{ maxWidth: "720px" }}>
            <FAQAccordion items={data.faqItems} />
          </div>
        </div>
      </section>

      {/* 11. Final CTA — dark navy */}
      <ServiceCTASection
        headline={data.ctaHeadline}
        body={data.ctaBody}
        primaryCTA={data.primaryCTA}
        secondaryCTA={data.secondaryCTA}
        primaryMicro={data.primaryMicro}
        secondaryMicro={data.secondaryMicro}
      />

      {/* 12. Related Resources — off-white bg */}
      <section style={sectionStyle("#F7F9FC")}>
        <div className="container">
          <InternalLinksGrid links={data.internalLinks} />
        </div>
      </section>
    </>
  );
}
