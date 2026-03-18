/**
 * Contact.tsx — Barrana.ai Contact / Book Audit Page
 * Design: Premium Systems Consultancy
 * Clean form layout, scroll reveal, trust signals
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";

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

const industries = [
  "Immigration Consulting",
  "Accounting / Tax",
  "Law Firm",
  "General Contractor",
  "Clinic / Healthcare",
  "Real Estate",
  "Other Professional Services",
];

const auditSteps = [
  { step: "01", title: "You book the audit", desc: "Select a time that works. 60 minutes, video call." },
  { step: "02", title: "We review your workflows", desc: "Before the call, we review your business type and any info you share." },
  { step: "03", title: "We map your friction points", desc: "On the call, we walk through your operations and identify where time is being lost." },
  { step: "04", title: "You receive a prioritized plan", desc: "Within 48 hours, you receive a written summary of your top automation opportunities." },
];

export default function Contact() {
  const hero = useReveal(0.05);
  const formSection = useReveal();

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", business: "",
    industry: "", city: "", employees: "", challenge: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.business || !formData.industry) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
    toast.success("Audit request received! We'll be in touch within 1 business day.");
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border text-sm outline-none bg-[#F7F8FB] transition-all";
  const inputStyle = { borderColor: "rgba(40,56,145,0.15)" };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden" style={{ backgroundColor: "#F7F8FB" }}>
        <div className="absolute inset-0 dot-grid-bg opacity-50 pointer-events-none" />
        <div className="container relative z-10">
          <div
            ref={hero.ref}
            style={{
              opacity: hero.visible ? 1 : 0,
              transform: hero.visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <div className="section-divider mb-4">
              <span className="section-label">Book a Free Automation Audit</span>
            </div>
            <div className="max-w-3xl">
              <h1 className="text-4xl lg:text-5xl font-extrabold mb-6" style={{ color: "#111827" }}>
                Start With a Free<br />60-Minute Automation Audit
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                We map your workflows, identify the highest-impact automation opportunities, and give you a prioritized action plan — whether or not you choose to work with us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-14" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <div className="grid md:grid-cols-4 gap-6">
            {auditSteps.map((s, i) => (
              <div
                key={s.step}
                className="relative"
                style={{
                  opacity: hero.visible ? 1 : 0,
                  transform: hero.visible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.5s ease ${i * 0.1 + 0.3}s, transform 0.5s ease ${i * 0.1 + 0.3}s`,
                }}
              >
                {i < auditSteps.length - 1 && (
                  <div className="hidden md:block absolute top-5 left-[calc(100%-0px)] w-full h-px" style={{ backgroundColor: "rgba(40,56,145,0.1)" }} />
                )}
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white mb-3" style={{ backgroundColor: "#283891" }}>
                  {s.step}
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{s.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Trust */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: "#F2F4F8" }}>
        <div className="container">
          <div
            ref={formSection.ref}
            className="grid lg:grid-cols-3 gap-10"
            style={{
              opacity: formSection.visible ? 1 : 0,
              transform: formSection.visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            {/* Form */}
            <div className="lg:col-span-2">
              <div
                className="bg-white rounded-2xl p-8"
                style={{ border: "1px solid rgba(40,56,145,0.08)", boxShadow: "0 8px 32px rgba(40,56,145,0.06)" }}
              >
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "rgba(40,56,145,0.08)" }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#283891" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-extrabold text-gray-900 mb-2">Audit Request Received</h3>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-md mx-auto mb-6">
                      We will review your submission and reach out within one business day to schedule your free Automation Audit.
                    </p>
                    <Link href="/" className="btn-primary text-sm">Back to Home</Link>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-extrabold text-gray-900 mb-6">Tell Us About Your Business</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Full Name <span style={{ color: "#7E0F4A" }}>*</span></label>
                          <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Your full name" className={inputClass} style={inputStyle} />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email Address <span style={{ color: "#7E0F4A" }}>*</span></label>
                          <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="you@yourbusiness.com" className={inputClass} style={inputStyle} />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Phone Number</label>
                          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="(416) 555-0100" className={inputClass} style={inputStyle} />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Business Name <span style={{ color: "#7E0F4A" }}>*</span></label>
                          <input type="text" name="business" required value={formData.business} onChange={handleChange} placeholder="Your business name" className={inputClass} style={inputStyle} />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Industry <span style={{ color: "#7E0F4A" }}>*</span></label>
                          <select name="industry" required value={formData.industry} onChange={handleChange} className={inputClass + " bg-[#F7F8FB]"} style={inputStyle}>
                            <option value="">Select your industry</option>
                            {industries.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-1.5">City / Location</label>
                          <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="e.g. Vaughan, Toronto" className={inputClass} style={inputStyle} />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Number of Staff</label>
                        <select name="employees" value={formData.employees} onChange={handleChange} className={inputClass + " bg-[#F7F8FB]"} style={inputStyle}>
                          <option value="">Select team size</option>
                          <option value="1-2">1–2 (solo or partner)</option>
                          <option value="3-10">3–10</option>
                          <option value="11-25">11–25</option>
                          <option value="26-50">26–50</option>
                          <option value="50+">50+</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">What is your biggest operational challenge right now?</label>
                        <textarea
                          name="challenge"
                          value={formData.challenge}
                          onChange={handleChange}
                          rows={4}
                          placeholder="Describe the workflow or process that is consuming the most time or causing the most friction..."
                          className={inputClass + " resize-none"}
                          style={inputStyle}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-70"
                        style={{ background: "linear-gradient(135deg, #283891 0%, #7E0F4A 100%)" }}
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                            Submitting...
                          </>
                        ) : (
                          <>
                            Book Free Automation Audit
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </>
                        )}
                      </button>
                      <p className="text-xs text-gray-400 text-center">No spam. No obligation. We respond within 1 business day.</p>
                    </form>
                  </>
                )}
              </div>
            </div>

            {/* Trust sidebar */}
            <div className="space-y-5">
              <div className="rounded-2xl p-6" style={{ backgroundColor: "#283891" }}>
                <h3 className="font-bold text-white mb-4">What the Audit Includes</h3>
                <div className="space-y-3">
                  {[
                    "60-minute workflow mapping session (remote or in-person)",
                    "Operational friction analysis — where time is being lost",
                    "Top 3 automation opportunities ranked by ROI",
                    "Realistic implementation timeline",
                    "Fixed-price proposal if you choose to proceed",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-blue-300 mt-2 flex-shrink-0" />
                      <span className="text-blue-100 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl p-6 border" style={{ borderColor: "rgba(40,56,145,0.08)", backgroundColor: "#F7F8FB" }}>
                <h3 className="font-bold text-gray-900 mb-3 text-sm">Who This Is For</h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-3">
                  Small and medium businesses in Toronto and the GTA with 2 to 50 staff who are losing time to manual coordination, slow lead response, or disconnected tools.
                </p>
                <div className="space-y-1.5">
                  {["Immigration consultants", "Accounting firms", "Law firms", "Contractors", "Clinics", "Real estate teams"].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: "#7E0F4A" }} />
                      <span className="text-xs text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl p-6 border" style={{ borderColor: "rgba(40,56,145,0.08)" }}>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">Have a Question First?</h3>
                <p className="text-xs text-gray-500 mb-3">Prefer to reach out directly before booking?</p>
                <a href="mailto:hello@barrana.ai" className="text-sm font-semibold" style={{ color: "#283891" }}>
                  hello@barrana.ai
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
