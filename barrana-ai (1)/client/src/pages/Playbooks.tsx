import { Link } from "wouter";
import { useEffect, useRef, useState } from "react";
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}
const playbooks = [
  { slug: "immigration-consultant", title: "The Immigration Consultant Automation Playbook", description: "A complete automation playbook for immigration consulting firms: intake automation, document collection, file tracking, deadline reminders, and client communication sequences.", tag: "Immigration" },
  { slug: "accounting-firm", title: "The Accounting Firm Automation Playbook", description: "How accounting firms eliminate document chasing, automate engagement letter delivery, and build client onboarding sequences that run without staff involvement.", tag: "Accounting" },
  { slug: "contractor", title: "The Contractor Automation Playbook", description: "Lead capture, quote follow-up, job scheduling, and invoice automation for residential and commercial contractors in the GTA.", tag: "Contractors" },
  { slug: "physiotherapy-clinic", title: "The Physiotherapy Clinic Automation Playbook", description: "Patient intake, appointment reminders, no-show reduction, insurance verification, and re-engagement sequences for physiotherapy and wellness clinics.", tag: "Healthcare" },
];
export default function Playbooks() {
  const grid = useReveal();
  return (
    <div className="min-h-screen bg-white">
      <section className="hero-light pt-24 pb-16">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link><span className="breadcrumb-sep">/</span><span>Playbooks</span></div>
          <div className="max-w-3xl">
            <div className="eyebrow">Automation Playbooks</div>
            <h1 className="font-extrabold mb-4" style={{ color: "#1F2937" }}>Industry-Specific Automation Playbooks</h1>
            <p className="text-lg leading-relaxed" style={{ color: "#6B7280" }}>Step-by-step automation playbooks for specific industries. Each playbook covers the highest-impact workflows, the tools required, and the implementation sequence for a GTA service business.</p>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container">
          <div ref={grid.ref} className="grid md:grid-cols-2 gap-6">
            {playbooks.map((pb, i) => (
              <Link key={pb.slug} href={`/playbooks/${pb.slug}`} className="card-base group" style={{ opacity: grid.visible ? 1 : 0, transform: grid.visible ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`, textDecoration: "none" }}>
                <div className="tag-blue mb-4">{pb.tag}</div>
                <h2 className="text-lg font-bold mb-3" style={{ color: "#1F2937" }}>{pb.title}</h2>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#6B7280" }}>{pb.description}</p>
                <span className="text-xs font-semibold flex items-center gap-1" style={{ color: "#1A5276" }}>View Playbook <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="cta-section py-20"><div className="container text-center"><h2 className="text-3xl font-extrabold text-white mb-4">Want a Custom Playbook for Your Business?</h2><p className="mb-8 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.65)" }}>Book a free Automation Audit and we will build a custom automation roadmap for your specific workflows.</p><Link href="/contact" className="btn-primary">Book Free Audit</Link></div></section>
    </div>
  );
}
