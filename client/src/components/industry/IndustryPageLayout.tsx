/**
 * IndustryPageLayout.tsx
 * Master template for all 20 industry pages.
 * Extends ServicePageLayout pattern with an added Problems section.
 * Includes JSON-LD WebPage/Service schema, FAQ schema, and BreadcrumbList.
 */

import React from "react";
import { useLocation } from "wouter";
import { colors, spacing, typography, cards, surfaces } from "@/styles/design-tokens";
import TrustBadges from "@/components/diagrams/TrustBadges";
import WorkflowDiagram from "@/components/diagrams/WorkflowDiagram";
import FAQAccordion from "@/components/ui/FAQAccordion";
import BreadcrumbNav from "@/components/linking/BreadcrumbNav";
import IndustryServiceCrosslinks from "@/components/linking/IndustryServiceCrosslinks";
import { internalLinks } from "@/config/internal-links";
import SEOHead from "@/components/SEOHead";
import RelatedResources from "@/components/linking/RelatedResources";
import ServiceHero from "@/components/service/ServiceHero";
import HeroBeforeAfterCard from "@/components/service/HeroBeforeAfterCard";
import CostOfInactionCards from "@/components/service/CostOfInactionCards";
import BeforeAfterSection from "@/components/service/BeforeAfterSection";
import ControlLayerCard from "@/components/service/ControlLayerCard";
import ROIMetricsGrid from "@/components/service/ROIMetricsGrid";
import WhoThisIsFor from "@/components/service/WhoThisIsFor";
import AEOBlock from "@/components/service/AEOBlock";
import ServiceCTASection from "@/components/service/ServiceCTASection";
import InternalLinksGrid from "@/components/service/InternalLinksGrid";

import type { WorkflowStep } from "@/components/diagrams/WorkflowDiagram";
import type { FAQItem } from "@/components/ui/FAQAccordion";

export interface IndustryPageData {
  // Meta
  title: string;
  description: string;
  route: string; // e.g. "immigration-consultants"

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

  // Problems section
  problemsHeading?: string;
  problems: { title: string; desc: string }[];

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

  // Hero visual stats (right column of hero — auto-derived from roiMetrics if not set)
  heroStats?: { value: string; label: string }[];

  // Optional custom slot (rendered after workflow, before control)
  children?: React.ReactNode;
}

const sectionStyle = (bg: string): React.CSSProperties => ({
  background: bg,
  padding: `${spacing.sectionPadding} 0`,
});

const headingStyle: React.CSSProperties = {
  ...typography.sectionHeading,
  marginBottom: "1rem",
  lineHeight: 1.25,
};

const subheadingStyle: React.CSSProperties = {
  ...typography.sectionSubheading,
  marginBottom: "2rem",
  maxWidth: "56ch",
};

function ProblemsGrid({ problems }: { problems: { title: string; desc: string }[] }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "1.25rem",
        marginTop: "1.5rem",
      }}
    >
      {problems.map((p, i) => (
        <div
          key={i}
          style={{
            ...cards.typeA,
            borderLeft: `4px solid ${colors.warning}`,
          }}
        >
          <p style={{ ...typography.cardTitle, marginBottom: "0.5rem" }}>
            {p.title}
          </p>
          <p style={{ ...typography.cardBody, margin: 0 }}>
            {p.desc}
          </p>
        </div>
      ))}
    </div>
  );
}

interface IndustryPageLayoutProps {
  data: IndustryPageData;
  heroVisual?: React.ReactNode;
  children?: React.ReactNode;
}

