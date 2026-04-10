/**
 * FullStackServices.tsx
 * Route: /services/full-stack
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import JsonLd from "@/components/JsonLd";

// ── Brand constants ──────────────────────────────────────────────────────────
const NAVY = "#283891";
const BURGUNDY = "#7E0F4A";
const GREY = "#7B7B7B";
const DARK = "#1A1A2E";
const OFFWHITE = "#F7F8FC";
const BORDER = "#E5E7EF";

// ── Reveal hook ──────────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

// ── Reveal wrapper component ─────────────────────────────────────────────────
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ── Full-Stack 6-Layer Diagram ───────────────────────────────────────────────
function FullStackLayerDiagram() {
  const { ref, visible } = useReveal();
  const layers = [
    {
      num: 1,
      emoji: "🗺️",
      label: "Operational Consulting",
      desc: "Process mapping, bottleneck analysis, strategy before systems",
      width: "70%",
      bg: "rgba(40,56,145,0.15)",
      border: NAVY,
      highlight: false,
    },
    {
      num: 2,
      emoji: "🌐",
      label: "Website & Digital Presence",
      desc: "Conversion-optimised website, landing pages, local SEO",
      width: "80%",
      bg: "rgba(40,56,145,0.22)",
      border: NAVY,
      highlight: false,
    },
    {
      num: 3,
      emoji: "📣",
      label: "Client Acquisition",
      desc: "Social media, paid ads, content marketing, referral systems",
      width: "85%",
      bg: "rgba(126,15,74,0.15)",
      border: BURGUNDY,
      highlight: false,
    },
    {
      num: 4,
      emoji: "⚙️",
      label: "Workflow Automation — Core",
      desc: "Lead response, intake, booking, documents, invoicing, reporting",
      width: "100%",
      bg: NAVY,
      border: NAVY,
      highlight: true,
    },
    {
      num: 5,
      emoji: "💻",
      label: "Custom Software & AI",
      desc: "Bespoke applications, AI agents, client portals, internal tools",
      width: "85%",
      bg: "rgba(40,56,145,0.25)",
      border: NAVY,
      highlight: false,
    },
    {
      num: 6,
      emoji: "📈",
      label: "Ongoing Optimisation",
      desc: "Monitoring, refinement, expansion, quarterly reviews",
      width: "75%",
      bg: "rgba(126,15,74,0.20)",
      border: BURGUNDY,
      highlight: false,
    },
  ];

  return (
    <div ref={ref} style={{ padding: "2rem 0", maxWidth: "680px", margin: "0 auto" }}>
      <p
        style={{
          fontSize: "0.75rem",
          textAlign: "center",
          color: GREY,
          marginBottom: "1.5rem",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}
      >
        Built on a foundation of automation
      </p>
      {[...layers].reverse().map((layer, i) => (
        <div
          key={layer.num}
          style={{
            background: layer.bg,
            border: `1px solid ${layer.border}`,
            borderLeft: layer.highlight ? `4px solid ${layer.border}` : `2px solid ${layer.border}`,
            borderRadius: "8px",
            padding: "0.875rem 1.25rem",
            width: layer.highlight ? "100%" : layer.width,
            margin: "0 auto 0.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-30px)",
            transition: `opacity 0.4s ease ${(layers.length - 1 - i) * 0.12}s, transform 0.4s ease ${(layers.length - 1 - i) * 0.12}s`,
          }}
        >
          <span style={{ fontSize: "1.25rem", flexShrink: 0 }}>{layer.emoji}</span>
          <div>
            <div
              style={{
                fontWeight: 700,
                fontSize: "0.9rem",
                color: layer.highlight ? "white" : DARK,
              }}
            >
              {layer.label}
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                color: layer.highlight ? "rgba(255,255,255,0.8)" : GREY,
              }}
            >
              {layer.desc}
            </div>
          </div>
          {layer.highlight && (
            <span
              style={{
                marginLeft: "auto",
                fontSize: "0.65rem",
                fontWeight: 700,
                background: "rgba(255,255,255,0.2)",
                color: "white",
                padding: "0.2rem 0.5rem",
                borderRadius: "999px",
                flexShrink: 0,
              }}
            >
              CORE
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

// ── FAQ Item ─────────────────────────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        border: `1px solid ${BORDER}`,
        borderRadius: "10px",
        marginBottom: "0.75rem",
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          textAlign: "left",
          padding: "1.125rem 1.25rem",
          background: open ? OFFWHITE : "white",
          border: "none",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: 600,
          fontSize: "0.95rem",
          color: DARK,
        }}
      >
        {q}
        <span style={{ fontSize: "1.25rem", color: NAVY, flexShrink: 0, marginLeft: "1rem" }}>
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <div
          style={{
            padding: "0 1.25rem 1.25rem",
            color: GREY,
            fontSize: "0.9rem",
            lineHeight: 1.7,
            background: OFFWHITE,
          }}
        >
          {a}
        </div>
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function FullStackServices() {
  useEffect(() => {
    document.title =
      "Full-Stack AI Automation | Barrana.ai";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Barrana.ai provides full-stack business partnership: workflow automation as the core, with custom software, website design, social media, and operational consulting. One partner for your entire operational technology stack."
      );
    }
  }, []);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Full-Stack Business Partner: Automation, Software, Web, and Growth",
    description:
      "Barrana.ai provides a full-stack business partnership combining workflow automation, custom software development, website design, social media and client acquisition systems, and operational consulting.",
    author: { "@type": "Organization", name: "Barrana.ai" },
    publisher: { "@type": "Organization", name: "Barrana.ai", url: "https://barrana.ai" },
    url: "https://barrana.ai/services/full-stack",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://barrana.ai" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://barrana.ai/services" },
      {
        "@type": "ListItem",
        position: 3,
        name: "Full-Stack Services",
        item: "https://barrana.ai/services/full-stack",
      },
    ],
  };

  const faqs = [
    {
      q: "Can I start with just automation and add the rest later?",
      a: "Yes — and that is the recommended approach. Most engagements start with Phase 1 (core workflow automation), then expand to other layers like a website rebuild or social media system once the operational foundation is in place. You only pay for what you need, when you need it.",
    },
    {
      q: "How is this different from hiring separate agencies?",
      a: "When you hire separate vendors for automation, web, and social media, none of them see the full picture. The automation agency does not know your website is losing leads. The web agency does not know your CRM is the bottleneck. One partner who understands the entire stack builds everything to work together — and fixes problems at the root instead of patching symptoms.",
    },
    {
      q: "Do you manage our social media ongoing?",
      a: "We build social media systems and content frameworks rather than doing day-to-day posting on your behalf. That means you get a repeatable process, content calendar, and distribution workflow that your team can run — or we can help operate it as part of an ongoing engagement. Either way, it is built to scale.",
    },
  ];

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          background: DARK,
          padding: "4rem 0 3.5rem",
        }}
      >
        <div className="container">
          <nav style={{ marginBottom: "1.25rem" }}>
            <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.45)" }}>
              <Link href="/" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>
                Home
              </Link>
              {" › "}
              <Link href="/services" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>
                Services
              </Link>
              {" › "}
              <span style={{ color: "rgba(255,255,255,0.7)" }}>Full-Stack</span>
            </span>
          </nav>
          <div
            style={{
              display: "inline-block",
              background: "rgba(126,15,74,0.25)",
              color: "#F9A8D4",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "0.35rem 0.875rem",
              borderRadius: "999px",
              marginBottom: "1.25rem",
              border: "1px solid rgba(126,15,74,0.4)",
            }}
          >
            Full-Stack Services
          </div>
          <h1
            style={{
              fontSize: "clamp(1.875rem, 4vw, 3rem)",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.2,
              marginBottom: "1.25rem",
              maxWidth: "780px",
            }}
          >
            Full-Stack Business Partner: Automation, Software, Web, and Growth
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "1.1rem",
              lineHeight: 1.7,
              maxWidth: "660px",
              marginBottom: "2rem",
            }}
          >
            One partner who handles your entire operational technology stack. No vendor coordination. No gaps.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link
              href="/contact"
              style={{
                background: BURGUNDY,
                color: "white",
                padding: "0.875rem 1.75rem",
                borderRadius: "8px",
                fontWeight: 700,
                fontSize: "0.95rem",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Book a Strategy Call
            </Link>
            <Link
              href="/automation-planner"
              style={{
                background: "transparent",
                color: "white",
                padding: "0.875rem 1.75rem",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "0.95rem",
                textDecoration: "none",
                display: "inline-block",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              Start the Automation Planner
            </Link>
          </div>
        </div>
      </section>

      {/* ── AEO SUMMARY BOX ──────────────────────────────────────────────── */}
      <section style={{ background: "white", padding: "3rem 0 0" }}>
        <div className="container">
          <Reveal>
            <div
              style={{
                borderLeft: `4px solid ${NAVY}`,
                background: "#F0F4FF",
                padding: "1.5rem 2rem",
                borderRadius: "0 10px 10px 0",
                marginBottom: "3rem",
              }}
            >
              <p
                style={{
                  color: DARK,
                  lineHeight: 1.75,
                  fontSize: "0.975rem",
                  margin: 0,
                }}
              >
                Barrana.ai provides a full-stack business partnership: workflow automation as the core, with custom software development, website design, social media and client acquisition systems, and operational consulting as additional layers. This means a single partner handles your entire operational technology stack instead of coordinating multiple vendors. Services include custom AI applications, website builds, landing pages, paid advertising, content systems, referral programs, business process mapping, and growth planning.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── WHY ONE PARTNER ──────────────────────────────────────────────── */}
      <section style={{ background: "white", padding: "0 0 3rem" }}>
        <div className="container">
          <Reveal>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.125rem)",
                fontWeight: 800,
                color: DARK,
                marginBottom: "1.25rem",
              }}
            >
              Why One Partner Is Better Than Five Vendors
            </h2>
            <p style={{ color: GREY, lineHeight: 1.75, maxWidth: "72ch", marginBottom: "1rem" }}>
              Coordinating multiple vendors means different tools, different communication styles, different pricing models, inconsistent quality, and nobody seeing the full picture.
            </p>
            <p style={{ color: GREY, lineHeight: 1.75, maxWidth: "72ch", marginBottom: "2rem" }}>
              Your automation agency does not know your website is losing leads before they reach the CRM. Your web agency does not know the booking confirmation email is where clients are dropping off. Your social media manager does not know which content type brings your highest-converting leads.
            </p>
            <p style={{ color: GREY, lineHeight: 1.75, maxWidth: "72ch" }}>
              One partner who understands your entire operation builds everything to work together — and when something breaks, there is one number to call and one person responsible for fixing it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── LAYER DIAGRAM ─────────────────────────────────────────────────── */}
      <section style={{ background: OFFWHITE, padding: "3rem 0" }}>
        <div className="container">
          <Reveal>
            <h2
              style={{
                fontSize: "clamp(1.375rem, 2.5vw, 1.875rem)",
                fontWeight: 800,
                color: DARK,
                textAlign: "center",
                marginBottom: "0.5rem",
              }}
            >
              The Full-Stack Architecture
            </h2>
            <p
              style={{
                color: GREY,
                textAlign: "center",
                marginBottom: "0.5rem",
                maxWidth: "520px",
                margin: "0 auto 0.5rem",
              }}
            >
              Six service layers. One integrated partner.
            </p>
          </Reveal>
          <FullStackLayerDiagram />
        </div>
      </section>

      {/* ── SERVICE DETAIL: CUSTOM SOFTWARE ──────────────────────────────── */}
      <section style={{ background: "white", padding: "3.5rem 0" }}>
        <div className="container">
          <Reveal>
            <div style={{ maxWidth: "800px" }}>
              <h2
                style={{
                  fontSize: "clamp(1.375rem, 2.5vw, 1.875rem)",
                  fontWeight: 800,
                  color: DARK,
                  marginBottom: "1.25rem",
                }}
              >
                Custom Software and AI
              </h2>
              <p style={{ color: GREY, lineHeight: 1.75, marginBottom: "1rem" }}>
                We build bespoke applications, AI agents, and intelligent systems that sit on top of your automation layer. From patient portals to client dashboards to internal tools — designed for your specific workflow, not a generic template.
              </p>
              <p style={{ color: GREY, lineHeight: 1.75, marginBottom: "1rem" }}>
                Off-the-shelf software solves generic problems. When your operation has specific requirements — a referral tracking system, a custom intake experience, an internal reporting dashboard your team will actually use — bespoke development is the answer.
              </p>
              <p style={{ color: GREY, lineHeight: 1.75, marginBottom: "1.5rem" }}>
                Because we also build the automation layer, every custom application we create is connected to your live operational data from day one. No integration work. No manual data entry. The software and the automation work together as a single system.
              </p>
              <ul style={{ paddingLeft: "1.25rem", color: GREY, lineHeight: 2 }}>
                <li>Custom web applications</li>
                <li>AI agent development</li>
                <li>Client-facing portals and dashboards</li>
                <li>Internal operations tools</li>
                <li>API integrations and data pipelines</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SERVICE DETAIL: WEBSITES ──────────────────────────────────────── */}
      <section style={{ background: OFFWHITE, padding: "3.5rem 0" }}>
        <div className="container">
          <Reveal>
            <div style={{ maxWidth: "800px" }}>
              <h2
                style={{
                  fontSize: "clamp(1.375rem, 2.5vw, 1.875rem)",
                  fontWeight: 800,
                  color: DARK,
                  marginBottom: "1.25rem",
                }}
              >
                Websites That Convert
              </h2>
              <p style={{ color: GREY, lineHeight: 1.75, marginBottom: "1rem" }}>
                Your website is where your automation starts. If it does not capture leads, present services clearly, and convert visitors into enquiries, the automation has nothing to work with. A technically excellent automation system cannot rescue a website that loses visitors before they ever reach a form.
              </p>
              <p style={{ color: GREY, lineHeight: 1.75, marginBottom: "1rem" }}>
                We build websites designed to feed automated systems. That means clear calls to action, forms that connect directly to your CRM, landing pages that qualify intent before a lead enters your pipeline, and content architecture built for local search.
              </p>
              <p style={{ color: GREY, lineHeight: 1.75, marginBottom: "1.5rem" }}>
                When Barrana builds both the website and the automation, every form submission, every visitor interaction, and every conversion event flows directly into your operational systems without any manual copying or integration maintenance.
              </p>
              <ul style={{ paddingLeft: "1.25rem", color: GREY, lineHeight: 2 }}>
                <li>Website design and development</li>
                <li>Landing page optimisation</li>
                <li>SEO and local search</li>
                <li>Conversion rate optimisation</li>
                <li>Content systems that rank and convert</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SERVICE DETAIL: SOCIAL MEDIA ─────────────────────────────────── */}
      <section style={{ background: "white", padding: "3.5rem 0" }}>
        <div className="container">
          <Reveal>
            <div style={{ maxWidth: "800px" }}>
              <h2
                style={{
                  fontSize: "clamp(1.375rem, 2.5vw, 1.875rem)",
                  fontWeight: 800,
                  color: DARK,
                  marginBottom: "1.25rem",
                }}
              >
                Social Media and Client Acquisition
              </h2>
              <p style={{ color: GREY, lineHeight: 1.75, marginBottom: "1rem" }}>
                We build social media systems, content frameworks, and acquisition funnels that bring prospects to your door — then automation takes over. The full pipeline, not just the middle.
              </p>
              <p style={{ color: GREY, lineHeight: 1.75, marginBottom: "1rem" }}>
                Most businesses invest in acquisition (ads, social, content) without fixing the follow-up. Leads come in, sit in an inbox, and go cold. We build acquisition systems that are explicitly designed to hand off to your automated follow-up, booking, and intake flows.
              </p>
              <p style={{ color: GREY, lineHeight: 1.75, marginBottom: "1.5rem" }}>
                When acquisition and automation are built by the same partner, the handoff between "lead arrives" and "lead enters your pipeline" is seamless and tracked. No lead falls through the gap between your ad campaign and your CRM.
              </p>
              <ul style={{ paddingLeft: "1.25rem", color: GREY, lineHeight: 2 }}>
                <li>Social media strategy and content systems</li>
                <li>Paid advertising (Google, Meta, LinkedIn)</li>
                <li>Content marketing and distribution</li>
                <li>Lead magnet and funnel design</li>
                <li>Referral and review generation systems</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SERVICE DETAIL: CONSULTING ────────────────────────────────────── */}
      <section style={{ background: OFFWHITE, padding: "3.5rem 0" }}>
        <div className="container">
          <Reveal>
            <div style={{ maxWidth: "800px" }}>
              <h2
                style={{
                  fontSize: "clamp(1.375rem, 2.5vw, 1.875rem)",
                  fontWeight: 800,
                  color: DARK,
                  marginBottom: "1.25rem",
                }}
              >
                Operational Consulting: Strategy Before Systems
              </h2>
              <p style={{ color: GREY, lineHeight: 1.75, marginBottom: "1rem" }}>
                Sometimes the fix is not technology — it is process. Automating a broken workflow makes it break faster. Before building any system, we map your current operations, identify the bottlenecks, and redesign the workflow logic.
              </p>
              <p style={{ color: GREY, lineHeight: 1.75, marginBottom: "1rem" }}>
                We help businesses decide what gets automated, what gets delegated, and what gets eliminated entirely. Many operational problems look like technology problems but are actually sequencing or ownership problems that no software can fix.
              </p>
              <p style={{ color: GREY, lineHeight: 1.75, marginBottom: "1.5rem" }}>
                This consulting layer is embedded in every engagement. Whether you are starting with automation, a website rebuild, or a full-stack engagement, we begin with process analysis — because the right system built on the wrong process is still the wrong system.
              </p>
              <ul style={{ paddingLeft: "1.25rem", color: GREY, lineHeight: 2 }}>
                <li>Business process mapping and analysis</li>
                <li>Operational efficiency consulting</li>
                <li>Technology stack assessment</li>
                <li>Growth planning and capacity modelling</li>
                <li>Team workflow redesign</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── REAL-WORLD EXAMPLE ────────────────────────────────────────────── */}
      <section style={{ background: "white", padding: "3.5rem 0" }}>
        <div className="container">
          <Reveal>
            <div
              style={{
                maxWidth: "800px",
                background: "#F0F4FF",
                borderLeft: `4px solid ${NAVY}`,
                borderRadius: "0 10px 10px 0",
                padding: "2rem 2.25rem",
              }}
            >
              <h2
                style={{
                  fontSize: "clamp(1.25rem, 2.5vw, 1.625rem)",
                  fontWeight: 800,
                  color: DARK,
                  marginBottom: "1.25rem",
                }}
              >
                A Real-World Example: A Physiotherapy Clinic Needing Everything
              </h2>
              <p style={{ color: GREY, lineHeight: 1.75, margin: 0 }}>
                A physiotherapy clinic came in needing help with their website (it was not showing up in local search and had no online booking), their operations (intake was a 20-minute phone call and paper forms), and their client retention (no follow-up after treatment ended). We rebuilt the website with local SEO and a booking integration, automated the intake process so new patients received digital forms before their first appointment, built a patient portal for home exercise resources, set up a social content system for Instagram and Google Business, and implemented monthly performance reporting delivered automatically to the practice owner every Monday morning. Each layer fed the next: the website brought leads into the automated booking flow, the portal improved patient experience and outcomes, the social content drove referrals, and the reporting showed which channels were working.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PRICING / HOW IT WORKS ────────────────────────────────────────── */}
      <section style={{ background: OFFWHITE, padding: "3.5rem 0" }}>
        <div className="container">
          <Reveal>
            <div style={{ maxWidth: "800px" }}>
              <h2
                style={{
                  fontSize: "clamp(1.375rem, 2.5vw, 1.875rem)",
                  fontWeight: 800,
                  color: DARK,
                  marginBottom: "1.25rem",
                }}
              >
                How Full-Stack Engagements Work
              </h2>
              <p style={{ color: GREY, lineHeight: 1.75, marginBottom: "1rem" }}>
                Every engagement starts with a strategy call and operational audit. We map your current state, identify the highest-impact starting point, and deliver a fixed-price proposal broken into phases.
              </p>
              <p style={{ color: GREY, lineHeight: 1.75, marginBottom: "1rem" }}>
                Phase 1 is almost always workflow automation — because it delivers the fastest ROI and creates the operational foundation that everything else is built on. Phase 2 and beyond expand into other layers based on your priorities and growth objectives.
              </p>
              <p style={{ color: GREY, lineHeight: 1.75 }}>
                Fixed-price proposals. No hourly billing. No scope surprises. You know the cost and the deliverables before work begins. You can start with one layer and expand when you are ready.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section style={{ background: "white", padding: "3.5rem 0" }}>
        <div className="container">
          <Reveal>
            <h2
              style={{
                fontSize: "clamp(1.375rem, 2.5vw, 1.875rem)",
                fontWeight: 800,
                color: DARK,
                marginBottom: "2rem",
              }}
            >
              Common Questions
            </h2>
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section style={{ background: DARK, padding: "4rem 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <Reveal>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                fontWeight: 800,
                color: "white",
                marginBottom: "1rem",
              }}
            >
              Ready to Build the Full Stack?
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.7,
                marginBottom: "2rem",
                maxWidth: "520px",
                margin: "0 auto 2rem",
              }}
            >
              Start with a strategy call. We will map your current operations and show you exactly where to begin.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/contact"
                style={{
                  background: BURGUNDY,
                  color: "white",
                  padding: "0.875rem 1.75rem",
                  borderRadius: "8px",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Book a Strategy Call
              </Link>
              <Link
                href="/automation-planner"
                style={{
                  background: "transparent",
                  color: "white",
                  padding: "0.875rem 1.75rem",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  textDecoration: "none",
                  display: "inline-block",
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              >
                Start the Automation Planner
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
