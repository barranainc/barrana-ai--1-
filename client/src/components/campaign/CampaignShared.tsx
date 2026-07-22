/**
 * BARRANA.AI CAMPAIGN COMPONENTS
 * Shared components for standalone campaign landing pages.
 * Design: Personal letter aesthetic - no nav, no distractions, one goal.
 * Colors: Navy #283891 | Magenta #7E0F4A | Grey #7B7B7B | Success Green #0D9668 | Danger Red #DC2626
 * These pages are noindex and have NO main site navigation.
 */
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

// ─── Brand Constants ─────────────────────────────────────────────────────────
export const NAVY = "#283891";
export const MAGENTA = "#7E0F4A";
export const GREY = "#7B7B7B";
export const SUCCESS = "#0D9668";
export const DANGER = "#DC2626";
export const BARRANA_LOGO_URL = "/barrana-logo.png";
export const BARRANA_LOGO_WHITE_URL = "/barrana-logo-white.png";

// ─── Booking URL ─────────────────────────────────────────────────────────────
export const BOOKING_URL =
  (import.meta.env.VITE_GHL_BOOKING_URL as string) || "https://booking.barrana.ai/audit";

// ─── Animated Counter ────────────────────────────────────────────────────────
interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({ value, prefix = "", suffix = "", className = "" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 1500, bounce: 0 });
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, motionValue, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = prefix + Math.round(latest).toLocaleString() + suffix;
      }
    });
  }, [springValue, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}

// ─── Campaign Header ─────────────────────────────────────────────────────────
export function CampaignHeader() {
  return (
    <header className="py-3 px-6 flex justify-between items-center border-b border-gray-100 bg-white sticky top-0 z-50 shadow-sm">
      <Link href="/">
        <img
          src={BARRANA_LOGO_URL}
          alt="Barrana AI Automation Consultancy Toronto GTA Logo"
          className="h-12 w-auto object-contain"
        />
      </Link>
      <a
        href="tel:+16473676771"
        className="text-sm font-medium transition-colors"
        style={{ color: NAVY }}
        onMouseEnter={(e) => (e.currentTarget.style.color = MAGENTA)}
        onMouseLeave={(e) => (e.currentTarget.style.color = NAVY)}
      >
        +1 647 367 6771
      </a>
    </header>
  );
}

// ─── Campaign Footer ─────────────────────────────────────────────────────────
export function CampaignFooter() {
  return (
    <footer style={{ backgroundColor: NAVY }} className="py-10 px-6">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-5">
        {/* Logo */}
        <Link href="/">
          <img
            src={BARRANA_LOGO_WHITE_URL}
            alt="Barrana AI Automation Consultancy Toronto GTA"
            className="h-14 w-auto object-contain"
          />
        </Link>
        {/* Tagline */}
        <p className="text-sm text-center" style={{ color: "rgba(255,255,255,0.75)" }}>
          AI Automation for GTA Service Businesses · Identify · Solve · Implement
        </p>
        {/* Contact */}
        <div className="flex flex-wrap justify-center gap-4 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
          <a href="tel:+16473676771" className="hover:text-white transition-colors">+1 647 367 6771</a>
          <span>·</span>
          <span>50 Corstate Ave, Unit 01, Vaughan, ON L4K 4X2</span>
        </div>
        {/* Divider */}
        <div className="w-full border-t" style={{ borderColor: "rgba(255,255,255,0.15)" }} />
        {/* Links */}
        <div className="flex gap-6 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
          <span>Unsubscribe</span>
          <a href="/governance" className="hover:text-white transition-colors underline">Privacy Policy</a>
          <a href="/" className="hover:text-white transition-colors">barrana.ai</a>
        </div>
      </div>
    </footer>
  );
}

// ─── Campaign CTA Button (scrolls to inline form) ────────────────────────────
interface CampaignCTAProps {
  utm?: string;
  centered?: boolean;
  large?: boolean;
}

export function CampaignCTA({ centered = false, large = false }: CampaignCTAProps) {
  const scrollToForm = () => {
    const el = document.getElementById("campaign-lead-form");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div className={`mt-8 ${centered ? "flex flex-col items-center" : ""}`}>
      <motion.button
        onClick={scrollToForm}
        className={`inline-block text-white font-bold rounded-xl shadow-lg cursor-pointer ${
          large ? "px-10 py-5 text-xl" : "px-8 py-4 text-lg"
        }`}
        style={{ backgroundColor: MAGENTA }}
        whileHover={{ scale: 1.03, backgroundColor: "#6a0c3e" }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.15 }}
      >
        Book Your Free 60-Minute Audit →
      </motion.button>
      <p className="text-sm mt-3" style={{ color: GREY }}>
        No pitch. No obligation. You keep the analysis.
      </p>
    </div>
  );
}

