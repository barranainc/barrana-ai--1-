/**
 * Resources.tsx — Barrana.ai Resources / Knowledge Hub
 * Design: Premium Systems Consultancy
 * Editorial layout, scroll reveal, clean typography
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { colors } from "@/styles/design-tokens";

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ── Pillar guides (6) ────────────────────────────────────────────────────────
const pillarGuides = [
  { emoji: "🚀", category: "Getting Started", title: "AI Adoption for Small Businesses: A Practical Guide", desc: "What AI adoption actually means for an SMB, the five stages, what to automate, and what to keep human. Includes cost ranges and common mistakes.", readTime: "15 min read", href: "/ai-adoption-small-business", color: "#283891" },
  { emoji: "⚙️", category: "Framework", title: "Business Workflow Automation for SMBs: The Complete Guide", desc: "The 8 highest-impact workflows to automate, how they connect into a system, and a phased approach to building your automation stack.", readTime: "12 min read", href: "/workflow-automation-smb", color: "#7E0F4A" },
  { emoji: "📞", category: "Service Guide", title: "AI Receptionist for Small Businesses and Professional Services", desc: "How AI receptionists work, what they cost vs a human, when to escalate calls, and honest coverage comparisons by industry.", readTime: "10 min read", href: "/ai-receptionist", color: "#283891" },
  { emoji: "🧑‍💼", category: "Governance", title: "Human-in-the-Loop AI: Why the Best Automation Keeps Humans in Charge", desc: "How to design automation systems with approval gates, escalation paths, and human decision points — the Control Layer explained.", readTime: "12 min read", href: "/human-in-the-loop-ai", color: "#7E0F4A" },
  { emoji: "🏭", category: "Industry Guide", title: "AI Automation by Industry: What Works for Your Business", desc: "Hub page linking to industry-specific automation playbooks for accountants, immigration consultants, law firms, clinics, contractors, and agencies.", readTime: "8 min read", href: "/ai-automation-industries", color: "#283891" },
  { emoji: "📍", category: "Local", title: "AI Automation for Small Businesses in Vaughan and the GTA", desc: "Local service areas, PIPEDA-aware approach, what a typical engagement looks like, and free Automation Audit for GTA businesses.", readTime: "8 min read", href: "/ai-automation-vaughan", color: "#7E0F4A" },
];

// ── Decision / insights pages (5) ────────────────────────────────────────────
const decisionGuides = [
  { category: "Decision Guide", title: "What Should a Small Business Automate First?", desc: "The 5 highest-ROI starting points ranked, with a priority pyramid and before/after metrics for lead response.", readTime: "10 min read", href: "/insights/what-to-automate-first", color: "#283891" },
  { category: "Assessment", title: "How to Know If Your Business Is Automation-Ready", desc: "The 5 readiness signals, a live readiness checker, and what to fix before you start automating.", readTime: "8 min read", href: "/insights/automation-readiness", color: "#7E0F4A" },
  { category: "Decision Guide", title: "Build vs Buy: Custom AI Automation vs Off-the-Shelf Tools", desc: "Why the hybrid approach — off-the-shelf tools connected by a custom automation layer — wins for most SMBs.", readTime: "9 min read", href: "/insights/build-vs-buy", color: "#283891" },
  { category: "Trust Builder", title: "When AI Is Not the Answer: 7 Signs You're Not Ready", desc: "The 7 signs that automation won't solve your problem yet, and what to fix first before you build.", readTime: "7 min read", href: "/insights/when-ai-is-not-the-answer", color: "#7E0F4A" },
  { category: "Decision Guide", title: "Automation vs Delegation: What Business Owners Get Wrong", desc: "A 2×2 decision matrix for knowing when to automate, when to delegate, and when to do both with AI assist.", readTime: "8 min read", href: "/insights/automation-vs-delegation", color: "#283891" },
];

// ── Workflow deep-dives (4) ───────────────────────────────────────────────────
const workflowGuides = [
  { emoji: "⚡", title: "How to Automate Lead Intake", desc: "Trigger → qualify → route → CRM record → book. Response time chart and complete before/after for lead response.", readTime: "10 min read", href: "/workflows/lead-intake" },
  { emoji: "📅", title: "How to Automate Appointment Booking & Reduce No-Shows", desc: "Dual-reminder system (48hr + 2hr SMS), waitlist auto-fill, and no-show impact calculations.", readTime: "9 min read", href: "/workflows/appointment-booking" },
  { emoji: "🤝", title: "How to Automate Client Onboarding Using Your Current Tools", desc: "Manual vs automated timeline comparison. Works with existing CRM, forms, and calendar.", readTime: "10 min read", href: "/workflows/client-onboarding" },
  { emoji: "📋", title: "How to Automate Document Collection and Stop Chasing Clients", desc: "Dynamic checklists, 48-hour auto-reminders, secure upload portal, completion notifications.", readTime: "9 min read", href: "/workflows/document-collection" },
];

const guides = [
  {
    category: "Getting Started",
    title: "What Is AI Automation for Small Business?",
    description: "A plain-language explanation of what AI automation actually means in a small business context, how it differs from software subscriptions, and what it can realistically do for your operations.",
    readTime: "8 min read",
    color: "#283891",
    href: "/resources/what-is-ai-automation",
  },
  {
    category: "Framework",
    title: "The Operational Friction Map",
    description: "A structured framework for identifying the highest-impact automation opportunities in your business. Covers workflow mapping, friction scoring, and prioritization methodology.",
    readTime: "12 min read",
    color: "#7E0F4A",
    href: "/resources/operational-friction-map",
  },
  {
    category: "Implementation",
    title: "How to Automate Client Intake Without Switching Software",
    description: "A step-by-step guide to building an automated client intake system using tools your business already has. Covers form design, CRM integration, and follow-up sequences.",
    readTime: "15 min read",
    color: "#283891",
    href: "/resources/automate-client-intake",
  },
  {
    category: "ROI",
    title: "How to Calculate the ROI of Business Automation",
    description: "The Automation ROI Stack: a framework for calculating the real financial and operational value of automation investments. Includes benchmarks from GTA businesses.",
    readTime: "10 min read",
    color: "#7E0F4A",
    href: "/resources/automation-roi",
  },
  {
    category: "Industry Guide",
    title: "Automation for Professional Services Firms: A Practical Guide",
    description: "A comprehensive guide to automation for law firms, accounting firms, and immigration consultants. Covers the specific workflows that benefit most from automation in each sector.",
    readTime: "20 min read",
    color: "#283891",
    href: "/resources/professional-services-guide",
  },
  {
    category: "Strategy",
    title: "The Integration Priority Matrix",
    description: "How to decide which systems to connect first when building an automation stack. Covers the relationship between tool maturity, data quality, and automation potential.",
    readTime: "9 min read",
    color: "#7E0F4A",
    href: "/resources/integration-priority-matrix",
  },
];

const frameworks = [
  {
    title: "Operational Friction Map",
    description: "A structured tool for mapping your business workflows and identifying where time is being lost to manual coordination.",
    steps: ["Map all client-facing workflows", "Identify manual handoff points", "Score each by time cost and frequency", "Prioritize by automation potential"],
    color: "#283891",
  },
  {
    title: "Automation ROI Stack",
    description: "A calculation framework for estimating the financial return on automation investments based on time saved, error reduction, and revenue impact.",
    steps: ["Calculate current manual time cost", "Estimate error and rework costs", "Project revenue impact of faster response", "Calculate break-even timeline"],
    color: "#7E0F4A",
  },
  {
    title: "Integration Priority Matrix",
    description: "A decision framework for determining which system integrations to build first based on data flow volume and operational impact.",
    steps: ["Map all software tools in use", "Identify highest-volume data flows", "Score integration complexity vs. impact", "Build integration roadmap"],
    color: "#283891",
  },
];

const faqs = [
  {
    q: "How long does it take to build an automation system?",
    a: "Most automation systems are built and deployed within 2 to 4 weeks. The timeline depends on the complexity of the workflows, the number of tools being integrated, and the availability of your team for the audit and review sessions.",
  },
  {
    q: "Do I need to change the software I am currently using?",
    a: "No. We build automation on top of your existing tools. Our goal is to make your current software work together more effectively, not to replace it.",
  },
  {
    q: "What happens if something breaks after deployment?",
    a: "Every automation system we build includes a 30-day monitoring period after deployment. We monitor for errors, edge cases, and unexpected behavior. After the monitoring period, we offer ongoing support packages.",
  },
  {
    q: "How much does it cost?",
    a: "Every engagement is fixed-price. After the free Automation Audit, we provide a written proposal with a clear scope, timeline, and price. Most small business automation systems range from $2,500 to $12,000 depending on complexity.",
  },
  {
    q: "Is my client data safe?",
    a: "We build all automation systems with Canadian data handling practices in mind, including PIPEDA compliance considerations. We document where data flows in every system we build.",
  },
];

export default function Resources() {
  const hero = useReveal(0.05);
  const guidesSection = useReveal();
  const pillarSection = useReveal();
  const decisionSection = useReveal();
  const workflowSection = useReveal();
  const frameworksSection = useReveal();
  const faqSection = useReveal();
  const cta = useReveal(0.2);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden" style={{ backgroundColor: colors.surfaceLight }}>
        <div className="absolute inset-0 dot-grid-bg opacity-50 pointer-events-none" />
        <div className="container relative z-10">
          <div
            ref={hero.ref}
            style={{
              opacity: hero.visible ? 1 : 0,
              transform: hero.visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <div className="section-divider mb-4">
              <span className="section-label">Resource Hub</span>
            </div>
            <div className="max-w-3xl">
              <h1 className="text-4xl lg:text-5xl font-extrabold mb-6" style={{ color: "#111827" }}>
                Practical Resources for<br />Business Owners
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Guides, frameworks, and workflow examples built for operators, not technology enthusiasts. Every resource is written from an operational perspective.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="py-20" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <div
            ref={guidesSection.ref}
            style={{
              opacity: guidesSection.visible ? 1 : 0,
              transform: guidesSection.visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <div className="section-divider mb-4">
              <span className="section-label">Automation Guides</span>
            </div>
            <div className="grid lg:grid-cols-2 gap-4 items-end mb-10">
              <h2 className="text-3xl font-extrabold" style={{ color: "#111827" }}>
                Guides and Articles
              </h2>
              <p className="text-gray-500 leading-relaxed">
                Each resource is written for operators, not technologists. No jargon. No vendor pitches.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {guides.map((guide, i) => (
              <Link
                key={guide.title}
                href={guide.href}
                className="group bg-white rounded-2xl p-6 border hover:shadow-md transition-all flex flex-col"
                style={{
                  borderColor: "rgba(40,56,145,0.08)",
                  opacity: guidesSection.visible ? 1 : 0,
                  transform: guidesSection.visible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.4s ease ${i * 0.07}s, transform 0.4s ease ${i * 0.07}s, box-shadow 0.2s ease`,
                  textDecoration: "none",
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: `${guide.color}12`, color: guide.color }}
                  >
                    {guide.category}
                  </span>
                  <span className="text-xs text-gray-400">{guide.readTime}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 leading-snug group-hover:text-[#283891] transition-colors text-sm flex-1">
                  {guide.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">{guide.description}</p>
                <Link
                  href={guide.href}
                  className="flex items-center gap-1.5 text-xs font-semibold mt-auto"
                  style={{ color: guide.color }}
                >
                  Read guide
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pillar Guides */}
      <section className="py-20" style={{ backgroundColor: colors.surfaceLight }}>
        <div className="container">
          <div
            ref={pillarSection.ref}
            style={{ opacity: pillarSection.visible ? 1 : 0, transform: pillarSection.visible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
          >
            <div className="section-divider mb-4"><span className="section-label">Pillar Guides</span></div>
            <div className="grid lg:grid-cols-2 gap-4 items-end mb-10">
              <h2 className="text-3xl font-extrabold" style={{ color: "#111827" }}>Foundation Guides</h2>
              <p className="text-gray-500 leading-relaxed">Comprehensive guides to AI adoption, workflow automation, and governance for small businesses.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pillarGuides.map((g, i) => (
              <Link key={g.href} href={g.href} className="group bg-white rounded-2xl p-6 border hover:shadow-md transition-all flex flex-col" style={{ borderColor: "rgba(40,56,145,0.08)", textDecoration: "none", opacity: pillarSection.visible ? 1 : 0, transform: pillarSection.visible ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.4s ease ${i * 0.07}s, transform 0.4s ease ${i * 0.07}s, box-shadow 0.2s ease` }}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: `${g.color}12`, color: g.color }}>{g.category}</span>
                  <span className="text-xs text-gray-400">{g.readTime}</span>
                </div>
                <div className="text-2xl mb-3">{g.emoji}</div>
                <h3 className="font-bold text-gray-900 mb-2 leading-snug group-hover:text-[#283891] transition-colors text-sm flex-1">{g.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">{g.desc}</p>
                <span className="flex items-center gap-1.5 text-xs font-semibold mt-auto" style={{ color: g.color }}>
                  Read guide <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Decision Guides */}
      <section className="py-20" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <div
            ref={decisionSection.ref}
            style={{ opacity: decisionSection.visible ? 1 : 0, transform: decisionSection.visible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
          >
            <div className="section-divider mb-4"><span className="section-label">Insights</span></div>
            <div className="grid lg:grid-cols-2 gap-4 items-end mb-10">
              <h2 className="text-3xl font-extrabold" style={{ color: "#111827" }}>Decision Guides</h2>
              <p className="text-gray-500 leading-relaxed">Five pages to help you decide what to automate, when to automate, and when not to.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {decisionGuides.map((g, i) => (
              <Link key={g.href} href={g.href} className="group bg-white rounded-2xl p-6 border hover:shadow-md transition-all flex flex-col" style={{ borderColor: "rgba(40,56,145,0.08)", textDecoration: "none", opacity: decisionSection.visible ? 1 : 0, transform: decisionSection.visible ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.4s ease ${i * 0.07}s, transform 0.4s ease ${i * 0.07}s, box-shadow 0.2s ease` }}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: `${g.color}12`, color: g.color }}>{g.category}</span>
                  <span className="text-xs text-gray-400">{g.readTime}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 leading-snug group-hover:text-[#283891] transition-colors text-sm flex-1">{g.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">{g.desc}</p>
                <span className="flex items-center gap-1.5 text-xs font-semibold mt-auto" style={{ color: g.color }}>
                  Read guide <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Deep Dives */}
      <section className="py-20" style={{ backgroundColor: colors.surfaceLight }}>
        <div className="container">
          <div
            ref={workflowSection.ref}
            style={{ opacity: workflowSection.visible ? 1 : 0, transform: workflowSection.visible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
          >
            <div className="section-divider mb-4"><span className="section-label">Workflow Guides</span></div>
            <div className="grid lg:grid-cols-2 gap-4 items-end mb-10">
              <h2 className="text-3xl font-extrabold" style={{ color: "#111827" }}>Workflow Deep Dives</h2>
              <p className="text-gray-500 leading-relaxed">Step-by-step operational guides for the four highest-impact workflows in any service business.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {workflowGuides.map((g, i) => (
              <Link key={g.href} href={g.href} className="group bg-white rounded-2xl p-6 border hover:shadow-md transition-all flex flex-col" style={{ borderColor: "rgba(40,56,145,0.08)", borderTopWidth: "3px", borderTopColor: "#283891", textDecoration: "none", opacity: workflowSection.visible ? 1 : 0, transform: workflowSection.visible ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.4s ease ${i * 0.08}s, transform 0.4s ease ${i * 0.08}s, box-shadow 0.2s ease` }}>
                <div className="text-3xl mb-4">{g.emoji}</div>
                <h3 className="font-bold text-gray-900 mb-2 leading-snug group-hover:text-[#283891] transition-colors text-sm flex-1">{g.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">{g.desc}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs text-gray-400">{g.readTime}</span>
                  <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: "#283891" }}>
                    Read <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Frameworks */}
      <section className="py-20" style={{ backgroundColor: colors.surfaceLight }}>
        <div className="container">
          <div
            ref={frameworksSection.ref}
            style={{
              opacity: frameworksSection.visible ? 1 : 0,
              transform: frameworksSection.visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <div className="section-divider mb-4">
              <span className="section-label">Decision Frameworks</span>
            </div>
            <h2 className="text-3xl font-extrabold mb-10" style={{ color: "#111827" }}>
              Frameworks for Automation Decisions
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {frameworks.map((fw, i) => (
              <div
                key={fw.title}
                className="bg-white rounded-2xl p-6 border"
                style={{
                  borderColor: "rgba(40,56,145,0.08)",
                  opacity: frameworksSection.visible ? 1 : 0,
                  transform: frameworksSection.visible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.4s ease ${i * 0.1}s, transform 0.4s ease ${i * 0.1}s`,
                }}
              >
                <h3 className="font-bold text-gray-900 mb-2">{fw.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">{fw.description}</p>
                <div className="space-y-2.5">
                  {fw.steps.map((step, si) => (
                    <div key={step} className="flex items-start gap-3">
                      <span
                        className="text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-white mt-0.5"
                        style={{ backgroundColor: fw.color }}
                      >
                        {si + 1}
                      </span>
                      <span className="text-xs text-gray-600 leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <div
            ref={faqSection.ref}
            style={{
              opacity: faqSection.visible ? 1 : 0,
              transform: faqSection.visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <div className="section-divider mb-4">
              <span className="section-label">Common Questions</span>
            </div>
            <div className="grid lg:grid-cols-2 gap-4 items-end mb-10">
              <h2 className="text-3xl font-extrabold" style={{ color: "#111827" }}>
                Frequently Asked<br />Questions
              </h2>
              <p className="text-gray-500 leading-relaxed">
                Answers to the questions we hear most often from business owners considering automation.
              </p>
            </div>
          </div>

          <div className="max-w-3xl space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-[#F7F8FB] rounded-2xl overflow-hidden border"
                style={{
                  borderColor: "rgba(40,56,145,0.08)",
                  opacity: faqSection.visible ? 1 : 0,
                  transform: faqSection.visible ? "translateY(0)" : "translateY(16px)",
                  transition: `opacity 0.4s ease ${i * 0.08}s, transform 0.4s ease ${i * 0.08}s`,
                }}
              >
                <button
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-gray-900 text-sm">{faq.q}</span>
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform"
                    style={{
                      backgroundColor: "rgba(40,56,145,0.08)",
                      transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 2v8M2 6h8" stroke="#283891" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, #283891 0%, #1e2d7a 50%, #7E0F4A 100%)" }}
      >
        <div
          ref={cta.ref}
          className="container text-center"
          style={{
            opacity: cta.visible ? 1 : 0,
            transform: cta.visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <h2 className="text-3xl font-extrabold text-white mb-4">Want a Personalized Automation Assessment?</h2>
          <p className="text-blue-200 mb-8 max-w-xl mx-auto">
            Book a free 60-minute Automation Audit. We apply these frameworks directly to your business and give you a prioritized action plan.
          </p>
          <Link href="/contact" className="btn-accent">
            Book Free Automation Audit
          </Link>
        </div>
      </section>
    </div>
  );
}
