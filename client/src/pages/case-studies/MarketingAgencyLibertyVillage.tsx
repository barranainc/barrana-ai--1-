import { useEffect } from "react";
import CaseStudyPageLayout, { CaseStudyData } from "@/components/case-study/CaseStudyPageLayout";

const data: CaseStudyData = {
  title: "Marketing Agency Automation Case Study | 40% More Clients | Barrana.ai",
  description:
    "How a Toronto digital marketing agency automated onboarding, reporting, invoicing, and handoffs. Grew from 12 to 17 clients without operations staff.",
  slug: "marketing-agency-liberty-village",
  industry: "Marketing Agencies",
  location: "Liberty Village, Toronto",
  teamSize: "Founder + 2 account managers + 3 specialists",
  relatableIndustries: [
    "Marketing Agencies",
    "Consulting Firms",
    "Tutoring Centers",
    "Property Management",
  ],
  h1: "How a 6-Person Agency Went From 12 Clients to 17 Without Hiring an Operations Manager",
  subheadline:
    "Onboarding dropped from 2 weeks to 48 hours. Monthly reports generated automatically. Invoices triggered on milestones. Project handoffs never dropped again.",
  intro:
    "This Liberty Village digital marketing agency was running at capacity with 12 clients. Not because the creative work was slow, but because operational overhead consumed every spare moment. The founder was considering a $60,000+/year full-time operations hire. Instead, they automated.",
  businessDescription:
    "A digital marketing agency in Liberty Village, Toronto. Services: social media, Google/Meta advertising, content, email marketing. Founder/strategy, 2 account managers, 3 specialists. Using Monday.com. 12 active client accounts. Average retainer: $3,500/month.",
  problemBody: [
    "Client onboarding took 1-2 weeks. Collecting access credentials, brand guidelines, and strategy questionnaires happened through scattered email threads.",
    "Monthly reporting consumed 4-6 hours per client. 12 clients = 48-72 hours per month on reporting alone.",
    "Project handoffs happened via Slack. Missed handoffs were the #1 source of deadline issues.",
    "Invoicing was disconnected from delivery. Milestones completed but invoices waited until someone noticed. Average delay: 1-2 weeks.",
  ],
  beforeMetrics: [
    { label: "Client onboarding time", value: "1-2 weeks" },
    { label: "Monthly reporting time", value: "4-6 hrs/client" },
    { label: "Total reporting/month", value: "48-72 hrs" },
    { label: "Invoice delay", value: "1-2 weeks" },
    { label: "Client capacity", value: "12 (at limit)" },
  ],
  solutionIntro:
    "We automated onboarding, reporting, handoffs, and invoicing - integrated with Monday.com and the agency's ad platforms. Goal: create enough operational capacity to take on 40% more clients without the $60K ops hire.",
  workflowSteps: [
    {
      id: "step-1",
      label: "Contract Signed",
      sublabel: "New client contract execution triggers full onboarding sequence",
      type: "trigger",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
      color: "#F59E0B",
    },
    {
      id: "step-2",
      label: "48hr Onboarding Portal",
      sublabel: "Client receives branded portal to submit credentials, brand assets, and strategy brief",
      type: "action",
      icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
      color: "#283891",
    },
    {
      id: "step-3",
      label: "Month-End: API Data Pull + Report Build",
      sublabel: "Ad platform data pulled automatically, report built and sent for AM review",
      type: "ai",
      icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
      color: "#7E0F4A",
    },
    {
      id: "step-4",
      label: "Milestone Complete → Invoice Sent",
      sublabel: "Milestone completion in Monday.com triggers immediate invoice via Stripe/QuickBooks",
      type: "outcome",
      icon: "M5 13l4 4L19 7",
      color: "#10B981",
    },
  ],
  controlItems: [
    {
      title: "Stop-Loss",
      desc: "Reports with missing data sources flagged with warning rather than sent to client with incomplete data.",
    },
    {
      title: "Retries",
      desc: "API pull failures retry 3x before generating partial report with gap indicators.",
    },
    {
      title: "Approvals",
      desc: "Monthly reports require account manager review before client delivery. Never sent without human sign-off.",
    },
    {
      title: "Logging",
      desc: "All deliveries, approvals, and milestone completions logged for SLA tracking.",
    },
    {
      title: "Escalation",
      desc: "Projects approaching deadline with incomplete milestones escalate to founder.",
    },
  ],
  tools: [
    "Monday.com",
    "Make (Integromat)",
    "Google Ads API",
    "Meta Marketing API",
    "Google Analytics API",
    "Google Slides",
    "Stripe/QuickBooks",
  ],
  results: [
    {
      label: "Client onboarding",
      before: "1-2 weeks",
      after: "48 hours",
      beforeW: 90,
      afterW: 15,
    },
    {
      label: "Monthly reporting",
      before: "4-6 hrs/client",
      after: "30 min/client (commentary only)",
      beforeW: 85,
      afterW: 15,
    },
    {
      label: "Total reporting/month",
      before: "48-72 hrs",
      after: "~8 hrs",
      beforeW: 90,
      afterW: 10,
    },
    {
      label: "Client capacity",
      before: "12",
      after: "17 (40% increase)",
      beforeW: 40,
      afterW: 80,
    },
    {
      label: "Ops hire cost",
      before: "$60K+/year",
      after: "Avoided",
      beforeW: 85,
      afterW: 5,
    },
  ],
  implementationTimeline: "4 weeks",
  investmentRange: "$7,000–$10,000 CAD",
  payback: "Immediate (avoided $60K hire + 5 new clients)",
  keyResultCallout:
    "40% more clients with same team. $60,000+ operations hire avoided. Monthly reporting reduced from 72 hours to 8 hours. Onboarding from 2 weeks to 48 hours. Zero missed handoffs.",
  whyItMatters:
    "Agencies sell efficiency but often run on chaos internally. The constraint on agency growth is usually not creative talent or sales - it is operations overhead. Automating the coordination layer creates capacity to grow without proportional ops hiring.",
  whyBullets: [
    "You are at capacity with current client count",
    "Onboarding new clients takes longer than it should",
    "Monthly reporting consumes days of your team's time",
    "Project handoffs depend on Slack messages being seen",
    "You are considering hiring an operations person to manage the workload",
  ],
  crossIndustryItems: [
    { industry: "Marketing/Creative Agencies", note: "Exact scenario." },
    {
      industry: "Consulting Firms",
      note: "Client onboarding and reporting follow same patterns.",
    },
    {
      industry: "Tutoring/Education Centers",
      note: "Student enrollment and progress reporting structurally similar.",
    },
    {
      industry: "Property Management",
      note: "Scaling client count without proportional staff is the same challenge.",
    },
    {
      industry: "Any Service Business",
      note: "Operational overhead limiting client capacity is universal.",
    },
  ],
  ctaHeadline:
    "Your Capacity Ceiling Is Not Creative Talent. It Is Operational Overhead. Remove It.",
  ctaBody:
    "The audit maps your operational overhead per client and shows you where automation creates the capacity to grow.",
  internalLinks: [
    { label: "Marketing Agencies", href: "/industries/marketing-agencies" },
    { label: "Workflow Automation", href: "/services/workflow-automation" },
    { label: "Operations Reporting", href: "/services/operations-reporting" },
    { label: "Invoice Automation", href: "/services/invoice-automation" },
    { label: "All Case Studies", href: "/case-studies" },
  ],
  color: "#7E0F4A",
};

export default function MarketingAgencyLibertyVillage() {
  useEffect(() => {
    document.title = data.title;
  }, []);
  return <CaseStudyPageLayout data={data} />;
}
