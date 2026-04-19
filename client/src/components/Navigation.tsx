/**
 * BARRANA.AI NAVIGATION
 * Design: Operational Intelligence — Deep Navy / Barrana Blue / Electric Teal
 * - Transparent on hero sections → solid white on scroll
 * - Mega-dropdown for Services and Industries
 * - Mobile hamburger with staggered menu items
 * - Active animated underline indicator
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, Zap, Users, FileText, Phone, Settings, Building2, Scale, Hammer, Stethoscope, Home, Briefcase, Car, Leaf, Dog, GraduationCap, Wrench, HeartPulse, BarChart3 } from "lucide-react";

const serviceItems = [
  { label: "AI Agents", href: "/services/ai-agents", icon: Zap, desc: "Purpose-built agents for intake, follow-up, and reporting" },
  { label: "AI Receptionist", href: "/services/ai-receptionist", icon: Phone, desc: "24/7 inbound call and message handling" },
  { label: "Lead Response Automation", href: "/services/lead-response-automation", icon: Users, desc: "Respond, qualify, and book leads in under 90 seconds" },
  { label: "Client Intake Automation", href: "/services/client-intake-automation", icon: FileText, desc: "Onboard clients without manual data entry" },
  { label: "Document Collection", href: "/services/document-collection", icon: FileText, desc: "Stop chasing documents — automate the whole process" },
  { label: "Appointment Automation", href: "/services/appointment-automation", icon: Settings, desc: "Booked, confirmed, and reminded automatically" },
  { label: "Invoice Automation", href: "/services/invoice-automation", icon: FileText, desc: "Invoices sent, payments tracked, follow-ups handled" },
  { label: "Workflow Automation", href: "/services/workflow-automation", icon: Settings, desc: "Connect your tools through trigger-action logic" },
  { label: "CRM Automation", href: "/services/crm-automation", icon: Users, desc: "Your CRM stays current with zero manual entry" },
  { label: "Operations Reporting", href: "/services/operations-reporting", icon: FileText, desc: "Automated dashboards and performance reports" },
  { label: "After-Hours Automation", href: "/services/after-hours-automation", icon: Phone, desc: "Capture and qualify leads while your team sleeps" },
  { label: "Custom AI Systems", href: "/services/custom-ai-systems", icon: Zap, desc: "Your whole operation automated end-to-end" },
  { label: "Full-Stack Services", href: "/services/full-stack", icon: Zap, desc: "Custom software, websites, social media, and acquisition — one partner" },
];

const industryItems = [
  { label: "Solopreneurs & Experts", href: "/solopreneurs", icon: Users },
  { label: "Immigration Consultants", href: "/industries/immigration-consultants", icon: FileText },
  { label: "Accounting Firms", href: "/industries/accounting-firms", icon: Briefcase },
  { label: "Law Firms", href: "/industries/law-firms", icon: Scale },
  { label: "Contractors & Trades", href: "/industries/contractors", icon: Hammer },
  { label: "Physiotherapy Clinics", href: "/industries/physiotherapy-clinics", icon: Stethoscope },
  { label: "Real Estate Teams", href: "/industries/real-estate-teams", icon: Home },
  { label: "Service Businesses", href: "/industries/service-businesses", icon: Building2 },
  { label: "Dental Offices", href: "/industries/dental-offices", icon: HeartPulse },
  { label: "Insurance Brokers", href: "/industries/insurance-brokers", icon: Briefcase },
  { label: "Mortgage Brokers", href: "/industries/mortgage-brokers", icon: BarChart3 },
  { label: "Financial Advisors", href: "/industries/financial-advisors", icon: BarChart3 },
  { label: "Marketing Agencies", href: "/industries/marketing-agencies", icon: Zap },
  { label: "Cleaning Companies", href: "/industries/cleaning-companies", icon: Settings },
  { label: "Property Management", href: "/industries/property-management", icon: Building2 },
  { label: "Home Services (HVAC, Plumbing)", href: "/industries/home-services", icon: Wrench },
  { label: "Medical Clinics", href: "/industries/medical-clinics", icon: HeartPulse },
  { label: "Veterinary Clinics", href: "/industries/veterinary-clinics", icon: Dog },
  { label: "Tutoring Centers", href: "/industries/tutoring-education", icon: GraduationCap },
  { label: "Auto Repair Shops", href: "/industries/auto-repair", icon: Car },
  { label: "Landscaping & Snow Removal", href: "/industries/landscaping", icon: Leaf },
];

const mainNavItems = [
  { label: "Start Here", href: "/start-here" },
  { label: "Services", href: "/services", mega: "services" },
  { label: "Industries", href: "/industries", mega: "industries" },
  { label: "Automation Planner", href: "/automation-planner" },
  { label: "Locations", href: "/locations" },
  { label: "Resources", href: "/resources" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [location] = useLocation();

  // Hero is now light on all pages — nav is always white
  const isDarkHeroPage = false;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenMega(null);
    setMobileExpanded(null);
  }, [location]);

  const navBg = scrolled
    ? "bg-white shadow-md border-b border-gray-100"
    : "bg-white border-b border-gray-100";

  const textColor = "text-gray-700";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
      role="navigation"
      aria-label="Main navigation"
      onMouseLeave={() => setOpenMega(null)}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 lg:h-[70px]">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center flex-shrink-0 group transition-opacity duration-200 hover:opacity-85"
            aria-label="Barrana.ai — Home"
          >
            <img
              src="/barrana-logo.png"
              alt="Barrana.ai logo"
              height={38}
              style={{
                height: "38px",
                width: "auto",
                display: "block",
                /* slight scale on hover via the group */
                transition: "transform 0.2s ease",
              }}
              className="group-hover:scale-[1.03]"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5">
            {mainNavItems.map((item) => (
              <div key={item.label} className="relative">
                {item.mega ? (
                  <button
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${textColor} hover:text-[#283891] ${
                      !scrolled && isDarkHeroPage ? "hover:text-white hover:bg-white/10" : "hover:bg-gray-50"
                    }`}
                    onMouseEnter={() => setOpenMega(item.mega!)}
                    aria-haspopup="true"
                    aria-expanded={openMega === item.mega}
                  >
                    {item.label}
                    <ChevronDown
                      size={13}
                      className={`opacity-60 transition-transform duration-200 ${openMega === item.mega ? "rotate-180" : ""}`}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                      location === item.href
                        ? "text-[#283891] font-semibold"
                        : `${textColor} ${!scrolled && isDarkHeroPage ? "hover:text-white hover:bg-white/10" : "hover:text-[#283891] hover:bg-gray-50"}`
                    } ${item.label === "Start Here" ? "font-bold" : "font-medium"}`}
                    style={item.label === "Start Here" ? { color: location === item.href ? "#283891" : "#7E0F4A" } : undefined}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="btn-primary text-sm py-2.5 px-5"
            >
              Book Free Audit
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`lg:hidden p-2 rounded-md transition-colors ${textColor}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mega Dropdown: Services */}
      {openMega === "services" && (
        <div
          className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl"
          onMouseEnter={() => setOpenMega("services")}
          style={{ animation: "fade-up 0.15s ease" }}
        >
          <div className="container py-6">
            <div className="grid grid-cols-4 gap-3">
              {serviceItems.map((svc) => {
                const Icon = svc.icon;
                return (
                  <Link
                    key={svc.href}
                    href={svc.href}
                    className="group flex flex-col gap-2 p-4 rounded-xl border border-transparent hover:border-[#E2E4ED] hover:bg-[#F5F6FA] transition-all duration-200"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#283891]/8 flex items-center justify-center text-[#283891] group-hover:bg-[#283891] group-hover:text-white transition-all duration-200">
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="text-sm font-600 text-gray-800 group-hover:text-[#283891] transition-colors">{svc.label}</div>
                      <div className="text-xs text-gray-500 mt-0.5 leading-snug">{svc.desc}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-400">All automation services for GTA service businesses</span>
              <Link href="/services" className="text-xs font-600 text-[#283891] hover:text-[#7E0F4A] transition-colors">
                View all services →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mega Dropdown: Industries */}
      {openMega === "industries" && (
        <div
          className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl"
          onMouseEnter={() => setOpenMega("industries")}
          style={{ animation: "fade-up 0.15s ease" }}
        >
          <div className="container py-6">
            <div className="grid grid-cols-4 gap-3">
              {industryItems.map((ind) => {
                const Icon = ind.icon;
                return (
                  <Link
                    key={ind.href}
                    href={ind.href}
                    className="group flex items-center gap-3 p-3 rounded-xl border border-transparent hover:border-[#E2E4ED] hover:bg-[#F5F6FA] transition-all duration-200"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#283891]/8 flex items-center justify-center text-[#283891] group-hover:bg-[#283891] group-hover:text-white transition-all duration-200 flex-shrink-0">
                      <Icon size={16} />
                    </div>
                    <span className="text-sm font-500 text-gray-700 group-hover:text-[#283891] transition-colors">{ind.label}</span>
                  </Link>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-400">Industry-specific automation for Toronto & GTA</span>
              <Link href="/industries" className="text-xs font-600 text-[#283891] hover:text-[#7E0F4A] transition-colors">
                View all industries →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 max-h-[80vh] overflow-y-auto shadow-xl">
          <div className="container py-4 space-y-1">
            {/* Services */}
            <div>
              <button
                className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-[#283891] rounded-md"
                onClick={() => setMobileExpanded(mobileExpanded === "services" ? null : "services")}
              >
                Services
                <ChevronDown size={14} className={`transition-transform ${mobileExpanded === "services" ? "rotate-180" : ""}`} />
              </button>
              {mobileExpanded === "services" && (
                <div className="ml-4 mt-1 space-y-1">
                  {serviceItems.map((svc) => (
                    <Link key={svc.href} href={svc.href} className="block px-3 py-2 text-sm text-gray-600 hover:text-[#283891] rounded-md">
                      {svc.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Industries */}
            <div>
              <button
                className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-[#283891] rounded-md"
                onClick={() => setMobileExpanded(mobileExpanded === "industries" ? null : "industries")}
              >
                Industries
                <ChevronDown size={14} className={`transition-transform ${mobileExpanded === "industries" ? "rotate-180" : ""}`} />
              </button>
              {mobileExpanded === "industries" && (
                <div className="ml-4 mt-1 space-y-1">
                  {industryItems.map((ind) => (
                    <Link key={ind.href} href={ind.href} className="block px-3 py-2 text-sm text-gray-600 hover:text-[#283891] rounded-md">
                      {ind.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {[
              { label: "Start Here", href: "/start-here" },
              { label: "Automation Planner", href: "/automation-planner" },
              { label: "Locations", href: "/locations" },
              { label: "Resources", href: "/resources" },
              { label: "Case Studies", href: "/case-studies" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-[#283891] rounded-md"
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-3 border-t border-gray-100">
              <Link href="/contact" className="btn-primary w-full justify-center text-sm">
                Book Free Audit
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
