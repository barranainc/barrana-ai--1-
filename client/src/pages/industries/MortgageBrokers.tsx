import { useEffect } from "react";
import IndustryPageLayout, { IndustryPageData } from "@/components/industry/IndustryPageLayout";
import TemplateTimeDrainWaterfall from "@/components/hero-visuals/TemplateTimeDrainWaterfall";

const data: IndustryPageData = {
  title: "AI Automation for Mortgage Brokers Toronto | Win the Application Before Competitors | Barrana.ai",
  description: "Automate lead response, mortgage application intake, document collection, rate notifications, and renewal reminders for mortgage brokerages. Free audit.",
  route: "mortgage-brokers",
  breadcrumb: "Mortgage Brokers",
  h1: "Mortgage Leads Go Cold in Hours. Document Collection Takes Weeks. Maturity Renewals Slip to Lenders. Automation Fixes All Three.",
  subheadline: "90-second lead response. Automated application intake with pre-qualification. Document collection through secure portal with reminders. Rate change alerts. Maturity renewal outreach starting 6 months before term end.",
  body: [
    "Mortgage clients are shopping 3-5 brokers simultaneously. The first broker to respond with substance, not just a form confirmation, earns the application. Meanwhile, collecting income verification, tax returns, and bank statements takes 3-4 weeks of manual email chasing.",
    "And your existing book? Without systematic outreach starting 6 months before maturity, your clients get a competitive rate from their current lender and never call you. Automation solves all three gaps: speed, documents, and retention.",
  ],
  ctaMicro: "See how many deals you are losing to slow response and document delays. Free 60-minute audit.",

  costHeading: "What Manual Processes Cost Your Mortgage Business",
  costItems: [
    { figure: "5 Minutes", label: "Response Window", desc: "Mortgage shoppers send inquiries to multiple brokers. The first substantive response wins. Most brokers respond in hours." },
    { figure: "3-4 Weeks", label: "Document Collection", desc: "Income letters, T4s, bank statements, property assessments. Chased one email at a time over weeks while the client's patience wears thin." },
    { figure: "Lost Renewals", label: "Maturity Lapse", desc: "Without proactive outreach 6 months before maturity, your clients receive a competitive offer from their current lender and stay." },
  ],

  problemsHeading: undefined,
  problems: [
    { title: "Lead Response Is Too Slow", desc: "You are on calls with other clients. Or at a signing. Or done for the day. Leads sit for hours. By then, the borrower is working with someone else." },
    { title: "Document Collection Is a Months-Long Grind", desc: "Every mortgage file requires 10-20 documents. Requesting, tracking, and chasing them individually through email takes weeks and consumes hours of your time." },
    { title: "Renewal Outreach Does Not Happen Proactively", desc: "You have 200+ past clients with mortgages maturing in the next 2 years. Without systematic tracking, you do not reach out until the client calls saying their lender offered a rate." },
    { title: "Rate Changes Go Uncommunicated", desc: "Rates drop. Your pre-approved clients should be notified. Without automation, you manually email a few. Most never hear about the opportunity." },
  ],

  beforeAfterMetrics: [
    { label: "Lead Response", before: "2-6 hours", after: "Under 90 seconds, 24/7", beforeW: 88, afterW: 8 },
    { label: "Document Collection", before: "3-4 weeks manual", after: "10-14 days with portal", beforeW: 85, afterW: 45 },
    { label: "Maturity Renewal", before: "Reactive (client calls)", after: "6-month automated sequence", beforeW: 90, afterW: 8 },
    { label: "Rate Notifications", before: "Manual, most clients missed", after: "Triggered on rate changes", beforeW: 85, afterW: 8 },
    { label: "Application Tracking", before: "Spreadsheet or memory", after: "Automated pipeline + client updates", beforeW: 80, afterW: 10 },
  ],

  workflowHeading: "Systems We Build for Mortgage Brokers",
  workflowSteps: [
    { label: "Lead Arrives", type: "trigger" },
    { label: "90s Response", type: "ai" },
    { label: "Pre-Qualify", type: "ai" },
    { label: "Doc Collection Portal", type: "action" },
    { label: "Submit to Lender", type: "action" },
    { label: "Status Updates", type: "action" },
    { label: "Funded + Renewal Seq", type: "outcome" },
  ],
  workflowBadge: "Collection: 3-4 weeks → 10-14 days",

  controlItems: [
    { title: "Stop-Loss", desc: "Pre-qualification results indicating the client clearly does not meet minimum lending criteria flagged for broker review and sensitive decline handling." },
    { title: "Retries", desc: "Document upload failures trigger alternate collection methods (email attachment fallback, phone follow-up task for assistant)." },
    { title: "Approvals", desc: "Rate change alert campaigns require broker review and approval before mass distribution." },
    { title: "Logging", desc: "All client communications, document submissions, and rate disclosures logged per file for FSRA compliance." },
    { title: "Escalation", desc: "Applications stalled in 'conditions' stage for 14+ days escalate to senior broker with full file history and outstanding condition list." },
  ],

  roiMetrics: [
    { label: "Lead Response", before: "2-6 hours", after: "Under 90 seconds" },
    { label: "Document Collection", before: "3-4 weeks", after: "10-14 days" },
    { label: "Maturity Renewal Retention", after: "Improved 20-30%" },
    { label: "Client Status Calls", after: "Reduced 60%+ (automated updates)" },
    { label: "Pipeline Visibility", after: "Real-time, automated" },
    { label: "Payback Period", after: "Within first 1-2 closed deals" },
  ],
  roiNote: "These are typical outcomes. The Automation Audit provides a projection for your specific practice.",

  bestFit: [
    "Mortgage brokerages handling 10+ applications per month",
    "Brokers with 200+ past clients approaching maturity",
    "Teams where showing/closing schedule prevents timely lead response",
    "Brokerages wanting to grow without proportional admin staff",
  ],
  notFit: [
    "Brand new brokers without an established client book",
    "Brokers closing fewer than 3 deals per month",
  ],

  aeoQuestion: "How does AI automation help mortgage brokers?",
  aeoAnswer: "AI automation helps mortgage brokers by responding to leads in under 90 seconds, collecting mortgage documents through structured portals with automated 48-hour reminders, sending maturity renewal outreach starting 6 months before term end, providing clients with automated status updates during the approval process, and alerting pre-approved clients to rate changes. This captures leads faster, collects documents in half the typical time, and retains renewal clients who would otherwise be lost to lender retention offers.",

  faqItems: [
    { question: "FSRA compliance?", answer: "All communications logged per client file. Complete audit trail maintained for regulatory requirements. Disclosure requirements built into communication templates." },
    { question: "Which mortgage tools?", answer: "We integrate with Velocity, Finastra/Mortgagebot, and CRM systems used by brokerages (Salesforce, Go High Level, custom)." },
    { question: "Residential and commercial?", answer: "Yes. Separate workflows, document checklists, and timelines per mortgage type." },
    { question: "How long?", answer: "Standard mortgage automation: 3-4 weeks from audit to live." },
    { question: "How much?", answer: "Mortgage broker automation: $5,000-$10,000 CAD depending on scope. Typically pays for itself within the first 1-2 additional closings from captured leads." },
    { question: "Maturity tracking: how does it know when mortgages are up?", answer: "We import maturity dates from your records or CRM. The system then automatically triggers the 6-month renewal sequence for each client." },
    { question: "Can it handle multiple lenders?", answer: "Yes. The system tracks which lender holds each mortgage and can customize renewal outreach accordingly." },
  ],

  ctaHeadline: "Every Slow Response Loses a Mortgage Application. Every Missed Maturity Loses Recurring Revenue. Automate Both.",
  ctaBody: "Walk away with a clear plan for winning applications faster and retaining your renewal book. Free. No pitch. No obligation.",
  primaryCTA: "Get Your Free Mortgage Brokers Automation Audit",
  primaryMicro: "Walk away with a clear plan. No pitch. No obligation.",

  internalLinks: [
    { label: "Lead Response Automation", href: "/services/lead-response-automation", desc: "Respond in 90 seconds, every time" },
    { label: "Document Collection", href: "/services/document-collection", desc: "Automate every document request" },
    { label: "CRM Automation", href: "/services/crm-automation", desc: "Your CRM stays current automatically" },
    { label: "Real Estate Teams", href: "/industries/real-estate-teams", desc: "Automation for real estate agents" },
    { label: "Insurance Brokers", href: "/industries/insurance-brokers", desc: "Automation for insurance professionals" },
  ],
};

export default function MortgageBrokers() {
  useEffect(() => {
    document.title = data.title;
  }, []);
  return <IndustryPageLayout data={data} heroVisual={<TemplateTimeDrainWaterfall industry="Mortgage Brokers" drains={[{label:"Document collection",hours:11},{label:"Status update calls",hours:7},{label:"CRM entry",hours:4},{label:"Compliance admin",hours:3}]} />} />;
}
