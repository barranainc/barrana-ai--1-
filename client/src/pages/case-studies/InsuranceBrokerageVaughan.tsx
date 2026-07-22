import { useEffect } from "react";
import CaseStudyPageLayout, { CaseStudyData } from "@/components/case-study/CaseStudyPageLayout";

const data: CaseStudyData = {
  title: "Insurance Brokerage Automation Case Study | Renewal Retention | Barrana.ai",
  description:
    "How a Vaughan insurance brokerage automated quote follow-up, renewal reminders, and cross-sell detection. Renewal lapse rate dropped from 18% to under 6%.",
  slug: "insurance-brokerage-vaughan",
  industry: "Insurance Brokers",
  location: "Vaughan, Ontario",
  teamSize: "Principal + 3 brokers + 1 admin",
  relatableIndustries: [
    "Insurance Brokers",
    "Mortgage Brokers",
    "Financial Advisors",
    "Real Estate",
  ],
  h1: "How a 4-Broker Insurance Office Cut Their Renewal Lapse Rate From 18% to Under 6%",
  subheadline:
    "Renewal reminders at 90/60/30 days for every policy. Quote follow-up at 100% instead of 40%. Cross-sell opportunities surfaced systematically. Brokers sold instead of chased.",
  intro:
    "This Vaughan insurance brokerage had 1,200 active policies across personal and commercial lines. Renewal tracking was a spreadsheet updated monthly. 18% of policies lapsed annually not because clients were unhappy, but because nobody contacted them before the competitor did.",
  businessDescription:
    "An independent insurance brokerage on Highway 7 in Vaughan. Principal broker, 3 licensed brokers, 1 administrative assistant. Personal lines (auto, home, tenant) and commercial lines. 1,200 active policies. Serving Vaughan, Woodbridge, and the broader GTA.",
  problemBody: [
    "18% annual renewal lapse rate - 216 policies per year lost. Renewal outreach was always late or never happened.",
    "Quote follow-up at approximately 40%. Service calls and claims consumed broker days. More than half of all quotes received zero follow-up.",
    "Cross-sell opportunities were invisible. No systematic way to identify clients with coverage gaps.",
    "RIBO compliance logging was manual with documentation gaps.",
  ],
  beforeMetrics: [
    { label: "Renewal lapse rate", value: "18%/year" },
    { label: "Policies lost annually", value: "216" },
    { label: "Quote follow-up rate", value: "~40%" },
    { label: "Cross-sell process", value: "Ad hoc only" },
    { label: "Renewal outreach timing", value: "2-4 wks before expiry" },
  ],
  solutionIntro:
    "We deployed automation for renewal management, quote follow-up, cross-sell detection, and compliance logging - integrated with Applied Epic. Goal: no renewal lapses due to missed outreach, no quote dies without follow-up.",
  workflowSteps: [
    {
      id: "step-1",
      label: "90-Day Renewal Trigger",
      sublabel: "Policy renewal detected 90 days before expiry, sequence initiated",
      type: "trigger",
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "#F59E0B",
    },
    {
      id: "step-2",
      label: "Renewal Sequence 90/60/30 Days",
      sublabel: "Personalized reminders sent at 90, 60, and 30 days before policy expiry",
      type: "action",
      icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      color: "#283891",
    },
    {
      id: "step-3",
      label: "Cross-Sell Gap Detection",
      sublabel: "AI reviews client profile to surface coverage gaps and cross-sell opportunities",
      type: "ai",
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      color: "#7E0F4A",
    },
    {
      id: "step-4",
      label: "RIBO Compliance Log",
      sublabel: "All communications and interactions auto-logged for compliance and E&O documentation",
      type: "outcome",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
      color: "#10B981",
    },
  ],
  controlItems: [
    {
      title: "Stop-Loss",
      desc: "Cancelled policies automatically excluded from renewal outreach.",
    },
    {
      title: "Retries",
      desc: "Email bounce triggers SMS attempt. No renewal notice lost to bad contact info.",
    },
    {
      title: "Approvals",
      desc: "Cross-sell campaigns require broker review before client outreach.",
    },
    {
      title: "Logging",
      desc: "All communications logged per policy for RIBO compliance and E&O documentation.",
    },
    {
      title: "Escalation",
      desc: "Renewals with zero response at 14 days before expiry escalated to principal with full history.",
    },
  ],
  tools: ["Applied Epic", "Make (Integromat)", "Twilio", "Google Workspace"],
  results: [
    {
      label: "Renewal lapse rate",
      before: "18%",
      after: "Under 6%",
      beforeW: 85,
      afterW: 25,
    },
    {
      label: "Policies retained",
      before: "82%",
      after: "94%+ additional retained",
      beforeW: 60,
      afterW: 85,
    },
    {
      label: "Quote follow-up",
      before: "40%",
      after: "100% automated",
      beforeW: 70,
      afterW: 10,
    },
    {
      label: "Cross-sell identification",
      before: "Ad hoc",
      after: "Systematic per client",
      beforeW: 10,
      afterW: 85,
    },
    {
      label: "Compliance logging",
      before: "Manual with gaps",
      after: "Continuous automated",
      beforeW: 50,
      afterW: 95,
    },
  ],
  implementationTimeline: "3 weeks",
  investmentRange: "$6,000–$9,000 CAD",
  payback: "Within first renewal cycle",
  keyResultCallout:
    "Renewal lapse rate from 18% to under 6%. 144 additional policies retained per year. 100% quote follow-up. Cross-sell opportunities surfaced for every client. RIBO compliance gaps closed.",
  whyItMatters:
    "Insurance brokerage revenue is recurring. Every lapsed policy is not just one year's premium lost - it is the entire future stream. Preventing lapse through consistent, timed outreach has compounding value.",
  whyBullets: [
    "Your renewal lapse rate is above 10%",
    "More than half your quotes get no follow-up",
    "You know clients have coverage gaps but do not systematically address them",
    "Compliance documentation has gaps",
    "Renewal outreach happens weeks before expiry instead of months",
  ],
  crossIndustryItems: [
    { industry: "Insurance Brokerages", note: "Exact scenario." },
    {
      industry: "Mortgage Brokers",
      note: "Maturity renewal follows same timed outreach pattern.",
    },
    {
      industry: "Financial Advisors",
      note: "Annual review scheduling and KYC renewal structurally identical.",
    },
    {
      industry: "Real Estate",
      note: "Long-term client nurture to prevent loss to competitors.",
    },
    {
      industry: "Any Renewal-Based Business",
      note: "Proactive outreach prevents churn across all subscription models.",
    },
  ],
  ctaHeadline: "Every Lapsed Policy Is Recurring Revenue Lost Forever. The Fix Is Consistent Outreach.",
  ctaBody:
    "The audit analyzes your renewal lapse rate and shows you the 90/60/30-day sequence that prevents it.",
  internalLinks: [
    { label: "Insurance Brokers", href: "/industries/insurance-brokers" },
    { label: "CRM Automation", href: "/services/crm-automation" },
    { label: "Operations Reporting", href: "/services/operations-reporting" },
    { label: "Lead Response Automation", href: "/services/lead-response-automation" },
    { label: "All Case Studies", href: "/case-studies" },
  ],
  color: "#283891",
};

export default function InsuranceBrokerageVaughan() {
  useEffect(() => {
    document.title = data.title;
  }, []);
  return <CaseStudyPageLayout data={data} />;
}
