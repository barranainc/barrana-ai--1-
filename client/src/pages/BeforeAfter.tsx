import { Link } from "wouter";
const scenarios = [
  { industry: "Immigration Consultant", before: { title: "Before Automation", points: ["New client inquiry arrives by email at 6pm", "Consultant sees it the next morning at 9am — 15 hours later", "Manually creates a client record in the CRM", "Sends a welcome email and intake form link", "Follows up manually when forms are not completed", "Copies form responses into the CRM and document tracker", "Schedules the initial consultation by email back-and-forth", "Total time per new client intake: 45 to 60 minutes"] }, after: { title: "After Automation", points: ["New client inquiry arrives by email at 6pm", "Automated acknowledgment sent within 90 seconds", "Intake form automatically delivered with visa-type-specific document checklist", "CRM record created automatically from form responses", "Document reminders sent automatically every 48 hours for outstanding items", "Consultation scheduled automatically via calendar link", "Consultant notified when intake is complete and ready to review", "Total time per new client intake: under 5 minutes"] }, metrics: [{ label: "Intake time reduction", value: "87%" }, { label: "Manual data entry steps", value: "0" }, { label: "ROI recovery", value: "45 days" }] },
  { industry: "Residential Contractor", before: { title: "Before Automation", points: ["Lead submits a quote request form at 9pm", "Owner is on a job site the next day and sees it at 5pm — 20 hours later", "Calls the lead back — no answer", "Sends a manual email follow-up", "Lead has already booked with a competitor", "8 to 12 qualified leads lost per month to slow response", "Owner spends 2 to 3 hours per week on manual lead follow-up"] }, after: { title: "After Automation", points: ["Lead submits a quote request form at 9pm", "Automated acknowledgment sent within 90 seconds", "Qualification questions sent automatically", "Lead books a site visit via calendar link", "Owner receives a notification with lead details and booking confirmation", "Quote follow-up sequence runs automatically if lead does not book", "0 leads lost to slow response time"] }, metrics: [{ label: "Lead response time", value: "90 sec" }, { label: "Quote conversion increase", value: "+22%" }, { label: "After-hours leads captured", value: "100%" }] },
  { industry: "Accounting Firm", before: { title: "Before Automation", points: ["New tax season engagement confirmed by email", "Staff manually sends engagement letter for signature", "Manually creates a document checklist and emails it to the client", "Follows up manually when documents are not received", "Copies received documents into the client folder", "Manually updates the project management tool", "Staff spends 8 to 12 hours per week on document chasing"] }, after: { title: "After Automation", points: ["New engagement confirmed — automation triggers immediately", "Engagement letter automatically sent for e-signature", "Document checklist automatically delivered based on service type", "Automated reminders sent every 48 hours for outstanding documents", "Document receipt automatically logged in the project management tool", "Staff notified when all documents are received and ready for review", "Staff time on document chasing: near zero"] }, metrics: [{ label: "Staff hours saved per week", value: "8–12 hrs" }, { label: "Document tracking accuracy", value: "100%" }, { label: "ROI recovery", value: "60 days" }] },
];
export default function BeforeAfter() {
  return (
    <div className="min-h-screen bg-white">
      <section className="hero-light pt-24 pb-16">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link><span className="breadcrumb-sep">/</span><span>Before & After</span></div>
          <div className="max-w-3xl">
            <div className="eyebrow">Before & After Automation</div>
            <h1 className="font-extrabold mb-4" style={{ color: "#1F2937" }}>What Operations Look Like Before and After Automation</h1>
            <p className="text-lg leading-relaxed" style={{ color: "#6B7280" }}>Side-by-side comparisons of real operational workflows before and after automation implementation. These are representative examples based on GTA service businesses.</p>
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container space-y-16">
          {scenarios.map((s) => (
            <div key={s.industry}>
              <h2 className="text-2xl font-bold mb-6" style={{ color: "#1F2937" }}>{s.industry}</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="p-6 rounded-2xl border" style={{ borderColor: "rgba(239,68,68,0.2)", backgroundColor: "#FFF5F5" }}>
                  <h3 className="font-bold mb-4 flex items-center gap-2" style={{ color: "#DC2626" }}><span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-xs">✗</span>{s.before.title}</h3>
                  <ul className="space-y-2">{s.before.points.map((p, i) => <li key={i} className="text-sm flex items-start gap-2" style={{ color: "#374151" }}><span className="w-1.5 h-1.5 rounded-full mt-1.5 bg-red-300 flex-shrink-0" />{p}</li>)}</ul>
                </div>
                <div className="p-6 rounded-2xl border" style={{ borderColor: "rgba(16,185,129,0.2)", backgroundColor: "#F0FDF4" }}>
                  <h3 className="font-bold mb-4 flex items-center gap-2" style={{ color: "#059669" }}><span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-xs">✓</span>{s.after.title}</h3>
                  <ul className="space-y-2">{s.after.points.map((p, i) => <li key={i} className="text-sm flex items-start gap-2" style={{ color: "#374151" }}><span className="w-1.5 h-1.5 rounded-full mt-1.5 bg-green-400 flex-shrink-0" />{p}</li>)}</ul>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {s.metrics.map((m) => <div key={m.label} className="p-4 rounded-xl text-center" style={{ backgroundColor: "#F7F9FC", border: "1px solid rgba(26,82,118,0.08)" }}><div className="text-2xl font-extrabold mb-1" style={{ color: "#1A5276" }}>{m.value}</div><div className="text-xs" style={{ color: "#6B7280" }}>{m.label}</div></div>)}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="cta-section py-20"><div className="container text-center"><h2 className="text-3xl font-extrabold text-white mb-4">Ready to See Your Before & After?</h2><p className="mb-8 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.65)" }}>Book a free Automation Audit and we will map your current workflows and show you what automation would look like for your specific business.</p><Link href="/contact" className="btn-primary">Book Free Audit</Link></div></section>
    </div>
  );
}