// ─── Campaign Math Item ───────────────────────────────────────────────────────
interface CampaignMathItemProps {
  figure: string;
  label: string;
  isTotal?: boolean;
}

export function CampaignMathItem({ figure, label, isTotal = false }: CampaignMathItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4 }}
      className={`${isTotal ? "mt-8 pt-6 border-t-2" : "border-l-4 pl-4"}`}
      style={isTotal ? { borderColor: NAVY } : { borderColor: MAGENTA }}
    >
      <div
        className={`font-bold ${isTotal ? "text-2xl" : "text-2xl md:text-3xl"}`}
        style={{ color: isTotal ? NAVY : MAGENTA }}
      >
        {figure}
      </div>
      <p className="text-sm mt-1" style={{ color: "#4A4A4A" }}>
        {label}
      </p>
    </motion.div>
  );
}

// ─── Section Fade Wrapper ─────────────────────────────────────────────────────
interface FadeSectionProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function FadeSection({ children, className = "", style }: FadeSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.55 }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ─── Campaign Lead Form ──────────────────────────────────────────────────────
interface CampaignLeadFormProps {
  industry: string; // e.g. "Contractors", "Dental", "Law Firms", "Real Estate"
  utm: string;
}

export function CampaignLeadForm({ industry, utm }: CampaignLeadFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    business: "",
    phone: "",
    email: "",
    challenge: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.name.split(" ")[0] || form.name,
          lastName: form.name.split(" ").slice(1).join(" ") || "",
          email: form.email,
          phone: form.phone,
          companyName: form.business,
          industry,
          message: form.challenge,
          source: "barrana.ai",
          formName: `Campaign - ${industry} Audit Request`,
          pageUrl: window.location.href,
          tags: ["campaign-lead", "audit-request", industry.toLowerCase().replace(/\s+/g, "-"), utm],
        }),
      });
    } catch (_) {
      // silent - show success regardless
    }
    setLoading(false);
    setSubmitted(true);
  };

  const inputClass = "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all";
  const inputFocusStyle = { "--tw-ring-color": NAVY } as React.CSSProperties;

  return (
    <section
      id="campaign-lead-form"
      className="py-16 px-6"
      style={{ backgroundColor: "#EEF0F8" }}
    >
      <div className="max-w-xl mx-auto">
        <FadeSection>
          {/* Section label */}
          <div
            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
            style={{ backgroundColor: NAVY, color: "white" }}
          >
            Free 60-Minute Automation Audit
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: NAVY }}>
            Claim Your Free Audit
          </h2>
          <p className="text-sm mb-8" style={{ color: GREY }}>
            Tell us a bit about your {industry.toLowerCase()} business. We will map out exactly which workflows to automate first and what it is worth to you - at no cost, no pitch.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl p-8 text-center border-2"
              style={{ backgroundColor: "white", borderColor: NAVY }}
            >
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold mb-2" style={{ color: NAVY }}>You are booked in.</h3>
              <p className="text-sm" style={{ color: GREY }}>
                We will reach out within 1 business day to confirm your 60-minute audit time. Check your inbox - including spam.
              </p>
              <p className="text-xs mt-4 font-medium" style={{ color: MAGENTA }}>
                No pitch. No obligation. You keep the analysis.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Name + Business */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: NAVY }}>Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. John Smith"
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass}
                    style={inputFocusStyle}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: NAVY }}>Business Name *</label>
                  <input
                    type="text"
                    name="business"
                    required
                    placeholder="e.g. Smith Renovations"
                    value={form.business}
                    onChange={handleChange}
                    className={inputClass}
                    style={inputFocusStyle}
                  />
                </div>
              </div>

              {/* Phone + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: NAVY }}>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g. 647-555-0123"
                    value={form.phone}
                    onChange={handleChange}
                    className={inputClass}
                    style={inputFocusStyle}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: NAVY }}>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="e.g. john@smithreno.ca"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass}
                    style={inputFocusStyle}
                  />
                </div>
              </div>

              {/* Biggest challenge */}
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: NAVY }}>
                  What is your biggest operational headache right now?
                </label>
                <textarea
                  name="challenge"
                  rows={3}
                  placeholder="e.g. I miss calls when I am on site. Leads go cold before I can follow up."
                  value={form.challenge}
                  onChange={handleChange}
                  className={inputClass + " resize-none"}
                  style={inputFocusStyle}
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full text-white font-bold rounded-xl py-4 text-lg shadow-lg disabled:opacity-70"
                style={{ backgroundColor: MAGENTA }}
                whileHover={loading ? {} : { scale: 1.02, backgroundColor: "#6a0c3e" }}
                whileTap={loading ? {} : { scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                {loading ? "Submitting…" : "Book My Free 60-Minute Audit →"}
              </motion.button>

              <p className="text-xs text-center" style={{ color: GREY }}>
                No pitch. No obligation. You keep the analysis. We respond within 1 business day.
              </p>
            </form>
          )}
        </FadeSection>
      </div>
    </section>
  );
}

