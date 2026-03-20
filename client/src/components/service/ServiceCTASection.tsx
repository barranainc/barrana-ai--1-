/**
 * ServiceCTASection.tsx
 * Dark navy CTA section for the bottom of service pages.
 */

import { Link } from "wouter";

export interface ServiceCTASectionProps {
  headline: string;
  body: string;
  primaryCTA?: string;
  secondaryCTA?: string;
  primaryMicro?: string;
  secondaryMicro?: string;
}

export default function ServiceCTASection({
  headline,
  body,
  primaryCTA = "Get Your Free 60-Minute Automation Audit",
  secondaryCTA = "Download: 5 Workflows Every Service Business Should Automate First",
  primaryMicro = "Walk away with a clear plan to automate your business in 30 days.",
  secondaryMicro,
}: ServiceCTASectionProps) {
  return (
    <section
      style={{
        background: "var(--b-navy)",
        padding: "5rem 0",
        textAlign: "center",
      }}
    >
      <div className="container">
        <h2
          style={{
            color: "white",
            fontWeight: 800,
            maxWidth: "38ch",
            margin: "0 auto",
            lineHeight: 1.25,
            fontSize: "clamp(1.625rem, 3.5vw, 2.25rem)",
          }}
        >
          {headline}
        </h2>

        <p
          style={{
            color: "rgba(255,255,255,0.75)",
            maxWidth: "52ch",
            margin: "1.25rem auto 2.5rem",
            lineHeight: 1.7,
            fontSize: "1rem",
          }}
        >
          {body}
        </p>

        {/* Buttons row */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
            alignItems: "flex-start",
          }}
        >
          {/* Primary CTA */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
            <Link href="/contact" className="btn-primary">
              {primaryCTA}
            </Link>
            {primaryMicro && (
              <span
                style={{
                  fontSize: "0.8125rem",
                  color: "rgba(255,255,255,0.55)",
                  maxWidth: "28ch",
                  lineHeight: 1.4,
                }}
              >
                {primaryMicro}
              </span>
            )}
          </div>

          {/* Secondary CTA */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
            <Link
              href="/contact"
              style={{
                display: "inline-block",
                border: "2px solid rgba(255,255,255,0.3)",
                color: "white",
                padding: "0.75rem 1.5rem",
                borderRadius: "0.5rem",
                fontWeight: 600,
                fontSize: "0.9375rem",
                textDecoration: "none",
                transition: "border-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.6)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.3)";
              }}
            >
              {secondaryCTA}
            </Link>
            {secondaryMicro && (
              <span
                style={{
                  fontSize: "0.8125rem",
                  color: "rgba(255,255,255,0.55)",
                  maxWidth: "30ch",
                  lineHeight: 1.4,
                }}
              >
                {secondaryMicro}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
