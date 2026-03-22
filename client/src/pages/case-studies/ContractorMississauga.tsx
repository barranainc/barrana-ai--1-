import { useEffect } from "react";
import CaseStudyPageLayout, { CaseStudyData } from "@/components/case-study/CaseStudyPageLayout";

const data: CaseStudyData = {
  title: "Contractor Automation Case Study | 22% Conversion Increase | Barrana.ai",
  description:
    "How a renovation contractor in Mississauga automated lead response, quote follow-up, and after-hours capture. Quote conversion up 22% in 60 days.",
  slug: "contractor-mississauga",
  industry: "General Contracting",
  location: "Mississauga, Ontario",
  teamSize: "Owner + 3-person crew + part-time admin",
  relatableIndustries: [
    "Contractors",
    "HVAC",
    "Plumbing",
    "Landscaping",
    "Cleaning Companies",
  ],
  h1: "How a Mississauga Renovation Contractor Went From Losing 10 Leads Per Month to Booking While On-Site",
  subheadline:
    "Response time dropped from 4-6 hours to 90 seconds. After-hours leads captured for the first time. Quote follow-up went from 40% to 100%. Conversion increased 22% within 60 days.",
  intro:
    "This Mississauga renovation contractor was doing excellent work but losing 8-12 qualified leads per month to slow response. The owner was on-site all day. Leads went to voicemail. By the time he called back at 6pm, homeowners had already booked with someone who responded first.",
  businessDescription:
    "A residential renovation contractor in Mississauga specializing in kitchen and bathroom renovations, basement finishing, and general home improvement. Owner-operator with a 3-person crew and a part-time admin who worked mornings only. Average 40 quote requests per month. Average job value: $8,000-$25,000.",
  problemHeading: "What Was Breaking",
  problemBody: [
    "The owner was physically on-site from 7am to 5pm every day. The part-time admin handled morning calls but left at noon. From 12pm onward, every lead went to voicemail. Average response time: 4-6 hours.",
    "After 5pm, 100% of leads went unanswered. An estimated 40% of the monthly lead volume arrived after business hours.",
    "Quote follow-up was entirely owner-dependent. Estimated follow-up rate: 40% of quotes. Busy weeks meant follow-up happened in 7-10 days or not at all.",
    "At $8,000-$25,000 per job, losing 8-12 leads per month to slow response meant $40,000-$180,000 in annual revenue walking away.",
  ],
  beforeMetrics: [
    { label: "Lead response time", value: "4-6 hours" },
    { label: "After-hours capture", value: "0%" },
    { label: "Quote follow-up rate", value: "~40%" },
    { label: "Estimated leads lost/month", value: "8-12" },
    { label: "Scheduling system", value: "Text + notes" },
  ],
  solutionIntro:
    "We deployed a 4-workflow system: lead response, quote follow-up, after-hours voice capture, and job completion invoicing. Integrated with Jobber and Go High Level CRM set up as part of implementation.",
  workflowSteps: [
    {
      id: "lead-arrives",
      label: "Lead Arrives",
      sublabel: "Web form, Google ad, referral text, or after-hours call",
      type: "trigger",
      icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
      color: "#F59E0B",
    },
    {
      id: "response-qualify",
      label: "90s Response + Qualify",
      sublabel: "AI sends instant reply and qualifies job type, location, and timeline",
      type: "action",
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      color: "#283891",
    },
    {
      id: "site-visit-booked",
      label: "Site Visit Booked in Jobber",
      sublabel: "Qualified lead books directly into owner's Jobber calendar",
      type: "action",
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "#283891",
    },
    {
      id: "invoice-completion",
      label: "Invoice on Completion",
      sublabel: "Job marked complete triggers automated invoice via Jobber",
      type: "outcome",
      icon: "M5 13l4 4L19 7",
      color: "#10B981",
    },
  ],
  controlItems: [
    {
      title: "Stop-Loss",
      desc: "Leads outside service area or scope responded to politely with referral rather than booked.",
    },
    {
      title: "Retries",
      desc: "Jobber booking failures created manual task with all lead details preserved.",
    },
    {
      title: "Approvals",
      desc: "Commercial inquiries and large jobs required owner review before booking.",
    },
    {
      title: "Logging",
      desc: "Every lead, quote, follow-up, and booking logged in CRM for full pipeline visibility.",
    },
    {
      title: "Escalation",
      desc: "Emergency calls triggered immediate SMS to owner regardless of time.",
    },
  ],
  tools: [
    "Jobber",
    "Go High Level",
    "Make (Integromat)",
    "OpenAI",
    "Twilio",
    "Google Calendar",
  ],
  results: [
    {
      label: "Lead response time",
      before: "4-6 hours",
      after: "Under 90 seconds",
      beforeW: 90,
      afterW: 10,
    },
    {
      label: "After-hours capture",
      before: "0%",
      after: "100%",
      beforeW: 90,
      afterW: 5,
    },
    {
      label: "Quote follow-up",
      before: "40%",
      after: "100% automated",
      beforeW: 70,
      afterW: 10,
    },
    {
      label: "Conversion rate",
      before: "Baseline",
      after: "+22% within 60 days",
      beforeW: 55,
      afterW: 80,
    },
    {
      label: "Invoice delay",
      before: "1-2 weeks",
      after: "Same day",
      beforeW: 80,
      afterW: 5,
    },
  ],
  implementationTimeline: "2 weeks",
  investmentRange: "$4,000–$6,000 CAD",
  payback: "Within first 2 weeks (1 captured job)",
  keyResultCallout:
    "22% increase in quote-to-job conversion within 60 days. 90-second response time. 100% after-hours capture. The owner stopped missing leads because his phone went to voicemail. He started each morning with booked appointments he did not have to schedule.",
  whyItMatters:
    "The contractor's work quality was always excellent. The problem was never the service. It was the response speed. Automation solved the only real bottleneck.",
  whyBullets: [
    "You are physically working when leads come in",
    "Your phone goes to voicemail during the day",
    "After-hours leads get zero response until morning",
    "Quote follow-up depends on whether you have time that evening",
    "You know you are losing leads but cannot quantify how many",
  ],
  crossIndustryItems: [
    { industry: "Contractors (all trades)", note: "Exact scenario described." },
    {
      industry: "HVAC / Plumbing / Electrical",
      note: "Same on-site vs lead-capture conflict.",
    },
    {
      industry: "Landscaping",
      note: "Seasonal quote volume with same follow-up gaps.",
    },
    {
      industry: "Cleaning Companies",
      note: "Evening quote requests with same after-hours gap.",
    },
    {
      industry: "Auto Repair Shops",
      note: "Estimate follow-up patterns are identical.",
    },
  ],
  ctaHeadline:
    "Your Leads Are Not Waiting. Your Competitors Are Not Waiting. Close the Response Gap.",
  ctaBody:
    "The audit quantifies exactly how many leads you are losing to slow response and shows you the automated version of your lead pipeline.",
  internalLinks: [
    { label: "Contractors & Trades", href: "/industries/contractors" },
    {
      label: "Lead Response Automation",
      href: "/services/lead-response-automation",
    },
    {
      label: "After-Hours Automation",
      href: "/services/after-hours-automation",
    },
    { label: "AI Receptionist", href: "/services/ai-receptionist" },
    { label: "All Case Studies", href: "/case-studies" },
  ],
  color: "#283891",
};

export default function ContractorMississauga() {
  useEffect(() => {
    document.title = data.title;
  }, []);
  return <CaseStudyPageLayout data={data} />;
}
