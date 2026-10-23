/**
 * Approved meta descriptions for routes that do not render their own <SEOHead> (audit task 2).
 * RouteMetadataFallback uses these first and only then falls back to on-page text, rejecting
 * section labels such as "Quick Summary" or "7 min read". Edit this file, not the components.
 */
export const ROUTE_DESCRIPTIONS: Record<string, string> = {
  "/benchmarks":
    "Illustrative before-and-after ranges for lead response, intake, scheduling and invoicing automation in GTA service businesses. Not a measured study; results depend on your volume and baseline.",
  "/resources/what-is-ai-automation":
    "Learn how AI automation connects your CRM, email, calendar, and forms to reduce repetitive work, with practical examples for small businesses.",
  "/resources/operational-friction-map":
    "Map manual handoffs, repeated tasks, and operational delays. Use Barrana's friction framework to identify and prioritize automation opportunities.",
  "/resources/integration-priority-matrix":
    "Decide which business tools to connect first. Compare workflow impact, integration complexity, and dependencies with Barrana's prioritization framework.",
  "/automation-planner":
    "Identify repetitive tasks and prioritize automation opportunities with Barrana's free planner. Explore a roadmap and what should stay human-led.",
  "/ai-automation-industries":
    "Explore AI automation for accounting firms, immigration practices, clinics, contractors, and other service businesses, with practical workflow examples.",
  "/ai-automation-vaughan":
    "AI automation for small businesses in Vaughan and the GTA: lead response, client intake, scheduling, document collection, and invoicing workflows built on the tools you already use.",
  "/knowledge/ai-agents-for-small-business":
    "What AI agents are, how they differ from simple rule-based automations, and where they help small businesses: handling inquiries, booking appointments, routing tasks, and logging results.",
  "/knowledge/client-intake-automation":
    "How client intake automation moves a new client from inquiry to onboarded: intake forms, CRM records, document requests, scheduling, and welcome sequences without manual re-entry.",
  "/knowledge/lead-automation":
    "How lead response automation works for small businesses: instant acknowledgment, short qualification questions, routing to the right person, CRM logging, and booking links.",
  "/knowledge/top-25-automated-workflows":
    "25 workflows small service businesses commonly automate, grouped by function: lead capture, client onboarding, scheduling, documents, invoicing, and reporting.",
  "/knowledge/workflow-automation-explained":
    "A plain-language guide to workflow automation for small business owners: triggers, conditions, and actions, with examples of connecting the tools you already use.",
  "/operator-insights/admin-hours-annual-cost":
    "How to calculate what weekly admin hours cost your business per year, including the opportunity cost of staff doing coordination instead of client work.",
  "/operator-insights/control-layer-boundaries":
    "Why every business automation needs a control layer: stop conditions, escalation paths, approval steps, and logs that keep automated work reliable and reviewable.",
  "/operator-insights/hidden-cost-manual-intake":
    "The hidden cost of manual client intake: time per client, data-entry errors, response lag, and staff capacity absorbed by coordination instead of client work.",
  "/operator-insights/immigration-intake-field-report":
    "Field report: how an immigration consulting firm in Mississauga cut intake time from about 50 minutes to under 5 by removing manual steps rather than changing its process.",
  "/operator-insights/response-time-systems-problem":
    "Why slow lead response is a systems problem, not a sales problem, and how service businesses can respond consistently without relying on someone noticing every inquiry.",
  "/operator-insights/why-follow-up-fails":
    "Why manual follow-up breaks down when it depends on someone remembering, and how to build follow-up into a system with clear triggers, timing, and ownership.",
  "/operator-insights/accounting-firm-automation":
    "Why accounting firms lose hours chasing client documents, and how automated checklists, reminders, and status tracking reduce the chase during tax season.",
  "/operator-insights/contractor-lead-automation":
    "Why contractors lose more qualified leads to slow response than to price, and how automated replies, qualification, and quote follow-up keep jobs from going to competitors.",
  "/operator-insights/immigration-consultant-automation":
    "What automation can and cannot do for immigration consultants: intake, document requirements, deadline tracking, and file status, with professional judgment kept human.",
  "/operator-insights/law-firm-intake-automation":
    "How law firms can automate client intake while meeting professional obligations: conflict checks, engagement letters, document exchange, and human review.",
  "/operator-insights/physiotherapy-no-show-reduction":
    "A systems approach to reducing no-shows in physiotherapy clinics: reminder timing, confirmations, waitlist fills, and follow-up after missed appointments.",
};

/** Section labels and read-time badges are not descriptions. */
export function isPlaceholderDescription(text: string): boolean {
  const t = text.replace(/\s+/g, " ").trim();
  return t.length < 70 || /^[A-Z0-9 &·\-]+$/.test(t) || /^\d+\s*min read/i.test(t);
}
