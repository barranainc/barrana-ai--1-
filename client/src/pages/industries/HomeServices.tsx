import { useEffect } from "react";
import IndustryPageLayout, { IndustryPageData } from "@/components/industry/IndustryPageLayout";
import TemplateMoneyLeakPipeline from "@/components/hero-visuals/TemplateMoneyLeakPipeline";

const data: IndustryPageData = {
  title: "AI Automation for HVAC, Plumbing, and Electrical Companies Toronto | Barrana.ai",
  description:
    "Automate emergency dispatch, seasonal maintenance reminders, lead capture, technician scheduling, and invoicing for HVAC, plumbing, and electrical companies. Free audit.",
  route: "home-services",
  breadcrumb: "Home Services — HVAC, Plumbing, Electrical",
  h1: "Emergency Calls at 2am. Seasonal Maintenance Due for 300 Clients. Your Team Is Already Overbooked. Automate the Coordination.",
  subheadline:
    "Emergency dispatch with priority routing. Seasonal maintenance reminders for your entire client base. 24/7 lead capture and booking. Technician scheduling optimization. Invoice on completion.",
  body: [
    "Home service companies handle two realities simultaneously: emergency work that cannot wait and scheduled maintenance that keeps recurring revenue flowing. Managing both manually means emergencies consume the day while maintenance reminders, seasonal campaigns, and follow-up fall behind.",
    "Your technicians are skilled. Your dispatchers are overwhelmed. Automation handles the coordination so your team handles the work.",
  ],
  ctaMicro: "See how many seasonal maintenance clients you are losing. Free audit.",

  costHeading: "What Manual Operations Cost Home Service Companies",
  costItems: [
    {
      figure: "30-40%",
      label: "Seasonal Client Lapse",
      desc: "Clients due for annual HVAC tune-ups, plumbing inspections, or electrical checks who never get contacted because nobody sent the reminder.",
    },
    {
      figure: "Next Morning",
      label: "After-Hours Emergency Delay",
      desc: "Emergency call at 11pm. Voicemail. Dispatch happens at 7am. Customer has already called someone else.",
    },
    {
      figure: "Manual Tracking",
      label: "Agreement Renewal Risk",
      desc: "Clients on annual agreements lapse because renewal outreach depends on someone checking a spreadsheet.",
    },
  ],

  problems: [
    {
      title: "Emergency Dispatch Is Slow After Hours",
      desc: "Emergency calls go to voicemail after 5pm. By morning, the customer has found another provider. Emergency revenue lost.",
    },
    {
      title: "Seasonal Maintenance Falls Behind",
      desc: "You have 300 clients due for annual furnace maintenance. Calling each one individually takes weeks. By then, the season has started.",
    },
    {
      title: "Maintenance Agreement Renewals Lapse",
      desc: "Annual agreements expire. Without proactive outreach, clients assume they will call you when they need you. They call whoever shows up first on Google instead.",
    },
    {
      title: "Technician Scheduling Is a Puzzle",
      desc: "Balancing emergency calls, scheduled maintenance, and new installs across a team of technicians. Manual scheduling creates inefficiencies and drive-time waste.",
    },
  ],

  beforeAfterMetrics: [
    { label: "Emergency Dispatch", before: "Voicemail, morning callback", after: "Immediate 24/7 AI triage", beforeW: 90, afterW: 8 },
    { label: "Seasonal Reminders", before: "Manual, 60-70% contacted", after: "Auto campaign to 100%", beforeW: 80, afterW: 8 },
    { label: "Agreement Renewals", before: "Lapse silently", after: "90/60/30-day auto sequence", beforeW: 85, afterW: 8 },
    { label: "Technician Scheduling", before: "Manual, inefficient routing", after: "Optimized by geography", beforeW: 80, afterW: 20 },
    { label: "Invoicing", before: "End of day or later", after: "Triggered on job completion", beforeW: 85, afterW: 5 },
  ],

  workflowHeading: "Systems We Build for Home Service Companies",
  workflowSteps: [
    { label: "Emergency Call 2am", type: "trigger" },
    { label: "AI Triage", type: "ai" },
    { label: "Tech Dispatched", type: "action" },
    { label: "Customer ETA Sent", type: "action" },
    { label: "Seasonal Campaign", type: "action" },
    { label: "Invoice on Complete", type: "action" },
    { label: "Review + Agreement Renewal", type: "outcome" },
  ],
  workflowBadge: "Emergency: voicemail → immediate dispatch",

  controlItems: [
    {
      title: "Stop-Loss",
      desc: "Emergency situations (gas leak, flooding, no heat below 0°C) bypass all normal routing and trigger immediate multi-channel alert.",
    },
    {
      title: "Retries",
      desc: "Technician dispatch notification failures retry through alternate channels (call if SMS fails).",
    },
    {
      title: "Approvals",
      desc: "Large installation quotes require manager review before sending to customer.",
    },
    {
      title: "Logging",
      desc: "All dispatch, service, and communication events logged per customer and per property.",
    },
    {
      title: "Escalation",
      desc: "Customer safety issues or repeat service calls for same problem escalate to service manager.",
    },
  ],

  roiMetrics: [
    { label: "Emergency Dispatch", before: "Voicemail", after: "Immediate 24/7" },
    { label: "Seasonal Maintenance", before: "60-70% contacted", after: "100% — automated campaign" },
    { label: "Agreement Retention", after: "Improved 20-30%" },
    { label: "Technician Efficiency", after: "Improved through geographic scheduling" },
    { label: "Invoicing", after: "Same-day, field-triggered" },
    { label: "Payback Period", after: "Within first seasonal campaign" },
  ],
  roiNote:
    "These are typical outcomes. The Automation Audit provides a projection for your specific business.",

  bestFit: [
    "HVAC companies with 200+ maintenance clients",
    "Plumbing companies handling emergency + scheduled work",
    "Electrical contractors with maintenance agreement programs",
    "Home service companies wanting to scale service agreements",
  ],
  notFit: [
    "Solo technicians with fewer than 20 regular clients",
    "Companies focused exclusively on new construction (not service)",
  ],

  aeoQuestion: "How does AI automation help HVAC, plumbing, and electrical companies?",
  aeoAnswer:
    "AI automation helps home service companies by providing 24/7 emergency dispatch with immediate technician alerts, running seasonal maintenance campaigns to 100% of eligible clients, automating maintenance agreement renewals starting 90 days before expiry, optimizing technician scheduling by geography and availability, triggering invoices on field completion, and requesting Google reviews after every service. This captures emergency revenue that would be lost to voicemail, fills seasonal maintenance schedules completely, and retains agreement clients who would otherwise lapse.",

  faqItems: [
    {
      question: "Which field service tools?",
      answer: "ServiceTitan, Housecall Pro, Jobber, FieldEdge, and custom systems.",
    },
    {
      question: "Emergency dispatch at 2am?",
      answer: "Yes. AI triages the call, determines urgency, and sends immediate dispatch notification to on-call technician with all details.",
    },
    {
      question: "Seasonal campaigns: how many clients?",
      answer: "We have run seasonal campaigns to 500+ clients. The system handles volume without bottlenecks.",
    },
    { question: "How long?", answer: "Standard home service automation: 3-4 weeks." },
    {
      question: "How much?",
      answer: "Home service automation: $5,000-$10,000 CAD. Seasonal campaign revenue alone typically exceeds the investment.",
    },
    {
      question: "Weather-triggered dispatch for snow/HVAC?",
      answer: "Yes. We can configure weather-based triggers for snow removal dispatch or HVAC emergency preparedness alerts.",
    },
  ],

  ctaHeadline: "Emergencies Cannot Wait. Seasonal Maintenance Cannot Be Manual. Automate Both.",
  ctaBody:
    "Walk away with a clear plan for 24/7 emergency dispatch and 100% seasonal maintenance outreach. Free. No pitch. No obligation.",
  primaryCTA: "Get Your Free Home Service Companies Automation Audit",
  primaryMicro: "Walk away with a clear plan. No pitch. No obligation.",

  internalLinks: [
    { label: "After-Hours Automation", href: "/services/after-hours-automation", desc: "24/7 call capture and dispatch" },
    { label: "Lead Response Automation", href: "/services/lead-response-automation", desc: "Respond in 90 seconds, every time" },
    { label: "Appointment Automation", href: "/services/appointment-automation", desc: "Scheduling optimized automatically" },
    { label: "Invoice Automation", href: "/services/invoice-automation", desc: "Invoices on job completion" },
    { label: "Contractors", href: "/industries/contractors", desc: "Automation for contracting businesses" },
  ],
};

export default function HomeServices() {
  useEffect(() => {
    document.title = data.title;
  }, []);
  return <IndustryPageLayout data={data} heroVisual={<TemplateMoneyLeakPipeline industry="Home Services" />} />;
}
