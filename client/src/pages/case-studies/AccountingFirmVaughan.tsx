import { useEffect } from "react";
import CaseStudyPageLayout, { CaseStudyData } from "@/components/case-study/CaseStudyPageLayout";

const data: CaseStudyData = {
  title: "Accounting Firm Automation Case Study",
  description:
    "How a 4-person accounting firm in Vaughan automated document collection, invoicing, and onboarding. Added 65 clients next season without new hires.",
  slug: "accounting-firm-vaughan",
  industry: "Accounting Firms",
  location: "Vaughan, Ontario",
  teamSize: "4 staff (2 CPAs + 2 junior)",
  relatableIndustries: [
    "Accounting Firms",
    "Financial Advisors",
    "Insurance Brokers",
    "Law Firms",
  ],
  h1: "How a 4-Person Accounting Firm Added 65 Clients the Following Tax Season Without Hiring Anyone",
  subheadline:
    "Document chase time went to zero. Invoices triggered the day work completed. Onboarding became consistent. The team prepared 280 files instead of 215 with the same 4 people.",
  intro:
    "This Vaughan accounting firm was hitting a capacity ceiling every tax season. Not because the CPAs were not capable, but because 2-3 hours per day per staff member were consumed by document chasing, invoice generation, and inconsistent onboarding. They were turning away clients while their team spent half the day on admin.",
  businessDescription:
    "A general practice accounting firm on Highway 7 in Vaughan serving small businesses and individuals across the GTA. Two CPAs, two junior accountants. Services: T1 personal tax, T2 corporate, bookkeeping reviews, HST filing. Using QuickBooks Online and a basic CRM. Average 215 files processed per tax season.",
  problemHeading: "What Was Breaking",
  problemBody: [
    "During tax season, every staff member spent 2-3 hours per day on document follow-up. For 4 staff members, that was 40-60 hours per week of non-preparation work.",
    "Invoices went out 2-4 weeks after file completion. Billing happened when someone noticed and remembered. Cash flow lagged significantly during the firm's busiest revenue period.",
    "New client onboarding varied entirely by who handled it. Some clients received a professional welcome. Others received a delayed callback and a PDF form.",
    "The firm had no visibility into which files were approaching CRA deadline, which clients still owed documents, or which staff members were overloaded.",
  ],
  beforeMetrics: [
    { label: "Document follow-up per staff/day", value: "2-3 hrs" },
    { label: "Avg collection time", value: "18 days" },
    { label: "Invoice delay", value: "2-4 weeks" },
    { label: "Files per season", value: "215" },
    { label: "Capacity visibility", value: "Zero" },
  ],
  solutionIntro:
    "We deployed automation across 4 workflows: document collection, invoice generation, client onboarding, and seasonal capacity reporting. All built on QuickBooks Online and their existing CRM, requiring no tool changes.",
  workflowSteps: [
    {
      id: "engagement-starts",
      label: "Engagement Starts",
      sublabel: "New client signed or returning client file opened",
      type: "trigger",
      icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
      color: "#F59E0B",
    },
    {
      id: "document-request",
      label: "Document Request Sent",
      sublabel: "Automated portal deployed with client-specific document checklist",
      type: "action",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
      color: "#283891",
    },
    {
      id: "invoice-triggered",
      label: "Invoice Triggered",
      sublabel: "Invoice auto-generated and sent the day file is marked complete",
      type: "action",
      icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      color: "#283891",
    },
    {
      id: "weekly-report",
      label: "Weekly Report Delivered",
      sublabel: "Capacity and deadline report delivered to managing partner every Monday",
      type: "outcome",
      icon: "M5 13l4 4L19 7",
      color: "#10B981",
    },
  ],
  controlItems: [
    {
      title: "Stop-Loss",
      desc: "Documents not matching expected type (e.g., last year's T4) flagged for accountant review.",
    },
    {
      title: "Retries",
      desc: "Email failures retried 3x then SMS. No client missed notification.",
    },
    {
      title: "Approvals",
      desc: "Invoices above $5,000 required partner review before sending.",
    },
    {
      title: "Logging",
      desc: "Every upload, reminder, invoice, and payment timestamped per client file.",
    },
    {
      title: "Escalation",
      desc: "Files within 14 days of CRA deadline with missing items escalated to managing partner.",
    },
  ],
  tools: [
    "QuickBooks Online",
    "Zoho CRM",
    "Make (Integromat)",
    "Google Drive",
    "Twilio",
    "Typeform",
  ],
  results: [
    {
      label: "Document collection time",
      before: "18 days",
      after: "9 days avg",
      beforeW: 85,
      afterW: 35,
    },
    {
      label: "Staff chase time",
      before: "2-3 hrs/day each",
      after: "Zero",
      beforeW: 90,
      afterW: 5,
    },
    {
      label: "Invoice delay",
      before: "2-4 weeks",
      after: "Same day (auto)",
      beforeW: 85,
      afterW: 5,
    },
    {
      label: "Files processed/season",
      before: "215",
      after: "280 (+30%)",
      beforeW: 55,
      afterW: 85,
    },
    {
      label: "New client onboarding",
      before: "Inconsistent",
      after: "Standard 48hr sequence",
      beforeW: 80,
      afterW: 15,
    },
  ],
  implementationTimeline: "3 weeks",
  investmentRange: "$6,000–$10,000 CAD",
  payback: "Within first tax season",
  keyResultCallout:
    "65 additional clients served the following tax season. 280 files processed vs 215 the year before. Same 4-person team. Zero new hires. Document collection time cut in half. Invoices now go out the day work completes.",
  whyItMatters:
    "The firm did not get faster at tax preparation. They eliminated the admin overhead that was consuming half their work hours, freeing that time for the skilled work that generates revenue.",
  whyBullets: [
    "Your staff spend 2+ hours per day on document follow-up",
    "Invoices go out weeks after work is completed",
    "New client onboarding depends on which staff member handles it",
    "You turn away clients during peak season because your team is at capacity",
    "You have no visibility into which files are on track",
  ],
  crossIndustryItems: [
    { industry: "Accounting Firms", note: "Exact scenario." },
    {
      industry: "Law Firms",
      note: "Retainer onboarding and document exchange are structurally similar.",
    },
    {
      industry: "Financial Advisors",
      note: "KYC document collection and onboarding follow the same model.",
    },
    {
      industry: "Insurance Brokers",
      note: "Renewal document collection mirrors tax document collection.",
    },
    {
      industry: "Bookkeeping Firms",
      note: "Identical document collection and billing patterns.",
    },
  ],
  ctaHeadline:
    "Your Firm Has the Same Ceiling. The Capacity Is There. The Admin Is in the Way.",
  ctaBody:
    "The audit maps your document, billing, and onboarding workflows and shows you exactly where the capacity is hiding.",
  internalLinks: [
    { label: "Accounting Firms", href: "/industries/accounting-firms" },
    { label: "Document Collection", href: "/services/document-collection" },
    { label: "Invoice Automation", href: "/services/invoice-automation" },
    {
      label: "Client Intake Automation",
      href: "/services/client-intake-automation",
    },
    { label: "All Case Studies", href: "/case-studies" },
  ],
  color: "#7E0F4A",
};

export default function AccountingFirmVaughan() {
  useEffect(() => {
    document.title = data.title;
  }, []);
  return <CaseStudyPageLayout data={data} />;
}
