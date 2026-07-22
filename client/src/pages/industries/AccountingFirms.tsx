import { useEffect } from "react";
import IndustryPageLayout, { IndustryPageData } from "@/components/industry/IndustryPageLayout";
import IndustryPlannerCTA from "@/components/planner-cta/IndustryPlannerCTA";

const data: IndustryPageData = {
  title: "AI Automation for Accounting Firms | Tax Season Without the Chaos | Barrana.ai",
  description:
    "Automate tax document collection, client onboarding, invoicing, and capacity planning for accounting practices. QuickBooks integrated. Free audit.",
  route: "accounting-firms",
  breadcrumb: "Accounting Firms",
  h1: "Tax Season Exposes Every Inefficiency in Your Practice. Automation Fixes Them Before Next Season Starts.",
  subheadline:
    "Document collection runs itself. Invoices trigger on completion. Client onboarding is consistent every time. Your team prepares returns instead of chasing receipts.",
  body: [
    "The most profitable time in your firm's year is also the most chaotic. Staff spend 2-3 hours per day chasing documents instead of preparing returns. Invoices go out weeks late. New client onboarding varies by whoever answers the phone.",
    "These problems are not seasonal. They exist year-round. Tax season just makes them visible. Automation solves the underlying operational gaps so every period runs smoothly.",
  ],
  ctaMicro: "See how much capacity you are losing to document chasing. Free audit.",
  costHeading: "What Manual Processes Cost Your Firm",
  costItems: [
    {
      figure: "50-75 hrs/wk",
      label: "Document Follow-Up",
      desc: "2-3 hours/day per staff member sending reminders and chasing documents. For a 5-person firm during peak season.",
    },
    {
      figure: "2-4 weeks",
      label: "Invoice Delays",
      desc: "Billing depends on someone noticing a file is done and remembering to generate the invoice. Cash flow suffers every cycle.",
    },
    {
      figure: "Capacity Lost",
      label: "Tax Season Ceiling",
      desc: "You turn away clients not because your team is not skilled, but because admin tasks consume half their day during peak periods.",
    },
  ],
  problems: [
    {
      title: "Document Chasing Consumes the Day",
      desc: "Every client needs T4s, receipts, investment statements, and more. Staff spend more time requesting and tracking documents than preparing returns.",
    },
    {
      title: "Onboarding Is Inconsistent",
      desc: "Different staff handle new clients differently. Some clients get an engagement letter same-day. Others wait a week for a callback.",
    },
    {
      title: "Invoicing Depends on Memory",
      desc: "Work finishes. The invoice goes out when someone remembers. Sometimes that is 3 weeks later. Sometimes it does not go out at all.",
    },
    {
      title: "No Seasonal Capacity Visibility",
      desc: "You do not know which files are approaching CRA deadline, which clients have not submitted documents, or which staff are overloaded until problems emerge.",
    },
  ],
  beforeAfterMetrics: [
    {
      label: "Document Follow-Up",
      before: "2-3 hrs/day per staff",
      after: "Zero - system-managed",
      beforeW: 90,
      afterW: 5,
    },
    {
      label: "Collection Time",
      before: "18 days average",
      after: "9 days average",
      beforeW: 80,
      afterW: 40,
    },
    {
      label: "Client Onboarding",
      before: "Varies by staff member",
      after: "Consistent every time",
      beforeW: 70,
      afterW: 12,
    },
    {
      label: "Invoice Delay",
      before: "2-4 weeks post-completion",
      after: "Same day (QuickBooks auto)",
      beforeW: 85,
      afterW: 5,
    },
    {
      label: "Capacity Visibility",
      before: "Manual spreadsheet check",
      after: "Weekly auto report Mon AM",
      beforeW: 75,
      afterW: 10,
    },
  ],
  workflowHeading: "Systems We Build for Accounting Firms",
  workflowSteps: [
    { label: "Engagement Starts", type: "trigger" },
    { label: "Doc Request Sent", type: "action" },
    { label: "Upload Portal", type: "action" },
    { label: "Track Progress", type: "ai" },
    { label: "48hr Reminders", type: "action" },
    { label: "Accountant Notified", type: "action" },
    { label: "Invoice Auto-Sent", type: "outcome" },
  ],
  workflowBadge: "Collection: 18 days → 9 days",
  controlItems: [
    {
      title: "Stop-Loss",
      desc: "Wrong document type (e.g., last year's T4 instead of current year) flagged for review rather than silently accepted into the file.",
    },
    {
      title: "Retries",
      desc: "Failed email deliveries retry 3 times then alert staff with alternate client contact information.",
    },
    {
      title: "Approvals",
      desc: "Invoices above a partner-defined threshold require partner review before sending to client.",
    },
    {
      title: "Logging",
      desc: "Every document upload, reminder sent, and notification delivered timestamped in full audit trail.",
    },
    {
      title: "Escalation",
      desc: "Files approaching CRA filing deadline with outstanding documents trigger escalation to practice manager with specific missing items listed.",
    },
  ],
  roiMetrics: [
    { label: "Document Collection", before: "18 days", after: "9 days average" },
    { label: "Staff Chasing Hours", before: "15-20/week", after: "Zero" },
    { label: "Invoice Delay", before: "2-4 weeks", after: "Same day" },
    { label: "Tax Season Capacity", after: "30% increase, same team" },
    { label: "Files Processed", after: "215 → 280 (4-person team)" },
    { label: "New Client Onboarding", after: "Consistent every time" },
    { label: "Payback Period", after: "Within first engagement cycle" },
  ],
  roiNote:
    "These are typical outcomes. The Automation Audit provides a projection for your specific practice.",
  bestFit: [
    "Accounting firms handling 50+ client files per season",
    "Multi-staff practices where document collection is a major bottleneck",
    "Firms using QuickBooks, Xero, or FreshBooks",
    "Practices wanting to grow capacity without hiring",
  ],
  notFit: [
    "Solo bookkeepers with fewer than 20 clients",
    "Firms that have already fully digitized their document collection",
  ],
  aeoQuestion: "How does AI automation help accounting firms?",
  aeoAnswer:
    "AI automation helps accounting firms by automating document collection (personalized requests with secure upload portals, real-time tracking, and 48-hour reminders), client onboarding (consistent digital engagement sequences), invoice generation (triggered automatically on project completion via QuickBooks), and seasonal capacity planning (automated deadline tracking and workload summaries). Typical outcomes include document collection time cut in half, invoice delays eliminated, and tax season capacity increased by 30% with the same team.",
  faqItems: [
    {
      question: "Does it integrate with TaxCycle or Profile?",
      answer:
        "We integrate at the CRM and project management layer. Automation handles collection, tracking, and billing. Your team uses their preferred tax preparation tools.",
    },
    {
      question: "Can it handle different engagement types?",
      answer:
        "Yes. Dynamic checklists and workflows adjust per engagement: T1 personal, T2 corporate, bookkeeping review, HST filing, and custom categories.",
    },
    {
      question: "QuickBooks integration?",
      answer:
        "Full QuickBooks Online integration: invoice generation, payment tracking, reminder sequences, and reconciliation automated.",
    },
    {
      question: "What is the ROI for a typical 5-person firm?",
      answer:
        "Estimated 15-20 staff hours/week saved during peak season, 5-8 hours/week outside peak. At average billing rates, that is significant recovered capacity.",
    },
    {
      question: "How long to implement?",
      answer:
        "Standard accounting automation: 3-4 weeks. Recommend starting at least 6 weeks before tax season.",
    },
    {
      question: "What about CRA compliance?",
      answer:
        "Automation tracks CRA filing deadlines and sends alerts. All document trails are maintained for audit purposes.",
    },
    {
      question: "How much does it cost?",
      answer:
        "Accounting firm automation: $5,000-$12,000 CAD depending on workflow count. Fixed pricing after audit.",
    },
  ],
  ctaHeadline:
    "Tax Season Should Be Profitable, Not Chaotic. Automate the Admin That Slows Your Firm Down.",
  ctaBody:
    "Walk away with a clear plan for cutting document collection time in half. Free. No pitch. No obligation.",
  primaryCTA: "Get Your Free Accounting Firms Automation Audit",
  primaryMicro: "Walk away with a clear plan. No pitch. No obligation.",
  internalLinks: [
    {
      label: "Document Collection",
      href: "/services/document-collection",
      desc: "Automate every document request",
    },
    {
      label: "Invoice Automation",
      href: "/services/invoice-automation",
      desc: "Invoices sent the day work is done",
    },
    {
      label: "Client Intake Automation",
      href: "/services/client-intake-automation",
      desc: "Onboard clients without manual work",
    },
    {
      label: "Operations Reporting",
      href: "/services/operations-reporting",
      desc: "Weekly reports delivered automatically",
    },
    {
      label: "Case Studies",
      href: "/case-studies",
      desc: "Real results from real clients",
    },
  ],
};

export default function AccountingFirms() {
  useEffect(() => {
    document.title = data.title;
  }, []);
  return (
    <IndustryPageLayout data={data}>
      <IndustryPlannerCTA industryName="Accounting Firms" industrySlug="accountant" />
    </IndustryPageLayout>
  );
}
