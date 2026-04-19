/**
 * FAQ.tsx — Barrana.ai Frequently Asked Questions
 * Design: Operational Intelligence — Deep Navy / Barrana Blue / Electric Teal
 */
import { useState } from "react";
import { Link } from "wouter";
import { colors } from "@/styles/design-tokens";

const faqCategories = [
  {
    category: "About Barrana.ai",
    faqs: [
      { q: "What does Barrana.ai do?", a: "Barrana.ai builds AI automation systems for service businesses in Toronto and the GTA. We design, build, and deploy automation that handles lead response, client intake, document collection, appointment scheduling, invoicing, and operational reporting — so business owners and their teams can focus on client work instead of coordination." },
      { q: "Who do you work with?", a: "We work with service businesses in the Toronto and GTA area with 2 to 50 staff. Our clients are typically professional service firms — immigration consultants, accounting firms, law firms, contractors, physiotherapy clinics, and real estate teams — who rely on client relationships and are losing time to manual coordination." },
      { q: "Where are you based?", a: "We are based in Vaughan, Ontario, and serve businesses across the Greater Toronto Area including Toronto, Markham, Richmond Hill, Mississauga, and North York." },
    ],
  },
  {
    category: "Services and Process",
    faqs: [
      { q: "What is the Barrana Automation Method?", a: "The Barrana Automation Method is our five-stage implementation process: Discovery (mapping your workflows and identifying friction points), Design (building the automation architecture), Build (configuring and testing the automation), Deploy (going live with monitoring), and Optimize (refining based on real operational data). Every engagement follows this process." },
      { q: "How long does a typical engagement take?", a: "Most initial automation implementations take 4 to 8 weeks from discovery to deployment, depending on complexity. Simple single-workflow automations can be live in 2 to 3 weeks. Multi-workflow systems with integrations across multiple tools typically take 6 to 10 weeks." },
      { q: "What tools do you work with?", a: "We work with the tools your business already uses. Common platforms include Make (Integromat), Zapier, n8n, HubSpot, Salesforce, QuickBooks, Jobber, Calendly, Jotform, Google Workspace, Microsoft 365, Twilio, and most CRM and project management tools. We do not require you to switch platforms." },
      { q: "Do you replace our existing software?", a: "No. We integrate with the tools you already use. We build automation layers that connect your existing tools together, not replace them. If a new tool is required for a specific function, we discuss it openly before recommending it." },
    ],
  },
  {
    category: "Pricing and Contracts",
    faqs: [
      { q: "What does fixed-price mean?", a: "Every engagement is scoped and priced before work begins. You know exactly what you are getting and what it costs. There are no hourly billing surprises. If scope changes, we discuss it openly before proceeding. Fixed-price engagements protect you from cost overruns and ensure we are accountable for delivery." },
      { q: "How much does AI automation cost?", a: "Pricing depends on the scope of the automation system. Single-workflow automations typically start in the range of a few thousand dollars. Multi-workflow systems with complex integrations are priced based on the discovery findings. We provide a detailed proposal after the free Automation Audit." },
      { q: "Is there ongoing cost after the system is built?", a: "The tools we use (Make, Zapier, etc.) have monthly subscription costs that you pay directly to those platforms. These are typically $20 to $200 per month depending on usage volume. We do not mark up platform costs. Ongoing maintenance and optimization services are available as an optional add-on." },
    ],
  },
  {
    category: "Results and ROI",
    faqs: [
      { q: "How long does it take to see results?", a: "Most clients see measurable operational improvements within 30 days of deployment. Our methodology is designed to prioritize the highest-impact, lowest-friction automations first, so you get ROI quickly before we build out the full system." },
      { q: "What results can I expect?", a: "Typical results include: lead response time dropping from 4 to 8 hours to under 90 seconds, client intake time reduced by 70 to 90 percent, document collection time cut from 2 to 3 weeks to under 10 days, staff admin hours reduced by 10 to 20 hours per week, and appointment no-show rates reduced by 25 to 40 percent. Results vary based on your starting point and the automations implemented." },
      { q: "What is the typical ROI recovery window?", a: "Most single-workflow automations pay for themselves within 30 to 60 days. Multi-workflow implementations typically recover their investment within 60 to 90 days. We calculate projected ROI during the discovery phase based on your specific workflows and team costs." },
    ],
  },
  {
    category: "Privacy and Compliance",
    faqs: [
      { q: "Is this PIPEDA compliant?", a: "Yes. We build all systems with Canadian privacy law in mind. We document data flows, ensure personal information is handled according to PIPEDA principles, and build escalation logic so automated systems never make substantive professional decisions without human oversight." },
      { q: "Where does client data go?", a: "We build automation that connects the tools you own and control. We do not route client data through Barrana-owned systems. Every data flow is documented. Client data stays within the platforms you already use and trust." },
      { q: "Do you retain access to our systems after the project?", a: "No. We configure minimum-required access during the build phase and do not retain access to your systems after project completion unless you engage us for ongoing maintenance. All credentials and API keys are transferred to you at project completion." },
    ],
  },
];

export default function FAQ() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="hero-light pt-24 pb-16">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-sep">/</span>
            <span>FAQ</span>
          </div>
          <div className="hero-headline max-w-3xl">
            <div className="eyebrow">Frequently Asked Questions</div>
            <h1 className="font-extrabold mb-4" style={{ color: "#1F2937" }}>
              Questions We Hear From Every Client
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: "#6B7280" }}>
              Answers to the most common questions about AI automation for service businesses, our process, pricing, and results. If your question is not here, book a free audit and we will answer it directly.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-12">
            {faqCategories.map((cat) => (
              <div key={cat.category}>
                <h2 className="text-xl font-bold mb-6 pb-3 border-b" style={{ color: colors.navy, borderColor: colors.border }}>
                  {cat.category}
                </h2>
                <div className="space-y-3">
                  {cat.faqs.map((item, i) => {
                    const key = `${cat.category}-${i}`;
                    return (
                      <div key={key} className="faq-item">
                        <button
                          className="faq-trigger"
                          onClick={() => setOpenItem(openItem === key ? null : key)}
                        >
                          <span>{item.q}</span>
                          <svg
                            width="16" height="16" viewBox="0 0 16 16" fill="none"
                            className="flex-shrink-0 transition-transform duration-200"
                            style={{ transform: openItem === key ? "rotate(180deg)" : "rotate(0deg)" }}
                          >
                            <path d="M3 6l5 5 5-5" stroke="#283891" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                        {openItem === key && (
                          <div className="faq-content">
                            <p>{item.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center p-10 rounded-2xl" style={{ background: "linear-gradient(135deg, #1E2B6E, #283891)" }}>
            <h3 className="text-2xl font-bold text-white mb-3">Still Have Questions?</h3>
            <p className="mb-6" style={{ color: "rgba(255,255,255,0.7)" }}>Book a free 60-minute Automation Audit and we will answer every question specific to your business.</p>
            <Link href="/contact" className="btn-primary">Book Free Audit</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
