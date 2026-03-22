import { useEffect } from "react";
import IndustryPageLayout, { IndustryPageData } from "@/components/industry/IndustryPageLayout";

const data: IndustryPageData = {
  title: "AI Automation for Insurance Brokers Toronto | Never Miss a Renewal | Barrana.ai",
  description: "Automate quote follow-up, renewal reminders, client onboarding, cross-sell detection, and compliance logging for insurance brokerages. Free audit.",
  route: "insurance-brokers",
  breadcrumb: "Insurance Brokers",
  h1: "40% of Your Quotes Get Zero Follow-Up. 15-20% of Your Renewals Lapse. Both Are Fixable.",
  subheadline: "Quote follow-up sequences run automatically at 48hr/7d/14d. Renewal reminders go out 90/60/30 days before expiry. Cross-sell opportunities are surfaced systematically. Your brokers sell instead of chase.",
  body: [
    "Insurance brokerages live on two things: closing new business and retaining renewals. Both depend on consistent, precisely timed follow-up that no human broker can maintain across hundreds of active policies and open quotes.",
    "Without automation, quote follow-up depends on the broker's workload that week. Renewal tracking depends on a spreadsheet someone updates monthly. Both fail silently.",
  ],
  ctaMicro: "See how many quotes and renewals are falling through the cracks. Free 60-minute audit.",

  costHeading: "What Manual Follow-Up Costs Your Brokerage",
  costItems: [
    { figure: "40%", label: "Quotes With Zero Follow-Up", desc: "Quote sent. Broker gets busy with service calls and claims. No check-in ever happens. Client goes with whoever follows up." },
    { figure: "15-20%", label: "Renewal Lapse Rate", desc: "Policies expire because the reminder was sent too late or not at all. Lost client, lost recurring commission, lost referral potential." },
    { figure: "$200-$500", label: "Cross-Sell Revenue Untapped Per Client", desc: "Clients with home insurance who need auto. No systematic process to identify and present these opportunities." },
  ],

  problemsHeading: undefined,
  problems: [
    { title: "Quote Follow-Up Is Random", desc: "Some quotes get 3 follow-up calls. Others get zero. The difference is not strategy — it is which week the broker had time." },
    { title: "Renewals Slip Through the Cracks", desc: "With hundreds of policies on different renewal dates, manual tracking guarantees some are missed. You find out when the client calls about a gap in coverage." },
    { title: "Client Onboarding Is Inconsistent", desc: "New clients receive different experiences depending on which broker handles them. No standard welcome sequence, document collection, or introduction process." },
    { title: "Cross-Sell Opportunities Are Invisible", desc: "You have clients with incomplete coverage. Without systematic analysis, these opportunities are only discovered during random conversations." },
  ],

  beforeAfterMetrics: [
    { label: "Quote Follow-Up", before: "40% (broker availability)", after: "100% automated 48hr/7d/14d", beforeW: 80, afterW: 8 },
    { label: "Renewal Tracking", before: "Manual spreadsheet", after: "90/60/30-day auto sequence", beforeW: 85, afterW: 8 },
    { label: "Client Onboarding", before: "Varies by broker", after: "Consistent welcome every client", beforeW: 75, afterW: 10 },
    { label: "Cross-Sell Detection", before: "Reactive, conversation-only", after: "System identifies gaps + alerts", beforeW: 90, afterW: 15 },
    { label: "CRM Updates", before: "When broker has time", after: "Auto-updated every interaction", beforeW: 80, afterW: 8 },
  ],

  workflowHeading: "Systems We Build for Insurance Brokers",
  workflowSteps: [
    { label: "Quote Sent", type: "trigger" },
    { label: "48hr Follow-Up", type: "action" },
    { label: "7-Day Follow-Up", type: "action" },
    { label: "14-Day Final", type: "action" },
    { label: "Policy Bound", type: "action" },
    { label: "Renewal Sequence", type: "action" },
    { label: "Renewal Retained", type: "outcome" },
  ],
  workflowBadge: "Quote follow-up: 40% → 100%",

  controlItems: [
    { title: "Stop-Loss", desc: "Renewal reminders for cancelled or non-renewed policies automatically suppressed. No outreach to former clients about policies that no longer exist." },
    { title: "Retries", desc: "Email bounce triggers SMS delivery attempt. No renewal reminder lost to outdated contact info." },
    { title: "Approvals", desc: "Cross-sell outreach requires broker approval before client contact. Mass communications require manager sign-off." },
    { title: "Logging", desc: "All client communications logged per policy for RIBO compliance, E&O documentation, and audit trail." },
    { title: "Escalation", desc: "Renewals with zero client response 14 days before expiry escalate to brokerage principal with full communication history." },
  ],

  roiMetrics: [
    { label: "Quote Follow-Up", before: "40%", after: "100%" },
    { label: "Renewal Retention", after: "Improved 15-20% (reduced lapse rate)" },
    { label: "Onboarding Consistency", after: "Professional, every client" },
    { label: "Cross-Sell Identification", after: "Systematic rather than accidental" },
    { label: "Broker Admin Time", after: "Reduced — more time selling" },
    { label: "Payback Period", after: "Within first renewal cycle" },
  ],
  roiNote: "These are typical outcomes. The Automation Audit provides a projection for your specific practice.",

  bestFit: [
    "Insurance brokerages with 200+ active policies",
    "Multi-broker offices where follow-up consistency varies",
    "Brokerages with renewal lapse rates above 10%",
    "Growing brokerages wanting to scale without proportional admin staff",
  ],
  notFit: [
    "Brand new brokerages without an established book of business",
    "Brokerages with dedicated renewal coordinator already achieving 95%+ retention",
  ],

  aeoQuestion: "How does AI automation help insurance brokers?",
  aeoAnswer: "AI automation helps insurance brokers by running automated quote follow-up sequences (48-hour, 7-day, 14-day), sending renewal reminders at 90, 60, and 30 days before policy expiry, standardizing new client onboarding with welcome sequences and document collection, and identifying cross-sell opportunities by analyzing coverage gaps in client portfolios. This ensures no quote goes unfollowed, no renewal lapses due to missed reminders, and brokers focus on relationship management rather than administrative chasing.",

  faqItems: [
    { question: "Which broker management systems?", answer: "We integrate with Applied Epic, Vertafore, HawkSoft, PowerBroker, and CRM-based systems." },
    { question: "Commercial and personal lines?", answer: "Yes. Separate workflows and timelines for each line of business. Commercial renewals typically need longer lead times." },
    { question: "RIBO compliance?", answer: "All client communications logged per policy. Complete audit trail maintained for regulatory and E&O documentation requirements." },
    { question: "How long to implement?", answer: "Standard brokerage automation: 3-4 weeks." },
    { question: "Does it work for independent brokers?", answer: "Yes. Solo and small brokerages benefit most because they have the least admin support for manual follow-up." },
    { question: "How much?", answer: "Insurance brokerage automation: $5,000-$10,000 CAD. Typically pays for itself within the first renewal cycle through retained policies." },
    { question: "Can it handle multi-policy households?", answer: "Yes. The system links policies to household records, coordinates renewal dates, and prevents duplicate outreach." },
  ],

  ctaHeadline: "Every Unfollowed Quote Is Commission Lost. Every Missed Renewal Is a Client Gone. Automate the Follow-Up That Keeps Your Book Growing.",
  ctaBody: "Walk away with a clear plan for 100% quote follow-up and near-zero renewal lapses. Free. No pitch. No obligation.",
  primaryCTA: "Get Your Free Insurance Brokers Automation Audit",
  primaryMicro: "Walk away with a clear plan. No pitch. No obligation.",

  internalLinks: [
    { label: "Lead Response Automation", href: "/services/lead-response-automation", desc: "Respond in 90 seconds, every time" },
    { label: "CRM Automation", href: "/services/crm-automation", desc: "Your CRM stays current automatically" },
    { label: "Operations Reporting", href: "/services/operations-reporting", desc: "Weekly reports delivered automatically" },
    { label: "Mortgage Brokers", href: "/industries/mortgage-brokers", desc: "Similar systems for mortgage professionals" },
    { label: "Financial Advisors", href: "/industries/financial-advisors", desc: "Automation for advisory practices" },
  ],
};

export default function InsuranceBrokers() {
  useEffect(() => {
    document.title = data.title;
  }, []);
  return <IndustryPageLayout data={data} />;
}
