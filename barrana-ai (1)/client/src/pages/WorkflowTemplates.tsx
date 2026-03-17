import { Link } from "wouter";
const templates = [
  { title: "Lead Capture and Acknowledgment", description: "Trigger: form submission. Actions: send acknowledgment email, create CRM lead record, notify assigned team member. Compatible with: Jotform, HubSpot, Make.", tag: "Lead Management", complexity: "Simple" },
  { title: "Client Intake and Onboarding", description: "Trigger: new client confirmation. Actions: send intake form, create CRM record from responses, deliver document checklist, schedule initial appointment. Compatible with: Typeform, HubSpot, Calendly, Make.", tag: "Client Operations", complexity: "Moderate" },
  { title: "Document Collection and Tracking", description: "Trigger: new engagement created. Actions: send document request checklist, track received documents, send reminders every 48 hours, escalate overdue items. Compatible with: Jotform, Google Drive, Make.", tag: "Document Management", complexity: "Moderate" },
  { title: "Appointment Reminder Sequence", description: "Trigger: new appointment booked. Actions: send 48-hour reminder, 24-hour confirmation request, 2-hour day-of reminder. Compatible with: Calendly, Acuity, Make.", tag: "Scheduling", complexity: "Simple" },
  { title: "Quote Follow-Up Sequence", description: "Trigger: quote sent. Actions: follow-up email at 3 days, 7 days, and 14 days. Mark as lost if no response after 21 days. Compatible with: HubSpot, Jobber, Make.", tag: "Lead Management", complexity: "Simple" },
  { title: "Invoice Generation and Payment Reminders", description: "Trigger: job or service marked complete. Actions: generate invoice, send to client, follow up at 7 days, 14 days, and 30 days. Compatible with: QuickBooks, FreshBooks, Make.", tag: "Financial", complexity: "Moderate" },
  { title: "No-Show Re-engagement", description: "Trigger: appointment marked as no-show. Actions: send apology and rebooking link within 2 hours, follow up at 24 hours if not rebooked. Compatible with: Calendly, Make.", tag: "Scheduling", complexity: "Simple" },
  { title: "Referral Request Automation", description: "Trigger: project marked complete and payment received. Actions: send satisfaction survey, then referral request 3 days later if survey response is positive. Compatible with: Typeform, Make.", tag: "Client Retention", complexity: "Simple" },
];
const colors: Record<string, string> = { Simple: "#059669", Moderate: "#D97706", Complex: "#DC2626" };
export default function WorkflowTemplates() {
  return (
    <div className="min-h-screen bg-white">
      <section className="hero-light pt-24 pb-16">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link><span className="breadcrumb-sep">/</span><span>Workflow Templates</span></div>
          <div className="max-w-3xl">
            <div className="eyebrow">Workflow Templates</div>
            <h1 className="font-extrabold mb-4" style={{ color: "#1F2937" }}>Automation Workflow Templates for Small Business</h1>
            <p className="text-lg leading-relaxed" style={{ color: "#6B7280" }}>Pre-built automation workflow templates for common small business operations. Each template includes the trigger, actions, and compatible tools.</p>
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-6">
            {templates.map((t) => (
              <div key={t.title} className="card-base">
                <div className="flex items-start justify-between mb-3">
                  <div className="tag-teal">{t.tag}</div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${colors[t.complexity]}20`, color: colors[t.complexity] }}>{t.complexity}</span>
                </div>
                <h3 className="font-bold mb-2" style={{ color: "#1F2937" }}>{t.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>{t.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="cta-section py-20"><div className="container text-center"><h2 className="text-3xl font-extrabold text-white mb-4">Want These Implemented for Your Business?</h2><p className="mb-8 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.65)" }}>Book a free Automation Audit and we will identify which templates apply to your business and customize them for your specific workflows.</p><Link href="/contact" className="btn-primary">Book Free Audit</Link></div></section>
    </div>
  );
}
