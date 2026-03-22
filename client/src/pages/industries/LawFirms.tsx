import { useEffect } from "react";
import IndustryPageLayout, { IndustryPageData } from "@/components/industry/IndustryPageLayout";
import LawFirmsHeroVisual from "@/components/hero-visuals/LawFirmsHeroVisual";
import IndustryPlannerCTA from "@/components/planner-cta/IndustryPlannerCTA";

const data: IndustryPageData = {
  title: "AI Automation for Law Firms Toronto | Protect Billable Hours | Barrana.ai",
  description:
    "Automate client intake, matter management, document exchange, billing, and status updates for law firms. Clio integrated. Free audit.",
  route: "law-firms",
  breadcrumb: "Law Firms",
  h1: "Every Non-Billable Hour Your Lawyers Spend on Admin Is Revenue That Disappears. Protect It.",
  subheadline:
    "Intake routes matters by practice area. Retainers generate for e-signature. Documents are requested and tracked. Billing cycles run on schedule. Your lawyers practice law.",
  body: [
    "Legal services depend on expertise and judgment. But law practices are also complex operational machines: intake, conflict checks, retainer management, document exchange, deadline tracking, billing, and client communication. Each process has administrative layers that consume non-billable time.",
    "A solo practitioner spending 2 hours per day on admin loses 500+ billable hours per year. At $300/hour, that is $150,000 in potential revenue consumed by tasks that require no legal training.",
  ],
  ctaMicro: "Calculate how many billable hours your firm loses to admin. Free audit.",
  costHeading: "What Administrative Overhead Costs Your Practice",
  costItems: [
    {
      figure: "$150,000+/yr",
      label: "Lost Billable Capacity",
      desc: "2+ hours/day per lawyer on non-billable admin. At $300/hour, that is $150,000+ per year in lost billable capacity per lawyer.",
    },
    {
      figure: "48+ hrs wait",
      label: "Inconsistent Intake",
      desc: "Some inquiries get same-day response. Others wait 48 hours. Quality depends on who sees the email first.",
    },
    {
      figure: "2-4 weeks",
      label: "Billing Delays",
      desc: "Time records compiled manually. Invoices generated when someone gets to it. Trust account reconciliation by hand.",
    },
  ],
  problems: [
    {
      title: "Intake Is Manual and Inconsistent",
      desc: "Inquiries through email, website, referrals, and phone. Without systematic processing, response quality and speed vary wildly.",
    },
    {
      title: "Client Communication Depends on Memory",
      desc: "Clients need status updates. Without automation, updates happen when someone remembers, not when the file moves.",
    },
    {
      title: "Billing Is Delayed and Manual",
      desc: "Time entries need compiling. Invoices need generating. Trust accounts need reconciling. Each step depends on a human doing it.",
    },
    {
      title: "Document Exchange Is Unstructured",
      desc: "Documents arrive via email threads. Missing items discovered at filing deadlines. No centralized tracking.",
    },
  ],
  beforeAfterMetrics: [
    {
      label: "Intake Response",
      before: "Manual, varies by day",
      after: "AI routes in under 3 min",
      beforeW: 85,
      afterW: 8,
    },
    {
      label: "Status Updates",
      before: "When someone remembers",
      after: "Auto at every stage change",
      beforeW: 80,
      afterW: 8,
    },
    {
      label: "Billing Cycle",
      before: "2-4 weeks delayed",
      after: "Auto on matter close",
      beforeW: 85,
      afterW: 10,
    },
    {
      label: "Documents",
      before: "Scattered email threads",
      after: "Structured portal + tracking",
      beforeW: 80,
      afterW: 12,
    },
    {
      label: "Matter Tracking",
      before: "Manual CRM/spreadsheet",
      after: "Automated pipeline + alerts",
      beforeW: 75,
      afterW: 8,
    },
  ],
  workflowHeading: "Systems We Build for Law Firms",
  workflowSteps: [
    { label: "Inquiry Arrives", type: "trigger" },
    { label: "AI Categorizes", type: "ai" },
    { label: "Matter Record", type: "action" },
    { label: "Assign to Lawyer", type: "action" },
    { label: "Conflict Check", type: "action" },
    { label: "Retainer Sent", type: "action" },
    { label: "Active Matter", type: "outcome" },
  ],
  workflowBadge: "Non-billable admin reduced 50-70%",
  controlItems: [
    {
      title: "Stop-Loss",
      desc: "Conflict check results flagged for lawyer review before any engagement proceeds. System never auto-approves conflicts.",
    },
    {
      title: "Retries",
      desc: "E-signature delivery failures retry with alternate email. Retainer process never stalls silently.",
    },
    {
      title: "Approvals",
      desc: "All substantive client communications remain under lawyer control. Automation handles only administrative correspondence.",
    },
    {
      title: "Logging",
      desc: "Every client interaction, document exchange, and billing event logged in matter record for complete audit trail.",
    },
    {
      title: "Escalation",
      desc: "Approaching court deadlines and limitation periods trigger escalation to responsible lawyer with full matter context.",
    },
  ],
  roiMetrics: [
    { label: "Non-Billable Admin", before: "2+ hrs/day", after: "Reduced 50-70% per lawyer" },
    { label: "Intake Response", before: "Hours, inconsistent", after: "Under 3 minutes" },
    { label: "Billing Delay", before: "2-4 weeks", after: "Automated" },
    { label: "Client Status Calls", before: "Frequent", after: "Reduced 60%+" },
    { label: "Matter Capacity", after: "Serve more without additional admin" },
    { label: "Payback Period", after: "Within first billing cycle" },
  ],
  roiNote:
    "These are typical outcomes. The Automation Audit provides a projection for your specific practice.",
  bestFit: [
    "Solo practitioners losing billable hours to admin",
    "Boutique firms (2-10 lawyers) with practice area routing needs",
    "Full-service firms wanting consistent intake across departments",
    "Firms using Clio, MyCase, or similar practice management",
  ],
  notFit: [
    "Firms with dedicated full-time admin handling all operations efficiently",
    "Practices with fewer than 10 new matters per month",
  ],
  aeoQuestion: "How does AI automation help law firms?",
  aeoAnswer:
    "AI automation helps law firms by handling client intake (categorization by practice area, matter record creation, lawyer assignment, and conflict check initiation), document management (structured requests with portal tracking), client status updates (automatic notifications when matter stages change), and billing automation (invoice generation from time tracking data with payment reminders). This protects billable hours by eliminating administrative overhead that does not require legal expertise.",
  faqItems: [
    {
      question: "Does it work for solo practitioners?",
      answer:
        "Yes. Solo practitioners benefit most because they have the least admin support and the most billable hours at risk.",
    },
    {
      question: "Clio integration?",
      answer:
        "Yes. Full integration with Clio for matter creation, time tracking, billing, and document management. Also MyCase and generic PM tools.",
    },
    {
      question: "Is automated communication appropriate for legal clients?",
      answer:
        "Automated communications handle administrative items only: acknowledgments, status updates, document requests, billing. All substantive legal communication remains under lawyer control.",
    },
    {
      question: "Confidentiality?",
      answer:
        "All data stays in your firm's controlled systems. We document every data flow. Built with solicitor-client privilege awareness.",
    },
    {
      question: "How long to implement?",
      answer:
        "Standard law firm automation: 3-5 weeks including intake design, billing integration, and testing.",
    },
    {
      question: "How much?",
      answer:
        "Law firm automation: $5,000-$12,000 CAD. Fixed pricing after audit. Typically pays for itself within the first month of recovered billable hours.",
    },
  ],
  ctaHeadline:
    "Your Lawyers Were Not Hired to Do Data Entry. Protect the Billable Hours. Automate the Admin.",
  ctaBody:
    "Walk away with a clear plan for recovering 500+ billable hours per year. Free. No pitch. No obligation.",
  primaryCTA: "Get Your Free Law Firms Automation Audit",
  primaryMicro: "Walk away with a clear plan. No pitch. No obligation.",
  internalLinks: [
    {
      label: "Client Intake Automation",
      href: "/services/client-intake-automation",
      desc: "Consistent intake every inquiry",
    },
    {
      label: "Document Collection",
      href: "/services/document-collection",
      desc: "Structured requests + portal tracking",
    },
    {
      label: "Invoice Automation",
      href: "/services/invoice-automation",
      desc: "Billing on matter close, automated",
    },
    {
      label: "Operations Reporting",
      href: "/services/operations-reporting",
      desc: "Practice visibility delivered weekly",
    },
    {
      label: "Case Studies",
      href: "/case-studies",
      desc: "Real results from real clients",
    },
  ],
};

export default function LawFirms() {
  useEffect(() => {
    document.title = data.title;
  }, []);
  return (
    <IndustryPageLayout data={data} heroVisual={<LawFirmsHeroVisual />}>
      <IndustryPlannerCTA industryName="Law Firms" industrySlug="law-firm" />
    </IndustryPageLayout>
  );
}
