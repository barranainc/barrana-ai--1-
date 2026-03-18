/**
 * BARRANA.AI LOCATIONS PAGE
 */
import { Link } from "wouter";
import { ArrowRight, MapPin } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const locations = [
  { slug: "toronto", name: "Toronto", description: "AI automation for small businesses across Toronto's diverse commercial districts and professional services sector." },
  { slug: "vaughan", name: "Vaughan", description: "Serving Vaughan's growing professional services community with AI-powered workflow automation." },
  { slug: "richmond-hill", name: "Richmond Hill", description: "AI automation for Richmond Hill's professional services firms and service-based businesses." },
  { slug: "markham", name: "Markham", description: "Workflow automation for Markham's technology-forward small business community." },
  { slug: "mississauga", name: "Mississauga", description: "AI automation systems for Mississauga's diverse professional services and contractor community." },
  { slug: "north-york", name: "North York", description: "Serving North York's professional services firms with AI-powered operational automation." },
];

export default function Locations() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="pt-24 pb-16 lg:pt-32 lg:pb-20" style={{ backgroundColor: "#F7F8FB" }}>
        <div className="container">
          <div className="max-w-3xl">
            <div className="section-label mb-4">Service Areas</div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
              AI Automation Services Across the GTA
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Barrana.ai is based in Vaughan and serves small and medium businesses across the Greater Toronto Area. We work on-site and remotely across all GTA cities.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((loc) => (
              <Link key={loc.slug} href={`/locations/${loc.slug}`} className="barrana-card p-6 flex flex-col group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#F2F4F8" }}>
                    <MapPin size={18} style={{ color: "#283891" }} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-[#283891] transition-colors">{loc.name}</h2>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-4">{loc.description}</p>
                <div className="text-sm font-semibold flex items-center gap-1.5" style={{ color: "#283891" }}>
                  View local services <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: "#283891" }}>
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Serving All of the GTA</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">We work with businesses across the Greater Toronto Area. If your city is not listed, contact us — we likely serve your area.</p>
          <Link href="/contact" className="btn-accent">
            Book a Free Automation Audit <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
