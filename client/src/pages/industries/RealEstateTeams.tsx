import { useEffect } from "react";
import IndustryPageLayout, { IndustryPageData } from "@/components/industry/IndustryPageLayout";
import IndustryPlannerCTA from "@/components/planner-cta/IndustryPlannerCTA";

const data: IndustryPageData = {
  title: "AI Automation for Real Estate Teams Toronto | Never Lose a Lead to Slow Follow-Up | Barrana.ai",
  description: "Automate lead capture from all channels, buyer nurture sequences, listing follow-up, CRM management, and post-offer communication for real estate teams. Free audit.",
  route: "real-estate-teams",
  breadcrumb: "Real Estate Teams",
  h1: "Real Estate Leads Have a 5-Minute Window. Your Team Is Showing Properties. Automation Keeps the Pipeline Moving 24/7.",
  subheadline: "Every lead captured from every channel. Immediate qualification. Long-term nurture for 6-12 month buyers. Listing follow-up automated. Your agents talk to ready buyers, not cold leads.",
  body: [
    "Buyer and seller leads arrive through Realtor.ca, Facebook ads, Google, your website, and referrals at unpredictable times. The first agent to respond with substance earns the appointment. But your team is out showing properties, in meetings, or done for the evening.",
    "Without automation, lead response is random. Long-term nurture gets abandoned after 2 weeks. CRM records are updated at end of day if at all. The pipeline leaks at every stage.",
  ],
  ctaMicro: "See how many leads your team is losing to inconsistent follow-up. Free audit.",

  costHeading: "What Inconsistent Follow-Up Costs Your Team",
  costItems: [
    { figure: "5 Minutes", label: "Response Window", desc: "Industry data shows that after 5 minutes, the odds of meaningful contact drop dramatically. Most agents respond in hours, not minutes." },
    { figure: "6-12 Months", label: "Buyer Timeline", desc: "80% of buyers take 6-12 months to purchase. Without automation, agents stop following up within weeks. Those buyers close with someone else." },
    { figure: "End of Day", label: "CRM Accuracy", desc: "Lead stages wrong. Pipeline forecasts fiction. Managers cannot see what is real. Agents cannot see their own pipeline accurately." },
  ],

  problemsHeading: undefined,
  problems: [
    { title: "Leads From Multiple Sources, No Unified System", desc: "Realtor.ca, Facebook, Google Ads, website, referrals, open houses. Each arriving in a different inbox, DM, or form. No single capture point." },
    { title: "Response Time Is Random", desc: "Some leads get a call in 10 minutes. Others wait 4 hours. It depends on where the agent is, not on a system." },
    { title: "Long-Term Nurture Gets Abandoned", desc: "A 12-month buyer gets excited attention for week one. By week three, the agent is focused on today's showings. That buyer is lost." },
    { title: "Post-Offer Communication Is Manual", desc: "Offer accepted. Closing checklist. Document collection. Milestone notifications. All manual. All inconsistent." },
  ],

  beforeAfterMetrics: [
    { label: "Lead Sources", before: "Scattered across platforms", after: "Unified pipeline with source tracking", beforeW: 80, afterW: 10 },
    { label: "Response Time", before: "Random, hours", after: "Under 90 seconds, 24/7", beforeW: 88, afterW: 8 },
    { label: "Buyer Nurture", before: "Abandoned after 2-4 weeks", after: "Automated 6-12 month sequence", beforeW: 90, afterW: 8 },
    { label: "CRM Accuracy", before: "End of day manual entry", after: "Auto-updated every interaction", beforeW: 75, afterW: 8 },
    { label: "Post-Offer Process", before: "Manual, inconsistent", after: "Automated checklist + milestones", beforeW: 80, afterW: 10 },
  ],

  workflowHeading: "Systems We Build for Real Estate Teams",
  workflowSteps: [
    { label: "Lead From Any Source", type: "trigger" },
    { label: "90s Response", type: "ai" },
    { label: "Qualify Buyer", type: "ai" },
    { label: "Assign to Agent", type: "action" },
    { label: "6-12mo Nurture", type: "action" },
    { label: "Showing Booked", type: "action" },
    { label: "Offer to Close", type: "outcome" },
  ],
  workflowBadge: "Response: hours → 90 seconds",

  controlItems: [
    { title: "Stop-Loss", desc: "Leads in price ranges above team threshold flagged for team lead review before assignment." },
    { title: "Retries", desc: "CRM update failures retry automatically. No lead data lost to API issues." },
    { title: "Approvals", desc: "Team lead distribution rules configurable: geography, property type, round-robin, capacity, or custom." },
    { title: "Logging", desc: "Every interaction, email open, listing click, and response logged against client record." },
    { title: "Escalation", desc: "Hot leads (high engagement score) trigger immediate agent notification regardless of time." },
  ],

  roiMetrics: [
    { label: "Lead Response", before: "Hours", after: "Under 90 seconds" },
    { label: "Follow-Up Consistency", before: "Sporadic", after: "100% automated" },
    { label: "Long-Term Nurture", before: "Abandoned", after: "12-month automated sequence" },
    { label: "CRM Accuracy", before: "End-of-day manual", after: "Real-time auto-update" },
    { label: "Lead-to-Showing Rate", after: "Improved through faster, consistent response" },
    { label: "Payback Period", after: "30-60 days" },
  ],
  roiNote: "These are typical outcomes. The Automation Audit provides a projection for your specific practice.",

  bestFit: [
    "Real estate teams with 2+ agents",
    "Agents/teams generating 30+ leads per month from multiple sources",
    "Operations where showing schedule prevents timely lead response",
    "Teams with significant long-term buyer pipeline",
  ],
  notFit: [
    "Brand new agents with fewer than 5 leads per month",
    "Agents who personally call every lead within 2 minutes already",
  ],

  aeoQuestion: "How does AI automation help real estate teams?",
  aeoAnswer: "AI automation helps real estate teams by capturing leads from all channels (Realtor.ca, Facebook, Google, website, referrals) into one CRM pipeline, responding within 90 seconds with qualification, running long-term nurture sequences for 6-12 month buyers with market updates and listing alerts, automating listing appointment follow-up, and managing post-offer communication through to closing. This ensures no lead is lost to slow response and no long-term buyer is abandoned.",

  faqItems: [
    { question: "Lead distribution for teams?", answer: "Configurable: round-robin, geographic, property type, capacity-based, or custom rules." },
    { question: "Which CRMs?", answer: "Follow Up Boss, LionDesk, HubSpot, Go High Level, and others." },
    { question: "Can it send listing alerts?", answer: "Yes. Connected to your MLS feed or listing database for automatic buyer notifications matching their criteria." },
    { question: "How long to implement?", answer: "Standard real estate automation: 2-3 weeks." },
    { question: "Does it work for individual agents?", answer: "Yes. Solo agents benefit from consistent follow-up they cannot maintain manually while showing properties." },
    { question: "Cost?", answer: "Real estate team automation: $4,000-$8,000 CAD. Typically pays for itself with the first deal closed from a lead that would have been lost." },
  ],

  ctaHeadline: "Your Pipeline Leaks at Every Stage. Every Unfollowed Lead Is Commission Lost. Plug the Gaps.",
  ctaBody: "Walk away with a clear plan for capturing every lead and nurturing every buyer. Free. No pitch. No obligation.",
  primaryCTA: "Get Your Free Real Estate Teams Automation Audit",
  primaryMicro: "Walk away with a clear plan. No pitch. No obligation.",

  internalLinks: [
    { label: "Lead Response Automation", href: "/services/lead-response-automation", desc: "Respond in 90 seconds, every time" },
    { label: "CRM Automation", href: "/services/crm-automation", desc: "Your CRM stays current automatically" },
    { label: "After-Hours Automation", href: "/services/after-hours-automation", desc: "Capture leads while your team sleeps" },
    { label: "Case Studies", href: "/case-studies", desc: "Real results from real clients" },
  ],
};

export default function RealEstateTeams() {
  useEffect(() => {
    document.title = data.title;
  }, []);
  return (
    <IndustryPageLayout data={data}>
      <IndustryPlannerCTA industryName="Real Estate Teams" industrySlug="real-estate" />
    </IndustryPageLayout>
  );
}
