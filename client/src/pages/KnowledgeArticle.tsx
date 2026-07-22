import { Link, useParams } from "wouter";
import { useEffect, useRef, useState } from "react";

const ARTICLES: Record<string, { title: string; tag: string; readTime: string; intro: string; sections: { heading: string; body: string }[] }> = {
  "lead-automation": {
    title: "Lead Response Automation for Small Business",
    tag: "Lead Automation",
    readTime: "8 min read",
    intro: "When a potential client submits a form on your website, every minute that passes without a response reduces the probability of conversion. Studies consistently show that responding within 5 minutes increases conversion rates by up to 9x compared to responding after 30 minutes. For most small businesses, this is structurally impossible without automation.",
    sections: [
      { heading: "Why Response Time Is a Systems Problem", body: "Most small business owners understand that fast follow-up matters. The problem is not motivation - it is structure. When the owner is on a job site, in a client meeting, or handling an emergency, lead inquiries sit unanswered. This is not a discipline problem. It is a workflow problem that automation solves." },
      { heading: "What a Lead Automation System Does", body: "A complete lead automation system handles: (1) Immediate acknowledgment - the prospect receives a confirmation within 60 to 90 seconds of submitting a form or calling. (2) Qualification - a short automated sequence asks 2 to 3 questions to determine fit and urgency. (3) Routing - qualified leads are assigned to the right team member and logged in the CRM. (4) Booking - a calendar link is sent so the prospect can self-schedule a consultation. (5) Follow-up - if the prospect does not book, the system sends 2 to 3 follow-up messages over 5 to 7 days." },
      { heading: "Tools Used for Lead Automation", body: "Common platforms include Make (Integromat), Zapier, or n8n for the automation logic; Jotform, Typeform, or your website contact form as the trigger; HubSpot, GoHighLevel, or a similar CRM for lead tracking; Calendly or Acuity for booking; and Twilio or a similar platform for SMS notifications." },
      { heading: "What Results to Expect", body: "Businesses that implement lead automation typically see: response time drop from 4 to 8 hours to under 90 seconds; quote conversion rates increase by 15 to 25 percent; after-hours leads captured at 100 percent instead of being lost; and staff time on manual lead follow-up reduced by 80 to 90 percent." },
    ],
  },
  "client-intake-automation": {
    title: "Client Intake Automation: From Inquiry to Onboarded Client",
    tag: "Client Intake",
    readTime: "10 min read",
    intro: "Client intake is the process of moving a new client from initial inquiry to fully onboarded - with all their information collected, their file created, their first appointment scheduled, and their expectations set. For most professional service firms, this process takes 30 to 60 minutes of manual effort per client. Automation reduces this to under 5 minutes.",
    sections: [
      { heading: "The Manual Intake Problem", body: "A typical manual intake process involves: receiving an inquiry by email or phone; manually creating a client record in the CRM; sending a welcome email with intake forms; following up when forms are not completed; copying form responses into the CRM; scheduling the initial appointment; and sending confirmation and preparation instructions. Each step requires someone's attention. When volume increases, intake becomes a bottleneck." },
      { heading: "What Intake Automation Covers", body: "An automated intake system handles: intake form delivery and completion tracking; automatic CRM record creation from form responses; document request and collection; appointment scheduling with calendar integration; automated welcome sequences and preparation instructions; and file assignment to the appropriate team member." },
      { heading: "Industry-Specific Intake Patterns", body: "Immigration consultants need visa type routing and document checklists. Accounting firms need engagement letter delivery and document collection. Law firms need matter type classification and conflict checks. Physiotherapy clinics need health history forms and insurance verification. Each industry has specific intake requirements that the automation system is configured to handle." },
      { heading: "Implementation Approach", body: "Intake automation is typically implemented in 2 to 4 weeks. The process involves mapping the current intake workflow, identifying the tools already in use, configuring the automation logic, testing with real scenarios, and deploying with a monitoring period." },
    ],
  },
  "ai-agents-for-small-business": {
    title: "AI Agents for Small Business: What They Are and What They Do",
    tag: "AI Agents",
    readTime: "7 min read",
    intro: "The term 'AI agent' is used loosely in marketing materials. For small business owners, what matters is a practical understanding of what AI agents can do in your specific operational context - not a theoretical definition.",
    sections: [
      { heading: "What an AI Agent Is (Practically)", body: "An AI agent is a software system that can take a goal, break it into steps, use tools to complete those steps, and adapt based on the results. In a small business context, this means: receiving an inquiry, determining what type of inquiry it is, taking the appropriate action (sending a form, booking an appointment, escalating to a human), and logging the result." },
      { heading: "How AI Agents Differ From Simple Automations", body: "Simple automations follow fixed rules: if X happens, do Y. AI agents can handle variation: if the inquiry is about pricing, respond with the pricing guide; if it is about a specific service, respond with the relevant service information; if it is unclear, ask a clarifying question. This flexibility makes AI agents useful for customer-facing interactions where inquiries are not always predictable." },
      { heading: "What AI Agents Cannot Do", body: "AI agents cannot replace professional judgment. They cannot give legal, medical, financial, or immigration advice. They cannot handle complex negotiations. They cannot manage client relationships. They are most effective for structured, repeatable interactions - intake, scheduling, document collection, status updates - not for substantive professional work." },
      { heading: "Practical Applications for GTA Service Businesses", body: "The most effective AI agent applications for small businesses in Toronto and the GTA include: 24/7 lead response and qualification; after-hours inquiry handling; appointment booking and rescheduling; document request and follow-up; FAQ responses for common client questions; and status update responses for existing clients." },
    ],
  },
  "workflow-automation-explained": {
    title: "Workflow Automation Explained: A Guide for Small Business Owners",
    tag: "Workflow Automation",
    readTime: "9 min read",
    intro: "Workflow automation means using software to automatically complete tasks that would otherwise require manual effort from your team. For a small business, this typically means connecting the tools you already use so that information flows between them automatically - without anyone copying, pasting, emailing, or manually updating records.",
    sections: [
      { heading: "How Workflow Automation Works", body: "Every automation has three components: a trigger (something that starts the automation), an action (what the automation does), and a condition (optional rules that determine when the action runs). Example: Trigger - a new form submission arrives. Condition - the form type is 'New Client Inquiry'. Action - create a CRM record, send a welcome email, and notify the assigned consultant." },
      { heading: "What Tools Are Involved", body: "Workflow automation typically involves: an automation platform (Make, Zapier, n8n) that connects your tools; your existing business tools (CRM, email, calendar, project management, invoicing); and sometimes AI components for tasks that require language understanding or decision-making." },
      { heading: "What Workflow Automation Costs", body: "The cost of workflow automation has two components: the implementation cost (designing, building, and testing the automation system) and the ongoing platform cost (monthly fees for the automation tools). Implementation costs depend on complexity. Platform costs for small businesses typically range from $20 to $200 per month depending on usage volume." },
      { heading: "How to Evaluate Whether It Is Right for Your Business", body: "Workflow automation is most valuable when: you have repetitive tasks that follow consistent patterns; your team spends significant time on coordination rather than client work; you are losing leads or clients due to slow response times; and you have growth ambitions that cannot be met by adding more staff. If your business has 2 to 50 staff and relies on client relationships, automation almost certainly has a positive ROI." },
    ],
  },
  "top-25-automated-workflows": {
    title: "Top 25 Automated Workflows for Small Business",
    tag: "Workflows",
    readTime: "12 min read",
    intro: "The 25 most impactful automation workflows for small and medium businesses, organized by function. These are the workflows that consistently deliver the highest ROI for GTA service businesses.",
    sections: [
      { heading: "Lead Management (Workflows 1–7)", body: "1. Lead capture and immediate acknowledgment. 2. Lead qualification sequence. 3. Lead routing to the right team member. 4. Appointment booking automation. 5. Quote follow-up sequence. 6. Lost lead re-engagement. 7. Referral request automation." },
      { heading: "Client Operations (Workflows 8–14)", body: "8. New client intake and onboarding. 9. Document request and collection. 10. Appointment reminder sequence. 11. No-show follow-up and rebooking. 12. Client status update notifications. 13. Satisfaction survey automation. 14. Client re-engagement for inactive clients." },
      { heading: "Financial Processes (Workflows 15–19)", body: "15. Invoice generation and delivery. 16. Payment reminder sequence. 17. Overdue invoice escalation. 18. Expense categorization and logging. 19. Financial report generation." },
      { heading: "Internal Coordination (Workflows 20–25)", body: "20. Task assignment from form submissions. 21. Project status update notifications. 22. Team capacity and workload alerts. 23. Meeting notes and action item distribution. 24. Staff onboarding sequence. 25. Compliance deadline reminders." },
    ],
  },
};

