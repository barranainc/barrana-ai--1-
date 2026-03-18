/**
 * BARRANA.AI FOOTER
 * Design: Operational Intelligence — Deep Navy #283891
 * 4-column layout: Company, Services, Industries, Resources
 * Bottom: copyright, privacy, PIPEDA notice
 */
import { Link } from "wouter";
import { MapPin, Mail, ArrowRight, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#283891" }} className="text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#283891" }}>
                <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
                  <path d="M3 14L7 4L11 10L13 7L15 14H3Z" fill="white" opacity="0.95"/>
                  <circle cx="13.5" cy="6" r="1.8" fill="#7E0F4A"/>
                </svg>
              </div>
              <span className="font-bold text-xl tracking-tight">
                Barrana<span style={{ color: "#7E0F4A" }}>.ai</span>
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-xs">
              AI automation systems for small and medium businesses in Toronto and the GTA. We build the operational backbone that lets your team grow without burning out.
            </p>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <MapPin size={14} style={{ color: "#7E0F4A" }} />
                <span>Vaughan, Ontario (Serving GTA)</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Mail size={14} style={{ color: "#7E0F4A" }} />
                <a href="mailto:hello@barrana.ai" className="hover:text-white transition-colors">hello@barrana.ai</a>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-gray-400 mb-4">Services</h4>
            <ul className="space-y-2.5">
              {[
                { label: "AI Agents", href: "/services/ai-agents" },
                { label: "Workflow Automation", href: "/services/workflow-automation" },
                { label: "Lead Automation", href: "/services/lead-automation" },
                { label: "Operations Automation", href: "/services/operations-automation" },
                { label: "AI Receptionist", href: "/services/ai-receptionist" },
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

            <h4 className="font-semibold text-xs uppercase tracking-widest text-gray-400 mb-4">Knowledge</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Lead Response Automation", href: "/knowledge/lead-automation" },
                { label: "Client Intake Automation", href: "/knowledge/client-intake-automation" },
                { label: "AI Agents Explained", href: "/knowledge/ai-agents-for-small-business" },
                { label: "Workflow Automation", href: "/knowledge/workflow-automation-explained" },
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
            <h4 className="font-semibold text-xs uppercase tracking-widest text-gray-400 mb-4">Resources</h4>
            <ul className="space-y-2.5 mb-7">
              {[
                { label: "Case Studies", href: "/case-studies" },
                { label: "Resources Hub", href: "/resources" },
                { label: "Automation Playbooks", href: "/playbooks/immigration-client-intake" },
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
