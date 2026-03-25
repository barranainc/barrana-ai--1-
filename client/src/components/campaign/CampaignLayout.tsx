import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

/* ─── Brand Colors ─────────────────────────────────────────────────── */
const NAVY = "#283891";
const MAGENTA = "#7E0F4A";
const GREY = "#7B7B7B";
const DARK = "#1a1a2e";
const BODY = "#4A4A4A";
const GREEN = "#0D9668";
const SURFACE = "#F5F5F5";

/* ─── Booking URL (single place to update) ─────────────────────────── */
const BOOKING_URL =
  "https://api.leadconnectorhq.com/widget/booking/YOUR_CALENDAR_ID";

/* ─── Types ────────────────────────────────────────────────────────── */
interface CampaignMathItem {
  value: string;
  label: string;
}

export interface CampaignPage {
  meta: { title: string; description: string };
  utm: string;
  hero: { h1Parts: Array<{ text: string; color?: string }>; body: string };
  math: { heading: string; items: CampaignMathItem[]; total: string };
  fixes: { heading: string; items: string[] };
  proof: { heading: string; paragraphs: string[]; result: string };
  booking: { items: string[]; microcopy?: string };
}

/* ─── Reveal (IntersectionObserver fade-in) ────────────────────────── */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const { ref, visible } = useReveal(0.12);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── CTA Button ───────────────────────────────────────────────────── */
function CampaignCTA({ utm }: { utm: string }) {
  return (
    <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
      <a
        href={`${BOOKING_URL}?${utm}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          background: MAGENTA,
          color: "white",
          padding: "1rem 2.5rem",
          borderRadius: "0.75rem",
          fontSize: "1.125rem",
          fontWeight: 600,
          textDecoration: "none",
          boxShadow: "0 4px 14px rgba(126,15,74,0.3)",
          transition: "all 0.2s",
        }}
      >
        Book Your Free 60-Minute Audit &rarr;
      </a>
      <p style={{ fontSize: "0.875rem", color: GREY, marginTop: "0.75rem" }}>
        No pitch. No obligation. You keep the analysis.
      </p>
    </div>
  );
}

/* ─── Section wrapper ──────────────────────────────────────────────── */
function Section({
  bg,
  children,
  py = "3rem",
}: {
  bg: string;
  children: React.ReactNode;
  py?: string;
}) {
  return (
    <section style={{ background: bg, padding: `${py} 0` }}>
      <div
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        {children}
      </div>
    </section>
  );
}

/* ─── Main Layout ──────────────────────────────────────────────────── */
export default function CampaignLayout({ page }: { page: CampaignPage }) {
  /* Set meta tags */
  useEffect(() => {
    document.title = page.meta.title;

    const setMeta = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement("meta");
        tag.name = name;
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    setMeta("description", page.meta.description);
    setMeta("robots", "noindex");

    return () => {
      const robot = document.querySelector('meta[name="robots"]');
      if (robot) robot.remove();
    };
  }, [page.meta]);

  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: BODY,
        lineHeight: 1.7,
      }}
    >
      {/* ── Header ──────────────────────────────────────────────── */}
      <header
        style={{
          padding: "1rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "white",
          borderBottom: "1px solid #E2E4ED",
        }}
      >
        <Link href="/">
          <span
            style={{
              fontWeight: 700,
              fontSize: "1.25rem",
              color: NAVY,
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Barrana
          </span>
        </Link>
        <a
          href="tel:+16473676771"
          style={{ color: BODY, textDecoration: "none", fontSize: "0.95rem" }}
        >
          +1 647 367 6771
        </a>
      </header>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <Section bg={SURFACE} py="4rem">
        <Reveal>
          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 800,
              lineHeight: 1.2,
              color: DARK,
              marginBottom: "1.5rem",
            }}
          >
            {page.hero.h1Parts.map((part, i) => (
              <span key={i} style={part.color ? { color: part.color } : undefined}>
                {part.text}
              </span>
            ))}
          </h1>
          <p
            style={{
              fontSize: "1.125rem",
              color: BODY,
              maxWidth: "600px",
            }}
          >
            {page.hero.body}
          </p>
          <CampaignCTA utm={page.utm} />
        </Reveal>
      </Section>

      {/* ── Math ────────────────────────────────────────────────── */}
      <Section bg="white">
        <Reveal>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: DARK,
              marginBottom: "2rem",
            }}
          >
            {page.math.heading}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            {page.math.items.map((item, i) => (
              <div key={i}>
                <div
                  style={{
                    fontSize: "1.875rem",
                    fontWeight: 800,
                    color: MAGENTA,
                  }}
                >
                  {item.value}
                </div>
                <div style={{ color: BODY, fontSize: "0.95rem", marginTop: "0.25rem" }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              borderTop: `2px solid ${MAGENTA}`,
              marginTop: "2rem",
              paddingTop: "1.25rem",
            }}
          >
            <div
              style={{
                fontSize: "1.125rem",
                fontWeight: 700,
                color: DARK,
              }}
            >
              {page.math.total}
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ── Fixes ───────────────────────────────────────────────── */}
      <Section bg={SURFACE}>
        <Reveal>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: DARK,
              marginBottom: "1.5rem",
            }}
          >
            {page.fixes.heading}
          </h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {page.fixes.items.map((item, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  marginBottom: "1rem",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    color: GREEN,
                    fontWeight: 700,
                    fontSize: "1.25rem",
                    lineHeight: "1.5rem",
                    flexShrink: 0,
                  }}
                >
                  &#10003;
                </span>
                <span style={{ color: BODY }}>{item}</span>
              </li>
            ))}
          </ul>
          <CampaignCTA utm={page.utm} />
        </Reveal>
      </Section>

      {/* ── Proof ───────────────────────────────────────────────── */}
      <Section bg="white">
        <Reveal>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: DARK,
              marginBottom: "1.5rem",
            }}
          >
            {page.proof.heading}
          </h2>
          {page.proof.paragraphs.map((p, i) => (
            <p key={i} style={{ marginBottom: "1rem", color: BODY }}>
              {p}
            </p>
          ))}
          <p
            style={{
              fontWeight: 700,
              color: MAGENTA,
              fontSize: "1.05rem",
              marginTop: "1.5rem",
            }}
          >
            {page.proof.result}
          </p>
        </Reveal>
      </Section>

      {/* ── Booking ─────────────────────────────────────────────── */}
      <Section bg={SURFACE}>
        <Reveal>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: DARK,
              marginBottom: "1.5rem",
              textAlign: "center",
            }}
          >
            Book Your Free Automation Audit
          </h2>
          <div
            style={{
              background: "white",
              borderRadius: "1rem",
              padding: "2rem",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            }}
          >
            <p
              style={{
                fontWeight: 600,
                color: DARK,
                marginBottom: "1rem",
              }}
            >
              In 60 minutes, you will get:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {page.booking.items.map((item, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    marginBottom: "0.75rem",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      color: GREEN,
                      fontWeight: 700,
                      fontSize: "1.25rem",
                      lineHeight: "1.5rem",
                      flexShrink: 0,
                    }}
                  >
                    &#10003;
                  </span>
                  <span style={{ color: BODY }}>{item}</span>
                </li>
              ))}
            </ul>
            <CampaignCTA utm={page.utm} />
            {page.booking.microcopy && (
              <p
                style={{
                  textAlign: "center",
                  fontSize: "0.85rem",
                  color: GREY,
                  marginTop: "1rem",
                }}
              >
                {page.booking.microcopy}
              </p>
            )}
          </div>
        </Reveal>
      </Section>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer
        style={{
          background: "white",
          borderTop: "1px solid #E2E4ED",
          padding: "2rem 1.5rem",
          textAlign: "center",
          fontSize: "0.85rem",
          color: GREY,
          lineHeight: 1.8,
        }}
      >
        <div>
          <strong style={{ color: DARK }}>Barrana.ai</strong>
        </div>
        <div>3300 Hwy 7 Suite 904, Concord, ON L4K 4M3</div>
        <div>
          <a
            href="tel:+16473676771"
            style={{ color: GREY, textDecoration: "none" }}
          >
            +1 647 367 6771
          </a>
        </div>
        <div style={{ marginTop: "0.5rem" }}>
          <a href="#" style={{ color: GREY, textDecoration: "underline" }}>
            Unsubscribe
          </a>
          {" | "}
          <a href="#" style={{ color: GREY, textDecoration: "underline" }}>
            Privacy
          </a>
        </div>
      </footer>
    </div>
  );
}
