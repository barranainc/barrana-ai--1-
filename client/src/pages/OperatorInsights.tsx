import { Link } from "wouter";
const insights = [
  { slug: "immigration-consultant-automation", title: "Automation for Immigration Consultants: What Works and What Does Not", description: "A practical assessment of automation for immigration consulting firms. Covers intake, document collection, deadline management, and the compliance considerations specific to immigration practice.", tag: "Immigration", readTime: "9 min read" },
  { slug: "accounting-firm-automation", title: "Automation for Accounting Firms: The Document Chase Problem", description: "How accounting firms eliminate the document chasing cycle that consumes staff time every tax season. Covers document collection automation, engagement letter delivery, and client communication sequences.", tag: "Accounting", readTime: "8 min read" },
  { slug: "contractor-lead-automation", title: "Lead Automation for Contractors: Why Response Time Is Everything", description: "Why contractors lose more leads to slow response time than to price. How lead automation changes the competitive dynamic for residential and commercial contractors in the GTA.", tag: "Contractors", readTime: "7 min read" },
  { slug: "physiotherapy-no-show-reduction", title: "No-Show Reduction for Physiotherapy Clinics: A Systems Approach", description: "How physiotherapy clinics reduce no-show rates by 30 to 45 percent using automated reminder sequences. Covers the reminder cadence, confirmation requests, and rebooking automation.", tag: "Healthcare", readTime: "6 min read" },
  { slug: "law-firm-intake-automation", title: "Client Intake Automation for Law Firms: Compliance and Efficiency", description: "How law firms automate client intake without compromising conflict checks, engagement letter requirements, or professional responsibility obligations.", tag: "Legal", readTime: "10 min read" },
];
export default function OperatorInsights() {
  return (
    <div className="min-h-screen bg-white">
      <section className="hero-light pt-24 pb-16">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link><span className="breadcrumb-sep">/</span><span>Operator Insights</span></div>
          <div className="max-w-3xl">
            <div className="eyebrow">Operator Insights</div>
            <h1 className="font-extrabold mb-4" style={{ color: "#1F2937" }}>Automation Insights for GTA Business Operators</h1>
            <p className="text-lg leading-relaxed" style={{ color: "#6B7280" }}>Industry-specific automation insights for business owners and operators in Toronto and the GTA. Written from operational experience, not theory.</p>
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container">
          <div className="space-y-4">
            {insights.map((ins) => (
              <Link key={ins.slug} href={`/operator-insights/${ins.slug}`} className="flex items-start gap-6 p-6 bg-white rounded-2xl border hover:shadow-sm transition-all group" style={{ borderColor: "rgba(26,82,118,0.08)", textDecoration: "none" }}>
                <div className="flex-1">
                  <div className="tag-blue mb-3">{ins.tag}</div>
                  <h2 className="text-base font-bold mb-2" style={{ color: "#1F2937" }}>{ins.title}</h2>
                  <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>{ins.description}</p>
                  <span className="text-xs mt-3 inline-block" style={{ color: "#9CA3AF" }}>{ins.readTime}</span>
                </div>
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-1 opacity-30 group-hover:opacity-70 transition-opacity"><path d="M3 8h10M9 4l4 4-4 4" stroke="#1A5276" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
