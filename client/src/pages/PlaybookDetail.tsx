import { Link, useParams } from "wouter";
const PLAYBOOKS: Record<string, { title: string; tag: string; intro: string; phases: { phase: string; steps: string[] }[] }> = {
  "immigration-consultant": {
    title: "The Immigration Consultant Automation Playbook",
    tag: "Immigration",
    intro: "Immigration consulting firms face a specific operational challenge: high-volume client intake, complex document requirements, strict deadlines, and the need for precise file tracking. This playbook covers the five automation phases that deliver the highest ROI for immigration firms in the GTA.",
    phases: [
      { phase: "Phase 1: Lead Capture and Qualification", steps: ["Set up a multi-channel lead capture form covering website, email, and social media inquiries", "Configure automatic acknowledgment within 90 seconds of form submission", "Build a qualification sequence that identifies visa type, urgency, and eligibility", "Route qualified leads to the appropriate consultant based on visa category"] },
      { phase: "Phase 2: Client Intake Automation", steps: ["Automate intake form delivery upon engagement confirmation", "Configure CRM record creation from intake form responses", "Set up document checklist delivery based on visa type", "Build intake completion tracking with automated follow-up reminders"] },
      { phase: "Phase 3: Document Collection System", steps: ["Create a document portal or structured collection workflow", "Configure automated reminders every 48 hours for outstanding documents", "Set up document receipt confirmation and logging", "Build escalation logic for documents overdue beyond 7 days"] },
      { phase: "Phase 4: File Tracking and Deadline Management", steps: ["Configure milestone tracking in your CRM or project management tool", "Set up automated deadline reminders for government submission dates", "Build status update notifications to clients at key milestones", "Create internal alerts for files approaching critical deadlines"] },
      { phase: "Phase 5: Client Communication Sequences", steps: ["Build a post-submission update sequence", "Configure automated responses to common client status inquiries", "Set up satisfaction survey delivery after case completion", "Create a referral request sequence for completed cases"] },
    ],
  },
  "accounting-firm": {
    title: "The Accounting Firm Automation Playbook",
    tag: "Accounting",
    intro: "Accounting firms lose significant staff time to document chasing, manual data entry, and repetitive client communication. This playbook covers the automation sequence that eliminates these bottlenecks for GTA accounting practices.",
    phases: [
      { phase: "Phase 1: New Client Onboarding", steps: ["Automate engagement letter delivery and e-signature collection", "Configure CRM record creation from onboarding form responses", "Set up service scope confirmation and fee agreement delivery", "Build welcome sequence with preparation instructions"] },
      { phase: "Phase 2: Document Collection Automation", steps: ["Create document request checklists specific to service type (T1, T2, bookkeeping, etc.)", "Configure automated reminders every 48 hours for outstanding documents", "Set up document receipt confirmation and file organization", "Build escalation logic for overdue document requests"] },
      { phase: "Phase 3: Workflow and Task Management", steps: ["Configure automatic task creation when new engagements are confirmed", "Set up staff assignment based on service type and capacity", "Build deadline tracking with internal alerts", "Create client status update notifications at key milestones"] },
      { phase: "Phase 4: Invoicing and Payment Automation", steps: ["Configure automatic invoice generation upon engagement completion", "Set up payment reminder sequences (7 days, 14 days, 30 days)", "Build overdue invoice escalation logic", "Create payment confirmation and receipt delivery"] },
    ],
  },
  "contractor": {
    title: "The Contractor Automation Playbook",
    tag: "Contractors",
    intro: "Residential and commercial contractors lose leads to slow response times and lose revenue to inconsistent follow-up. This playbook covers the automation system that captures every lead and converts more quotes for GTA contractors.",
    phases: [
      { phase: "Phase 1: Lead Capture and Immediate Response", steps: ["Set up multi-channel lead capture (website form, Google Business, social media)", "Configure 90-second automated acknowledgment with qualification questions", "Build lead routing to the owner or estimator based on job type", "Set up Jobber or similar field service software integration"] },
      { phase: "Phase 2: Quote Follow-Up Sequence", steps: ["Configure automatic quote delivery with e-signature option", "Build a 5-touch follow-up sequence over 14 days", "Set up quote expiry reminders", "Create a lost quote re-engagement sequence at 30 days"] },
      { phase: "Phase 3: Job Scheduling and Coordination", steps: ["Automate job confirmation and scheduling notifications", "Configure pre-job preparation reminders for clients", "Set up crew assignment and job detail distribution", "Build post-job completion and invoice trigger"] },
      { phase: "Phase 4: Invoice and Payment Automation", steps: ["Configure automatic invoice generation upon job completion", "Set up payment reminder sequences", "Build review request automation after payment", "Create referral request sequence for satisfied clients"] },
    ],
  },
  "physiotherapy-clinic": {
    title: "The Physiotherapy Clinic Automation Playbook",
    tag: "Healthcare",
    intro: "Physiotherapy clinics face specific operational challenges: high appointment volume, insurance verification complexity, no-show rates, and the need for consistent patient communication. This playbook covers the automation system that reduces no-shows and improves patient experience.",
    phases: [
      { phase: "Phase 1: New Patient Intake", steps: ["Automate new patient intake form delivery upon booking", "Configure health history form collection and storage", "Set up insurance information collection and verification triggers", "Build intake completion reminders"] },
      { phase: "Phase 2: Appointment Reminder Sequence", steps: ["Configure 48-hour reminder with preparation instructions", "Set up 24-hour confirmation request", "Build 2-hour day-of reminder with location and parking information", "Create no-show follow-up and rebooking sequence"] },
      { phase: "Phase 3: Treatment Plan Communication", steps: ["Automate home exercise program delivery after sessions", "Configure progress check-in messages between appointments", "Set up treatment plan milestone notifications", "Build re-engagement sequence for patients who have not booked follow-ups"] },
      { phase: "Phase 4: Patient Retention and Reviews", steps: ["Configure satisfaction survey delivery after treatment completion", "Set up Google review request automation", "Build re-engagement sequence for inactive patients", "Create referral request automation for satisfied patients"] },
    ],
  },
};
export default function PlaybookDetail() {
  const params = useParams<{ slug: string }>();
  const pb = PLAYBOOKS[params.slug || ""];
  if (!pb) return <div className="min-h-screen bg-white pt-24"><div className="container py-16"><h1 className="text-2xl font-bold mb-4" style={{ color: "#1F2937" }}>Playbook not found</h1><Link href="/playbooks" className="btn-secondary">Back to Playbooks</Link></div></div>;
  return (
    <div className="min-h-screen bg-white">
      <section className="hero-light pt-24 pb-12">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link><span className="breadcrumb-sep">/</span><Link href="/playbooks">Playbooks</Link><span className="breadcrumb-sep">/</span><span>{pb.tag}</span></div>
          <div className="max-w-3xl"><div className="tag-blue mb-4">{pb.tag}</div><h1 className="font-extrabold mb-4" style={{ color: "#1F2937" }}>{pb.title}</h1></div>
        </div>
      </section>
      <section className="py-12">
        <div className="container">
          <div className="max-w-3xl">
            <div className="aeo-block mb-10"><div className="aeo-label"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>Overview</div><p>{pb.intro}</p></div>
            <div className="space-y-8">
              {pb.phases.map((phase, i) => (
                <div key={i} className="p-6 rounded-2xl border" style={{ borderColor: "rgba(26,82,118,0.1)", backgroundColor: "#F7F9FC" }}>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-white" style={{ backgroundColor: "#283891" }}>{i + 1}</div>
                    <div className="flex-1">
                      <h3 className="font-bold mb-3" style={{ color: "#1F2937" }}>{phase.phase}</h3>
                      <ul className="space-y-2">{phase.steps.map((step, j) => <li key={j} className="flex items-start gap-2 text-sm" style={{ color: "#374151" }}><span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: "#7E0F4A" }} />{step}</li>)}</ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 p-8 rounded-2xl" style={{ background: "linear-gradient(135deg, #1E2B6E, #283891)" }}>
              <h3 className="text-xl font-bold text-white mb-3">Implement This Playbook for Your Business</h3>
              <p className="mb-6" style={{ color: "rgba(255,255,255,0.7)" }}>Book a free Automation Audit and we will customize this playbook for your specific workflows and tools.</p>
              <Link href="/contact" className="btn-primary">Book Free Audit</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
