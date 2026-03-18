/**
 * BARRANA.AI LOCATION DETAIL PAGE
 * SEO-optimized local pages for each GTA city
 */
import { Link, useParams } from "wouter";
import { ArrowRight, MapPin, ArrowLeft, CheckCircle2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const locationData: Record<string, {
  name: string;
  province: string;
  title: string;
  heroSubtitle: string;
  overview: string[];
  localContext: string;
  industries: string[];
  services: string[];
}> = {
  "toronto": {
    name: "Toronto",
    province: "Ontario",
    title: "AI Automation for Small Business in Toronto",
    heroSubtitle: "Barrana.ai builds AI automation systems for Toronto's professional services firms, contractors, clinics, and service-based businesses.",
    overview: [
      "Toronto is home to one of Canada's most competitive small business environments. Professional services firms, contractors, clinics, and service-based businesses across the city face the same operational challenge: growing client volume with limited administrative capacity.",
      "Barrana.ai works with Toronto businesses to build automation systems that close response gaps, eliminate manual coordination, and give teams the operational bandwidth to grow without adding headcount.",
      "We serve businesses across all of Toronto's commercial districts: downtown core, Midtown, North York, Scarborough, Etobicoke, and the surrounding areas.",
    ],
    localContext: "Toronto's professional services market is highly competitive. Response time and operational consistency are key differentiators. Businesses that automate their intake and follow-up processes consistently outperform those that rely on manual operations.",
    industries: ["Immigration Consultants", "Accounting Firms", "Law Firms", "Contractors", "Clinics", "Real Estate Teams"],
    services: ["AI Agents", "Workflow Automation", "Lead Automation", "Operations Automation", "AI Receptionist"],
  },
  "vaughan": {
    name: "Vaughan",
    province: "Ontario",
    title: "AI Automation for Small Business in Vaughan",
    heroSubtitle: "Barrana.ai is based in Vaughan and serves the city's growing professional services community with AI-powered workflow automation.",
    overview: [
      "Vaughan is one of the fastest-growing cities in the GTA, with a rapidly expanding professional services sector. Immigration consultants, accounting firms, contractors, and healthcare providers across Vaughan face the same operational challenges as their counterparts in Toronto.",
      "As a Vaughan-based company, Barrana.ai has deep familiarity with the local business community and the specific operational challenges faced by businesses in this market.",
      "We work with businesses across Vaughan — from Woodbridge to Maple, Concord to Thornhill — to build automation systems that reduce administrative overhead and improve operational consistency.",
    ],
    localContext: "Vaughan's business community is characterized by a high concentration of professional services firms serving both local and GTA-wide clients. Many of these businesses are growing rapidly and need operational infrastructure to support that growth.",
    industries: ["Immigration Consultants", "Accounting Firms", "Contractors", "Clinics", "Law Firms"],
    services: ["AI Agents", "Workflow Automation", "Lead Automation", "Operations Automation", "AI Receptionist"],
  },
  "richmond-hill": {
    name: "Richmond Hill",
    province: "Ontario",
    title: "AI Automation for Small Business in Richmond Hill",
    heroSubtitle: "Barrana.ai builds AI automation systems for Richmond Hill's professional services firms and service-based businesses.",
    overview: [
      "Richmond Hill's professional services community has grown significantly over the past decade, with a high concentration of immigration consultants, accounting firms, and healthcare providers serving the city's diverse population.",
      "Barrana.ai serves Richmond Hill businesses with the same automation systems we build for clients across the GTA — tailored to the specific workflows and operational challenges of each business.",
    ],
    localContext: "Richmond Hill has a high concentration of immigration and professional services firms serving the city's diverse communities. These businesses often manage high document volumes and complex client intake processes that benefit significantly from automation.",
    industries: ["Immigration Consultants", "Accounting Firms", "Clinics", "Law Firms", "Real Estate Teams"],
    services: ["AI Agents", "Workflow Automation", "Lead Automation", "Operations Automation"],
  },
  "markham": {
    name: "Markham",
    province: "Ontario",
    title: "AI Automation for Small Business in Markham",
    heroSubtitle: "Workflow automation for Markham's technology-forward small business community.",
    overview: [
      "Markham is one of Canada's technology hubs, with a business community that is generally receptive to technology-driven operational improvements. Professional services firms, contractors, and healthcare providers across Markham are well-positioned to benefit from AI automation.",
      "Barrana.ai builds automation systems for Markham businesses that connect existing tools, eliminate manual coordination, and improve operational consistency.",
    ],
    localContext: "Markham's technology-forward business culture means that many businesses are already using modern tools — CRMs, project management platforms, accounting software — but have not yet connected them through automation.",
    industries: ["Accounting Firms", "Immigration Consultants", "Clinics", "Contractors", "Real Estate Teams"],
    services: ["Workflow Automation", "AI Agents", "Lead Automation", "Operations Automation"],
  },
  "mississauga": {
    name: "Mississauga",
    province: "Ontario",
    title: "AI Automation for Small Business in Mississauga",
    heroSubtitle: "AI automation systems for Mississauga's diverse professional services and contractor community.",
    overview: [
      "Mississauga is the GTA's second-largest city and home to a diverse professional services community. Contractors, clinics, accounting firms, and immigration consultants across Mississauga face the same operational challenges as businesses throughout the region.",
      "Barrana.ai has worked with Mississauga businesses across multiple industries, building automation systems that address the specific operational friction points in each sector.",
    ],
    localContext: "Mississauga's contractor community is particularly active, with high volumes of residential renovation and construction work. Lead response time is a critical competitive factor in this market.",
    industries: ["Contractors", "Accounting Firms", "Clinics", "Immigration Consultants", "Real Estate Teams"],
    services: ["Lead Automation", "Workflow Automation", "AI Receptionist", "Operations Automation"],
  },
  "north-york": {
    name: "North York",
    province: "Ontario",
    title: "AI Automation for Small Business in North York",
    heroSubtitle: "Serving North York's professional services firms with AI-powered operational automation.",
    overview: [
      "North York is home to a dense concentration of professional services firms, particularly immigration consultants, accounting firms, and healthcare providers. The area's diverse population creates high demand for professional services with complex intake and document management requirements.",
      "Barrana.ai serves North York businesses with automation systems designed to handle the high-volume, document-intensive workflows common in this market.",
    ],
    localContext: "North York has one of the highest concentrations of immigration consulting firms in the GTA. These businesses manage complex, document-heavy client files and benefit significantly from automated intake and document collection systems.",
    industries: ["Immigration Consultants", "Accounting Firms", "Clinics", "Law Firms", "Real Estate Teams"],
    services: ["AI Agents", "Workflow Automation", "Operations Automation", "Lead Automation"],
  },
};

export default function LocationDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "";
  const location = locationData[slug];

  if (!location) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="container pt-32 pb-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Location Not Found</h1>
          <Link href="/locations" className="btn-primary">View All Locations</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-20" style={{ backgroundColor: "#F7F8FB" }}>
        <div className="container">
          <Link href="/locations" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#283891] mb-6 transition-colors">
            <ArrowLeft size={14} /> Back to Locations
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={18} style={{ color: "#7E0F4A" }} />
            <span className="text-sm text-gray-500">{location.name}, {location.province}</span>
          </div>
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">{location.title}</h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">{location.heroSubtitle}</p>
            <Link href="/contact" className="btn-primary">
              Book a Free Automation Audit in {location.name} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="space-y-5 mb-10">
                {location.overview.map((p, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed">{p}</p>
                ))}
              </div>
              <div className="left-accent-magenta mb-8">
                <p className="text-gray-700 leading-relaxed text-sm">{location.localContext}</p>
              </div>
            </div>
            <div className="space-y-5">
              <div className="barrana-card p-6">
                <h3 className="font-bold text-gray-900 mb-4">Industries We Serve in {location.name}</h3>
                <ul className="space-y-2">
                  {location.industries.map((ind) => (
                    <li key={ind} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 size={14} style={{ color: "#283891" }} />
                      {ind}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="barrana-card p-6">
                <h3 className="font-bold text-gray-900 mb-4">Services Available</h3>
                <ul className="space-y-2">
                  {location.services.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 size={14} style={{ color: "#7E0F4A" }} />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl p-6 text-white" style={{ backgroundColor: "#283891" }}>
                <h3 className="font-bold mb-3">Serving {location.name}</h3>
                <p className="text-sm text-blue-100 mb-4">Book a free 60-minute Automation Audit. We work on-site and remotely across the GTA.</p>
                <Link href="/contact" className="btn-accent text-sm w-full justify-center">
                  Book Free Audit <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
