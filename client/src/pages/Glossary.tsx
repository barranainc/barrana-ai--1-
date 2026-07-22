import { Link } from "wouter";
import { useState } from "react";
const terms = [
  { term: "AI Agent", definition: "A software system that can receive a goal, break it into steps, use tools to complete those steps, and adapt based on results. In a small business context, AI agents handle structured, repeatable interactions like lead response, intake, and scheduling." },
  { term: "Automation Platform", definition: "Software that connects your business tools and executes automation logic. Common platforms include Make (Integromat), Zapier, and n8n. These platforms act as the 'glue' between your CRM, email, calendar, and other tools." },
  { term: "CRM (Customer Relationship Management)", definition: "Software that stores and manages client and lead information. Common CRMs for small businesses include HubSpot, GoHighLevel, and Salesforce. Automation systems typically use the CRM as the central record of client data." },
  { term: "Document Collection Automation", definition: "An automated system that sends document request checklists to clients, tracks which documents have been received, sends reminders for outstanding items, and escalates overdue requests. Eliminates manual document chasing." },
  { term: "Fixed-Price Engagement", definition: "A project pricing model where the total cost is agreed upon before work begins. All Barrana.ai engagements are fixed-price, meaning you know exactly what you are getting and what it costs before we start." },
  { term: "Integration", definition: "A connection between two software tools that allows them to share data automatically. For example, an integration between your intake form and your CRM means that form submissions automatically create CRM records without manual data entry." },
  { term: "Lead Automation", definition: "An automated system that responds to new leads, qualifies them, routes them to the appropriate team member, and follows up until they book or are marked as lost. Typically reduces lead response time from hours to under 90 seconds." },
  { term: "Make (Integromat)", definition: "An automation platform that connects business tools and executes complex automation logic. Commonly used for multi-step workflows that involve conditional logic, data transformation, and multiple tool integrations." },
  { term: "n8n", definition: "An open-source automation platform that can be self-hosted for businesses with data sovereignty requirements. Used for complex automation workflows with advanced customization needs." },
  { term: "No-Show Reduction", definition: "Automated appointment reminder sequences that reduce the rate of clients missing scheduled appointments. Typically includes 48-hour, 24-hour, and 2-hour reminders with confirmation requests. Reduces no-show rates by 25 to 40 percent." },
  { term: "Operational Intelligence", definition: "Barrana.ai's design philosophy and service approach: building automation systems that give business owners visibility and control over their operations, not just task automation." },
  { term: "PIPEDA", definition: "The Personal Information Protection and Electronic Documents Act - Canada's federal privacy law governing how private sector organizations collect, use, and disclose personal information. All Barrana.ai automation systems are built with PIPEDA compliance in mind." },
  { term: "Trigger", definition: "The event that starts an automation. Examples: a form submission, a new CRM record, a calendar booking, an email received, or a specific time of day." },
  { term: "Webhook", definition: "A method for one application to send real-time data to another when a specific event occurs. Webhooks are commonly used as triggers in automation workflows." },
  { term: "Workflow", definition: "A sequence of steps that a business process follows from start to finish. Automation workflows replicate these sequences automatically, without manual intervention at each step." },
  { term: "Zapier", definition: "An automation platform that connects over 5,000 business tools. Commonly used for simpler automation workflows with a large number of tool integrations." },
];
export default function Glossary() {
  const [search, setSearch] = useState("");
  const filtered = terms.filter(t => t.term.toLowerCase().includes(search.toLowerCase()) || t.definition.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="min-h-screen bg-white">
      <section className="hero-light pt-24 pb-16">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link><span className="breadcrumb-sep">/</span><span>Glossary</span></div>
          <div className="max-w-3xl">
            <div className="eyebrow">Glossary</div>
            <h1 className="font-extrabold mb-4" style={{ color: "#1F2937" }}>AI Automation Glossary for Small Business</h1>
            <p className="text-lg leading-relaxed mb-6" style={{ color: "#6B7280" }}>Plain-language definitions of AI automation terms for small business owners. No jargon, no developer-speak.</p>
            <input type="text" placeholder="Search terms..." value={search} onChange={e => setSearch(e.target.value)} className="w-full max-w-md px-4 py-3 rounded-xl border text-sm" style={{ borderColor: "rgba(26,82,118,0.2)", outline: "none" }} />
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container">
          <div className="max-w-3xl space-y-4">
            {filtered.map((t) => (
              <div key={t.term} className="p-5 rounded-xl border" style={{ borderColor: "rgba(26,82,118,0.08)", backgroundColor: "#F7F9FC" }}>
                <h3 className="font-bold mb-2" style={{ color: "#283891" }}>{t.term}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>{t.definition}</p>
              </div>
            ))}
            {filtered.length === 0 && <p className="text-sm" style={{ color: "#6B7280" }}>No terms found matching your search.</p>}
          </div>
        </div>
      </section>
    </div>
  );
}
