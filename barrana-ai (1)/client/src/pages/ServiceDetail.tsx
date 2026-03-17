/**
 * BARRANA.AI SERVICE DETAIL PAGE
 * Dynamic page for each service
 */
import { Link, useParams } from "wouter";
import { ArrowRight, CheckCircle2, ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const serviceData: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  longDescription: string[];
  outcomes: string[];
  useCases: { title: string; description: string }[];
  industries: string[];
}> = {
  "ai-agents": {
    title: "AI Agents",
    subtitle: "Intelligent agents that handle intake, routing, and follow-up",
    description: "AI agents are software systems that can receive information, make decisions, and take action without human intervention.",
    longDescription: [
      "AI agents are software systems that can receive information, make decisions, and take action without human intervention. We build agents that handle specific operational tasks: qualifying inbound leads, routing client inquiries to the right team member, collecting intake information, and generating responses.",
      "Unlike simple chatbots that follow rigid scripts, AI agents understand natural language, extract structured information from unstructured inputs, and execute multi-step workflows based on what they learn from each interaction.",
      "Every agent we build is designed around a specific operational function. We do not deploy general-purpose AI tools. We build agents that know your intake process, your qualification criteria, your routing rules, and your response standards.",
    ],
    outcomes: [
      "Lead qualification without staff involvement",
      "Intelligent routing based on inquiry type",
      "24/7 intake handling across all channels",
      "Personalized automated responses",
      "Structured data extraction from unstructured inputs",
      "Seamless handoff to human staff when needed",
    ],
    useCases: [
      { title: "Lead Qualification Agent", description: "Receives inbound inquiries, asks qualifying questions, scores the lead, and routes high-priority leads to the appropriate team member immediately." },
      { title: "Client Intake Agent", description: "Guides new clients through the intake process, collects required information, validates completeness, and creates the client record in your CRM." },
      { title: "Document Processing Agent", description: "Receives uploaded documents, extracts key information, validates against requirements, and updates the relevant records automatically." },
    ],
    industries: ["Immigration Consultants", "Law Firms", "Accounting Firms", "Clinics", "Real Estate Teams"],
  },
  "workflow-automation": {
    title: "Workflow Automation",
    subtitle: "End-to-end process automation across your existing tools",
    description: "Workflow automation connects the tools your business already uses and creates automated sequences that run without manual intervention.",
    longDescription: [
      "Workflow automation connects the tools your business already uses and creates automated sequences that run without manual intervention. When a trigger event occurs — a form submission, a payment received, a document uploaded — the system executes a defined sequence of actions across multiple platforms.",
      "We work with the tools you already have: HubSpot, Salesforce, Jobber, QuickBooks, Google Workspace, Microsoft 365, Calendly, Acuity, and dozens of others. We do not require you to switch platforms.",
      "The result is a business that operates consistently regardless of who is in the office, what time it is, or how many clients are active simultaneously.",
    ],
    outcomes: [
      "Eliminate manual data entry between systems",
      "Automated task creation and assignment",
      "Real-time status updates across platforms",
      "Consistent process execution every time",
      "Error reduction from manual copy-paste operations",
      "Full audit trail of every automated action",
    ],
    useCases: [
      { title: "CRM-to-Project Management Sync", description: "When a deal closes in your CRM, a project is automatically created in your project management tool with the right template, assigned to the right team, and the client receives an onboarding email." },
      { title: "Invoice Generation Workflow", description: "When a project milestone is marked complete, an invoice is automatically generated in QuickBooks, sent to the client, and a follow-up reminder is scheduled for 7 days later." },
      { title: "New Client Onboarding Sequence", description: "When a new client is added to your CRM, a multi-step onboarding sequence begins: welcome email, intake form, document request, and calendar booking link — all automated." },
    ],
    industries: ["Accounting Firms", "Law Firms", "Contractors", "Immigration Consultants", "Clinics"],
  },
  "lead-automation": {
    title: "Lead Automation",
    subtitle: "Capture, qualify, and follow up with every lead automatically",
    description: "Lead automation ensures that every inbound inquiry receives an immediate, personalized response — regardless of when it comes in.",
    longDescription: [
      "Lead automation ensures that every inbound inquiry receives an immediate, personalized response — regardless of when it comes in. The system captures lead information, qualifies the inquiry, routes it to the right person, and initiates a follow-up sequence without any manual intervention.",
      "For most small businesses, the biggest revenue leak is not bad marketing or poor service — it is slow response time. Studies consistently show that leads contacted within 5 minutes are 21 times more likely to convert than those contacted after 30 minutes. Most small businesses respond in hours or days.",
      "We build lead automation systems that close this gap completely. Every lead gets an immediate, relevant response. Every qualified lead gets a follow-up sequence. Every unbooked lead gets a nurture sequence.",
    ],
    outcomes: [
      "Sub-90-second lead response time",
      "Automatic CRM entry and tagging",
      "Multi-channel capture (web, phone, social)",
      "Nurture sequences for unbooked leads",
      "Lead scoring and priority routing",
      "Conversion tracking and reporting",
    ],
    useCases: [
      { title: "Website Lead Capture", description: "Form submissions trigger immediate confirmation, qualification questions, CRM entry, and team notification — all within 90 seconds of submission." },
      { title: "Multi-Channel Lead Consolidation", description: "Leads from your website, Google Business Profile, Instagram, and phone calls are captured in a single system, deduplicated, and routed consistently." },
      { title: "Re-Engagement Sequences", description: "Leads that did not book after initial contact receive a structured follow-up sequence over 14 days, increasing conversion without manual effort." },
    ],
    industries: ["Contractors", "Real Estate Teams", "Clinics", "Immigration Consultants", "Law Firms"],
  },
  "operations-automation": {
    title: "Operations Automation",
    subtitle: "Automate the coordination work that consumes your team's time",
    description: "Operations automation targets the internal coordination tasks that consume staff time without creating client value.",
    longDescription: [
      "Operations automation targets the internal coordination tasks that consume staff time without creating client value: document collection, invoice generation, appointment scheduling, project status updates, and inter-team communication.",
      "In most small businesses, a significant portion of staff time is spent on coordination — moving information between systems, chasing documents, sending reminders, updating statuses. This work is necessary but not valuable. It can be automated.",
      "We map your internal workflows, identify the highest-volume coordination tasks, and build automation systems that handle them systematically. Your team stops doing administrative work and starts doing the work they were actually hired to do.",
    ],
    outcomes: [
      "Automated document collection and reminders",
      "Invoice generation and payment follow-up",
      "Appointment scheduling without back-and-forth",
      "Project status notifications to clients",
      "Staff workload visibility and task routing",
      "Deadline tracking and escalation alerts",
    ],
    useCases: [
      { title: "Document Collection Automation", description: "When a client engagement starts, a document request is automatically sent, tracked, and followed up every 48 hours until all required documents are received." },
      { title: "Appointment Reminder System", description: "Appointments trigger a sequence of reminders at 48 hours, 24 hours, and 2 hours before the scheduled time, with rescheduling options included." },
      { title: "Invoice and Payment Workflow", description: "Invoices are generated automatically at defined milestones, sent to clients, and followed up with payment reminders at 7, 14, and 21 days." },
    ],
    industries: ["Accounting Firms", "Law Firms", "Clinics", "Immigration Consultants", "Contractors"],
  },
  "ai-receptionist": {
    title: "AI Receptionist",
    subtitle: "24/7 voice and chat intake for your business",
    description: "The AI Receptionist handles inbound calls and chat inquiries outside business hours, captures lead information, answers common questions, and routes urgent matters appropriately.",
    longDescription: [
      "The AI Receptionist handles inbound calls and chat inquiries outside business hours, captures lead information, answers common questions, and routes urgent matters appropriately. It integrates with your scheduling and CRM systems so every interaction is captured and acted on.",
      "For businesses that receive calls and inquiries outside of 9-to-5 hours, the AI Receptionist ensures that no inquiry goes unanswered. It speaks naturally, understands context, and knows when to escalate to a human.",
      "Unlike generic answering services, the AI Receptionist is trained on your specific business: your services, your pricing structure, your booking process, and your common questions. Every interaction reflects your brand and your standards.",
    ],
    outcomes: [
      "After-hours call and chat handling",
      "Appointment booking without staff involvement",
      "FAQ responses from your knowledge base",
      "Urgent matter escalation protocols",
      "Full transcript and recording of every interaction",
      "CRM integration for every captured lead",
    ],
    useCases: [
      { title: "After-Hours Lead Capture", description: "Calls and web inquiries received outside business hours are handled by the AI Receptionist, which captures contact information, qualifies the inquiry, and books a callback or appointment." },
      { title: "FAQ Handling", description: "Common questions about services, pricing, availability, and process are answered immediately without staff involvement, reducing inbound call volume by an estimated 40-60%." },
      { title: "Emergency Escalation", description: "For businesses that handle urgent matters (clinics, legal, contractors), the AI Receptionist identifies urgent situations and escalates to the appropriate on-call staff member." },
    ],
    industries: ["Clinics", "Law Firms", "Contractors", "Immigration Consultants", "Real Estate Teams"],
  },
};

