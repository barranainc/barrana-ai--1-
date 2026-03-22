import { useEffect } from "react";
import CaseStudyPageLayout, { CaseStudyData } from "@/components/case-study/CaseStudyPageLayout";

const data: CaseStudyData = {
  title: "Cleaning Company Automation Case Study | Doubled Conversion | Barrana.ai",
  description:
    "How a residential cleaning company in Etobicoke automated after-hours quotes, booking, reminders, invoicing, and reviews. Quote conversion doubled in 90 days.",
  slug: "cleaning-company-etobicoke",
  industry: "Cleaning Companies",
  location: "Etobicoke, Toronto",
  teamSize: "Owner + office manager + 8 cleaners",
  relatableIndustries: [
    "Cleaning Companies",
    "Landscaping",
    "Home Services",
    "Auto Repair",
  ],
  h1: "How a Cleaning Company Doubled Their Quote Conversion by Responding at 9pm Instead of 9am",
  subheadline:
    "After-hours quote response went from zero to instant. Follow-up hit 100%. Recurring clients managed automatically. Google reviews after every clean. The owner stopped being the office at night.",
  intro:
    "This Etobicoke residential cleaning company was generating 60+ quote requests per month. Approximately 45% arrived after 5pm when the office was closed. Those evening quotes sat until the next morning. By then, the homeowner had already booked with a competitor who responded at 9pm.",
  businessDescription:
    "A residential and small commercial cleaning company in Etobicoke. Owner, part-time office manager (mornings), 8 cleaning staff. 60+ quote requests per month. 35 recurring weekly/bi-weekly clients. Using Housecall Pro for scheduling.",
  problemBody: [
    "45% of quote requests arrived after 5pm. Zero responded to until next morning. By then, homeowners had booked with faster competitors.",
    "Quote follow-up depended on the owner doing it from home evenings. Actual follow-up rate: approximately 40%.",
    "Recurring client management was a spreadsheet. Cancellations required manual coordination. Schedule gaps not detected until cleaning day.",
    "Invoicing after each clean was manual — the office manager spent 3-4 hours per week generating and sending invoices.",
  ],
  beforeMetrics: [
    { label: "After-hours quote response", value: "Zero" },
    { label: "Quote follow-up rate", value: "~40%" },
    { label: "Recurring schedule gaps", value: "Not detected" },
    { label: "Invoice time/week", value: "3-4 hrs" },
    { label: "Google reviews (total)", value: "23 after 4 years" },
  ],
  solutionIntro:
    "We built a system covering quote response, follow-up, booking, recurring management, invoicing, and review requests — integrated with Housecall Pro. After-hours response handled by AI, eliminating the owner's evening quote management.",
  workflowSteps: [
    {
      id: "quote-request",
      label: "Quote Request (any time)",
      sublabel: "Website form, Google, or referral — any hour of the day",
      type: "trigger",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
      color: "#F59E0B",
    },
    {
      id: "ai-response",
      label: "90s AI Response + Follow-Up Sequence",
      sublabel: "Instant quote with 3-touch follow-up sequence if no reply",
      type: "ai",
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      color: "#7E0F4A",
    },
    {
      id: "clean-completed",
      label: "Clean Completed in Housecall Pro",
      sublabel: "Job marked complete — triggers invoice and review workflow automatically",
      type: "action",
      icon: "M5 13l4 4L19 7",
      color: "#283891",
    },
    {
      id: "invoice-review",
      label: "Invoice + Google Review Request",
      sublabel: "Invoice sent and review request delivered within minutes of completion",
      type: "outcome",
      icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      color: "#10B981",
    },
  ],
  controlItems: [
    {
      title: "Stop-Loss",
      desc: "Double-booking prevention: system checks cleaner availability before confirming.",
    },
    {
      title: "Retries",
      desc: "Communication failures retry via alternate channel.",
    },
    {
      title: "Approvals",
      desc: "Commercial quotes above threshold require owner review.",
    },
    {
      title: "Logging",
      desc: "Every booking, completion, invoice, and review logged per client.",
    },
    {
      title: "Escalation",
      desc: "Client complaints trigger immediate owner notification.",
    },
  ],
  tools: [
    "Housecall Pro",
    "Go High Level",
    "Make (Integromat)",
    "Twilio",
    "Google Business Profile",
  ],
  results: [
    {
      label: "After-hours response",
      before: "Zero (next morning)",
      after: "Instant 24/7",
      beforeW: 90,
      afterW: 5,
    },
    {
      label: "Quote follow-up",
      before: "40%",
      after: "100% automated",
      beforeW: 75,
      afterW: 10,
    },
    {
      label: "Quote conversion",
      before: "Baseline",
      after: "Doubled in 90 days",
      beforeW: 35,
      afterW: 80,
    },
    {
      label: "Invoice generation",
      before: "3-4 hrs/week",
      after: "Zero (automatic)",
      beforeW: 80,
      afterW: 5,
    },
    {
      label: "Google reviews",
      before: "23 total (4 years)",
      after: "67 within 6 months",
      beforeW: 15,
      afterW: 75,
    },
  ],
  implementationTimeline: "2 weeks",
  investmentRange: "$3,000–$5,000 CAD",
  payback: "Within first 2 weeks",
  keyResultCallout:
    "Quote conversion doubled in 90 days. Google reviews tripled. Owner stopped working evenings. Invoicing became automatic. Recurring clients managed by the system.",
  whyItMatters:
    "For service businesses that depend on quote requests, the speed of response determines who gets the job. The single highest-impact change is being available when clients are looking, not when your office is open.",
  whyBullets: [
    "A significant portion of your quotes arrive after business hours",
    "Quote follow-up depends on whether you have time that evening",
    "Invoicing is a weekly chore",
    "You rarely request Google reviews",
    "Your owner or manager is doing office work from home every night",
  ],
  crossIndustryItems: [
    { industry: "Cleaning Companies", note: "Exact scenario." },
    { industry: "Landscaping", note: "Seasonal quotes with same after-hours patterns." },
    { industry: "Home Services", note: "Quote response and follow-up identical." },
    { industry: "Auto Repair Shops", note: "Estimate follow-up patterns match." },
    {
      industry: "Any Quote-Driven Service Business",
      note: "Response speed determines conversion.",
    },
  ],
  ctaHeadline:
    "Your Clients Are Looking for You at 9pm. Be There. Without Being There.",
  ctaBody:
    "The audit shows you how many quotes arrive outside business hours and what it costs when they go unanswered.",
  internalLinks: [
    { label: "Cleaning Companies", href: "/industries/cleaning-companies" },
    { label: "Lead Response Automation", href: "/services/lead-response-automation" },
    { label: "After-Hours Automation", href: "/services/after-hours-automation" },
    { label: "Invoice Automation", href: "/services/invoice-automation" },
    { label: "All Case Studies", href: "/case-studies" },
  ],
  color: "#7E0F4A",
};

export default function CleaningCompanyEtobicoke() {
  useEffect(() => {
    document.title = data.title;
  }, []);
  return <CaseStudyPageLayout data={data} />;
}
