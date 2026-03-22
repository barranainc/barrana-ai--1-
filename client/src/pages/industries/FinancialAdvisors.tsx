import { useEffect } from "react";
import IndustryPageLayout, { IndustryPageData } from "@/components/industry/IndustryPageLayout";
import TemplateTimeDrainWaterfall from "@/components/hero-visuals/TemplateTimeDrainWaterfall";

const data: IndustryPageData = {
  title: "AI Automation for Financial Advisors Toronto | Barrana.ai",
  description:
    "Automate client onboarding, annual review scheduling, KYC document collection, compliance logging, and milestone touchpoints for financial advisory practices. Free audit.",
  route: "financial-advisors",
  breadcrumb: "Financial Advisors",
  h1: "Your Clients Expect Proactive Communication. Your Calendar Says Otherwise. Automation Bridges the Gap.",
  subheadline:
    "Annual reviews scheduled automatically. KYC documents collected through secure portals. Birthday and milestone touchpoints run themselves. Compliance logging is continuous. Your advisors advise.",
  body: [
    "Financial advisory is a relationship business. Clients expect proactive outreach, timely reviews, and personal attention. But most advisors manage 100-300 households. Keeping up with annual reviews, KYC renewals, birthday greetings, market updates, and life-event check-ins manually is impossible at scale.",
    "The advisors who grow their book fastest are not working harder. They have systems that maintain the relationship rhythm while they focus on financial planning and new business.",
  ],
  ctaMicro: "See how many client touchpoints you are missing. Free 60-minute audit.",

  costHeading: "What Manual Operations Cost Financial Advisors",
  costItems: [
    {
      figure: "30-40%",
      label: "Annual Reviews Overdue",
      desc: "You should review every client annually. Without systematic scheduling, a third of your book never gets their review until they ask for one.",
    },
    {
      figure: "Regulatory Risk",
      label: "KYC Renewals Expiring",
      desc: "Know Your Client documents expire. Manual tracking means some expire without renewal. Regulatory exposure increases.",
    },
    {
      figure: "Sporadic",
      label: "Client Touchpoints",
      desc: "Birthdays, market milestones, life events. The personal touches that retain clients happen sporadically instead of systematically.",
    },
  ],

  problems: [
    {
      title: "Annual Reviews Fall Behind",
      desc: "With 200 households, scheduling and conducting annual reviews is a year-round effort. Without automation, you only review clients who call you or who you remember.",
    },
    {
      title: "KYC Document Collection Is Manual",
      desc: "Every client needs updated KYC documentation periodically. Tracking expiration dates and collecting updated documents manually is time-consuming and error-prone.",
    },
    {
      title: "Onboarding Is Inconsistent",
      desc: "New client experience depends on which advisor and which assistant handles them. No standard sequence from engagement to first review.",
    },
    {
      title: "Client Retention Touchpoints Are Sporadic",
      desc: "Birthday emails, portfolio milestone acknowledgments, market commentary. These retention tools only work when they are consistent.",
    },
  ],

  beforeAfterMetrics: [
    { label: "Annual Reviews", before: "30-40% overdue", after: "100% scheduled at 11 months", beforeW: 85, afterW: 8 },
    { label: "KYC Tracking", before: "Manual, some expired", after: "90/60/30-day renewal reminders", beforeW: 80, afterW: 10 },
    { label: "Client Onboarding", before: "Varies by advisor", after: "Consistent 5-step sequence", beforeW: 75, afterW: 10 },
    { label: "Client Touchpoints", before: "Sporadic, memory-dependent", after: "Automated birthdays + milestones", beforeW: 85, afterW: 8 },
    { label: "Compliance Logging", before: "Manual, gaps possible", after: "Continuous automated logging", beforeW: 80, afterW: 8 },
  ],

  workflowHeading: "Systems We Build for Financial Advisors",
  workflowSteps: [
    { label: "New Client Signs", type: "trigger" },
    { label: "KYC Collection", type: "action" },
    { label: "Onboarding Sequence", type: "action" },
    { label: "Annual Review (11mo)", type: "action" },
    { label: "Milestone Touchpoints", type: "ai" },
    { label: "Compliance Logged", type: "action" },
    { label: "Book Review", type: "outcome" },
  ],
  workflowBadge: "Annual review completion: 60% → 95%+",

  controlItems: [
    {
      title: "Stop-Loss",
      desc: "KYC documents that do not match client profile (wrong name, expired ID) flagged for advisor review rather than auto-accepted.",
    },
    {
      title: "Retries",
      desc: "Communication delivery failures retry through alternate channels. No client touchpoint lost to a bounced email.",
    },
    {
      title: "Approvals",
      desc: "Market commentary and investment-related communications require advisor approval before distribution.",
    },
    {
      title: "Logging",
      desc: "All client communications logged per household for MFDA/IIROC compliance. Complete, searchable audit trail.",
    },
    {
      title: "Escalation",
      desc: "Clients who express dissatisfaction or mention complaints in any channel flagged immediately to compliance and advisor.",
    },
  ],

  roiMetrics: [
    { label: "Annual Review Completion", before: "60-70%", after: "95%+" },
    { label: "KYC Compliance", after: "Proactive, zero expired documents" },
    { label: "Client Touchpoints", before: "Sporadic", after: "Systematic" },
    { label: "Onboarding Quality", after: "Consistent, professional every time" },
    { label: "Compliance Risk", after: "Significantly reduced" },
    { label: "Payback Period", after: "Within first quarter" },
  ],
  roiNote:
    "These are typical outcomes. The Automation Audit provides a projection for your specific business.",

  bestFit: [
    "Advisors managing 100+ households",
    "Multi-advisor firms needing consistent client experience",
    "Practices where compliance logging is a regulatory requirement",
    "Advisors wanting to grow AUM without proportional admin growth",
  ],
  notFit: [
    "Brand new advisors with fewer than 30 clients",
    "Advisors with a full-time dedicated assistant already managing all touchpoints",
  ],

  aeoQuestion: "How does AI automation help financial advisors?",
  aeoAnswer:
    "AI automation helps financial advisors by scheduling annual reviews automatically (11-month cycle per client), collecting KYC documents through secure portals with renewal reminders, running consistent client touchpoints (birthdays, portfolio milestones, market updates), standardizing new client onboarding, and maintaining continuous compliance logging of all client communications. This ensures no client is neglected, no KYC document expires unnoticed, and advisors focus on planning and business development rather than administrative scheduling.",

  faqItems: [
    { question: "CRM integration?", answer: "We integrate with Salesforce, Redtail, Wealthbox, and other advisor CRMs." },
    {
      question: "MFDA/IIROC compliance?",
      answer: "All communications logged per client with full audit trail. Designed for regulatory review readiness.",
    },
    {
      question: "Can it handle segmented client tiers?",
      answer: "Yes. Different service levels (A/B/C clients) can have different touchpoint frequencies and review schedules.",
    },
    {
      question: "Market commentary distribution?",
      answer: "Automated to segmented client lists with advisor approval required before send.",
    },
    { question: "How long?", answer: "Standard advisor automation: 3-4 weeks." },
    {
      question: "How much?",
      answer: "Financial advisor automation: $5,000-$10,000 CAD. Pays for itself through improved retention and compliance risk reduction.",
    },
  ],

  ctaHeadline:
    "Your Clients Expect Proactive Service. Automation Delivers It at Scale. Every Client, Every Time.",
  ctaBody:
    "Walk away with a clear plan for reaching every client, every year, with zero gaps. Free. No pitch. No obligation.",
  primaryCTA: "Get Your Free Financial Advisors Automation Audit",
  primaryMicro: "Walk away with a clear plan. No pitch. No obligation.",

  internalLinks: [
    { label: "CRM Automation", href: "/services/crm-automation", desc: "Your CRM stays current automatically" },
    { label: "Document Collection", href: "/services/document-collection", desc: "Automate every document request" },
    { label: "Operations Reporting", href: "/services/operations-reporting", desc: "Weekly reports delivered automatically" },
    { label: "Insurance Brokers", href: "/industries/insurance-brokers", desc: "Automation for insurance professionals" },
    { label: "Mortgage Brokers", href: "/industries/mortgage-brokers", desc: "Automation for mortgage professionals" },
  ],
};

export default function FinancialAdvisors() {
  useEffect(() => {
    document.title = data.title;
  }, []);
  return <IndustryPageLayout data={data} heroVisual={<TemplateTimeDrainWaterfall industry="Financial Advisors" drains={[{label:"Client reporting",hours:10},{label:"Compliance docs",hours:7},{label:"Meeting prep",hours:5},{label:"Admin/CRM entry",hours:4}]} />} />;
}