export default function KnowledgeArticle() {
  const params = useParams<{ slug: string }>();
  const article = ARTICLES[params.slug || ""];

  if (!article) {
    return (
      <div className="min-h-screen bg-white pt-24">
        <div className="container py-16">
          <h1 className="text-2xl font-bold mb-4" style={{ color: "#1F2937" }}>Article not found</h1>
          <Link href="/knowledge" className="btn-secondary">Back to Knowledge Base</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="hero-light pt-24 pb-12">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link><span className="breadcrumb-sep">/</span><Link href="/knowledge">Knowledge Base</Link><span className="breadcrumb-sep">/</span><span>{article.tag}</span></div>
          <div className="max-w-3xl">
            <div className="tag-teal mb-4">{article.tag}</div>
            <h1 className="font-extrabold mb-4" style={{ color: "#1F2937" }}>{article.title}</h1>
            <p className="text-sm" style={{ color: "#6B7280" }}>{article.readTime} · Barrana.ai Knowledge Base</p>
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container">
          <div className="max-w-3xl">
            <div className="aeo-block mb-10">
              <div className="aeo-label"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>Summary</div>
              <p>{article.intro}</p>
            </div>
            <div className="prose-content">
              {article.sections.map((section, i) => (
                <div key={i} className="mb-8">
                  <h2 className="text-xl font-bold mb-3" style={{ color: "#283891" }}>{section.heading}</h2>
                  <p className="leading-relaxed" style={{ color: "#374151" }}>{section.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 p-8 rounded-2xl" style={{ background: "linear-gradient(135deg, #1E2B6E, #283891)" }}>
              <h3 className="text-xl font-bold text-white mb-3">Ready to Implement This?</h3>
              <p className="mb-6" style={{ color: "rgba(255,255,255,0.7)" }}>Book a free 60-minute Automation Audit and we will map this workflow for your specific business.</p>
              <Link href="/contact" className="btn-primary">Book Free Audit</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
