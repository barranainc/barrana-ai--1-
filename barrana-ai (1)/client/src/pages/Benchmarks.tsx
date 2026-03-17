import { Link } from "wouter";
const benchmarks = [
  { metric: "Lead Response Time", manual: "4–8 hours", automated: "Under 90 seconds", improvement: "99% faster", note: "Time from form submission to first automated acknowledgment" },
  { metric: "Client Intake Time", manual: "45–60 minutes per client", automated: "Under 5 minutes", improvement: "87–92% reduction", note: "Staff time spent per new client from inquiry to onboarded" },
  { metric: "Document Collection Cycle", manual: "2–4 weeks", automated: "7–10 days", improvement: "50–65% faster", note: "Time from document request to complete document set received" },
  { metric: "Appointment No-Show Rate", manual: "15–25%", automated: "8–12%", improvement: "30–45% reduction", note: "Percentage of booked appointments where client does not attend" },
  { metric: "Invoice Delivery Time", manual: "3–14 days post-completion", automated: "Same day", improvement: "Immediate", note: "Time from service completion to invoice delivery" },
  { metric: "Quote Follow-Up Rate", manual: "40–60% of quotes followed up", automated: "100% of quotes followed up", improvement: "100% coverage", note: "Percentage of sent quotes that receive at least one follow-up" },
  { metric: "After-Hours Lead Capture", manual: "0–20%", automated: "100%", improvement: "Complete coverage", note: "Percentage of after-hours inquiries that receive same-session response" },
  { metric: "Staff Admin Hours Per Week", manual: "10–20 hours", automated: "2–4 hours", improvement: "75–85% reduction", note: "Hours spent on coordination, data entry, and manual follow-up" },
];
export default function Benchmarks() {
  return (
    <div className="min-h-screen bg-white">
      <section className="hero-light pt-24 pb-16">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link><span className="breadcrumb-sep">/</span><span>Benchmarks</span></div>
          <div className="max-w-3xl">
            <div className="eyebrow">Automation Benchmarks</div>
            <h1 className="font-extrabold mb-4" style={{ color: "#1F2937" }}>Operational Benchmarks: Manual vs. Automated</h1>
            <p className="text-lg leading-relaxed" style={{ color: "#6B7280" }}>Typical operational metrics for GTA service businesses before and after automation implementation. These benchmarks are based on representative results from businesses with 2 to 50 staff in professional services.</p>
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container">
          <div className="aeo-block max-w-3xl mb-10">
            <div className="aeo-label"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>Important Note</div>
            <p>These benchmarks represent typical results across multiple implementations. Individual results vary based on starting conditions, business type, and the specific workflows automated. We calculate projected ROI for your specific business during the discovery phase.</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: "rgba(26,82,118,0.1)" }}>
            <table className="w-full text-sm">
              <thead><tr style={{ backgroundColor: "#0A1628" }}><th className="text-left p-4 font-semibold text-white">Metric</th><th className="text-left p-4 font-semibold text-white">Manual</th><th className="text-left p-4 font-semibold text-white">Automated</th><th className="text-left p-4 font-semibold text-white">Improvement</th></tr></thead>
              <tbody>{benchmarks.map((b, i) => (<tr key={b.metric} style={{ backgroundColor: i % 2 === 0 ? "white" : "#F7F9FC" }}><td className="p-4"><div className="font-semibold" style={{ color: "#1F2937" }}>{b.metric}</div><div className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>{b.note}</div></td><td className="p-4" style={{ color: "#DC2626" }}>{b.manual}</td><td className="p-4" style={{ color: "#059669" }}>{b.automated}</td><td className="p-4 font-bold" style={{ color: "#1A5276" }}>{b.improvement}</td></tr>))}</tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="cta-section py-20"><div className="container text-center"><h2 className="text-3xl font-extrabold text-white mb-4">What Are Your Benchmarks?</h2><p className="mb-8 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.65)" }}>Book a free Automation Audit and we will calculate projected ROI for your specific workflows and team size.</p><Link href="/contact" className="btn-primary">Book Free Audit</Link></div></section>
    </div>
  );
}
