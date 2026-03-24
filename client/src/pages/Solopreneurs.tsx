import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import BeforeAfterSection from "@/components/service/BeforeAfterSection";
import JsonLd from "@/components/JsonLd";
import { colors, spacing, typography, surfaces } from "@/styles/design-tokens";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #E2E8F0", padding: "1rem 0" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "1rem", fontWeight: 600, color: "#1A1A2E", padding: 0 }}>
        {q}
        <span style={{ fontSize: "1.25rem", color: "#283891", display: "inline-block", transform: open ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
      </button>
      {open && <p style={{ marginTop: "0.75rem", color: "#7B7B7B", lineHeight: 1.7 }}>{a}</p>}
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 style={{ ...typography.sectionHeading, marginBottom: "1.25rem" }}>{children}</h2>;
}

function SolopreneurWeekCalendar() {
  const { ref, visible } = useReveal();
  const [showAfter, setShowAfter] = useState(false);

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setShowAfter(true), 2000);
      return () => clearTimeout(t);
    }
  }, [visible]);

  const days = [
    { day: "Mon", billable: 3, admin: 4.5 },
    { day: "Tue", billable: 4, admin: 3 },
    { day: "Wed", billable: 5, admin: 2.5 },
    { day: "Thu", billable: 4, admin: 3.5 },
    { day: "Fri", billable: 2, admin: 3.5 },
  ];

  const maxHours = 8;

  return (
    <div ref={ref} style={{ marginTop: "2rem" }}>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.85rem", color: "#4A4A4A" }}>
          <span style={{ width: 12, height: 12, borderRadius: 2, background: "#22C55E", display: "inline-block" }} /> Billable (sessions)
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.85rem", color: "#4A4A4A" }}>
          <span style={{ width: 12, height: 12, borderRadius: 2, background: "#EF4444", display: "inline-block" }} /> Admin / Ops
        </span>
        {showAfter && (
          <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.85rem", color: "#4A4A4A" }}>
            <span style={{ width: 12, height: 12, borderRadius: 2, background: "#14B8A6", display: "inline-block" }} /> Recovered (free time)
          </span>
        )}
      </div>

      <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-end", height: 200 }}>
        {days.map((d, i) => {
          const billableH = (d.billable / maxHours) * 200;
          const adminAfterH = ((d.admin * 0.3) / maxHours) * 200;
          const recoveredH = ((d.admin * 0.7) / maxHours) * 200;
          const adminBeforeH = (d.admin / maxHours) * 200;

          return (
            <div key={d.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", height: 180, gap: 2, transition: "all 0.6s ease" }}>
                {showAfter ? (
                  <>
                    <div style={{ width: "100%", height: recoveredH, background: "#14B8A6", borderRadius: "4px 4px 0 0", opacity: visible ? 1 : 0, transition: `height 0.6s ease ${i * 0.1}s, opacity 0.4s ease ${i * 0.1}s` }} />
                    <div style={{ width: "100%", height: adminAfterH, background: "#EF4444", opacity: visible ? 1 : 0, transition: `height 0.6s ease ${i * 0.1}s, opacity 0.4s ease ${i * 0.1}s` }} />
                  </>
                ) : (
                  <div style={{ width: "100%", height: adminBeforeH, background: "#EF4444", borderRadius: "4px 4px 0 0", opacity: visible ? 1 : 0, transition: `height 0.5s ease ${i * 0.15}s, opacity 0.4s ease ${i * 0.15}s` }} />
                )}
                <div style={{ width: "100%", height: billableH, background: "#22C55E", opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${i * 0.15}s` }} />
              </div>
              <span style={{ fontSize: "0.8rem", color: "#7B7B7B", fontWeight: 600 }}>{d.day}</span>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: "1.25rem", display: "flex", justifyContent: "center" }}>
        {!showAfter ? (
          <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "0.75rem 1.5rem", textAlign: "center" }}>
            <span style={{ color: "#DC2626", fontWeight: 700, fontSize: "1rem" }}>Only ~50% of your week generates revenue</span>
          </div>
        ) : (
          <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 8, padding: "0.75rem 1.5rem", textAlign: "center", animation: "fadeIn 0.5s ease" }}>
            <span style={{ color: "#16A34A", fontWeight: 700, fontSize: "1rem" }}>With automation: 10-12 hrs/week recovered</span>
          </div>
        )}
      </div>
      <p style={{ textAlign: "center", fontSize: "0.8rem", color: "#7B7B7B", marginTop: "0.5rem" }}>
        {!showAfter ? "Showing: current week breakdown" : "Showing: automated week — watch the bars shift"}
      </p>
    </div>
  );
}

function SolopreneurToolHub() {
  const { ref, visible } = useReveal();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const tools = [
    { name: "CRM", detail: "Go High Level / HubSpot", angle: 0, emoji: "📊" },
    { name: "Booking", detail: "Calendly / Acuity", angle: 45, emoji: "📅" },
    { name: "Payments", detail: "Stripe / QuickBooks", angle: 90, emoji: "💳" },
    { name: "Email", detail: "ConvertKit / Mailchimp", angle: 135, emoji: "📧" },
    { name: "Social", detail: "Later / Buffer", angle: 180, emoji: "📱" },
    { name: "Video", detail: "Zoom + Riverside", angle: 225, emoji: "🎥" },
    { name: "Automation", detail: "Make (Integromat)", angle: 270, emoji: "⚙️" },
    { name: "AI", detail: "ChatGPT / Claude", angle: 315, emoji: "🤖" },
  ];

  if (isMobile) {
    return (
      <div ref={ref} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginTop: "2rem" }}>
        {tools.map((t, i) => (
          <div key={t.name} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 10, padding: "0.85rem", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 4, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: `opacity 0.4s ease ${i * 0.07}s, transform 0.4s ease ${i * 0.07}s` }}>
            <span style={{ fontSize: "1.5rem" }}>{t.emoji}</span>
            <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "#1A1A2E" }}>{t.name}</span>
            <span style={{ fontSize: "0.75rem", color: "#7B7B7B" }}>{t.detail}</span>
          </div>
        ))}
      </div>
    );
  }

  const radius = 170;
  const svgSize = 500;
  const cx = svgSize / 2;
  const cy = svgSize / 2;

  return (
    <div ref={ref} style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
      <div style={{ position: "relative", width: svgSize, height: svgSize }}>
        <svg width={svgSize} height={svgSize} style={{ position: "absolute", top: 0, left: 0 }}>
          <defs>
            <radialGradient id="hubGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3D52B0" />
              <stop offset="100%" stopColor="#283891" />
            </radialGradient>
          </defs>
          {/* Automation ring */}
          <circle cx={cx} cy={cy} r={120} fill="none" stroke="#E0E7FF" strokeWidth={18} strokeDasharray="8 6" opacity={visible ? 0.6 : 0} style={{ transition: "opacity 0.6s ease 0.3s" }} />
          {/* Spokes */}
          {tools.map((t, i) => {
            const angleRad = (t.angle - 90) * (Math.PI / 180);
            const x2 = cx + radius * Math.cos(angleRad);
            const y2 = cy + radius * Math.sin(angleRad);
            return (
              <line key={t.name} x1={cx} y1={cy} x2={x2} y2={y2} stroke="#C7D2FE" strokeWidth={1.5}
                strokeDasharray="200" strokeDashoffset={visible ? "0" : "200"}
                style={{ transition: `stroke-dashoffset 0.5s ease ${0.4 + i * 0.08}s` }} />
            );
          })}
          {/* Centre circle */}
          <circle cx={cx} cy={cy} r={52} fill="url(#hubGrad)" opacity={visible ? 1 : 0} style={{ transition: "opacity 0.4s ease 0.2s" }} />
          <text x={cx} y={cy - 6} textAnchor="middle" fill="#fff" fontWeight="700" fontSize="13">YOU +</text>
          <text x={cx} y={cy + 10} textAnchor="middle" fill="#C7D2FE" fontWeight="600" fontSize="11">Make</text>
          {/* Ring label */}
          <text x={cx} y={cy - 108} textAnchor="middle" fill="#283891" fontWeight="700" fontSize="10" opacity={visible ? 1 : 0} style={{ transition: "opacity 0.4s ease 0.8s" }}>Make — Automation Layer</text>
        </svg>
        {/* Tool nodes */}
        {tools.map((t, i) => {
          const angleRad = (t.angle - 90) * (Math.PI / 180);
          const x = cx + radius * Math.cos(angleRad);
          const y = cy + radius * Math.sin(angleRad);
          return (
            <div key={t.name} style={{
              position: "absolute",
              left: x - 44,
              top: y - 30,
              width: 88,
              background: "#fff",
              border: "1.5px solid #C7D2FE",
              borderRadius: 8,
              padding: "5px 4px",
              textAlign: "center",
              opacity: visible ? 1 : 0,
              transform: visible ? "scale(1)" : "scale(0.6)",
              transition: `opacity 0.35s ease ${0.5 + i * 0.09}s, transform 0.35s ease ${0.5 + i * 0.09}s`,
              boxShadow: "0 2px 8px rgba(40,56,145,0.08)",
            }}>
              <div style={{ fontSize: "1.1rem" }}>{t.emoji}</div>
              <div style={{ fontWeight: 700, fontSize: "0.7rem", color: "#1A1A2E", lineHeight: 1.2 }}>{t.name}</div>
              <div style={{ fontSize: "0.6rem", color: "#7B7B7B", lineHeight: 1.2 }}>{t.detail}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ThreeGrowthLevers() {
  const { ref, visible } = useReveal();
  const levers = [
    {
      number: "01",
      emoji: "💰",
      label: "More 1:1 Clients",
      headline: "+$50,000–60,000/yr",
      body: "Reducing 15 hrs of admin to 3-5 hrs recovers 10-12 hrs/week — enough for 5-6 more client sessions. At $200/session: $1,000-$1,200/week additional capacity, without working longer days.",
    },
    {
      number: "02",
      emoji: "👥",
      label: "Launch Group Programs",
      headline: "Scale beyond 1:1",
      body: "The time you recover is for building the group program or course you've been putting off. Automation handles enrolment, onboarding, and follow-up for group programs automatically.",
    },
    {
      number: "03",
      emoji: "🔄",
      label: "Build a Content Engine",
      headline: "Create once, distribute everywhere",
      body: "When repurposing is automated, your audience grows → pipeline grows → sessions fill. The flywheel turns because you're not manually managing every piece of content.",
    },
  ];

  return (
    <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.5rem", marginTop: "2rem" }}>
      {levers.map((l, i) => (
        <div key={l.number} style={{
          background: "#F0F4FF",
          borderRadius: 14,
          padding: "2rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(32px)",
          transition: `opacity 0.5s ease ${i * 0.15}s, transform 0.5s ease ${i * 0.15}s`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ background: "#283891", color: "#fff", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.85rem", flexShrink: 0 }}>{l.number}</span>
            <span style={{ fontSize: "1.5rem" }}>{l.emoji}</span>
          </div>
          <div style={{ fontWeight: 800, fontSize: "0.9rem", color: "#283891", textTransform: "uppercase", letterSpacing: "0.05em" }}>{l.label}</div>
          <div style={{ fontWeight: 800, fontSize: "1.3rem", color: "#1A1A2E", lineHeight: 1.2 }}>{l.headline}</div>
          <p style={{ color: "#4A4A4A", lineHeight: 1.7, fontSize: "0.95rem", margin: 0 }}>{l.body}</p>
        </div>
      ))}
    </div>
  );
}

const faqData = [
  {
    q: "I'm literally one person. Is this really for me?",
    a: "Yes. Solopreneurs benefit most because every automated task returns time directly to you. There's no team to delegate to, so automation IS your team. The systems we build are scaled for one-person operations — lean, efficient, and low-maintenance.",
  },
  {
    q: "I'm not technical at all. Will this be complicated?",
    a: "No. We handle the entire setup — from connecting your tools to building every workflow. You continue using your existing tools. The automation runs in the background. You'll be shown what's happening, but you don't need to manage any of it.",
  },
  {
    q: "How long does implementation take?",
    a: "Starter package: 1-2 weeks. Growth package: 3-4 weeks. Full system: 5-6 weeks. We deliver in phases so you start seeing value early, not at the end.",
  },
  {
    q: "Will my clients notice a difference?",
    a: "Yes — and they'll notice a better one. Faster responses, smoother onboarding, more consistent follow-up, and a more professional experience. Many clients tell solopreneurs they seem 'more put together' after automation. That's the point.",
  },
  {
    q: "Can you help with my social media too?",
    a: "Yes. Barrana handles content strategy, social media systems, and client acquisition as part of our full-stack services. Content repurposing automation is included in the Growth and Full System packages.",
  },
  {
    q: "What about my website?",
    a: "If your website isn't converting visitors into enquiries, we can rebuild it as part of the engagement. The website feeds the automation — if the top of the funnel is broken, the rest doesn't matter. We assess this on the strategy call.",
  },
];

export default function Solopreneurs() {
  const heroReveal = useReveal();
  const trap = useReveal();
  const workflows = useReveal();
  const toolSection = useReveal();
  const zonesReveal = useReveal();
  const pricingReveal = useReveal();
  const expertReveal = useReveal();
  const faqReveal = useReveal();

  const expertTypes = [
    { emoji: "🏃", label: "Weight loss coaches, nutritionists, personal trainers" },
    { emoji: "🧠", label: "Therapists, counsellors, life coaches" },
    { emoji: "💼", label: "Business coaches, marketing consultants, strategy advisors" },
    { emoji: "🎓", label: "Tutors, course creators, speaking coaches" },
    { emoji: "📸", label: "Photographers, designers (consultation-based)" },
    { emoji: "💰", label: "Financial coaches, bookkeeping consultants" },
    { emoji: "🎯", label: "Career coaches, resume specialists" },
  ];

  const workflowCards = [
    {
      num: "1", name: "Enquiry Response & Lead Capture",
      before: "Gets a response when you check your phone. By then they've contacted 3 other coaches.",
      after: "Instant response within 90 seconds, qualifying questions, CRM record, booking link.",
    },
    {
      num: "2", name: "Discovery Call Booking",
      before: "Back-and-forth DMs to find a time.",
      after: "Prospect qualifies → sees real-time availability → books directly → confirmation + prep email + reminders.",
    },
    {
      num: "3", name: "Client Onboarding",
      before: "Manually send welcome email, share Drive folder, explain process on first call.",
      after: "Client signs → welcome sequence, intake form, prep guide, scheduling link all sent automatically.",
    },
    {
      num: "4", name: "Session Follow-Up",
      before: "Send notes when you remember. Sometimes you forget.",
      after: "Session ends → follow-up sent within 2 hours with summary, action items, resources, next booking link.",
    },
    {
      num: "5", name: "Social Media Content Repurposing",
      before: "Creating for 4 platforms takes 10+ hrs/week.",
      after: "Record one video → AI extracts clips → formats for Instagram, TikTok, LinkedIn, YouTube Shorts → scheduled.",
    },
    {
      num: "6", name: "Invoice & Payment Collection",
      before: "Create invoices manually, sometimes late, sometimes forgotten.",
      after: "Package purchased/session completed → invoice sent → reminders at 3/7/14 days.",
    },
    {
      num: "7", name: "Testimonial & Review Collection",
      before: "Occasionally ask happy clients. Most say yes but never follow through.",
      after: "Client hits milestone → request sent with direct link → follow-up if not completed.",
    },
    {
      num: "8", name: "Re-Engagement & Upsell",
      before: "Past clients disappear. Nobody reaches out.",
      after: "30/60/90-day sequence checking in and offering next program.",
    },
  ];

  const pricingTiers = [
    {
      name: "Starter",
      price: "$2,500–$4,000 CAD",
      items: ["Lead response automation", "Discovery call booking", "Session follow-up"],
      note: "Pays for itself in 3-4 weeks at $200/session.",
      highlight: false,
    },
    {
      name: "Growth",
      price: "$5,000–$8,000 CAD",
      items: ["Everything in Starter", "Client onboarding", "Invoice & payment collection", "Testimonial requests"],
      note: "The most popular choice for solopreneurs scaling to $15k+/month.",
      highlight: true,
    },
    {
      name: "Full System",
      price: "$8,000–$12,000 CAD",
      items: ["Everything in Growth", "Content repurposing engine", "Re-engagement sequences", "Reporting dashboard"],
      note: "Built for solopreneurs ready to launch group programs or courses.",
      highlight: false,
    },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Business Automation for Solopreneurs — Barrana",
    description: "Automation systems built for coaches, consultants, and expert-led businesses. Recover 10-12 hours per week without hiring a team.",
    author: { "@type": "Organization", name: "Barrana" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://barrana.ai/" },
      { "@type": "ListItem", position: 2, name: "Solopreneurs", item: "https://barrana.ai/solopreneurs" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      {/* HERO */}
      <section style={{ ...surfaces.darkGradient, padding: spacing.sectionPadding + " 0 " + spacing.sectionPaddingSm }}>
        <div className="container">
          <div ref={heroReveal.ref} style={{ maxWidth: 780, margin: "0 auto", textAlign: "center", opacity: heroReveal.visible ? 1 : 0, transform: heroReveal.visible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
            <span style={{ display: "inline-block", background: "rgba(126,15,74,0.2)", border: "1px solid rgba(126,15,74,0.5)", borderRadius: 20, padding: "0.35rem 1rem", fontSize: "0.8rem", fontWeight: 700, color: "#E879A8", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
              Solopreneur &amp; Expert-Led Business
            </span>
            <h1 style={{ fontSize: "clamp(1.8rem,4.5vw,3rem)", fontWeight: 900, color: "#fff", lineHeight: 1.2, marginBottom: "1.25rem" }}>
              You Are the Product, the Marketing Team, the Admin, and the CEO.{" "}
              <span style={{ color: "#E879A8" }}>Let Automation Handle Three of Those.</span>
            </h1>
            <p style={{ fontSize: "clamp(1rem,2vw,1.2rem)", color: "#A0AEC0", lineHeight: 1.7, marginBottom: "1rem" }}>
              You became an expert to help people, not to chase invoices, manage DMs, send follow-up emails, and build spreadsheets. Automation takes the operational weight off so you can focus on the work that actually earns: coaching, consulting, creating, and serving clients.
            </p>
            <p style={{ fontSize: "1rem", color: "#718096", lineHeight: 1.7, marginBottom: "2.5rem" }}>
              If you run a coaching practice, consulting business, or expert-led service — and your revenue comes from sessions, courses, or group programs — this page is for you.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/automation-planner?industry=solopreneur">
                <a style={{ background: "#7E0F4A", color: "#fff", padding: "0.85rem 2rem", borderRadius: 8, fontWeight: 700, fontSize: "1rem", textDecoration: "none", display: "inline-block" }}>
                  See What You Can Automate
                </a>
              </Link>
              <Link href="/contact">
                <a style={{ background: "transparent", color: "#fff", padding: "0.85rem 2rem", borderRadius: 8, fontWeight: 700, fontSize: "1rem", textDecoration: "none", border: "2px solid rgba(255,255,255,0.4)", display: "inline-block" }}>
                  Book a Free Strategy Call
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: The Trap */}
      <section style={{ background: colors.surfaceWhite, padding: spacing.sectionPadding + " 0" }}>
        <div className="container">
          <div ref={trap.ref} style={{ opacity: trap.visible ? 1 : 0, transform: trap.visible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}>
            <SectionHeading>You Hit a Ceiling. Not Because You're Not Good Enough. Because There's Only One of You.</SectionHeading>
            <p style={{ color: "#4A4A4A", lineHeight: 1.8, maxWidth: 700, marginBottom: "1.5rem" }}>
              Here's what a typical week looks like for a solopreneur earning $8,000–$15,000/month:
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
              {[
                { day: "Monday", sessions: "3 client sessions (3 hrs)", ops: ["Responding to DMs/enquiries (1.5 hrs)", "Creating content (2 hrs)", "Admin and scheduling (1 hr)"], total: "7.5 hrs", billable: "3 hrs billable" },
                { day: "Tuesday", sessions: "4 sessions (4 hrs)", ops: ["Following up on leads from last week (45 min)", "Sending invoices (30 min)", "Planning content (1.5 hrs)", "Rescheduling a client (15 min)"], total: "7 hrs", billable: "4 hrs billable" },
              ].map((d) => (
                <div key={d.day} style={{ background: "#F7F9FC", borderRadius: 10, padding: "1.25rem", borderLeft: "4px solid #283891" }}>
                  <div style={{ fontWeight: 800, color: "#1A1A2E", marginBottom: "0.5rem" }}>{d.day}</div>
                  <div style={{ color: "#22C55E", fontSize: "0.9rem", marginBottom: "0.4rem" }}>✓ {d.sessions}</div>
                  {d.ops.map((o) => <div key={o} style={{ color: "#EF4444", fontSize: "0.85rem", marginBottom: "0.2rem" }}>✗ {o}</div>)}
                  <div style={{ marginTop: "0.5rem", fontSize: "0.85rem", color: "#7B7B7B" }}>Total: {d.total} — only <strong style={{ color: "#1A1A2E" }}>{d.billable}</strong></div>
                </div>
              ))}
            </div>
            <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 10, padding: "1.25rem", marginBottom: "2rem" }}>
              <p style={{ color: "#7F1D1D", fontWeight: 600, margin: 0, lineHeight: 1.7 }}>
                By Friday: you've done 15 client sessions and 15+ hours of operational work. You're exhausted. You cannot take more clients because there's no more time.
              </p>
            </div>
            <SolopreneurWeekCalendar />
          </div>
        </div>
      </section>

      {/* SECTION 2: 8 Workflows */}
      <section style={{ background: colors.surfaceLight, padding: spacing.sectionPadding + " 0" }}>
        <div className="container">
          <div ref={workflows.ref} style={{ opacity: workflows.visible ? 1 : 0, transform: workflows.visible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}>
            <SectionHeading>The 8 Workflows That Eat Your Week</SectionHeading>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "1.25rem", marginTop: "2rem" }}>
              {workflowCards.map((w, i) => (
                <div key={w.num} style={{
                  background: "#fff", borderRadius: 12, padding: "1.5rem",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  opacity: workflows.visible ? 1 : 0,
                  transform: workflows.visible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.4s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s`,
                }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.85rem" }}>
                    <span style={{ background: "#283891", color: "#fff", borderRadius: "50%", width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.8rem", flexShrink: 0, marginTop: 2 }}>{w.num}</span>
                    <span style={{ fontWeight: 800, fontSize: "1rem", color: "#1A1A2E", lineHeight: 1.3 }}>{w.name}</span>
                  </div>
                  <div style={{ marginBottom: "0.5rem" }}>
                    <span style={{ color: "#DC2626", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Right now: </span>
                    <span style={{ color: "#4A4A4A", fontSize: "0.9rem" }}>{w.before}</span>
                  </div>
                  <div>
                    <span style={{ color: "#16A34A", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Automated: </span>
                    <span style={{ color: "#4A4A4A", fontSize: "0.9rem" }}>{w.after}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Tool Stack */}
      <section style={{ background: colors.surfaceWhite, padding: spacing.sectionPadding + " 0" }}>
        <div className="container">
          <div ref={toolSection.ref} style={{ opacity: toolSection.visible ? 1 : 0, transition: "opacity 0.5s ease" }}>
            <SectionHeading>Tools That Work for One-Person Businesses</SectionHeading>
            <p style={{ color: "#4A4A4A", lineHeight: 1.7, maxWidth: 640 }}>
              You don't need enterprise software. Here's the typical solopreneur automation stack — connected by a single automation layer so everything talks to everything else.
            </p>
            <SolopreneurToolHub />
          </div>
        </div>
      </section>

      {/* SECTION 4: What Should Stay You */}
      <section style={{ background: colors.surfaceLight, padding: spacing.sectionPadding + " 0" }}>
        <div className="container">
          <div ref={zonesReveal.ref}>
            <SectionHeading>Your Expertise Is Not Automatable. Everything Around It Is.</SectionHeading>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.5rem", marginTop: "2rem" }}>
              {[
                {
                  label: "Your Zone",
                  bg: "#EEF2FF",
                  border: "#283891",
                  headingColor: "#283891",
                  icon: "🧠",
                  items: [
                    "The coaching or consulting sessions themselves",
                    "Your unique methodology and frameworks",
                    "High-touch relationship moments",
                    "Pricing decisions",
                    "Content ideation and personal storytelling",
                    "Accepting or declining clients",
                  ],
                  delay: 0,
                },
                {
                  label: "Automation's Zone",
                  bg: "#F0FDF4",
                  border: "#16A34A",
                  headingColor: "#15803D",
                  icon: "⚙️",
                  items: [
                    "All scheduling and rescheduling",
                    "All follow-up and reminder emails",
                    "All invoicing and payment collection",
                    "All content repurposing and distribution",
                    "All onboarding logistics",
                    "All review and testimonial requests",
                    "All re-engagement sequences",
                  ],
                  delay: 0.15,
                },
              ].map((zone) => (
                <div key={zone.label} style={{
                  background: zone.bg,
                  border: `2px solid ${zone.border}`,
                  borderRadius: 14,
                  padding: "2rem",
                  opacity: zonesReveal.visible ? 1 : 0,
                  transform: zonesReveal.visible ? "translateY(0)" : "translateY(24px)",
                  transition: `opacity 0.5s ease ${zone.delay}s, transform 0.5s ease ${zone.delay}s`,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
                    <span style={{ fontSize: "1.5rem" }}>{zone.icon}</span>
                    <span style={{ fontWeight: 800, fontSize: "1.1rem", color: zone.headingColor }}>{zone.label}</span>
                  </div>
                  <ul style={{ margin: 0, padding: "0 0 0 1.2rem" }}>
                    {zone.items.map((item) => (
                      <li key={item} style={{ color: "#1A1A2E", lineHeight: 1.8, fontSize: "0.95rem", marginBottom: "0.25rem" }}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Before & After */}
      <section style={{ background: colors.surfaceWhite, padding: spacing.sectionPadding + " 0" }}>
        <div className="container">
          <SectionHeading>Before and After: A Solopreneur's Week</SectionHeading>
          <BeforeAfterSection metrics={[
            { label: "Enquiry Response Time", before: "Hours (when I check phone)", after: "90 seconds, 24/7", beforeW: 85, afterW: 5 },
            { label: "Discovery Call Booking", before: "15-min DM back-and-forth", after: "Self-serve, zero involvement", beforeW: 70, afterW: 8 },
            { label: "Client Onboarding", before: "Manual emails over 3 days", after: "Automated in < 5 minutes", beforeW: 75, afterW: 8 },
            { label: "Session Follow-Up", before: "When I remember", after: "Automatic within 2 hours", beforeW: 60, afterW: 5 },
            { label: "Invoicing", before: "Manual, often late", after: "Triggered on completion", beforeW: 65, afterW: 8 },
            { label: "Admin Hours / Week", before: "15-20 hours", after: "3-5 hours", beforeW: 85, afterW: 20 },
            { label: "Max Weekly Capacity", before: "15-18 clients", after: "22-25 clients", beforeW: 55, afterW: 90 },
          ]} />
        </div>
      </section>

      {/* SECTION 6: Three Growth Levers */}
      <section style={{ ...surfaces.darkGradient, padding: spacing.sectionPadding + " 0" }}>
        <div className="container">
          <h2 style={{ fontSize: "clamp(1.5rem,3vw,2rem)", fontWeight: 800, color: "#fff", marginBottom: "0.5rem" }}>
            Three Growth Levers Automation Unlocks for Solopreneurs
          </h2>
          <p style={{ color: "#A0AEC0", marginBottom: 0, maxWidth: 580 }}>
            When operational weight lifts, three distinct growth paths open up — none of which require you to work more hours.
          </p>
          <ThreeGrowthLevers />
        </div>
      </section>

      {/* SECTION 7: Investment */}
      <section style={{ background: colors.surfaceLight, padding: spacing.sectionPadding + " 0" }}>
        <div className="container">
          <div ref={pricingReveal.ref} style={{ opacity: pricingReveal.visible ? 1 : 0, transform: pricingReveal.visible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}>
            <SectionHeading>Investment and What to Expect</SectionHeading>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.5rem", marginTop: "2rem" }}>
              {pricingTiers.map((tier, i) => (
                <div key={tier.name} style={{
                  background: tier.highlight ? "#283891" : "#fff",
                  border: tier.highlight ? "2px solid #283891" : "1.5px solid #E2E8F0",
                  borderRadius: 14,
                  padding: "2rem",
                  position: "relative",
                  opacity: pricingReveal.visible ? 1 : 0,
                  transform: pricingReveal.visible ? "translateY(0)" : "translateY(24px)",
                  transition: `opacity 0.4s ease ${i * 0.12}s, transform 0.4s ease ${i * 0.12}s`,
                }}>
                  {tier.highlight && (
                    <span style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: "#7E0F4A", color: "#fff", fontSize: "0.75rem", fontWeight: 700, padding: "0.25rem 1rem", borderRadius: 20, whiteSpace: "nowrap" }}>
                      Most Popular
                    </span>
                  )}
                  <div style={{ fontWeight: 800, fontSize: "1.25rem", color: tier.highlight ? "#fff" : "#1A1A2E", marginBottom: "0.5rem" }}>{tier.name}</div>
                  <div style={{ fontWeight: 900, fontSize: "1.4rem", color: tier.highlight ? "#A5B4FC" : "#283891", marginBottom: "1.25rem" }}>{tier.price}</div>
                  <ul style={{ padding: "0 0 0 1.2rem", margin: "0 0 1.25rem" }}>
                    {tier.items.map((item) => (
                      <li key={item} style={{ color: tier.highlight ? "#C7D2FE" : "#4A4A4A", lineHeight: 1.8, fontSize: "0.9rem" }}>{item}</li>
                    ))}
                  </ul>
                  <p style={{ fontSize: "0.85rem", color: tier.highlight ? "#A5B4FC" : "#7B7B7B", fontStyle: "italic", margin: 0 }}>{tier.note}</p>
                </div>
              ))}
            </div>
            <p style={{ marginTop: "1.5rem", color: "#7B7B7B", fontSize: "0.9rem" }}>
              Plus monthly maintenance: $150–$300 CAD/month to monitor workflows, update integrations, and add small automations as your business evolves.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 8: Expert Types */}
      <section style={{ background: colors.surfaceWhite, padding: spacing.sectionPadding + " 0" }}>
        <div className="container">
          <div ref={expertReveal.ref} style={{ opacity: expertReveal.visible ? 1 : 0, transform: expertReveal.visible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}>
            <SectionHeading>Built for Every Kind of Expert-Led Business</SectionHeading>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "0.85rem", marginTop: "1.5rem" }}>
              {expertTypes.map((e, i) => (
                <div key={e.label} style={{
                  background: "#F7F9FC",
                  border: "1px solid #E2E8F0",
                  borderRadius: 10,
                  padding: "1.1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  opacity: expertReveal.visible ? 1 : 0,
                  transform: expertReveal.visible ? "translateY(0)" : "translateY(16px)",
                  transition: `opacity 0.35s ease ${i * 0.07}s, transform 0.35s ease ${i * 0.07}s`,
                }}>
                  <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>{e.emoji}</span>
                  <span style={{ fontSize: "0.85rem", color: "#1A1A2E", lineHeight: 1.4 }}>{e.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: colors.surfaceLight, padding: spacing.sectionPadding + " 0" }}>
        <div className="container">
          <div ref={faqReveal.ref} style={{ maxWidth: 720, margin: "0 auto", opacity: faqReveal.visible ? 1 : 0, transform: faqReveal.visible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}>
            <SectionHeading>Frequently Asked Questions</SectionHeading>
            {faqData.map((f) => <FAQItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ ...surfaces.darkGradient, padding: spacing.sectionPadding + " 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(1.5rem,3.5vw,2.25rem)", fontWeight: 900, color: "#fff", marginBottom: "1rem", maxWidth: 700, margin: "0 auto 1rem" }}>
            You Didn't Become an Expert to Spend Half Your Week on Admin.
          </h2>
          <p style={{ color: "#A0AEC0", fontSize: "1.1rem", lineHeight: 1.7, maxWidth: 520, margin: "0 auto 2.5rem" }}>
            Let automation handle the operational overhead. You handle the expertise.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "1.5rem" }}>
            <Link href="/automation-planner?industry=solopreneur">
              <a style={{ background: "#7E0F4A", color: "#fff", padding: "0.9rem 2rem", borderRadius: 8, fontWeight: 700, fontSize: "1rem", textDecoration: "none", display: "inline-block" }}>
                See What You Can Automate
              </a>
            </Link>
            <Link href="/contact">
              <a style={{ background: "transparent", color: "#fff", padding: "0.9rem 2rem", borderRadius: 8, fontWeight: 700, fontSize: "1rem", textDecoration: "none", border: "2px solid rgba(255,255,255,0.35)", display: "inline-block" }}>
                Book a Free Strategy Call
              </a>
            </Link>
          </div>
          <p style={{ color: "#718096", fontSize: "0.875rem" }}>
            We work with solopreneurs earning $5,000–$25,000/month who want to grow without burning out.
          </p>
        </div>
      </section>
    </>
  );
}
