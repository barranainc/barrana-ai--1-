import { useEffect } from "react";
import IndustryPageLayout, { IndustryPageData } from "@/components/industry/IndustryPageLayout";

const data: IndustryPageData = {
  title: "AI Automation for Cleaning Companies Toronto | Barrana.ai",
  description:
    "Automate quote requests, booking, reminders, invoicing, review requests, and recurring schedule management for residential and commercial cleaning companies. Free audit.",
  route: "cleaning-companies",
  breadcrumb: "Cleaning Companies",
  h1: "Your Clients Book at 9pm. Your Office Closes at 5pm. Automation Does Not Have Business Hours.",
  subheadline:
    "24/7 quote response. Automated booking with confirmation. Reminders before every clean. Invoice on completion. Google review request after every visit. Recurring schedule management that runs itself.",
  body: [
    "Cleaning companies live on volume: dozens of bookings per week, recurring schedules across hundreds of clients, and a constant flow of new quote requests. The companies that grow fastest are not cleaning more. They are losing less: fewer missed quotes, fewer no-shows, fewer billing delays.",
    "Manual scheduling and follow-up work at 20 clients. At 100 clients, it breaks. Automation scales the operations so you can scale the business.",
  ],
  ctaMicro: "See how many quote requests you are losing to slow response. Free audit.",

  costHeading: "What Manual Operations Cost Cleaning Companies",
  costItems: [
    {
      figure: "0%",
      label: "Evening Quote Capture",
      desc: "Homeowners research cleaning services at night. Every inquiry after hours sits until morning. By then, they have booked elsewhere.",
    },
    {
      figure: "30-40%",
      label: "Quote Follow-Up Rate",
      desc: "You send a quote. Whether you follow up depends on how many cleans you have that week. Most quotes get zero follow-up.",
    },
    {
      figure: "Revenue Leakage",
      label: "Recurring Schedule Gaps",
      desc: "Clients on recurring schedules cancel or skip. Without systematic rebooking and reminders, those slots stay empty.",
    },
  ],

  problems: [
    {
      title: "Quotes Go Unanswered After Hours",
      desc: "Most homeowners look for cleaning services in the evening. If your response comes the next morning, they have already booked.",
    },
    {
      title: "No Systematic Follow-Up on Quotes",
      desc: "Quotes sent but never followed up. Clients who were considering your service never hear from you again.",
    },
    {
      title: "Scheduling Is Manual and Error-Prone",
      desc: "Bookings through phone, text, and email. Double-bookings happen. Clients do not get confirmations or reminders.",
    },
    {
      title: "Invoicing After Every Clean Is a Chore",
      desc: "Dozens of invoices per week, each generated manually. Some go out late. Some go out wrong.",
    },
    {
      title: "Reviews Rarely Requested",
      desc: "Happy clients would leave reviews but nobody asks them. Your Google profile stays stagnant.",
    },
  ],

  beforeAfterMetrics: [
    { label: "Quote Response", before: "Next business day", after: "Under 90 seconds, 24/7", beforeW: 90, afterW: 8 },
    { label: "Quote Follow-Up", before: "30-40%", after: "100% automated 48hr/5d", beforeW: 80, afterW: 8 },
    { label: "Scheduling", before: "Phone/text, no confirmations", after: "Online booking + dual reminders", beforeW: 80, afterW: 8 },
    { label: "Invoicing", before: "Manual after each clean", after: "Automatic on job completion", beforeW: 85, afterW: 5 },
    { label: "Google Reviews", before: "Rarely requested", after: "Automatic after every clean", beforeW: 90, afterW: 8 },
  ],

  workflowHeading: "Systems We Build for Cleaning Companies",
  workflowSteps: [
    { label: "Quote Request 9pm", type: "trigger" },
    { label: "90s Response", type: "ai" },
    { label: "Book + Confirm", type: "action" },
    { label: "Remind Before Clean", type: "action" },
    { label: "Clean Complete", type: "action" },
    { label: "Invoice Auto-Sent", type: "action" },
    { label: "Review Request", type: "outcome" },
  ],
  workflowBadge: "Quote response: next-day → 90 seconds",

  controlItems: [
    {
      title: "Stop-Loss",
      desc: "Double-booking prevention: system checks crew availability before confirming any booking.",
    },
    {
      title: "Retries",
      desc: "SMS/email delivery failures retry through alternate channel before alerting office.",
    },
    {
      title: "Approvals",
      desc: "Large commercial cleaning quotes require manager review before auto-responding.",
    },
    {
      title: "Logging",
      desc: "Every booking, completion, invoice, and client communication logged.",
    },
    {
      title: "Escalation",
      desc: "Client complaints or missed-clean reports trigger immediate manager notification.",
    },
  ],

  roiMetrics: [
    { label: "Quote Response", before: "Next-day", after: "Under 90 seconds 24/7" },
    { label: "Quote Conversion", after: "Improved through consistent follow-up" },
    { label: "No-Shows", after: "Reduced with dual reminders" },
    { label: "Invoicing", after: "Automatic, zero manual effort" },
    { label: "Google Reviews", after: "Consistent after every clean" },
    { label: "Payback Period", after: "Within first month" },
  ],
  roiNote:
    "These are typical outcomes. The Automation Audit provides a projection for your specific business.",

  bestFit: [
    "Cleaning companies with 50+ bookings per month",
    "Operations managing recurring residential schedules",
    "Companies with significant evening/weekend quote volume",
    "Growing companies adding clients faster than admin can handle",
  ],
  notFit: [
    "Solo cleaners with fewer than 10 clients",
    "Companies with a dedicated full-time office manager handling all scheduling",
  ],

  aeoQuestion: "How does AI automation help cleaning companies?",
  aeoAnswer:
    "AI automation helps cleaning companies by responding to quote requests within 90 seconds (including after hours), running quote follow-up sequences, automating booking with confirmations and reminders, generating invoices on job completion, requesting Google reviews after every clean, and managing recurring schedules with rebooking and gap alerts. This captures more leads, reduces no-shows, and eliminates the administrative overhead of manual scheduling and billing.",

  faqItems: [
    {
      question: "Which scheduling tools?",
      answer: "We integrate with Jobber, Housecall Pro, ZenMaid, Launch27, and custom scheduling systems.",
    },
    {
      question: "Can it handle residential and commercial?",
      answer: "Yes. Separate workflows for one-time cleans, recurring residential, and commercial contracts.",
    },
    {
      question: "After-hours response?",
      answer: "Yes. 24/7. AI responds to quote requests at 9pm the same way it responds at 9am.",
    },
    { question: "How long?", answer: "Standard cleaning company automation: 2-3 weeks." },
    {
      question: "How much?",
      answer: "Cleaning company automation: $3,000-$6,000 CAD. Pays for itself within first month through captured quotes.",
    },
    {
      question: "Crew management?",
      answer: "We can automate crew assignment based on geography, availability, and skill level.",
    },
  ],

  ctaHeadline:
    "Your Clients Book When It Is Convenient for Them. Make Sure Your Business Is Ready 24/7.",
  ctaBody:
    "Walk away with a clear plan for capturing every quote and managing every clean automatically. Free. No pitch. No obligation.",
  primaryCTA: "Get Your Free Cleaning Companies Automation Audit",
  primaryMicro: "Walk away with a clear plan. No pitch. No obligation.",

  internalLinks: [
    { label: "Lead Response Automation", href: "/services/lead-response-automation", desc: "Respond in 90 seconds, every time" },
    { label: "After-Hours Automation", href: "/services/after-hours-automation", desc: "Capture leads while you sleep" },
    { label: "Invoice Automation", href: "/services/invoice-automation", desc: "Invoices on job completion" },
    { label: "Appointment Automation", href: "/services/appointment-automation", desc: "Booked, confirmed, reminded" },
    { label: "Service Businesses", href: "/industries/service-businesses", desc: "Automation for all service operations" },
  ],
};

export default function CleaningCompanies() {
  useEffect(() => {
    document.title = data.title;
  }, []);
  return <IndustryPageLayout data={data} />;
}
