import { Link, useParams } from "wouter";
const PLAYBOOKS: Record<string, { title: string; tag: string; emoji: string; intro: string; phases: { phase: string; steps: string[] }[] }> = {
  "lead-response": {
    title: "Lead Response Automation Playbook",
    tag: "Lead Management",
    emoji: "⚡",
    intro: "Every minute you delay responding to an inbound lead, your conversion rate drops. This playbook builds a system that acknowledges, qualifies, and routes every enquiry in under 90 seconds - 24 hours a day, 7 days a week.",
    phases: [
      { phase: "Phase 1: Capture Every Lead Channel", steps: ["Audit every channel where leads come in (website form, email, Google Business, social DMs, phone)", "Set up a unified intake form or webhook that feeds all channels into one system", "Configure instant acknowledgement emails for each channel with channel-appropriate language", "Set up CRM lead record creation on every new submission"] },
      { phase: "Phase 2: Qualify Automatically", steps: ["Add 2–3 qualifying questions to your intake form (service needed, timeline, budget range)", "Build branching logic so high-priority leads (urgent, high-value) are flagged immediately", "Configure lead scoring rules in your CRM based on service type and response signals", "Set up automatic disqualification and nurture sequences for unqualified leads"] },
      { phase: "Phase 3: Route to the Right Person", steps: ["Define routing rules based on service type, location, or lead score", "Configure instant Slack or SMS notification to the assigned team member", "Set up a 5-minute response window alert if the assigned person has not acted", "Build an escalation to the owner if no response within 15 minutes during business hours"] },
      { phase: "Phase 4: After-Hours Coverage", steps: ["Configure an AI receptionist or chatbot to handle enquiries outside business hours", "Set up a 'we received your message' sequence with expected response time", "Build a morning digest email summarising all after-hours leads for the team", "Ensure all after-hours leads are pre-qualified and ready to action by 9am"] },
      { phase: "Phase 5: Measure and Optimise", steps: ["Track average response time in your CRM weekly", "Monitor lead-to-consultation conversion rate by channel", "A/B test subject lines and acknowledgement email copy quarterly", "Review and tighten routing rules based on which lead types convert best"] },
    ],
  },
  "booking-reminders": {
    title: "Booking and Reminders Automation Playbook",
    tag: "Scheduling",
    emoji: "📅",
    intro: "No-shows cost service businesses an average of 15–20% of their booked revenue. This playbook builds a multi-touch reminder system that confirms attendance, reduces no-shows by up to 35%, and automatically fills cancellations.",
    phases: [
      { phase: "Phase 1: Booking Confirmation", steps: ["Configure instant booking confirmation email with appointment details, location, and what to bring", "Set up SMS confirmation within 60 seconds of booking", "Add calendar invite (.ics) attachment to confirmation email", "Create CRM record or update on every new booking"] },
      { phase: "Phase 2: 48-Hour Reminder", steps: ["Build an automated email reminder 48 hours before the appointment", "Include service summary, location, preparation instructions, and reschedule link", "Add SMS reminder alongside the email for higher open rates", "Configure tracking so unconfirmed appointments are flagged for follow-up"] },
      { phase: "Phase 3: 24-Hour Confirmation Request", steps: ["Send a confirmation request 24 hours out asking the client to confirm attendance", "Provide a one-click confirm link and an easy reschedule option", "Configure automatic flag if client has not confirmed by 20 hours out", "Trigger internal notification for unconfirmed appointments at 18 hours"] },
      { phase: "Phase 4: Same-Day Reminder", steps: ["Send a brief SMS reminder 2 hours before the appointment", "Include address, parking instructions, and a link to call if running late", "Configure a final email reminder 1 hour before for high-value appointments", "Set up automatic no-show follow-up sequence if client does not arrive"] },
      { phase: "Phase 5: Cancellation and Rebooking Flow", steps: ["Configure automatic cancellation confirmation with rebooking link", "Set up a 3-touch rebooking sequence over 7 days for cancellations", "Build a waitlist notification system to fill cancelled slots", "Track cancellation reasons in CRM to identify patterns"] },
      { phase: "Phase 6: Post-Appointment Follow-Up", steps: ["Send appointment summary and next steps within 2 hours of completion", "Configure satisfaction survey delivery 24 hours after the appointment", "Set up review request automation 48 hours after positive feedback", "Build follow-up booking prompt at 30 days for recurring service clients"] },
    ],
  },
  "client-onboarding": {
    title: "Client Onboarding Automation Playbook",
    tag: "Onboarding",
    emoji: "🤝",
    intro: "The first 7 days after a client signs sets the tone for the entire engagement. This playbook standardises and automates the onboarding experience so every new client gets the same professional, thorough welcome - without your team doing it manually.",
    phases: [
      { phase: "Phase 1: Engagement Confirmation", steps: ["Automate engagement letter or service agreement delivery on contract signing", "Configure e-signature collection via DocuSign or PandaDoc", "Set up payment method or deposit collection automation", "Send welcome email sequence within 60 seconds of agreement signing"] },
      { phase: "Phase 2: Information Collection", steps: ["Deliver a tailored intake questionnaire based on the service purchased", "Configure CRM population from questionnaire responses (no manual entry)", "Set up document collection request with secure upload link", "Build completion tracking with 48-hour follow-up reminders"] },
      { phase: "Phase 3: Account and Access Setup", steps: ["Trigger internal task for account setup or portal access provisioning", "Send client portal login credentials automatically once set up", "Configure welcome walkthrough email with how-to resources", "Set up team notification when client has logged in for the first time"] },
      { phase: "Phase 4: Kickoff Scheduling", steps: ["Send kickoff call scheduling link immediately after intake is complete", "Configure kickoff preparation email 24 hours before the call", "Build a kickoff agenda template delivered the morning of the call", "Set up post-kickoff summary and action item delivery"] },
      { phase: "Phase 5: First-Week Check-In", steps: ["Schedule an automated Day 3 check-in email asking if the client has any questions", "Configure Day 7 progress update delivery", "Set up proactive communication touchpoint at Day 14", "Build a 30-day satisfaction check and next milestone notification"] },
      { phase: "Phase 6: Handoff to Ongoing Service", steps: ["Trigger transition email introducing the ongoing service team or point of contact", "Configure recurring communication schedule setup in CRM", "Set up ongoing milestone or delivery notifications", "Build a 90-day review invitation automation"] },
      { phase: "Phase 7: Referral Priming", steps: ["Configure a 'congratulations on getting started' email at Day 30 highlighting early wins", "Build a referral request sequence triggered at first positive feedback signal", "Set up testimonial request automation after the first deliverable", "Create a referral incentive delivery if applicable"] },
    ],
  },
  "document-collection": {
    title: "Document Collection Automation Playbook",
    tag: "Documents",
    emoji: "📋",
    intro: "Chasing documents is one of the biggest time drains in professional services. This playbook builds a system that delivers the right document request, tracks what has been received, and follows up automatically - so nothing falls through the cracks.",
    phases: [
      { phase: "Phase 1: Identify and Segment Document Needs", steps: ["List every service type and the specific documents required for each", "Build conditional document request templates (e.g. immigration visa type determines checklist)", "Create a master document tracker template in your CRM or project tool", "Map the minimum document set needed to begin work vs. full completion"] },
      { phase: "Phase 2: Initial Document Request", steps: ["Configure automatic document request delivery upon engagement confirmation", "Use a secure document upload portal (ShareFile, PandaDoc, or client portal)", "Send a prioritised checklist: what is needed to start vs. what can follow", "Include clear instructions and file format requirements in the request"] },
      { phase: "Phase 3: Automated Follow-Up Sequence", steps: ["Build a 48-hour follow-up reminder for any outstanding documents", "Configure a 5-day reminder with a slightly more urgent tone", "Set up a 10-day escalation that notifies the assigned team member to follow up personally", "Create a 14-day internal alert if the file is still incomplete"] },
      { phase: "Phase 4: Receipt Confirmation and Logging", steps: ["Configure automatic receipt confirmation email when each document is uploaded", "Set up CRM field update to mark each document item as received", "Build an internal notification to the team when all required documents are in", "Create a document completeness check that triggers the next workflow stage"] },
      { phase: "Phase 5: Incomplete File Management", steps: ["Flag files with missing documents on a weekly team review dashboard", "Configure automatic work-pause notification to client if documents are critically overdue", "Build escalation logic to the account manager for files stalled beyond 21 days", "Set up automatic file archiving for contacts who are unresponsive beyond 60 days"] },
    ],
  },
  "invoice-automation": {
    title: "Invoice Automation Playbook",
    tag: "Finance",
    emoji: "💳",
    intro: "Most service businesses leave money on the table through delayed invoicing, inconsistent follow-up, and manual payment tracking. This playbook automates the entire billing cycle from invoice generation to payment confirmation.",
    phases: [
      { phase: "Phase 1: Invoice Generation Triggers", steps: ["Map every event that should trigger an invoice (job completion, milestone, subscription date)", "Configure automatic invoice generation from your CRM or project tool on trigger", "Set up invoice pre-population from client record data (no manual entry)", "Build a team review step for invoices above a certain threshold before sending"] },
      { phase: "Phase 2: Invoice Delivery", steps: ["Configure automatic invoice delivery via email with online payment link", "Set up SMS notification for clients who prefer text communication", "Include clear payment terms, due date, and accepted payment methods", "Send a delivery confirmation to the assigned team member"] },
      { phase: "Phase 3: Payment Reminder Sequence", steps: ["Build a 3-day pre-due reminder: 'Your invoice is due in 3 days'", "Configure a same-day due date reminder if unpaid", "Set up a 7-day overdue reminder with a polite but firm tone", "Build a 14-day overdue escalation with late fee notice if applicable"] },
      { phase: "Phase 4: Payment Confirmation", steps: ["Configure automatic payment confirmation email upon receipt", "Set up CRM invoice status update to 'Paid' on payment", "Build a thank-you and next-steps email triggered by payment", "Configure accounting system sync (QuickBooks, Xero) on payment"] },
    ],
  },
  "after-hours-capture": {
    title: "After-Hours Lead Capture Playbook",
    tag: "Lead Capture",
    emoji: "🌙",
    intro: "40–60% of service enquiries arrive outside business hours. Without a system to capture and nurture these leads overnight, you are losing clients to competitors who respond faster. This playbook ensures no after-hours lead goes cold.",
    phases: [
      { phase: "Phase 1: After-Hours Detection", steps: ["Define your business hours and configure after-hours routing rules", "Set up a dedicated after-hours auto-response for every lead channel", "Build a time-based conditional in your automation tool to route enquiries differently after 5pm", "Ensure website chat, contact form, and phone all have after-hours handling"] },
      { phase: "Phase 2: Immediate Acknowledgement", steps: ["Configure instant acknowledgement email: 'We received your message and will respond by [next business day]'", "Add an expectation-setting message with your typical response window", "Provide a self-serve FAQ link or booking link for clients who want to act immediately", "Set up SMS acknowledgement for leads who provided a phone number"] },
      { phase: "Phase 3: Lead Qualification Overnight", steps: ["Deliver a brief qualification sequence (2–3 questions) with the acknowledgement", "Store responses in CRM so the team has context before the morning call-back", "Flag urgent leads (e.g. 'I need this by tomorrow') for immediate escalation", "Build a lead score based on overnight qualification responses"] },
      { phase: "Phase 4: Morning Digest and Priority Queue", steps: ["Configure a daily morning digest email at 8am listing all after-hours leads with their qualification data", "Sort the digest by lead score or urgency flag", "Assign leads to team members automatically based on routing rules", "Set a 2-hour response SLA for the team on morning-digest leads"] },
      { phase: "Phase 5: Follow-Up and Conversion", steps: ["Build a 3-touch follow-up sequence for after-hours leads not contacted within 4 hours", "Configure a 24-hour automated check-in if no human has responded", "Set up a re-engagement sequence for after-hours leads who went cold at Day 3 and Day 7", "Track after-hours lead conversion rate separately to measure system ROI"] },
    ],
  },
  "immigration-consultant": {
    title: "The Immigration Consultant Automation Playbook",
    tag: "Immigration",
    emoji: "🛂",
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
    emoji: "📊",
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
    emoji: "🔧",
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
    emoji: "🏥",
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
