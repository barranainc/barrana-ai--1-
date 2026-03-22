import { useEffect } from "react";
import IndustryPageLayout, { IndustryPageData } from "@/components/industry/IndustryPageLayout";
import ImmigrationHeroVisual from "@/components/hero-visuals/ImmigrationHeroVisual";

const data: IndustryPageData = {
  title: "AI Automation for Immigration Consultants | Intake to Filing | Barrana.ai",
  description:
    "Automate client intake, visa categorization, document collection, status updates, and practice reporting for immigration consultants. PIPEDA-compliant. Free audit.",
  route: "immigration-consultants",
  breadcrumb: "Immigration Consultants",
  h1: "Your Consultants Spend 18 Hours a Week on Admin Instead of Advising Clients. Automation Recovers That Time.",
  subheadline:
    "AI intake categorizes visa types automatically. Document collection runs itself. Client status updates send at every file stage. Your consultants focus on the work IRCC actually requires their expertise for.",
  body: [
    "A regulated Canadian immigration consultant has one core product: expert advice and application management. But 40% of their week is consumed by tasks that require no expertise: collecting client information, chasing documents, answering status questions, and updating spreadsheets.",
    "For a 2-consultant firm handling 50 inquiries per month, that is over 900 hours per year of recoverable capacity. Each hour recovered is an hour available for billable consulting work.",
  ],
  ctaMicro: "See how much billable time your firm is losing to admin. Free 60-minute audit.",
  costHeading: "What Admin Overhead Costs Your Immigration Practice",
  costItems: [
    {
      figure: "37.5 hrs/mo",
      label: "Manual Intake",
      desc: "45 minutes per intake × 50 inquiries/month. Automated intake does this in under 5 minutes of staff review time.",
    },
    {
      figure: "15 hrs/wk",
      label: "Document Chasing",
      desc: "Passport copies, employment records, educational credentials, financial documents. Chased through email, WhatsApp, and phone.",
    },
    {
      figure: "25+/wk",
      label: "Status Calls",
      desc: "Clients calling to ask 'what is happening with my file?' because there is no proactive communication system.",
    },
  ],
  problems: [
    {
      title: "Intake Takes Too Long",
      desc: "30-45 minutes per inquiry. Collecting basics, assessing eligibility, categorizing the visa type, routing to the right consultant. Done manually, it bottlenecks everything.",
    },
    {
      title: "Document Collection Is a Chase",
      desc: "Every visa category requires a different set of documents. Clients submit partially. Staff chase the rest through email and WhatsApp for weeks.",
    },
    {
      title: "Leads Go Cold Overnight",
      desc: "Prospective clients research immigration options in the evenings. If your firm does not respond until 9am, they have already contacted two other consultants.",
    },
    {
      title: "No Systematic Follow-Up",
      desc: "Clients at different stages need different communications at different intervals. Without automation, follow-up depends entirely on staff memory.",
    },
    {
      title: "Manual Reporting",
      desc: "Tracking file status by stage, consultant workload, and overdue items requires manually checking spreadsheets or CRM records one at a time.",
    },
  ],
  beforeAfterMetrics: [
    {
      label: "Intake Time",
      before: "45 min/client, manual",
      after: "Under 5 min, AI categorized",
      beforeW: 90,
      afterW: 10,
    },
    {
      label: "Document Chasing",
      before: "15 hrs/week",
      after: "Zero — auto-tracked",
      beforeW: 85,
      afterW: 5,
    },
    {
      label: "Evening Lead Capture",
      before: "Missed until morning",
      after: "Captured 24/7",
      beforeW: 100,
      afterW: 8,
    },
    {
      label: "Status Updates",
      before: "Manual, 25+ calls/week",
      after: "Auto at every file stage",
      beforeW: 80,
      afterW: 12,
    },
    {
      label: "Practice Reporting",
      before: "Manual spreadsheet review",
      after: "Weekly auto summary",
      beforeW: 75,
      afterW: 10,
    },
  ],
  workflowHeading: "Systems We Build for Immigration Consultants",
  workflowSteps: [
    { label: "Inquiry Arrives", type: "trigger" },
    { label: "AI Questions", type: "ai" },
    { label: "Visa Category", type: "ai" },
    { label: "CRM Record", type: "action" },
    { label: "Assign Consultant", type: "action" },
    { label: "Doc Checklist Sent", type: "action" },
    { label: "Consultation Booked", type: "outcome" },
  ],
  workflowBadge: "Intake: 45 min → under 5 min",
  controlItems: [
    {
      title: "Stop-Loss",
      desc: "Unrecognized visa categories or ambiguous cases flagged for human review. AI never categorizes uncertain cases automatically.",
    },
    {
      title: "Retries",
      desc: "Document upload failures trigger alternate delivery methods (email attachment fallback). No client submission lost to a technical issue.",
    },
    {
      title: "Approvals",
      desc: "Complex multi-applicant cases or high-value corporate immigration files require senior consultant approval before assignment.",
    },
    {
      title: "Logging",
      desc: "Full intake transcript, document submission trail, and all client communications stored per file. Complete audit trail for RCIC compliance requirements.",
    },
    {
      title: "PIPEDA Compliance",
      desc: "All client data stays in firm-controlled systems (your CRM, your drive). No data stored on third-party servers outside your control. Every data flow documented.",
    },
  ],
  roiMetrics: [
    { label: "Intake Time", before: "45 min", after: "Under 5 min" },
    { label: "Admin Hours", before: "18/week", after: "4/week" },
    { label: "Lead Response", before: "2-8 hours", after: "Under 3 minutes" },
    { label: "Status Calls", before: "25/week", after: "~6/week" },
    { label: "Billable Hours Recovered", after: "11+ hrs/week" },
    { label: "File Capacity", after: "20-30% more with same team" },
    { label: "Payback Period", after: "Within first billing cycle" },
  ],
  roiNote:
    "These are typical outcomes. The Automation Audit provides a projection for your specific practice.",
  bestFit: [
    "Immigration practices handling 30+ inquiries/month",
    "Multi-consultant firms where routing matters",
    "RCIC-regulated firms needing audit trails",
    "Firms experiencing after-hours inquiry volume",
  ],
  notFit: [
    "Firms with fewer than 10 inquiries per month",
    "Consultants who prefer to personally handle every first interaction",
  ],
  aeoQuestion: "How does AI automation help immigration consultants?",
  aeoAnswer:
    "AI automation helps immigration consultants by handling client intake (AI categorization by visa type into 8+ streams), document collection (dynamic checklists per visa category with automated 48-hour reminders), client status updates (automatic notifications at each file stage to reduce status calls by 60-70%), and practice reporting (weekly automated summaries of file status and consultant workload). Typical outcomes include intake time reduced from 45 minutes to under 5, admin hours cut from 18 to 4 per week, and capacity to handle 20-30% more client files with the same team.",
  faqItems: [
    {
      question: "Can the intake handle multiple languages?",
      answer:
        "Yes. Configured for English, French, and other languages your practice serves. Common for immigration firms with diverse client bases.",
    },
    {
      question: "Does it work with my CRM?",
      answer:
        "Yes. HubSpot, Zoho, Go High Level, and custom CRMs. If you currently use spreadsheets, we migrate you to a CRM as part of implementation.",
    },
    {
      question: "Is client data handled securely?",
      answer:
        "All data stays in your controlled systems. PIPEDA-aware design throughout. Every data flow documented for your records.",
    },
    {
      question: "How long to implement?",
      answer:
        "Standard immigration automation: 3-4 weeks from audit to live deployment including intake design, document portal setup, and CRM integration.",
    },
    {
      question: "Can it handle IRCC-specific requirements?",
      answer:
        "The system collects information aligned with common IRCC documentation requirements per visa category. Consultants retain full control over application content and submission.",
    },
    {
      question: "What about complex multi-applicant families?",
      answer:
        "The system handles individual and family applications with linked records and family-specific document checklists that cover all applicants.",
    },
    {
      question: "How much does this cost?",
      answer:
        "Immigration intake + document automation: $5,000-$10,000 CAD. Fixed pricing after free audit. Most firms see payback within the first billing cycle.",
    },
  ],
  ctaHeadline:
    "Your Consultants Were Hired for Their Expertise, Not to Chase Documents. Automate the Admin.",
  ctaBody:
    "Walk away with a clear plan for recovering 11+ billable hours per week. Free. No pitch. No obligation.",
  primaryCTA: "Get Your Free Immigration Consultants Automation Audit",
  primaryMicro: "Walk away with a clear plan. No pitch. No obligation.",
  internalLinks: [
    {
      label: "Client Intake Automation",
      href: "/services/client-intake-automation",
      desc: "Stop onboarding clients manually",
    },
    {
      label: "Document Collection",
      href: "/services/document-collection",
      desc: "Automate every document request",
    },
    {
      label: "AI Receptionist",
      href: "/services/ai-receptionist",
      desc: "24/7 inbound call handling",
    },
    {
      label: "After-Hours Automation",
      href: "/services/after-hours-automation",
      desc: "Capture leads while your team sleeps",
    },
    {
      label: "Case Studies",
      href: "/case-studies",
      desc: "Real results from real clients",
    },
  ],
};

export default function ImmigrationConsultants() {
  useEffect(() => {
    document.title = data.title;
  }, []);
  return <IndustryPageLayout data={data} heroVisual={<ImmigrationHeroVisual />} />;
}