export default function ServiceDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "";
  const service = serviceData[slug];

  if (!service) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="container pt-32 pb-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <Link href="/services" className="btn-primary">View All Services</Link>
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
          <Link href="/services" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#283891] mb-6 transition-colors">
            <ArrowLeft size={14} /> Back to Services
          </Link>
          <div className="max-w-3xl">
            <div className="section-label mb-3">{service.subtitle}</div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">{service.title}</h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">{service.description}</p>
            <Link href="/contact" className="btn-primary">
              Book a Free Automation Audit <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Detail */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="space-y-5 mb-12">
                {service.longDescription.map((p, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed">{p}</p>
                ))}
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">Use Cases</h2>
              <div className="space-y-5">
                {service.useCases.map((uc) => (
                  <div key={uc.title} className="barrana-card p-6">
                    <h3 className="font-bold text-gray-900 mb-2">{uc.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{uc.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="barrana-card p-6">
                <h3 className="font-bold text-gray-900 mb-4">Key Outcomes</h3>
                <ul className="space-y-3">
                  {service.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-3">
                      <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" style={{ color: "#283891" }} />
                      <span className="text-sm text-gray-700">{o}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="barrana-card p-6">
                <h3 className="font-bold text-gray-900 mb-4">Industries Served</h3>
                <div className="flex flex-wrap gap-2">
                  {service.industries.map((ind) => (
                    <span key={ind} className="text-xs px-3 py-1.5 rounded-full font-medium" style={{ backgroundColor: "#F2F4F8", color: "#283891" }}>
                      {ind}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl p-6 text-white" style={{ backgroundColor: "#283891" }}>
                <h3 className="font-bold mb-3">Ready to Get Started?</h3>
                <p className="text-sm text-blue-100 mb-4">Book a free 60-minute Automation Audit. We map your workflows and identify the highest-impact opportunities.</p>
                <Link href="/contact" className="btn-accent text-sm w-full justify-center">
                  Book Free Audit <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
