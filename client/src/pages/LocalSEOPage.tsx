import { Link, useParams } from "wouter";

const CITY_DATA: Record<string, { city: string; region: string; industries: string[]; intro: string }> = {
  "ai-automation-toronto": { city: "Toronto", region: "Toronto, ON", industries: ["Immigration Consultants", "Accounting Firms", "Law Firms", "Contractors", "Healthcare Clinics", "Real Estate Professionals"], intro: "Toronto's business community is one of the most competitive in Canada. Barrana.ai helps Toronto-based service businesses automate their operations so they can compete on service quality, not just price." },
  "ai-automation-vaughan": { city: "Vaughan", region: "Vaughan, ON", industries: ["Immigration Consultants", "Accounting Firms", "Contractors", "Healthcare Clinics", "Real Estate Professionals"], intro: "Vaughan is home to a large and growing business community, particularly in professional services and construction. Barrana.ai helps Vaughan businesses automate lead response, client intake, document collection, and scheduling." },
  "ai-automation-markham": { city: "Markham", region: "Markham, ON", industries: ["Immigration Consultants", "Technology Companies", "Accounting Firms", "Healthcare Clinics", "Real Estate Professionals"], intro: "Markham's diverse business community includes a significant concentration of immigration consultants, technology companies, and professional service firms. Barrana.ai builds automation systems for Markham businesses that need to handle high client volumes efficiently." },
  "ai-automation-richmond-hill": { city: "Richmond Hill", region: "Richmond Hill, ON", industries: ["Immigration Consultants", "Accounting Firms", "Healthcare Clinics", "Contractors", "Real Estate Professionals"], intro: "Richmond Hill's professional service businesses serve a diverse and growing population. Barrana.ai helps Richmond Hill businesses automate client intake, document collection, and appointment scheduling." },
  "ai-automation-mississauga": { city: "Mississauga", region: "Mississauga, ON", industries: ["Immigration Consultants", "Accounting Firms", "Law Firms", "Contractors", "Healthcare Clinics"], intro: "Mississauga is one of the largest business centres in the GTA. Barrana.ai helps Mississauga service businesses automate the operational workflows that consume staff time so they can focus on client work." },
  "ai-automation-north-york": { city: "North York", region: "North York, Toronto, ON", industries: ["Immigration Consultants", "Accounting Firms", "Healthcare Clinics", "Real Estate Professionals", "Contractors"], intro: "North York's dense professional service corridor includes a high concentration of immigration consultants, accounting firms, and healthcare clinics. Barrana.ai builds automation systems for North York businesses that need to handle high inquiry volumes efficiently." },
  "ai-automation-brampton": { city: "Brampton", region: "Brampton, ON", industries: ["Immigration Consultants", "Accounting Firms", "Contractors", "Healthcare Clinics", "Real Estate Professionals"], intro: "Brampton's rapidly growing business community includes a significant concentration of immigration consultants and professional service firms. Barrana.ai helps Brampton businesses automate client intake and operational workflows." },
  "ai-automation-scarborough": { city: "Scarborough", region: "Scarborough, Toronto, ON", industries: ["Immigration Consultants", "Accounting Firms", "Healthcare Clinics", "Contractors", "Real Estate Professionals"], intro: "Scarborough's diverse business community serves one of the most multicultural populations in Canada. Barrana.ai helps Scarborough service businesses automate lead response, client intake, and document collection workflows." },
  "ai-automation-oakville": { city: "Oakville", region: "Oakville, ON", industries: ["Accounting Firms", "Law Firms", "Healthcare Clinics", "Contractors", "Real Estate Professionals"], intro: "Oakville's professional service businesses serve an affluent and demanding client base. Barrana.ai helps Oakville firms automate the operational workflows that affect client experience." },
  "ai-automation-etobicoke": { city: "Etobicoke", region: "Etobicoke, Toronto, ON", industries: ["Immigration Consultants", "Accounting Firms", "Contractors", "Healthcare Clinics", "Real Estate Professionals"], intro: "Etobicoke's business community spans professional services, construction, and healthcare. Barrana.ai helps Etobicoke businesses automate lead response, client intake, and scheduling workflows." },
};

const INDUSTRY_CITY_DATA: Record<string, { industry: string; city: string; intro: string; workflows: string[] }> = {
  "immigration-consultant-automation-toronto": { industry: "Immigration Consultant", city: "Toronto", intro: "Toronto is home to one of the largest concentrations of immigration consultants in Canada. Barrana.ai helps Toronto immigration consultants automate intake, document collection, and client communication.", workflows: ["Lead capture and qualification from website and referral sources", "Client intake form delivery and CRM record creation", "Visa-type-specific document checklist delivery", "Automated document reminders every 48 hours", "Appointment scheduling automation", "Status update notifications to clients at key milestones"] },
  "accounting-firm-automation-toronto": { industry: "Accounting Firm", city: "Toronto", intro: "Toronto accounting firms face intense competition and high client expectations. Barrana.ai helps Toronto accounting practices automate document collection, engagement letter delivery, and client communication sequences.", workflows: ["New engagement onboarding automation", "Engagement letter delivery and e-signature collection", "Document request and collection automation", "Payment reminder sequences", "Client re-engagement for annual services"] },
  "contractor-automation-toronto": { industry: "Contractor", city: "Toronto", intro: "Toronto contractors compete in one of the most active renovation and construction markets in Canada. Barrana.ai helps Toronto contractors automate lead capture, quote follow-up, and job scheduling.", workflows: ["Multi-channel lead capture and 90-second response", "Lead qualification and routing", "Quote follow-up sequence (5 touches over 14 days)", "Job scheduling and crew notification", "Invoice generation and payment reminders"] },
};

