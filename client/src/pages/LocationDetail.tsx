/**
 * BARRANA.AI LOCATION DETAIL PAGE — Premium Hub
 * 8-section design linking to 30 Tier 1/Tier 2 local industry pages
 */
import { Link, useParams } from "wouter";
import {
  ArrowRight,
  MapPin,
  FileText,
  Calculator,
  Stethoscope,
  Activity,
  HardHat,
  Scale,
  Building2,
  Sparkles,
  DollarSign,
  ClipboardCheck,
  Cog,
  Rocket,
  Search,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BreadcrumbNav from "@/components/linking/BreadcrumbNav";
import IndustryServiceCrosslinks from "@/components/linking/IndustryServiceCrosslinks";
import { colors, spacing, typography, cards, surfaces, buttons } from "@/styles/design-tokens";
import { localPages } from "@/data/local-pages";

/* ─── INDUSTRY ICONS ──────────────────────────────────────── */
const industryIcons: Record<string, LucideIcon> = {
  "Immigration Consultants": FileText,
  "Accounting Firms": Calculator,
  "Dental Clinics": Stethoscope,
  "Dental Offices": Stethoscope,
  "Physio/Rehab Clinics": Activity,
  "Physiotherapy Clinics": Activity,
  "Contractors": HardHat,
  "Law Firms": Scale,
  "Real Estate Teams": Building2,
  "Solopreneurs/Coaches": Sparkles,
  "Solopreneurs": Sparkles,
};

/* ─── DOLLAR PAIN PER INDUSTRY ────────────────────────────── */
const industryDollarPain: Record<string, string> = {
  "Immigration Consultants": "$70K+/yr in intake admin",
  "Accounting Firms": "$80K+/yr in document chasing",
  "Dental Clinics": "$150K/yr from no-shows",
  "Dental Offices": "$150K/yr from no-shows",
  "Physio/Rehab Clinics": "$37K-$150K/yr from empty slots",
  "Physiotherapy Clinics": "$37K-$150K/yr from empty slots",
  "Contractors": "8-12 leads/month lost on the job",
  "Law Firms": "$300-$500/hr lost to admin per lawyer",
  "Real Estate Teams": "80% of leads need 6-12 month follow-up",
  "Solopreneurs/Coaches": "$78K/yr on admin at $100/hr",
  "Solopreneurs": "$78K/yr on admin at $100/hr",
};

/* ─── ONE-LINE PAIN PER INDUSTRY ──────────────────────────── */
const industryPainLine: Record<string, string> = {
  "Immigration Consultants": "Document chasing, intake forms, and missed after-hours enquiries drain consultant capacity.",
  "Accounting Firms": "Tax-season bottleneck, client document collection, and repetitive data entry consume senior hours.",
  "Dental Clinics": "No-shows, manual recall, and front-desk phone overload cost clinics six figures annually.",
  "Dental Offices": "No-shows, manual recall, and front-desk phone overload cost clinics six figures annually.",
  "Physio/Rehab Clinics": "Empty slots, manual rebooking, and inconsistent follow-up reduce patient retention.",
  "Physiotherapy Clinics": "Empty slots, manual rebooking, and inconsistent follow-up reduce patient retention.",
  "Contractors": "Leads come in while you are on the ladder. Slow follow-up means lost jobs.",
  "Law Firms": "Every hour a lawyer spends on admin is an hour not billed to a client.",
  "Real Estate Teams": "Long nurture cycles mean most leads fall through the cracks without automation.",
  "Solopreneurs/Coaches": "You are the business, the admin, and the sales team. Automation gives you your time back.",
  "Solopreneurs": "You are the business, the admin, and the sales team. Automation gives you your time back.",
};

/* ─── INDUSTRY → FALLBACK ROUTE ───────────────────────────── */
const industryFallbackRoutes: Record<string, string> = {
  "Immigration Consultants": "/industries/immigration-consultants",
  "Accounting Firms": "/industries/accounting-firms",
  "Dental Clinics": "/industries/dental-offices",
  "Dental Offices": "/industries/dental-offices",
  "Physio/Rehab Clinics": "/industries/physiotherapy-clinics",
  "Physiotherapy Clinics": "/industries/physiotherapy-clinics",
  "Contractors": "/industries/contractors",
  "Law Firms": "/industries/law-firms",
  "Real Estate Teams": "/industries/real-estate-teams",
  "Solopreneurs/Coaches": "/industries/service-businesses",
  "Solopreneurs": "/industries/service-businesses",
};

/* ─── LOCATION DATA ───────────────────────────────────────── */
interface LocationEntry {
  name: string;
  province: string;
  title: string;
  metaTitle: string;
  heroSubtitle: string;
  overview: string[];
  localContext: string[];
  localInsight: string;
  industries: string[];
  stats: { value: string; label: string }[];
  costItems: { amount: string; label: string }[];
  costTotal: string;
  services: { label: string; href: string }[];
}

const locationData: Record<string, LocationEntry> = {
  toronto: {
    name: "Toronto",
    province: "Ontario",
    title: "AI Automation for Small Business in Toronto",
    metaTitle: "AI Automation for Small Business in Toronto | Barrana.ai",
    heroSubtitle:
      "Toronto is the most competitive small-business market in Canada. If your intake is manual, your follow-up is slow, and your operations depend on memory, you are losing clients to the firm down the street that automated six months ago.",
    overview: [
      "Toronto is home to more than 400,000 small businesses. Professional services, healthcare clinics, contractors, and service-based operators compete in a market where response time, consistency, and client experience determine who wins.",
      "Barrana.ai works with Toronto businesses to replace manual intake, document chasing, scheduling, and follow-up with systems that run 24/7. The result is lower overhead, faster response, and more capacity without more headcount.",
      "We serve businesses across every Toronto district: the downtown core, Midtown, the Yonge corridor, Scarborough, Etobicoke, and the inner suburbs. Whether you operate from a Bay Street office or a Danforth storefront, the operational problems are the same.",
      "1,800+ dental clinics. 500+ law firms. Thousands of contractors, consultants, and solo operators. If you are not automating, your competitor two blocks away is.",
    ],
    localContext: [
      "Toronto's professional services market rewards speed and consistency. The businesses that respond within five minutes, send documents automatically, and follow up without being asked are the ones that grow. The ones that rely on a receptionist and a spreadsheet plateau.",
      "We have worked with immigration firms on University Avenue, contractors in the Junction, dental clinics along the Danforth, and accounting practices in Midtown. The pattern is the same: $80K to $200K per year in operational waste that automation eliminates.",
      "Toronto rent is not getting cheaper. Hiring is not getting easier. Automation is the only lever that scales without adding cost.",
    ],
    localInsight:
      "In Toronto, the average professional services firm loses $80K-$200K/yr in operational waste from manual processes. That is one to two full-time salaries spent on work a system should handle.",
    industries: [
      "Dental Clinics",
      "Law Firms",
      "Immigration Consultants",
      "Accounting Firms",
      "Solopreneurs/Coaches",
    ],
    stats: [
      { value: "400K+", label: "Small businesses in Toronto" },
      { value: "$80K-$200K", label: "Avg operational waste/yr" },
      { value: "1,800+", label: "Dental clinics" },
      { value: "$1,500", label: "Fixed pricing from" },
    ],
    costItems: [
      { amount: "$36,000", label: "Intake admin and data entry" },
      { amount: "$24,000", label: "Missed after-hours enquiries" },
      { amount: "$18,000", label: "Document chasing and follow-up" },
      { amount: "$20,800", label: "Status update calls (8 hrs/week)" },
    ],
    costTotal: "$80,000-$200,000/yr",
    services: [
      { label: "AI Agents", href: "/services/ai-agents" },
      { label: "Workflow Automation", href: "/services/workflow-automation" },
      { label: "Lead Response Automation", href: "/services/lead-response-automation" },
      { label: "Client Intake Automation", href: "/services/client-intake-automation" },
      { label: "AI Receptionist", href: "/services/ai-receptionist" },
      { label: "Document Collection", href: "/services/document-collection" },
    ],
  },
  vaughan: {
    name: "Vaughan",
    province: "Ontario",
    title: "AI Automation for Small Business in Vaughan",
    metaTitle: "AI Automation for Small Business in Vaughan | Barrana.ai",
    heroSubtitle:
      "Barrana.ai is headquartered in Vaughan. Our office is at 50 Corstate Avenue. We know this market because we are in it every day. We build automation systems for Vaughan's professional services firms, contractors, clinics, and consultants.",
    overview: [
      "Vaughan is one of the fastest-growing cities in the GTA, with a booming professional services sector along the Highway 7 corridor. Immigration consultants, accounting firms, contractors, and healthcare providers here face the same operational bottlenecks as firms across the region, but growth is amplifying those problems faster.",
      "As a Vaughan-headquartered company, Barrana.ai has deep familiarity with the local business community. We have walked into offices on Highway 7 and Weston Road, sat with teams in Woodbridge, Maple, and Concord, and built systems that solve the specific problems we see every day.",
      "The Highway 7 immigration corridor alone has dozens of firms competing for the same client base. The ones that respond first, collect documents fastest, and follow up automatically are the ones winning.",
      "We work with businesses across all of Vaughan, from the Colossus Centre area to Canada's Wonderland corridor, building automation that reduces overhead and improves client experience.",
    ],
    localContext: [
      "Vaughan's Highway 7 corridor is one of the densest concentrations of professional services firms in York Region. Immigration consultants, accountants, and physiotherapy clinics cluster along this strip, competing on responsiveness and client experience.",
      "The firms that automate intake and follow-up report 25-40% faster file opening times and significantly higher client satisfaction. In a market where referrals drive growth, that operational edge compounds.",
      "Vaughan's contractor market is equally competitive. Residential renovation demand remains high, and the firms that respond within minutes to new enquiries close significantly more jobs than those that call back the next day.",
    ],
    localInsight:
      "Barrana HQ is at 50 Corstate Avenue, Vaughan. We are not a remote vendor. We are your neighbour, and we know the operational challenges of this market first-hand.",
    industries: [
      "Immigration Consultants",
      "Accounting Firms",
      "Physiotherapy Clinics",
      "Contractors",
    ],
    stats: [
      { value: "Barrana HQ", label: "50 Corstate Ave, Vaughan" },
      { value: "50+", label: "Local clients served" },
      { value: "$70K-$150K", label: "Avg operational waste/yr" },
      { value: "$1,500", label: "Fixed pricing from" },
    ],
    costItems: [
      { amount: "$36,000", label: "Intake admin and data entry" },
      { amount: "$18,000", label: "Document chasing and follow-up" },
      { amount: "$24,000", label: "After-hours enquiry losses" },
      { amount: "$15,600", label: "Scheduling and rescheduling overhead" },
    ],
    costTotal: "$70,000-$150,000/yr",
    services: [
      { label: "AI Agents", href: "/services/ai-agents" },
      { label: "Workflow Automation", href: "/services/workflow-automation" },
      { label: "Lead Response Automation", href: "/services/lead-response-automation" },
      { label: "Operations Automation", href: "/services/operations-reporting" },
      { label: "AI Receptionist", href: "/services/ai-receptionist" },
    ],
  },
  mississauga: {
    name: "Mississauga",
    province: "Ontario",
    title: "AI Automation for Small Business in Mississauga",
    metaTitle: "AI Automation for Small Business in Mississauga | Barrana.ai",
    heroSubtitle:
      "Mississauga is the GTA's second-largest city and one of the busiest markets for professional services, contractors, and clinics. 560+ dental clinics. One of the most active contractor markets in the region. If your operations are still manual, you are leaving money on the table.",
    overview: [
      "Mississauga's professional services community is as diverse as the city itself. Along the Hurontario corridor, in Streetsville, Meadowvale, and Port Credit, thousands of businesses run on manual intake, phone tag, and spreadsheets that should have been automated years ago.",
      "Barrana.ai has worked with Mississauga businesses across multiple industries, from immigration firms near Square One to dental clinics along Dundas and contractors operating out of industrial parks in Malton. The operational friction points are consistent: slow response, manual document handling, and inconsistent follow-up.",
      "560+ dental clinics compete for patients in Mississauga. The ones with automated recall, no-show recovery, and 24/7 booking capture grow. The ones relying on front-desk phone calls do not.",
      "The contractor market here is equally competitive. Residential renovation demand along the Lakeshore and in Erin Mills means leads come in fast, and the firms that respond first win the job.",
    ],
    localContext: [
      "Mississauga's Hurontario corridor is rapidly densifying, bringing new demand for professional services and healthcare. Businesses positioned along this corridor benefit from high foot traffic but face intense competition.",
      "The city's contractor community handles some of the highest residential renovation volumes in the GTA. Lead response time is the single biggest differentiator: firms that respond in under five minutes close 3-5x more jobs than those that respond in an hour.",
      "Mississauga's immigration and accounting firms serve the city's diverse communities, managing complex, high-volume intake processes. Automation reduces intake time from 45 minutes to under 5 minutes per client.",
    ],
    localInsight:
      "Mississauga service businesses lose $80K-$180K/yr in operational waste. With 560+ dental clinics and one of the busiest contractor markets in the GTA, the competition for every lead is fierce.",
    industries: [
      "Immigration Consultants",
      "Accounting Firms",
      "Dental Clinics",
      "Contractors",
      "Law Firms",
      "Real Estate Teams",
      "Physiotherapy Clinics",
    ],
    stats: [
      { value: "560+", label: "Dental clinics in Mississauga" },
      { value: "$80K-$180K", label: "Avg operational waste/yr" },
      { value: "2nd", label: "Largest city in the GTA" },
      { value: "$1,500", label: "Fixed pricing from" },
    ],
    costItems: [
      { amount: "$42,000", label: "Front-desk phone and scheduling overhead" },
      { amount: "$36,000", label: "Intake admin and data entry" },
      { amount: "$24,000", label: "Missed after-hours leads" },
      { amount: "$18,000", label: "Document chasing and reminders" },
    ],
    costTotal: "$80,000-$180,000/yr",
    services: [
      { label: "Lead Response Automation", href: "/services/lead-response-automation" },
      { label: "Workflow Automation", href: "/services/workflow-automation" },
      { label: "AI Receptionist", href: "/services/ai-receptionist" },
      { label: "Client Intake Automation", href: "/services/client-intake-automation" },
      { label: "Operations Automation", href: "/services/operations-reporting" },
      { label: "Appointment Automation", href: "/services/appointment-automation" },
    ],
  },
  "richmond-hill": {
    name: "Richmond Hill",
    province: "Ontario",
    title: "AI Automation for Small Business in Richmond Hill",
    metaTitle: "AI Automation for Small Business in Richmond Hill | Barrana.ai",
    heroSubtitle:
      "Richmond Hill is York Region's professional services hub. 208 dental clinics along the Yonge Street corridor. Every physio clinic within 2 km of Mackenzie Health. If your competitors are automating and you are not, the gap is widening.",
    overview: [
      "Richmond Hill's professional services community has grown significantly over the past decade. The Yonge Street corridor from Highway 7 to Major Mackenzie is lined with dental clinics, physiotherapy practices, immigration consultants, and accounting firms serving the city's diverse population.",
      "Barrana.ai serves Richmond Hill businesses with the same automation systems we build for clients across the GTA, tailored to the specific workflows and patient volumes of each practice.",
      "208 dental clinics in Richmond Hill compete for patients along a single corridor. The clinics with automated recall, no-show recovery, and online booking fill their chairs. The ones relying on phone calls leave money on the table.",
      "Every physiotherapy clinic within walking distance of Mackenzie Health competes for referrals. The ones that automate intake and follow-up reduce wait times and retain more patients.",
    ],
    localContext: [
      "Richmond Hill's Yonge Street corridor is one of the most competitive healthcare and professional services strips in York Region. Density creates opportunity but demands operational excellence.",
      "The city has a high concentration of immigration and professional services firms serving diverse communities. These businesses manage high document volumes and complex intake processes that benefit enormously from automation.",
    ],
    localInsight:
      "With 208 dental clinics along Yonge Street, Richmond Hill's healthcare market is dense. Automation is not a luxury here. It is the difference between a full schedule and empty chairs.",
    industries: ["Dental Clinics", "Physiotherapy Clinics"],
    stats: [
      { value: "208", label: "Dental clinics in Richmond Hill" },
      { value: "$70K-$150K", label: "Avg operational waste/yr" },
      { value: "Yonge St", label: "Key professional corridor" },
      { value: "$1,500", label: "Fixed pricing from" },
    ],
    costItems: [
      { amount: "$45,000", label: "No-show and cancellation losses" },
      { amount: "$28,000", label: "Manual recall and follow-up" },
      { amount: "$18,000", label: "Front-desk scheduling overhead" },
      { amount: "$12,000", label: "Paper intake and data entry" },
    ],
    costTotal: "$70,000-$150,000/yr",
    services: [
      { label: "Appointment Automation", href: "/services/appointment-automation" },
      { label: "AI Receptionist", href: "/services/ai-receptionist" },
      { label: "Client Intake Automation", href: "/services/client-intake-automation" },
      { label: "Workflow Automation", href: "/services/workflow-automation" },
      { label: "Document Collection", href: "/services/document-collection" },
    ],
  },
  markham: {
    name: "Markham",
    province: "Ontario",
    title: "AI Automation for Small Business in Markham",
    metaTitle: "AI Automation for Small Business in Markham | Barrana.ai",
    heroSubtitle:
      "Markham is Canada's High-Tech Capital. Businesses here expect digital-first experiences from every vendor they work with. If your client intake still involves a phone call and a PDF, you are behind the curve in a market that rewards technology-forward operations.",
    overview: [
      "Markham's reputation as a technology hub extends beyond its tech companies. The entire business community here is more digitally literate and more demanding of modern client experiences than almost any other GTA market.",
      "Barrana.ai builds automation systems for Markham businesses that connect existing tools, CRMs, scheduling platforms, and accounting software, into unified workflows that eliminate manual coordination.",
      "Accounting firms in Markham already use modern software. Dental clinics already have digital records. Contractors already use project management tools. But most have not connected these systems through automation. That is where the waste lives.",
      "Markham's tech-forward culture means your clients expect instant responses, digital forms, and seamless experiences. Manual processes create friction that costs you referrals.",
    ],
    localContext: [
      "Markham's technology-forward business culture means many businesses already use modern tools but have not connected them through automation. The gap between tool adoption and workflow automation is where $75K-$160K per year in operational waste accumulates.",
      "The city's diverse professional services community, from accounting firms along Highway 7 to dental clinics in Unionville, serves clients who expect digital-first experiences. Businesses that deliver those experiences through automation retain more clients and earn more referrals.",
    ],
    localInsight:
      "Markham businesses adopt tools early but connect them late. The gap between having a CRM and having an automated workflow is where most of the operational waste lives.",
    industries: [
      "Accounting Firms",
      "Dental Clinics",
      "Real Estate Teams",
      "Contractors",
      "Law Firms",
      "Physiotherapy Clinics",
    ],
    stats: [
      { value: "Tech Capital", label: "Canada's high-tech hub" },
      { value: "$75K-$160K", label: "Avg operational waste/yr" },
      { value: "Digital-first", label: "Client expectations" },
      { value: "$1,500", label: "Fixed pricing from" },
    ],
    costItems: [
      { amount: "$32,000", label: "Manual CRM entry and data sync" },
      { amount: "$24,000", label: "Document collection and chasing" },
      { amount: "$20,000", label: "Scheduling and rescheduling" },
      { amount: "$18,000", label: "After-hours missed opportunities" },
    ],
    costTotal: "$75,000-$160,000/yr",
    services: [
      { label: "Workflow Automation", href: "/services/workflow-automation" },
      { label: "AI Agents", href: "/services/ai-agents" },
      { label: "CRM Automation", href: "/services/crm-automation" },
      { label: "Lead Response Automation", href: "/services/lead-response-automation" },
      { label: "Operations Automation", href: "/services/operations-reporting" },
    ],
  },
  "north-york": {
    name: "North York",
    province: "Ontario",
    title: "AI Automation for Small Business in North York",
    metaTitle: "AI Automation for Small Business in North York | Barrana.ai",
    heroSubtitle:
      "North York has the highest concentration of immigration consulting firms in the GTA. Dense professional services clusters along Yonge, Finch, and Sheppard mean intense competition. The firms automating intake and follow-up are pulling ahead.",
    overview: [
      "North York is home to one of the densest concentrations of professional services firms in the GTA. Immigration consultants, accounting firms, law offices, and healthcare providers line the Yonge Street corridor from Sheppard to Finch, competing for clients in a market where speed and consistency win.",
      "Barrana.ai serves North York businesses with automation systems designed to handle the high-volume, document-intensive workflows that define this market. Immigration intake, tax-season document collection, legal file management, and clinic scheduling all benefit from the same automation principles.",
      "The highest concentration of immigration firms in the GTA means the competition for new clients is fierce. The firms that respond first, collect documents fastest, and send status updates automatically build the reputations that generate referrals.",
      "North York's diverse population creates sustained demand for professional services with complex intake requirements. Automation handles the complexity so your team can focus on the work that requires expertise.",
    ],
    localContext: [
      "North York's Yonge-Sheppard-Finch triangle is one of the most competitive professional services markets in the GTA. Immigration firms, accounting practices, and law offices compete within blocks of each other.",
      "The area's diverse population creates high demand for services with complex, document-heavy intake processes. Firms that automate these processes recover 25-40% of staff capacity and serve more clients without hiring.",
      "North York's density means every missed call, slow follow-up, and manual intake form costs you a client who found a faster competitor three blocks away.",
    ],
    localInsight:
      "North York has the highest concentration of immigration firms in the GTA. In this market, the firms that automate intake and document collection do not just save time. They win the clients.",
    industries: [
      "Immigration Consultants",
      "Accounting Firms",
      "Dental Clinics",
      "Law Firms",
      "Real Estate Teams",
    ],
    stats: [
      { value: "#1", label: "Immigration firm density in GTA" },
      { value: "$80K-$180K", label: "Avg operational waste/yr" },
      { value: "Yonge-Finch", label: "Key professional corridor" },
      { value: "$1,500", label: "Fixed pricing from" },
    ],
    costItems: [
      { amount: "$36,000", label: "Intake admin and data entry" },
      { amount: "$24,000", label: "After-hours enquiry losses" },
      { amount: "$20,800", label: "Status update calls" },
      { amount: "$18,000", label: "Document chasing and follow-up" },
    ],
    costTotal: "$80,000-$180,000/yr",
    services: [
      { label: "AI Agents", href: "/services/ai-agents" },
      { label: "Workflow Automation", href: "/services/workflow-automation" },
      { label: "Client Intake Automation", href: "/services/client-intake-automation" },
      { label: "Lead Response Automation", href: "/services/lead-response-automation" },
      { label: "Document Collection", href: "/services/document-collection" },
    ],
  },
};

/* ─── PROCESS STEPS ───────────────────────────────────────── */
const processSteps = [
  {
    num: "01",
    title: "Audit",
    desc: "We map your current workflow, measure where time and money leak, and identify the highest-ROI automation targets.",
    Icon: Search,
  },
  {
    num: "02",
    title: "Map",
    desc: "We design the automated workflow end-to-end: triggers, logic, integrations, and fallback paths.",
    Icon: ClipboardCheck,
  },
  {
    num: "03",
    title: "Build",
    desc: "We build, test, and deploy your automation system. You see results from Week 1, not Month 3.",
    Icon: Cog,
  },
  {
    num: "04",
    title: "Launch",
    desc: "We train your team, monitor performance for 30 days, and optimise until the system runs on its own.",
    Icon: Rocket,
  },
];

/* ─── HELPER: match city slug to local pages ──────────────── */
function getCityPages(slug: string) {
  const loc = locationData[slug];
  if (!loc) return [];
  const cityName = loc.name.toLowerCase();
  return localPages.filter(
    (p) =>
      p.city.toLowerCase() === cityName ||
      p.city
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/\//g, "-") === slug
  );
}

/* ─── COMPONENT ───────────────────────────────────────────── */
export default function LocationDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "";
  const location = locationData[slug];

  if (!location) {
    return (
      <div style={{ minHeight: "100vh", background: colors.surfaceWhite }}>
        <Navigation />
        <div className="container" style={{ paddingTop: "8rem", paddingBottom: "5rem", textAlign: "center" }}>
          <h1 style={{ ...typography.pageTitle, marginBottom: "1rem" }}>Location Not Found</h1>
          <p style={{ ...typography.body, marginBottom: "2rem" }}>
            We could not find the location you are looking for.
          </p>
          <Link href="/locations" style={{ ...buttons.primary }}>
            View All Locations <ArrowRight size={16} />
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const cityPages = getCityPages(slug);

  /* Build industry card data: prefer local page link, fallback to general industry page */
  const industryCards = location.industries.map((industry) => {
    const localPage = cityPages.find((p) => p.industry === industry);
    const Icon = industryIcons[industry] || FileText;
    const dollarPain = industryDollarPain[industry] || "";
    const painLine = industryPainLine[industry] || "";
    const route = localPage
      ? localPage.route
      : industryFallbackRoutes[industry] || "/industries";
    return { industry, Icon, dollarPain, painLine, route, hasLocalPage: !!localPage, city: location.name };
  });

  /* JSON-LD LocalBusiness schema */
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Barrana.ai",
    description: `AI automation for small businesses in ${location.name}`,
    url: `https://barrana.ai/locations/${slug}`,
    telephone: "+1-905-000-0000",
    address: {
      "@type": "PostalAddress",
      streetAddress: "50 Corstate Avenue",
      addressLocality: "Vaughan",
      addressRegion: "ON",
      postalCode: "L4K 4V2",
      addressCountry: "CA",
    },
    areaServed: {
      "@type": "City",
      name: location.name,
    },
  };

  return (
    <div style={{ minHeight: "100vh", background: colors.surfaceWhite }}>
      <Navigation />

      {/* ── 1. HERO ─────────────────────────────────────────── */}
      <section
        style={{
          ...surfaces.light,
          paddingTop: "7rem",
          paddingBottom: spacing.sectionPadding,
        }}
      >
        <div className="container">
          <BreadcrumbNav
            items={[
              { label: "Home", href: "/" },
              { label: "Locations", href: "/locations" },
              { label: location.name },
            ]}
          />

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: spacing.eyebrowToHeading }}>
            <MapPin size={16} color={colors.magenta} />
            <span style={typography.eyebrow}>AI AUTOMATION IN {location.name.toUpperCase()}</span>
          </div>

          <div style={{ maxWidth: "48rem" }}>
            <h1 style={{ ...typography.pageTitle, marginBottom: "1.5rem" }}>{location.title}</h1>
            <p style={{ ...typography.body, fontSize: "1.125rem", marginBottom: "2.5rem" }}>
              {location.heroSubtitle}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              <Link href={`/contact?city=${slug}`} style={{ ...buttons.primary }}>
                Book a Free Audit in {location.name} <ArrowRight size={16} />
              </Link>
              <Link href="/automation-planner" style={{ ...buttons.secondary }}>
                Start the Automation Planner <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. TRUST STATS STRIP ──────────────────────────── */}
      <section style={{ ...surfaces.white, padding: `${spacing.sectionPaddingSm} 0` }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: spacing.cardGridGapDense,
            }}
          >
            {location.stats.map((stat, i) => (
              <div
                key={i}
                style={{
                  ...cards.typeA,
                  textAlign: "center",
                  padding: "1.5rem 1rem",
                }}
              >
                <div style={{ ...typography.metricValue, color: colors.navy, marginBottom: "0.25rem" }}>
                  {stat.value}
                </div>
                <div style={typography.metricLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. INDUSTRIES WE AUTOMATE ─────────────────────── */}
      <section style={{ ...surfaces.light, padding: `${spacing.sectionPadding} 0` }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: spacing.subheadingToContent }}>
            <h2 style={{ ...typography.sectionHeading, marginBottom: spacing.headingToSubheading }}>
              Industries We Automate in {location.name}
            </h2>
            <p style={{ ...typography.sectionSubheading, margin: "0 auto" }}>
              Every card links to a detailed page showing exactly what we automate, what it costs, and what stays human for your industry in {location.name}.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: spacing.cardGridGap,
            }}
          >
            {industryCards.map((card) => (
              <Link key={card.industry} href={card.route} style={{ textDecoration: "none" }}>
                <div
                  style={{
                    ...cards.typeA,
                    cursor: "pointer",
                    transition: "box-shadow 0.25s ease, transform 0.25s ease",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.boxShadow = cards.typeAHover.boxShadow;
                    el.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.boxShadow = cards.typeA.boxShadow;
                    el.style.transform = "translateY(0)";
                  }}
                >
                  <card.Icon size={28} color={colors.navy} />
                  <h3 style={{ ...typography.cardTitle, margin: 0 }}>{card.industry}</h3>
                  {card.dollarPain && (
                    <p style={{ color: colors.magenta, fontWeight: 700, fontSize: "0.9375rem", margin: 0 }}>
                      {card.dollarPain}
                    </p>
                  )}
                  <p style={{ ...typography.cardBody, margin: 0, flex: 1 }}>{card.painLine}</p>
                  <span
                    style={{
                      color: colors.navy,
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    See {card.industry} in {card.city} <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. COST OF MANUAL OPERATIONS ──────────────────── */}
      <section style={{ ...surfaces.white, padding: `${spacing.sectionPadding} 0` }}>
        <div className="container" style={{ maxWidth: "48rem", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: spacing.subheadingToContent }}>
            <h2 style={{ ...typography.sectionHeading, marginBottom: spacing.headingToSubheading }}>
              The Cost of Manual Operations in {location.name}
            </h2>
            <p style={typography.sectionSubheading}>
              These are real numbers from businesses like yours. Every dollar listed below is recoverable through automation.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2.5rem" }}>
            {location.costItems.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "1.25rem 1.5rem",
                  background: colors.surfaceLight,
                  borderRadius: "0.75rem",
                }}
              >
                <span style={{ ...typography.body, fontWeight: 500 }}>{item.label}</span>
                <span
                  style={{
                    color: colors.magenta,
                    fontWeight: 800,
                    fontSize: "1.125rem",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {item.amount}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              ...cards.typeA,
              textAlign: "center",
              borderColor: colors.magenta,
              borderWidth: "2px",
            }}
          >
            <DollarSign size={28} color={colors.magenta} style={{ margin: "0 auto 0.5rem" }} />
            <div style={{ ...typography.metricValue, color: colors.magenta, fontSize: "1.75rem" }}>
              {location.costTotal}
            </div>
            <div style={{ ...typography.metricLabel, marginTop: "0.25rem" }}>
              Estimated annual operational waste for a typical {location.name} service business
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. HOW WE WORK ───────────────────────────────── */}
      <section style={{ ...surfaces.light, padding: `${spacing.sectionPadding} 0` }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: spacing.subheadingToContent }}>
            <h2 style={{ ...typography.sectionHeading, marginBottom: spacing.headingToSubheading }}>
              How We Work with {location.name} Businesses
            </h2>
            <p style={{ ...typography.sectionSubheading, margin: "0 auto" }}>
              Four steps. Fixed pricing. Results from Week 1.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: spacing.cardGridGap,
            }}
          >
            {processSteps.map((step) => (
              <div key={step.num} style={{ ...cards.typeB, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span
                    style={{
                      ...typography.metricValue,
                      color: colors.navy,
                      opacity: 0.3,
                      fontSize: "2rem",
                      lineHeight: 1,
                    }}
                  >
                    {step.num}
                  </span>
                  <step.Icon size={24} color={colors.navy} />
                </div>
                <h3 style={{ ...typography.cardTitle, margin: 0 }}>{step.title}</h3>
                <p style={{ ...typography.cardBody, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. SERVICES AVAILABLE ─────────────────────────── */}
      <section style={{ ...surfaces.white, padding: `${spacing.sectionPadding} 0` }}>
        <div className="container">
          <IndustryServiceCrosslinks
            heading={`Automation Services for ${location.name} Businesses`}
            items={location.services}
          />
        </div>
      </section>

      {/* ── 7. LOCAL CONTEXT ─────────────────────────────── */}
      <section style={{ ...surfaces.light, padding: `${spacing.sectionPadding} 0` }}>
        <div className="container" style={{ maxWidth: "48rem", margin: "0 auto" }}>
          <h2 style={{ ...typography.sectionHeading, marginBottom: spacing.headingToBody }}>
            {location.name}: Local Market Context
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2rem" }}>
            {location.localContext.map((para, i) => (
              <p key={i} style={typography.body}>
                {para}
              </p>
            ))}
          </div>

          {/* Navy callout */}
          <div
            style={{
              borderLeft: `4px solid ${colors.navy}`,
              padding: "1.5rem 1.5rem 1.5rem 2rem",
              background: colors.navyWash,
              borderRadius: "0 0.75rem 0.75rem 0",
            }}
          >
            <p style={{ ...typography.body, fontWeight: 600, color: colors.navy, margin: 0 }}>
              {location.localInsight}
            </p>
          </div>
        </div>
      </section>

      {/* ── 8. CTA ───────────────────────────────────────── */}
      <section style={{ ...surfaces.darkGradient, padding: `${spacing.sectionPadding} 0` }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "40rem", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
              fontWeight: 800,
              color: "#fff",
              marginBottom: "1.25rem",
              lineHeight: 1.15,
            }}
          >
            Your {location.name} Operations Will Not Fix Themselves
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "2.5rem" }}>
            Every week you wait is another $1,500-$4,000 in operational waste. Book a free 60-minute Automation Audit and we will show you exactly where the money is leaking.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <Link href={`/contact?city=${slug}`} style={{ ...buttons.primaryOnDark }}>
              Book a Free Audit <ArrowRight size={16} />
            </Link>
            <Link href="/automation-planner" style={{ ...buttons.secondaryOnDark }}>
              Start the Automation Planner <ArrowRight size={16} />
            </Link>
          </div>
          <p style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.45)" }}>
            Fixed pricing. No retainers. Results from Week 1.
          </p>
        </div>

        {/* JSON-LD LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </section>

      <Footer />
    </div>
  );
}
