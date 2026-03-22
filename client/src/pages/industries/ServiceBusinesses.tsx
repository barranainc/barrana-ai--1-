import { useEffect } from "react";
import IndustryPageLayout, { IndustryPageData } from "@/components/industry/IndustryPageLayout";
import IndustryPlannerCTA from "@/components/planner-cta/IndustryPlannerCTA";

const data: IndustryPageData = {
  title: "AI Automation for Service Businesses Toronto | Systematize the Client Lifecycle | Barrana.ai",
  description: "AI automation for any service business: lead response, intake, scheduling, invoicing, follow-up, and reviews. If you run on appointments and clients, this is for you.",
  route: "service-businesses",
  breadcrumb: "Service Businesses",
  h1: "If Your Business Runs on Appointments, Inquiries, and Follow-Ups, It Is Ready for Automation.",
  subheadline: "Lead response in 90 seconds. Client intake in under 5 minutes. Automated scheduling and reminders. Same-day invoicing. Review requests that run themselves. The entire client lifecycle, systematized.",
  body: [
    "Service businesses share a common operational cycle: clients inquire, get onboarded, receive the service, and are invoiced. At every stage, manual tasks create delays, inconsistency, and hours of wasted staff time.",
    "The businesses that grow fastest systematize these operational layers early. Their team scales the delivery. The system handles the coordination.",
  ],
  ctaMicro: "See which part of your client lifecycle needs automation most. Free 60-minute audit.",

  costHeading: "What Manual Operations Cost a Typical Service Business",
  costItems: [
    { figure: "15-25 hrs/wk", label: "Coordination Overhead", desc: "Data entry, follow-up, scheduling, reminders, invoicing, reporting. None of it requires your team's core expertise." },
    { figure: "40%", label: "Follow-Up Rate", desc: "Without automation, more than half your pipeline gets zero follow-up. You are leaving revenue on the table." },
    { figure: "Inconsistent", label: "Client Experience", desc: "Quality depends on who handles the client. Some get a professional, seamless experience. Others get delays and dropped communications." },
  ],

  problemsHeading: undefined,
  problems: [
    { title: "Leads Respond Too Late", desc: "Inquiries sit for hours while your team handles existing clients. Competitors who respond faster win the business before you know it was available." },
    { title: "Onboarding Varies by Person", desc: "No standard process. New client experience depends entirely on which staff member handles them." },
    { title: "Scheduling Is Manual and Fragile", desc: "Bookings through calls and emails. Reminders inconsistent. No-shows preventable but not prevented." },
    { title: "Invoicing Is an Afterthought", desc: "Work finishes. Invoice depends on someone remembering. Cash flow lags unnecessarily." },
  ],

  beforeAfterMetrics: [
    { label: "Lead Response", before: "4-8 hours", after: "Under 90 seconds, 24/7", beforeW: 88, afterW: 8 },
    { label: "Client Onboarding", before: "Inconsistent by staff", after: "Automated, consistent every time", beforeW: 75, afterW: 10 },
    { label: "Scheduling", before: "Manual phone calls", after: "Self-serve with dual reminders", beforeW: 80, afterW: 8 },
    { label: "Follow-Up Rate", before: "40% of leads", after: "100% automated", beforeW: 80, afterW: 8 },
    { label: "Invoicing", before: "2+ weeks after completion", after: "Same-day, triggered on completion", beforeW: 85, afterW: 5 },
  ],

  workflowHeading: "Systems We Build for Service Businesses",
  workflowSteps: [
    { label: "Inquiry Arrives", type: "trigger" },
    { label: "90s Response", type: "ai" },
    { label: "Qualify + Onboard", type: "action" },
    { label: "Schedule + Remind", type: "action" },
    { label: "Deliver Service", type: "action" },
    { label: "Invoice Sent", type: "action" },
    { label: "Review + Referral", type: "outcome" },
  ],
  workflowBadge: "Full lifecycle systematized",

  controlItems: [
    { title: "Stop-Loss", desc: "Complex inquiries outside defined service scope routed to human rather than auto-responded to incorrectly." },
    { title: "Retries", desc: "All communication failures retry through alternate channels before alerting staff." },
    { title: "Logging", desc: "Complete client lifecycle logged from first inquiry to final invoice and review." },
    { title: "Approvals", desc: "High-value engagements can require owner approval before onboarding workflow proceeds." },
    { title: "Escalation", desc: "Client complaints or negative review signals trigger immediate owner notification." },
  ],

  roiMetrics: [
    { label: "Response Speed", after: "Under 90 seconds 24/7" },
    { label: "Follow-Up Rate", after: "100% automated" },
    { label: "Admin Hours", before: "15-25/week", after: "Recovered" },
    { label: "Client Capacity", after: "20-30% more volume, same team" },
    { label: "Cash Flow", after: "Stabilized through same-day invoicing" },
    { label: "Payback Period", after: "30-60 days" },
  ],
  roiNote: "These are typical outcomes. The Automation Audit provides a projection for your specific practice.",

  bestFit: [
    "Any service business with recurring client workflows",
    "Operations with 20+ client interactions per month",
    "Businesses where coordination overhead limits growth",
    "Teams of 2-50 staff",
  ],
  notFit: [
    "Solo freelancers with very low volume",
    "Businesses without any digital tools adopted",
  ],

  aeoQuestion: "What is AI automation for service businesses?",
  aeoAnswer: "AI automation for service businesses handles the repetitive operational tasks common to all service operations: lead response within seconds, client intake with consistent digital processes, appointment scheduling with automated dual reminders, invoicing triggered on service completion, and follow-up sequences for quotes, reviews, and referrals. The goal is to systematize the entire client lifecycle so every client gets a consistent, professional experience regardless of team workload or time of day.",

  faqItems: [
    { question: "What types of service businesses?", answer: "Any business running on appointments, inquiries, and client relationships: consulting, cleaning, tutoring, repair, wellness, professional services, home services, and more." },
    { question: "Do I need a CRM?", answer: "For automation to work properly, yes. We recommend and set up lightweight CRMs as part of implementation if you do not have one." },
    { question: "Can I start with just one workflow?", answer: "Yes. We recommend starting with the highest-impact workflow (usually lead response or scheduling) and expanding from there." },
    { question: "How much does it cost?", answer: "Single workflow: $1,500-$4,000. Full lifecycle automation: $5,000-$15,000. Fixed pricing after free audit." },
    { question: "How long?", answer: "First workflow live in 2-3 weeks. Full system in 4-8 weeks." },
    { question: "What if I am not sure what to automate first?", answer: "That is exactly what the free audit determines. We map your workflows, score the friction, and tell you where to start." },
  ],

  ctaHeadline: "Your Business Runs on Client Relationships. Automation Makes Sure the Operations Keep Up.",
  ctaBody: "Walk away with a clear plan for systematizing your entire client lifecycle. Free. No pitch. No obligation.",
  primaryCTA: "Get Your Free Service Businesses Automation Audit",
  primaryMicro: "Walk away with a clear plan. No pitch. No obligation.",

  internalLinks: [
    { label: "Lead Response Automation", href: "/services/lead-response-automation", desc: "Respond in 90 seconds, every time" },
    { label: "Client Intake Automation", href: "/services/client-intake-automation", desc: "Consistent onboarding every client" },
    { label: "Appointment Automation", href: "/services/appointment-automation", desc: "Booked, confirmed, reminded automatically" },
    { label: "Invoice Automation", href: "/services/invoice-automation", desc: "Invoices on completion, automatic" },
    { label: "Workflow Automation", href: "/services/workflow-automation", desc: "Connect your tools through automation" },
  ],
};

export default function ServiceBusinesses() {
  useEffect(() => {
    document.title = data.title;
  }, []);
  return (
    <IndustryPageLayout data={data}>
      <IndustryPlannerCTA industryName="Service Businesses" industrySlug="professional-other" />
    </IndustryPageLayout>
  );
}
