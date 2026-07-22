import { useEffect } from "react";
import CaseStudyPageLayout, { CaseStudyData } from "@/components/case-study/CaseStudyPageLayout";

const data: CaseStudyData = {
  title: "Law Firm Automation Case Study | 500+ Billable Hours Saved | Barrana.ai",
  description:
    "How a 3-lawyer boutique firm in Toronto automated intake, billing, document exchange, and status updates. Recovered 500+ billable hours annually.",
  slug: "law-firm-toronto",
  industry: "Law Firms",
  location: "Toronto, ON (King West)",
  teamSize: "3 lawyers + 1 legal assistant",
  relatableIndustries: [
    "Law Firms",
    "Immigration Consultants",
    "Financial Advisors",
    "Mortgage Brokers",
  ],
  h1: "How a 3-Lawyer Firm Recovered 500+ Billable Hours Per Year Without Hiring a Single Admin",
  subheadline:
    "Intake categorized by practice area automatically. Billing triggered on matter milestones. Client status calls dropped 65%. The lawyers practiced law instead of managing spreadsheets.",
  intro:
    "Three lawyers. One legal assistant. Family law, real estate closings, and corporate matters. Each lawyer was losing 1.5-2 hours per day to non-billable tasks. At $350/hour average billing rate, that was over $180,000 per year in lost billable capacity.",
  businessDescription:
    "A boutique law firm in King West, Toronto handling family law, residential real estate closings, and small business corporate matters. Three lawyers (two partners, one associate) with one legal assistant. Using Clio for practice management. 15-20 new matters per month.",
  problemBody: [
    "Intake was manual and inconsistent. Response times ranged from same-day to 3 days depending on who saw it first.",
    "Each lawyer built invoices manually from time entries. Monthly billing took 4-6 hours per lawyer.",
    "Document exchange happened through email threads. Missing documents discovered at filing deadlines.",
    "Clients called for status updates 20+ times per week, each taking 5-10 minutes.",
  ],
  beforeMetrics: [
    { label: "Admin time per lawyer/day", value: "1.5-2 hrs" },
    { label: "Intake response time", value: "1-3 days" },
    { label: "Monthly billing time", value: "4-6 hrs/lawyer" },
    { label: "Status calls/week", value: "20+" },
    { label: "Billable hours lost/year", value: "500+" },
  ],
  solutionIntro:
    "We deployed automation across intake, billing, document management, and client communication - all built on Clio and Gmail. The lawyers' workflow changed minimally. The administrative overhead disappeared.",
  workflowSteps: [
    {
      id: "inquiry-arrives",
      label: "Inquiry Arrives",
      sublabel: "Web form, email, or phone - any channel",
      type: "trigger",
      icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      color: "#F59E0B",
    },
    {
      id: "ai-routes",
      label: "AI Routes by Practice Area",
      sublabel: "Family law, real estate, or corporate - routed instantly",
      type: "ai",
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      color: "#7E0F4A",
    },
    {
      id: "matter-created",
      label: "Clio Matter Created + Retainer Sent",
      sublabel: "Matter opened, conflict check flagged, retainer delivered via DocuSign",
      type: "action",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
      color: "#283891",
    },
    {
      id: "billing-triggered",
      label: "Billing Auto-Triggered",
      sublabel: "Invoice generated on matter milestones, sent and tracked automatically",
      type: "outcome",
      icon: "M5 13l4 4L19 7",
      color: "#10B981",
    },
  ],
  controlItems: [
    {
      title: "Stop-Loss",
      desc: "Conflict check results always flagged for lawyer review. System never auto-cleared conflicts.",
    },
    {
      title: "Retries",
      desc: "E-signature delivery failures retried with alternate email. Billing failures triggered assistant notification.",
    },
    {
      title: "Approvals",
      desc: "All substantive client communications remained under lawyer control. Only admin messages automated.",
    },
    {
      title: "Logging",
      desc: "Every client interaction, document exchange, billing event logged in Clio matter record.",
    },
    {
      title: "Escalation",
      desc: "Approaching court deadlines and limitation periods escalated to responsible lawyer with full context.",
    },
  ],
  tools: ["Clio", "Gmail", "Make (Integromat)", "DocuSign", "Typeform", "Twilio"],
  results: [
    {
      label: "Non-billable admin/lawyer",
      before: "1.5-2 hrs/day",
      after: "Under 30 min/day",
      beforeW: 85,
      afterW: 15,
    },
    {
      label: "Intake response",
      before: "1-3 days",
      after: "Under 3 minutes",
      beforeW: 90,
      afterW: 5,
    },
    {
      label: "Monthly billing",
      before: "4-6 hrs/lawyer",
      after: "Under 30 min (review only)",
      beforeW: 85,
      afterW: 10,
    },
    {
      label: "Status calls",
      before: "20+/week",
      after: "~7/week (65% drop)",
      beforeW: 85,
      afterW: 25,
    },
    {
      label: "Billable capacity",
      before: "500+ hrs/yr lost",
      after: "$175K+ recovered",
      beforeW: 85,
      afterW: 15,
    },
  ],
  implementationTimeline: "4 weeks",
  investmentRange: "$8,000–$12,000 CAD",
  payback: "Within first quarter",
  keyResultCallout:
    "500+ billable hours recovered per year. $175,000+ in billable capacity restored. Billing reduced from hours to minutes per lawyer per month. Client status calls down 65%. Intake response from days to minutes.",
  whyItMatters:
    "For law firms, every non-billable hour is direct revenue loss. Protecting billable hours through automation has the highest dollar-for-dollar ROI of any investment a small law firm can make.",
  whyBullets: [
    "Your lawyers spend 1+ hour per day on non-billable admin",
    "Billing is a monthly headache that takes hours per lawyer",
    "Clients call for status updates because you do not proactively communicate",
    "Intake response depends on who checks email first",
    "Document exchange happens through scattered email threads",
  ],
  crossIndustryItems: [
    { industry: "Law Firms", note: "Exact scenario." },
    { industry: "Immigration Consultants", note: "Same intake/document/billing pattern." },
    { industry: "Financial Advisors", note: "KYC documents and review scheduling." },
    { industry: "Insurance Brokers", note: "Policy document exchange and renewal." },
    { industry: "Mortgage Brokers", note: "Application documents and status updates." },
  ],
  ctaHeadline:
    "Every Hour Your Lawyers Spend on Admin Is $350 That Disappears. Protect It.",
  ctaBody:
    "The audit maps your firm's admin overhead and shows you exactly how many billable hours you can recover.",
  internalLinks: [
    { label: "Law Firms", href: "/industries/law-firms" },
    { label: "Client Intake Automation", href: "/services/client-intake-automation" },
    { label: "Invoice Automation", href: "/services/invoice-automation" },
    { label: "Document Collection", href: "/services/document-collection" },
    { label: "All Case Studies", href: "/case-studies" },
  ],
  color: "#283891",
};

export default function LawFirmToronto() {
  useEffect(() => {
    document.title = data.title;
  }, []);
  return <CaseStudyPageLayout data={data} />;
}
