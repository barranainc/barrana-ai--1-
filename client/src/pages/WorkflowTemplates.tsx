import { Link } from "wouter";
import WorkflowDiagram from "@/components/diagrams/WorkflowDiagram";

const templates = [
  {
    title: "Lead Capture to Consultation Booking",
    description:
      "Automate the full journey from an inbound form submission to a confirmed consultation booking - qualifying the lead and sending a calendar link without any manual intervention.",
    steps: [
      { label: "Form Submitted", type: "trigger" as const },
      { label: "AI Qualifies", type: "ai" as const },
      { label: "CRM Record Created", type: "action" as const },
      { label: "Calendar Link Sent", type: "action" as const },
      { label: "Consultation Booked", type: "outcome" as const },
    ],
    resultBadge: "Response: 4hrs → 90sec",
  },
  {
    title: "Document Request to Completion",
    description:
      "Send document checklists automatically when an engagement starts, track what has been received, and fire reminders until the file is complete - no staff follow-up required.",
    steps: [
      { label: "Engagement Started", type: "trigger" as const },
      { label: "Request Sent", type: "action" as const },
      { label: "Portal Opened", type: "action" as const },
      { label: "Files Tracked", type: "ai" as const },
      { label: "Reminder Sent", type: "action" as const },
      { label: "Complete", type: "outcome" as const },
    ],
    resultBadge: "Collection: 21 days → 9 days",
  },
  {
    title: "Invoice on Job Completion",
    description:
      "Generate and send an invoice the moment a job is marked complete, then follow up automatically at 7 days until payment is confirmed.",
    steps: [
      { label: "Job Marked Complete", type: "trigger" as const },
      { label: "Invoice Generated", type: "action" as const },
      { label: "Invoice Emailed", type: "action" as const },
      { label: "7-Day Reminder", type: "action" as const },
      { label: "Payment Confirmed", type: "outcome" as const },
    ],
    resultBadge: "Delay: 2 weeks → same day",
  },
  {
    title: "Appointment Reminder Sequence",
    description:
      "Send a confirmation immediately on booking, a 48-hour reminder, and a 2-hour day-of reminder to dramatically reduce no-shows.",
    steps: [
      { label: "Booking Made", type: "trigger" as const },
      { label: "Confirmation Sent", type: "action" as const },
      { label: "48hr Reminder", type: "action" as const },
      { label: "2hr Reminder", type: "action" as const },
      { label: "Appointment Kept", type: "outcome" as const },
    ],
    resultBadge: "No-shows: 22% → 8%",
  },
  {
    title: "Client Onboarding Sequence",
    description:
      "From signed agreement to fully onboarded client in the same day - welcome email, intake form, document collection, and intro call booking all run automatically.",
    steps: [
      { label: "Signed", type: "trigger" as const },
      { label: "Welcome Email", type: "action" as const },
      { label: "Intake Form Sent", type: "action" as const },
      { label: "Docs Collected", type: "action" as const },
      { label: "Intro Call Booked", type: "action" as const },
      { label: "Onboarded", type: "outcome" as const },
    ],
    resultBadge: "Onboarding: 3 days → same day",
  },
  {
    title: "After-Hours Call to Morning Briefing",
    description:
      "An AI receptionist answers after-hours calls, qualifies the caller, creates a CRM record, and delivers a structured briefing to your team before 9am the next day.",
    steps: [
      { label: "After-Hours Call", type: "trigger" as const },
      { label: "AI Answers", type: "ai" as const },
      { label: "Lead Qualified", type: "ai" as const },
      { label: "CRM Record", type: "action" as const },
      { label: "Staff Briefing Sent", type: "action" as const },
      { label: "Leads Ready at 9am", type: "outcome" as const },
    ],
    resultBadge: "Zero missed after-hours leads",
  },
  {
    title: "Quote Follow-Up Sequence (48hr/5d/10d)",
    description:
      "Ensure 100% of quotes receive structured follow-up at 48 hours, 5 days, and 10 days - so no deal is ever lost to silence.",
    steps: [
      { label: "Quote Sent", type: "trigger" as const },
      { label: "48hr Follow-Up", type: "action" as const },
      { label: "5-Day Check-In", type: "action" as const },
      { label: "10-Day Final", type: "action" as const },
      { label: "Deal Won or Closed", type: "outcome" as const },
    ],
    resultBadge: "Follow-up: 40% → 100%",
  },
  {
    title: "Monthly Client Reporting",
    description:
      "Pull data automatically at month end, generate a formatted report, and email it to every client - eliminating 4 hours of manual reporting work.",
    steps: [
      { label: "Month End", type: "trigger" as const },
      { label: "Data Pulled", type: "ai" as const },
      { label: "Report Generated", type: "action" as const },
      { label: "Report Emailed", type: "action" as const },
      { label: "Report Logged", type: "outcome" as const },
    ],
    resultBadge: "Reporting: 4hrs → automated",
  },
];

export default function WorkflowTemplates() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-24 pb-16" style={{ backgroundColor: "#F7F9FC" }}>
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-extrabold mb-4" style={{ color: "#1A1A2E" }}>
              Workflow Templates
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: "#7B7B7B" }}>
              Visual automation templates showing exactly how each workflow is structured. Use these as reference for your own implementation.
            </p>
          </div>
        </div>
      </section>

      {/* Template Sections */}
      {templates.map((template, i) => (
        <section
          key={template.title}
          className="py-16"
          style={{ backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#F7F9FC" }}
        >
          <div className="container">
            <div className="max-w-4xl">
              <h3 className="text-2xl font-bold mb-3" style={{ color: "#1A1A2E" }}>
                {template.title}
              </h3>
              <p className="text-base leading-relaxed mb-8" style={{ color: "#7B7B7B" }}>
                {template.description}
              </p>
              <WorkflowDiagram steps={template.steps} resultBadge={template.resultBadge} />
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, #283891 0%, #1e2d7a 50%, #7E0F4A 100%)" }}
      >
        <div className="container text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Want These Implemented for Your Business?</h2>
          <p className="mb-8 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.65)" }}>
            Book a free Automation Audit and we will identify which templates apply to your business and customize them for your specific workflows.
          </p>
          <Link href="/contact" className="btn-primary">
            Book Free Audit
          </Link>
        </div>
      </section>
    </div>
  );
}
