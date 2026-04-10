/**
 * Contact.tsx — Barrana.ai Contact / Book Audit Page
 * Design: Premium Systems Consultancy
 * Clean form layout, scroll reveal, trust signals
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { MapPin, Phone, Mail } from "lucide-react";
import { colors } from "@/styles/design-tokens";
import { submitLead } from "@/lib/ghl";
import SEOHead from "@/components/SEOHead";
import JsonLd from "@/components/JsonLd";

// Social icons
function IconLinkedIn() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
}
function IconInstagram() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
}
function IconTikTok() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/></svg>;
}
function IconFacebook() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
}

const SOCIAL_LINKS = [
  { label: "LinkedIn",  href: "https://linkedin.com/company/barrana-ai",   Icon: IconLinkedIn  },
  { label: "Instagram", href: "https://instagram.com/barrana.ai",           Icon: IconInstagram },
  { label: "TikTok",   href: "https://tiktok.com/@barrana.ai",             Icon: IconTikTok    },
  { label: "Facebook", href: "https://facebook.com/barranaai",             Icon: IconFacebook  },
];

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
    try {
      const result = await submitLead({
        firstName: formData.name.split(" ")[0],
        lastName: formData.name.split(" ").slice(1).join(" ") || "",
        email: formData.email,
        phone: formData.phone || undefined,
        companyName: formData.business,
        industry: formData.industry,
        message: formData.challenge || undefined,
        formName: "Contact Form - Audit Request",
        pageUrl: window.location.href,
        tags: [
          "website-lead",
          "audit-request",
          formData.industry.toLowerCase().replace(/\s+/g, "-"),
        ],
        customFields: [
          { key: "city", field_value: formData.city || "" },
          { key: "team_size", field_value: formData.employees || "" },
        ],
      });
      if (!result.success) {
        console.error("Lead submit error:", result.error);
      }
      setSubmitted(true);
      toast.success("Audit request received! We'll be in touch within 1 business day.");
    } catch {
      // Show success even on failure to avoid blocking UX
      setSubmitted(true);
      toast.success("Audit request received! We'll be in touch within 1 business day.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border text-sm outline-none bg-[#F7F8FB] transition-all";
  const inputStyle = { borderColor: "rgba(40,56,145,0.15)" };

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Barrana.ai",
    "url": "https://barrana.ai",
    "telephone": "+16473676771",
    "email": "help@barrana.ai",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "50 Corstate Avenue, Unit 01",
      "addressLocality": "Vaughan",
      "addressRegion": "ON",
      "postalCode": "L4K 4X2",
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 43.7942,
      "longitude": -79.5320
    },
    "openingHours": "Mo-Fr 09:00-18:00",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+16473676771",
      "contactType": "sales",
      "availableLanguage": ["English"]
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Contact Barrana.ai | Book a Free Automation Audit"
        description="Book a free 60-minute Automation Audit for your business. We map your workflows, calculate your operational costs, and show you what to automate first. Vaughan office or Zoom."
      />
      <JsonLd data={contactSchema} />
      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden" style={{ backgroundColor: colors.surfaceLight }}>
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
      <section className="py-16 lg:py-20" style={{ backgroundColor: colors.surfaceLight }}>
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
                      <p className="text-xs text-gray-500 text-center mt-3">
                        Not sure where to start? <Link href="/start-here" className="underline" style={{ color: "#283891" }}>Learn what automation can do for your business</Link>, or <Link href="/services" className="underline" style={{ color: "#283891" }}>browse our services</Link>.
                      </p>
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

              <div className="rounded-2xl p-6 border" style={{ borderColor: "rgba(40,56,145,0.08)", backgroundColor: colors.surfaceLight }}>
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

              <div className="rounded-2xl p-6 border" style={{ borderColor: "rgba(40,56,145,0.08)", backgroundColor: colors.surfaceLight }}>
                <h3 className="font-bold text-gray-900 mb-3 text-sm">Learn More</h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-2">
                  <Link href="/about" className="underline" style={{ color: "#283891" }}>About Barrana</Link> — who we are and how we work with small businesses across the GTA.
                </p>
              </div>

              <div className="rounded-2xl p-6 border" style={{ borderColor: "rgba(40,56,145,0.08)" }}>
                <h3 className="font-bold text-gray-900 mb-4 text-sm">Reach Us Directly</h3>
                <div className="space-y-3 mb-5">
                  <div className="flex items-start gap-2.5">
                    <MapPin size={14} style={{ color: "#7E0F4A", marginTop: "2px", flexShrink: 0 }} />
                    <span className="text-xs text-gray-600 leading-relaxed">
                      50 Corstate Avenue, Unit 01<br />Vaughan, ON&nbsp;&nbsp;L4K 4X2
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone size={14} style={{ color: "#7E0F4A", flexShrink: 0 }} />
                    <a href="tel:+16473676771" className="text-xs text-gray-600 hover:text-gray-900 transition-colors">
                      +1 647 367 6771
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail size={14} style={{ color: "#7E0F4A", flexShrink: 0 }} />
                    <a href="mailto:help@barrana.ai" className="text-xs font-semibold hover:underline" style={{ color: "#283891" }}>
                      help@barrana.ai
                    </a>
                  </div>
                </div>

                {/* Social links */}
                <p className="text-xs text-gray-400 mb-2.5">Follow us</p>
                <div className="flex items-center gap-2">
                  {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Barrana.ai on ${label}`}
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                      style={{ background: "rgba(40,56,145,0.07)", color: "#283891" }}
                    >
                      <Icon />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
