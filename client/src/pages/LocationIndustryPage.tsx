import { Link, useParams } from "wouter";
import { useEffect } from "react";
import { getLocalPage } from "../data/local-pages";
import SEOHead from "@/components/SEOHead";
import { colors, typography, spacing, surfaces, buttons, cards } from "../styles/design-tokens";

/* ─── Inline SVG icons ─────────────────────────────────────── */
function CheckCircleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={colors.navy} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M9 12l2 2 4-4" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

/* ─── FAQ Accordion ────────────────────────────────────────── */
function FAQItem({ question, answer, isOpen, onToggle }: { question: string; answer: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div style={{ borderBottom: `1px solid ${colors.border}` }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.25rem 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span style={{ ...typography.cardTitle, flex: 1, paddingRight: "1rem" }}>{question}</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={colors.navy}
          strokeWidth="2"
          style={{ transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {isOpen && (
        <div style={{ paddingBottom: "1.25rem", ...typography.body }}>
          {answer}
        </div>
      )}
    </div>
  );
}

/* ─── Link label map ───────────────────────────────────────── */
const linkLabels: Record<string, string> = {
  "/industries/immigration-consultants": "Immigration Consultants Industry Page",
  "/industries/accounting-firms": "Accounting Firms Industry Page",
  "/industries/dental-offices": "Dental Offices Industry Page",
  "/industries/physiotherapy-clinics": "Physiotherapy Clinics Industry Page",
  "/industries/contractors": "Contractors Industry Page",
  "/industries/law-firms": "Law Firms Industry Page",
  "/services/client-intake-automation": "Client Intake Automation",
  "/services/document-collection": "Document Collection Automation",
  "/services/invoice-automation": "Invoice Automation",
  "/services/appointment-automation": "Appointment Automation",
  "/services/lead-response-automation": "Lead Response Automation",
  "/services/ai-receptionist": "AI Receptionist",
  "/workflows/document-collection": "Document Collection Workflow",
  "/workflows/appointment-booking": "Appointment Booking Workflow",
  "/case-studies/immigration-firm-north-york": "Case Study: Immigration Firm",
  "/case-studies/accounting-firm-vaughan": "Case Study: Accounting Firm",
  "/case-studies/contractor-mississauga": "Case Study: Contractor",
  "/case-studies/physio-clinic-richmond-hill": "Case Study: Physio Clinic",
  "/case-studies/law-firm-toronto": "Case Study: Law Firm",
  "/ai-automation-vaughan": "AI Automation in Vaughan",
};

function getLinkLabel(href: string): string {
  if (linkLabels[href]) return linkLabels[href];
  if (href.includes("automation-planner")) return "Automation Planner";
  // Extract from path
  const parts = href.split("/").filter(Boolean);
  return parts.map((p) => p.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())).join(" - ");
}

/* ─── Main Component ───────────────────────────────────────── */
export default function LocationIndustryPage() {
  const params = useParams<{ city: string; industry: string }>();
  const slug = `${params.city}/${params.industry}`;
  const page = getLocalPage(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  if (!page) {
    return (
      <div style={{ minHeight: "100vh", background: colors.surfaceWhite, paddingTop: "6rem" }}>
        <div className="container" style={{ padding: "4rem 1rem" }}>
          <h1 style={{ ...typography.sectionHeading, marginBottom: "1rem" }}>Page Not Found</h1>
          <p style={{ ...typography.body, marginBottom: "2rem" }}>We could not find a local industry page for this location.</p>
          <Link href="/locations" style={buttons.primary}>Browse All Locations</Link>
        </div>
      </div>
    );
  }

  // Filter internal links to exclude query-string links for the cards
  const cardLinks = page.internalLinks.filter((l) => !l.includes("?"));

  // JSON-LD Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://barrana.ai/" },
      { "@type": "ListItem", position: 2, name: "Locations", item: "https://barrana.ai/locations" },
      { "@type": "ListItem", position: 3, name: page.city, item: `https://barrana.ai/locations/${params.city}` },
      { "@type": "ListItem", position: 4, name: page.industry },
    ],
  };

  return (
    <>
      {/* SEO Head — OG, Twitter, Canonical */}
      <SEOHead title={page.metaTitle} description={page.metaDescription} />

      {/* Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div style={{ minHeight: "100vh" }}>
        {/* ─── HERO ──────────────────────────────────────────── */}
        <section style={{ ...surfaces.light, padding: `${spacing.sectionPadding} 0 ${spacing.sectionPaddingSm} 0` }}>
          <div className="container">
            {/* Breadcrumb */}
            <nav style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem", ...typography.bodySmall }}>
              <Link href="/" style={{ color: colors.textSecondary, textDecoration: "none" }}>Home</Link>
              <ChevronIcon />
              <Link href="/locations" style={{ color: colors.textSecondary, textDecoration: "none" }}>Locations</Link>
              <ChevronIcon />
              <span style={{ color: colors.textSecondary }}>{page.city}</span>
              <ChevronIcon />
              <span style={{ color: colors.textPrimary, fontWeight: 600 }}>{page.industry}</span>
            </nav>

            <div style={{ maxWidth: "48rem" }}>
              {/* Eyebrow */}
              <div style={{ ...typography.eyebrow, marginBottom: spacing.eyebrowToHeading }}>{page.eyebrow}</div>

              {/* H1 */}
              <h1 style={{ ...typography.pageTitle, marginBottom: "1.5rem" }}>{page.h1}</h1>

              {/* Hero body */}
              <p style={{ ...typography.body, fontSize: "1.125rem", lineHeight: 1.7, marginBottom: "2rem" }}>{page.heroBody}</p>

              {/* CTAs */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                <Link href={page.ctaPrimary.href} style={buttons.primary}>{page.ctaPrimary.text}</Link>
                <Link href={page.ctaSecondary.href} style={buttons.secondary}>
                  {page.ctaSecondary.text} <ArrowRightIcon />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ─── COST SECTION ──────────────────────────────────── */}
        <section style={{ ...surfaces.white, padding: `${spacing.sectionPadding} 0` }}>
          <div className="container">
            <div style={{ maxWidth: "48rem" }}>
              <h2 style={{ ...typography.sectionHeading, marginBottom: spacing.headingToBody }}>{page.costSection.title}</h2>
              <p style={{ ...typography.body, fontSize: "1.0625rem", lineHeight: 1.8 }}>{page.costSection.body}</p>
            </div>
          </div>
        </section>

        {/* ─── WHAT WE AUTOMATE ──────────────────────────────── */}
        <section style={{ ...surfaces.light, padding: `${spacing.sectionPadding} 0` }}>
          <div className="container">
            <div style={{ maxWidth: "48rem" }}>
              <h2 style={{ ...typography.sectionHeading, marginBottom: spacing.headingToBody }}>{page.automateSection.title}</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {page.automateSection.items.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      ...cards.typeA,
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "1rem",
                      padding: "1.25rem 1.5rem",
                    }}
                  >
                    <CheckCircleIcon />
                    <span style={{ ...typography.body }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── WHAT STAYS HUMAN ──────────────────────────────── */}
        <section style={{ ...surfaces.white, padding: `${spacing.sectionPadding} 0` }}>
          <div className="container">
            <div style={{ maxWidth: "48rem" }}>
              <h2 style={{ ...typography.sectionHeading, marginBottom: spacing.headingToBody }}>What Stays Human</h2>
              <div
                style={{
                  borderLeft: `4px solid ${colors.navy}`,
                  padding: "1.5rem 2rem",
                  background: colors.navyWash,
                  borderRadius: "0 0.75rem 0.75rem 0",
                }}
              >
                <p style={{ ...typography.body, fontSize: "1.0625rem", margin: 0 }}>{page.humanSection.body}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── LOCAL MARKET CONTEXT ──────────────────────────── */}
        <section style={{ ...surfaces.light, padding: `${spacing.sectionPadding} 0` }}>
          <div className="container">
            <div style={{ maxWidth: "48rem" }}>
              <h2 style={{ ...typography.sectionHeading, marginBottom: spacing.headingToBody }}>Local Market Context</h2>
              <p style={{ ...typography.body, fontSize: "1.0625rem", lineHeight: 1.8 }}>{page.localContext.body}</p>
            </div>
          </div>
        </section>

        {/* ─── RESULTS ───────────────────────────────────────── */}
        <section style={{ ...surfaces.white, padding: `${spacing.sectionPadding} 0` }}>
          <div className="container">
            <div style={{ maxWidth: "48rem" }}>
              <h2 style={{ ...typography.sectionHeading, marginBottom: spacing.headingToBody }}>Results</h2>
              <div
                style={{
                  ...cards.typeA,
                  borderLeft: `4px solid ${colors.success}`,
                  borderRadius: "0 1rem 1rem 0",
                }}
              >
                <p style={{ ...typography.body, fontSize: "1.0625rem", lineHeight: 1.8, margin: 0 }}>{page.resultsSection.body}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQ ───────────────────────────────────────────── */}
        <section style={{ ...surfaces.white, padding: `${spacing.sectionPaddingSm} 0 ${spacing.sectionPadding} 0` }}>
          <div className="container">
            <div style={{ maxWidth: "48rem" }}>
              <h2 style={{ ...typography.sectionHeading, marginBottom: spacing.headingToBody }}>Frequently Asked Questions</h2>
              <div>
                {page.faq.map((f, i) => (
                  <FAQItem
                    key={i}
                    question={f.question}
                    answer={f.answer}
                    isOpen={openFaq === i}
                    onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── CTA ───────────────────────────────────────────── */}
        <section style={{ ...surfaces.darkGradient, padding: `${spacing.sectionPadding} 0` }}>
          <div className="container" style={{ textAlign: "center" }}>
            <div style={{ maxWidth: "40rem", margin: "0 auto" }}>
              <h2 style={{ ...typography.sectionHeading, color: "white", marginBottom: "1.5rem" }}>
                Ready to Automate Your {page.industry} Practice in {page.city}?
              </h2>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.0625rem", lineHeight: 1.7, marginBottom: "2.5rem" }}>
                {page.ctaBody}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
                <Link href="/contact" style={buttons.primaryOnDark}>Book Free Audit</Link>
                <Link href="/automation-planner" style={buttons.secondaryOnDark}>Start Automation Planner</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ─── RELATED RESOURCES ─────────────────────────────── */}
        {cardLinks.length > 0 && (
          <section style={{ ...surfaces.light, padding: `${spacing.sectionPadding} 0` }}>
            <div className="container">
              <h2 style={{ ...typography.sectionHeading, marginBottom: spacing.headingToBody }}>Related Resources</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: spacing.cardGridGap }}>
                {cardLinks.slice(0, 4).map((href) => (
                  <Link
                    key={href}
                    href={href}
                    style={{
                      ...cards.typeA,
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      transition: "box-shadow 0.2s, border-color 0.2s",
                    }}
                  >
                    <ArrowRightIcon />
                    <span style={{ ...typography.cardTitle, color: colors.navy }}>{getLinkLabel(href)}</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

/* Need React import for useState */
import React from "react";
