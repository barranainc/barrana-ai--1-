/**
 * BARRANA.AI INDUSTRY DETAIL PAGE
 * Dynamic page for each industry vertical
 */
import { Link, useParams } from "wouter";
import { ArrowRight, CheckCircle2, ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const industryData: Record<string, {
  name: string;
  emoji: string;
  heroTitle: string;
  heroSubtitle: string;
  overview: string[];
  problems: { title: string; description: string }[];
  solutions: { title: string; description: string }[];
  outcomes: string[];
  caseStudySnippet?: { title: string; result: string };
  relatedServices: string[];
}> = {
  "immigration-consultants": {
    name: "Immigration Consultants",
    emoji: "🛂",
    heroTitle: "AI Automation for Immigration Consultants in Toronto and the GTA",
    heroSubtitle: "Automate client intake, document collection, and file tracking — so your consultants can focus on the work that actually requires their expertise.",
    overview: [
      "Immigration consulting is one of the most document-intensive professional services in Canada. Every client file involves multiple government forms, supporting documents, identity verification, and correspondence — all managed across email, portals, and physical mail.",
      "The operational problem is not a lack of expertise. It is the volume of administrative coordination required to move each file forward. Consultants spend hours per week chasing documents, sending status updates, and manually updating client records.",
      "Barrana.ai builds automation systems that handle this coordination work systematically, so your consultants can focus on the regulatory and advisory work that actually requires their expertise.",
    ],
    problems: [
      { title: "Intake Takes 30–45 Minutes Per New Client", description: "Manually collecting client information, creating records in your CRM, and sending the initial document checklist consumes consultant time that should be spent on file work." },
      { title: "Document Collection Is a Full-Time Chase", description: "Clients submit documents late, incompletely, or in the wrong format. Staff spend hours following up, re-requesting, and organizing submissions." },
      { title: "File Status Is Invisible Without Manual Checks", description: "Without automated tracking, knowing the current status of each file requires manually checking each one — a process that does not scale." },
      { title: "Consultation Booking Is Manual and Slow", description: "Back-and-forth scheduling for initial consultations and follow-ups consumes administrative time and creates delays in the client experience." },
    ],
    solutions: [
      { title: "Automated Client Intake System", description: "A new client inquiry triggers an immediate confirmation, a structured intake questionnaire, automatic CRM record creation, and consultant assignment based on visa type — all without staff involvement." },
      { title: "Document Collection Workflow", description: "When a file is opened, a document request checklist is automatically sent to the client. The system tracks which documents have been received, sends reminders every 48 hours for outstanding items, and flags overdue files." },
      { title: "File Status Tracking Dashboard", description: "Every file has an automated status that updates as milestones are completed. Consultants see the current state of every active file without manual checking." },
      { title: "Consultation Scheduling Automation", description: "Clients receive a booking link immediately after intake. Reminders are sent automatically at 48 hours and 2 hours before the appointment." },
    ],
    outcomes: [
      "Intake processing time reduced from 45 minutes to approximately 4 minutes",
      "Document chase eliminated — clients receive automated reminders",
      "Consultant capacity increased by an estimated 11 billable hours per week",
      "No-show rate reduced through automated appointment reminders",
      "File status visible in real-time without manual checking",
    ],
    caseStudySnippet: {
      title: "Immigration Firm, North York — Client Intake Automation",
      result: "Intake time per new client dropped from 45 minutes to approximately 4 minutes. Consultant capacity increased by an estimated 11 billable hours per week.",
    },
    relatedServices: ["AI Agents", "Workflow Automation", "Operations Automation"],
  },
  "accounting-firms": {
    name: "Accounting Firms",
    emoji: "📊",
    heroTitle: "AI Automation for Accounting Firms in Toronto and the GTA",
    heroSubtitle: "Eliminate document chase, automate invoice generation, and increase capacity without adding staff — especially during tax season.",
    overview: [
      "Accounting firms face a recurring operational challenge: the work volume during tax season and year-end is significantly higher than the rest of the year, but hiring additional staff for peak periods is not economically viable.",
      "The solution is not more staff — it is removing the administrative overhead that consumes staff time during peak periods. Document collection, invoice generation, client reminders, and status updates can all be automated.",
      "Barrana.ai builds automation systems that give accounting firms the capacity to handle more clients during peak periods without increasing headcount.",
    ],
    problems: [
      { title: "Document Collection Consumes Hours Per Client", description: "Chasing clients for T4s, receipts, and financial statements is a manual, time-consuming process that repeats every engagement cycle." },
      { title: "Invoices Go Out Late and Payment Follows Later", description: "Manual invoice generation means invoices are often delayed, and payment reminders are sent inconsistently — impacting cash flow." },
      { title: "Tax Season Capacity Is a Recurring Crisis", description: "Every year, the same capacity crunch occurs. Staff are overwhelmed, deadlines are tight, and client communication suffers." },
      { title: "Client Onboarding Is Inconsistent", description: "New client onboarding varies by who handles it, leading to inconsistent information collection and delayed engagement starts." },
    ],
    solutions: [
      { title: "Document Collection Automation", description: "When an engagement starts, a structured document request is automatically sent. The system tracks submissions, sends reminders every 48 hours, and flags overdue items — no manual follow-up required." },
      { title: "Invoice Generation and Payment Workflow", description: "Invoices are generated automatically at defined milestones, sent to clients, and followed up with payment reminders at 7, 14, and 21 days." },
      { title: "Client Onboarding Standardization", description: "Every new client receives the same onboarding sequence: welcome email, engagement letter, document checklist, and portal access — automatically." },
      { title: "Tax Season Capacity Management", description: "Automated document organization, client communication, and status tracking reduce the administrative burden during peak periods, allowing staff to focus on technical work." },
    ],
    outcomes: [
      "Document chase time eliminated entirely",
      "Invoice payment cycle accelerated by an estimated 11 days",
      "Tax season capacity increased by an estimated 30% without new hires",
      "Client onboarding standardized across all engagements",
      "Staff time redirected from admin to billable technical work",
    ],
    caseStudySnippet: {
      title: "Accounting Firm, Vaughan — Tax Season Capacity",
      result: "Tax season capacity increased by an estimated 30% without adding staff. Invoice automation accelerated average payment cycle by an estimated 11 days.",
    },
    relatedServices: ["Workflow Automation", "Operations Automation", "AI Agents"],
  },
  "law-firms": {
    name: "Law Firms",
    emoji: "⚖️",
    heroTitle: "AI Automation for Law Firms in Toronto and the GTA",
    heroSubtitle: "Automate matter intake, billing cycles, and client communication so your legal team can focus on billable work.",
    overview: [
      "Law firms operate under strict deadlines, compliance requirements, and high client expectations. The administrative overhead of matter intake, billing, and client communication consumes paralegal and associate time that should be spent on billable work.",
      "Manual processes create risk: missed deadlines, inconsistent intake, delayed billing, and gaps in client communication. Automation addresses each of these systematically.",
      "Barrana.ai builds automation systems for law firms that reduce administrative overhead, improve billing cycle consistency, and ensure every client receives timely, professional communication.",
    ],
    problems: [
      { title: "Matter Intake Is Manual and Inconsistent", description: "New matter intake varies by who handles it, leading to missing information, delayed conflict checks, and inconsistent client onboarding." },
      { title: "Billing Cycles Are Delayed and Inconsistent", description: "Time entry, invoice generation, and payment follow-up are manual processes that result in delayed billing and inconsistent cash flow." },
      { title: "Client Communication Falls Through the Gaps", description: "Clients expect regular status updates. Manual communication processes mean updates are sent inconsistently, leading to client dissatisfaction and unnecessary inbound calls." },
      { title: "Deadline Management Is a Manual Risk", description: "Court deadlines, filing deadlines, and client commitments are tracked manually, creating risk of missed deadlines." },
    ],
    solutions: [
      { title: "Matter Intake Automation", description: "New matter inquiries trigger an immediate intake questionnaire, conflict check initiation, retainer agreement generation, and CRM record creation — all automated." },
      { title: "Billing Cycle Automation", description: "Time entries trigger invoice generation at defined intervals. Invoices are sent automatically and followed up with payment reminders." },
      { title: "Client Status Update Sequences", description: "Automated status updates are sent to clients at defined milestones, reducing inbound calls and improving client satisfaction." },
      { title: "Deadline Tracking and Alerts", description: "Deadlines are tracked automatically with escalating alerts to the responsible team member as deadlines approach." },
    ],
    outcomes: [
      "Matter intake time reduced by an estimated 60%",
      "Billing cycle accelerated by an estimated 2 weeks",
      "Inbound client calls reduced through proactive status updates",
      "Deadline risk reduced through automated tracking and alerts",
      "Paralegal time redirected to billable work",
    ],
    relatedServices: ["AI Agents", "Workflow Automation", "Operations Automation"],
  },
  "contractors": {
    name: "Contractors",
    emoji: "🔧",
    heroTitle: "AI Automation for Contractors in Toronto and the GTA",
    heroSubtitle: "Capture every lead, respond in 90 seconds, and fill your schedule — even when you're on a job site.",
    overview: [
      "Contractors face a fundamental operational challenge: the work that generates revenue happens on job sites, but the work that fills the schedule happens at a desk. When you are on a job site from 7am to 5pm, leads that come in during the day go unanswered.",
      "For most residential contractors in the GTA, an estimated 8 to 12 qualified leads are lost per month to slow response time alone. The homeowner fills out a quote request, waits a few hours, and books with the first contractor who responds.",
      "Barrana.ai builds lead automation systems that ensure every inquiry receives an immediate, professional response — regardless of when it comes in or what you are doing.",
    ],
    problems: [
      { title: "Leads Come In While You Are on the Job Site", description: "Quote requests, calls, and form submissions arrive throughout the day while you are unavailable. By the time you respond, the homeowner has already booked with a competitor." },
      { title: "Quote Follow-Up Is Inconsistent", description: "After sending a quote, follow-up depends on remembering to do it. Many quotes expire without a second contact." },
      { title: "Scheduling Requires Back-and-Forth", description: "Booking site visits and consultations requires multiple messages or calls to find a time that works for both parties." },
      { title: "Invoicing and Payment Are Delayed", description: "Invoices go out late because generating them requires time at a desk. Payment reminders are sent inconsistently." },
    ],
    solutions: [
      { title: "24/7 Lead Capture and Response", description: "Every quote request receives an immediate confirmation, a short qualification questionnaire, and a link to book a site visit — within 90 seconds of submission." },
      { title: "Quote Follow-Up Automation", description: "After a quote is sent, a follow-up sequence begins automatically: a check-in at 3 days, a value-add message at 7 days, and a final follow-up at 14 days." },
      { title: "Jobber Integration", description: "Qualified leads are automatically entered into Jobber with the right job type, location, and contact information — ready for scheduling." },
      { title: "Invoice and Payment Workflow", description: "Invoices are generated automatically at job completion milestones and payment reminders are sent at 7, 14, and 21 days." },
    ],
    outcomes: [
      "Lead response time reduced from 4–6 hours to under 90 seconds",
      "Quote conversion rate increased by an estimated 22% in 60 days",
      "After-hours leads captured and qualified automatically",
      "Jobber pipeline maintained without manual data entry",
      "Projected ROI recovery within 30 days",
    ],
    caseStudySnippet: {
      title: "General Contractor, Mississauga — Lead Response Automation",
      result: "Lead response time reduced from 4–6 hours to 90 seconds. Quote conversion rate increased by 22% in 60 days. After-hours leads captured automatically.",
    },
    relatedServices: ["Lead Automation", "AI Receptionist", "Operations Automation"],
  },
  "clinics": {
    name: "Clinics",
    emoji: "🏥",
    heroTitle: "AI Automation for Clinics in Toronto and the GTA",
    heroSubtitle: "Reduce no-shows, automate patient intake, and free your front desk for patient-facing work.",
    overview: [
      "Clinics face high administrative burden from appointment management, patient intake, insurance coordination, and follow-up care communication. Front-desk staff spend a significant portion of their time on tasks that could be automated.",
      "No-shows represent a direct revenue loss. Manual appointment reminders are inconsistent and time-consuming. Automated reminder sequences reduce no-show rates by an estimated 40% without additional staff effort.",
      "Barrana.ai builds automation systems for clinics that reduce administrative overhead, improve patient experience, and free front-desk staff for the work that requires human judgment.",
    ],
    problems: [
      { title: "No-Shows Cost Revenue and Capacity", description: "Missed appointments represent lost revenue and wasted practitioner time. Manual reminder calls are inconsistent and time-consuming." },
      { title: "Patient Intake Is a Paper-Based Bottleneck", description: "New patient intake forms are filled out in the waiting room, manually entered into the system, and filed — a process that delays appointments and consumes staff time." },
      { title: "Follow-Up Care Communication Is Inconsistent", description: "Post-appointment instructions, follow-up reminders, and prescription notifications are sent manually and inconsistently." },
      { title: "Front Desk Is Overwhelmed With Inbound Calls", description: "A significant portion of inbound calls are for appointment booking, rescheduling, and FAQ inquiries — all of which can be handled automatically." },
    ],
    solutions: [
      { title: "Appointment Reminder Sequences", description: "Automated reminders are sent at 48 hours, 24 hours, and 2 hours before each appointment, with rescheduling options included — reducing no-shows by an estimated 40%." },
      { title: "Digital Patient Intake", description: "New patients complete intake forms digitally before their appointment. Information is automatically entered into the patient management system." },
      { title: "Follow-Up Care Automation", description: "Post-appointment instructions, follow-up reminders, and prescription notifications are sent automatically based on appointment type." },
      { title: "AI Receptionist for After-Hours Booking", description: "After-hours calls and online inquiries are handled by the AI Receptionist, which books appointments, answers FAQs, and captures new patient information." },
    ],
    outcomes: [
      "No-show rate reduced by an estimated 40%",
      "Patient intake time reduced from 15 minutes to under 3 minutes",
      "Front-desk call volume reduced by an estimated 50%",
      "Follow-up care compliance improved through automated reminders",
      "After-hours booking enabled without additional staff",
    ],
    relatedServices: ["AI Receptionist", "Workflow Automation", "Operations Automation"],
  },
  "real-estate": {
    name: "Real Estate Teams",
    emoji: "🏠",
    heroTitle: "AI Automation for Real Estate Teams in Toronto and the GTA",
    heroSubtitle: "Automate lead nurture, CRM management, and client communication so your agents can focus on relationships and closings.",
    overview: [
      "Real estate teams manage large lead volumes with varying timelines — some buyers are ready to move in 30 days, others are 18 months away. Manual follow-up processes cannot maintain consistent contact across all leads at all stages.",
      "The agents who win in the GTA market are the ones who stay top-of-mind throughout the buying or selling journey. Automation makes this possible at scale without consuming agent time.",
      "Barrana.ai builds automation systems for real estate teams that ensure every lead receives consistent, personalized communication — from first inquiry through closing.",
    ],
    problems: [
      { title: "Long-Cycle Leads Fall Through the Cracks", description: "Buyers who are 6–18 months from purchasing require consistent nurturing. Manual follow-up processes cannot maintain this contact at scale." },
      { title: "CRM Data Entry Consumes Agent Time", description: "Manually entering lead information, updating contact records, and logging interactions takes time away from client-facing work." },
      { title: "Listing Alerts Are Sent Manually", description: "Matching new listings to buyer criteria and sending alerts requires manual effort that delays the communication and creates inconsistency." },
      { title: "Transaction Coordination Is a Manual Bottleneck", description: "Managing the documentation, deadlines, and communication involved in a transaction requires significant administrative effort." },
    ],
    solutions: [
      { title: "Lead Nurture Automation by Buyer Stage", description: "Leads are tagged by timeline and buyer stage. Automated nurture sequences deliver relevant content and check-ins at appropriate intervals — keeping your team top-of-mind without manual effort." },
      { title: "CRM Automation", description: "Lead information from web forms, open houses, and referrals is automatically entered into your CRM, tagged, and assigned to the appropriate agent." },
      { title: "Listing Alert Automation", description: "New listings that match buyer criteria trigger automatic alerts with property details and a direct link to book a showing." },
      { title: "Transaction Coordination Workflows", description: "When a deal goes conditional, a transaction coordination workflow begins: document requests, deadline tracking, and stakeholder communication — all automated." },
    ],
    outcomes: [
      "3x more leads nurtured per agent without additional time investment",
      "CRM data entry eliminated through automatic capture",
      "Listing alert response time reduced from hours to minutes",
      "Transaction coordination time reduced by an estimated 50%",
      "Long-cycle lead conversion improved through consistent nurturing",
    ],
    relatedServices: ["Lead Automation", "Workflow Automation", "AI Agents"],
  },
};

export default function IndustryDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "";
  const industry = industryData[slug];

  if (!industry) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="container pt-32 pb-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Industry Not Found</h1>
          <Link href="/industries" className="btn-primary">View All Industries</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-20" style={{ backgroundColor: "#F7F8FB" }}>
        <div className="container">
          <Link href="/industries" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#283891] mb-6 transition-colors">
            <ArrowLeft size={14} /> Back to Industries
          </Link>
          <div className="max-w-3xl">
            <div className="text-3xl mb-4">{industry.emoji}</div>
            <div className="section-label mb-3">{industry.name}</div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">{industry.heroTitle}</h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">{industry.heroSubtitle}</p>
            <Link href="/contact" className="btn-primary">
              Book a Free Automation Audit <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-5">
              {industry.overview.map((p, i) => (
                <p key={i} className="text-gray-600 leading-relaxed">{p}</p>
              ))}
            </div>
            <div className="space-y-5">
              {industry.caseStudySnippet && (
                <div className="barrana-card p-6">
                  <div className="section-label mb-2">Case Study Highlight</div>
                  <h4 className="font-bold text-gray-900 mb-3 text-sm">{industry.caseStudySnippet.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{industry.caseStudySnippet.result}</p>
                  <Link href="/case-studies" className="mt-4 text-sm font-semibold flex items-center gap-1" style={{ color: "#283891" }}>
                    Read full case study <ArrowRight size={13} />
                  </Link>
                </div>
              )}
              <div className="barrana-card p-6">
                <h4 className="font-bold text-gray-900 mb-4">Related Services</h4>
                <div className="space-y-2">
                  {industry.relatedServices.map((s) => (
                    <div key={s} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 size={14} style={{ color: "#283891" }} />
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problems */}
      <section className="py-16" style={{ backgroundColor: "#F2F4F8" }}>
        <div className="container">
          <div className="section-label mb-3">Common Operational Problems</div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">The Friction Points We Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {industry.problems.map((p) => (
              <div key={p.title} className="barrana-card p-6">
                <h3 className="font-bold text-gray-900 mb-2">{p.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="section-label mb-3">Automation Solutions</div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">What We Build for {industry.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            {industry.solutions.map((s) => (
              <div key={s.title} className="barrana-card p-6">
                <div className="w-8 h-8 rounded-md flex items-center justify-center mb-3" style={{ backgroundColor: "#283891" }}>
                  <CheckCircle2 size={16} color="white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>

          {/* Outcomes */}
          <div className="rounded-xl p-8" style={{ backgroundColor: "#F7F8FB" }}>
            <h3 className="font-bold text-gray-900 mb-5">Expected Outcomes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {industry.outcomes.map((o) => (
                <div key={o} className="flex items-start gap-3">
                  <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" style={{ color: "#7E0F4A" }} />
                  <span className="text-sm text-gray-700">{o}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ backgroundColor: "#283891" }}>
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Automate Your {industry.name} Operations?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">Book a free 60-minute Automation Audit. We map your specific workflows and identify the highest-impact automation opportunities.</p>
          <Link href="/contact" className="btn-accent">
            Book Free Automation Audit <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
