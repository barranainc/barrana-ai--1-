/**
 * ServiceHero.tsx
 * Light hero section for service and industry pages.
 * Two-column layout: text left, optional visual card right.
 * Stagger entrance animations. Breadcrumb navigation.
 */

import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface ServiceHeroProps {
  breadcrumb: string;
  breadcrumbParent?: { label: string; href: string }; // defaults to "Services"
  h1: string;
  subheadline: string;
  body: string[];
  ctaText?: string;
  ctaMicro?: string;
  visual?: React.ReactNode; // optional right-column visual
}

export default function ServiceHero({
  breadcrumb,
  breadcrumbParent = { label: "Services", href: "/services" },
  h1,
  subheadline,
  body,
  ctaText = "Get Your Free 60-Minute Automation Audit",
  ctaMicro,
  visual,
}: ServiceHeroProps) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const show = mounted || reduced;

  const staggerStyle = (index: number): React.CSSProperties => ({
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0)" : "translateY(18px)",
    transition: reduced
      ? "none"
      : `opacity 0.55s ease ${index * 0.1}s, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s`,
  });

  return (
    <section
      style={{
        background: "#F7F9FC",
        paddingTop: "6rem",
        paddingBottom: "4rem",
      }}
    >
      <div className="container">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
            fontSize: "0.8125rem",
            color: "var(--b-grey)",
            marginBottom: "2rem",
            ...staggerStyle(0),
          }}
        >
          <Link href="/" style={{ color: "var(--b-grey)", textDecoration: "none" }}>
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link href={breadcrumbParent.href} style={{ color: "var(--b-grey)", textDecoration: "none" }}>
            {breadcrumbParent.label}
          </Link>
          <span aria-hidden="true">/</span>
          <span style={{ color: "var(--b-dark)", fontWeight: 600 }}>{breadcrumb}</span>
        </nav>

        {/* Two-column grid — stacks on mobile */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: visual ? "1fr 1fr" : "1fr",
            gap: "3rem",
            alignItems: "center",
          }}
          className={visual ? "lg:grid-cols-2 grid-cols-1" : ""}
        >
          {/* Left: text */}
          <div
            style={{
              borderLeft: "4px solid var(--b-navy)",
              paddingLeft: "1.5rem",
              maxWidth: visual ? undefined : "680px",
            }}
          >
            <h1
              style={{
                fontWeight: 800,
                color: "var(--b-dark)",
                marginBottom: "1rem",
                fontSize: "clamp(1.875rem, 4vw, 2.75rem)",
                lineHeight: 1.15,
                ...staggerStyle(1),
              }}
            >
              {h1}
            </h1>

            <p
              style={{
                color: "var(--b-navy)",
                fontSize: "1.0625rem",
                fontWeight: 600,
                lineHeight: 1.6,
                marginBottom: "1.25rem",
                ...staggerStyle(2),
              }}
            >
              {subheadline}
            </p>

            <div style={staggerStyle(3)}>
              {body.map((para, i) => (
                <p
                  key={i}
                  style={{
                    color: "var(--b-grey)",
                    lineHeight: 1.75,
                    fontSize: "0.9375rem",
                    marginBottom: "0.875rem",
                  }}
                >
                  {para}
                </p>
              ))}
            </div>

            {/* CTA */}
            <div style={{ marginTop: "2rem", ...staggerStyle(4) }}>
              <Link href="/contact" className="btn-primary">
                {ctaText}
              </Link>
              {ctaMicro && (
                <p
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--b-grey)",
                    marginTop: "0.625rem",
                    lineHeight: 1.4,
                  }}
                >
                  {ctaMicro}
                </p>
              )}
            </div>
          </div>

          {/* Right: visual (hidden on mobile, shown md+) */}
          {visual && (
            <div className="hidden md:block">
              {visual}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
