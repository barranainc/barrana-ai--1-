/**
 * About.tsx — Barrana.ai About Page
 * Design: Premium Systems Consultancy
 * Asymmetric layouts, scroll reveal, narrative-first
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

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

export default function About() {
  const hero = useReveal(0.05);
  const story = useReveal();
  const principles = useReveal();
  const different = useReveal();
  const cta = useReveal(0.2);

  const coreValues = [
    {
      number: "01",
      title: "Systems Over Software",
      body: "We do not sell tools. We build systems. The difference is that a tool does one thing. A system coordinates many things. We are always thinking about how the pieces fit together, not just whether each piece works.",
      color: "#283891",
    },
    {
      number: "02",
      title: "Operators First",
      body: "We build for the people who run the business, not the people who fund it. Our clients are owners and operators who need their systems to work reliably, not impress investors.",
      color: "#7E0F4A",
    },
    {
      number: "03",
      title: "Fixed Price, Clear Scope",
      body: "Every engagement is scoped and priced before work begins. You know exactly what you are getting and what it costs. We do not bill by the hour because hourly billing creates the wrong incentives.",
      color: "#283891",
    },
    {
      number: "04",
      title: "Privacy by Design",
      body: "We build all systems with Canadian privacy law in mind. Client data stays within Canadian-compliant infrastructure. We document data flows and ensure your automation systems meet PIPEDA requirements.",
      color: "#7E0F4A",
    },
  ];

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
              <span className="section-label">About Barrana.ai</span>
            </div>
            <div className="max-w-3xl">
              <h1 className="text-4xl lg:text-5xl font-extrabold mb-6" style={{ color: "#111827" }}>
                Built for Operators,<br />Not Just Optimists
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Barrana.ai is a Toronto-based AI automation consultancy that builds working operational systems for small and medium businesses in the GTA. We have been building software systems for over a decade. We started Barrana.ai because we kept seeing the same problem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <div
            ref={story.ref}
            className="grid lg:grid-cols-2 gap-16 items-start"
            style={{
              opacity: story.visible ? 1 : 0,
              transform: story.visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <div>
              <div className="section-divider mb-4">
                <span className="section-label">Our Story</span>
              </div>
              <h2 className="text-3xl font-extrabold mb-6" style={{ color: "#111827" }}>
                Why We Built This
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  We have spent over a decade building software systems for businesses across industries. We have built CRMs, client portals, scheduling systems, document management platforms, and custom integrations for companies ranging from solo operators to mid-market firms.
                </p>
                <p>
                  In that time, we kept seeing the same pattern: small business owners were being sold AI tools with no plan for how those tools would actually fit into their day-to-day operations. They would buy a chatbot, a CRM, an AI writing tool — and none of it would connect. None of it would reduce the actual work their team was doing.
                </p>
                <p>
                  Barrana.ai was created to solve that problem. We are not a software vendor. We are a systems integrator. We take the tools businesses already use and build automation layers that make them work together.
                </p>
                <p>
                  Our focus is on the Toronto and GTA market because we know it. We understand the regulatory environment, the business culture, and the specific operational challenges that small professional service firms face here.
                </p>
              </div>
            </div>

            <div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { value: "10+", label: "Years of software delivery experience" },
                  { value: "6", label: "GTA cities served" },
                  { value: "Fixed", label: "Price engagements — always" },
                  { value: "PIPEDA", label: "Compliant by design" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-5 rounded-2xl border"
                    style={{ borderColor: "rgba(40,56,145,0.08)", backgroundColor: "#F7F8FB" }}
                  >
                    <div className="text-2xl font-extrabold mb-1" style={{ color: "#283891" }}>{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl p-6" style={{ backgroundColor: "#283891" }}>
                <h3 className="font-bold text-white mb-3">Who We Work With</h3>
                <p className="text-blue-200 text-sm leading-relaxed mb-4">
                  Small and medium businesses in the Toronto and GTA area with 2 to 50 staff. Our clients are typically professional service firms who rely on client relationships and are losing time to manual coordination.
                </p>
                <div className="space-y-2">
                  {["Immigration consultants", "Accounting firms", "Law firms", "Contractors", "Clinics", "Real estate teams"].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-blue-300 flex-shrink-0" />
                      <span className="text-blue-100 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "#F2F4F8" }}>
        <div className="container">
          <div
            ref={principles.ref}
            style={{
              opacity: principles.visible ? 1 : 0,
              transform: principles.visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <div className="section-divider mb-4">
              <span className="section-label">How We Operate</span>
            </div>
            <div className="grid lg:grid-cols-2 gap-4 items-end mb-12">
              <h2 className="text-3xl font-extrabold" style={{ color: "#111827" }}>
                The Principles Behind<br />Every Engagement
              </h2>
              <p className="text-gray-500 leading-relaxed">
                These are not marketing statements. They are the operating principles that guide every decision we make.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {coreValues.map((value, i) => (
              <div
                key={value.number}
                className="bg-white rounded-2xl p-7 border"
                style={{
                  borderColor: "rgba(40,56,145,0.08)",
                  opacity: principles.visible ? 1 : 0,
                  transform: principles.visible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
                }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl font-extrabold flex-shrink-0" style={{ color: value.color, opacity: 0.15 }}>{value.number}</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{value.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <div
            ref={different.ref}
            className="grid lg:grid-cols-2 gap-16 items-center"
            style={{
              opacity: different.visible ? 1 : 0,
              transform: different.visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <div>
              <div className="section-divider mb-4">
                <span className="section-label">What Makes Us Different</span>
              </div>
              <h2 className="text-3xl font-extrabold mb-6" style={{ color: "#111827" }}>
                We Are Not a Software Vendor.<br />We Are a Systems Integrator.
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Most AI automation companies sell you a platform and leave you to figure out how to use it. We do the opposite: we start with your workflows, design the system around them, and build it to work reliably from day one.
                </p>
                <p>
                  We do not have a preferred tool stack. We use whatever combination of platforms — Make, Zapier, n8n, custom APIs, AI models — that best fits your existing infrastructure and operational requirements.
                </p>
                <p>
                  Every engagement ends with documentation, training, and a monitoring period. You understand exactly what is running, why it is running, and what to do if something needs to change.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { label: "We start with your workflows, not our tools", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
                { label: "Fixed-price means no billing surprises", icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" },
                { label: "We integrate with what you already use", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
                { label: "Full documentation and team training included", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
                { label: "PIPEDA-aware by design, not as an afterthought", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
                { label: "Monitoring and optimization after deployment", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#F7F8FB] border border-transparent hover:border-blue-100 transition-colors"
                  style={{
                    opacity: different.visible ? 1 : 0,
                    transform: different.visible ? "translateX(0)" : "translateX(16px)",
                    transition: `opacity 0.4s ease ${i * 0.08}s, transform 0.4s ease ${i * 0.08}s`,
                  }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(40,56,145,0.08)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#283891" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d={item.icon} />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-800">{item.label}</span>
                </div>
              ))}
            </div>
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
          <h2 className="text-3xl font-extrabold text-white mb-4">Let's Map Your Workflows</h2>
          <p className="text-blue-200 mb-8 max-w-xl mx-auto">
            Book a free 60-minute Automation Audit. We map your workflows, identify your highest-impact automation opportunities, and give you a clear picture of what is possible.
          </p>
          <Link href="/contact" className="btn-accent">
            Book Free Automation Audit
          </Link>
        </div>
      </section>
    </div>
  );
}
