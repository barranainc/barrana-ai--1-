import { Link } from "wouter";
import { useEffect, useRef, useState } from "react";

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const articles = [
  { slug: "lead-automation", title: "Lead Response Automation for Service Business", description: "How automated lead response systems work, why response time determines conversion, and what a complete lead automation system looks like for a GTA service business.", tag: "Lead Automation", readTime: "8 min read" },
  { slug: "client-intake-automation", title: "Client Intake Automation: From Inquiry to Onboarded Client", description: "A complete guide to automating the client intake process for professional service firms. Covers intake forms, CRM integration, document collection, and onboarding sequences.", tag: "Client Intake", readTime: "10 min read" },
  { slug: "ai-agents-for-small-business", title: "AI Agents for Service Business: What They Are and What They Do", description: "A practical explanation of AI agents for business owners. What they are, what they can and cannot do, and how they differ from chatbots and simple automations.", tag: "AI Agents", readTime: "7 min read" },
  { slug: "workflow-automation-explained", title: "Workflow Automation Explained: A Guide for Business Owners", description: "What workflow automation is, how it works, what it costs, and how to evaluate whether it is right for your business. Written for operators, not developers.", tag: "Workflow Automation", readTime: "9 min read" },
  { slug: "top-25-automated-workflows", title: "Top 25 Automated Workflows for Service Business", description: "The 25 most impactful automation workflows for service businesses, organized by function: lead management, client operations, financial processes, and internal coordination.", tag: "Workflows", readTime: "12 min read" },
];

export default function KnowledgeBase() {
  const grid = useReveal();
  return (
    <div className="min-h-screen bg-white">
      <section className="hero-light pt-24 pb-16">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link><span className="breadcrumb-sep">/</span><span>Knowledge Base</span></div>
          <div className="max-w-3xl">
            <div className="eyebrow">Knowledge Base</div>
            <h1 className="font-extrabold mb-4" style={{ color: "#1F2937" }}>AI Automation for Service Businesses: A Practical Knowledge Base</h1>
            <p className="text-lg leading-relaxed" style={{ color: "#6B7280" }}>Practical guides on AI automation for business owners in Toronto and the GTA. Written for operators, not developers.</p>
          </div>
        </div>
      </section>
      <section className="py-8" style={{ backgroundColor: "#F7F9FC" }}>
        <div className="container">
          <div className="aeo-block max-w-3xl">
            <div className="aeo-label"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>Direct Answer</div>
            <h3>What is AI automation for service businesses?</h3>
            <p>AI automation for service businesses means using software to automatically handle repetitive tasks like responding to leads, collecting client documents, sending appointment reminders, generating invoices, and updating CRM records — without manual effort from your team. For GTA service businesses, the most impactful automations typically address lead response time, client intake, document collection, and scheduling.</p>
          </div>
        </div>
      </section>
      <section className="py-16 lg:py-20">
        <div className="container">
          <div ref={grid.ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, i) => (
              <Link key={article.slug} href={`/knowledge/${article.slug}`} className="card-base group" style={{ opacity: grid.visible ? 1 : 0, transform: grid.visible ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`, textDecoration: "none" }}>
                <div className="tag-teal mb-4">{article.tag}</div>
                <h2 className="text-base font-bold mb-3 leading-snug" style={{ color: "#1F2937" }}>{article.title}</h2>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#6B7280" }}>{article.description}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t" style={{ borderColor: "#E8ECF1" }}>
                  <span className="text-xs" style={{ color: "#6B7280" }}>{article.readTime}</span>
                  <span className="text-xs font-semibold flex items-center gap-1" style={{ color: "#283891" }}>Read guide<svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="cta-section py-20">
        <div className="container text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Ready to Implement Automation?</h2>
          <p className="mb-8 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.65)" }}>Book a free 60-minute Automation Audit. We map your workflows and identify your highest-impact automation opportunities.</p>
          <Link href="/contact" className="btn-primary">Book Free Audit</Link>
        </div>
      </section>
    </div>
  );
}
