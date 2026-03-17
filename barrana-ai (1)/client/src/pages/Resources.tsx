/**
 * Resources.tsx — Barrana.ai Resources / Knowledge Hub
 * Design: Premium Systems Consultancy
 * Editorial layout, scroll reveal, clean typography
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";

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

const guides = [
  {
    category: "Getting Started",
    title: "What Is AI Automation for Small Business?",
    description: "A plain-language explanation of what AI automation actually means in a small business context, how it differs from software subscriptions, and what it can realistically do for your operations.",
    readTime: "8 min read",
    color: "#283891",
  },
  {
    category: "Framework",
    title: "The Operational Friction Map",
    description: "A structured framework for identifying the highest-impact automation opportunities in your business. Covers workflow mapping, friction scoring, and prioritization methodology.",
    readTime: "12 min read",
    color: "#7E0F4A",
  },
  {
    category: "Implementation",
    title: "How to Automate Client Intake Without Switching Software",
    description: "A step-by-step guide to building an automated client intake system using tools your business already has. Covers form design, CRM integration, and follow-up sequences.",
    readTime: "15 min read",
    color: "#283891",
  },
  {
    category: "ROI",
    title: "How to Calculate the ROI of Business Automation",
    description: "The Automation ROI Stack: a framework for calculating the real financial and operational value of automation investments. Includes benchmarks from GTA businesses.",
    readTime: "10 min read",
    color: "#7E0F4A",
  },
  {
    category: "Industry Guide",
    title: "Automation for Professional Services Firms: A Practical Guide",
    description: "A comprehensive guide to automation for law firms, accounting firms, and immigration consultants. Covers the specific workflows that benefit most from automation in each sector.",
    readTime: "20 min read",
    color: "#283891",
  },
  {
    category: "Strategy",
    title: "The Integration Priority Matrix",
    description: "How to decide which systems to connect first when building an automation stack. Covers the relationship between tool maturity, data quality, and automation potential.",
    readTime: "9 min read",
    color: "#7E0F4A",
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
  const frameworksSection = useReveal();
  const faqSection = useReveal();
  const cta = useReveal(0.2);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden" style={{ backgroundColor: "#F7F8FB" }}>
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
              <div
                key={guide.title}
                className="group bg-white rounded-2xl p-6 border hover:shadow-md transition-all cursor-pointer flex flex-col"
                style={{
                  borderColor: "rgba(40,56,145,0.08)",
                  opacity: guidesSection.visible ? 1 : 0,
                  transform: guidesSection.visible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.4s ease ${i * 0.07}s, transform 0.4s ease ${i * 0.07}s, box-shadow 0.2s ease`,
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
                <button
                  className="flex items-center gap-1.5 text-xs font-semibold mt-auto"
                  style={{ color: guide.color }}
                  onClick={() => toast("Full guides coming soon — book an audit for personalized insights.")}
                >
                  Read guide
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frameworks */}
      <section className="py-20" style={{ backgroundColor: "#F2F4F8" }}>
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
