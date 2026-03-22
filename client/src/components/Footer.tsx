/**
 * BARRANA.AI FOOTER
 * Design: Operational Intelligence — Deep Navy #283891
 * 4-column layout: Company, Services, Industries, Resources
 * Bottom: copyright, privacy, PIPEDA notice
 */
import { Link } from "wouter";
import { MapPin, Mail, Phone, ArrowRight } from "lucide-react";
// lucide-react used for contact icons; social icons are raw SVGs (TikTok not in lucide)

// ── Social icon SVGs (TikTok not in lucide, all kept consistent as raw SVG) ──
function IconLinkedIn() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}
function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}
function IconTikTok() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
    </svg>
  );
}
function IconFacebook() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: "LinkedIn",  href: "https://linkedin.com/company/barrana-ai",   Icon: IconLinkedIn  },
  { label: "Instagram", href: "https://instagram.com/barrana.ai",           Icon: IconInstagram },
  { label: "TikTok",   href: "https://tiktok.com/@barrana.ai",             Icon: IconTikTok    },
  { label: "Facebook", href: "https://facebook.com/barranaai",             Icon: IconFacebook  },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#283891" }} className="text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            {/* Logo — white version on dark navy footer */}
            <div className="mb-5">
              <img
                src="/barrana-logo-white.png"
                alt="Barrana.ai"
                style={{
                  height: "44px",
                  width: "auto",
                  display: "block",
                  filter: "brightness(0) invert(1)",   /* forces pure white */
                  opacity: 0.92,
                }}
              />
              <span className="sr-only">Barrana.ai</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-xs">
              AI automation systems for small and medium businesses in Toronto and the GTA. We build the operational backbone that lets your team grow without burning out.
            </p>
            {/* Contact details */}
            <div className="space-y-2.5 mb-6">
              <div className="flex items-start gap-2 text-sm text-gray-300">
                <MapPin size={14} style={{ color: "#7E0F4A", marginTop: "3px", flexShrink: 0 }} />
                <span>50 Corstate Avenue, Unit 01<br />Vaughan, ON&nbsp;&nbsp;L4K 4X2</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Phone size={14} style={{ color: "#7E0F4A", flexShrink: 0 }} />
                <a href="tel:+16473676771" className="hover:text-white transition-colors">+1 647 367 6771</a>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Mail size={14} style={{ color: "#7E0F4A", flexShrink: 0 }} />
                <a href="mailto:help@barrana.ai" className="hover:text-white transition-colors">help@barrana.ai</a>
              </div>
            </div>

            {/* Social media */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Barrana.ai on ${label}`}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(126,15,74,0.5)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-gray-400 mb-4">Services</h4>
            <ul className="space-y-2.5">
              {[
                { label: "AI Agents", href: "/services/ai-agents" },
                { label: "Workflow Automation", href: "/services/workflow-automation" },
                { label: "Lead Response Automation", href: "/services/lead-response-automation" },
                { label: "Operations Reporting", href: "/services/operations-reporting" },
                { label: "AI Receptionist", href: "/services/ai-receptionist" },
                { label: "Client Intake Automation", href: "/services/client-intake-automation" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-gray-300 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="font-semibold text-xs uppercase tracking-widest text-gray-400 mb-4 mt-7">Industries</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Immigration Consultants", href: "/industries/immigration-consultants" },
                { label: "Accounting Firms", href: "/industries/accounting-firms" },
                { label: "Law Firms", href: "/industries/law-firms" },
                { label: "Contractors", href: "/industries/contractors" },
                { label: "Physiotherapy Clinics", href: "/industries/physiotherapy-clinics" },
                { label: "Real Estate Teams", href: "/industries/real-estate-teams" },
                { label: "Service Businesses", href: "/industries/service-businesses" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-gray-300 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations Column */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-gray-400 mb-4">Locations</h4>
            <ul className="space-y-2.5 mb-7">
              {[
                { label: "Toronto", href: "/locations/toronto" },
                { label: "Vaughan", href: "/locations/vaughan" },
                { label: "Richmond Hill", href: "/locations/richmond-hill" },
                { label: "Markham", href: "/locations/markham" },
                { label: "Mississauga", href: "/locations/mississauga" },
                { label: "North York", href: "/locations/north-york" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-gray-300 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="font-semibold text-xs uppercase tracking-widest text-gray-400 mb-4">Workflow Guides</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Lead Intake Automation", href: "/workflows/lead-intake" },
                { label: "Appointment Booking", href: "/workflows/appointment-booking" },
                { label: "Client Onboarding", href: "/workflows/client-onboarding" },
                { label: "Document Collection", href: "/workflows/document-collection" },
                { label: "What to Automate First", href: "/insights/what-to-automate-first" },
                { label: "Build vs Buy Guide", href: "/insights/build-vs-buy" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-gray-300 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-gray-400 mb-4">Foundation Guides</h4>
            <ul className="space-y-2.5 mb-7">
              {[
                { label: "AI Adoption Guide", href: "/ai-adoption-small-business" },
                { label: "Workflow Automation Guide", href: "/workflow-automation-smb" },
                { label: "AI Receptionist Guide", href: "/ai-receptionist" },
                { label: "Human-in-the-Loop AI", href: "/human-in-the-loop-ai" },
                { label: "Automation by Industry", href: "/ai-automation-industries" },
                { label: "When AI Is Not the Answer", href: "/insights/when-ai-is-not-the-answer" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-gray-300 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="font-semibold text-xs uppercase tracking-widest text-gray-400 mb-4">Resources</h4>
            <ul className="space-y-2.5 mb-7">
              {[
                { label: "Case Studies", href: "/case-studies" },
                { label: "Resources Hub", href: "/resources" },
                { label: "Automation Playbooks", href: "/playbooks" },
                { label: "AI Automation Glossary", href: "/glossary" },
                { label: "Workflow Templates", href: "/templates" },
                { label: "Automation Benchmarks", href: "/benchmarks" },
                { label: "Before & After", href: "/before-after" },
                { label: "ROI Calculator", href: "/automation-roi-calculator" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-gray-300 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="font-semibold text-xs uppercase tracking-widest text-gray-400 mb-4">Company</h4>
            <ul className="space-y-2.5">
              {[
                { label: "About Barrana.ai", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Integrations", href: "/integrations" },
                { label: "Governance", href: "/governance" },
                { label: "Operator Insights", href: "/operator-insights" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-gray-300 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-xl" style={{ background: "rgba(26, 82, 118, 0.2)", border: "1px solid rgba(0, 180, 216, 0.15)" }}>
            <div>
              <p className="font-semibold text-lg">Ready to recover hours every week?</p>
              <p className="text-gray-300 text-sm mt-1">Book a free 60-minute Automation Audit. No obligation, no sales pitch.</p>
            </div>
            <Link href="/contact" className="btn-primary flex-shrink-0 flex items-center gap-2">
              Book Free Audit <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Barrana.ai. All rights reserved. Serving Toronto, Vaughan, Markham, Richmond Hill, Mississauga, and North York.</p>
          <div className="flex items-center gap-4">
            <span>PIPEDA-aware implementations for Canadian businesses</span>
            <Link href="/governance" className="hover:text-gray-300 transition-colors">Privacy & Governance</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
