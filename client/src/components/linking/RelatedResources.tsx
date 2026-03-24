/**
 * RelatedResources.tsx
 * Renders 3-4 contextually relevant resource cards based on the internal-links config.
 */

import { Link } from "wouter";
import { ArrowRight, BookOpen, Briefcase, Building2, BarChart3, Wrench } from "lucide-react";
import { internalLinks } from "@/config/internal-links";

const NAVY = "#283891";
const MAGENTA = "#7E0F4A";
const GREY = "#7B7B7B";
const DARK = "#1A1A2E";

/* Badge colour + icon per link type */
const typeMeta: Record<string, { badge: string; bg: string; color: string; Icon: typeof BookOpen }> = {
  service:   { badge: "Service",    bg: "rgba(40,56,145,0.10)", color: NAVY,    Icon: Wrench },
  industry:  { badge: "Industry",   bg: "rgba(126,15,74,0.10)", color: MAGENTA, Icon: Building2 },
  workflow:  { badge: "Guide",      bg: "rgba(40,56,145,0.08)", color: NAVY,    Icon: BarChart3 },
  caseStudy: { badge: "Case Study", bg: "rgba(126,15,74,0.08)", color: MAGENTA, Icon: Briefcase },
  decision:  { badge: "Guide",      bg: "rgba(40,56,145,0.08)", color: NAVY,    Icon: BookOpen },
};

interface TaggedLink {
  href: string;
  label: string;
  type: keyof typeof typeMeta;
}

function pickBestItems(pagePath: string): TaggedLink[] {
  const cfg = internalLinks[pagePath];
  if (!cfg) return [];

  const pool: TaggedLink[] = [];

  /* Pick one from each category in priority order */
  if (cfg.services.length > 0)    pool.push({ ...cfg.services[0], type: "service" });
  if (cfg.industries.length > 0)  pool.push({ ...cfg.industries[0], type: "industry" });
  if (cfg.workflows.length > 0)   pool.push({ ...cfg.workflows[0], type: "workflow" });
  else if (cfg.decisions.length > 0) pool.push({ ...cfg.decisions[0], type: "decision" });
  if (cfg.caseStudies.length > 0) pool.push({ ...cfg.caseStudies[0], type: "caseStudy" });

  /* If under 4, backfill from decisions or extra services */
  if (pool.length < 4 && cfg.decisions.length > 0 && !pool.some(p => p.type === "decision")) {
    pool.push({ ...cfg.decisions[0], type: "decision" });
  }
  if (pool.length < 4 && cfg.services.length > 1) {
    pool.push({ ...cfg.services[1], type: "service" });
  }

  return pool.slice(0, 4);
}

export default function RelatedResources({ pagePath }: { pagePath: string }) {
  const items = pickBestItems(pagePath);
  if (items.length === 0) return null;

  return (
    <>
      <style>{`
        .rr-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1rem;
        }
        .rr-card {
          background: rgba(245,246,250,0.5);
          border-radius: 0.75rem;
          padding: 1.5rem;
          text-decoration: none;
          display: block;
          transition: box-shadow 0.2s ease, transform 0.15s ease;
        }
        .rr-card:hover {
          box-shadow: 0 6px 24px rgba(40,56,145,0.10);
          transform: translateY(-2px);
        }
      `}</style>

      <section style={{ marginTop: "3rem" }}>
        <h2
          style={{
            fontWeight: 800,
            color: DARK,
            fontSize: "clamp(1.375rem, 2.5vw, 1.75rem)",
            marginBottom: "1.5rem",
          }}
        >
          Continue Exploring
        </h2>

        <div className="rr-grid">
          {items.map((item, i) => {
            const meta = typeMeta[item.type];
            return (
              <Link key={i} href={item.href} className="rr-card">
                {/* Badge */}
                <span
                  style={{
                    display: "inline-block",
                    background: meta.bg,
                    color: meta.color,
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    borderRadius: "2rem",
                    padding: "0.2rem 0.625rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  {meta.badge}
                </span>

                {/* Title + arrow */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 600,
                      fontSize: "0.9375rem",
                      color: NAVY,
                      lineHeight: 1.35,
                    }}
                  >
                    {item.label}
                  </span>
                  <ArrowRight
                    size={16}
                    style={{ color: NAVY, flexShrink: 0, marginTop: "0.125rem" }}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