export default function LocalSEOPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "";
  const cityData = CITY_DATA[slug];
  const industryCityData = INDUSTRY_CITY_DATA[slug];

  if (cityData) {
    return (
      <div className="min-h-screen bg-white">
        <section className="hero-light pt-24 pb-16">
          <div className="container">
            <div className="breadcrumb"><Link href="/">Home</Link><span className="breadcrumb-sep">/</span><span>Locations</span><span className="breadcrumb-sep">/</span><span>{cityData.city}</span></div>
            <div className="max-w-3xl">
              <div className="eyebrow">AI Automation · {cityData.region}</div>
              <h1 className="font-extrabold mb-4" style={{ color: "#1F2937" }}>AI Automation for Service Business in {cityData.city}</h1>
              <p className="text-lg leading-relaxed" style={{ color: "#6B7280" }}>{cityData.intro}</p>
            </div>
          </div>
        </section>
        <section className="py-12">
          <div className="container">
            <div className="max-w-3xl">
              <div className="aeo-block mb-10">
                <div className="aeo-label"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>Who We Serve in {cityData.city}</div>
                <p>Barrana.ai serves service businesses in {cityData.city} with 2 to 50 staff who rely on client relationships and need to handle higher inquiry volumes without adding administrative staff.</p>
              </div>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#1F2937" }}>Industries We Serve in {cityData.city}</h2>
              <div className="grid md:grid-cols-2 gap-3 mb-10">
                {cityData.industries.map((ind) => (
                  <div key={ind} className="p-4 rounded-xl flex items-center gap-3" style={{ backgroundColor: "#F7F9FC", border: "1px solid rgba(26,82,118,0.08)" }}>
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: "#7E0F4A" }} />
                    <span className="text-sm font-medium" style={{ color: "#374151" }}>{ind}</span>
                  </div>
                ))}
              </div>
              <div className="p-8 rounded-2xl" style={{ background: "linear-gradient(135deg, #1E2B6E, #283891)" }}>
                <h3 className="text-xl font-bold text-white mb-3">Free Automation Audit for {cityData.city} Businesses</h3>
                <p className="mb-6" style={{ color: "rgba(255,255,255,0.7)" }}>Book a free 60-minute Automation Audit. We will map your current workflows and show you exactly what automation would look like for your business.</p>
                <Link href="/contact" className="btn-primary">Book Free Audit</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (industryCityData) {
    return (
      <div className="min-h-screen bg-white">
        <section className="hero-light pt-24 pb-16">
          <div className="container">
            <div className="breadcrumb"><Link href="/">Home</Link><span className="breadcrumb-sep">/</span><span>Locations</span><span className="breadcrumb-sep">/</span><span>{industryCityData.city}</span></div>
            <div className="max-w-3xl">
              <div className="eyebrow">{industryCityData.industry} Automation · {industryCityData.city}</div>
              <h1 className="font-extrabold mb-4" style={{ color: "#1F2937" }}>{industryCityData.industry} Automation in {industryCityData.city}</h1>
              <p className="text-lg leading-relaxed" style={{ color: "#6B7280" }}>{industryCityData.intro}</p>
            </div>
          </div>
        </section>
        <section className="py-12">
          <div className="container">
            <div className="max-w-3xl">
              <h2 className="text-xl font-bold mb-4" style={{ color: "#1F2937" }}>Key Workflows We Automate</h2>
              <div className="space-y-3 mb-10">
                {industryCityData.workflows.map((wf, i) => (
                  <div key={i} className="p-4 rounded-xl flex items-start gap-3" style={{ backgroundColor: "#F7F9FC", border: "1px solid rgba(26,82,118,0.08)" }}>
                    <span className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white" style={{ backgroundColor: "#283891" }}>{i + 1}</span>
                    <span className="text-sm" style={{ color: "#374151" }}>{wf}</span>
                  </div>
                ))}
              </div>
              <div className="p-8 rounded-2xl" style={{ background: "linear-gradient(135deg, #1E2B6E, #283891)" }}>
                <h3 className="text-xl font-bold text-white mb-3">Free Automation Audit for {industryCityData.city} {industryCityData.industry}s</h3>
                <p className="mb-6" style={{ color: "rgba(255,255,255,0.7)" }}>Book a free 60-minute Automation Audit and we will map your specific workflows.</p>
                <Link href="/contact" className="btn-primary">Book Free Audit</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="container py-16">
        <h1 className="text-2xl font-bold mb-4" style={{ color: "#1F2937" }}>Location page not found</h1>
        <Link href="/" className="btn-secondary">Back to Home</Link>
      </div>
    </div>
  );
}
