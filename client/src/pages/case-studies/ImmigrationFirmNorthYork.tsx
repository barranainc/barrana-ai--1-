import { useEffect } from "react";
import CaseStudyPageLayout, { CaseStudyData } from "@/components/case-study/CaseStudyPageLayout";

const data: CaseStudyData = {
  title: "Immigration Firm Automation Case Study | 14 Hours Recovered | Barrana.ai",
  description:
    "How a 2-consultant immigration firm in North York automated intake, document collection, and status updates. Recovered 14 staff hours per week. Capacity up 25%.",
  slug: "immigration-firm-north-york",
  industry: "Immigration Consulting",
  location: "North York, Toronto",
  teamSize: "2 consultants + 1 admin",
  relatableIndustries: [
    "Immigration Consultants",
    "Law Firms",
    "Accounting Firms",
    "Financial Advisors",
  ],
  h1: "How a 2-Consultant Immigration Firm Recovered 14 Hours Per Week and Increased Capacity by 25%",
  subheadline:
    "Intake time dropped from 45 minutes to under 5. Document collection went from 3-week chase to a 9-day automated system. Status calls dropped by 70%. The consultants finally had time to consult.",
  intro:
    "This North York immigration practice was handling 60+ inquiries per month with a team of two consultants and one administrative assistant. The admin was spending almost her entire day on intake processing, document chasing, and answering status calls. Something had to change.",
  businessDescription:
    "A RCIC-regulated immigration consulting firm in North York specializing in Express Entry, Provincial Nominee Programs, and Family Sponsorship. Two consultants, one full-time administrative assistant, serving a diverse client base across the GTA. Average 60 inquiries per month from website, referrals, and community events.",
  problemHeading: "What Was Breaking",
  problemBody: [
    "Every new inquiry required 30-45 minutes of manual intake: collecting personal information, assessing visa eligibility, determining the visa category, entering data into the CRM, and scheduling a consultation. With 60 inquiries per month, that consumed over 30 hours of admin time monthly.",
    "Document collection was a weeks-long email chase. Each visa category requires 10-20 specific documents. Average collection time: 18-21 days. During peak periods, the admin was spending 15 hours per week just on document follow-up.",
    "Clients called constantly to ask about their file status. With no proactive update system, 25+ calls per week came in asking 'What is happening with my application?' Each call took 5-10 minutes of whoever answered.",
    "Evening inquiries (approximately 40% of total volume) sat unanswered until the next morning. The firm was losing an estimated 8-10 qualified leads per month to overnight response delay.",
  ],
  beforeMetrics: [
    { label: "Intake time per client", value: "45 min" },
    { label: "Document collection average", value: "18-21 days" },
    { label: "Status inquiry calls/week", value: "25+" },
    { label: "Evening lead capture", value: "0%" },
    { label: "Admin hours on intake/docs", value: "18 hrs/week" },
  ],
  solutionIntro:
    "We deployed a 4-workflow automation system covering intake, document collection, status communication, and evening lead capture. The system was designed to work within their existing Zoho CRM, requiring zero software changes for the team.",
  workflowSteps: [
    {
      id: "inquiry-arrives",
      label: "Inquiry Arrives",
      sublabel: "Web form, email, or after-hours voicemail",
      type: "trigger",
      icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
      color: "#F59E0B",
    },
    {
      id: "ai-categorizes",
      label: "AI Categorizes Visa",
      sublabel: "AI assesses eligibility and routes to correct visa pathway",
      type: "ai",
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      color: "#7E0F4A",
    },
    {
      id: "document-portal",
      label: "Document Portal Sent",
      sublabel: "Automated portal deployed with visa-specific document checklist",
      type: "action",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
      color: "#283891",
    },
    {
      id: "status-update",
      label: "Status Update",
      sublabel: "Proactive file status delivered to client via SMS/email",
      type: "outcome",
      icon: "M5 13l4 4L19 7",
      color: "#10B981",
    },
  ],
  controlItems: [
    {
      title: "Stop-Loss",
      desc: "Unrecognized visa categories flagged as 'Requires Human Review'. Approximately 8% in first month, dropping to 3% after refinement.",
    },
    {
      title: "Retries",
      desc: "Document upload failures triggered alternate submission guidance. CRM write failures retried 3x.",
    },
    {
      title: "Approvals",
      desc: "Multi-applicant family cases and corporate LMIA required senior consultant approval.",
    },
    {
      title: "Logging",
      desc: "Complete audit trail per file: every question, answer, document, reminder, and status update. Timestamped for RCIC compliance.",
    },
    {
      title: "PIPEDA",
      desc: "All data in firm's Zoho CRM and Google Drive. No third-party storage outside firm control.",
    },
  ],
  tools: [
    "Zoho CRM",
    "Make (Integromat)",
    "OpenAI",
    "Google Drive",
    "Twilio",
    "Typeform",
    "Google Calendar",
  ],
  results: [
    {
      label: "Intake time",
      before: "45 min",
      after: "Under 5 min",
      beforeW: 90,
      afterW: 15,
    },
    {
      label: "Document collection",
      before: "18-21 days",
      after: "9 days avg",
      beforeW: 85,
      afterW: 30,
    },
    {
      label: "Staff hours on admin",
      before: "18/week",
      after: "4/week",
      beforeW: 90,
      afterW: 20,
    },
    {
      label: "Status inquiry calls",
      before: "25/week",
      after: "~8/week (68% drop)",
      beforeW: 85,
      afterW: 25,
    },
    {
      label: "Evening lead capture",
      before: "0%",
      after: "100%",
      beforeW: 85,
      afterW: 10,
    },
  ],
  implementationTimeline: "4 weeks from audit to full deployment",
  investmentRange: "$6,000–$10,000 CAD (fixed-price)",
  payback: "Within first billing cycle",
  keyResultCallout:
    "14 staff hours recovered per week. 11 additional billable consultant hours. 25% more client files handled with the same 3-person team. Document collection time cut in half. Status calls reduced by 68%.",
  whyItMatters:
    "This case study demonstrates what happens when you automate the coordination layer of a professional services practice. The expertise stays human. The admin becomes systematic.",
  whyBullets: [
    "Your intake process takes 30+ minutes per client",
    "Your team spends hours chasing documents through email",
    "Clients call constantly to ask for status updates",
    "You lose leads because you cannot respond after hours",
    "Your admin staff spend most of their time on tasks that do not require their expertise",
  ],
  crossIndustryItems: [
    { industry: "Immigration Consultants", note: "Exact scenario described." },
    {
      industry: "Law Firms",
      note: "Same intake/document/billing patterns with practice area routing.",
    },
    {
      industry: "Accounting Firms",
      note: "Document collection is nearly identical, especially during tax season.",
    },
    {
      industry: "Financial Advisors",
      note: "KYC document collection follows the same portal + reminder pattern.",
    },
    {
      industry: "Professional Services",
      note: "Intake + documents + status communication is universal.",
    },
  ],
  ctaHeadline:
    "Your Practice Has the Same Bottlenecks. The Solution Is the Same. The Workflows Are Customized to You.",
  ctaBody:
    "The free audit maps your specific intake, document, and communication workflows and delivers a plan to automate them within 30 days.",
  internalLinks: [
    {
      label: "Immigration Consultants",
      href: "/industries/immigration-consultants",
    },
    {
      label: "Client Intake Automation",
      href: "/services/client-intake-automation",
    },
    { label: "Document Collection", href: "/services/document-collection" },
    {
      label: "After-Hours Automation",
      href: "/services/after-hours-automation",
    },
    { label: "All Case Studies", href: "/case-studies" },
  ],
  color: "#283891",
};

export default function ImmigrationFirmNorthYork() {
  useEffect(() => {
    document.title = data.title;
  }, []);
  return <CaseStudyPageLayout data={data} />;
}
