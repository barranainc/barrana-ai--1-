import { useEffect } from "react";
import IndustryPageLayout, { IndustryPageData } from "@/components/industry/IndustryPageLayout";
import TemplateScalingCapacityBar from "@/components/hero-visuals/TemplateScalingCapacityBar";

const data: IndustryPageData = {
  title: "AI Automation for Property Management Companies Toronto | Barrana.ai",
  description:
    "Automate tenant communications, maintenance requests, lease renewals, rent reminders, and owner reporting for property management companies. Free audit.",
  route: "property-management",
  breadcrumb: "Property Management",
  h1: "Managing 50+ Units With a 3-Person Team? Automation Is How You Scale to 200 Without Hiring Five More.",
  subheadline:
    "Maintenance requests logged and routed automatically. Rent reminders on schedule. Lease renewals triggered 90 days out. Owner reports generated weekly. Tenant communications consistent and documented.",
  body: [
    "Property management is a volume business. Every additional unit generates tenant communications, maintenance coordination, owner reporting, and lease administration. At 50 units, a 3-person team can manage. At 150 units, without systems, the same team drowns.",
    "The companies that scale profitably automate the coordination layer: maintenance routing, rent collection reminders, lease tracking, and owner reporting. The team handles relationships and decision-making.",
  ],
  ctaMicro: "See how many management hours you can recover per unit. Free audit.",

  costHeading: "What Manual Operations Cost Property Managers",
  costItems: [
    {
      figure: "Days",
      label: "Maintenance Response Delay",
      desc: "Tenant submits request. It goes to an email inbox. Someone sees it when they check. Urgent requests get lost among routine ones.",
    },
    {
      figure: "Awkward",
      label: "Manual Rent Follow-Up",
      desc: "Late rent requires follow-up. Without automation, reminders depend on someone making uncomfortable phone calls.",
    },
    {
      figure: "Hours/Portfolio",
      label: "Monthly Owner Reporting",
      desc: "Each owner wants monthly updates. Compiling property-specific financials and maintenance logs manually is a full-day task.",
    },
  ],

  problems: [
    {
      title: "Maintenance Requests Get Lost",
      desc: "Tenants call, email, and text. Requests end up in different places. Urgent items are not triaged from routine ones. Response times are inconsistent.",
    },
    {
      title: "Lease Renewals Sneak Up",
      desc: "Without systematic tracking, lease expirations are discovered 2 weeks before expiry instead of 90 days.",
    },
    {
      title: "Rent Collection Is Awkward and Manual",
      desc: "Late rent needs follow-up. Without automation, it depends on a person making uncomfortable calls or sending handwritten emails.",
    },
    {
      title: "Owner Reporting Consumes Days",
      desc: "Each property owner wants monthly financial summaries, maintenance logs, and occupancy reports. Built manually from multiple systems.",
    },
  ],

  beforeAfterMetrics: [
    { label: "Maintenance Routing", before: "Unstructured calls/emails/texts", after: "Portal with priority triage", beforeW: 85, afterW: 10 },
    { label: "Lease Tracking", before: "Spreadsheet, surprises at expiry", after: "90/60/30-day automated sequence", beforeW: 90, afterW: 10 },
    { label: "Rent Follow-Up", before: "Manual, uncomfortable calls", after: "Auto reminders 1/5/10 days late", beforeW: 80, afterW: 8 },
    { label: "Owner Reports", before: "Hours per property per month", after: "Auto-generated monthly", beforeW: 88, afterW: 8 },
    { label: "Tenant Communication", before: "Inconsistent, undocumented", after: "Templated, logged, consistent", beforeW: 80, afterW: 8 },
  ],

  workflowHeading: "Systems We Build for Property Managers",
  workflowSteps: [
    { label: "Maintenance Request", type: "trigger" },
    { label: "AI Priority Triage", type: "ai" },
    { label: "Vendor Assigned", type: "action" },
    { label: "Tenant Updated", type: "action" },
    { label: "Lease Renewal (90d)", type: "action" },
    { label: "Owner Report", type: "action" },
    { label: "Portfolio Scaled", type: "outcome" },
  ],
  workflowBadge: "Scale to 200 units, same team",

  controlItems: [
    {
      title: "Stop-Loss",
      desc: "Emergency maintenance (flooding, fire, gas) triggers immediate multi-channel alert: property manager SMS + emergency vendor dispatch + tenant safety instructions.",
    },
    {
      title: "Retries",
      desc: "Rent reminder delivery failures retry via alternate channel. No tenant claims they never received notice.",
    },
    {
      title: "Approvals",
      desc: "Maintenance expenditures above threshold require owner approval before vendor dispatch.",
    },
    {
      title: "Logging",
      desc: "All tenant communications, maintenance requests, and financial transactions logged per unit for legal documentation.",
    },
    {
      title: "Escalation",
      desc: "Rent unpaid beyond defined threshold triggers escalation to property manager with full payment history and communication log.",
    },
  ],

  roiMetrics: [
    { label: "Maintenance Response", before: "Inconsistent, days", after: "Priority-triaged same-day" },
    { label: "Lease Renewals", before: "Surprise at expiry", after: "90-day managed process" },
    { label: "Rent Collection", before: "Manual awkward calls", after: "Automated sequence" },
    { label: "Owner Reporting", before: "Hours per property", after: "Auto-generated" },
    { label: "Units Per Staff Member", after: "Significant increase" },
    { label: "Payback Period", after: "Within first quarter" },
  ],
  roiNote:
    "These are typical outcomes. The Automation Audit provides a projection for your specific business.",

  bestFit: [
    "Property management companies managing 50+ residential units",
    "Commercial property managers with multiple buildings",
    "Companies scaling their portfolio faster than their admin team",
    "Firms managing on behalf of multiple owners requiring individual reporting",
  ],
  notFit: [
    "Landlords managing 1-5 personal properties",
    "Companies without basic digital tools for property records",
  ],

  aeoQuestion: "How does AI automation help property management companies?",
  aeoAnswer:
    "AI automation helps property management companies by structuring maintenance request intake with priority routing (emergency, urgent, routine), automating lease renewal sequences starting 90 days before expiry, running rent collection reminders at defined intervals, generating monthly owner reports from financial and maintenance data, and standardizing tenant move-in/move-out processes. This allows management companies to scale their unit count significantly without proportional staff increases.",

  faqItems: [
    {
      question: "Which PM software?",
      answer: "We integrate with Buildium, AppFolio, Yardi, RentManager, and custom property management systems.",
    },
    {
      question: "Can tenants submit maintenance via text?",
      answer: "Yes. Text, portal, email, or phone. All routed into the same structured system.",
    },
    {
      question: "How does emergency maintenance work?",
      answer: "Emergency keywords (flood, fire, no heat, gas smell) trigger immediate multi-channel alerts bypassing normal routing.",
    },
    {
      question: "Owner reporting customization?",
      answer: "Each owner can receive a customized report template with metrics specific to their property.",
    },
    {
      question: "How long?",
      answer: "Standard property management automation: 4-6 weeks due to multi-property complexity.",
    },
    {
      question: "How much?",
      answer: "Property management automation: $8,000-$15,000 CAD depending on portfolio size and workflow count.",
    },
  ],

  ctaHeadline:
    "Your Portfolio Is Growing. Your Team Size Is Not. Automate the Coordination That Limits Your Scale.",
  ctaBody:
    "Walk away with a clear plan for managing 2-3x more units with your current team. Free. No pitch. No obligation.",
  primaryCTA: "Get Your Free Property Managers Automation Audit",
  primaryMicro: "Walk away with a clear plan. No pitch. No obligation.",

  internalLinks: [
    { label: "Operations Reporting", href: "/services/operations-reporting", desc: "Automated dashboards and reports" },
    { label: "Workflow Automation", href: "/services/workflow-automation", desc: "Connect your tools through automation" },
    { label: "CRM Automation", href: "/services/crm-automation", desc: "Your CRM stays current automatically" },
    { label: "Service Businesses", href: "/industries/service-businesses", desc: "Automation for all service operations" },
  ],
};

export default function PropertyManagement() {
  useEffect(() => {
    document.title = data.title;
  }, []);
  return <IndustryPageLayout data={data} heroVisual={<TemplateScalingCapacityBar currentCapacity={65} newCapacity={120} unit="units" adminOverhead={45} />} />;
}
