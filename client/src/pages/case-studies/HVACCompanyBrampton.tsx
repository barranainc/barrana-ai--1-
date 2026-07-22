import { useEffect } from "react";
import CaseStudyPageLayout, { CaseStudyData } from "@/components/case-study/CaseStudyPageLayout";

const data: CaseStudyData = {
  title: "HVAC Company Automation Case Study",
  description:
    "How a Brampton HVAC company automated seasonal maintenance campaigns, emergency dispatch, and agreement renewals. 300 slots filled in 10 days. Retention up 28%.",
  slug: "hvac-company-brampton",
  industry: "Home Services (HVAC)",
  location: "Brampton, Ontario",
  teamSize: "Owner + 4 technicians + dispatcher",
  relatableIndustries: ["HVAC", "Plumbing", "Electrical", "Landscaping", "Auto Repair"],
  h1: "How an HVAC Company Filled Their Entire Fall Furnace Maintenance Schedule in 10 Days Instead of 6 Weeks",
  subheadline:
    "300 maintenance clients contacted in one automated campaign. 225 booked within 10 days. Emergency dispatch went from voicemail to immediate. Agreement renewals improved 28%.",
  intro:
    "This Brampton HVAC company had 450 residential maintenance clients. Every October, the dispatcher would start calling to schedule fall furnace tune-ups. At 20-25 calls per day, it took 6 weeks to contact everyone. Meanwhile, emergency calls after 5pm went to voicemail and maintenance agreements lapsed.",
  businessDescription:
    "A residential and light commercial HVAC company in Brampton. Owner, 4 field technicians, 1 dispatcher. Services: furnace/AC installation, maintenance agreements, repairs, emergency service. 450 maintenance clients. 65 active maintenance agreements. Serving Brampton, Caledon, and northwest GTA.",
  problemBody: [
    "Seasonal maintenance scheduling took 6 weeks of manual calling - 20-25 clients per day. By the time the list was half-done, the fall season was well underway.",
    "Emergency calls after 5pm went to voicemail. The owner checked messages at 10pm and called back. By then, the customer had often called a competitor.",
    "65 maintenance agreements with annual renewal dates. Renewal outreach happened 2-3 weeks before expiry (or after). 22% of agreements lapsed annually.",
    "Technician scheduling was manual - the dispatcher juggled emergency calls, maintenance, and installations across 4 technicians with ad hoc geographic routing.",
  ],
  beforeMetrics: [
    { label: "Seasonal campaign duration", value: "6 weeks" },
    { label: "Emergency after-hours response", value: "Voicemail until 10pm" },
    { label: "Agreement lapse rate", value: "22%/year" },
    { label: "Seasonal booking rate", value: "~60%" },
    { label: "Invoice timing", value: "Next day" },
  ],
  solutionIntro:
    "We deployed seasonal campaign automation, emergency dispatch, agreement renewal sequences, and job completion invoicing - integrated with ServiceTitan. The dispatcher's role shifted from phone caller to schedule optimizer.",
  workflowSteps: [
    {
      id: "step-1",
      label: "October Campaign Trigger",
      sublabel: "Annual seasonal campaign fires for all 300 maintenance clients",
      type: "trigger",
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "#F59E0B",
    },
    {
      id: "step-2",
      label: "Batch Outreach to 300 Clients",
      sublabel: "SMS + email sequence with online booking link sent to full list",
      type: "action",
      icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      color: "#283891",
    },
    {
      id: "step-3",
      label: "Emergency: AI Triage + Immediate Dispatch",
      sublabel: "After-hours emergencies triaged by AI, technician alerted within minutes",
      type: "ai",
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      color: "#7E0F4A",
    },
    {
      id: "step-4",
      label: "Renewal Sequence 90/60/30 Days",
      sublabel: "Agreement renewals triggered 90 days before expiry with automated follow-up",
      type: "outcome",
      icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
      color: "#10B981",
    },
  ],
  controlItems: [
    {
      title: "Stop-Loss",
      desc: "Emergency keywords (no heat, gas smell, water leak) bypass normal routing and trigger immediate multi-channel alert.",
    },
    {
      title: "Retries",
      desc: "Technician dispatch SMS failures retry via phone call.",
    },
    {
      title: "Approvals",
      desc: "Campaign pricing changes require owner approval before launch.",
    },
    {
      title: "Logging",
      desc: "All dispatch, service, and communication events logged per customer.",
    },
    {
      title: "Escalation",
      desc: "Customer safety concerns escalate to owner immediately.",
    },
  ],
  tools: ["ServiceTitan", "Make (Integromat)", "Twilio", "OpenAI"],
  results: [
    {
      label: "Seasonal campaign duration",
      before: "6 weeks manual",
      after: "10 days automated",
      beforeW: 90,
      afterW: 15,
    },
    {
      label: "Seasonal booking rate",
      before: "~60%",
      after: "82% (225/300 booked)",
      beforeW: 50,
      afterW: 82,
    },
    {
      label: "Emergency after-hours",
      before: "Voicemail until 10pm",
      after: "Immediate AI triage + dispatch",
      beforeW: 90,
      afterW: 5,
    },
    {
      label: "Agreement lapse rate",
      before: "22%",
      after: "~8% (est. after 1 cycle)",
      beforeW: 80,
      afterW: 25,
    },
    {
      label: "Dispatcher time",
      before: "6 weeks calling",
      after: "Freed for schedule optimization",
      beforeW: 90,
      afterW: 15,
    },
  ],
  implementationTimeline: "3 weeks",
  investmentRange: "$6,000–$9,000 CAD",
  payback: "Within first seasonal campaign",
  keyResultCallout:
    "300 seasonal maintenance slots targeted, 225 booked in 10 days. Emergency dispatch went from voicemail to immediate. Agreement renewal lapse dropping from 22% toward single digits. Dispatcher freed from 6 weeks of manual calling.",
  whyItMatters:
    "Seasonal service businesses face the same challenge every cycle: contact hundreds of clients in a narrow window. Manual outreach cannot keep pace. One automated campaign replaces 6 weeks of phone work and books more clients because the timing is better.",
  whyBullets: [
    "Your seasonal campaign takes weeks of manual calling",
    "Emergency after-hours calls go to voicemail",
    "Maintenance agreements lapse because renewal outreach is always late",
    "Technician scheduling is manual and geographically inefficient",
    "You spend October calling clients instead of serving them",
  ],
  crossIndustryItems: [
    { industry: "HVAC Companies", note: "Exact scenario." },
    {
      industry: "Plumbing",
      note: "Seasonal maintenance (winterization, backflow) follows same campaign pattern.",
    },
    {
      industry: "Landscaping",
      note: "Spring contract renewal campaigns are structurally identical.",
    },
    {
      industry: "Auto Repair Shops",
      note: "Seasonal tire swap and maintenance campaigns match this model.",
    },
    {
      industry: "Electrical Contractors",
      note: "Safety inspections need similar outreach.",
    },
  ],
  ctaHeadline:
    "Next Season Starts in Weeks. Your Client List Is Sitting There. Automate the Outreach.",
  ctaBody:
    "The audit analyzes your seasonal patterns and shows you what a 10-day campaign looks like vs your current manual process.",
  internalLinks: [
    { label: "Home Services", href: "/industries/home-services" },
    { label: "After-Hours Automation", href: "/services/after-hours-automation" },
    { label: "Appointment Automation", href: "/services/appointment-automation" },
    { label: "AI Receptionist", href: "/services/ai-receptionist" },
    { label: "All Case Studies", href: "/case-studies" },
  ],
  color: "#283891",
};

export default function HVACCompanyBrampton() {
  useEffect(() => {
    document.title = data.title;
  }, []);
  return <CaseStudyPageLayout data={data} />;
}