// ─── ANIMATED GRAPHIC 1: Response Time Race ──────────────────────────────────
// Shows: Lead comes in → Without Barrana (4hr response, lead gone) vs With Barrana (90sec, lead booked)
interface ResponseRaceProps {
  withoutLabel?: string;
  withoutTime?: string;
  withLabel?: string;
  withTime?: string;
  outcomeWithout?: string;
  outcomeWith?: string;
}

export function ResponseRaceGraphic({
  withoutLabel = "Without Automation",
  withoutTime = "4+ Hours",
  withLabel = "With Barrana",
  withTime = "90 Seconds",
  outcomeWithout = "Lead booked with competitor",
  outcomeWith = "Lead booked with YOU",
}: ResponseRaceProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  return (
    <div ref={ref} className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="px-5 py-3 text-xs font-bold uppercase tracking-widest text-white" style={{ backgroundColor: NAVY }}>
        What Happens When a Lead Comes In
      </div>
      <div className="bg-white p-5 md:p-6 flex flex-col gap-5">

        {/* Row: Without */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold" style={{ color: DANGER }}>✗ {withoutLabel}</span>
            <span className="text-sm font-bold" style={{ color: DANGER }}>{withoutTime}</span>
          </div>
          <div className="h-8 rounded-lg overflow-hidden bg-gray-100 relative">
            <motion.div
              className="h-full rounded-lg flex items-center justify-end pr-3"
              style={{ backgroundColor: "#FEE2E2" }}
              initial={{ width: "0%" }}
              animate={isInView ? { width: "100%" } : {}}
              transition={{ duration: 2.5, delay: 0.3 }}
            >
              <span className="text-xs font-bold" style={{ color: DANGER }}>📞 Missed</span>
            </motion.div>
          </div>
          <motion.p
            className="text-xs mt-1.5 font-medium"
            style={{ color: DANGER }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 2.9 }}
          >
            ↳ {outcomeWithout}
          </motion.p>
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-gray-200" />

        {/* Row: With Barrana */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold" style={{ color: SUCCESS }}>✓ {withLabel}</span>
            <span className="text-sm font-bold" style={{ color: SUCCESS }}>{withTime}</span>
          </div>
          <div className="h-8 rounded-lg overflow-hidden bg-gray-100 relative">
            <motion.div
              className="h-full rounded-lg flex items-center justify-end pr-3"
              style={{ backgroundColor: "#D1FAE5" }}
              initial={{ width: "0%" }}
              animate={isInView ? { width: "8%" } : {}}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <span className="text-xs font-bold" style={{ color: SUCCESS }}></span>
            </motion.div>
          </div>
          <motion.p
            className="text-xs mt-1.5 font-medium"
            style={{ color: SUCCESS }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            ↳ {outcomeWith}
          </motion.p>
        </div>

      </div>
    </div>
  );
}

// ─── ANIMATED GRAPHIC 2: Before / After Workflow ─────────────────────────────
// Shows a 3-step workflow: Before (manual, broken) vs After (automated, smooth)
interface WorkflowStep {
  label: string;
  detail: string;
}

interface BeforeAfterWorkflowProps {
  title?: string;
  beforeSteps: WorkflowStep[];
  afterSteps: WorkflowStep[];
}

export function BeforeAfterWorkflow({ title = "How It Works Now vs. How It Should Work", beforeSteps, afterSteps }: BeforeAfterWorkflowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  return (
    <div ref={ref} className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
      <div className="px-5 py-3 text-xs font-bold uppercase tracking-widest text-white" style={{ backgroundColor: NAVY }}>
        {title}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">

        {/* Before */}
        <div className="bg-red-50 p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: DANGER }}>✗</div>
            <span className="font-bold text-sm" style={{ color: DANGER }}>Before: Manual & Broken</span>
          </div>
          <div className="flex flex-col gap-3">
            {beforeSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.15 + 0.2 }}
                className="flex gap-3 items-start"
              >
                <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white mt-0.5" style={{ backgroundColor: "#FCA5A5" }}>
                  {i + 1}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#7F1D1D" }}>{step.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#991B1B" }}>{step.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* After */}
        <div className="bg-green-50 p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: SUCCESS }}>✓</div>
            <span className="font-bold text-sm" style={{ color: SUCCESS }}>After: Automated & Reliable</span>
          </div>
          <div className="flex flex-col gap-3">
            {afterSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 12 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.15 + 0.5 }}
                className="flex gap-3 items-start"
              >
                <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white mt-0.5" style={{ backgroundColor: SUCCESS }}>
                  {i + 1}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#064E3B" }}>{step.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#065F46" }}>{step.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── ANIMATED GRAPHIC 3: Revenue Recovery Meter ──────────────────────────────
// Shows an animated gauge / bar that fills to show recoverable revenue
interface RevenueRecoveryProps {
  totalAtRisk: string;
  recoverable: string;
  recoverablePercent: number; // 0-100
  label?: string;
}

export function RevenueRecoveryMeter({ totalAtRisk, recoverable, recoverablePercent, label = "Recoverable with Barrana" }: RevenueRecoveryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  return (
    <div ref={ref} className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
      <div className="px-5 py-3 text-xs font-bold uppercase tracking-widest text-white" style={{ backgroundColor: NAVY }}>
        Your Revenue at Risk
      </div>
      <div className="bg-white p-5 md:p-6">
        {/* Total bar */}
        <div className="mb-2 flex justify-between items-center">
          <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: GREY }}>Total operational waste</span>
          <span className="text-sm font-bold" style={{ color: "#1a1a2e" }}>{totalAtRisk}</span>
        </div>
        <div className="h-10 rounded-xl bg-gray-100 overflow-hidden relative mb-5">
          <motion.div
            className="h-full rounded-xl"
            style={{ background: `linear-gradient(90deg, ${DANGER} 0%, #F87171 100%)` }}
            initial={{ width: "0%" }}
            animate={isInView ? { width: "100%" } : {}}
            transition={{ duration: 1.2, delay: 0.2 }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-white drop-shadow">Revenue lost to manual operations</span>
          </div>
        </div>

        {/* Recoverable bar */}
        <div className="mb-2 flex justify-between items-center">
          <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: GREY }}>{label}</span>
          <span className="text-sm font-bold" style={{ color: SUCCESS }}>{recoverable}</span>
        </div>
        <div className="h-10 rounded-xl bg-gray-100 overflow-hidden relative">
          <motion.div
            className="h-full rounded-xl"
            style={{ background: `linear-gradient(90deg, ${SUCCESS} 0%, #34D399 100%)` }}
            initial={{ width: "0%" }}
            animate={isInView ? { width: `${recoverablePercent}%` } : {}}
            transition={{ duration: 1.2, delay: 0.7 }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-white drop-shadow">Recoverable within 90 days</span>
          </div>
        </div>

        {/* CTA nudge */}
        <motion.p
          className="text-xs mt-4 text-center font-medium"
          style={{ color: MAGENTA }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 2 }}
        >
          ↑ This is what the free 60-minute audit will map out for your business specifically.
        </motion.p>
      </div>
    </div>
  );
}

// ─── ANIMATED GRAPHIC 4: Problem Counter Grid ────────────────────────────────
// Shows 4 animated stat cards with the cost of inaction
interface ProblemStat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  icon: string;
}

interface ProblemCounterGridProps {
  stats: ProblemStat[];
}

export function ProblemCounterGrid({ stats }: ProblemCounterGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 + 0.2 }}
          className="rounded-xl p-4 border-l-4 bg-white shadow-sm"
          style={{ borderColor: i % 2 === 0 ? MAGENTA : NAVY }}
        >
          <div className="text-2xl mb-1">{stat.icon}</div>
          <div className="text-xl md:text-2xl font-bold" style={{ color: i % 2 === 0 ? MAGENTA : NAVY }}>
            <AnimatedCounter value={stat.value} prefix={stat.prefix || ""} suffix={stat.suffix || ""} />
          </div>
          <p className="text-xs mt-1" style={{ color: "#4A4A4A" }}>{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
