import { useEffect } from "react";
import CaseStudyPageLayout, { CaseStudyData } from "@/components/case-study/CaseStudyPageLayout";

const data: CaseStudyData = {
  title: "Real Estate Team Automation Case Study | 12-Month Nurture System | Barrana.ai",
  description:
    "How a 4-agent real estate team in Markham automated lead capture, 12-month buyer nurture, and CRM management. Pipeline value increased 40% in 6 months.",
  slug: "real-estate-team-markham",
  industry: "Real Estate Teams",
  location: "Markham, Ontario",
  teamSize: "4 agents + 1 coordinator",
  relatableIndustries: [
    "Real Estate",
    "Mortgage Brokers",
    "Insurance Brokers",
    "Financial Advisors",
  ],
  h1: "How a 4-Agent Team Stopped Abandoning 12-Month Buyers and Grew Pipeline Value by 40%",
  subheadline:
    "Every lead captured from 5 channels into one pipeline. 90-second response time. 12-month nurture that never stops. CRM that actually stays current. Agents show properties instead of manage spreadsheets.",
  intro:
    "This Markham real estate team was generating 80+ leads per month from Realtor.ca, Facebook, Google Ads, their website, and open houses. Long-term buyers (6-12 month timeline) received enthusiastic attention for 2 weeks, then were abandoned as agents focused on active showings.",
  businessDescription:
    "A real estate team operating out of Markham serving Markham, Unionville, Scarborough, and surrounding areas. Team lead plus 3 buyer/listing agents and a team coordinator. 80+ leads per month from 5 channels. Average transaction value: $850,000.",
  problemBody: [
    "Leads from 5 channels arrived in 5 different places. No unified capture. Some leads were seen immediately, others sat for hours.",
    "Response time averaged 2-6 hours. By the time an agent called, the buyer had already spoken with 2-3 other agents.",
    "80% of buyer leads had 6-12 month timelines. Agents followed up for 1-2 weeks then got consumed by active showings. These long-term leads were effectively abandoned.",
    "CRM data was entered manually at end of day. Pipeline reports were inaccurate by month-end.",
  ],
  beforeMetrics: [
    { label: "Lead response time", value: "2-6 hours" },
    { label: "Lead sources unified", value: "0 of 5" },
    { label: "Long-term nurture duration", value: "1-2 weeks" },
    { label: "CRM accuracy", value: "60-70%" },
    { label: "Long-term buyers lost", value: "Significant" },
  ],
  solutionIntro:
    "We built a unified lead capture + qualification + 12-month nurture + CRM automation system. All leads from all 5 channels funnel into Go High Level. Every lead gets an immediate response. Long-term buyers enter a 12-month sequence.",
  workflowSteps: [
    {
      id: "lead-arrives",
      label: "Lead from Any Channel",
      sublabel: "Realtor.ca, Facebook, Google Ads, website, or open house",
      type: "trigger",
      icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
      color: "#F59E0B",
    },
    {
      id: "response-qualify",
      label: "90s Response + Qualify",
      sublabel: "Instant automated response, timeline qualification, agent assignment",
      type: "action",
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "#283891",
    },
    {
      id: "nurture-sequence",
      label: "12-Month Nurture Sequence",
      sublabel: "AI-personalized content based on search behaviour and timeline",
      type: "ai",
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      color: "#7E0F4A",
    },
    {
      id: "agent-alert",
      label: "Engagement Spike → Agent Alert",
      sublabel: "Hot lead triggers immediate agent notification with full context",
      type: "outcome",
      icon: "M5 13l4 4L19 7",
      color: "#10B981",
    },
  ],
  controlItems: [
    {
      title: "Stop-Loss",
      desc: "Leads above team price threshold flagged for team lead review.",
    },
    {
      title: "Retries",
      desc: "CRM sync failures retried automatically.",
    },
    {
      title: "Approvals",
      desc: "Team lead distribution rules configurable: geographic, round-robin, capacity.",
    },
    {
      title: "Logging",
      desc: "Every touchpoint logged. Team lead sees exactly what communication each lead received.",
    },
    {
      title: "Escalation",
      desc: "Hot leads (multiple listing clicks in 24hr) trigger immediate agent alert.",
    },
  ],
  tools: [
    "Go High Level",
    "Make (Integromat)",
    "Facebook Lead Ads API",
    "Realtor.ca parsing",
    "Google Calendar",
  ],
  results: [
    {
      label: "Lead response",
      before: "2-6 hours",
      after: "Under 90 seconds",
      beforeW: 85,
      afterW: 10,
    },
    {
      label: "Long-term nurture",
      before: "1-2 weeks",
      after: "12-month automated",
      beforeW: 80,
      afterW: 10,
    },
    {
      label: "CRM accuracy",
      before: "60-70%",
      after: "95%+ (auto-updated)",
      beforeW: 55,
      afterW: 90,
    },
    {
      label: "Pipeline value",
      before: "Baseline",
      after: "+40% in 6 months",
      beforeW: 40,
      afterW: 80,
    },
    {
      label: "Additional closings",
      before: "0 from nurture",
      after: "6 in first 8 months",
      beforeW: 5,
      afterW: 80,
    },
  ],
  implementationTimeline: "3 weeks",
  investmentRange: "$5,000–$8,000 CAD",
  payback: "Within first nurtured transaction",
  keyResultCallout:
    "Pipeline value up 40% in 6 months. 6 additional transactions from nurtured leads in first 8 months. 90-second response for every lead. 12-month nurture that never stops. Zero CRM data entry for agents.",
  whyItMatters:
    "Real estate is a long-game business. 80% of buyers take 6-12 months. Manual follow-up cannot sustain 12 months of consistent communication across hundreds of leads. Automation can.",
  whyBullets: [
    "Your leads come from multiple channels with no unified capture",
    "Long-term prospects get abandoned after 2-3 weeks",
    "Your CRM data is outdated by end of day",
    "Agents cannot tell which leads are actively engaged",
    "You know you are losing long-term buyers but cannot track where they go",
  ],
  crossIndustryItems: [
    { industry: "Real Estate Teams", note: "Exact scenario." },
    {
      industry: "Mortgage Brokers",
      note: "Long-term nurture for pre-approval clients follows same pattern.",
    },
    { industry: "Insurance Brokers", note: "Quote follow-up and renewal retention." },
    {
      industry: "Financial Advisors",
      note: "Prospect nurture over months before they become clients.",
    },
    {
      industry: "Any Long-Sales-Cycle Business",
      note: "Same nurture principles apply across industries.",
    },
  ],
  ctaHeadline:
    "Your Pipeline Is Full of 12-Month Buyers. Without Nurture, They Close With Someone Else.",
  ctaBody:
    "The audit maps your lead sources, follow-up gaps, and shows you what a 12-month automated nurture system looks like for your team.",
  internalLinks: [
    { label: "Real Estate Teams", href: "/industries/real-estate-teams" },
    { label: "Lead Response Automation", href: "/services/lead-response-automation" },
    { label: "CRM Automation", href: "/services/crm-automation" },
    { label: "After-Hours Automation", href: "/services/after-hours-automation" },
    { label: "All Case Studies", href: "/case-studies" },
  ],
  color: "#7E0F4A",
};

export default function RealEstateTeamMarkham() {
  useEffect(() => {
    document.title = data.title;
  }, []);
  return <CaseStudyPageLayout data={data} />;
}
