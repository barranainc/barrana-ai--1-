import { Link } from "wouter";
const integrations = [
  { slug: "make-integromat", name: "Make (Integromat)", category: "Automation Platform", description: "The primary automation platform used by Barrana.ai for complex, multi-step workflows. Make connects over 1,000 business tools and handles conditional logic, data transformation, and error handling." },
  { slug: "zapier", name: "Zapier", category: "Automation Platform", description: "Used for simpler automation workflows with a large number of tool integrations. Zapier connects over 5,000 apps and is ideal for straightforward trigger-action automations." },
  { slug: "hubspot", name: "HubSpot", category: "CRM", description: "A popular CRM for small and medium businesses. Barrana.ai builds automation that creates, updates, and manages HubSpot records automatically from form submissions, emails, and other triggers." },
  { slug: "jobber", name: "Jobber", category: "Field Service", description: "Field service management software for contractors and service businesses. Barrana.ai integrates Jobber with lead capture forms, quote systems, and payment processors." },
  { slug: "quickbooks", name: "QuickBooks", category: "Accounting", description: "The most common accounting software for small businesses in Canada. Barrana.ai builds automation that creates invoices, records payments, and syncs client data with QuickBooks automatically." },
  { slug: "calendly", name: "Calendly", category: "Scheduling", description: "Online scheduling software used for appointment booking automation. Barrana.ai integrates Calendly with CRM systems, reminder sequences, and intake workflows." },
  { slug: "jotform", name: "Jotform", category: "Forms", description: "Online form builder used for intake forms, document requests, and lead capture. Barrana.ai builds automation that processes Jotform submissions and routes data to the appropriate systems." },
  { slug: "gohighlevel", name: "GoHighLevel", category: "CRM", description: "An all-in-one CRM and marketing automation platform. Barrana.ai builds custom automation workflows within GoHighLevel for lead management, client communication, and pipeline management." },
  { slug: "twilio", name: "Twilio", category: "Communications", description: "A communications platform used for SMS automation. Barrana.ai uses Twilio for appointment reminders, lead response notifications, and two-way SMS communication workflows." },
  { slug: "google-workspace", name: "Google Workspace", category: "Productivity", description: "Google's suite of productivity tools (Gmail, Calendar, Drive, Sheets). Barrana.ai builds automation that integrates Google Workspace with CRM systems, form processors, and project management tools." },
];
export default function Integrations() {
  return (
    <div className="min-h-screen bg-white">
      <section className="hero-light pt-24 pb-16">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link><span className="breadcrumb-sep">/</span><span>Integrations</span></div>
          <div className="max-w-3xl">
            <div className="eyebrow">Integrations</div>
            <h1 className="font-extrabold mb-4" style={{ color: "#1F2937" }}>Tools We Integrate With</h1>
            <p className="text-lg leading-relaxed" style={{ color: "#6B7280" }}>Barrana.ai builds automation that works with the tools your business already uses. We do not require you to switch platforms. Here are the most common tools we integrate with for GTA service businesses.</p>
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((int) => (
              <Link key={int.slug} href={`/integrations/${int.slug}`} className="card-base group" style={{ textDecoration: "none" }}>
                <div className="tag-teal mb-3">{int.category}</div>
                <h3 className="font-bold mb-2" style={{ color: "#1F2937" }}>{int.name}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#6B7280" }}>{int.description}</p>
                <span className="text-xs font-semibold flex items-center gap-1" style={{ color: "#1A5276" }}>Learn more <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