export default function IndustryPageLayout({ data, heroVisual, children }: IndustryPageLayoutProps) {
  const [location] = useLocation();
  const pagePath = location || `/industries/${data.route}`;
  const pageConfig = internalLinks[pagePath];

  const pageSchema = {
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
      { "@type": "ListItem", position: 1, name: "Home", item: "https://barrana.ai" },
      { "@type": "ListItem", position: 2, name: "Industries", item: "https://barrana.ai/industries" },
      { "@type": "ListItem", position: 3, name: data.breadcrumb, item: `https://barrana.ai/industries/${data.route}` },
    ],
  };

  return (
    <>
      {/* SEO Head — OG, Twitter, Canonical */}
      <SEOHead title={data.title} description={data.description} type="article" />

      {/* JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumb Nav */}
      <div style={{ background: colors.surfaceLight, paddingTop: "3rem", paddingBottom: 0 }}>
        <div className="container">
          <BreadcrumbNav
            items={[
              { label: "Home", href: "/" },
              { label: "Industries", href: "/industries" },
              { label: data.breadcrumb },
            ]}
          />
        </div>
      </div>

      {/* 1. Hero */}
      <ServiceHero
        breadcrumb={data.breadcrumb}
        breadcrumbParent={{ label: "Industries", href: "/industries" }}
        h1={data.h1}
        subheadline={data.subheadline}
        body={data.body}
        ctaText={data.ctaText}
        ctaMicro={data.ctaMicro}
        visual={
          heroVisual ?? (
            <HeroBeforeAfterCard
              metrics={data.beforeAfterMetrics}
              show={true}
            />
          )
        }
      />

      {/* 2. Trust Badges */}
      <section style={{ background: "white", paddingBottom: 0 }}>
        <TrustBadges />
      </section>

      {/* 3. Cost of Inaction — off-white */}
      <section style={sectionStyle(colors.surfaceLight)}>
        <div className="container">
          <h2 style={headingStyle}>{data.costHeading}</h2>
          <CostOfInactionCards items={data.costItems} />
        </div>
      </section>

      {/* 4. Problems — white */}
      <section style={sectionStyle("white")}>
        <div className="container">
          <h2 style={headingStyle}>
            {data.problemsHeading ?? "Where You Are Losing Time and Revenue"}
          </h2>
          <ProblemsGrid problems={data.problems} />
        </div>
      </section>

      {/* 5. Before vs After — off-white */}
      <section style={sectionStyle(colors.surfaceLight)}>
        <div className="container">
          <h2 style={headingStyle}>Before vs After Automation</h2>
          <p style={subheadingStyle}>
            The measurable difference automation makes for {data.breadcrumb.toLowerCase()}.
          </p>
          <BeforeAfterSection metrics={data.beforeAfterMetrics} />
        </div>
      </section>

      {/* 6. Automation Workflows — white */}
      <section style={sectionStyle("white")}>
        <div className="container">
          <h2 style={headingStyle}>
            {data.workflowHeading ?? `Systems We Build for ${data.breadcrumb}`}
          </h2>
          <p style={{ ...subheadingStyle, marginBottom: "1.5rem" }}>
            Purpose-built automation that runs end-to-end without manual hand-offs.
          </p>
          <WorkflowDiagram steps={data.workflowSteps} resultBadge={data.workflowBadge} />
        </div>
      </section>

      {/* Optional custom slot — from data.children or JSX children prop */}
      {data.children}
      {children}

      {/* 7. Control Layer — off-white */}
      <section style={sectionStyle(colors.surfaceLight)}>
        <div className="container">
          <h2 style={{ ...headingStyle, marginBottom: "1.5rem" }}>Built-In Governance &amp; Control</h2>
          <ControlLayerCard items={data.controlItems} />
        </div>
      </section>

      {/* 8. ROI & Impact — white */}
      <section style={sectionStyle("white")}>
        <div className="container">
          <h2 style={headingStyle}>ROI &amp; Impact</h2>
          <p style={subheadingStyle}>Typical outcomes for {data.breadcrumb.toLowerCase()}.</p>
          <ROIMetricsGrid metrics={data.roiMetrics} note={data.roiNote} ctaText={data.roiCtaText} />
        </div>
      </section>

      {/* 9. Who This Is For — off-white */}
      <section style={sectionStyle(colors.surfaceLight)}>
        <div className="container">
          <h2 style={headingStyle}>Who This Is For</h2>
          <p style={subheadingStyle}>
            This solution is purpose-built for a specific type of operation. Make sure it is the right fit before we talk.
          </p>
          <WhoThisIsFor bestFit={data.bestFit} notFit={data.notFit} />
        </div>
      </section>

      {/* 10. AEO Quick Answer — white */}
      <section style={sectionStyle("white")}>
        <div className="container" style={{ maxWidth: "720px" }}>
          <AEOBlock question={data.aeoQuestion} answer={data.aeoAnswer} />
        </div>
      </section>

      {/* Service Crosslinks */}
      {pageConfig && pageConfig.services.length > 0 && (
        <section style={sectionStyle(colors.surfaceLight)}>
          <div className="container">
            <IndustryServiceCrosslinks
              items={pageConfig.services}
              heading="Services We Provide"
            />
          </div>
        </section>
      )}

      {/* 11. FAQ — white */}
      <section style={sectionStyle("white")}>
        <div className="container">
          <h2 style={headingStyle}>Frequently Asked Questions</h2>
          <div style={{ maxWidth: "720px" }}>
            <FAQAccordion items={data.faqItems} />
          </div>
        </div>
      </section>

      {/* 12. Final CTA — dark navy */}
      <ServiceCTASection
        headline={data.ctaHeadline}
        body={data.ctaBody}
        primaryCTA={data.primaryCTA}
        secondaryCTA={data.secondaryCTA}
        primaryMicro={data.primaryMicro}
        secondaryMicro={data.secondaryMicro}
      />

      {/* 13. Related Resources — off-white */}
      <section style={sectionStyle(colors.surfaceLight)}>
        <div className="container">
          <InternalLinksGrid links={data.internalLinks} />
        </div>
      </section>

      {/* 14. Contextual Related Resources */}
      <section style={sectionStyle("white")}>
        <div className="container">
          <RelatedResources pagePath={pagePath} />
        </div>
      </section>
    </>
  );
}
